const userValidation = require('./middlewares/schemaValidation').userValidation;
const users = require('../model/users');
const token = require('./middlewares/token');
const dataById = require('../model/users').userDetailsById;


const signUp = async (req, res) =>{
    let userInfo = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        rent: req.body.rent
    }
    
    let {error} = userValidation.validate(userInfo);
    if(error){
        return res.send(error.details[0].message);
    }

    try{
        userInfo["password"] = req.hashPass;
        signUpStatus = await users.signUp(userInfo);

        userData = {
            role: userInfo.role,
            rent: userInfo.rent
        }
        createdToken = await token.createToken(userData);
        req.token = createdToken;

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

const login = async (req, res)=>{
    try{
        if(req.validPassword){
            userData = await dataById(req.email);
            createdToken = await token.createToken(userData);
            req.token = createdToken;
            res.send("Logged is SuccessFully")
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
    
}

module.exports = {signUp, login};