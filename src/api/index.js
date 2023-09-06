const express = require('express');
const registerApi = require('./register');
const loginApi = require('./login');
const paymentApi = require('./me');

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(paymentApi);

module.exports = router;
