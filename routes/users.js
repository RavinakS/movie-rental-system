const users = require('../controller/users');
const express = require('express');
const router = express.Router();

const hashPassword = require('../controller/middlewares/password').hashPass;
const createAccount = users.signUp;
router.post('/create-account', hashPassword, createAccount);

const verifyPassword = require('../controller/middlewares/password').comparePass;
const login = users.login
router.get('/login', verifyPassword, login);

module.exports = router;