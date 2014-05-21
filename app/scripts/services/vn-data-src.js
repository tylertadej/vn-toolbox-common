'use strict';

angular.module('Volusion.toolboxCommon')
    .factory('vnDataSrc', function () {
        // Service logic
        // ...

        var meaningOfLife = 42;

        // Public API here
        return {
            someMethod: function () {
                return meaningOfLife;
            }
        };
    });
