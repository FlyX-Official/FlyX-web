var express = require('express');
var router = express.Router();
var ES_functions = require('../functions/ES_functions');
var Skypicker_API = require('../functions/skypickerAPI_functions');
var utility_functions = require('../functions/utility_functions');


router.post('/', function (req, res, next) {

    var userInput = {
        oneWay: req.body.oneWay,
        from: utility_functions.sliceAirportCode(req.body.from),
        to: utility_functions.sliceAirportCode(req.body.to),
        radiusFrom: req.body.radiusFrom,
        radiusTo: req.body.radiusTo,
        departureWindow: {
            start: req.body.departureWindow.start,
            end: req.body.departureWindow.end,
        },
        roundTripDepartureWindow: {
            start: req.body.roundTripDepartureWindow.start,
            end: req.body.roundTripDepartureWindow.end,
        }
    };

    // console.log(userInput);

    ES_functions.getAirportGeohash(userInput.from).then(fromGeohash => {
        ES_functions.getAirportGeohash(userInput.to).then(toGeohash => {
            ES_functions.getAirportsInRadius(userInput.radiusFrom, fromGeohash).then(departureAirports => {
                ES_functions.getAirportsInRadius(userInput.radiusTo, toGeohash).then(arrivalAirports => {

                    let departureAirportCodes = utility_functions.sliceAirportCodes(departureAirports);
                    let arrivalAirportCodes = utility_functions.sliceAirportCodes(arrivalAirports);

                    if (userInput.oneWay == true){
                        console.log(departureAirportCodes);
                        console.log(arrivalAirportCodes);
                        Skypicker_API.oneWaySearch(departureAirportCodes,arrivalAirportCodes).then(results => {
                            res.send(results);
                        })
                    }else if (userInput.oneWay == false){

                    }else{

                    }
                })
            })
        })
    })
});


module.exports = router;