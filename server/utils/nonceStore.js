const db = require('../config/db'); // Your configured MySQL connection or pool

async function checkNonceUsed(projectId, nonce) {
  const [rows] = await db.query(
    "SELECT id FROM nonces WHERE project_id = ? AND nonce = ? LIMIT 1",
    [projectId, nonce]
  );
  return rows.length > 0;
}

async function storeNonce(projectId, nonce) {
  try {
    await db.query(
      "INSERT INTO nonces (project_id, nonce) VALUES (?, ?)",
      [projectId, nonce]
    );
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      // Optional: silently fail or throw a custom error
      throw new Error("Nonce already used");
    }
    throw error;
  }
}

module.exports = { checkNonceUsed, storeNonce };
