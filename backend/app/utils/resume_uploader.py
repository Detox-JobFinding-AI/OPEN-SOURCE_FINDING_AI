import io
import logging
import os
import zipfile
from typing import Optional

# Setup logger for validation audits
logger = logging.getLogger("app.utils.resume_uploader")

class ValidationError(ValueError):
    """Base class for all resume upload validation errors."""

class FileSizeLimitError(ValidationError):
    """Raised when the file is empty or exceeds the configured size limit."""

class InvalidExtensionError(ValidationError):
    """Raised when the file has a missing, empty, or unsupported extension."""

class InvalidSignatureError(ValidationError):
    """Raised when the file content structure does not match its claimed type."""

def _validate_filename(filename: str) -> str:
    """
    Validates the filename structure and returns the normalized lowercase extension.
    
    Raises:
        ValidationError: If the filename is empty, malformed, or only contains an extension.
        InvalidExtensionError: If the extension is missing or unsupported.
    """
    if not filename or not filename.strip():
        raise ValidationError("Filename cannot be empty.")
    
    # Strip whitespace and URL query parameters/anchors
    clean_filename = filename.strip().split('?')[0].split('#')[0]
    
    # If the filename starts with a dot and has no other dot, it's just an extension
    if clean_filename.startswith('.') and clean_filename.count('.') == 1:
        raise ValidationError("Filename cannot consist of only an extension.")
    
    # Extract extension
    base, ext = os.path.splitext(clean_filename)
    
    if not ext:
        raise InvalidExtensionError("Filename has no extension.")
    
    # Check if the filename consists only of the extension (e.g. ".pdf")
    if not base.strip():
        raise ValidationError("Filename cannot consist of only an extension.")
    
    ext_lower = ext.lower()
    allowed_extensions = {".pdf", ".docx", ".txt"}
    if ext_lower not in allowed_extensions:
        raise InvalidExtensionError(
            f"Unsupported file extension '{ext}'. Only .pdf, .docx, and .txt files are supported."
        )
        
    return ext_lower

def _validate_pdf(content: bytes) -> None:
    """
    Validates PDF file signatures and integrity markers.
    
    Raises:
        InvalidSignatureError: If PDF signatures are invalid or corrupted.
    """
    # Absolute minimum size for a valid PDF structure
    MIN_PDF_BYTES = 15
    if len(content) < MIN_PDF_BYTES:
        raise InvalidSignatureError("PDF file is too small to be valid.")
    
    # Check PDF header magic number
    if not content.startswith(b"%PDF-"):
        raise InvalidSignatureError("Invalid PDF header signature.")
    
    # Check PDF trailer EOF marker in the last 1024 bytes
    trailer_window = content[-1024:]
    if b"%%EOF" not in trailer_window:
        raise InvalidSignatureError("PDF file lacks end-of-file marker (%%EOF).")

def _validate_docx(content: bytes) -> None:
    """
    Validates DOCX file zip integrity, zip bomb protection, and Word document structure.
    
    Raises:
        InvalidSignatureError: If zip integrity fails, zip bomb thresholds are violated,
                               or Word schemas are missing.
    """
    # Verify standard zip magic bytes
    if not content.startswith(b"PK\x03\x04"):
        raise InvalidSignatureError("Invalid DOCX header signature.")
    
    try:
        with zipfile.ZipFile(io.BytesIO(content)) as z:
            total_uncompressed_size = 0
            
            # Inspect entries for ZIP bomb signatures
            for info in z.infolist():
                total_uncompressed_size += info.file_size
                
                # Check compression ratio for entries larger than 1MB
                if info.file_size > 1024 * 1024:
                    ratio = info.file_size / max(info.compress_size, 1)
                    if ratio > 100:
                        raise InvalidSignatureError(
                            f"Potential ZIP bomb detected: compression ratio for entry "
                            f"'{info.filename}' exceeds 100x."
                        )
            
            # Total uncompressed size boundary check
            MAX_UNCOMPRESSED_SIZE = 50 * 1024 * 1024  # 50MB
            if total_uncompressed_size > MAX_UNCOMPRESSED_SIZE:
                raise InvalidSignatureError(
                    f"Potential ZIP bomb detected: total uncompressed size "
                    f"({total_uncompressed_size} bytes) exceeds 50MB limit."
                )
            
            # Verify DOCX Word schemas exist in zip namelist
            names = z.namelist()
            if "[Content_Types].xml" not in names:
                raise InvalidSignatureError("Invalid DOCX file: missing '[Content_Types].xml'.")
            
            has_word_dir = any(name.startswith("word/") for name in names)
            if not has_word_dir:
                raise InvalidSignatureError("Invalid DOCX file: missing 'word/' folder structure.")
                
    except zipfile.BadZipFile as e:
        raise InvalidSignatureError(f"Corrupted or invalid ZIP file structure: {str(e)}") from e

