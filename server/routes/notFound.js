var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('ERROR 404 - Page not found');
});
module.exports = router;
