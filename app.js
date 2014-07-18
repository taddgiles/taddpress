var express = require('express');
var logfmt = require("logfmt");
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var ArticleProvider = require('./articleprovider-mongodb').ArticleProvider;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logfmt.requestLogger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var articleProvider= new ArticleProvider();

// app.use('/', routes);
// app.use('/users', users);

app.get('/', function(req, res){
  articleProvider.findAll( function(error,docs){
    res.render('index.jade', {
      title: 'Tadd Giles',
      articles:docs
    });
  });
});

app.get('/professorx/new', function(req, res) {
  res.render('professorx/new.jade', {
    title: 'New Post'
  });
});

app.post('/professorx/new', function(req, res){
  articleProvider.save({
    title: req.param('title'),
    body: req.param('body')
  }, function( error, docs) {
    res.redirect('/');
  });
});

app.get('/:id', function(req, res) {
    articleProvider.findById(req.params.id, function(error, article) {
        res.render('show.jade',
        {
            title: article.title,
            article:article
        });
    });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.post('/blog/new', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body')
    }, function( error, docs) {
        res.redirect('/');
    });
});

/// error handlers

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


module.exports = app;
