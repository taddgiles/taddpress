// Autoloaded for all integration tests
global.expect = require('expect.js');

if (typeof process.env.REMOTE_TEST_URL != 'undefined') {
  // Run against remote server
  global.root = process.env.REMOTE_TEST_URL;
} else {
  // Start and run against local server
  var port = 3000;
  global.root = 'http://localhost:' + port + '/';

  var app = require('../../app');
  app.listen(port);
}
global.Browser = require('zombie');

console.log();
console.log();
console.log('===============================================================================');
console.log('Running integration tests against: ' + root);
console.log('===============================================================================');
console.log();
