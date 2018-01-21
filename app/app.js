(function(){
    
    'use strict';
    
    var appModule = angular.module("appModule", ["ngRoute", 
                                                 "signupModule",
                                                 "vendorsignupModule",
                                                 "loginModule", 
                                                 "homeModule",
                                                 "vendorModule",
                                                 "profileModule"]);
    
    appModule.config(function ($routeProvider){

        $routeProvider

            .when("/signup", {
                controller: "SignupController",
                templateUrl: "app/signupModule/signupView.html"
            })
            .when("/vendorsignup", {
                controller: "VendorsignupController",
                templateUrl: "app/vendorsignupModule/vendorsignupView.html"
            })
            .when("/login", {
                controller: "LoginController",
                templateUrl: "app/loginModule/loginView.html"
            })
            .when("/home", {
                controller: "HomeController",
                templateUrl: "app/homeModule/homeView.html",
                resolve: {
                    app: function ($q, $location) {
                        var defer = $q.defer();
                        var loginToken = localStorage.getItem('token');
                        if (!loginToken) {
                            $location.path('/login');
                        };
                        defer.resolve();
                        return defer.promise;
                    }
                }
            })
            .when("/vendors", {
                controller: "VendorController",
                templateUrl: "app/vendorModule/vendorView.html"
            })
            .when("/profile", {
                controller: "ProfileController",
                templateUrl: "app/profileModule/profileView.html",
                resolve: {
                    app: function ($q, $location) {
                        var defer = $q.defer();
                        var loginToken = localStorage.getItem('token');
                        if (!loginToken) {
                            $location.path('/home');
                        };
                        defer.resolve();
                        return defer.promise;
                    }
                }
            })
        
    });
    
})();