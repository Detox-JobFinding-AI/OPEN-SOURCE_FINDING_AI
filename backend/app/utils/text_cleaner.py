import re
import unicodedata
from typing import Optional

# Problematic formatting characters (Cf) to remove
# Zero-width space, Zero-width non-joiner, Zero-width joiner, Byte order mark, Soft hyphen
PROBLEMATIC_CF = {
    '\u200b',  # Zero-width space
    '\u200c',  # Zero-width non-joiner
    '\u200d',  # Zero-width joiner
    '\ufeff',  # Byte order mark
    '\u00ad',  # Soft hyphen
}

# Regex to match ASCII bullets (*, +, -) followed by at least one space/tab at start of line
ASCII_BULLET_RE = re.compile(r"^([ \t]*)([\-\*\+])([ \t]+)(.*)$")

# Regex to match non-ASCII resume bullets at start of line, with optional trailing space/tab
NON_ASCII_BULLET_RE = re.compile(
    r"^([ \t]*)([•●▪‣◦▫◆◇♦★\uf0a7\uf0b7\uf0fc])([ \t]*)(.*)$"
)

# Set of non-ASCII bullets to search for inline
NON_ASCII_BULLETS_SET = set("•●▪‣◦▫◆◇♦★\uf0a7\uf0b7\uf0fc")

def normalize_unicode(text: str) -> str:
    """
    Applies Unicode NFKC normalization to standardize compatibility characters,
    ligatures, and accents.
    """
    if not text:
        return ""
    return unicodedata.normalize("NFKC", text)

def standardize_bullets(text: str) -> str:
    """
    Standardizes common resume bullets (ASCII list markers and non-ASCII/PUA/Wingdings bullets)
    to a standard "- " bullet format. Keeps programming terms like C++ and hyphenated
    words like full-time intact.
    """
    if not text:
        return ""
        
    lines = text.splitlines()
    standardized_lines = []
    
    for line in lines:
        # Check ASCII bullet list marker at start of line (requires trailing whitespace)
        ascii_match = ASCII_BULLET_RE.match(line)
        if ascii_match:
            indent = ascii_match.group(1)
            rest = ascii_match.group(4)
            line = f"{indent}- {rest}"
        else:
            # Check non-ASCII bullet at start of line (optional trailing whitespace)
            non_ascii_match = NON_ASCII_BULLET_RE.match(line)
            if non_ascii_match:
                indent = non_ascii_match.group(1)
                rest = non_ascii_match.group(4)
                line = f"{indent}- {rest}"
                
        # For any remaining non-ASCII bullet characters inline, map them to a standard hyphen "-"
        inline_chars = []
        for c in line:
            if c in NON_ASCII_BULLETS_SET:
                inline_chars.append("-")
            else:
                inline_chars.append(c)
        line = "".join(inline_chars)
        
        standardized_lines.append(line)
        
    return "\n".join(standardized_lines)

def remove_control_characters(text: str) -> str:
    """
    Removes non-printable control characters (Cc) except \n, \r, \t, target problematic
    formatting characters (Cf), surrogates (Cs), and remaining private use (Co) or unassigned (Cn) chars.
    Preserves other formatting (Cf) characters.
    """
    if not text:
        return ""
        
    result = []
    for c in text:
        cat = unicodedata.category(c)
        if cat == 'Cc':
            if c in ('\n', '\r', '\t'):
                result.append(c)
        elif cat == 'Cf':
            if c not in PROBLEMATIC_CF:
                result.append(c)
        elif cat in ('Co', 'Cs', 'Cn'):
            # Strip remaining Private Use, Surrogates, and Unassigned
            pass
        else:
            result.append(c)
    return "".join(result)

def normalize_whitespace(text: str) -> str:
    """
    Collapses repeated spaces/tabs inside lines while preserving leading indentation.
    """
    if not text:
        return ""
        
    lines = text.splitlines()
    normalized_lines = []
    
    for line in lines:
        match = re.match(r"^([ \t]*)(.*)$", line)
        if match:
            leading = match.group(1)
            content = match.group(2)
            # Collapse multiple spaces and tabs inside the content to a single space and strip trailing
            collapsed_content = re.sub(r"[ \t]+", " ", content).rstrip()
            normalized_lines.append(leading + collapsed_content)
        else:
            normalized_lines.append(line)
            
    return "\n".join(normalized_lines)

def normalize_blank_lines(text: str) -> str:
    """
    Normalizes line endings to "\n" and reduces 3 or more consecutive blank lines
    to a maximum of 2 blank lines (which separates text blocks by at most 2 newlines).
    """
    if not text:
        return ""
        
    # splitlines handles different line endings and normalizes them
    lines = text.splitlines()
    
    normalized_lines = []
    consecutive_blank = 0
    
    for line in lines:
        is_blank = not line.strip()
        if is_blank:
            consecutive_blank += 1
            if consecutive_blank <= 2:
                normalized_lines.append("")
        else:
            consecutive_blank = 0
            normalized_lines.append(line)
            
    return "\n".join(normalized_lines)

def clean_resume_text(text: Optional[str]) -> str:
    """
    Main entry point for cleaning and normalizing raw extracted resume text.
    Applies the cleaning pipeline sequentially:
    1. Unicode NFKC normalization
    2. Bullet point standardization
    3. Control and problematic invisible character removal
    4. Whitespace collapsing (preserving indentation)
    5. Blank line and line ending normalization
    """
    if not text:
        return ""
        
    text = normalize_unicode(text)
    text = standardize_bullets(text)
    text = remove_control_characters(text)
    text = normalize_whitespace(text)
    text = normalize_blank_lines(text)
    
    return text.strip('\n')
