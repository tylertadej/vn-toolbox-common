/*global angular */

angular.module('toolboxCommon')
    .directive('vnImage',
        ['$translate', '$translatePartialLoader',
            function ($translate, $translatePartialLoader) {
                'use strict';

                return {
                    templateUrl: 'views/widgets/image.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope      : {
                        currMode : '@currMode',
                        image    : '='
                    },
                    link       : function postLink() {
                        $translatePartialLoader.addPart('vn-image');
                        $translate.refresh();
                    }
                };
            }]);
