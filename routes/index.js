const PATH = require('path');

var express = require('express');
var router = express.Router();


const NotificationController = require( PATH.join( __dirname , '../app/controllers/NotificationController' ) );
let notificationController = new NotificationController();

router.use( ( req, res, next ) => {
  notificationController.setRequest( req );
  next();
});

/*router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});*/

router.post('/', ( req, res ) => {

  notificationController.actOnType( req.headers[x-amz-sns-message-type], ( result ) => {
    res.end();
  });

});

module.exports = router;
