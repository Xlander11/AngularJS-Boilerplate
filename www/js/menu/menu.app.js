/**
 * Created by Alexandre on 11/2/2015.
 */

(function() {
    'use strict';

    /**
    * @desc Menu Directive
    * @example <menu></menu>
    */
    angular
        .module("menuApp", [
            "DataService"
        ])
        .directive("menu", Menu);
    
    Menu.$inject = ["CONSTANTS", "$rootScope", "$state", "services"];

    function Menu(CONSTANTS, $rootScope, $state, services) {
        var directive = {
            restrict: 'EA',
            templateUrl: CONSTANTS.js + "/menu/menu.html",
            link: link,
            controller: MenuController,
            /*
            note: The controller name should be written as string if referring to a defined controller in a separated file.
            */
            controllerAs: "vm",
            bindToController: true
        };
        return directive;

        function link(scope, element, attrs) {
            $rootScope.$on("state:change", function(event, data){
                /* When a page is changed */
                removeActiveClass(element, function (el) {
                    data.element.addClass("active");
                });

            });

            services.isLoaded();
        }

        function removeActiveClass(el, callback){
            var elmt = el.find("a");

            for(var i = 0;i < elmt.length;i++){
                angular.element(elmt[i]).removeClass("active");
            }

            if(callback) {
                callback(elmt);
            }
        }
    }

    MenuController.$inject = ["$scope", "$rootScope"];

    function MenuController($scope, $rootScope) {
        var vm = this;

        vm.menuItems = [
            {
                name: "Home",
                url: "index",
                state: "index"
            },
            {
                name: "About Us",
                url: "about-us",
                state: "about-us"
            }
        ]
    }
})(window, angular);