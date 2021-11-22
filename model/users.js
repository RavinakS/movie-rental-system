const users = require('../connection/dbSchema').users;

const signUp = (userData) =>{
    return users.create(userData);
}

const userDetailsById = (user_id) =>{
    return users.find({email: user_id}, {password:1, role:1, rent:1});
}

const profile = (user_id) =>{
    return users.find({email: user_id}, {name:1, email:1, rent:1, role:1});
}

module.exports = {signUp, userDetailsById, profile};