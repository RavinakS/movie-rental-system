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
            return res.send(validated.error.details[0].message);
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
exports.login = async (req, res)=>{
    try{
        
        // password checking through middleware
        if(req.validPassword === "noUser"){
            console.log("User not exist.");
            return;

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
            res.send("Logged is SuccessFully");
        }else{
            res.send("Incorrect Password");
        }

    }catch(err){
        console.log(err);
        res.send(err);
    }
    
}

exports.user_profile = async (req, res) =>{
    try{
        const userID = req.body.email;
        userInfo = await profile(userID);
        if(userInfo.length === 0){
            return res.send("** Login/Signup page **")
        }
        res.send(userInfo)
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

exports.allUsersInfo = async (req, res) =>{
    try{
        if(!req.admin){
            return res.send("Only Admin have access to users data.");
        }
        usersData = await allUsersData();
        res.send(usersData);
    }catch(err){
        console.log(err);
        res.send(err);
    }
}
