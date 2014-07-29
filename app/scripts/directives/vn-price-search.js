'use strict';

/**
 * @ngdoc directive
 * @name vnToolboxCommonApp.directive:vnPriceSearch
 * @description
 * # vnPriceSearch
 */
angular.module('Volusion.toolboxCommon')
	.directive('vnPriceSearch', ['vnProductParams', function (vnProductParams) {
		return {
			templateUrl: 'vn-faceted-search/vn-price-search.html',
			restrict   : 'AE',
			scope      : {
				queryProducts: '&'
			},
			link       : function postLink(scope) {

				scope.searchByPrice = function (event) {


					vnProductParams.setMinPrice(scope.minPrice);
					vnProductParams.setMaxPrice(scope.maxPrice);

					scope.$watch(
						function() {
							return vnProductParams.getMinPrice();
						},
						function(min) {
							scope.minPrice = min;
						}
					);

					scope.$watch(
						function() {
							return vnProductParams.getMaxPrice();
						},
						function(min) {
							scope.maxPrice = min;
						}
					);

					vnProductParams.setMinPrice(scope.minPrice);
					vnProductParams.setMaxPrice(scope.maxPrice);

					if (event.which === 13) {
						scope.queryProducts();
					}

				};
			}
		};
	}]);
