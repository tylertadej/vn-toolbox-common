/**
 * @ngdoc directive
 * @name methodApp.directive:facetedSearch
 * @restrict EA
 * @requires vnProductParams
 * @scope
 * @description
 * - Used on pages that have a list of products and need to filter or narrow the list by:
 *     - category
 *     - facet
 *     - price
 *     - sort?
 *
 * ## Notes:
 * - The parent controller for the directive muxt implement a queryProducts() function
 * - The Function must implement its get products routine with the vnParamsObject
 *
 * @usage
 * TODO: Add html and javascript here to demo it in docs.
 */
angular.module('Volusion.toolboxCommon')
	.directive('vnFacetedSearch', function () {

		'use strict';

		return {
			templateUrl: 'vn-faceted-search/vn-faceted-search.html',
			restrict   : 'EA',
			link       : function postLink(scope) {

				scope.showCategorySearch = false;
				scope.showFacetSearch = true;
				scope.showApplyButton = false;

				scope.$watch('categoryList', function (categoryList) {

					if(categoryList) {
						scope.showCategorySearch = true;
					}

				});

				scope.$watch('facets', function (facets) {

					if (facets) {
						scope.showFacetSearch = true;
					}

				});

				enquire.register('screen and (max-width:767px)', {

					setup: function() {
						scope.showApplyButton = false;
					},
					unmatch: function () {
						scope.showApplyButton = false;
					},
					// transitioning to mobile mode
					match  : function () {
						scope.showApplyButton = true;
					}
				});
			}
		};
	});

