/**
 * Created by Alexandre on 11/2/2015.
 */

(function() {
    'use strict';

    /**
    * @desc
    * @example <menu></menu>
    */
    angular
        .module("app")
        .directive("menu", Menu);

    Menu.$inject = ["CONSTANTS", "$rootScope"];

    function Menu(CONSTANTS, $rootScope) {
        var directive = {
            restrict: 'EA',
            templateUrl: CONSTANTS.assets + "menu/menu.html",
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
                var elmt = element.find("a");
                
                for(var i = 0;i < elmt.length;i++){
                    $(elmt[i]).removeClass("active");
                }

                data.element.addClass("active");
            });
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