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
    .factory('vnApi', ['$resource', 'vnDataEndpoint', 'vnResourceTypes',
        function ($resource, vnDataEndpoint, vnResourceTypes) {
            'use strict';

            var headers = {'resource': ''};

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
                headers.resource = vnResourceTypes.article;

                return $resource(vnDataEndpoint.getApiUrl() + '/articles/:id',
                    { id : '@id' },
                    {
                        'get'   : { method: 'GET', headers: headers },
                        'save'  : { method: 'POST', headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
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
             * - vnApi.Category().get( {id: id} ); -> Returns the category for id
             * - vnApi.Category().get( {slug: slug} ); -> Returns the category for slug
             *
             */
            function Category() {
                headers.resource = vnResourceTypes.category;

                return $resource(vnDataEndpoint.getApiUrl() + '/categories/:id',
                    { id: '@id' },
                    {
                        'get'   : { method: 'GET', headers: headers},
                        'save'  : { method: 'POST', headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
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
             * - vnApi.Cart().post(???? FIX THIS ?????); -> Returns ???
             */
            function Cart() {
                headers.resource = vnResourceTypes.cart;

                return $resource(vnDataEndpoint.getApiUrl() + '/carts',
                    {},
                    {
                        'get'   : { method: 'GET', withCredentials: true, headers: headers },
                        'save'  : { method: 'POST', withCredentials: true, headers: headers },
                        'update': { method: 'PUT', withCredentials: true, headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
                    });
            }

            /**
             * @ngdoc method
             * @name Configuration
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource has a promise that resolves the results of
             * the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Configuration().query() -> returns a the site configuration data.
             */
            function Configuration() {
                headers.resource = vnResourceTypes.config;
                return $resource(vnDataEndpoint.getApiUrl() + '/config', {}, { headers: headers });
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
                headers.resource = 'countries';
                return $resource(vnDataEndpoint.getApiUrl() + '/countries', {}, { headers: headers });
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
                headers.resource = vnResourceTypes.nav;
                return $resource(vnDataEndpoint.getApiUrl() + '/navs/:navId',
                    {navId: '@navId'},
                    {
                        'get'   : { method: 'GET', headers: headers },
                        'save'  : { method: 'POST', headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
                    });
            }

            /**
             * @ngdoc method
             * @name Product
             * @methodOf Volusion.toolboxCommon.vnApi
             * @params {Object} object should be any valid objectified key value pairs
             * @returns {$resource} $resource A $resource that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Product().query() -> returns a list of all products
             * - vnApi.Product().get( {slug: theSlug} ); -> Returns the product for slug, /api/v1/products?slug=theSlug
             * - vnApi.Product().get( {any possible query params} ); -> Returns a collection of products, /api/v1/products?{any valid params}
             *
             * ## Valid key value pairs for the endpoint
             * - key: value description follows here
             * - categoryIds: Numeric categoryIds of products to be retrieved. Example: 10
             * - slug: String slug of the product, which is the search engine optimized url keywords. Example: nike-air-jordan-2015-shoe
             * - search: Search string. Only the first 4 words seperated by spaces will be used in the search. Example: nike air jordan
             * - facets: String 1822,1818,1829 to filter products that are for example (Orange[1822] OR Red[1818]) AND Wood[1829]. Example: 1822,1818,1829
             * - minPrice: Numeric minPrice of products to be retrieved. Example: 25
             * - maxPrice: Numeric maxPrice of products to be retrieved. Example: 100
             * - accessoriesOf: Used to retrieve accessory products of specified product code(s). Example: ah-lchair
             * - sort: Sort order keyword of either relevance, lowest price, highest price, newest, oldest, or popularity. Example: relevance
             * - pageNumber: Numeric pageNumber of products to be retrieved. Example: 1
             * - pageSize: Numeric pageSize of products to be retrieved. Example: 10
             *
             */
            function Product() {
                headers.resource = vnResourceTypes.product;
                //Todo: put the possilbe query params into the description for documentation
                return $resource(vnDataEndpoint.getApiUrl() + '/products/:code',
                    {
                        code: '@code'
                    },
                    {
                        'get'   : { method: 'GET', headers: headers},
                        'save'  : { method: 'POST', headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
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
             * - vnApi.Review().query() -> returns a list of all products
             * - vnApi.Review().get( {productCode: productCode} ); -> Returns the reviews for a product
             */

            function Review() {
                headers.resource = vnResourceTypes.reviews;
                return $resource(vnDataEndpoint.getApiUrl() + '/products/:code/reviews',
                    {
                        code: '@code'
                    },
                    {
                        'get'   : { method: 'GET', headers: headers },
                        'save'  : { method: 'POST', headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
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
                headers.resource = vnResourceTypes.themesettings;
                return $resource('/settings/themeSettings.json', {}, { headers: headers });
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
