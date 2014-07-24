require('../shared/testutils').startApp(3000);
var path = require('path');
var superagent = require('superagent');

var root = 'http://localhost:3000/';

describe('/', function() {
  it('should display home page', function(done) {
    superagent
      .get(root)
      .end(function(err, res) {
        res.status.should.eql(200);
        return done();
      });
  });
});
