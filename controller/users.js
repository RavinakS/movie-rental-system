const userValidation = require('./middlewares/schemaValidation').userValidation;
const users = require('../modal/users');


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
        res.send('Account is Successfully created.');
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

module.exports = {signUp};