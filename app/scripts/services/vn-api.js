/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnApi
 * @requires $resource vnDataEndpoint
 * @description
 *
 * # vnApi
 * This is a service that facilitates connection to the Volusion API. It handles both
 * non-authenticated and authenticated requests through the API RESTful interface.
 * It offers a model like interface that utilized the Angular $resource service and
 * accepts arguments specific to the request parameter requirements for each endpoint.
 * handling the full response, parsing the actual data and managing the request metadata
 * (cursor, facets, data) is the responsibility of the caller.
 *
 */

angular.module('Volusion.toolboxCommon')
    .factory('vnApi', ['$resource', 'vnDataEndpoint', function ($resource, vnDataEndpoint) {
        'use strict';


        /**
         * @ngdoc method
         * @name Article
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Article function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Article(params) {

            if(!params) {
                // Handle configuring the $resource appropriately for the articles endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Article Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/articles');
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/articles');
            }

        }


        /**
         * @ngdoc method
         * @name Category
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Category function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Category(params) {

            if(!params) {
                // Handle configuring the $resource appropriately for the category endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Category Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/categories');
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/categories');
            }

        }

        /**
         * @ngdoc method
         * @name Cart
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Cart function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Cart(params) {

            if(!params) {
                // Handle configuring the $resource appropriately for the cart endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Cart Call. That\'s ok for dev though.');
                return $resource();
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/carts');
            }

        }

        /**
         * @ngdoc method
         * @name Configuration
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Configuration function returns a
         * $resource promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Configuration(params) {

            if(!params) {
                // Handle configuring the $resource appropriately for the configuration endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Configuration Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/config');
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/config');
            }

        }

        /**
         * @ngdoc method
         * @name Country
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Country function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Country(params) {

            if(!params) {
                return $resource(vnDataEndpoint.apiUrl + '/countries');
            } else {
                // Handle configuring the $resource appropriately for the country endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Country Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/countries');
            }

        }

        /**
         * @ngdoc method
         * @name Nav
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Nav function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Nav(params) {

            if(!params) {
                // Handle configuring the $resource appropriately for the nav endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Nav Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/navs');
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/navs');
            }

        }

        /**
         * @ngdoc method
         * @name Product
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Product function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Product(params) {

            if(!params) {
                // Handle configuring the $resource appropriately for the products endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Product Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/products/');
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/products/');
            }

        }

        return {
            Article        : Article,
            Category       : Category,
            Cart           : Cart,
            Configuration  : Configuration,
            Country        : Country,
            Nav            : Nav,
            Product        : Product
        };
    }]);
