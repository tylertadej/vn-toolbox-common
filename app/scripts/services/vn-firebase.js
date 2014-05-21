'use strict';

angular.module('Volusion.toolboxCommon')
    .factory('vnFirebase', function () {
        // Service logic
        // ...

        var add10 = 10;
        var meaningOfLife = 42 + add10;

        // Public API here
        return {
            someMethod: function () {
                return meaningOfLife;
            }
        };
    });
