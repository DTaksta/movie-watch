"use strict";

angular.module('app', ['ngAnimate', 'ui.router', 'toastr'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/home.html',
                controller: 'HomeCtrl as homeCtrl'
            })
            .state('tracked', {
                url: '/tracked',
                templateUrl: 'app/views/tracked.html',
                controller: 'TrackedCtrl as trackedCtrl',
                resolve: {
                    authentication: function(authService) {
                        authService.redirectUnauthorized();
                    }
                }
            })
            .state('watched', {
                url: '/watched',
                templateUrl: 'app/views/watched.html',
                controller: 'WatchedCtrl as watchedCtrl',
                resolve: {
                    authentication: function(authService) {
                        authService.redirectUnauthorized();
                    }
                }
            })
            .state('search', {
                url: '/search',
                templateUrl: 'app/views/search.html',
                controller: 'SearchCtrl as searchCtrl',
                resolve: {
                    authentication: function(authService) {
                        authService.redirectUnauthorized();
                    }
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/views/signup.html',
                controller: 'SignupCtrl as signupCtrl'
            })
            .state('unauthorized', {
                url: '/unauthorized',
                templateUrl: 'app/views/unauthorized.html'
            });

        $urlRouterProvider.otherwise('/');

});