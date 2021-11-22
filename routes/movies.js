const movies = require('../controller/movies');
const express = require('express');
const router = express.Router();
const user_auth = require('../controller/middlewares/user_auth');

const allMovies = movies.allMovies;
router.get('/all-movies', allMovies);

const addMovie = movies.addMovie;
router.post('/add-movie', user_auth, addMovie);

const moviesByGenre = movies.searchMovieByGenre;
router.get('/filter/:genre', moviesByGenre);

const filterByReleaseDate = movies.filterByReleaseDate;
router.get('/filter-release-date', filterByReleaseDate);

const rent_a_movie = movies.buyMovie;
router.put('/rent-movie', rent_a_movie);

const update_a_movie = movies.updateMovie;
router.put('/update-movie', user_auth, update_a_movie);

module.exports = router;