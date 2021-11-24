require('dotenv').config();
require('./model/dbConnection.model');
const express = require('express');
const app = express();
app.use(express.json())

const users = require('./routes/users.routes');
app.use('/', users);

const movies = require('./routes/movies.routes');
app.use('/', movies);

const rents = require('./routes/rents.routes');
app.use('/', rents);

const pagination = require('./routes/pagination.routes');
app.use('/', pagination);

app.listen(3050, (req, res)=>{
    console.log("Server is on..");
})
