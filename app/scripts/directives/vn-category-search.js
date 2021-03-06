/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnCategorySearch
 * @restrict EA
 * @requires $rootScope
 * @requires vnProductParams
 * @scope
 * @description
 *
 *
 * @usage
 * TODO: Add html and javascript here to demo it in docs.
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnCategorySearch', ['$rootScope', '$routeParams', '$location', 'vnProductParams', 'vnAppRoute',
		function ($rootScope, $routeParams, $location, vnProductParams, vnAppRoute) {

			'use strict';

			return {
				templateUrl: 'vn-faceted-search/vn-category-search.html',
				restrict   : 'AE',
				scope      : {
					categories   : '=',
					queryProducts: '&'
				},
				link       : function postLink(scope) {

					/**
					 * First Display Strategy: 1 top level category && on that route
					 * - for example: current route is /c/home-decor
					 * - slug is home-decor and it matches category.slug
					 */
					function processFirstCategoryStrategy(cList) {
						angular.extend(cList, {displayStrategy: 'categoryDisplayOne'});
					}

					/**
					 * Second Display Strategy: 1 top level category &&
					 * also on one of the sub category route slugs
					 * - for example: current route is /c/furniture
					 * - routeParams.slug is furniture and it matches one of the
					 * - category.subCategories[i].slug values
					 */
					function processSecondCategoryStrategy(cList) {
						angular.extend(cList, {displayStrategy: 'categoryDisplayTwo'});
					}

					/**
					 * Third Display Strategy: on the search route
					 * - everything is clickable
					 */
					function processThirdCategoryStrategy(cList) {

						angular.forEach(cList, function (category) {
							angular.extend(category, {displayStrategy: 'categoryDisplayThree'});
							// Make sure that the sub cats will be links as well
							angular.forEach(category.subCategories, function (subCat) {
								angular.extend(subCat, { hideSubCatLink: true });
							});
						});

					}

					/**
					 * Utility function used in determining which strategy to apply to this set of category response data
					 */
					function checkSubCategoriesForSlugMatch(slug, categoryObject) {

						var catMatchTest = false;
						for (var i = categoryObject.subCategories.length - 1; i >= 0; i--) {
							if (slug === categoryObject.subCategories[i].slug) {
								angular.extend(categoryObject.subCategories[i], { hideSubCatLink: true });
								catMatchTest = true;
							} else {
								angular.extend(categoryObject.subCategories[i], { hideSubCatLink: false });
							}
						}
						return catMatchTest;

					}


					/**
					 * @ngdoc function
					 * @name updateRoute
					 * @return {String} newRoute reprensets the current parameters used to get products from the api.
					 * This function builds a string that can be used to update category links so that when navigating
					 * betweeen categories the current facets, categoryIds and min/max prices are reflected.
					 *
					 * @description
					 *
					 */
					function updateRoute() {
						var newRoute = '',
							facetString,
							minString,
							maxString,
							categoryString;

						function cleanUpRoute(dirtyRoute) {
							return dirtyRoute.replace(/&$/, '');
						}


						// has facets
						facetString = vnProductParams.getFacetString();
						// has minPrice
						minString = vnProductParams.getMinPrice();
						// has maxPrice
						maxString = vnProductParams.getMaxPrice();
						//has categories
						categoryString = vnProductParams.getCategoryString();

						// Do we even have a string right now?
						if ('' !== categoryString || '' !== facetString || '' !== minString || '' !== maxString) {
							newRoute += '?';
						} else {
							return '';
						}

						if ('search' === vnAppRoute.getRouteStrategy() && '' !== categoryString) {
							var categoryParams = 'categoryId=' + categoryString + '&';
							newRoute += categoryParams;
						}

						if ('' !== facetString) {
							var facetParams = 'facetIds=' + facetString + '&';
							newRoute += facetParams;
						}

						if ('' !== minString) {
							var minParam = 'minPrice=' + minString + '&';
							newRoute += minParam;
						}

						if ('' !== maxString) {
							var maxParam = 'maxPrice=' + maxString + '&';
							newRoute += maxParam;
						}

						// Check string for ending & and clean it up.
						newRoute = cleanUpRoute(newRoute);

						return newRoute;
					}

					scope.updateCategory = function (category) {
						vnProductParams.addCategory(category.id);
						scope.queryProducts();
					};

					scope.buildAppUrl = function (category) {
						// Which Strategy are we building for?
						if ('search' === vnAppRoute.getRouteStrategy()) {
							vnProductParams.addCategory(category.id);
							scope.queryProducts();
						} else if ('category' === vnAppRoute.getRouteStrategy()) {
							var categoryPath = category.url; // + scope.currentRoute;
							$location.path(categoryPath);
						}
					};

					scope.$watch($routeParams,
						function watchForParamChange() {
							scope.currentRoute = updateRoute();
						}, true);

					scope.$watch('categories', function (categories) {

						// Gaurd against the error message for while categories is not defined.
						if (!categories || !categories[0]) {
							return;
						} else if ('/search' === $location.path()) {
							processThirdCategoryStrategy(categories);
						} else if (1 === categories.length && $routeParams.slug === categories[0].slug) {
							processFirstCategoryStrategy(categories[0]);
						} else if (1 === categories.length && checkSubCategoriesForSlugMatch($routeParams.slug, categories[0])) {
							processSecondCategoryStrategy(categories[0]);
						} else {
							throw new Error('Is there a new display strategy for the category-search directive in toolbox?');
						}
					});
				}
			};
		}]);
