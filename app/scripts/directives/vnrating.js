/*global angular */

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

                        function updateStars() {
                            scope.stars = [];
                            for (idx = 0; idx < max; idx++) {
                                scope.stars.push({filled: idx < scope.ratingValue});
                            }
                        }

                        scope.$watch('ratingValue', function (oldVal, newVal) {
                            if (newVal) {
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
            '<div>' +
                '<div class="vn-rating">' +
                    '<!-- not happy with this but it seems better than angular-ui carousel' +
                        'http://blog.revolunet.com/angular-carousel/ -->' +
                    '<p translate>VN-RATING-TITLE</p>' +
                    '<ul class="rating">' +
                        '<li ng-repeat="star in stars" class="tick" ng-class="star" ng-click="toggle($index)">' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
        );
    }]);
