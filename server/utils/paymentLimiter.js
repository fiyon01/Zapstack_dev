const rateLimit = require('express-rate-limit');

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10,             // limit each IP to 10 requests per window
  message: {
    error: "Too many payment requests, please try again later."
  }
});

module.exports = paymentLimiter