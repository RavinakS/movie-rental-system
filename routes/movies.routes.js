const movies = require('../controller/movies.controller');
const express = require('express');
const router = express.Router();
const user_auth = require('../controller/middlewares/user_auth');

//view all movies
const allMovies = movies.allMovies;
router.get('/all-movies', allMovies);

// add a new movie
let auth_for_movie = user_auth.user_auth_for_movie;
const addMovie = movies.addMovie;
router.post('/add-movie', auth_for_movie, addMovie);

// search movie with a genere
const moviesByGenre = movies.searchMovieByGenre;
router.get('/filter/:genre', moviesByGenre);

// search movie by release date
const filterByReleaseDate = movies.filterByReleaseDate;
router.get('/filter-release-date', filterByReleaseDate);

// update movie details
// auth_for_movie = from line no 11 (already declared)
const update_a_movie = movies.updateMovie;
router.put('/update-movie', auth_for_movie, update_a_movie);

const delete_a_movie = movies.deleteMovie;
const auth_user = require('../controller/middlewares/user_auth').auth_for_users;
router.delete('/delete-movie/:name', auth_user, delete_a_movie);

module.exports = router;