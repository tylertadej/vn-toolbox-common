/**
 * @ngdoc directive
 * @name vnToolboxCommonApp.directive:vnSortSearch
 * @description
 * # vnSortSearch
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

				scope.$watch(
					function() {
						return vnProductParams.getSort();
					},
					function(strategy) {
						scope.activeSort = strategy;
					}
				);

				scope.sortBy = function (strategy) {
					vnProductParams.setSort(strategy);
					scope.queryProducts();
				};
			}
		};
	}]);
