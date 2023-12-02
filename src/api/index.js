const express = require('express');
const registerApi = require('./register');
const loginApi = require('./routes/login.routes');
const meApi = require('./routes/me.routes');
const paymentApi = require('./payment');

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(paymentApi);
router.use(meApi);

module.exports = router;
