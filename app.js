var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var contentTypeOverride = require('./utils/contentTypeOverride');
var app = express();


var server = require('http').createServer(  );
var io = require('socket.io').listen(app);

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

app.use(express.static(path.join(__dirname, 'public')));




//ERROR HANDLER IN CASE REQUEST GETS HERE ( should end in routes if everything goes well )
//otherwise throw error
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen( 3006, function() => {
  console.log( "Server started on port 3006");
});


module.exports = app;
