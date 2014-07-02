'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnBlock
 * @restrict A
 * @requires bem
 * @scope
 *
 * @description
 *
 *
 * @usage
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnBlock', ['bem', function (bem) {
		return {
			restrict: 'A',
			controller: function() {
				this.getBlock = function() {
					return this.block;
				};

				this.getModifiers = function() {
					return this.modifiers;
				};
			},
			compile: function() {
				return {
					pre: function(scope, iElement, iAttrs, controller) {
						var block = iAttrs.vnBlock;
						var modifiers = iAttrs.vnModifiers;
						bem.addClasses(iElement, {
							block: block,
							blockModifiers: modifiers
						});
						controller.block = block;
						controller.modifiers = modifiers;
					}
				};
			}
		};
	}]);
