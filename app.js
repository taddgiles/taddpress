var express = require('express');
var path = require('path');
var logfmt = require("logfmt");
var emptyFavicon = require('empty-favicon');
var cookieParser = require('cookie-parser');
var bodyParser =  require('body-parser');
var compress = require('compression');

var routes = require('./routes/index');
var professorx = require('./routes/professorx');

var app = module.exports = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compress());
app.use('/favicon.ico', emptyFavicon());
if (process.env.NODE_ENV !== 'test') {
  app.use(logfmt.requestLogger());
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'production') {
  app.use(require('connect-assets')({
    paths: ['assets/css', 'assets/js', 'assets/img'],
    servePath: process.env.ASSET_URL
  }));
} else {
  app.use(require('connect-assets')({
    paths: ['assets/css', 'assets/js', 'assets/img']
  }));
}

app.use('/', routes);
app.use('/professorx', professorx);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
