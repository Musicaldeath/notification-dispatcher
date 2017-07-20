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

//APP BASIC CONFIG
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(favicon());
app.use(logger('dev'));
//app.use( contentTypeOverride.overrideContentType() );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());


app.get('/', (req, res, next ) => {
  console.log("OK");
});

app.use(express.static(__dirname + '/public'));


var io = require('socket.io').listen(server);       // logging


io.on('connection', function(socket) {
  console.log( 'AAAAAH');
});
//ROUTING MODULES
//app.use('/', index);





server.listen( 3006, function(){
  console.log( "Server started on port 3006");
});


module.exports = app;
