var express = require('express');
var app = express();
var router = express.Router();

router.get('/', ( req, res, next ) => {
  res.end('OK');
});

router.post('/',( req, res, next ) => {
  const pubSubController = req.app.get('Publisher');
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
