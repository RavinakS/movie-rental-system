const rentsTable = require('../../model/rents');
const moviesTable = require('../../model/movies');

const isMovieRentExist = async (req, res, next) =>{
    let movieName = req.body.name;
    let user = req.email;
    if(movieName === undefined){
        return res.send("Please provide the movie name.");
    }

    try{
        // taking movie details from movies table
        isMovieExist = await moviesTable.getMovieByName(movieName);
        movieInfo = isMovieExist;
        if(isMovieExist === null){
            res.send("Could not find the movie.");
            return next()
        } 

        // get all rents for this movie
        findRentsByMname = await rentsTable.findRentsByMovieName(movieName);
        all_rents = findRentsByMname;

        // checking if the user already have taken this movie rent
        if(findRentsByMname.length === 0){
            added = await rentsTable.addRent(movieInfo, user);
            req.isMovieExist = false;
            return next();
        }

        check = 0;
        for(let rent of all_rents){
            if(rent.user === user){
                req.isMovieExist = true;
                return next()
            }
            check = check + 1
        }
        if(check === all_rents.length){
            added = await rentsTable.addRent(movieInfo, user);
            req.isMovieExist = false;
            return next();
        }
    }catch(err){
        console.log(err);
        res.send(err);
        next();
    }
}

module.exports = isMovieRentExist;