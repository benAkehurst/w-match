(function () {

    'use strict';

    var loginModule = angular.module("loginModule", []);

    loginModule.controller("LoginController", function ($http, $scope, $location) {

        $scope.loginUser = function () {
            var loginObj = {
                email: $scope.email,
                password: $scope.password
            }
            $http({
                method: "POST",
                url: '/login',
                data: loginObj
            }).then(function success(res) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    $location.url('/home');
            }, function error(res) {
                // TODO: Show Error
                console.log(res);
            });
        }

    });

})();