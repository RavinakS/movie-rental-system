const movieTable = require('../model/dbSchema.model').movies;

exports.allMovies = () =>{
    return movieTable.find();
}

exports.addMovie = (movieData) =>{
    return movieTable.create(movieData);
}

exports.searchMovieByGenre = (genre) =>{
    return movieTable.find({genre:genre});
}

exports.filterByReleaseDate = (date) =>{
    return movieTable.find({releasDate: date});
}

exports.avalRentsMovieByName = (m_name) =>{
    return movieTable.findOne({name: m_name}, {avalCD:1});
}

exports.getMovieByName = (m_name) =>{
    return movieTable.findOne({name: m_name});
}

exports.updateMovie = (m_name, m_details) =>{
    return movieTable.updateOne({name: m_name}, {$set: m_details});
}

exports.deleteMovie = (m_name) =>{
    return movieTable.deleteOne({name: m_name});
}

// module.exports = {allMovies, addMovie, searchMovieByGenre, filterByReleaseDate, avalRentsMovieByName, updateMovie, getMovieByName, deleteMovie};