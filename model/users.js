const users = require('../connection/dbSchema').users;

const signUp = (userData) =>{
    return users.create(userData);
}

const userDetailsById = (user_id) =>{
    return users.find({email: user_id}, {email:1, password:1, role:1, rent:1});
}

const profile = (user_id) =>{
    return users.find({email: user_id}, {name:1, email:1, rent:1, role:1});
}

const updateUserRent = (user, rents) =>{
    return users.updateOne({email:user}, {rent: rents});
}

module.exports = {signUp, userDetailsById, profile, updateUserRent};