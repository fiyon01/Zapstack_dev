// routes/mpesa.js
const express = require('express');
const router = express.Router();

router.post('/callback', (req, res) => {
  const payload = req.body;
  const projectId = req.headers['x-zapstack-project-id']; // optional, useful for multi-project setups

  // ✅ 1. Store or process the response
  console.log('✅ M-Pesa callback received:', payload);

  // Example: save to database
  // await db.saveMpesaResponse(payload);

  // ✅ 2. Send a success response
  res.status(200).json({ message: 'Callback processed successfully.' });
});

module.exports = router;
