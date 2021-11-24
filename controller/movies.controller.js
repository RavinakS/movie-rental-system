const moviesTable = require('../services/movies.services');
// const rentsTable = require('../model/rents');
const userToken = require('./utils/token');
const movieValidations = require('./utils/schemaValidation').movieValidation;

// Home Page
// Search movie by a genre
exports.searchMovieByGenre = async (req, res) =>{
    genre = req.params.genre;
    if(genre === undefined){
        return res.send("Please provide a genere you wanna search with.")
    }
    try{
        movies = await moviesTable.searchMovieByGenre(genre);
        if(movies.length === 0){
            return res.send("Not Available.");
        }
        res.send(movies);
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

// search movie by release date
exports.filterByReleaseDate = async (req, res) =>{
    let r_date = req.body.releasDate;
    if(r_date === undefined){
        return res.send("Please provide release date you wanna search.")
    }
    try{
        let movies = await moviesTable.filterByReleaseDate(r_date);
        if(movies.length === 0){
            return res.send("Couldn't Find.");
        }
        res.send(movies);
    }catch(err){
        console.log(err);
        res.send(err);
    }
} 


// Show all movies.
exports.allMovies = async (req, res) =>{
    movies = await moviesTable.allMovies();
    res.send(movies);
}


//Adding a movie to in App
exports.addMovie = async (req, res) =>{
    try{
        //checking user role through middleware
        movieDetails = req.admin;
        //validate movie details
        await movieValidations.validate(movieDetails);

    }catch(err){
        return res.send(err.details[0].message);
    }
    // add movie Info in DB
    try{
        added = await moviesTable.addMovie(movieDetails);
        res.send("Movie has been added.");
    }catch(err){
        if(err.name === "MongoServerError" && err.code === 11000){ 
            console.log({error: err.code, Status: "This movie is already exist.", message: "Use search-bar to get the movie."});
            return res.send({Status: "This movie is already exist.", message: "Use search-bar to get the movie."});
        }
        return res.send(err);
    }

}

exports.updateMovie = async (req, res) =>{
    try{
        //checking user role through middleware
        movieDetails = req.admin;
        //validate movie details
        await movieValidations.validate(movieDetails);

    }catch(err){
        return res.send(err.details[0].message);
    }
    // Updating the movie details
    try{
        update = await moviesTable.updateMovie(req.body.name, movieDetails);
        if(update.matchedCount===0){
            return res.send("Couldn't find the movie.")
        }
        res.send("Updated Successfully.");
    }catch(err){
        console.log(err);
        res.send(err);
    }

}

exports.deleteMovie = async (req, res) =>{
    try{
        if(!req.admin){
            return res.send("You don't have access to delete a movie.")
        }
        movieName = req.params.name;
        delete_movie = await moviesTable.deleteMovie(movieName);
        if(delete_movie.deletedCount === 0){
            return res.send("Movie couldn't find.");
        }
        res.send("Have Successfully Deleted the Movie");

    }catch(err){
        console.log(err);
        res.send(err)
    }
}



// module.exports = {allMovies, addMovie, searchMovieByGenre, filterByReleaseDate, updateMovie, deleteMovie};