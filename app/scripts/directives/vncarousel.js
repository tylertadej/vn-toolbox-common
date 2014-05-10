/*global angular */

angular.module('toolboxCommon')
    .directive('vnCarousel',
        ['$translate', '$translatePartialLoader',
            function ($translate, $translatePartialLoader) {
                'use strict';

                return {
                    templateUrl: 'views/widgets/carousel.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope: {
                        currMode: '@currMode',
                        imageList: '='
                    },
        //            link    : function postLink(scope, element, attrs) {
                    link    : function postLink() {
                        $translatePartialLoader.addPart('vn-carousel');
                        $translate.refresh();
                    }
                };
            }]);
