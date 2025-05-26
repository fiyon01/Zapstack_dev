// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/signupController');
const { login } = require('../controllers/loginController');



router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
