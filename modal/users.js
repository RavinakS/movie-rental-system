const users = require('../connection/dbSchema').users;

const signUp = (userData) =>{
    return users.create(users);
}

module.exports = {signUp};