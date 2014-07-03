/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnLabeledRadio
 * @restrict A
 * @requires vnBem
 * @scope
 *
 * @description
 *
 *
 * @usage
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnLabeledRadio',
		function () {

			'use strict';

			return {
				require    : 'ngModel',
				restrict   : 'A',
				replace    : true,
				transclude : true,
				templateUrl: 'template/labeled-radio.html',
				scope      : {
					ngModel   : '=',
					name      : '@',
					value     : '@',
					ngValue   : '=',
					ngChecked : '=',
					ngDisabled: '@',
					change    : '&ngChange'
				},
				compile    : function (tElement, tAttrs) {
					var $radio = tElement.find('input'),
						value = tAttrs.value,
						ngValue = tAttrs.ngValue;

					if (typeof value !== 'undefined' && typeof ngValue === 'undefined') {
						$radio.removeAttr('data-ng-value');
					}
				}
			};
		})
	.run(['$templateCache', function ($templateCache) {

		'use strict';

		$templateCache.put(
			'template/labeled-radio.html',
			'<label data-vn-block="vn-labeled-radio">' +
				'<input data-vn-element="input" type="radio" ' +
						'name="{{name}}" ' +
						'value="{{value}}" ' +
						'data-ng-model="ngModel" ' +
						'data-ng-value="ngValue" ' +
						'data-ng-checked="ngChecked" ' +
						'data-ng-change="change()" ' +
						'data-ng-disabled="{{ngDisabled}}">' +
				'<span data-vn-element="content" data-ng-transclude></span>' +
			'</label>'
		);
	}]);
