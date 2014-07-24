module.exports = {
  startApp: function(port) {
    var app = require('../../app');
    var server = app.listen(port);
    return server;
  }
};
