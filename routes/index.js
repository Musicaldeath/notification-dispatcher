var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', ( req, res ) => {
  console.log( req.headers );
  console.log( req.header );
  console.log( req["x-amz-sns-message-type"] );
});

module.exports = router;
