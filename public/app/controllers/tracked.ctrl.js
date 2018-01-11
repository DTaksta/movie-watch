angular.module('app')
    .controller('TrackedCtrl', function(userService, authService, toastrService) {
        var vm = this;

        vm.trackedMovies = null;

        vm.getTracked = function() {
            if (!authService.loggedUser) { return; }

            userService.getTracked(authService.loggedUser)
                .then(function (result) {
                    vm.errorMessage = null;
                    vm.trackedMovies = result;
                }, function() {
                    vm.trackedMovies = null;
                });
        };

        vm.addToWatched = function(index) {
            userService.addToWatched(authService.loggedUser, vm.trackedMovies[index])
                .then(function () {
                    vm.trackedMovies.splice(index, 1);
                    toastrService.success('Movie successfully added to watched list.', 'Success!');
                }, function(msg) {
                    toastrService.error(msg, 'Error!');
                });
        };

        vm.getTracked();
    });