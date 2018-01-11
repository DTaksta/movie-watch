angular.module('app')
    .controller('HomeCtrl', function($http) {
        var vm = this;

        vm.latestAddedMovies = null;

        $http.get('/get-latest')
            .then(function(response) {
                vm.latestAddedMovies = response.data;
            });
    });