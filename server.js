require('dotenv').config();
require('./connection/dbConnection');
const express = require('express');
const app = express();
app.use(express.json())

const users = require('./routes/users');
app.use('/', users);

const movies = require('./routes/movies');
app.use('/', movies);

app.listen(3050, (req, res)=>{
    console.log("Server is on..");
})
