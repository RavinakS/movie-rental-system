const movieTable = require('../connection/dbSchema').movies;

const allMovies = () =>{
    return movieTable.find();
}

const addMovie = (movieData) =>{
    return movieTable.create(movieData);
}

const searchMovieByGenre = (genre) =>{
    return movieTable.find({genre:genre});
}

const filterByReleaseDate = (date) =>{
    return movieTable.find({releasDate: date});
}

const searchMovieByName = (m_name) =>{
    return movieTable.findOne({name: m_name}, {avalCD:1});
}

module.exports = {allMovies, addMovie, searchMovieByGenre, filterByReleaseDate, searchMovieByName};