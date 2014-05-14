/*global angular */

angular.module('Volusion.toolboxCommon')
    .controller('MainCtrl',
//        ['$scope', '$translate', '$translatePartialLoader',
        ['$scope', '$translate',
            function ($scope, $translate) {
                //            function ($scope, $translate, $translatePartialLoader) {

                'use strict';

                $scope.toggleLang = function () {
                    if ('en' === $translate.use()) {
                        $translate.use('es');
                    } else {
                        $translate.use($translate.preferredLanguage());
                    }


                };

                // Mock image list
                $scope.imageList = [
                    {src: 'http://lorempixel.com/450/300/people/0'},
                    {src: 'http://lorempixel.com/450/300/people/1'},
                    {src: 'http://lorempixel.com/450/300/people/2'},
                    {src: 'http://lorempixel.com/450/300/people/3'}
                ];

                // Mock rating
                $scope.rating = 3;

                // Mock image
                $scope.image = {
                    src: 'http://lorempixel.com/450/300/city',
                    alt: 'Random city image'
                };

                // Mock link
                $scope.link = {
                    href: 'http://www.yahoo.com',
                    target: '_blank',
                    text: 'Go to yahoo.com'
                };
            }]);
