const moviesTable = require('../connection/dbSchema').movies;

function getAllMovies(){
    return moviesTable.find({});
}

module.exports = {getAllMovies};