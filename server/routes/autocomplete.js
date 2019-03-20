var express = require('express');
var router = express.Router();
var ES_connection = require('../services/ES_connection');

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
      res.send(results.suggest);
    })
    .catch(err => {
      console.log(err)
      res.send([]);
    });

});

module.exports = router;