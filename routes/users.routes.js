const express = require('express');
const router = express.Router();

const {signUp, login, profile, allUsersInfo} = require('../controller/users.controller');
const {hashPass, comparePass} = require('../controller/middlewares/password');
const {auth_for_users} = require('../controller/middlewares/user_auth');

router.post('/create-account', hashPass, signUp);

router.get('/login', comparePass, login);

router.get('/view-profile', profile);

router.get('/view-users-data', auth_for_users, allUsersInfo);

module.exports = router;