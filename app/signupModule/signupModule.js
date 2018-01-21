(function () {

    'use strict';

    var signupModule = angular.module("signupModule", []);

    signupModule.controller("SignupController", function ($http, $scope, $location) {

        $scope.signUpUser = function(){
            
            var passwordCheck = checkPasswordMatch($scope.pass1, $scope.pass2);
            if (!passwordCheck){
                // TODO: Add generic error message
                console.log("Error - PW not a match")
            }
            else {
                var signupObj = {
                    userName: $scope.fullName,
                    email: $scope.email,
                    password: $scope.pass1
                }
                sendSignUp(signupObj);
            }
        }

        function sendSignUp(signupObj) {
            $http({
                method: "POST",
                url: '/signup',
                data: signupObj
            }).then(function success(res) {
                if (res.status == 201){
                    $location.url('/login');
                }
            }, function error(res) {
                // TODO: Show Error
            });
        };


        function checkPasswordMatch(pass1,pass2){
            if(pass1 != pass2){
                return false
            }
            else {
                return true
            }
        }
    });

})();