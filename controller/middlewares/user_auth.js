const {verifyToken} = require('../utils/token');

exports.user_auth_for_movie = async function(req, res, next){
    try{
        token = req.headers.cookie.split("=")[1];
        userInfo = await verifyToken(token);
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
            res.status(401).send({status_code: 401, message: "Sorry! you don't have access to add a movie."});
            return next()
        }
    }catch(err){

        // user needs to login (retun to login page)
        console.log(err);
        res.status(404).send("**Login/Signup Page**");
        return next();
    }
}

exports.auth_for_rent = async function(req, res, next) {
    try{
        let token = req.headers.cookie.split('=')[1];
        userInfo = await verifyToken(token);
        if(userInfo==='err'){
            console.log('Token error');
            res.send({error: "Sorry! something is worng in our side", message:"we will get back to you soon."});
            return next();
        }
        req.user = userInfo;
        next()
    }catch(err){
        res.status(404).send('** Login/Signup **');
        next();
    }
}

exports.auth_for_users = async function(req, res, next){
    try{
        let token = req.headers.cookie.split('=')[1];
        userInfo = await verifyToken(token);
        user_role = userInfo.role.toLowerCase();
        if(user_role === 'admin'){
            req.admin = true;
            return next()
        }
        req.admin = false;
        return next();
    }catch(err){
        console.log(err);
        res.send(err);
    }
}
