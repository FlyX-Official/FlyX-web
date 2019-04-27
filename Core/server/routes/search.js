var express = require('express');
var router = express.Router();
var elasticsearch = require('../functions/ES_functions');
var Skypicker_API = require('../functions/skypickerAPI_functions');
var utility_functions = require('../functions/utility_functions');
var moment = require('moment');

const TICKET_LIMIT = 100;

router.post('/', function (req, res, next) {

    var userInput = {
        oneWay: req.body.oneWay,
        from: utility_functions.parseAirportInput(req.body.from),
        to: utility_functions.parseAirportInput(req.body.to),
        radiusFrom: req.body.radiusFrom,
        radiusTo: req.body.radiusTo,
        departureWindow: {
            start: {
                date: moment(req.body.departureWindow.start).date(),
                month: moment(req.body.departureWindow.start).month(),
                year: moment(req.body.departureWindow.start).year()
            },
            end:{
                date: moment(req.body.departureWindow.end).date(),
                month: moment(req.body.departureWindow.end).month(),
                year: moment(req.body.departureWindow.end).year()
            }
        },
        returnDepartureWindow: {
            start: {
                date: moment(req.body.returnDepartureWindow.start).date(),
                month: moment(req.body.returnDepartureWindow.start).month(),
                year: moment(req.body.returnDepartureWindow.start).year()
            },
            end:{
                date: moment(req.body.returnDepartureWindow.end).date(),
                month: moment(req.body.returnDepartureWindow.end).month(),
                year: moment(req.body.returnDepartureWindow.end).year()
            }
        }
    };

    elasticsearch.getAirportGeohash(userInput.from).then(fromGeohash => {
        elasticsearch.getAirportGeohash(userInput.to).then(toGeohash => {
            elasticsearch.getAirportsInRadius(userInput.radiusFrom, fromGeohash).then(departureAirports => {
                elasticsearch.getAirportsInRadius(userInput.radiusTo, toGeohash).then(arrivalAirports => {

                    let departureAirportCodes = utility_functions.onlyAirportCodes(departureAirports);
                    let arrivalAirportCodes = utility_functions.onlyAirportCodes(arrivalAirports);

                    console.log(departureAirportCodes);
                    console.log(arrivalAirportCodes);

                    if (userInput.oneWay == true){
                       Skypicker_API.oneWaySearch(  departureAirportCodes, arrivalAirportCodes, 
                                                    userInput.departureWindow, TICKET_LIMIT)
                       .then(results => {
                            res.send(results);
                        })
                    }else if (userInput.oneWay == false){
                        Skypicker_API.roundTripSearch(  departureAirportCodes, arrivalAirportCodes, 
                                                        userInput.departureWindow, userInput.returnDepartureWindow, 
                                                        TICKET_LIMIT)
                        .then(results => {
                            res.send(results);
                        })
                    }else{

                    } 
                })
            })
        })
    })

});


module.exports = router;