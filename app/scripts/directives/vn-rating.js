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
 * **Note:** If editable attribute is not specified "FALSE" will be assumed
 *
 * @usage
 <div vn-rating rating-value="{{ VALUE }}"></div>

 -OR-------------------------------------

 <vn-rating rating-value="{{ VALUE }}" data-editable="{{ BOOLEAN }}"></vn-rating>
 *
 * @example
    <example module="app">
        <file name="script.js">
            angular.module('app', [])
                .controller('RatingCtrl',
                    function ($scope) {
                        $scope.ratingValue = 3;
                        $scope.isEditable = false;
                    });
        </file>
        <file name="index.html">
            <div data-ng-controller="LinkCtrl">
                <vn-rating rating-value="ratingValue" editable="isEditable" ></vn-rating>
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
                    editable   : '=',
                    maximum    : '=',
                    ratingValue: '='
                },
                link       : function postLink(scope, element, attrs) {
                    var filledClass = attrs.filledClass || 'fa fa-star';
                    var emptyClass = attrs.emptyClass || 'fa fa-star-o';
                    var halfFilledClass = attrs.halfFilledClass || 'fa fa-star-half-o';
                    scope.title = typeof attrs.title !== 'undefined' ? attrs.title : 'Rating';

                    var idx,
                        max = scope.maximum || 5;

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

                    function getStarCssClass(index) {
                        if (scope.ratingValue % 1 === 0 && index < scope.ratingValue) {
                            return filledClass;
                        } else if(scope.ratingValue % 1 === 0.5 && scope.ratingValue - index > 0.5) {
                                return filledClass;
                        } else  if (scope.ratingValue % 1 === 0.5 && scope.ratingValue - index === 0.5){
                            return halfFilledClass;
                        } else {
                            return emptyClass;
                        }
                    }

                    scope.stars = [];
                    function updateStars() {
                        scope.stars = [];
                        for (idx = 0; idx < max; idx++) {
                            scope.stars.push({
                                cssClass: getStarCssClass(idx)
                            });
                        }
                    }

                    scope.$watch('ratingValue', function (oldVal, newVal) {
                        if (newVal === 0 || newVal) {
                            updateStars();
                        }
                    });

                    scope.toggle = function (index) {
                        if (!scope.editable) {
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
                    '<p class="vn-rating-title" data-ng-bind="title"></p>' +
                    '<ul class="rating">' +
                        '<li data-ng-repeat="star in stars" data-ng-click="toggle($index)">' +
                            '<i class=" {{ star.cssClass }} " />' +
                        '</li>' +
                    '</ul>' +
                '</div>'
        );
    }]);
