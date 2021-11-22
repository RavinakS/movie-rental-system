const userToken = require('./token');

async function user_authentication(req, res, next){
    try{
        token = req.headers.cookie.split("=")[1];
        userInfo = await userToken.verifyToken(token);
        if(userInfo === 'err'){
            console.log('Token error');
            res.send({error: "Sorry! something is worng in our side", message:"we will get back to you soon."});
            return next();
        }
        role = userInfo["role"].toLowerCase();
        if(role === 'admin'){
            movieDetails = {
                name: req.body.name,
                releasDate: req.body.releasDate,
                genre: req.body.genre,
                avalCD: req.body.avalCD
            }
            req.admin = movieDetails;
            next()
        }else{
            res.send("Sorry! you don't have access to add a movie.");
            return next()
        }
    }catch(err){

        // user needs to login (retun to login page)
        console.log(err);
        res.send("**Login/Signup Page**");
        return next();
    }
}

module.exports = user_authentication;