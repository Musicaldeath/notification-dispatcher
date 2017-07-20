const SocketHandler    = require('./../app/lib/SocketHandler');
const PubSubController = require('./../app/lib/PubSubController');

var express = require('express');
var app     = express();
var server = require('http').createServer( app );

var io = require('socket.io')(server);
io.on('connection', function(socket) {
  console.log( 'AAAAAH');
});

io.set('transports', [            // all transports (optional if you want flashsocket)
    'websocket'
    , 'flashsocket'
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
]);
io.set('origins', '*:*');
var router  = express.Router();
/*var socketHandler = new SocketHandler();*/
router.get('/', ( req, res, next ) =>  {
  res.end();
});

/*router.post('/',( req, res, next ) => {

  var pubSubController = new PubSubController( socketHandler );
  var msgType = req.headers['x-amz-sns-message-type'] ;

  switch( msgType ) {
    case 'SubscriptionConfirmation' :  pubSubController.confirmSubscription( req.body.SubscribeURL ); break;
    case 'Notification' : pubSubController.notify( new AmazonSNSNotification( req ) ); break;
    default: res.status( 400 ).send( { err: 'Unsupported method' } );
  }


  console.log( req );
  res.end();
});*/

module.exports = router;
