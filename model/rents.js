const rentsTable = require('../connection/dbSchema').rents;

const addRent = (m_details, user_id) =>{
    console.log(m_details.releasData);
    let rent_details = {
        user: user_id,
        name: m_details.name,
        releasData: m_details.releasData,
        genre: m_details.genre,
        avalCD: m_details.avalCD
    };
    console.log(rent_details);
    return rentsTable.create(rent_details);
}

const findRentsByMovieName = (m_name) =>{
    return rentsTable.find({name: m_name});
}

module.exports = {addRent, findRentsByMovieName};