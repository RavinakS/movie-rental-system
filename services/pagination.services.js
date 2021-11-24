const moviesTable = require('../model/dbSchema.model').movies;

exports.getAllMovies = function(){
    return moviesTable.find({});
}

// module.exports = {getAllMovies};