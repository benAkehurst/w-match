(function () {

    'use strict';

    var vendorsignupModule = angular.module("vendorsignupModule", []);

    vendorsignupModule.controller("VendorsignupController", function ($http, $scope, $location) {

        $scope.registerVendor = function () {

            var passwordCheck = checkPasswordMatch($scope.pass1, $scope.pass2);
            if (!passwordCheck) {
                // TODO: Add generic error message
                console.log("Error - PW not a match")
            }
            else {
                var signupObj = {
                    name: $scope.name,
                    email: $scope.email,
                    password: $scope.pass1,
                    companyName: $scope.companyName,
                    companyField: $scope.companyField,
                    companyPhone: $scope.companyPhone,
                    companyEmail: $scope.companyEmail,
                    companyWebsite: $scope.companyEmail,
                    companyFacebook: $scope.companyFacebook,
                    companyInstagram: $scope.companyInstagram
                }
                registerVendor(signupObj);
            }
        }

        function registerVendor(signupObj) {
            $http({
                method: "POST",
                url: '/signupvendor',
                data: signupObj
            }).then(function success(res) {
                if (res.status == 201) {
                    $location.url('/vendorlogin');
                }
            }, function error(res) {
                // TODO: Show Error
            });
        };


        function checkPasswordMatch(pass1, pass2) {
            if (pass1 != pass2) {
                return false
            }
            else {
                return true
            }
        }
        

    });

})();