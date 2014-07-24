var monk = require('monk');

var mongoUri = process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL  ||
               'mongodb://localhost:27017/taddpress';

var db = monk(mongoUri);

module.exports = db;
