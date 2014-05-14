/*global angular */

angular.module('Volusion.toolboxCommon')
    .directive('vnImage',
        ['$translate', '$translatePartialLoader',
            function ($translate, $translatePartialLoader) {
                'use strict';

                return {
                    templateUrl: 'template/image.html',
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
            }])
    .run(['$templateCache', function ($templateCache) {

        'use strict';

        $templateCache.put(
            'template/image.html',
            '<div>' +
                '<div class="vn-image">' +
                    '<p translate>VN-IMAGE-TITLE</p>' +
                    '<img src="{{ image.src }}" alt="{{ image.alt }}" />' +
                '</div>' +
            '</div>'
        );
    }]);
