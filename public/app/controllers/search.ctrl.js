angular.module('app')
    .controller('SearchCtrl', function(movieService, userService, authService, toastrService) {
        var vm = this;


        vm.moviesCollection = [];

        vm.errorMessage = null;

        vm.getMovies = function (query) {
            vm.moviesCollection = [];
            vm.errorMessage = null;

            movieService.getMoviesbyTitle(query)
                .then(function(result) {
                   vm.moviesCollection = result;
                }, function(msg) {
                    vm.errorMessage = msg;
                });
        };

        vm.addToTracked = function(index) {
            userService.addToTracked(authService.loggedUser, vm.moviesCollection[index])
                .then(function () {
                    toastrService.success('Movie successfully added to your collection.', 'Success!');
                }, function(msg) {
                    toastrService.error(msg, 'Error!');
                });
        }
    });