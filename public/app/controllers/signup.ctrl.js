"use strict";

angular.module('app')
    .controller('SignupCtrl', function(authService, toastrService) {
        var vm = this;

        vm.register = function(fullname, username, email, password, passwordcheck) {
            authService.register({
                fullName: fullname,
                username: username,
                email: email,
                password: password,
                passwordCheck: passwordcheck
            }).then(function() {
                toastrService.success('You have successfully signed up.', 'Success!')
            }, function(msg) {
                vm.errorMessage = msg;
            });
        };

        vm.errorMessage = null;
    });