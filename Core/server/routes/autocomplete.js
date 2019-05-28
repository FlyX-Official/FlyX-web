var express = require('express');
var router = express.Router();
var ES_connection = require('../services/ES_connection');
var utility_functions = require('../functions/utility_functions');
var elasticsearch = require('../functions/ES_functions');

// autocomplete search endpoint
router.get('/', function (req, res) {

  elasticsearch.getAutocomplete(req.query['q']).then(results => {
    // console.log(results);
    res.send(results);

  }).catch(err => {
    res.send([]);
  })
  

});

module.exports = router;