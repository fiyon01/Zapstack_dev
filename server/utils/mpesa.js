// utils/mpesa.js

const axios = require("axios");
const base64 = require("base-64");
const dayjs = require("dayjs");
const { checkNonceUsed, storeNonce } = require("./nonceStore");

const tokenCache = new Map();

function getTokenCacheKey(consumerKey, env) {
  return `${consumerKey}-${env}`;
}

async function getMpesaToken({ consumerKey, consumerSecret, environment }) {
  const key = getTokenCacheKey(consumerKey, environment);
  const cached = tokenCache.get(key);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.token;
  }

  const url =
    environment === "production"
      ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
      : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const authHeader = base64.encode(`${consumerKey}:${consumerSecret}`);

  const res = await axios.get(url, {
    headers: { Authorization: `Basic ${authHeader}` },
  });

  const token = res.data.access_token;

  // Cache for ~58 mins
  tokenCache.set(key, {
    token,
    expiresAt: Date.now() + 3500 * 1000,
  });

  return token;
}

async function initiateStkPush({
  projectId,
  token,
  nonce,
  shortcode,
  passkey,
  amount,
  phone,
  callbackUrl,
  environment,
}) {

  const used = await checkNonceUsed(projectId, nonce);
  if (used) {
    throw new Error("Nonce already used. Possible replay attack.");
  }

  await storeNonce(projectId, nonce);

  
  const timestamp = dayjs().format("YYYYMMDDHHmmss");
  const password = base64.encode(`${shortcode}${passkey}${timestamp}`);

  const url =
    environment === "production"
      ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const body = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: callbackUrl,
    AccountReference: "ZapStack",
    TransactionDesc: "ZapStack Payment",
  };

  const res = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
}

module.exports = {
  getMpesaToken,
  initiateStkPush,
};
