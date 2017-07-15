var express = require('express');
var app = express();
var router = express.Router();

const PATH = require('path');
//const NotificationController = require( PATH.join( __dirname , '../app/controllers/NotificationController' ) );
//let notificationController = new NotificationController( 3005 );

/*router.use( ( req, res, next ) => {
  notificationController.setRequest( req );
  next();
});*/

router.get('/', function( req, res) {
  res.render("index");
});

router.post('/subscriptions',( req, res, next ) => {
  console.log( req );
  res.end();
});

router.get('/subscriptions',( req, res, next ) => {
  console.log( req );
  res.end();
});

/*router.post('/:namespace', ( req, res ) => {

  if(( req && req.params && req.params.namespace ) || ( !req.headers['x-amz-sns-message-type'] ))
    res.status( 400 );

  notificationController.setTopic( req.params.namespace );

  //notificationController.actOnType( req.headers[x-amz-sns-message-type], ( result ) => {
  res.end();
  //});

});*/

module.exports = router;
