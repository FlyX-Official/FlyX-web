var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.send({server: 'running'});
});

router.post('/login', function(req, res){
    
})

module.exports = router;