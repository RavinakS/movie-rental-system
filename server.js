require('dotenv').config();
const express = require('express');
const app = express();

const users = require('./routes/users');
app.use('/', users);

app.listen(3040, (req, res)=>{
    console.log("Server is on..");
})
