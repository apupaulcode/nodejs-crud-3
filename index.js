const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRoute = require('./routes/homeRoute');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/nodejs_crud');
const db = mongoose.connection;
db.on('error',()=> console.log("Something went wrong"));
db.once('open',()=>{
    console.log('DB connected successfully');
})

app.set('view engine','ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/',homeRoute);

app.listen(process.env.PORT,()=>{
    console.log(`App is running on ${process.env.PORT}`);
})