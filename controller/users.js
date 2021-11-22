const userValidation = require('./middlewares/schemaValidation').userValidation;
const users = require('../model/users');
const token = require('./middlewares/token');
const dataById = require('../model/users').userDetailsById;

//Creating account 
const signUp = async (req, res) =>{

    // validate user details
    let userInfo = {
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        role: req.body.role,
        rent: req.body.rent
    }
    try{
        await userValidation.validate(userInfo);
    }catch(error){
        return res.send(error.details[0].message);
    }

    //password hashing is done in middleware
    try{
        userInfo["password"] = req.hashPass;

        // Finally create account
        signUpStatus = await users.signUp(userInfo);

        // creating token for auth
        tokenData = {
            role: userInfo.role,
            rent: userInfo.rent //`${userInfo.rent}`
        }
        createdToken = await token.createToken(tokenData);
        res.cookie('token', createdToken);

        //response
        res.send('Account is Successfully created.');
        
    }catch(err){
        if(err.name === "MongoServerError" && err.code === 11000){
            console.log({error: err.code, Status: "email is already exist.", message: "give a different email or try logging in."});
            return res.send({Status: "email is already exist.", message: "give a different email or try logging in."});
        }
        console.log(err);
        res.send(err);
    }
}


// Login
const login = async (req, res)=>{
    try{
        
        // password checking through middleware
        if(req.validPassword === "noUser"){
            console.log("User not exist.");
            return;

        }else if(req.validPassword){
            
            // Creating token for auth
            userData = await dataById(req.body.email);
            tokenData = {
                role: userData[0].role,
                rent: userData[0].rent //`${userData[0].rent}`
            }
            createdToken = await token.createToken(tokenData);
            res.cookie('token', createdToken);

            // in response
            console.log("Logged is SuccessFully.");
            res.send("Logged is SuccessFully");
        }else{
            res.send("Incorrect Password");
        }

    }catch(err){
        console.log(err);
        res.send(err);
    }
    
}

const profile = async (req, res) =>{
    try{
        const userID = req.body.email;
        userInfo = await users.profile(userID);
        if(userInfo.length === 0){
            return res.send("** Login/Signup page **")
        }
        res.send(userInfo)
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

module.exports = {signUp, login, profile};