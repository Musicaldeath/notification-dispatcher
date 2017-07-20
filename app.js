var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var contentTypeOverride = require('./utils/contentTypeOverride');
var app = express();

var server = require('http').createServer( app );
var io = require('socket.io')( server );

io.on('connection', () => {
  console.log( "CONNECTED !");
});

app.use( function( req, res, next ) {
  res.header("Access-Control-Allow-Origin", "*:*");
  next();
});
app.use( '/', require('./routes/index' ) );
app.use( express.static( __dirname + '/public' ));

server.listen( 3006 , () => {
  console.log( "SERVER STARTED ON 3006");
});

module.exports = app;
