const movies = require('../controller/movies');
const express = require('express');
const router = express.Router();

const allMovies = movies.allMovies;
router.get('/all-movies', allMovies);

const addMovie = movies.addMovie;
router.post('/add-movie', addMovie);

const moviesByGenre = movies.searchMovieByGenre;
router.get('/filter/:genre', moviesByGenre);

const filterByReleaseDate = movies.filterByReleaseDate;
router.get('/filter-release-date', filterByReleaseDate);

module.exports = router;