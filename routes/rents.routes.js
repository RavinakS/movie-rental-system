const express = require('express');
const router = express.Router();
const user_auth = require('../controller/middlewares/user_auth');
const rents = require('../controller/rents.controller');

// buy a movie
const auth_for_rent = user_auth.auth_for_rent;
const isRentExist = require('../controller/middlewares/isMovieRentExist');
const rent_a_movie = rents.buyMovie;
router.post('/rent-movie', auth_for_rent, isRentExist, rent_a_movie);

const auth_user = user_auth.auth_for_users;
const user_rents = rents.viewUserRents;
router.get('/user-rent', auth_user, user_rents);

module.exports = router;