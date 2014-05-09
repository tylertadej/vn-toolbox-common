/*global angular */

angular.module('toolboxCommon')
    .directive('vnRating',
        ['$translate', '$translatePartialLoader',
            function ($translate, $translatePartialLoader) {
                'use strict';

                return {
                    templateUrl: 'views/widgets/rating.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope      : {
                        currMode   : '@currMode',
                        ratingValue: '=',
                        readonly   : '@'
                    },
                    link       : function postLink(scope) {

                        var idx,
                            max = 5;

                        $translatePartialLoader.addPart('vn-rating');
                        $translate.refresh();

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
            }]);
