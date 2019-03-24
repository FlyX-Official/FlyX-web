const moment = require('moment');

module.exports.formatDate = ({ date, month, year }) => moment()
  .year(year)
  .month(month)
  .date(date)
  .startOf('day')
  .toISOString();

module.exports.formatTimeOfDay = ({ hour, minute }) => moment()
  .hour(hour)
  .minute(minute)
  .format('HH:mm');

module.exports.getUnique = function (arr, comp) {

    const unique = arr
         .map(e => e[comp])
  
       // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
  
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
  
     return unique;
  }

 module.exports.sliceAirportCode = function (inputString) {
    let parts = inputString.split(" ");
    let code = parts[parts.length-1];
    return code;
  }

 module.exports.sliceAirportCodes = function (arr) {

   let airportCodes = []

   arr.forEach(element => {
     airportCodes.push(element._source.AirportCode);
   });

   return airportCodes;
 }
  