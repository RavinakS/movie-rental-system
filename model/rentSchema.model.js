const db = require('./dbConnection.model');

const Schema = db.Schema;
const Model = db.model;

// table for all the rents
const rentsTableSchema = new Schema({
    user: {type: String, trim: true, lowercase: true, required: true},
    name: {type: String, required: true, trim: true},
    releasDate: {type: Date},
    genre: {type: String},
    avalCD: {type: Number}
})

exports.rents = Model('rents', rentsTableSchema);