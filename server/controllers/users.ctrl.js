"use strict";

var User = require('../models/user'),
    Movie = require('../models/movie');


exports.createUser = function(userData, callback) {
    if (userData.password !== userData.passwordCheck) {
        callback('Error: entered passwords does not match!');
        return;
    }

    User.create(userData, function(err) {
        if (err) {
            if (err.code == '11000') {
                err.message.indexOf('username') > -1 ?
                    callback('Error: username already taken!') :
                    callback('Error: email already taken!');
            } else if (err.toString().indexOf('required') > - 1) {
                callback('Error: one or more fields are empty!');
            } else {
                callback('Error: something went wrong, please try again later!');
            }
        } else {
            callback(null);
        }
    });
};


exports.addToTracked = function (username, movieData, callback) {
    User.findOne({ username: username}, function(err, user) {
        if (err) {
            callback('User not found.');
        } else {
            Movie.findOrCreate(movieData, function (err, movie) {
                if (err) {
                    callback('Could not track this movie.');
                } else if (user.trackedMovies.indexOf(movie._id) > - 1) {
                    callback('Already tracked movie!');
                } else if (user.watchedMovies.indexOf(movie._id) > - 1) {
                    callback('Already watched movie!');
                } else {
                    user.trackedMovies.push(movie);
                    user.save();

                    callback(null);
                }
            });
        }
    });
};


exports.getTracked = function (username, callback) {
    User
        .findOne({ username: username })
        .populate({
            path: 'trackedMovies',
            options: {
                sort: { 'createdAt': -1 }
            }
        })
        .exec(function(err, user) {
            if(err) {
                callback(null, 'An error has occurred while loading tracked movies.')
            } else {
                callback(user.trackedMovies, null);
            }
        });
};


exports.addToWatched = function (username, movieData, callback) {
    User.findOne({ username: username}, function(err, user) {
        if (err) {
            callback('User not found.');
        } else {
            Movie.findOrCreate(movieData, function (err, movie) {
                if (err) {
                    callback('Could not track this movie.');
                } else if (user.watchedMovies.indexOf(movie._id) > - 1) {
                    callback('Already watched movie!');
                } else {
                    user.trackedMovies.splice(user.trackedMovies.indexOf(movie._id));
                    user.watchedMovies.push(movie);
                    user.save();

                    callback(null);
                }
            });
        }
    });
};


exports.getWatched = function (username, callback) {
    User
        .findOne({ username: username })
        .populate({
            path: 'watchedMovies',
            options: {
                sort: { 'createdAt': -1 }
            }
        })
        .exec(function(err, user) {
            if(err) {
                callback(null, 'An error has occurred while loading watched movies.')
            } else {
                callback(user.watchedMovies, null);
            }
        });
};
