"use strict";

angular.module('app')
    .service('userService', function($http, $q) {
        var service = this;

        service.addToTracked = function(username, movieData) {
            var deferred = $q.defer();

            $http.post('/add-tracked', {
                username: username,
                movieData: movieData
            })
                .then(function (response) {
                    if (response.data.success) {
                        deferred.resolve();
                    }
                }, function(response) {
                    if (!response.data.success) {
                        deferred.reject(response.data.msg);
                    }
                });

            return deferred.promise;
        };


        service.getTracked = function(username) {
            var deferred = $q.defer();

            $http.post('/get-tracked', {
                username: username
            })
                .then(function (response) {
                    if (response.data.success) {
                        deferred.resolve(response.data.trackedMovies);
                    }
                }, function(response) {
                    if (!response.data.success) {
                        deferred.reject(response.data.msg);
                    }
                });

            return deferred.promise;
        };

        service.addToWatched = function(username, movieData) {
            var deferred = $q.defer();

            $http.post('/add-watched', {
                username: username,
                movieData: movieData
            })
                .then(function (response) {
                    if (response.data.success) {
                        deferred.resolve();
                    }
                }, function(response) {
                    if (!response.data.success) {
                        deferred.reject(response.data.msg);
                    }
                });

            return deferred.promise;
        };


        service.getWatched = function(username) {
            var deferred = $q.defer();

            $http.post('/get-watched', {
                username: username
            })
                .then(function (response) {
                    if (response.data.success) {
                        deferred.resolve(response.data.watchedMovies);
                    }
                }, function(response) {
                    if (!response.data.success) {
                        deferred.reject(response.data.msg);
                    }
                });

            return deferred.promise;
        };
    });