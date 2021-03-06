const WebSocketServer    = require('./app/lib/WebSocketServer');
const PubSubController = require('./app/lib/PubSubController');
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


var publisher =  new PubSubController( new WebSocketServer() );
publisher.init( server );
app.locals.publisher = publisher;
console.log( app.locals );

//middlewares
app.use( function( req, res, next ) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use( '/', require( './routes/index' ));

app.use( express.static( __dirname + '/public' ));
app.set( 'port', process.env.PORT || 3006 );
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

server.listen( app.get('port') , () => {
  console.log( `SERVER STARTED ON ${ app.get('port') }` );
});

module.exports = app;
