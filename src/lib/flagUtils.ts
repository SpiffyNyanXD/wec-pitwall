export const getFlagEmoji = (code: string): string => {
  const trimmed = code.trim();

  // Validate: must be exactly 2 ASCII letters
  if (trimmed.length !== 2) {
    return code; // Return original to preserve caller's fallback
  }

  const upper = trimmed.toUpperCase();
  const isValidASCII = upper.split('').every(c => {
    const charCode = c.charCodeAt(0);
    return charCode >= 65 && charCode <= 90; // A-Z
  });

  if (!isValidASCII) {
    return code; // Return original to preserve caller's fallback
  }

  return upper
    .split('')
    .map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65))
    .join('');
};
