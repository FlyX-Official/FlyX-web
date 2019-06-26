var elasticsearch = require('./ES_functions');
var Skypicker_API = require('./skypickerAPI_functions');
var utility_functions = require('./utility_functions');

// module.exports.radiusSearch = async function (TICKET_LIMIT, oneWay, from, to, radiusFrom, radiusTo, departureWindow, returnDepartureWindow) {
//     return await new Promise((resolve, reject) => {
//    elasticsearch.getAirportGeohash(from).then(fromGeohash => {
//         elasticsearch.getAirportGeohash(to).then(toGeohash => {
//             elasticsearch.getAirportsInRadius(radiusFrom, fromGeohash).then(departureAirports => {
//                 elasticsearch.getAirportsInRadius(radiusTo, toGeohash).then(arrivalAirports => {


//                     let departureAirportCodes = utility_functions.onlyAirportCodes(departureAirports);
//                     let arrivalAirportCodes = utility_functions.onlyAirportCodes(arrivalAirports);

//                     // console.log(departureAirportCodes);
//                     // console.log(arrivalAirportCodes);

//                     if (oneWay == true){
//                         Skypicker_API.oneWaySearch(  departureAirportCodes, arrivalAirportCodes, 
//                                                     departureWindow, TICKET_LIMIT)
//                        .then(results => {
//                             resolve(results);
//                         })
//                     }else if (oneWay == false){
//                         Skypicker_API.roundTripSearch(  departureAirportCodes, arrivalAirportCodes, 
//                                                         departureWindow, returnDepartureWindow, 
//                                                         TICKET_LIMIT)
//                         .then(results => {
//                             resolve(results);
//                         })
//                     }else{

//                     } 
//                 })
//             })
//         })
//     })
// });
// }
module.exports.radiusSearch = async function (TICKET_LIMIT, oneWay, from, to, radiusFrom, radiusTo, departureWindow, returnDepartureWindow) {
    return await new Promise((resolve, reject) => {
        elasticsearch.getAirportGeohash(from)
            .then(fromGeohash => elasticsearch.getAirportGeohash(to)
            .then(toGeohash => elasticsearch.getAirportsInRadius(radiusFrom, fromGeohash)
            .then(departureAirports => elasticsearch.getAirportsInRadius(radiusTo, toGeohash)
            .then(arrivalAirports => {

                let departureAirportCodes = utility_functions.onlyAirportCodes(departureAirports);
                let arrivalAirportCodes = utility_functions.onlyAirportCodes(arrivalAirports);

                // console.log(departureAirportCodes);
                // console.log(arrivalAirportCodes);

                if (oneWay == true){
                    Skypicker_API.oneWaySearch(  departureAirportCodes, arrivalAirportCodes, 
                                                departureWindow, TICKET_LIMIT)
                   .then(results => {
                        resolve(results);
                    })
                }else{
                    Skypicker_API.roundTripSearch(  departureAirportCodes, arrivalAirportCodes, 
                                                    departureWindow, returnDepartureWindow, 
                                                    TICKET_LIMIT)
                    .then(results => {
                        resolve(results);
                    })
                }
            }))))
    });
}
