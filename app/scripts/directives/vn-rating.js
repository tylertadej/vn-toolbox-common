/*global angular */

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnRating
 * @restrict EA
 * @requires $rootScope
 * @scope
 * @description
 *
 * Replace the element with rating's html markup.Accepts ratingValue as Integer and readonly as expression
 *
 * **Note:** If readonly attribute is not specified "FALSE" will be assumed
 *
 * @usage
 <div vn-rating rating-value="{{ VALUE }}"></div>

 -OR-------------------------------------

 <vn-rating rating-value="{{ VALUE }}" data-readonly="{{ BOOLEAN }}"></vn-rating>
 *
 * @example
     <example module="app">
         <file name="script.js">
             angular.module('app', [])
                .controller('RatingCtrl',
                    function ($scope) {

                        $scope.ratingValue = 3;

                    });
         </file>
         <file name="index.html">
             <div ng-controller="LinkCtrl">
                <vn-rating rating-value="ratingValue"></vn-rating>
             </div>
         </file>
     </example>
 */

angular.module('Volusion.toolboxCommon')
    .directive('vnRating',
        ['$rootScope',
            function ($rootScope) {
                'use strict';

                return {
                    templateUrl: 'template/rating.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope      : {
                        currMode   : '@currMode',
                        ratingValue: '=',
                        readonly   : '@'
                    },
                    link       : function postLink(scope, element) {

                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        if (scope.ratingValue === undefined || scope.ratingValue === '') {
                            scope.ratingValue = 0;
                        }

                        // Component constants *****************
                        scope.componentId = '100004';
                        scope.componentName = 'rating';
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

                        var idx,
                            max = 5;

                        scope.stars = [];

                        function updateStars() {
                            scope.stars = [];
                            for (idx = 0; idx < max; idx++) {
                                scope.stars.push({filled: idx < scope.ratingValue});
                            }
                        }

                        scope.$watch('ratingValue', function (oldVal, newVal) {
                            if (newVal === 0 || newVal) {
                                updateStars();
                            }
                        });

                        scope.toggle = function (index) {
                            if (scope.readonly && scope.readonly === 'true') {
                                return;
                            }

                            scope.ratingValue = index + 1;
                        };
                    }
                };
            }])
    .run(['$templateCache', function ($templateCache) {

        'use strict';

        $templateCache.put(
            'template/rating.html',
            '<div class="vn-rating">' +
                '<!-- not happy with this but it seems better than angular-ui carousel' +
                    'http://blog.revolunet.com/angular-carousel/ -->' +
                '<p translate>VN-RATING-TITLE</p>' +
                '<ul class="rating">' +
                    '<li ng-repeat="star in stars" class="tick" ng-class="star" ng-click="toggle($index)">' +
                    '</li>' +
                '</ul>' +
            '</div>'
        );
    }]);
