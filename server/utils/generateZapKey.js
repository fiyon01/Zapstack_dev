const crypto = require('crypto');

function generateZapKey() {
    const uniquePart = crypto.randomBytes(6).toString('hex'); // 12 characters
    return `zap_key${uniquePart}`.slice(0, 16); // Ensure it's exactly 16 characters
}

module.exports = generateZapKey;