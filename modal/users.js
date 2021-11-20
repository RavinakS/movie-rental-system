const users = require('../connection/dbSchema').users;

const signUp = (userData) =>{
    return users.create(userData);
}

module.exports = {signUp};