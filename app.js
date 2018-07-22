const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiauth');

const app = express();
//Line for mongodb connection -> "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" 
//Set up the middlewares
app.use(morgan('dev'));//needs to be changed in real developer - used to log http requests
app.use(bodyParser.json());

//Set up the routes
app.use('/users', require('./routes/users'));
//Start the server

const port = process.env.PORT||3000;

app.listen(port);
console.log(`Server listening at ${port}`);