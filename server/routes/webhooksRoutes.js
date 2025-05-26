// routes/webhooks.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../config/db');
const { storeMpesaResponse } = require('../utils/mpesaCache');
const { addToRetryQueue } = require('../utils/retryQueue');
const dotenv = require('dotenv');
dotenv.config();

router.post('/mpesa', async (req, res) => {
  try {
    const body = req.body;
    const merchantRequestID = body?.Body?.stkCallback?.MerchantRequestID;

    console.log("📥 Raw M-Pesa callback:", body);

    const [rows] = await pool.query(
      "SELECT p.* FROM projects p JOIN logs l ON p.id = l.projectId WHERE l.referenceId IS NOT NULL AND JSON_UNQUOTE(JSON_EXTRACT(l.payload, '$.Body.stkCallback.MerchantRequestID')) = ? LIMIT 1",
      [merchantRequestID]
    );

    console.log("🔍 Query results:", rows);

    const project = rows[0];
    if (!project) return res.status(404).json({ message: "Unknown project." });

    const parsed = storeMpesaResponse(project.id, body);
    console.log("✅ Parsed M-Pesa Response:", parsed); // THIS SHOWS STATUS

    if (project.webhook_url) {
      try {
        await axios.post(project.webhook_url, parsed, {
          headers: {
            'Content-Type': 'application/json',
            'x-zapstack-project-id': project.id,
          }
        });
      } catch (err) {
        console.error(`⚠️ Webhook delivery failed: ${err.message}`);
        addToRetryQueue(project.webhook_url, parsed, project.id);
      }
    }

    res.status(200).json({ message: 'Callback received successfully' });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
