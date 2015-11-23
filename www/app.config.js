/**
 * Created by Alexandre on 11/2/2015.
 */

(function() {
    'use strict';

    angular.module("app")
        .config(config)
        .constant("CONSTANTS", {
            assets: "",
            components: "components"
        });

    function config($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('index', {
                url: "/index",
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

        $urlRouterProvider.when("", "/index");
        $urlRouterProvider.otherwise("/index");
    }

})(window, angular);