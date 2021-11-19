const users = require('../controller/users');
const express = require('express');
const router = express.Router();

const createAccount = users.signUp;
router.post('/create-account', createAccount);

module.exports = router;