angular.module('app')
    .controller('WatchedCtrl', function(userService, authService) {
        var vm = this;

        vm.watchedMovies = null;

        vm.errorMessage = null;

        vm.getWatched = function() {
            if (!authService.loggedUser) { return; }

            userService.getWatched(authService.loggedUser)
                .then(function (result) {
                    vm.errorMessage = null;
                    vm.watchedMovies = result;
                }, function(msg) {
                    vm.watchedMovies = null;
                    vm.errorMessage = msg;
                });
        };

        vm.getWatched();
    });