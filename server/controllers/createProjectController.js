const db = require('../config/db');
const generateZapKey = require('../utils/generateZapkey');
const dotenv = require("dotenv");
const generateSecretKey = require("../utils/generateSecretKey")
dotenv.config();

/**
 * Controller to create a new project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response
 */
const createProject = async (req, res) => {
  try {
    console.log("Creating project with body:", req.body);
    const { name, environment, type, provider, credentials, baseUrl, apiKey, headers } = req.body;
    const userId = req.user_id || 1; // fallback to 1 for testing

    if (!name || !environment || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🧠 Prevent duplicate project names for this user
    const [existingProject] = await db.query(
      `SELECT id FROM projects WHERE user_id = ? AND name = ?`,
      [userId, name]
    );

    if (existingProject.length > 0) {
      return res.status(400).json({
        error: "A project with the same name already exists for this user."
      });
    }

    const zapKey = await generateZapKey();
    const zap_secret_key = await generateSecretKey()

    // 🔁 Payments: mpesa, paystack, stripe
    if (type === "payments") {
      switch (provider) {
        case "mpesa": {
          const { shortcode, passkey, consumerKey, consumerSecret, callbackUrl } = credentials;
          if (!shortcode || !passkey || !consumerKey || !consumerSecret) {
            return res.status(400).json({ error: "Missing required MPesa fields" });
          }

          const mpesaQuery = `
            INSERT INTO projects 
            (user_id, name, environment, type, provider, shortcode, passkey, consumerKey, consumerSecret, webhookUrl, zapStackKey, zap_secretKey) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const [mpesaResult] = await db.execute(mpesaQuery, [
            userId, name, environment, type, provider,
            shortcode, passkey, consumerKey, consumerSecret,
            callbackUrl || 'https://zapstacktest.loca.lt/api/mpesa/callback',
            zapKey, zap_secret_key
          ]);

          return res.status(201).json({
            success: true,
            message: "MPesa project created successfully",
            project: {
              id: mpesaResult.insertId,
              name,
              type,
              provider,
              zapKey,
              callback_url: callbackUrl || "https://zapstacktest.loca.lt/api/mpesa/callback"
            }
          });
        }

        case "paystack":
        case "stripe": {
          const { secretKey, publicKey, webhookSecret } = credentials;
          if (!secretKey || !publicKey || (provider === "paystack" && !webhookSecret)) {
            return res.status(400).json({ error: `Missing required fields for ${provider}` });
          }

          const paymentQuery = `
            INSERT INTO projects 
            (user_id, name, environment, type, provider, secret_key, public_key, webhook_secret, zapStackKey) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const [paymentResult] = await db.execute(paymentQuery, [
            userId, name, environment, type, provider,
            secretKey, publicKey, webhookSecret || null, zapKey
          ]);

          return res.status(201).json({
            success: true,
            message: `${provider} project created successfully`,
            project: { id: paymentResult.insertId, name, type, provider, zapKey }
          });
        }

        default:
          return res.status(400).json({ error: `Unsupported payment provider: ${provider}` });
      }
    }

    // 🌐 API Proxy Projects
    else if (type === "api_proxy") {
      if (!baseUrl || !apiKey) {
        return res.status(400).json({ error: "Missing required fields for API project" });
      }

      // Ensure headers is a valid JSON object
      let headersJson = null;
      if (headers && typeof headers === 'object') {
        headersJson = JSON.stringify(headers);
      } else if (headers) {
        try {
          headersJson = JSON.stringify(JSON.parse(headers));
        } catch (err) {
          return res.status(400).json({ error: "Invalid headers format, must be a JSON object" });
        }
      }

      // Optional: Check for duplicate name + apiKey
      const [duplicateApiKey] = await db.query(
        `SELECT id FROM projects WHERE user_id = ? AND name = ? AND api_key = ? AND type = 'api_proxy'`,
        [userId, name, apiKey]
      );

      if (duplicateApiKey.length > 0) {
        return res.status(400).json({
          error: "An API proxy project with the same name and API key already exists."
        });
      }

      const apiQuery = `
        INSERT INTO projects 
        (user_id, name, environment, type, base_url, api_key, headers, zapStackKey, zap_secretKey) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [apiResult] = await db.execute(apiQuery, [
        userId,
        name,
        environment,
        "api_proxy",
        baseUrl,
        apiKey,
        headersJson,
        zapKey, zap_secret_key
      ]);

      return res.status(201).json({
        success: true,
        message: "API project created successfully",
        project: {
          id: apiResult.insertId,
          name,
          type,
          zapKey,
          apiKey,
          headers: headersJson ? JSON.parse(headersJson) : null
        }
      });
    }

    // ❌ Unsupported type
    else {
      return res.status(400).json({ error: "Unsupported project type" });
    }

  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({
      error: "Server error while creating project",
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { createProject };
