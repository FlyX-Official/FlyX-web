const skypicker = require('skypicker');
const utility_functions = require('../functions/utility_functions');

module.exports.oneWaySearch = async function (departureAirportCodes, arrivalAirportCodes, departureWindow, ticketLimit){
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
            limit: ticketLimit,
        })
        return results;
    } catch(error){
        console.log(error);
    }
}

module.exports.roundTripSearch = async function (departureAirportCodes, arrivalAirportCodes, departureWindow, returnDepartureWindow, ticketLimit){
  try{
      const results = await skypicker.searchFlights({
          departureIdentifier: departureAirportCodes.toString(),
          arrivalIdentifier: arrivalAirportCodes.toString(),
          departureDateTimeRange: {
            days: {
              start: utility_functions.formatDate({ date: departureWindow.start.date.toString(),
                                                    month: departureWindow.start.month.toString(),
                                                    year: departureWindow.start.year.toString() }),
              end: utility_functions.formatDate({ date: departureWindow.end.date.toString(),
                                                  month: departureWindow.end.month.toString(),
                                                  year: departureWindow.end.year.toString() }),
            },
          },
          returnDepartureDateTimeRange: {
            days: {
              start: utility_functions.formatDate({ date: returnDepartureWindow.start.date.toString(),
                                                    month: returnDepartureWindow.start.month.toString(),
                                                    year: returnDepartureWindow.start.year.toString() }),
              end: utility_functions.formatDate({ date: returnDepartureWindow.end.date.toString(),
                                                  month: returnDepartureWindow.end.month.toString(),
                                                  year: returnDepartureWindow.end.year.toString() }),
            },
          },
          partner: 'picky',
          currencyCode: 'USD',
          directFlightsOnly : false,
          limit: ticketLimit,
      })
      return results;
  } catch(error){
      console.log(error);
  }
}