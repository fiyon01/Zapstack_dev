const db = require("../config/db");
const { getMpesaToken, initiateStkPush } = require("../utils/mpesa");
const { v4: uuidv4 } = require("uuid");
const dotenv = require('dotenv');
const validateZapKey = require('../utils/validateZapKey');
dotenv.config();

const initiatePayment = async (req, res) => {
  const startTime = Date.now();
  const referenceId = uuidv4();
  const endpoint = "/api/initiate/payments/mpesa";
  let projectId = null;
  let event = "error";
  let logPayload = {};
  let statusCode = 500;
  let message = '';
  let environment = 'development'; // default fallback

  try {
    const zapStackKey = req.headers["x-zap-key"];
    const { phone, amount } = req.body;

    if (!zapStackKey || !phone || !amount) {
      message = "Missing zapStackKey, phone, or amount";
      logPayload = { error: message, zapStackKey, phone, amount };
      throw new Error(message);
    }

    if (!validateZapKey(zapStackKey)) {
      message = "Invalid zapStackKey format";
      logPayload = { error: message, zapStackKey };
      throw new Error(message);
    }

    const [rows] = await db.query(
      "SELECT * FROM projects WHERE zapStackKey = ? AND type = 'payments' AND provider = 'mpesa'",
      [zapStackKey]
    );

    if (!rows.length) {
      message = "Project not found or not using M-Pesa";
      logPayload = { error: message, zapStackKey };
      throw new Error(message);
    }

    const project = rows[0];
    projectId = project.id;
    if(!projectId){
      console.log("No project id")
    }
    environment = project.environment || 'development';

    const token = await getMpesaToken({
      consumerKey: project.consumerKey,
      consumerSecret: project.consumerSecret,
      environment,
    });

    // Generate nonce here or receive from client (optional)
    const nonce = req.body.nonce || uuidv4();

    const stkRes = await initiateStkPush({
      projectId,
      nonce,
      token,
      shortcode: project.shortcode,
      passkey: project.passkey,
      amount,
      phone,
      callbackUrl: project.webhookUrl,
      environment,
    });

    event = "success";
    logPayload = stkRes;
    statusCode = 200;
    message = "STK Push initiated successfully";

    return res.json({
      success: true,
      message,
      data: {
        merchantRequestID: stkRes.MerchantRequestID,
        checkoutRequestID: stkRes.CheckoutRequestID,
        referenceId,
        duration_ms: Date.now() - startTime,
      },
    });
  } catch (err) {
    message = err.message || "STK Push failed";
    console.error("STK Error:", message);
    if (!logPayload.error) {
      logPayload = { error: message };
    }
    statusCode = 500;
    return res.status(500).json({ error: message });
  } finally {
    const duration = Date.now() - startTime;
    await db.query(
      `INSERT INTO logs (projectId, type, referenceId, payload, endpoint, duration_ms, event, status_code, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        projectId,
        "stk_initiate",
        referenceId,
        JSON.stringify(logPayload),
        endpoint,
        duration,
        event,
        statusCode,
        message,
      ]
    );
  }
};

module.exports = { initiatePayment };