def _validate_txt(content: bytes) -> None:
    """
    Validates plain text files for null bytes, decodability, and binary heuristic signatures.
    
    Raises:
        InvalidSignatureError: If text is corrupted, undecodable, or appears binary.
    """
    # Reject files containing null bytes immediately (standard binary heuristic)
    if b"\x00" in content:
        raise InvalidSignatureError("Plain text file contains null bytes.")
    
    decoded_text = None
    for encoding in ("utf-8-sig", "latin-1"):
        try:
            decoded_text = content.decode(encoding)
            break
        except UnicodeDecodeError:
            continue
            
    if decoded_text is None:
        raise InvalidSignatureError("Failed to decode text file as UTF-8 or Latin-1.")
    
    # Binary detection based on control character ratios
    if decoded_text:
        control_chars_count = sum(
            1 for c in decoded_text
            if (ord(c) < 32 and c not in "\t\n\r") or ord(c) == 127 or (128 <= ord(c) <= 159)
        )
        ratio = control_chars_count / len(decoded_text)
        MAX_CONTROL_CHAR_RATIO = 0.02  # 2% threshold
        if ratio > MAX_CONTROL_CHAR_RATIO:
            raise InvalidSignatureError(
                f"Plain text file appears to be binary (control character ratio of "
                f"{ratio:.2%} exceeds 2% limit)."
            )

def validate_resume(
    file_content: bytes,
    filename: str,
    mime_type: Optional[str] = None,
    max_size_bytes: int = 5 * 1024 * 1024
) -> None:
    """
    Main entry point for secure resume validation.
    Checks filename, size limits, allowed MIME types, and delegates content integrity checks.
    
    Raises:
        ValidationError: If size, extension, or content signatures fail validation.
    """
    try:
        # 1. Filename & Extension Validation
        ext = _validate_filename(filename)
        
        # 2. File Size Checks
        if len(file_content) == 0:
            raise FileSizeLimitError("File is empty (0 bytes).")
            
        if len(file_content) > max_size_bytes:
            raise FileSizeLimitError(
                f"File size ({len(file_content)} bytes) exceeds the maximum allowed size "
                f"of {max_size_bytes} bytes."
            )
            
        # 3. Optional MIME-Type Validation
        if mime_type:
            mime_lower = mime_type.lower().strip()
            allowed_mimes = {
                ".pdf": {"application/pdf", "application/octet-stream"},
                ".docx": {
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/octet-stream",
                    "application/zip"
                },
                ".txt": {"text/plain", "application/octet-stream"}
            }
            if mime_lower not in allowed_mimes.get(ext, set()):
                raise InvalidSignatureError(
                    f"MIME-type '{mime_type}' is not allowed for extension '{ext}'."
                )
                
        # 4. Content Signature / Magic Byte Checks
        if ext == ".pdf":
            _validate_pdf(file_content)
        elif ext == ".docx":
            _validate_docx(file_content)
        elif ext == ".txt":
            _validate_txt(file_content)
            
    except ValidationError as e:
        logger.warning("Validation failed for file '%s': %s", filename, str(e))
        raise e
