var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var contentTypeOverride = require('./utils/contentTypeOverride');
var app = express();

app.all('/', function( req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
var server = require('http').createServer( app );

var io = require('socket.io').listen(server);       // logging
  io.set('transports', [            // all transports (optional if you want flashsocket)
      'websocket'
      , 'flashsocket'
      , 'htmlfile'
      , 'xhr-polling'
      , 'jsonp-polling'
  ]);
  io.set('origins', '*:*');

io.on('connection', function(socket) {
  console.log( 'AAAAAH');
});
//ROUTING MODULES
//app.use('/', index);

//APP BASIC CONFIG
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(favicon());
app.use(logger('dev'));
app.use( contentTypeOverride.overrideContentType() );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));


server.listen( 3006, function(){
  console.log( "Server started on port 3006");
});


module.exports = app;
