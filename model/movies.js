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

const avalRentsMovieByName = (m_name) =>{
    return movieTable.findOne({name: m_name}, {avalCD:1});
}

const getMovieByName = (m_name) =>{
    return movieTable.findOne({name: m_name});
}

const updateMovie = (m_name, m_details) =>{
    return movieTable.updateOne({name: m_name}, {$set: m_details});
}

const deleteMovie = (m_name) =>{
    return movieTable.deleteOne({name: m_name});
}

module.exports = {allMovies, addMovie, searchMovieByGenre, filterByReleaseDate, avalRentsMovieByName, updateMovie, getMovieByName, deleteMovie};