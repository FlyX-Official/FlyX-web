var ES_connection = require("../services/ES_connection");
var utility_functions = require('../functions/utility_functions');

/********************************************************************************
 * Function to retrieve airport geohashes from elasticsearch
 * Params: airportCode (string of an individule airport, example: 'LAX')
 * Return: geohash of specified airport (encoded form of latitude/longitude)
 *********************************************************************************/
module.exports.getAirportGeohash = async function(airportCode) {
  // create query to pass into elasticsearch
  let body = {
    size: 100,
    from: 0,
    query: {
      match: {
        IATA: {
          query: airportCode,
          fuzziness: 0
        }
      }
    }
  };

  // perform query into our 'airports' cluster
  const elasticResults = ES_connection.client
    .search({
      index: "airports",
      body: body
    })
    .then(results => {
      let geoHash = results.hits.hits[0]._source.Geohash;
      return geoHash;
    })
    .catch(err => {
      console.log(err);
    });

  // return results
  return elasticResults;
};

/********************************************************************************
 * Function to retrieve airports within X distance of a geohash
 * Params:  - radius (number)
 *          - geoHash (geohash string that represents a latitude/longitute coordinate)
 * Return: array of airports within X distance of specified geohash
 *********************************************************************************/
module.exports.getAirportsInRadius = async function(radius, geoHash) {
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
            Geohash: geoHash
          }
        }
      }
    }
  };
  // perform query into our 'upflights' cluster
  const elasticResults = ES_connection.client
    .search({
      index: "airports",
      body: body
      //type: ''
    })
    .then(results => {
      return results.hits.hits;
    })
    .catch(err => {
      console.log(err);
    });

  // return array of airports within X radius of geohash
  return elasticResults;
};

module.exports.getAutocomplete = async function(q) {

  let body = {
    suggest: {
      Code: {
        text: q,
        completion: {
          field: "IATA_Completion"
        }
      },
      Name: {
        text: q,
        completion: {
          field: "Name"
        }
      },
      City: {
        text: q,
        completion: {
          field: "City"
        }
      }
    }
  }; //body end

 const elasticResults = ES_connection.client
    .search({
      index: "airports",
      body: body
      // type: 'characters_list'
    })
    .then(results => {

      combinedResults = [];
      // Concat all arrays
      combinedResults = combinedResults.concat(
        results.suggest.Code[0].options,
        results.suggest.Name[0].options,
        results.suggest.City[0].options
      );
      
      // remove duplicates
      var uniqueResults = utility_functions.getUnique(
        combinedResults,
        "_id"
      );
        // console.log(uniqueResults);
      return uniqueResults;
    })
    .catch(err => {
      console.log(err);
    });

    return elasticResults;
};
