const express = require('express');
const router = express.Router();

const {sign_up, login, user_profile, allUsersInfo} = require('../controller/users.controller');
const {hashPass, comparePass} = require('../controller/middlewares/password');
const {auth_for_users} = require('../controller/middlewares/user_auth');

router.post('/create-account', hashPass, sign_up);

router.get('/login', comparePass, login);

router.get('/view-profile', user_profile);

router.get('/view-users-data', auth_for_users, allUsersInfo);

module.exports = router;