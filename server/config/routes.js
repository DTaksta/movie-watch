"use strict";

var auth = require('../controllers/auth.ctrl.js'),
    users = require('../controllers/users.ctrl.js'),
    movies = require('../controllers/home.ctrl.js');

module.exports = function(app) {

    app.post('/login', auth.authenticate);

    app.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
    });

    app.post('/register', function(req, res) {
        users.createUser(req.body, function (msg) {
            if (msg) {
                res.status(400).send({
                    success: false,
                    msg: msg
                });
            } else {
                res.send({
                    success: true
                });
            }
        });
    });

    app.get('/logged-user', function(req, res) {
        if(!!req.user) {
            res.json(req.user.username);
        } else {
            res.json(req.user);
        }
    });

    app.post('/add-tracked', function(req, res) {
        users.addToTracked(req.body.username, req.body.movieData, function(msg) {
            if (msg) {
                res.status(400).send({
                    success: false,
                    msg: msg
                });
            } else {
                res.send({
                    success: true
                });
            }
        });
    });


    app.post('/get-tracked', function(req, res) {
        users.getTracked(req.body.username, function (result, msg) {
            if (result) {
                res.send({
                    success: true,
                    trackedMovies: result
                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: msg
                });
            }
        });
    });

    app.post('/add-watched', function(req, res) {
        users.addToWatched(req.body.username, req.body.movieData, function(msg) {
            if (msg) {
                res.status(400).send({
                    success: false,
                    msg: msg
                });
            } else {
                res.send({
                    success: true
                });
            }
        });
    });


    app.post('/get-watched', function(req, res) {
        users.getWatched(req.body.username, function (result, msg) {
            if (result) {
                res.send({
                    success: true,
                    watchedMovies: result
                });
            } else {
                res.status(400).send({
                    success: false,
                    msg: msg
                });
            }
        });
    });


    app.get('/get-latest', function (req, res) {
        movies.getLatestAdded(function (result) {
            res.json(result);
        });
    });


    app.get('*', function(req, res) {
        res.render('index.html');
    });



};