(function () {

    'use strict';

    var profileModule = angular.module("profileModule", []);

    profileModule.controller("ProfileController", function ($http, $scope, $location) {

        // Header/Footer Settings
        $scope.logout = function () {
            localStorage.clear();
            $location.url('/login');
        }
        $scope.year = getYear();
        function getYear() {
            var d = new Date();
            var year = d.getFullYear();
            return year;
        }
    });

})();