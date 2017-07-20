const SocketHandler    = require('./../app/lib/SocketHandler');
const PubSubController = require('./../app/lib/PubSubController');

var express = require('express');
var app     = express();
var router  = express.Router();
var socketHandler = new SocketHandler();

router.post('/',( req, res, next ) => {

  var pubSubController = new PubSubController( socketHandler );
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
