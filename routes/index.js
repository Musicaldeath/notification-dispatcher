var express = require('express');
var app = express();
var router = express.Router();

router.get('/', ( req, res, next ) => {
  console.log( app );
  console.log( req.app );
  res.end('OK');
});

router.post('/',( req, res, next ) => {

  console.log( "REQ : ", req );
  console.log( "APP : ", app );
  console.log( "LOCALS : ", req.app.locals );

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
