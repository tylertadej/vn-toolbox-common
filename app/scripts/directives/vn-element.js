'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnElement
 * @restrict A
 * @requires bem, vnBlock
 * @scope
 *
 * @description
 *
 *
 * @usage
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnElement', ['vnBem', function (vnBem) {
		return {
			require: '^vnBlock',
			restrict: 'A',
			compile: function() {
				return function(scope, iElement, iAttrs, blockCtrl) {
					vnBem.addClasses(iElement, {
						block: blockCtrl.getBlock(),
						blockModifiers: blockCtrl.getModifiers(),
						element: iAttrs.vnElement,
						elementModifiers: iAttrs.vnModifiers
					});
				};
			}
		};
	}]);
