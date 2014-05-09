/*global angular */

angular.module('toolboxCommon')
    .controller('MainCtrl',
//        ['$scope', '$translate', '$translatePartialLoader',
    ['$scope',
        function ($scope) {
            //            function ($scope, $translate, $translatePartialLoader) {

            'use strict';

            // Mock image list
            $scope.imageList = [
                {src: 'http://lorempixel.com/450/300/people/0'},
                {src: 'http://lorempixel.com/450/300/people/1'},
                {src: 'http://lorempixel.com/450/300/people/2'},
                {src: 'http://lorempixel.com/450/300/people/3'}
            ];
        }]);
