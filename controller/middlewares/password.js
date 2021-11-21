const bcrypt = require('bcrypt');
const userDetailsById = require('../../model/users').userDetailsById;

const hashPass = async (req, res, next) =>{
    try{
        userPass = req.body.password;
        salt = await bcrypt.genSalt();
        hashpassw = await bcrypt.hash(userPass, salt);
        req.hashPass = hashpassw;
        next();

    }catch(err){
        res.send(err);
        next();
    }
}

const comparePass = async (req, res, next) =>{
    try{
        dbPassword = await userDetailsById(req.body.email);
        console.log(dbPassword);
        isPasswordValid = await bcrypt.compare(req.body.password, dbPassword)
        req.validPassword = isPasswordValid;
        next();
    }catch(err){
        res.send(err);
        next();
    }
}

module.exports = {hashPass, comparePass};