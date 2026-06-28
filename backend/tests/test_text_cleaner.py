import pytest
from app.utils.text_cleaner import (
    normalize_unicode,
    standardize_bullets,
    remove_control_characters,
    normalize_whitespace,
    normalize_blank_lines,
    clean_resume_text,
)

def test_normalize_unicode():
    assert normalize_unicode("ﬁle and ﬂow") == "file and flow"
    assert normalize_unicode("") == ""
    assert normalize_unicode("café") == "café"

def test_standardize_bullets():
    # Non-ASCII bullets at start of line
    assert standardize_bullets("• item 1") == "- item 1"
    assert standardize_bullets("● item 2") == "- item 2"
    assert standardize_bullets("▪item 3") == "- item 3"
    assert standardize_bullets("\uf0a7 item 4") == "- item 4"
    assert standardize_bullets("  ★ item 5") == "  - item 5"
    
    # ASCII bullets at start of line
    assert standardize_bullets("* item") == "- item"
    assert standardize_bullets("  - item") == "  - item"
    assert standardize_bullets("+ item") == "- item"
    
    # Preservation of terms like C++, full-time, A+B, ranges, percentages
    assert standardize_bullets("C++ developer") == "C++ developer"
    assert standardize_bullets("full-time position") == "full-time position"
    assert standardize_bullets("A+B") == "A+B"
    assert standardize_bullets("-5 to -10") == "-5 to -10"
    assert standardize_bullets("  -5%") == "  -5%"
    
    # Inline non-ASCII bullets
    assert standardize_bullets("Python • Django") == "Python - Django"

def test_remove_control_characters():
    # Standard whitespaces preserved
    text_with_std = "Line 1\nLine 2\r\tTabbed"
    assert remove_control_characters(text_with_std) == text_with_std
    
    # Problematic Cf characters removed
    text_with_invisible = "Hello\u200bWorld\u200c!\ufeff\u00ad"
    assert remove_control_characters(text_with_invisible) == "HelloWorld!"
    
    # PUA (Co) stripped
    text_with_pua = "Hello \ue000World"
    assert remove_control_characters(text_with_pua) == "Hello World"
    
    # Preserve other Cf characters (like left-to-right mark \u200e)
    assert remove_control_characters("\u200eHello") == "\u200eHello"

def test_normalize_whitespace():
    assert normalize_whitespace("Name:   John\t\tDoe") == "Name: John Doe"
    assert normalize_whitespace("  Indent   preserved") == "  Indent preserved"
    assert normalize_whitespace("Name:   John\t\tDoe   ") == "Name: John Doe"
    assert normalize_whitespace("  Indent   preserved   ") == "  Indent preserved"
    assert normalize_whitespace("") == ""

def test_normalize_blank_lines():
    # Reduces 3+ blank lines to max 2
    # 3 blank lines: Line 1 + \n + \n + \n + \n + Line 2 (which has 4 newlines)
    raw = "Line 1\n\n\n\nLine 2"
    assert normalize_blank_lines(raw) == "Line 1\n\n\nLine 2"
    
    # 4 blank lines (5 newlines) -> 2 blank lines (3 newlines)
    raw_many = "Line 1\n\n\n\n\nLine 2"
    assert normalize_blank_lines(raw_many) == "Line 1\n\n\nLine 2"

def test_clean_resume_text_empty():
    assert clean_resume_text("") == ""
    assert clean_resume_text(None) == ""

def test_clean_resume_text_pipeline():
    raw_resume = """
    Jane Doe
    ﬁﬁ   Full Stack   Developer
    
    
    
    •   Python, C++
    *   Django, React
    
    
    Contact:   jane@example.com\u200b
    """
    
    cleaned = clean_resume_text(raw_resume)
    
    # Expected results:
    # 1. Unicode ligature conversion: ﬁﬁ -> fifi
    # 2. Spaces collapsed, leading spaces preserved
    # 3. Bullets standardized
    # 4. Invisible chars (\u200b) removed
    # 5. Excess newlines reduced (max 2 consecutive blank lines / 3 newlines separating blocks)
    # 6. Entire text stripped
    
    assert "fifi Full Stack Developer" in cleaned
    assert "- Python, C++" in cleaned
    assert "- Django, React" in cleaned
    assert "jane@example.com" in cleaned
    # Ensure there are no 4 consecutive newlines (3 blank lines)
    assert "\n\n\n\n" not in cleaned

def test_adversarial_clean_cases():
    # Mixed Unicode Bullets
    assert clean_resume_text("• ● ▪ Item") == "- - - Item"
    
    # Tabbed nested indentation
    assert clean_resume_text("\t  * Nested Item") == "\t  - Nested Item"
    
    # Unicode directional markers
    assert clean_resume_text("\u200eLeft-to-right text") == "\u200eLeft-to-right text"
    
    # Embedded inline non-ASCII bullets
    assert clean_resume_text("Experience: • Python ● Django") == "Experience: - Python - Django"
    
    # Negative values/percentages at start of line
    assert clean_resume_text("-10% reduction") == "-10% reduction"
    assert clean_resume_text("-5 to -10 degrees") == "-5 to -10 degrees"
    
    # Wingdings checkmark bullet
    assert clean_resume_text("\uf0fc Task accomplished") == "- Task accomplished"
    
    # Null bytes and other control codes
    assert clean_resume_text("Text\x00with\x07bell") == "Textwithbell"
    
    # Trailing line spaces collapse and strip
    assert clean_resume_text("Line 1    \nLine 2") == "Line 1\nLine 2"

