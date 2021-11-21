const users = require('../connection/dbSchema').users;

const signUp = (userData) =>{
    return users.create(userData);
}

const userDetailsById = (user_id) =>{
    return users.find({email: user_id}, {role:1, rent:1});
}

module.exports = {signUp, userDetailsById};