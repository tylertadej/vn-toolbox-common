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
 *         - And, the url is updated to /search?q=chair&facets=123,321
 *     - If the user selects the home-decor or furniture categories in Narrow by
 *         - Then, they are taken to /c/home-decor?q=chair&facets=123,321
 *         - Then, they are taken to /c/furniture?q=chair&facets=123,321
 * - Detect search when the $route has q parameter with a search term value.
 * - New search restarts the process and clears the url (and product params)
 *
 */

angular.module('Volusion.toolboxCommon')
	.factory('vnAppRoute', ['$rootScope', '$route', '$location', '$routeParams', 'vnProductParams',
		function ($rootScope, $route, $location, $routeParams, vnProductParams) {


			var RouteStrategies = {
					search  : 'search',
					category: 'category'
				},
				activeStrategy = '';

			/**
			 * Detect changes in the route params and apply logic.
			 * The logic here that is used in vnAppRoute must remain idempotent with regards to the vnProductParams.
			 * The $watch callback function registered to listen to the get vnParamsObject will likely be called more than
			 * once in the $digest cycle.
			 */

			$rootScope.$watch(
				function () {
					return vnProductParams.getParamsObject();
				}, function watchForParamChange() {
					updateUrl();
				}, true  // Deep watch the params object.
			);

			$rootScope.$watch(
				function () {
					return vnProductParams.getActiveCategory();
				}, function watchForCategoryChange() {
					updateUrl();
				}, true  // Deep watch the params object.
			);

			function setActiveStrategy(strategy) {
				activeStrategy = strategy;
			}

			function getActiveStrategy() {
				return activeStrategy;
			}

			function updateUrlForCategory() {
				if ('' !== vnProductParams.getCategoryString()) {
					if (vnProductParams.getActiveCategory()) {
						$location.path('/c/' + vnProductParams.getActiveCategory());
					}
					$location.search('categoryIds', vnProductParams.getCategoryString());
				} else {
					$location.search('categoryIds', null);
				}

				if ('' !== vnProductParams.getFacetString()) {
					$location.search('facetIds', vnProductParams.getFacetString());
				} else {
					$location.search('facetIds', null);
				}

				//handle min price
				if ('' !== vnProductParams.getMinPrice()) {
					$location.search('minPrice', vnProductParams.getMinPrice());
				} else {
					$location.search('minPrice', null);
				}

				//handle max price
				if ('' !== vnProductParams.getMaxPrice()) {
					$location.search('maxPrice', vnProductParams.getMaxPrice());
				} else {
					$location.search('maxPrice', null);
				}
			}

			function updateUrlForSearch() {
				console.log('search is not implemented yet.');
			}

			function updateUrl() {
				//Are we in a category or search session? Decide which strategy to apply
				if ('' === activeStrategy) {
					return;
				}

				switch (activeStrategy) {
					case RouteStrategies.category:
						updateUrlForCategory();
						break;
					case RouteStrategies.search:
						updateUrlForSearch();
						break;
					default:
						break;
				}
			}

			return {
				setActiveStrategy: setActiveStrategy,
				getActiveStrategy: getActiveStrategy,
				updateUrl        : updateUrl
			};
		}]);
