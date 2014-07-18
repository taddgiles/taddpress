var express = require('express');
var router = express.Router();

var ArticleProvider = require('../providers/article-provider').ArticleProvider;
var articleProvider= new ArticleProvider();


/* GET #new */
router.get('/new', function(req, res) {
  res.render('professorx/new.jade', {
    title: 'New Post'
  });
});

/* POST #new */
router.post('/new', function(req, res){
  articleProvider.save({
    title: req.param('title'),
    body: req.param('body')
  }, function( error, docs) {
    res.redirect('/');
  });
});


module.exports = router;
