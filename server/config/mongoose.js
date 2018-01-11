"use strict";

var mongoose = require('mongoose');

module.exports = function(config) {
    mongoose.connect(config.db);

    mongoose.connection
        .on('error', function(err) {
            console.log(err);
        })
        .once('open', function() {
            console.log('movie-watcher db opened');
        });
};
