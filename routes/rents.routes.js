const express = require('express');
const router = express.Router();
const {buyMovie, viewUserRents} = require('../controller/rents.controller');
const {auth_for_rent, auth_for_users} = require('../controller/middlewares/user_auth');
const {isMovieRentExist} = require('../controller/middlewares/isMovieRentExist');

// buy a movie
router.post('/rent-movie', auth_for_rent, isMovieRentExist, buyMovie);

// view rent details of a particuler user
router.get('/user-rent', auth_for_users, viewUserRents);

module.exports = router;