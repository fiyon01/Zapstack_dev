const crypto = require('crypto');

function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex'); // 64 hex chars, 256 bits
}

module.exports = generateSecretKey