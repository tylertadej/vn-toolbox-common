/*global angular */

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

// Todo: figure out which $resources need all the access types. Remove the unused queries: put, remove delete etc ...
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
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Article().query() -> returns a list of all articles
             * - vnApi.Artiucl().get( {slug: about-us} ); -> Returns the article for About Us
             */
            function Article() {

                return $resource(vnDataEndpoint.apiUrl + '/articles/',
                    { },
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
             * @name Category
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource an angular $resource
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Category().query() -> returns a list of all articles
             * - vnApi.Category().get( {slug: slug} ); -> Returns the category for slug
             *
             */
            function Category() {
//                http://www.samplestore.io/api/v1/categories?slug=men
//                console.log('api category slug: ', slug);
//                var test = vnDataEndpoint.apiUrl + '/categories/';
//                catSlug = catSlug || '';

                return $resource(vnDataEndpoint.apiUrl + '/categories',
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
             * @returns {$resource} $resource A $resource promise that resolves the the results of
             * the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Cart().query() -> returns the Cart data
             * - vnApi.Cart().post(???? fix this ?????); -> Returns ???
             */
            function Cart() {
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
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Configuration().query() -> returns a the site configuration data.
             */
            function Configuration() {
                return $resource(vnDataEndpoint.apiUrl + '/config');
            }

            /**
             * @ngdoc method
             * @name Country
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Country().query() -> returns a list of all countries
             */
            function Country() {

                return $resource(vnDataEndpoint.apiUrl + '/countries');
            }

            /**
             * @ngdoc method
             * @name Nav
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource promise that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Nav().query() -> returns all the navigations
             * - vnApi.Nav().get( {navId: 1} ); -> Returns the navigation for id = 1
             */
            function Nav() {
                return $resource(vnDataEndpoint.apiUrl + '/navs/:navId',
                    {navId: '@navId'},
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
             * @name Product
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Product().query() -> returns a list of all products
             * - vnApi.Product().get( {slug: slug} ); -> Returns the product for slug, /api/v1/products/:slug
             * - vnApi.Product().get( {any possible query params} ); -> Returns a collection of products, /api/v1/products?{any valid params}
             */

            function Product() {
                //Todo: put the possilbe query params into the description for documentation
                return $resource(vnDataEndpoint.apiUrl + '/products',
                    { },
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
             * @name Product
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Product().query() -> returns a list of all products
             * - vnApi.Product().get( {slug: slug} ); -> Returns the product for slug
             */

            function Review() {
                return $resource(vnDataEndpoint.apiUrl + '/products/:code/reviews',
                    {
                        code: '@code'
                    },
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
             * @name ThemeSettings
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.ThemeSettings() -> returns a JSON with theme settings
             */

            function ThemeSettings() {
                return $resource('/settings/themeSettings.json');
            }

            return {
                Article      : Article,
                Category     : Category,
                Cart         : Cart,
                Configuration: Configuration,
                Country      : Country,
                Nav          : Nav,
                Product      : Product,
                Review       : Review,
                ThemeSettings: ThemeSettings
            };
        }]);
