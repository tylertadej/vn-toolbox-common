/*global angular */

angular.module('Volusion.toolboxCommon')
    .directive('vnCarousel',
        function () {
            'use strict';

            return {
                templateUrl: 'template/carousel.html',
                restrict   : 'EA',
                replace    : true,
                scope: {
                    currMode: '@currMode',
                    imageList: '='
                }
            };
        })
    .run(['$templateCache', function ($templateCache) {
        'use strict';

        $templateCache.put(
            'template/carousel.html',
            '<div>' +
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

                '</div>' +
            '</div>'
        );
    }]);
