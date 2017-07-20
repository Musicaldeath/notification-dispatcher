const WebSocketServer    = require('./../app/lib/WebSocketServer');
const PubSubController = require('./../app/lib/PubSubController');

var express = require('express');
var app = express();
var router = express.Router();

router.get('/', ( req, res, next ) => {
  console.log( req.app.locals );
  res.end('OK');

});

router.post('/',( req, res, next ) => {
  console.log( req );
  var msgType = req.headers['x-amz-sns-message-type'] ;

  switch( msgType ) {
    case 'SubscriptionConfirmation' :  req.app.locals.pubSubController.confirmSubscription( req.body.SubscribeURL ); break;
    case 'Notification' : req.app.locals.pubSubController.notify( new AmazonSNSNotification( req ) ); break;
    default: res.status( 400 ).send( { err: 'Unsupported method' } );
  }

  console.log( req );
  res.end();

});

module.exports = router;
