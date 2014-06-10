/*global angular */

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnLink
 * @restrict EA
 * @requires $rootScope
 * @scope
 *
 * @description
 *
 * Replace the element with anchor and transcluded caption.
 *
 * **Note:** If target is not specified if will be set to "_SELF"
 *
 * @usage
 <a
    vn-link
    href="{{ PATH_TO }}"
    target="{{ _self || _blank || _top">
        {{ LINK_CAPTION | translated }}
 </a>

 -OR-------------------------------------

 <vn-link
    href="{{ PATH_TO }}"
    target="{{ _self || _blank || _top">
        {{ LINK_CAPTION | translated }}
 </vn-link>
 *
// * @example
// *<a vn-link href="http://www.yahoo.com" target="_self">Go to Yahoo</a>
 *
 * @example
     <example module="app">
         <file name="script.js">
             angular.module('app', [])
                 .controller('LinkCtrl',
                    function ($scope) {

                        $scope.pathTo = 'http://www.yahoo.com';

                    });
         </file>
         <file name="index.html">
             <div ng-controller="LinkCtrl">
                <vn-link href="pathTo">Go to Yahoo</vn-link>
             </div>
         </file>
     </example>
 */

angular.module('Volusion.toolboxCommon')
    .directive('vnLink',
        ['$rootScope',
            function ($rootScope) {
                'use strict';

                return {
                    templateUrl: 'template/link.html',
                    restrict   : 'EA',
                    transclude : true,
                    replace    : true,
                    scope      : {
                        currMode : '@'
                    },
                    link       : function postLink(scope, element) {
                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        // Component constants *****************
                        scope.componentId = '100003';
                        scope.componentName = 'link';
                        // *************************************

                        // Component is not selected by default
                        scope.selected = false;

                        scope.$on('currentComponent.change', function (event, component) {
                            if (component && component.id && scope.currMode === 'off') {
                                scope.selected = (component.id === scope.componentId);
                            }
                        });

                        element.on('click', function (event) {
                            // if in EDIT mode
                            if (scope.currMode === 'off') {
                                event.preventDefault();
                                $rootScope.$broadcast('currentComponent.change', {'id': scope.componentId, 'name': scope.componentName, 'action': 'set'});
                            }
                        });
                    }
                };
            }])
    .run(['$templateCache', function ($templateCache) {

        'use strict';

        $templateCache.put(
            'template/link.html',
            '<a class="vn-link" ng-transclude></a>'
        );
    }]);
