require('dotenv').config();
require('./connection/dbConnection');
const express = require('express');
const app = express();
app.use(express.json())

const users = require('./routes/users');
app.use('/', users);

const movies = require('./routes/movies');
app.use('/', movies);

const rents = require('./routes/rents');
app.use('/', rents);

const pagination = require('./routes/pagination');
app.use('/', pagination);

app.listen(3050, (req, res)=>{
    console.log("Server is on..");
})
