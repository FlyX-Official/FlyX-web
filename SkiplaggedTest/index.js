const flightScanner = require('skiplagged-node-api');
const moment = require('moment');
 

/*var year = 2018;
var month = 11;
var date = 1
sourceAirport = 'LAX';
destAirport = 'JFK'

var dateMoment = moment().year(year).month(month-1).date(date);

var ticketArray = [];

for (let i = 0; i < 7; i++){

    let searchOptions = {
        from: sourceAirport,
        to: destAirport,
        departureDate: String(dateMoment.year()+'-'+concatZero(dateMoment.month()+1)+'-'+concatZero(dateMoment.date())),
        partialTrips: true,
        sort: 'cost'
      };

      const ticketPromise = flightScanner(searchOptions).then(response =>{
        let ticket = {
          pennyPrice: 0,
          duration: '',
          depature: '',
          arrival: '',
          key: '',
          legs: []
        }

        ticket.pennyPrice = response[0].price_pennies;
        ticket.duration = response[0].durationSeconds;
        ticket.depature = response[0].departureTime;
        ticket.arrival = response[0].arrivalTime;
        ticket.key = response[0].flight_key;
        
        return ticket;
    });
    
    ticketArray.push( ticketPromise );
    dateMoment.add(1,'days');
    
}*/

for (let i = 1; i < 7; i++){
    let searchOptions = {
        from: 'LAX',
        to: 'CDG',
        departureDate: '2019-02-'+concatZero(i),
        partialTrips: true,
        sort: 'cost'
      };

      flightScanner(searchOptions).then(console.log);
      
}

/*var ticketArray = getSkiplagged('LAX','JFK',2018,11,1);

function getSkiplagged(sourceAirport, destAirport, year, month, date){


    var dateMoment = moment().year(year).month(month-1).date(date);

    console.log(dateMoment);

    var ticketArray = [];
    
    for (let i = 0; i < 7; i++){

        let searchOptions = {
            from: sourceAirport,
            to: destAirport,
            departureDate: dateMoment.year()+'-'+concatZero(dateMoment.month()+1)+'-'+concatZero(dateMoment.date()),
            partialTrips: true,
            sort: 'cost'
          };

          const ticketPromise = flightScanner(searchOptions).then(response =>{
            let ticket = {
              pennyPrice: 0,
              duration: '',
              depature: '',
              arrival: '',
              key: '',
              legs: []
            }
  
            ticket.pennyPrice = response[0].price_pennies;
            ticket.duration = response[0].durationSeconds;
            ticket.depature = response[0].departureTime;
            ticket.arrival = response[0].arrivalTime;
            ticket.key = response[0].flight_key;
            
            return ticket;
        });
        
        ticketArray.push( ticketPromise );
        dateMoment.add(1,'days');
        
    }
    return ticketArray;
}*/

/*Promise.all( ticketArray ).then( ticketArray => {
  console.log(ticketArray.length);
  for(i in ticketArray){
      console.log(ticketArray[i]);
  }
});*/

function concatZero(i){
    if (i < 10){
        return '0'+i;
    }else{
        return i;
    }  
}
