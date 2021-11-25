const {userValidation} = require('./utils/schemaValidation');
const {signUp, userDetailsById, profile, allUsersData} = require('../services/users.services');
const {createToken} = require('./utils/token');

//Creating account 
exports.sign_up = async (req, res) =>{

    // validate user details
    let userInfo = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        rent: req.body.rent
    }
    try{
        validated = await userValidation.validate(userInfo);
        if(validated.error){
            return res.status(400).send({status_code: 400, error: validated.error.details[0].message});
        }

        //password hashing is done in middleware
        userInfo["password"] = req.hashPass;

        // Finally create account
        signUpStatus = await signUp(userInfo);

        // creating token for auth
        tokenData = {
            email: userInfo.email,
            role: userInfo.role,
            rent: userInfo.rent //`${userInfo.rent}`
        }
        createdToken = await createToken(tokenData);
        res.cookie('token', createdToken);

        //response
        res.status(201).send({status_code: 201, message: 'Account is Successfully created.'});
        
    }catch(err){
        if(err.name === "MongoServerError" && err.code === 11000){
            console.log({error: err.code, Status: "email is already exist.", message: "give a different email or try logging in."});
            return res.status(403).send({status_code: 403, error: "email is already exist.", message: "give a different email or try logging in."});
        }
        console.log(err);
        res.send(err);
    }
}


// Login
exports.login = async (req, res)=>{
    try{
        
        // password checking through middleware
        if(req.validPassword === "noUser"){
            console.log({status_code: 404, message: "User not exist, create account first."});
            return res.status(404).send({status_code: 404, message: "User not exist, create account first."});

        }else if(req.validPassword){
            
            // Creating token for auth
            userData = await userDetailsById(req.body.email);
            tokenData = {
                email: userData[0].email,
                role: userData[0].role,
                rent: userData[0].rent //`${userData[0].rent}`
            }
            createdToken = await createToken(tokenData);
            res.cookie('token', createdToken);

            // in response
            console.log("Logged is SuccessFully.");
            res.status(201).send({status_code: 201, message: "Logged is SuccessFully"});
        }else{
            res.status(400).send({status_code: 400, message: "Incorrect Password"});
        }

    }catch(err){
        console.log(err);
        res.send(err);
    }
    
}


// need to work on this (I have to make it to not take email id from body and verifying token 
// and showing profile is also risky because in postman different users token maybe there)
exports.user_profile = async (req, res) =>{
    try{
        const userID = req.body.email;
        userInfo = await profile(userID);
        if(userInfo.length === 0){
            return res.send({status_code: 404, error_msg: "** Login/Signup page **"})
        }
        res.status(200).send({status_code: 200, data: userInfo})
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

exports.allUsersInfo = async (req, res) =>{
    try{
        if(!req.admin){
            return res.status(401).send({status_code: 401, message: "Only admins can see all user's data."});
        }
        usersData = await allUsersData();
        res.status(200).send({status_code: 200, data: usersData});
    }catch(err){
        console.log(err);
        res.send(err);
    }
}
