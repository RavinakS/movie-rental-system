const users = require('../controller/users');
const express = require('express');
const router = express.Router();

const createAccount = users.signUp;
const hashPassword = require('../controller/middlewares/password').hashPass;
router.post('/create-account', hashPassword, createAccount);

module.exports = router;