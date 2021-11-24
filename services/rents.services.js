const rentsTable = require('../model/dbSchema.model').rents;

exports.addRent = (movie_rent_data) =>{
    return rentsTable.create(movie_rent_data);
}

exports.findRentsByMovieName = (m_name) =>{
    return rentsTable.find({name: m_name});
}

exports.findRentsByUserID = (user_id) =>{
    return rentsTable.find({user: user_id});
}

// module.exports = {addRent, findRentsByMovieName, findRentsByUserID};