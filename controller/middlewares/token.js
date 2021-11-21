const jwt = require('jsonwebtoken');

const key = process.env.SECRET_KEY;

const createToken = async (req, res, next) =>{
    token = jwt.sign()
}