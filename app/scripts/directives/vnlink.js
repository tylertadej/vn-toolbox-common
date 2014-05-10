/*global angular */

angular.module('toolboxCommon')
    .directive('vnLink',
        ['$translate', '$translatePartialLoader',
            function ($translate, $translatePartialLoader) {
                'use strict';

                return {
                    templateUrl: 'views/widgets/link.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope      : {
                        currMode : '@currMode',
                        link     : '='
                    },
                    link       : function postLink() {
                        $translatePartialLoader.addPart('vn-image');
                        $translate.refresh();
                    }
                };
            }]);
