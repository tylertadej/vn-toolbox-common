/**
 * @ngdoc directive
 * @name vnToolboxCommonApp.directive:vnSortSearch
 * @description
 * # vnSortSearch
 */

/**
 * @ngdoc directive
 * @name methodApp.directive:vnSortSearch
 * @restrict EA
 * @requires vnProductParams
 * @scope
 * @description
 * Used on pages that have a list of products and need to filter or narrow
 * the list by sort.
 * - Theme controller where this is used is responsible for setting the defualt
 * search strategy.
 *
 * @usage
 * TODO: Add html and javascript here to demo it in docs.
 */
angular.module('Volusion.toolboxCommon')
	.directive('vnSortSearch', ['vnProductParams', function (vnProductParams) {

		'use strict';

		return {
			templateUrl: 'vn-faceted-search/vn-sort-search.html',
			restrict   : 'AE',
			scope: {
				queryProducts: '&'
			},
			link       : function postLink(scope) {
				vnProductParams.setSort('relevance'); // Default to this

//				scope.$watch(
//					function() {
//						return vnProductParams.getSort();
//					},
//					function(strategy) {
//						scope.activeSort = strategy;
//					}
//				);

				scope.sortBy = function (strategy) {
					vnProductParams.setSort(strategy);
					scope.queryProducts();
				};
			}
		};
	}]);
