var boot = require('../../bin/www').boot,
    shutdown = require('../../bin/www').shutdown,
    port = require('../../bin/www').port,
    superagent = require('superagent'),
    expect = require('expect.js');

describe('server', function() {
  before(function() {
    boot();
  });

  describe('homepage', function() {
    it('should respond to GET', function(done) {
      superagent
        .get('http://localhost:' + port)
        .end(function(res) {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  after(function() {
    shutdown();
  });
});


// var routes = require("../../routes");

// var request = {};
// var response = {
//     viewName: "",
//     data: {},
//     render: function(view, viewData) {
//       this.viewName = view;
//       this.data = viewData;
//     }
// };

// describe("Routing", function(){
//   describe("Default Route", function(){
//     it("should provide the a title and the index view name", function(){
//       routes.index(request, response);
//       response.viewName.should.equal("index");
//     });
//   });
// });
