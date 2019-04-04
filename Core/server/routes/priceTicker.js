var express = require('express');
var router = express.Router();
var priceTicker = require('../jobs/priceTickerJob');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query['airportFrom'] == 'LAX'){
    res.send(priceTicker.ticketsLAXToJFK);
  }else if (req.query['airportFrom'] == 'LGA'){
    res.send(priceTicker.ticketsLGAToORD);
  }else if(req.query['airportFrom'] == 'SFO'){
    res.send(priceTicker.ticketsSFOToLAX);
  }else{
    res.send({message: 'Something went wrong'});
  }
});

module.exports = router;