// routes/paymentRoutes.js

const express = require("express");
const router = express.Router();
const { initiatePayment } = require("../controllers/payment");

router.post("/mpesa", initiatePayment);

module.exports = router;
