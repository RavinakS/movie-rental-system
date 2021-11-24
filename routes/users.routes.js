const users = require('../controller/users.controller');
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

const auth = require('../controller/middlewares/user_auth').auth_for_users;
const allUsersData = users.allUsersInfo;
router.get('/view-users-data', auth, allUsersData);

module.exports = router;