const {allMovies, addMovie, searchMovieByGenre, filterByReleaseDate, updateMovie, deleteMovie} = require('../controller/movies.controller');
const {user_auth_for_movie, auth_for_users} = require('../controller/middlewares/user_auth');

const express = require('express');
const router = express.Router();

//view all movies
router.get('/all-movies', allMovies);

// add a new movie
router.post('/add-movie', user_auth_for_movie, addMovie);

// search movie with a genere
router.get('/filter/:genre', searchMovieByGenre);

// search movie by release date
router.get('/filter-release-date', filterByReleaseDate);

// update movie details
router.put('/update-movie', user_auth_for_movie, updateMovie);

//delete a movie
router.delete('/delete-movie/:name', auth_for_users, deleteMovie);

module.exports = router;