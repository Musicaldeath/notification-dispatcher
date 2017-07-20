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
app.use( '/', require('./routes/index'));

/*var io = require('socket.io')(server);
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
io.set('origins', '*:*');*/

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
server.listen( 3006, () => {
  console.log( "SERVER STARTED ON 3006");
} );


//ROUTING MODULES
//app.use('/', index);

module.exports = app;
