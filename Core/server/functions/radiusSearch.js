var elasticsearch = require('./ES_functions');
var Skypicker_API = require('./skypickerAPI_functions');
var utility_functions = require('./utility_functions');

module.exports = async function (oneWay, from, to, radiusFrom, radiusTo, departureWindow, returnDepartureWindow) {
    elasticsearch.getAirportGeohash(from).then(fromGeohash => {
        elasticsearch.getAirportGeohash(to).then(toGeohash => {
            elasticsearch.getAirportsInRadius(radiusFrom, fromGeohash).then(departureAirports => {
                elasticsearch.getAirportsInRadius(radiusTo, toGeohash).then(arrivalAirports => {


                    let departureAirportCodes = utility_functions.onlyAirportCodes(departureAirports);
                    let arrivalAirportCodes = utility_functions.onlyAirportCodes(arrivalAirports);

                    console.log(departureAirportCodes);
                    console.log(arrivalAirportCodes);

                    if (oneWay == true){
                       Skypicker_API.oneWaySearch(  departureAirportCodes, arrivalAirportCodes, 
                                                    departureWindow)
                       .then(results => {
                            return results;
                        })
                    }else if (oneWay == false){
                        Skypicker_API.roundTripSearch(  departureAirportCodes, arrivalAirportCodes, 
                                                        departureWindow, returnDepartureWindow)
                        .then(results => {
                            return results;
                        })
                    }else{
                        
                    } 
                })
            })
        })
    })
}