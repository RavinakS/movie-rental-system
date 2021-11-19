const db = require('./dbConnection');

const Schema = db.schema;
const Model = db.model;

//users information table
const usersTableSchema = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: String},
    rent: {type: Number}
})

// movies table
const moviesTableSchema = new Schema({
    name: {type: String},
    releasDate: {type: Date},
    genre: {type: String},
    avalCD: {type: Number}
})

const users = Model('users', usersTableSchema);
const movies = Model('movies', moviesTableSchema);

module.exports = {users, movies};