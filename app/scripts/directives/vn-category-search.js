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
	.directive('vnCategorySearch', ['$rootScope', 'vnProductParams', function ($rootScope, vnProductParams) {
		'use strict';
		return {
			templateUrl: 'vn-faceted-search/vn-category-search.html',
			restrict   : 'AE',
			scope      : {
				categories: '='
			},
			link       : function postLink(scope) {
				// Categories use this to update the search params.

				console.log('category-search: ', scope.categories);

				enquire.register('screen and (max-width:767px)', {

					setup: function() {
						scope.isCategoryVisible = true;
					},
					unmatch: function () {
						scope.isCategoryVisible = true;
					},
					// transitioning to mobile mode
					match  : function () {
						scope.isCategoryVisible = false;
					}
				});

				scope.toggleCategory = function() {
					console.log('toggle category');
					if(scope.isCategoryVisible) {
						scope.isCategoryVisible = false;
						return;
					}
					scope.isCategoryVisible = true;
				};

				scope.updateCategory = function (category) {
					vnProductParams.addCategory(category.id);
					$rootScope.$broadcast('ProductSearch.categoriesUpdated', { category: category });
				};

				// Have to do this to listen for the data returned async and passed into the directive
				scope.$watch('categories', function (categories) {
					// Gaurd against the error message for while categories is not defined.
					if (!categories || !categories[0]) {
						return;
					} else {
						scope.subCategories = categories[0].subCategories;
					}
				});
			}
		};
	}]);
