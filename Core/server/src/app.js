// Require our node modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const elasticsearch = require('elasticsearch');

// Date parsing node module
const moment = require('moment');
//skiplagged node module
const flightScanner = require('skiplagged-node-api');

// Init App
const app = express();

// Setup middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Establish connection to elasticsearch cluster on AWS
const client = new elasticsearch.Client({
  host: 'https://search-flightsniffer-cvj2fdpizni6puckbeq3d5zjne.us-west-1.es.amazonaws.com',
  log: 'error'
});

// Check if elasticsearch cluster is online
client.ping({
  requestTimeout: 30000
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('elasticsearch pinged successfully');
  }
});

// This is the block of code that executes when the server recieves a post request
// with the '/search' endpoint.
app.post('/search', (req, res) => {
  console.clear();
  // log that the form was submitted
  console.log('Form Submitted');

  // Extract the integers from the date string (uses moment library)
  var dateMoment = moment(req.body.date.start);
  var dayOfMonthInteger = dateMoment.date();
  var monthInteger = dateMoment.month() + 1;
  var yearInteger = dateMoment.year();

  // Extracts the integer from ending date, subtracts from starting date
  var endDateMoment = moment(req.body.date.end);

  // Get duration using moment, if difference is 0, input 1 instead, otherwise input difference
  var duration = (endDateMoment.diff(dateMoment, 'days')) == 0 ? 1 : endDateMoment.diff(dateMoment, 'days');
  duration++;

  // Extract source and destination airports
  var sourceAirport = req.body.from;
  var destAirport = req.body.to;

  // Extract source and destination radius
  var radiusSource = req.body.radiusTo;
  var radiusDest = req.body.radiusFrom;

  // Capitalize the Airport Codes
  sourceAirport = sourceAirport.toUpperCase();
  destAirport = destAirport.toUpperCase();

  // Get the Geohashes of the source and destination airport codes from Elasticsearch
  var airportGeohashes = [];
  let sourceAirportGeohash = getAirportGeohash(sourceAirport);
  let destAirportGeohash = getAirportGeohash(destAirport);
  airportGeohashes.push(sourceAirportGeohash);
  airportGeohashes.push(destAirportGeohash);

  // Once the elasticsearch promises have resolved...
  Promise.all(airportGeohashes).then(airportGeohashes => {

    // Get all the airports within X radius of source and dest geohashes from Elasticsearch
    var airportsInRadius = [];
    let airportsInSourceRadius = getAirportsInRadius(radiusSource, airportGeohashes[0]);
    let airportsInDestRadius = getAirportsInRadius(radiusDest, airportGeohashes[1]);
    airportsInRadius.push(airportsInSourceRadius);
    airportsInRadius.push(airportsInDestRadius);

    // Once the elasticsearch promises have resolved...
    Promise.all(airportsInRadius).then(airportsInRadius => {

      // Do radius search - radiusSearch calls functions matchAirports() and getSkiplagged()
      // Returns an array of tickets (promises)
      var ticketArray = radiusSearch(airportsInRadius[0], airportsInRadius[1], yearInteger,
         monthInteger, dayOfMonthInteger, duration);

      // Once the skiplagged promises have resolved...
      Promise.all(ticketArray).then(ticketArray => {

        // Filters out any tickets that were undefined (the airports did not have any flights between them)
        var filteredTickets = ticketArray.filter(function (value, index, arr) {
          return value.pennyPrice > 0;
        });

        // Send the ticket data to client
        res.send({
          tickets: filteredTickets
        });

      });
    });
  });
  
});


/* ******************************************************************************
* This function takes the return data of elasticsearch radius search and 
* consolidates it, returning an array of objects, each obj containing airport matchups.
* eg. [{sourceCode: 'LAX', destCode: 'JFK', sourceGeohash: 'xxxxxxxxx', destGeohash: 'xxxxxxxxx'},{...},{...}]
**********************************************************************************/
function matchAirports(sourceAirports, destAirports) {

  // create local array to house airport pairs (matchups)
  // Example: [{sourceCode: 'LAX', destCode: 'JFK', sourceGeohash: 'xxxxxxxxx', destGeohash: 'xxxxxxxxx'},{...},{...}]
  var airportCodePairs = [];

  // Loop through both airport arrays
  for (var i = 0; i < sourceAirports.length; i++) {
    for (var j = 0; j < destAirports.length; j++) {

      // create local object that will store each matchup
      let matchup = {
        sourceCode: '',
        destCode: '',
        sourceGeohash: '',
        destGeohash: '',
      };

      // Assign airport codes from airport arrays to local matchup object
      matchup.sourceCode = sourceAirports[i]._source.AirportCode;
      matchup.destCode = destAirports[j]._source.AirportCode;

      // Assign geohashes from airport arrays to local matchup object
      matchup.sourceGeohash = sourceAirports[i]._source.location;
      matchup.destGeohash = destAirports[j]._source.location;

      // push local matchup into local array
      airportCodePairs.push(matchup);
    }
  }

  // return matchup array
  return airportCodePairs;
}

