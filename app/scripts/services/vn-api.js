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
