const db = require('./dbConnection.model');

const Schema = db.Schema;
const Model = db.model;

//users information table
const usersTableSchema = new Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 20, trim: true},
    email: {type: String, unique: true, dropDups: true, trim: true, lowercase: true, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user', trim: true},
    rent: {type: Number, default: 0}
});


exports.users = Model('users', usersTableSchema);
