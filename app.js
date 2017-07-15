var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var contentTypeOverride = require('./utils/contentTypeOverride');
var app = express();

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


//ROUTING MODULES
app.use('/', index);

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


module.exports = app;
