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
	.directive('vnCategorySearch', ['$rootScope', '$routeParams', 'vnProductParams',
		function ($rootScope, $routeParams, vnProductParams) {
			'use strict';
			return {
				templateUrl: 'vn-faceted-search/vn-category-search.html',
				restrict   : 'AE',
				scope      : {
					categories: '='
				},
				link       : function postLink(scope) {

					function processCategoryList(cList) {
						console.log('the route params: ', $routeParams);
						console.log('only have one top level category', cList);
					}

					// Categories use this to update the search params.
					enquire.register('screen and (max-width:767px)', {

						setup  : function () {
							scope.isDesktopCategory = true;
							scope.isCategoryVisible = true;
						},
						unmatch: function () {
							scope.isDesktopCategory = true;
							scope.isCategoryVisible = true;
						},
						// transitioning to mobile mode
						match  : function () {
							scope.isDesktopCategory = false;
							scope.isCategoryVisible = false;
						}
					});

					scope.toggleCategory = function () {
						console.log('toggle category');
						if (scope.isCategoryVisible) {
							scope.isCategoryVisible = false;
							return;
						}
						scope.isCategoryVisible = true;
					};

					scope.updateCategory = function (category) {
						vnProductParams.addCategory(category.id);
						$rootScope.$broadcast('ProductSearch.categoriesUpdated', { category: category });
					};

					console.log('currentSlug: ', currentSlug);
					scope.$watch('categories', function (categories) {
						// Gaurd against the error message for while categories is not defined.
						if (!categories || !categories[0]) {
							return;
						}
						/**
						 * First Display Strategy: 1 top level category && on that route
						 * - for example: current route is /c/home-decor
						 * - slug is home-decor and it matches category.slug
						 */
						else if (1 === categories.length && $routeParams.slug === categories.slug) {
							processCategoryList(categories);
						} else {
							console.log('and of logic in category-search directive watch.');
						}
					});
				}
			};
		}]);
