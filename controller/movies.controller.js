const { movieValidation } = require('./utils/schemaValidation');
const {allMovies, addMovie, searchMovieByGenre, filterByReleaseDate, updateMovie, deleteMovie} = require('../services/movies.services');

// Home Page
// Search movie by a genre
exports.search_movie_by_genre = async (req, res) =>{
    genre = req.params.genre;
    if(genre === undefined){
        return res.send("Please provide a genere you wanna search with.")
    }
    try{
        movies = await searchMovieByGenre(genre);
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
exports.filter_by_release_date = async (req, res) =>{
    let r_date = req.body.releasDate;
    if(r_date === undefined){
        return res.send("Please provide release date you wanna search.")
    }
    try{
        let movies = await filterByReleaseDate(r_date);
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
exports.all_movies = async (req, res) =>{
    movies = await allMovies();
    res.send(movies);
}


//Adding a movie to in App
exports.add_movie = async (req, res) =>{
    try{
        //checking user role through middleware
        movieDetails = req.admin;
        //validate movie details
        await movieValidation.validate(movieDetails);

    }catch(err){
        return res.send(err.details[0].message);
    }
    // add movie Info in DB
    try{
        added = await addMovie(movieDetails);
        res.send("Movie has been added.");
    }catch(err){
        if(err.name === "MongoServerError" && err.code === 11000){ 
            console.log({error: err.code, Status: "This movie is already exist.", message: "Use search-bar to get the movie."});
            return res.send({Status: "This movie is already exist.", message: "Use search-bar to get the movie."});
        }
        return res.send(err);
    }

}

exports.update_movie = async (req, res) =>{
    try{
        //checking user role through middleware
        movieDetails = req.admin;
        //validate movie details
        await movieValidation.validate(movieDetails);

    }catch(err){
        return res.send(err.details[0].message);
    }
    // Updating the movie details
    try{
        update = await updateMovie(req.body.name, movieDetails);
        if(update.matchedCount===0){
            return res.send("Couldn't find the movie.")
        }
        res.send("Updated Successfully.");
    }catch(err){
        console.log(err);
        res.send(err);
    }

}

exports.delete_movie = async (req, res) =>{
    try{
        if(!req.admin){
            return res.send("You don't have access to delete a movie.")
        }
        movieName = req.params.name;
        delete_movie = await deleteMovie(movieName);
        if(delete_movie.deletedCount === 0){
            return res.send("Movie couldn't find.");
        }
        res.send("Have Successfully Deleted the Movie");

    }catch(err){
        console.log(err);
        res.send(err)
    }
}
