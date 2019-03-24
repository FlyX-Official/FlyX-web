var express = require('express');
var router = express.Router();
var ES_connection = require('../services/ES_connection');
var utility_functions = require('../functions/utility_functions');

// autocomplete search endpoint
router.get('/', function (req, res) {

  let body = {
    suggest: {

      AirPortCode: {
        text: req.query['q'],
        completion: {
          field: 'Airport_code_sugg'
        }
      },
      OriginCity: {
        text: req.query['q'],
        completion: {
          field: 'Origin_City'
        }
      },
      airportNames: {
        text: req.query['q'],
        completion: {
          field: 'Combined'
        }
      }
    }
  } //body end

  ES_connection.client.search({
      index: 'vue-elastic',
      body: body,
      // type: 'characters_list'
    })
    .then(results => {

      var flattenedResults = [];
      // Airport codes
      let combinedResults = results.suggest.AirPortCode[0].options;

      // Concat Origin City
      combinedResults = combinedResults.concat(results.suggest.OriginCity[0].options);

      // Concat Airport Names
      combinedResults = combinedResults.concat(results.suggest.airportNames[0].options);

      combinedResults.forEach(function(v){

        let airport = {
          Airport_code: v._source.Airport_code,
          Airport_code_sugg: v._source.Airport_code_sugg,
          location: v._source.location,
          Origin_City: v._source.Origin_City,
          Combined: v._source.Combined,
          mapboxlocation: v._source.mapboxlocation,
          Airport_Name: v._source.Airport_Name
        }

        flattenedResults.push(airport);
      });

      var uniqueResults = utility_functions.getUnique(flattenedResults, 'location');
      res.send(uniqueResults);
    })
    .catch(err => {
      console.log(err)
      res.send([]);
    });

});

module.exports = router;