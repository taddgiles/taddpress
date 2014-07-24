var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var articles = db.get('articles');

/* GET #new */
router.get('/new', function(req, res) {
  res.render('professorx/new.jade', {
    title: 'New Post'
  });
});

/* POST #new */
router.post('/new', function(req, res){
  var new_article = {
    title: req.param('title'),
    body: req.param('body'),
    created_at: new Date()
  };

  articles.insert(new_article, function(error, new_article) {
    res.redirect('/');
  });
});


module.exports = router;
