var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var contentTypeOverride = require('./utils/contentTypeOverride');
var app = express();
var http = require('http');
var server = http.createServer( app );
var io = require('socket.io')(server);

server.listen( 3006, function(){
  console.log('Server started on port 3006');
});

app.use(express.static(__dirname + '/public'));

app.use( '/', require('./routes/index'));

io.on('connection', function( socket ) {
  console.log( 'CONNECTED ');
});

//APP BASIC CONFIG
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(favicon());
app.use(logger('dev'));
app.use( contentTypeOverride.overrideContentType() );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());



//ROUTING MODULES
//app.use('/', index);

module.exports = app;
