const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const routes = require('./routes');


const app = express(); //use this to parse; if you don't understand something, try to break it to understand it
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); //cross origin resource sharing; when front end makes req to back end. set up rules so that there's no issue connecting; for security purposes

app.use(logger('dev'));

app.use('/api', routes);

module.exports = app