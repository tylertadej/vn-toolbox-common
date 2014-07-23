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
	.directive('vnCategorySearch', ['$rootScope', '$routeParams', '$location', 'vnProductParams',
		function ($rootScope, $routeParams, $location, vnProductParams) {

			'use strict';

			return {
				templateUrl: 'vn-faceted-search/vn-category-search.html',
				restrict   : 'AE',
				scope      : {
					categories: '='
				},
				link       : function postLink(scope) {

					/**
					 * First Display Strategy: 1 top level category && on that route
					 * - for example: current route is /c/home-decor
					 * - slug is home-decor and it matches category.slug
					 */
					function processFirstCategoryStrategy(cList) {
						angular.extend(cList, {displayStrategy: 'categoryDisplayOne'});
						console.log('First category display strategy', cList);
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
						console.log('second display strategy for categories: ', cList);
					}

					/**
					 * Third Display Strategy: on the search route
					 * - everything is clickable
					 */
					function processThirdCategoryStrategy(cList) {

						angular.forEach(cList, function(category) {
							angular.extend(category, {displayStrategy: 'categoryDisplayThree'});
							// Make sure that the sub cats will be links as well
							angular.forEach(category.subCategories, function(subCat) {
								angular.extend(subCat, { hideSubCatLink: true });
							});
						});
						console.log('third display strategy for categories: ', cList);
						
					}

					/**
					 * Utility function used in depermining which strategy to apply to this set of category response data
					 */
					function checkSubCategoriesForSlugMatch(slug, categoryObject) {

						var catMatchTest = false;
						for (var i = categoryObject.subCategories.length - 1; i >= 0; i--) {
							if (slug === categoryObject.subCategories[i].slug) {
								console.log('matched, this slug should be txt: ', categoryObject.subCategories[i].slug);
								angular.extend(categoryObject.subCategories[i], { hideSubCatLink: true });
								catMatchTest = true;
							} else {
								console.log('not matched, this slug should be link: ', categoryObject.subCategories[i].slug);
								angular.extend(categoryObject.subCategories[i], { hideSubCatLink: false });
							}
						}
						return catMatchTest;

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
