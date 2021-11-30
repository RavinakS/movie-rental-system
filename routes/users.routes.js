const express = require('express');
const router = express.Router();

const {sign_up, login, user_profile, allUsersInfo} = require('../controller/users.controller');
const {hashPass, comparePass} = require('../controller/middlewares/password');
const {auth_for_users} = require('../controller/middlewares/user_auth');
const {userValidation} = require('../controller/utils/schemaValidation')

router.post('/create-account', userValidation, hashPass, sign_up);

router.post('/login', comparePass, login);

router.get('/view-profile', user_profile);

router.get('/view-users-data', auth_for_users, allUsersInfo);

module.exports = router;