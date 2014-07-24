var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var articles = db.get('articles');

/* GET home page */
router.get('/', function(req, res) {
  articles.find({},{}, function(error,docs){
    res.render('index.jade', {
      title:   'Tadd Giles',
      articles: docs
    });
  });
});

/* GET #:id article */
router.get('/:id', function(req, res) {
  articles.findById(req.params.id, function(error, doc){
    res.render('show.jade',
    {
      title:   doc.title,
      article: doc
    });
  });
});

module.exports = router;
