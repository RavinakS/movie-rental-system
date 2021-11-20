require('dotenv').config();
require('./connection/dbConnection');
const express = require('express');
const app = express();
app.use(express.json())

const users = require('./routes/users');
app.use('/', users);

app.listen(3040, (req, res)=>{
    console.log("Server is on..");
})
