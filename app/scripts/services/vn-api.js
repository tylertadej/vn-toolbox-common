/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnApi
 * @requires $resource
 * @requires vnDataEndpoint
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

            if (!params) {
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

            if (!params) {
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
        function getCart(params) { // jshint ignore:line

            return $resource(vnDataEndpoint.apiUrl + '/carts', {
                cartId: '@params.cartId'
            }).get().$promise;
        }

        /**
         * @ngdoc method
         * @name Configuration
         * @methodOf Volusion.toolboxCommon.vnApi
         * @returns {$resource} $resource A $resource promise that resolves the results of
         * the request.
         *
         * @description
         * Returns a $resource promise that resolves to the Volusion API endpoint for the configured site.
         */
        function getConfiguration() {
            return $resource(vnDataEndpoint.apiUrl + '/config').get().$promise;
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

            if (!params) {
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
        function getNav(params) { // jshint ignore:line

            return $resource(vnDataEndpoint.apiUrl + '/navs',
                {
                    navId: '@params.navId'
                }).get().$promise;
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

        function Product(params) { // jshint ignore:line
            /**
             * Since the params is referenced in a string later, we tell jshint to ignore the fact that it's not 'used'
             * in the code.
             */
            return $resource(vnDataEndpoint.apiUrl + '/products',
                {
                    categoryId: '@params.categoryId',
                    filter    : '@params.filter',
                    facets    : '@params.facets',
                    pageNumber: '@params.pageNumber',
                    pageSize  : '@params.pageSize'
                });
        }

        return {
            Article         : Article,
            Category        : Category,
            getCart         : getCart,
            getConfiguration: getConfiguration,
            Country         : Country,
            getNav          : getNav,
            Product         : Product
        };
    }]);
