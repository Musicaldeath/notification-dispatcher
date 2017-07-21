const WebSocketServer    = require('./../app/lib/WebSocketServer');
const PubSubController = require('./../app/lib/PubSubController');

var express = require('express');
var router = express.Router();
var app = express();
var socketServer = require('http').createServer( app );
var pubSubController = new PubSubController( new WebSocketServer() )
                              .init( socketServer )


router.get('/', ( req, res, next ) => {
  console.log( req.app.locals );
  res.end('OK');

});

router.post('/',( req, res, next ) => {
  console.log( req );
  var msgType = req.headers['x-amz-sns-message-type'] ;

  switch( msgType ) {
    case 'SubscriptionConfirmation' :  pubSubController.confirmSubscription( req.body.SubscribeURL ); break;
    case 'Notification' : pubSubController.notify( new AmazonSNSNotification( req ) ); break;
    default: res.status( 400 ).send( { err: 'Unsupported method' } );
  }

  console.log( req );
  res.end();

});



module.exports = router;
