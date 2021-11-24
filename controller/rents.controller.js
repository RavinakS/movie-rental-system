const moviesTable = require('../services/movies.services');
const userToken = require('./utils/token');
const usersTable = require('../services/users.services');
const rentsTable = require('../services/rents.services');

// Buy a movie
exports.buyMovie = async (req, res) =>{
    let movieName = req.body.name;
    let auth_data = req.user;
    if(movieName === undefined){
        return res.send("Please provide the movie name.");
    }

    try{
        // is movie available
        let availableRents = await moviesTable.avalRentsMovieByName(movieName);
        if(availableRents === null){
            return res.send("Could not find the movie.");
        }
        
        // if yes? is it available for rent
        if(availableRents.avalCD > 0){

            // if user have not taken rent already for this movie, add the movie with user's email to rents table
            if(!req.movieRentExist){
                movie_details = await moviesTable.getMovieByName(movieName);
                if(movie_details === null){
                    return res.send("Could not find the movie.");
                } 

                let rent_details = {
                    user: auth_data.email,
                    name: movie_details.name,
                    releasDate: movie_details.releasDate,
                    genre: movie_details.genre,
                    avalCD: movie_details.avalCD
                };
                added = await rentsTable.addRent(rent_details);

                // update the rent field of the user to +1
                total_rents = auth_data.rent + 1;
                updateUserRentStatus = await usersTable.updateUserRent(auth_data.email, total_rents);
                return res.send("Congratulations!! Enjoy your movie.");
            }
            return res.send("You Already have this movie, check your rents.")  
        }
        console.log(availableRents);
        res.send("Oops! Currently this movie is not available for rents.");

    }catch(err){
        console.log(err);
        res.send(err);
    }

}

exports.viewUserRents = async (req, res) =>{
    user_id = req.body.email;
    if(user_id === undefined){
        return res.send("Please provide the user_id.");
    }
    try{
        if(!req.admin){
            return res.send("Access denied.");
        }
        getUserDetails = await usersTable.userDetailsById(user_id); 
        if(getUserDetails.length === 0){
            return res.send("User not exist.");
        }else if(getUserDetails[0].rent === 0){
            return res.send("0 rents.")
        }
        all_rents = await rentsTable.findRentsByUserID(user_id);
        res.send({No_of_rents: `${getUserDetails[0].rent}`, rents: all_rents});
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

// module.exports = {buyMovie, viewUserRents};