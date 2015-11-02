/**
 * Created by Alexandre on 11/2/2015.
 */

(function() {
    'use strict';

    /**
    * @desc 
    * @example 
    */
    angular
        .module("app")
        .directive("menuItem", MenuItem);
    
    MenuItem.$inject = ["CONSTANTS", "$rootScope", "$state"];
    
    function MenuItem(CONSTANTS, $rootScope, $state) {
        var directive = {
            restrict: "EA",
            templateUrl: CONSTANTS.assets + "menu/menu.item.html",
            scope: {
                item: "=item"
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function (event) {
                var url = element.find("a").attr("href");

                $state.go(url).then(function(){
                    $rootScope.$broadcast("state:change", {
                        state: $state.current,
                        element: element.find("a")
                    });
                });

                event.preventDefault();
            });
        }
    }
    
})(window, angular);