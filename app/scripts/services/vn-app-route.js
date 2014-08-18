'use strict';

/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnAppRoute
 * @requires vnProductParams
 * @requires $location
 *
 * @description
 * # vnAppRoute
 * Factory in the Volusion.toolboxCommon module to implement the following business rules outlined below.
 *
 * # Category Navigation Rules - starts when customer lands on a category page via top level navigation.
 * Update the url to reflect categories and facets added (or removed in the case of facets) so that hte link can be
 * copied, pasted and shared. Intelligently figure out how to let customer click one of the categories and navigate to
 * that category page while keeping the rest of the categories already clicked or added to product params.
 *
 * - Top level (traditial website) navigation elements in header always go to /c/slug and reset the url (and product params)
 * - Detect navigation to here when $route params exist and there is a slug (slug not present when starting a search)
 * - Given a user navigates with the top level application nav menus, they:
 *     - Get a new category controller
 *     - All Product Params are cleared
 * - Given that a user is on a top level category page /c/:slug
 *     - When they click 'Narrow by' categories
 *     - Then, They are taken to that category page /c/:slug
 *     - And, any selected facets are preserved
 * - Category URLS should look like this:
 *     - /c/apparel?facets=123,456&sort=relevance&page=2&pageSize=32
 *     - /c/womens-apparel?facets=123,456&sort=relevance&page=2&pageSize=32
 *     - /c/mens-apparel?facets=123,456&sort=relevance&page=2&pageSize=32/c/womens-activewear?facets=123,456&sort=relevance&page=2&pageSize=32
 *
 * # Search Navigation Rules - starts when a customer searches with the site provided search box.
 * Intelligently decide when to take the customer to a category page while preserving hte search information. Update the
 * url with consumable information so that the link can be copied, pasted and the same app state passed to a different customer.
 *
 * - Given a user searches for chair, then:
 *     - The url will change to /search?q=chair
 *     - If the user selects one or more facets
 *         - Then they stay on the /search?q=chair
 *         - And, the url is updated to /search?q=chair&facets=123,321&categoryIds=123
 *     - If the user selects the home-decor or furniture categories in Narrow by
 *         - Then, they are taken to /c/home-decor?q=chair&facets=123,321&categoryIds=123
 *         - Then, they are taken to /c/furniture?q=chair&facets=123,321&categoryIds=123
 * - Detect search when the $route has q parameter with a search term value.
 * - New search restarts the process and clears the url (and product params)
 *
 */

angular.module('Volusion.toolboxCommon')
	.factory('vnAppRoute', ['$q', '$rootScope', '$route', '$location', '$routeParams', 'vnProductParams',
		function ($q, $rootScope, $route, $location, $routeParams, vnProductParams) {

			var currentStrategy = '';


			/**
			 * @ngdoc function
			 * @name watchParams
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * NOTE: In code this is unnamed but it uses the $rootScope.$watch(fn1, fn2) form.
			 * Sets up a deep watch on the vnProductParams object. When changes are detected it updates the app route.
			 */
			$rootScope.$watch(
				function () {
					return vnProductParams.getParamsObject();
				}, function () {
					updateActiveRoute(vnProductParams.getParamsObject());
				}, true  // Deep watch the params object.
			);


			/**
			 * @ngdoc function
			 * @name updateActiveRoute
			 * @param {Object} paramsObject should be returned from the vnProductParams.getParamsObject() and passed in
			 * here.
			 *
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Runs the functions needed to update an apps url with consumable info. This is called from the theme:
			 * - when category or search routes are resolved (shared link / direct navigation
			 * - when intra category navigation is detected as customer changes the category used to narrow products.
			 *
			 * We currently update routes for the following:
			 * - categoryId
			 * - facetIds
			 * - minPrice
			 * - maxPrice
			 * - page (as in the current page retrieved from api)
			 * - sort (strategy for sorting)
			 */
			function updateActiveRoute(paramsObject) {
				if(!paramsObject) {
					return;
				}

				updateCategory();
				updateFacets();
				updateMinPrice();
				updateMaxPrice();
				updatePage();
				updateSort();
			}

			/**
			 * @ngdoc function
			 * @name updateCategory
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for a category and update the route is there is one. If there is not one,
			 * remove the **categoryId** query string from the route.
			 */
			function updateCategory() {
				if ('search' === getRouteStrategy() && '' !== vnProductParams.getCategoryString()) {
					$location.search('categoryId', vnProductParams.getCategoryString());
				} else {
					$location.search('categoryId', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name updateFacets
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for facets and update the route is there is one. If there is not one,
			 * remove the **facetIds** query string from the route.
			 */
			function updateFacets() {
				if ('' !== vnProductParams.getFacetString()) {
					$location.search('facetIds', vnProductParams.getFacetString());
				} else {
					$location.search('facetIds', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name updateMaxPrice
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for maxPrice and update the route is there is one. If there is not one,
			 * remove the **maxPrice** query string from the route.
			 */
			function updateMaxPrice() {
				if ('' !== vnProductParams.getMaxPrice()) {
					$location.search('maxPrice', vnProductParams.getMaxPrice());
				} else {
					$location.search('maxPrice', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name updateMinPrice
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for minPrice and update the route is there is one. If there is not one,
			 * remove the **minPrice** query string from the route.
			 */
			function updateMinPrice() {
				if ('' !== vnProductParams.getMinPrice()) {
					$location.search('minPrice', vnProductParams.getMinPrice());
				} else {
					$location.search('minPrice', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name updatePage
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for facets and update the route is there is one. If there is not one,
			 * remove the **page** query string from the route.
			 */
			function updatePage() {
				if('' !== vnProductParams.getPage()) {
					$location.search('page', vnProductParams.getPage());
				} else {
					$location.search('page', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name updateSort
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for sort strategy and update the route is there is one. If there is not one,
			 * remove the **sort** query string from the route.
			 */
			function updateSort() {
				if('' !== vnProductParams.getSort()) {
					$location.search('sort', vnProductParams.getSort());
				} else {
					$location.search('sort', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name setRouteStrategy
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Set the current routing strategy. It is the responsability of the calling theme controller to set this
			 * to either 'search' or 'category' to enable smarter management of the categoryId queryParam.
			 */
			function setRouteStrategy(strategy) {
				currentStrategy = strategy;
			}

			/**
			 * @ngdoc function
			 * @name getRouteStrategy
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 * @return {String} currentStrategy
			 *
			 * @description
			 * Is the result of this if you need to know what routing strategy the service is currently useing.
			 */
			function getRouteStrategy() {
				return currentStrategy;
			}

			/**
			 * @ngdoc function
			 * @name resolveParams
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 * @return {Object} deferred.promise is a $q.promise object that can and should be resolved immediately with
			 * boolean true.
			 *
			 * @description
			 * Is the result of this if you need to know what routing strategy the service is currently using.
			 * This is used in Method in two places:
			 * 1. When the app is configured it is put into the resolve section for the /c/:slug & /search routes.
			 * 2. When the method theme category controller is used for app navigation between categories or sub-categories
			 * the query params are consumed in the $viewContentLoaded event.
			 */
			function resolveParams(locations) {
				/**
				 @function
				 @name resolveParameters
				 @description set the vnParmeterObject up with current URL information if its there.
				 @param {Object} location
				 @param {Object} params
				 @return promise
				 */
				var deferred = $q.defer();

				vnProductParams.preLoadData(locations);
				deferred.resolve(true);

				return deferred.promise;

			}

			return {
				getRouteStrategy: getRouteStrategy,
				setRouteStrategy: setRouteStrategy,
				resolveParams   : resolveParams
			};
		}]);
