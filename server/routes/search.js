var express = require('express');
var router = express.Router();
var ES_functions = require('../functions/ES_functions');
var Skypicker_API = require('../functions/skypickerAPI_functions');


router.post('/', function (req, res, next) {

    var userInput = {
        oneWay: req.body.oneWay,
        from: req.body.from,
        to: req.body.to,
        radiusFrom: req.body.radiusFrom,
        radiusTo: req.body.radiusTo,
        departureWindow : {
            start: req.body.departureWindow.start,
            end: req.body.departureWindow.end,
        },
        roundTripDepartureWindow: {
            start: req.body.roundTripDepartureWindow.start,
            end: req.body.roundTripDepartureWindow.end,
        }
    }

    console.log(userInput);

    ES_functions.getAirportGeohash('JFK').then(geohash => {
        ES_functions.getAirportsInRadius(50, geohash).then(results => {
            console.log(results);
        })
    })

    Skypicker_API.oneWaySearch().then(results => {
        res.send(results);
    })
});


module.exports = router;