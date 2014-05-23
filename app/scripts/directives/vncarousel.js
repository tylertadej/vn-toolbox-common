/*global angular */

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnCarousel
 * @restrict EA
 * @requires $rootScope
 * @scope
 * @description
 *
 * Replace the element with carousel's html markup. Accepts image list as array of objects
 *
 * <pre>
 *      $scope.imageList = [
 *          {src: 'http://lorempixel.com/450/300/people/0', alt: 'Random people image'},
 *          {src: 'http://lorempixel.com/450/300/people/1', alt: 'Random people image'},
 *          {src: 'http://lorempixel.com/450/300/people/2', alt: 'Random people image'},
 *          {src: 'http://lorempixel.com/450/300/people/3', alt: 'Random people image'}
 *      ];
 * </pre>
 *
 * @usage
    <div vn-carousel image-list="imageList"></div>

    -OR-------------------------------------

    <vn-carousel image-list="imageList"></vn-carousel>
 *
 */

angular.module('Volusion.toolboxCommon')
    .directive('vnCarousel',
        ['$rootScope',
            function ($rootScope) {

                'use strict';

                return {
                    templateUrl: 'template/carousel.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope: {
                        currMode: '@currMode',
                        imageList: '='
                    },
                    link       : function postLink(scope, element) {
                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        // Component constants *****************
                        scope.componentId = '100001';
                        scope.componentName = 'carousel';
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
            'template/carousel.html',
            '<div class="vn-carousel">' +
                '<!-- not happy with this but it seems better than angular-ui carousel' +
                'http://blog.revolunet.com/angular-carousel/ -->' +
                '<p translate="VN-CAROUSEL-TITLE">Images:</p>' +

                '<ul rn-carousel rn-carousel-buffered rn-carousel-indicator rn-carousel-control  class="-carousel ng-cloak">' +
                    '<li ng-repeat="image in imageList" ng-style="{\'background-image\': \'url(\' + image.src + \')\'}"></li>' +
                '</ul>' +
                '<div class="-thumbs ng-cloak">' +
                    '<div class="thumb" ng-repeat="image in imageList" ' +
                                       'ng-click="$parent.slideIndex2=$index" ' +
                                       'ng-style="{\'background-image\': \'url(\' + image.src + \')\'}" ' +
                                       'ng-class="{\'is-active\': ($parent.slideIndex2==$index)}">' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }]);
