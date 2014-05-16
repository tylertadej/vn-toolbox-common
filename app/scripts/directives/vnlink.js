/*global angular */

angular.module('Volusion.toolboxCommon')
    .directive('vnLink',
        function () {
            'use strict';

            return {
                templateUrl: 'template/link.html',
                restrict   : 'EA',
                replace    : true,
                scope      : {
                    currMode : '@currMode',
                    link     : '='
                }
            };
        })
    .run(['$templateCache', function ($templateCache) {

        'use strict';

        $templateCache.put(
            'template/link.html',
            '<div>' +
                '<div class="vn-link">' +
                    '<a href="{{ link.href }}" target="{{ link.target }}">{{ link.text }}</a>' +
                '</div>' +
            '</div>'
        );
    }]);
