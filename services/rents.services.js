const { rents } = require('../model/dbSchema.model');

exports.addRent = (movie_rent_data) =>{
    return rents.create(movie_rent_data);
}

exports.findRentsByMovieName = (m_name) =>{
    return rents.find({name: m_name});
}

exports.findRentsByUserID = (user_id) =>{
    return rents.find({user: user_id});
}