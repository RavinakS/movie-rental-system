const rentsTable = require('../connection/dbSchema').rents;

const addRent = (movie_rent_data) =>{
    return rentsTable.create(movie_rent_data);
}

const findRentsByMovieName = (m_name) =>{
    return rentsTable.find({name: m_name});
}

const findRentsByUserID = (user_id) =>{
    return rentsTable.find({user: user_id});
}

module.exports = {addRent, findRentsByMovieName, findRentsByUserID};