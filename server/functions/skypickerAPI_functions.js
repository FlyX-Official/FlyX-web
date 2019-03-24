const skypicker = require('skypicker');
const utility_functions = require('../functions/utility_functions');

module.exports.oneWaySearch = async function (departureAirportCodes, arrivalAirportCodes, departureWindow){
    try{
        const results = await skypicker.searchFlights({
            departureIdentifier: departureAirportCodes.toString(),
            arrivalIdentifier: arrivalAirportCodes.toString(),
            departureDateTimeRange: {
              days: {
                start: utility_functions.formatDate({ date: departureWindow.start.date.toString(),
                                                      month: departureWindow.start.month.toString(),
                                                      year: departureWindow.start.year.toString()
                                                    }),
                end: utility_functions.formatDate({ date: departureWindow.end.date.toString(),
                                                    month: departureWindow.end.month.toString(),
                                                    year: departureWindow.end.year.toString()
                }),
              },
            },
            partner: 'picky',
            currencyCode: 'USD',
            directFlightsOnly : false,
            limit: 5,
        })
        return results;
    } catch(error){
        console.log(error);
    }
}