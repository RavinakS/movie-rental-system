const { movieValidation } = require('./utils/schemaValidation');
const {allMovies, addMovie, searchMovieByGenre, filterByReleaseDate, updateMovie, deleteMovie} = require('../services/movies.services');

// Home Page
// Search movie by a genre
exports.search_movie_by_genre = async (req, res) =>{
    genre = req.params.genre;
    if(genre === undefined){
        return res.status(400).send({status_code: 400, error_msg: "Please provide a genere you wanna search with."})
    }
    try{
        movies = await searchMovieByGenre(genre);
        if(movies.length === 0){
            return res.status(404).send({status_code: 404, message: "Not Available."});
        }
        res.status(200).send({status_code: 200, data: movies});
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

// search movie by release date
exports.filter_by_release_date = async (req, res) =>{
    let r_date = req.body.releasDate;
    if(r_date === undefined){
        return res.status(400).send({status_code: 400, error_msg: "Please provide release date you wanna search."})
    }
    try{
        let movies = await filterByReleaseDate(r_date);
        if(movies.length === 0){
            return res.status(404).send({status_code: 404, message: "Couldn't Find."});
        }
        res.status(200).send({status_code: 200, data: movies});
    }catch(err){
        console.log(err);
        res.send(err);
    }
} 


// Show all movies.
exports.all_movies = async (req, res) =>{
    movies = await allMovies();
    res.status(200).send({status_code: 200, data: movies});
}


//Adding a movie to in App
exports.add_movie = async (req, res) =>{

    //checking user role through middleware
    movieDetails = req.admin;

    //validate movie details
    validated = await movieValidation.validate(movieDetails);
    if(validated.error){
        return res.status(400).send({status_code: 400, error: validated.error.details[0].message});
    }

    // add movie Info in DB
    try{
        added = await addMovie(movieDetails);
        res.status(201).send({status_code: 201, message: "Movie has been added."});
    }catch(err){
        if(err.name === "MongoServerError" && err.code === 11000){ 
            console.log({error: err.code, Status: "This movie is already exist.", message: "Use search-bar to get the movie."});
            return res.status(500).send({status_code: 500, Status: "This movie is already exist.", message: "Use search-bar to get the movie."});
        }
        return res.send(err);
    }

}

exports.update_movie = async (req, res) =>{
    //checking user role through middleware
    movieDetails = req.admin;

    //validate movie details
    validated = await movieValidation.validate(movieDetails);
    if(validated.error){
        return res.status(400).send({status_code: 400, error: validated.error.details[0].message});
    }

    // Updating the movie details
    try{
        update = await updateMovie(req.body.name, movieDetails);
        if(update.matchedCount===0){
            return res.status(404).send({status_code: 404, error_msg: "Couldn't find the movie."})
        }
        res.status(201).send({status_code: 201, message: "Updated Successfully."});
    }catch(err){
        console.log(err);
        res.send(err);
    }

}

exports.delete_movie = async (req, res) =>{
    try{
        if(!req.admin){
            return res.status(401).send({status_code: 401, msg: "You don't have access to delete a movie."})
        }
        movieName = req.params.name;
        delete_movie = await deleteMovie(movieName);
        if(delete_movie.deletedCount === 0){
            return res.status(404).send({status_code: 404, error_msg: "Couldn't find the movie."});
        }
        res.status(201).send({status_code: 201, message: "Have Successfully Deleted the Movie"});

    }catch(err){
        console.log(err);
        res.send(err)
    }
}
