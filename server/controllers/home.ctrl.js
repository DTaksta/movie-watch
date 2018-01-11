"use strict";

var Movie = require('../models/movie');

exports.getLatestAdded = function(callback) {
  Movie.find().sort('-createdAt').limit(10).exec(function (err, movies) {
      callback(movies);
  })
};