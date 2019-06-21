var moment = require('moment');
var CronJob = require('cron').CronJob;
var elasticsearch = require('../functions/ES_functions');
var Skypicker_API = require('../functions/skypickerAPI_functions');
var utility_functions = require('../functions/utility_functions');

const SEARCH_DATE = moment().add(5, 'days');

const ONE_WAY = true;
const TICKET_LIMIT = 10;

var departureWindow= {
    start: {
        date: SEARCH_DATE.date(),
        month: SEARCH_DATE.month(),
        year: SEARCH_DATE.year()
    },
    end:{
        date: SEARCH_DATE.date(),
        month: SEARCH_DATE.month(),
        year: SEARCH_DATE.year()
    }
};

new CronJob('0 0 */1 * * *', function () {

    console.log('Started Price Ticker Job');
    elasticsearch.getAirportGeohash('LAX').then(fromGeohash => {
        elasticsearch.getAirportGeohash('JFK').then(toGeohash => {
            elasticsearch.getAirportsInRadius(50, fromGeohash).then(departureAirports => {
                elasticsearch.getAirportsInRadius(50, toGeohash).then(arrivalAirports => {


                    let departureAirportCodes = utility_functions.onlyAirportCodes(departureAirports);
                    let arrivalAirportCodes = utility_functions.onlyAirportCodes(arrivalAirports);

                    if (ONE_WAY == true){
                       Skypicker_API.oneWaySearch(  departureAirportCodes, arrivalAirportCodes, 
                                                    departureWindow, TICKET_LIMIT)
                       .then(results => {
                            exports.ticketsLAXToJFK = results;
                        })
                    }else if (ONE_WAY == false){
                        Skypicker_API.roundTripSearch(  departureAirportCodes, arrivalAirportCodes, 
                                                        departureWindow, returnDepartureWindow, TICKET_LIMIT)
                        .then(results => {
                            exports.ticketsLAXToJFK = results;
                        })
                    }else{
                        
                    } 
                })
            })
        })
    })


    elasticsearch.getAirportGeohash('LGA').then(fromGeohash => {
        elasticsearch.getAirportGeohash('ORD').then(toGeohash => {
            elasticsearch.getAirportsInRadius(50, fromGeohash).then(departureAirports => {
                elasticsearch.getAirportsInRadius(50, toGeohash).then(arrivalAirports => {


                    let departureAirportCodes = utility_functions.onlyAirportCodes(departureAirports);
                    let arrivalAirportCodes = utility_functions.onlyAirportCodes(arrivalAirports);

                    if (ONE_WAY == true){
                       Skypicker_API.oneWaySearch(  departureAirportCodes, arrivalAirportCodes, 
                                                    departureWindow, TICKET_LIMIT)
                       .then(results => {
                            exports.ticketsLGAToORD = results;
                        })
                    }else if (ONE_WAY == false){
                        Skypicker_API.roundTripSearch(  departureAirportCodes, arrivalAirportCodes, 
                                                        departureWindow, returnDepartureWindow, TICKET_LIMIT)
                        .then(results => {
                            exports.ticketsLAXToJFK = results;
                        })
                    }else{
                        
                    } 
                })
            })
        })
    })


    elasticsearch.getAirportGeohash('SFO').then(fromGeohash => {
        elasticsearch.getAirportGeohash('LAX').then(toGeohash => {
            elasticsearch.getAirportsInRadius(50, fromGeohash).then(departureAirports => {
                elasticsearch.getAirportsInRadius(50, toGeohash).then(arrivalAirports => {


                    let departureAirportCodes = utility_functions.onlyAirportCodes(departureAirports);
                    let arrivalAirportCodes = utility_functions.onlyAirportCodes(arrivalAirports);

                    if (ONE_WAY == true){
                       Skypicker_API.oneWaySearch(  departureAirportCodes, arrivalAirportCodes, 
                                                    departureWindow, TICKET_LIMIT)
                       .then(results => {
                            exports.ticketsSFOToLAX = results;
                        })
                    }else if (ONE_WAY == false){
                        Skypicker_API.roundTripSearch(  departureAirportCodes, arrivalAirportCodes, 
                                                        departureWindow, returnDepartureWindow, TICKET_LIMIT)
                        .then(results => {
                            exports.ticketsLAXToJFK = results;
                        })
                    }else{
                        
                    } 
                })
            })
        })
    })

}, null, true, 'America/Los_Angeles', null,true);
