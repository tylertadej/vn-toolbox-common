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
    .factory('vnApi', ['$resource', 'vnDataEndpoint',
        function ($resource, vnDataEndpoint) {
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
            function Article() {

                return $resource(vnDataEndpoint.apiUrl + '/articles');
//                if (!params) {
//                    // Handle configuring the $resource appropriately for the articles endpoint.
//                    // Dev IDEA is to use a private function to handle this business logic
//                    console.log('vnApi - no params for Article Call. That\'s ok for dev though.');
//                    return $resource(vnDataEndpoint.apiUrl + '/articles');
//                } else {
//                    return $resource(vnDataEndpoint.apiUrl + '/articles');
//                }

            }


            /**
             * @ngdoc method
             * @name Category
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource an angular $resource
             *
             * @description
             * Consume the category endpoint in the API. Returns a promise for the Get function that can be invoked with typical
             * promise code.
             *
             * - returnedPromise.then(function(response) {
             * -     $scope.category = response.data;
             * - });
             *
             */
            function Category() {
//                http://www.samplestore.io/api/v1/categories?slug=men
//                console.log('api category slug: ', slug);
//                var test = vnDataEndpoint.apiUrl + '/categories/';
//                catSlug = catSlug || '';

                return $resource(vnDataEndpoint.apiUrl + '/categories/',
                    {},
                    {
                        'get'   : { method: 'GET'},
                        'save'  : { method: 'POST' },
                        'query' : { method: 'GET', isArray: false },
                        'remove': { method: 'DELETE' },
                        'delete': { method: 'DELETE' }
                    });

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
            function Cart() {
//                return $resource(vnDataEndpoint.apiUrl + '/carts').get().$promise;
                return $resource(vnDataEndpoint.apiUrl + '/carts');
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
            function Configuration() {
//                return $resource(vnDataEndpoint.apiUrl + '/config').get().$promise;
                return $resource(vnDataEndpoint.apiUrl + '/config');
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
            function Country() {

                return $resource(vnDataEndpoint.apiUrl + '/countries');
//                if (!params) {
//                    return $resource(vnDataEndpoint.apiUrl + '/countries');
//                } else {
//                    // Handle configuring the $resource appropriately for the country endpoint.
//                    // Dev IDEA is to use a private function to handle this business logic
////                console.log('vnApi - no params for Country Call. That\'s ok for dev though.');
//                    return $resource(vnDataEndpoint.apiUrl + '/countries');
//                }

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
             * Given an object (or nothing for full list) the Nav function returns a promise
             * that resolves to the Volusion API nav items
             */
            function Nav() {

//                if (!params) {
//                    throw new Error('The Nav $resource needs a navId');
//                }
//                return $resource(vnDataEndpoint.apiUrl + '/navs/:navId')
//                    .get({navId: params.navId}).$promise;
                return $resource(vnDataEndpoint.apiUrl + '/navs/:navId');
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

            function Product() { // jshint ignore:line
                /**
                 * Since the params is referenced in a string later, we tell jshint to ignore the fact that it's not 'used'
                 * in the code.
                 */

                  // These are the api possible query params.
//                var params = {
//                    categoryIds  : [],
//                    search       : '',
//                    facets       : '',
//                    minPrice     : '',
//                    maxPrice     : '',
//                    accessoriesOf: '',
//                    sort         : '',
//                    pageNumber   : '',
//                    pageSize     : ''
//                };

//                http://www.samplestore.io/api/v1/products/?categoryIds=&search=&facets=&minPrice=&maxPrice=&accessoriesOf=&sort=&pageNumber=&pageSize=

                return $resource(vnDataEndpoint.apiUrl + '/products',
                    {},
                    {
                        'get'   : { method: 'GET'},
                        'save'  : { method: 'POST' },
                        'query' : { method: 'GET', isArray: false },
                        'remove': { method: 'DELETE' },
                        'delete': { method: 'DELETE' }
                    });
            }

            return {
                Article      : Article,
                Category     : Category,
                Cart         : Cart,
                Configuration: Configuration,
                Country      : Country,
                Nav          : Nav,
                Product      : Product
            };
        }])
;
