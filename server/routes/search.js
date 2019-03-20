var express = require('express');
var router = express.Router();
var ES_functions = require('../functions/ES_functions');
var Skypicker_API = require('../functions/skypickerAPI_functions');


router.get('/', function(req, res, next) {
    Skypicker_API.oneWaySearch().then(results => {
        res.send(results);
    })
});


module.exports = router;