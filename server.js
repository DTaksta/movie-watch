"use strict";

var express = require('express');

var app = express();

// Set the enviroment varible (development/production)
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// Config
var config = require('./server/config/environment')[env];

require('./server/config/express')(app, config);
require('./server/config/routes')(app);
require('./server/config/mongoose')(config);
require('./server/config/passport')();

// Run the server!
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');