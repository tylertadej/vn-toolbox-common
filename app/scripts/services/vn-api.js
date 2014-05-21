angular.module('Volusion.toolboxCommon')
    .factory('vnApi', ['$resource', 'vnDataEndpoint', function ($resource, vnDataEndpoint) {
        'use strict';

        return {
            Article        : $resource(vnDataEndpoint.apiUrl + '/articles'),
            Category       : $resource(vnDataEndpoint.apiUrl + '/categories'),
            Cart           : $resource(vnDataEndpoint.apiUrl + '/carts'),
            Configuration  : $resource(vnDataEndpoint.apiUrl + '/config'),
            Country        : $resource(vnDataEndpoint.apiUrl + '/countries'),
            Nav            : $resource(vnDataEndpoint.apiUrl + '/navs'),
            Product        : $resource(vnDataEndpoint.apiUrl + '/products/')
        };
    }]);
//    .factory('vnApi', function () {
//        // Service logic
//        // ...
//        var add10 = 11;
//        var meaningOfLife = 42 + add10;
//
//        // Public API here
//        return {
//            someMethod: function () {
//                return meaningOfLife;
//            }
//        };
//    });
