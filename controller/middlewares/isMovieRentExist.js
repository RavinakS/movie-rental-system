const {findRentsByMovieName} = require('../../services/rents.services');

exports.isMovieRentExist = async (req, res, next) =>{
    let movieName = req.body.name;
    let user_id = req.user.email;
    if(movieName === undefined){
        return res.status(400).send("Please provide the movie name.");
    }

    try{ 

        // get all rents for this movie
        findRentsByMname = await findRentsByMovieName(movieName);
        all_rents = findRentsByMname;

        // checking if the user already have taken this movie rent
        if(findRentsByMname.length === 0){
            req.movieRentExist = false;
            return next();
        }

        check = 0;
        for(let rent of all_rents){
            if(rent.user === user_id){
                req.movieRentExist = true;
                return next()
            }
            check = check + 1
        }
        if(check === all_rents.length){
            req.movieRentExist = false;
            return next();
        }

    }catch(err){
        console.log(err);
        res.send(err);
        next();
    }
}
