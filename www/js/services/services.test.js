/**
 * Created by Alexandre on 11/8/2015.
 */

(function() {
    'use strict';
    
    angular
        .module("DataService", [])
        .service("services", Services);
    
    Services.$inject = [];
    
    function Services() {
        var service = {
            isLoaded: isLoaded
        };
        
        return service;
        
        function isLoaded(){
            console.log("isLoaded");
        }
    }
})(window, angular);