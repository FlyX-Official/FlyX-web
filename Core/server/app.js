require('dotenv').config()
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
require('./services/FB_connection');

// routes
var indexRouter = require("./routes/index");
var searchRouter = require("./routes/search");
var notFoundRouter = require("./routes/notFound");
var autocompleteRouter = require("./routes/autocomplete");
var priceTickerRouter = require("./routes/priceTicker");
var verifyNewUser = require("./routes/verifyNewUser");
var remainingSearches = require("./routes/remainingSearches");

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/search", searchRouter);
app.use("/autocomplete", autocompleteRouter);
app.use("/priceticker", priceTickerRouter);
app.use("/verifynewuser", verifyNewUser);
app.use("/remainingsearches", remainingSearches);
app.use("*", notFoundRouter);

module.exports = app;