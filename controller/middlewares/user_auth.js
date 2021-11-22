const userToken = require('./token');

async function user_auth_for_movie(req, res, next){
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

async function auth_for_rent(req, res, next) {
    try{
        let token = req.headers.cookie.split('=')[1];
        userInfo = await userToken.verifyToken(token);
        if(userInfo==='err'){
            console.log('Token error');
            res.send({error: "Sorry! something is worng in our side", message:"we will get back to you soon."});
            return next();
        }
        req.email = userInfo.email;
        next()
    }catch(err){
        console.log(err);
        res.send(err);
        next();
    }
}

module.exports = {user_auth_for_movie, auth_for_rent}