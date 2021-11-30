const {signUp, userDetailsById, profile, allUsersData} = require('../services/users.services');
const {createToken, verifyToken} = require('./utils/token');

exports.sign_up = async (req, res) =>{
    try{
        userInfo = req.body;
        userInfo["password"] = req.hashPass;

        signUpStatus = await signUp(userInfo);

        tokenData = {
            email: userInfo.email,
            role: userInfo.role
        }
        createdToken = await createToken(tokenData);
        res.cookie('token', createdToken);

        res.status(201).json({status_code: 201, message: 'Account is Successfully created.'});
        
    }catch(err){
        if(err.name === "MongoServerError" && err.code === 11000){
            return res.status(403).json({status_code: 403, error: "email is already exist.", message: "give a different email or try logging in."});
        }
        res.send(err);
    }
}


exports.login = async (req, res)=>{
    try{
        if(req.validPassword === "noUser"){
            return res.json(404).json({status_code: 404, message: "User not exist, create account first."});

        }else if(req.validPassword){
            userData = await userDetailsById(req.body.email);
            tokenData = {
                email: userData[0].email,
                role: userData[0].role
            }
            createdToken = await createToken(tokenData);
            res.cookie('token', createdToken);

            console.log("Logged is SuccessFully.");
            res.status(201).json({status_code: 201, message: "Logged is SuccessFully"});
        }else{
            res.status(400).json({status_code: 400, message: "Incorrect Password"});
        }

    }catch(err){
        res.send(err);
    }
    
}

exports.user_profile = async (req, res) =>{
    try{
        let token = req.headers.cookie.split('=')[1];
        tokenData = await verifyToken(token);
        userInfo = await profile(tokenData.email);
        if(userInfo.length === 0){
            return res.json({status_code: 404, error_msg: "** Login/Signup page **"})
        }
        res.status(200).json({status_code: 200, data: userInfo})
    }catch(err){
        res.send(err);
    }
}

exports.allUsersInfo = async (req, res) =>{
    try{
        if(!req.admin){
            return res.status(401).json({status_code: 401, message: "Only admins can see all user's data."});
        }
        usersData = await allUsersData();
        res.status(200).json({status_code: 200, data: usersData});
    }catch(err){
        res.send(err);
    }
}
