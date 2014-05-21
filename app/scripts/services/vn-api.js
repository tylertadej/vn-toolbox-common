'use strict';

angular.module('Volusion.toolboxCommon')
    .factory('vnApi', function () {
        // Service logic
        // ...
        var add10 = 11;
        var meaningOfLife = 42 + add10;

        // Public API here
        return {
            someMethod: function () {
                return meaningOfLife;
            }
        };
    });