/*******************************************************************************
 * Function to perform the core radius search. 
 * Parameters:  - sourceAirports (array of airports within X radius of source airport)
 *              - destAirports (array of airports within X radius of destination airport)
 *              - year, month, date (numbers that represent desired initial date selected by user)
 *              - duration (amount of days to perform search across)
 * Return: ticketArray (array of objects, each of which is a ticket)
 *******************************************************************************/
function radiusSearch(sourceAirports, destAirports, year, month, date, duration) {

  // Create local array to store returned tickets
  var ticketArray = [];

  // Matchup all the airports
  var airportCodePairs = matchAirports(sourceAirports, destAirports);

  // For each airport matchup, do a search
  for (var i = 0; i < airportCodePairs.length; i++) {
    // Search for tickets
    let singleMatchupTicket = getSkiplagged(airportCodePairs[i].sourceCode, airportCodePairs[i].destCode, airportCodePairs[i].sourceGeohash, airportCodePairs[i].destGeohash, year, month, date, duration);
    // Concatinate results to ticketArray
    ticketArray = ticketArray.concat(singleMatchupTicket);
  }

  // Return the array of tickets
  return ticketArray;
}

/********************************************************************************
 * Function to retrieve airport geohashes from elasticsearch
 * Params: airportCode (string of an individule airport, example: 'LAX')
 * Return: geohash of specified airport (encoded form of latitude/longitude)
 *********************************************************************************/
function getAirportGeohash(airportCode) {

  // create query to pass into elasticsearch
  let body = {
    size: 100,
    from: 0,
    query: {
      match: {
        Combined: {
          query: airportCode,
          fuzziness: 0
        }
      }
    }
  }

  // perform query into our 'vue-elastic' cluster
  const elasticResults = client.search({
      index: 'vue-elastic',
      body: body,
      type: 'characters_list'
    })
    .then(results => {
      let geoHash = results.hits.hits[0]._source.location1;
      return geoHash;
    })
    .catch(err => {
      console.log(err)
    });

  // return results
  return elasticResults;
}

/********************************************************************************
 * Function to retrieve airports within X distance of a geohash
 * Params:  - radius (number)
 *          - geoHash (geohash string that represents a latitude/longitute coordinate)
 * Return: array of airports within X distance of specified geohash
 *********************************************************************************/
function getAirportsInRadius(radius, geoHash) {
  
  // create query to pass into elasticsearch
  let body = {
    size: 100,
    query: {
      bool: {
        must: {
          match_all: {}
        },
        filter: {
          geo_distance: {
            distance: radius + "mi",
            location: geoHash
          }
        }
      }
    }
  }
  // perform query into our 'upflights' cluster
  const elasticResults = client.search({
      index: 'upflights',
      body: body,
      type: ''
    })
    .then(results => {
      return results.hits.hits;
    })
    .catch(err => {
      console.log(err)
    });

  // return array of airports within X radius of geohash
  return elasticResults;

}

//This function will pull ticket data from skiplagged API and return an array of ticket promises
function getSkiplagged(sourceAirport, destAirport, sourceGeohash, destGeohash, year, month, date, duration) {

  // create moment date object (this is used to iterate over days)
  var dateMoment = moment().year(year).month(month - 1).date(date);

  // create empty array to store ticket promises
  var ticketArray = [];

  // for-loop to iterate across multiple days 
  for (let i = 0; i < duration; i++) {

    // create local search options object that we will pass into the skiplagged API
    let searchOptions = {
      from: sourceAirport,
      to: destAirport,
      departureDate: dateMoment.year() + '-' + concatZero(dateMoment.month() + 1) + '-' + concatZero(dateMoment.date()),
      partialTrips: true,
      sort: 'cost'
    };

    // This is a skiplagged API function that searches a single day
    const ticketPromise = flightScanner(searchOptions).then(response => {

      // create local ticket object to store the returned data
      let ticket = {
        from: sourceAirport,
        to: destAirport,
        pennyPrice: 0,
        duration: '',
        departure: '',
        arrival: '',
        key: '',
        legs: [],
        color: '',
        sourceLocation: sourceGeohash,
        destLocation: destGeohash
      }
      
      // If the ticket is not "undefined" (no ticket available for specified params)
      if (typeof response[0] !== "undefined") {
        // populate the local ticket object with the return data
        ticket.pennyPrice = response[0].price_pennies;
        ticket.duration = response[0].durationSeconds;
        ticket.departure = response[0].departureTime;
        ticket.arrival = response[0].arrivalTime;
        ticket.key = response[0].flight_key;
        ticket.legs = response[0].legs;
      }

      // return the local ticket object as a promise
      return ticket;
    });

    // push ticket promise into our ticketArray
    ticketArray.push(ticketPromise);

    // Increment the date by 1 day
    dateMoment.add(1, 'days');

  }
  // return array of ticket promises
  return ticketArray;
}

// function to concatinate a zero to a number if is below 10,
// this is for the skiplagged API data input
function concatZero(i) {
  if (i < 10) {
    return '0' + i;
  } else {
    return i;
  }
}

// This starts our server on localhost:8081
app.listen(process.env.PORT || 8081, function () {
  console.log('server started');
})

// app.listen(8081, '10.62.82.171');