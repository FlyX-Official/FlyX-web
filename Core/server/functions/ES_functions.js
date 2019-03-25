var ES_connection = require('../services/ES_connection');

/********************************************************************************
 * Function to retrieve airport geohashes from elasticsearch
 * Params: airportCode (string of an individule airport, example: 'LAX')
 * Return: geohash of specified airport (encoded form of latitude/longitude)
 *********************************************************************************/
module.exports.getAirportGeohash = async function (airportCode) {

    // create query to pass into elasticsearch
    let body = {
      size: 100,
      from: 0,
      query: {
        match: {
          Airport_code: {
            query: airportCode,
            fuzziness: 0
          }
        }
      }
    }
  
    // perform query into our 'vue-elastic' cluster
    const elasticResults = ES_connection.client.search({
        index: 'vue-elastic',
        body: body
      })
      .then(results => {
        let geoHash = results.hits.hits[0]._source.location;
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
module.exports.getAirportsInRadius = async function (radius, geoHash) {
  
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
    const elasticResults = ES_connection.client.search({
        index: 'upflights',
        body: body,
        //type: ''
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