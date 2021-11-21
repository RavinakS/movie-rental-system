const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY;

const createToken = async (data) =>{
    try{
        token = await jwt.sign(data, key);
        return token;
    }catch(err){
        console.log(err);
        return false;
    }
}

const verifyToken = async () =>{

}

module.exports = {createToken};