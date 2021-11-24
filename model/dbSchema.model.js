const db = require('./dbConnection.model');

const Schema = db.Schema;
const Model = db.model;

//users information table
const usersTableSchema = new Schema({
    name: {type: String},
    email: {type: String, unique: true, dropDups: true},
    password: {type: String},
    role: {type: String, default: 'Viewer'},
    rent: {type: Number, default: 0}
});

// movies table
const moviesTableSchema = new Schema({
    name: {type: String, unique: true, dropDups: true},
    releasDate: {type: Date},
    genre: {type: String},
    avalCD: {type: Number}
});

// table for all the rents
const rentsTableSchema = new Schema({
    user: {type: String},
    name: {type: String},
    releasDate: {type: Date},
    genre: {type: String},
    avalCD: {type: Number}
})

const users = Model('users', usersTableSchema);
const movies = Model('movies', moviesTableSchema);
const rents = Model('rents', rentsTableSchema);

module.exports = {users, movies, rents};