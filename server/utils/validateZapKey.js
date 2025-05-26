function validateZapKey(zapKey) {
  if (typeof zapKey !== 'string') return false;
  if (zapKey.length !== 16) return false;
  if (!zapKey.startsWith('zap_key')) return false;

  // Check if the last 10 chars are hex digits
  const hexPart = zapKey.slice(7);
  return /^[a-f0-9]{9,}$/.test(hexPart);  // at least 9 hex chars
}

module.exports = validateZapKey;
