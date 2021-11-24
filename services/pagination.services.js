const { movies } = require('../model/dbSchema.model');

exports.getAllMovies = function(){
    return movies.find({});
}
