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

exports.users = Model('users', usersTableSchema);
