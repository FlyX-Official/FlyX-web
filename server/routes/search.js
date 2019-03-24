var express = require('express');
var router = express.Router();
var elasticsearch = require('../functions/ES_functions');
var Skypicker_API = require('../functions/skypickerAPI_functions');
var utility_functions = require('../functions/utility_functions');
var moment = require('moment');


router.post('/', function (req, res, next) {

    var userInput = {
        oneWay: req.body.oneWay,
        from: utility_functions.sliceAirportCode(req.body.from),
        to: utility_functions.sliceAirportCode(req.body.to),
        radiusFrom: req.body.radiusFrom,
        radiusTo: req.body.radiusTo,
        departureWindow: {
            start: moment(req.body.departureWindow.start),
            end: moment(req.body.departureWindow.end),
        },
        roundTripDepartureWindow: {
            start: moment(req.body.roundTripDepartureWindow.start),
            end: moment(req.body.roundTripDepartureWindow.end),
        }
    };

    var departureWindow = {
        start: {
            date: userInput.departureWindow.start.date(),
            month: userInput.departureWindow.start.month(),
            year: userInput.departureWindow.start.year()
        },
        end:{
            date: userInput.departureWindow.end.date(),
            month: userInput.departureWindow.end.month(),
            year: userInput.departureWindow.end.year()
        }
    };

    var roundTripDepartureWindow = {
        start: {
            date: userInput.roundTripDepartureWindow.start.date(),
            month: userInput.roundTripDepartureWindow.start.month(),
            year: userInput.roundTripDepartureWindow.start.year()
        },
        end:{
            date: userInput.roundTripDepartureWindow.end.date(),
            month: userInput.roundTripDepartureWindow.end.month(),
            year: userInput.roundTripDepartureWindow.end.year()
        }
    };

     console.log(roundTripDepartureWindow);

    elasticsearch.getAirportGeohash(userInput.from).then(fromGeohash => {
        elasticsearch.getAirportGeohash(userInput.to).then(toGeohash => {
            elasticsearch.getAirportsInRadius(userInput.radiusFrom, fromGeohash).then(departureAirports => {
                elasticsearch.getAirportsInRadius(userInput.radiusTo, toGeohash).then(arrivalAirports => {

                    let departureAirportCodes = utility_functions.sliceAirportCodes(departureAirports);
                    let arrivalAirportCodes = utility_functions.sliceAirportCodes(arrivalAirports);

                    if (userInput.oneWay == true){
                       Skypicker_API.oneWaySearch(departureAirportCodes, arrivalAirportCodes, departureWindow).then(results => {
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