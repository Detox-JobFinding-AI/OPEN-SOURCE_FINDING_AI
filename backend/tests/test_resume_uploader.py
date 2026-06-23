import io
import pytest
import zipfile
from app.utils.resume_uploader import (
    validate_resume,
    ValidationError,
    FileSizeLimitError,
    InvalidExtensionError,
    InvalidSignatureError,
)

# --- Test Helpers ---

def create_mock_docx(filenames=None) -> bytes:
    """Helper to generate a valid in-memory ZIP/DOCX structure."""
    stream = io.BytesIO()
    with zipfile.ZipFile(stream, "w") as z:
        if filenames is not None:
            for name in filenames:
                z.writestr(name, "dummy xml content")
        else:
            z.writestr("[Content_Types].xml", "<xml></xml>")
            z.writestr("word/document.xml", "dummy paragraph text")
    return stream.getvalue()

def create_zip_bomb_uncompressed(total_size: int) -> bytes:
    """Helper to generate a ZIP with huge uncompressed size."""
    stream = io.BytesIO()
    with zipfile.ZipFile(stream, "w", compression=zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", "<xml></xml>")
        z.writestr("word/document.xml", "dummy text")
        # Add entry of specified uncompressed size
        z.writestr("word/bomb.xml", b"A" * total_size)
    return stream.getvalue()

# --- Success/Positive Tests ---

def test_validate_pdf_success():
    pdf_content = b"%PDF-1.4\n%some PDF content\n%%EOF"
    # Should not raise any exceptions
    validate_resume(pdf_content, "my_resume.pdf")

def test_validate_docx_success():
    docx_content = create_mock_docx()
    # Should not raise any exceptions
    validate_resume(docx_content, "resume.docx")

def test_validate_txt_success():
    txt_content = b"Name: John Doe\nExperience: 5 years in Python development."
    # Should not raise any exceptions
    validate_resume(txt_content, "john_doe.txt")

def test_validate_txt_utf8_bom_success():
    # UTF-8 BOM signature: \xef\xbb\xbf
    txt_content = b"\xef\xbb\xbfName: Jane Doe\nSkills: C++, Pytest."
    # Should not raise any exceptions
    validate_resume(txt_content, "jane_doe.txt")

# --- Filename Validation Tests ---

def test_validate_filename_empty():
    with pytest.raises(ValidationError, match="Filename cannot be empty"):
        validate_resume(b"content", "")
    with pytest.raises(ValidationError, match="Filename cannot be empty"):
        validate_resume(b"content", "    ")

def test_validate_filename_no_extension():
    with pytest.raises(InvalidExtensionError, match="Filename has no extension"):
        validate_resume(b"content", "resume")

def test_validate_filename_only_extension():
    with pytest.raises(ValidationError, match="Filename cannot consist of only an extension"):
        validate_resume(b"content", ".pdf")
    with pytest.raises(ValidationError, match="Filename cannot consist of only an extension"):
        validate_resume(b"content", "  .docx")

def test_validate_filename_unsupported_extension():
    with pytest.raises(InvalidExtensionError, match="Unsupported file extension"):
        validate_resume(b"content", "resume.png")
    with pytest.raises(InvalidExtensionError, match="Unsupported file extension"):
        validate_resume(b"content", "resume.exe")

def test_validate_filename_case_insensitive():
    pdf_content = b"%PDF-1.5\n%data\n%%EOF"
    # Validates that uppercase extensions are accepted and resolved correctly
    validate_resume(pdf_content, "resume.PDF")
    
    docx_content = create_mock_docx()
    validate_resume(docx_content, "resume.Docx")

# --- Size Boundary Tests ---

def test_validate_size_empty():
    with pytest.raises(FileSizeLimitError, match="File is empty"):
        validate_resume(b"", "resume.txt")

def test_validate_size_exceeded():
    content = b"a" * 100
    with pytest.raises(FileSizeLimitError, match="exceeds the maximum allowed size"):
        validate_resume(content, "resume.txt", max_size_bytes=50)

def test_validate_size_exact_boundary():
    content = b"a" * 50
    # Exactly at boundary - should pass
    validate_resume(content, "resume.txt", max_size_bytes=50)
    
    # Boundary + 1 byte - should fail
    content_plus = b"a" * 51
    with pytest.raises(FileSizeLimitError, match="exceeds the maximum allowed size"):
        validate_resume(content_plus, "resume.txt", max_size_bytes=50)

# --- MIME-Type Validation Tests ---

def test_validate_mime_type_success():
    pdf_content = b"%PDF-1.4\n%...\n%%EOF"
    validate_resume(pdf_content, "resume.pdf", mime_type="application/pdf")
    validate_resume(pdf_content, "resume.pdf", mime_type="  APPLICATION/PDF  ")

def test_validate_mime_type_fallback_success():
    pdf_content = b"%PDF-1.4\n%...\n%%EOF"
    docx_content = create_mock_docx()
    # application/octet-stream should be allowed as fallback wildcard
    validate_resume(pdf_content, "resume.pdf", mime_type="application/octet-stream")
    validate_resume(docx_content, "resume.docx", mime_type="application/octet-stream")

def test_validate_mime_type_mismatch_fails():
    pdf_content = b"%PDF-1.4\n%...\n%%EOF"
    with pytest.raises(InvalidSignatureError, match="MIME-type 'text/plain' is not allowed"):
        validate_resume(pdf_content, "resume.pdf", mime_type="text/plain")

# --- PDF Content Validation Tests ---

def test_validate_pdf_invalid_header():
    # Lacks %PDF-
    bad_pdf = b"PDF-1.4\n%data\n%%EOF"
    with pytest.raises(InvalidSignatureError, match="Invalid PDF header signature"):
        validate_resume(bad_pdf, "resume.pdf")

def test_validate_pdf_missing_eof():
    # Lacks %%EOF near end
    bad_pdf = b"%PDF-1.4\n%data\n%no eof"
    with pytest.raises(InvalidSignatureError, match="PDF file lacks end-of-file marker"):
        validate_resume(bad_pdf, "resume.pdf")

def test_validate_pdf_too_small():
    # Small PDF content (< 15 bytes)
    bad_pdf = b"%PDF-1\n%%EOF"
    with pytest.raises(InvalidSignatureError, match="PDF file is too small to be valid"):
        validate_resume(bad_pdf, "resume.pdf")

# --- DOCX Validation Tests ---

def test_validate_docx_invalid_header():
    # ZIP files must start with PK\x03\x04
    bad_docx = b"ZIP-structure-not-pk-header"
    with pytest.raises(InvalidSignatureError, match="Invalid DOCX header signature"):
        validate_resume(bad_docx, "resume.docx")

def test_validate_docx_corrupt_zip():
    bad_docx = b"PK\x03\x04some corrupted zip binary content"
    with pytest.raises(InvalidSignatureError, match="Corrupted or invalid ZIP file structure"):
        validate_resume(bad_docx, "resume.docx")

def test_validate_docx_missing_content_types():
    # Valid ZIP but missing [Content_Types].xml
    bad_docx = create_mock_docx(filenames=["word/document.xml"])
    with pytest.raises(InvalidSignatureError, match="missing '\\[Content_Types\\].xml'"):
        validate_resume(bad_docx, "resume.docx")

def test_validate_docx_missing_word_dir():
    # Valid ZIP, Content Types present, but missing word/ folder
    bad_docx = create_mock_docx(filenames=["[Content_Types].xml", "some_other_folder/file.xml"])
    with pytest.raises(InvalidSignatureError, match="missing 'word/' folder structure"):
        validate_resume(bad_docx, "resume.docx")

# --- ZIP Bomb Protection Tests ---

def test_validate_docx_zip_bomb_uncompressed_limit():
    # Generate mock DOCX exceeding 50MB uncompressed limit
    bomb_docx = create_zip_bomb_uncompressed(total_size=51 * 1024 * 1024)
    with pytest.raises(InvalidSignatureError, match="Potential ZIP bomb detected"):
        validate_resume(bomb_docx, "resume.docx")

def test_validate_docx_zip_bomb_ratio_limit():
    stream = io.BytesIO()
    with zipfile.ZipFile(stream, "w") as z:
        z.writestr("[Content_Types].xml", "<xml></xml>")
        z.writestr("word/document.xml", "text")
        
        # 2MB of highly compressed 'A's (uncompressed 2MB, compressed will be very small)
        large_content = b"A" * (2 * 1024 * 1024)
        z.writestr("word/bomb.xml", large_content, compress_type=zipfile.ZIP_DEFLATED)
        
    bomb_docx = stream.getvalue()
    # The compression ratio of 2MB 'A's is extremely high (usually > 1000x)
    with pytest.raises(InvalidSignatureError, match="compression ratio.*exceeds 100x"):
        validate_resume(bomb_docx, "resume.docx")

# --- TXT Validation Tests ---

def test_validate_txt_null_byte():
    # Text file containing a null byte
    bad_txt = b"Name: John\x00 Doe\nRole: Dev"
    with pytest.raises(InvalidSignatureError, match="Plain text file contains null bytes"):
        validate_resume(bad_txt, "resume.txt")

def test_validate_txt_undecodable():
    # Random undecodable binary bytes
    bad_txt = b"\x80\x81\x82\xff\xfe\xfd"
    # Note: latin-1 decodes almost everything, so we verify that undecodable
    # cases (if any) or binary heuristics catch it. Since latin-1 can decode
    # arbitrary bytes, this would decode to latin-1, but then fail the control character check!
    # Let's test that it fails signature check.
    with pytest.raises(InvalidSignatureError):
        validate_resume(bad_txt, "resume.txt")

def test_validate_txt_control_character_ratio():
    # Plain text but filled with non-whitespace control characters (ord < 32 except tab/LF/CR)
    # 5 control characters in a 10 character text = 50% ratio
    bad_txt = b"Text\x01\x02\x03\x04\x05Data"
    with pytest.raises(InvalidSignatureError, match="Plain text file appears to be binary"):
        validate_resume(bad_txt, "resume.txt")

# --- Security Edge Cases & Spoofing Tests ---

def test_validate_filename_double_extension():
    # Rejects filenames ending in blocked extensions like .exe, even with a middle extension
    with pytest.raises(InvalidExtensionError, match="Unsupported file extension"):
        validate_resume(b"content", "resume.pdf.exe")

def test_validate_spoofing_docx_renamed_to_pdf():
    # DOCX content (starts with PK...) renamed to PDF
    docx_content = create_mock_docx()
    with pytest.raises(InvalidSignatureError, match="Invalid PDF header signature"):
        validate_resume(docx_content, "spoofed.pdf")

def test_validate_spoofing_pdf_renamed_to_docx():
    # PDF content (starts with %PDF) renamed to DOCX
    pdf_content = b"%PDF-1.4\n%...\n%%EOF"
    with pytest.raises(InvalidSignatureError, match="Invalid DOCX header signature"):
        validate_resume(pdf_content, "spoofed.docx")

def test_validate_spoofing_binary_renamed_to_txt():
    # Binary file (with null bytes) renamed to TXT
    binary_content = b"\x00\x01\x02PK\x03\x04%PDF-"
    with pytest.raises(InvalidSignatureError, match="Plain text file contains null bytes"):
        validate_resume(binary_content, "spoofed.txt")
