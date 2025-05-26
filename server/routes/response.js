// routes/response.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { getMpesaResponse } = require('../utils/mpesaCache');

router.get('/response', async (req, res) => {
  try {
    const zapStackKey = req.headers['x-zap-key'];
    if (!zapStackKey) return res.status(400).json({ error: "Missing x-zap-key header" });

    const [rows] = await pool.query(
      "SELECT * FROM projects WHERE zapStackKey = ? AND type = 'payments' AND provider = 'mpesa'",
      [zapStackKey]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Project not found or not using M-Pesa" });
    }

    const project = rows[0];
    const cached = getMpesaResponse(project.id);

    if (!cached) return res.status(404).json({ message: "No recent payment response found" });

    return res.json({ success: true, data: cached });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
