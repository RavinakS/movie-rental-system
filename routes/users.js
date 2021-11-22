const users = require('../controller/users');
const password = require('../controller/middlewares/password');
const express = require('express');
const router = express.Router();

const hashPassword = password.hashPass;
const createAccount = users.signUp;
router.post('/create-account', hashPassword, createAccount);

const verifyPassword = password.comparePass;
const login = users.login
router.get('/login', verifyPassword, login);

const profile = users.profile;
router.get('/view-profile', profile);

module.exports = router;