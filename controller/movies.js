const moviesTable = require('../model/movies');
const usersTable = require('../model/users');
const userToken = require('./middlewares/token');
const movieValidations = require('./middlewares/schemaValidation').movieValidation;

// Home Page
// Search movie by a genre
const searchMovieByGenre = async (req, res) =>{
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
const filterByReleaseDate = async (req, res) =>{
    const r_date = req.body.releasDate;
    if(r_date === undefined){
        return res.send("Please provide release date you wanna search.")
    }

    try{
        const movies = await moviesTable.filterByReleaseDate(r_date);
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
const allMovies = async (req, res) =>{
    movies = await moviesTable.allMovies();
    res.send(movies);
}

// Buy a movie
const buyMovie = async (req, res) =>{
    const movieName = req.body.name;
    if(movieName === undefined){
        return res.send("Please provide the movie name.");
    }

    try{

        // is movie available
        const availableRents = await moviesTable.searchMovieByName(movieName);
        if(availableRents === null){
            return res.send("Could not find the movie.");
        }
        
        // if yes? is it available for rent
        if(availableRents.avalCD > 0){
            token = req.headers.cookie.split("=")[1];
            userInfo = await userToken.verifyToken(token);
            if(userInfo === 'err'){
                console.log('Token error');
                return res.send({error: "Sorry! something is worng in our side", message:"we will get back to you soon."})
            }

            // if yes? update the rent field of the user to +1
            user_id = userInfo.email;
            total_rents = userInfo.rent + 1;
            updateUserRentStatus = await usersTable.updateUserRent(user_id, total_rents); 
            res.send("Congratulations!! Enjoy your movie.");
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }

}

//Adding a movie to in App
const addMovie = async (req, res) =>{

    //checking user role
    try{
        token = req.headers.cookie.split("=")[1];
        userInfo = await userToken.verifyToken(token);
        if(userInfo === 'err'){
            console.log('Token error');
            return res.send({error: "Sorry! something is worng in our side", message:"we will get back to you soon."})
        }
        role = userInfo["role"].toLowerCase();
        if(role === 'admin'){
            movieDetails = {
                name: req.body.name,
                releasDate: req.body.releasDate,
                genre: req.body.genre,
                avalCD: req.body.avalCD
            }
        }else{
            return res.send("Sorry! you don't have access to add a movie.");
        }
    }catch(err){

        // user needs to login (retun to login page)
        console.log(err);
        return res.send("**Login/Signup Page**")
    }

    //validate movie details
    try{
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

const updateMovie = (req, res) =>{
    
}

module.exports = {allMovies, addMovie, searchMovieByGenre, filterByReleaseDate, buyMovie};