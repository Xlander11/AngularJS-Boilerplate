/**
 * Created by Alexandre on 11/2/2015.
 */

(function() {
    'use strict';

    angular.module("app")
        .config(config)
        .constant("CONSTANTS", {
            assets: ''
        });

    function config($stateProvider){
        $stateProvider
            .state('index', {
                url: "",
                views: {
                    page: {
                        templateUrl: 'views/index.html'
                    }
                }
            })
            .state('about-us', {
                url: "/about-us",
                views: {
                    page: {
                        templateUrl: 'views/about-us.html'
                    }
                }
            });
    }

})(window, angular);