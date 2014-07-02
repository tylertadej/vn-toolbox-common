'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnProductOption
 * @description
 * # vnProductOption
 */
angular.module('Volusion.toolboxCommon')
	.directive('vnProductOption', function() {
		return {
			restrict: 'A',
			replace: true,
			controller: 'VnProductOptionCtrl',
			templateUrl: 'vn-product-option/index.html',
			scope: {
				option: '=',
				product: '=',
				saveTo: '='
			}
		};
	});
