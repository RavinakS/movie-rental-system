require('dotenv').config();
const express = require('express');
const app = express();

app.listen(3040, (req, res)=>{
    console.log("Server is on..");
})
