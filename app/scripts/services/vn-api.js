/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.factory:vnApi
 * @module Volusion.toolboxCommon
 * @description
 *
 * vnApi (core data service module)
 * The vnApi module is used by vnDataSrc when vnDataSrc determines that data
 * needs to be accessed, updated, created or deleted. vnApi returns $resources
 * configured to handle the crud operations specific to the endpoint being
 * accessed.
 *
 * ### vnApi exposes the following API
 *
 * - Article
 * - Category
 * - Cart
 * - Configuration
 * - Country
 * - Nav
 * - Product
 *
 *
 */

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
