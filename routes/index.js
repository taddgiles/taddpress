var express = require('express');
var router = express.Router();

var ArticleProvider = require('../providers/article-provider').ArticleProvider;
var articleProvider= new ArticleProvider();


/* GET home page */
router.get('/', function(req, res) {
  articleProvider.findAll( function(error,docs){
    res.render('index.jade', {
      title: 'Tadd Giles',
      articles:docs
    });
  });
});

/* GET #:id blog entry */
router.get('/:id', function(req, res) {
  articleProvider.findById(req.params.id, function(error, article) {
    res.render('show.jade',
    {
      title: article.title,
      article:article
    });
  });
});


module.exports = router;
