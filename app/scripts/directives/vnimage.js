/*global angular */

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnImage
 * @restrict EA
 * @requires $rootScope
 * @scope
 * @description
 *
 * Replace the element with image's html markup.Accepts image as object
 *
 * <pre>
 *      $scope.image = {
 *          src: 'http://lorempixel.com/450/300/people/0',
 *          alt: 'Random people image'
 *      },
 * </pre>
 *
 * @usage
 <div vn-image image="image"></div>

 -OR-------------------------------------

 <vn-image image="imageList[2]"></vn-image>
 *
 */

angular.module('Volusion.toolboxCommon')
    .directive('vnImage',
        ['$rootScope',
            function ($rootScope) {
                'use strict';

                return {
                    templateUrl: 'template/image.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope      : {
                        currMode : '@currMode',
                        image    : '='
                    },
                    link       : function postLink(scope, element) {
                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        // Component constants *****************
                        scope.componentId = '100002';
                        scope.componentName = 'image';
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
            'template/image.html',
            '<div class="vn-image">' +
                '<p translate>VN-IMAGE-TITLE</p>' +
                '<img src="{{ image.src }}" alt="{{ image.alt }}" />' +
            '</div>'
        );
    }]);
