const { movies } = require('../model/userSchema.model');

exports.getAllMovies = function(){
    return movies.find({});
}
