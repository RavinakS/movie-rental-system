const {all_movies, add_movie, search_movie_by_genre, filter_by_release_date, update_movie, delete_movie} = require('../controller/movies.controller');
const {user_auth_for_movie, auth_for_users} = require('../controller/middlewares/user_auth');

const express = require('express');
const router = express.Router();

//view all movies
router.get('/all-movies', all_movies);

// add a new movie
router.post('/add-movie', user_auth_for_movie, add_movie);

// search movie with a genere
router.get('/filter/:genre', search_movie_by_genre);

// search movie by release date
router.get('/filter-release-date', filter_by_release_date);

// update movie details
router.put('/update-movie', user_auth_for_movie, update_movie);

//delete a movie
router.delete('/delete-movie/:name', auth_for_users, delete_movie);

module.exports = router;