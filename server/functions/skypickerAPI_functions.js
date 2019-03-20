const skypicker = require('skypicker');
const utility_functions = require('../functions/utility_functions');

module.exports.oneWaySearch = async function (){
    try{
        const results = await skypicker.searchFlights({
            departureIdentifier: ['LAX','ONT'].toString(),
            arrivalIdentifier: ['JFK','LGA'].toString(),
            departureDateTimeRange: {
              days: {
                start: utility_functions.formatDate({date:'25',month:'3',year:'2019'}),
                end: utility_functions.formatDate({date:'25',month:'3',year:'2019'}),
              },
            },
            partner: 'picky',
            currencyCode: 'USD',
            directFlightsOnly : false,
            limit: 10,
        })
        return results;
    } catch(error){
        console.log(error);
    }
}