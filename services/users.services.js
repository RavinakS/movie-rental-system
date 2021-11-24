const { users } = require('../model/dbSchema.model');

exports.signUp = (userData) =>{
    return users.create(userData);
}

exports.userDetailsById = (user_id) =>{
    return users.find({email: user_id}, {email:1, password:1, role:1, rent:1});
}

exports.profile = (user_id) =>{
    return users.find({email: user_id}, {name:1, email:1, rent:1, role:1});
}

exports.updateUserRent = (user, rents) =>{
    return users.updateOne({email:user}, {rent: rents});
}

exports.allUsersData = () =>{
    return users.find();
}
