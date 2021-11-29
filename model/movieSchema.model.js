const db = require('./dbConnection.model');

const Schema = db.Schema;
const Model = db.model;

const moviesTableSchema = new Schema({
    name: {type: String, unique: true, dropDups: true},
    releasDate: {type: Date},
    genre: {type: String},
    avalCD: {type: Number}
});

exports.movies = Model('movies', moviesTableSchema);