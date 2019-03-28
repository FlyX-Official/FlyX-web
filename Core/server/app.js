const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const moment = require('moment');

// routes
var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var notFoundRouter = require('./routes/notFound');
var autocompleteRouter = require('./routes/autocomplete');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/autocomplete', autocompleteRouter);
app.use('*', notFoundRouter);


module.exports = app;
