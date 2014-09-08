/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnSortSearch
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
	.directive('vnSortSearch', ['vnProductParams', 'vnSortDefault', function (vnProductParams, vnSortDefault) {

		'use strict';

		return {
			templateUrl: 'vn-faceted-search/vn-sort-search.html',
			restrict   : 'AE',
			scope: {
				queryProducts: '&'
			},
			link       : function postLink(scope) {
				// THe implication here is that nothing was parsed from the url so lets use this as default
				if ('' === vnProductParams.getSort()) {
					vnProductParams.setSort(vnSortDefault);
				}

				scope.sortBy = function (strategy) {
					vnProductParams.setSort(strategy);
					scope.queryProducts();
				};
			}
		};
	}]);
