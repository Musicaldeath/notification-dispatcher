var express = require('express');
var router = express.Router();

const PATH = require('path');
const NotificationController = require( PATH.join( __dirname , '../app/controllers/NotificationController' ) );
let notificationController = new NotificationController( 3005 );

router.use( ( req, res, next ) => {
  notificationController.setRequest( req );
  next();
});

router.post('/:namespace', ( req, res ) => {

  if(( req && req.params && req.params.namespace ) || ( !req.headers['x-amz-sns-message-type'] ))
    res.status( 400 );

  notificationController.setTopic( req.params.namespace );

  //notificationController.actOnType( req.headers[x-amz-sns-message-type], ( result ) => {
    res.end();
  //});

});

module.exports = router;
