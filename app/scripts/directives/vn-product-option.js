/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnProductOption
 * @description
 * # vnProductOption
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnProductOption', function() {

		'use strict';

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
	})
	.run(['$templateCache', function ($templateCache) {

		'use strict';

		$templateCache.put(
			'vn-product-option/index.html',
			'<div data-vn-block="vn-product-option">' +

				'<label data-vn-element="label" data-ng-if="option.label" data-ng-bind="option.label"></label>' +

				'<div data-ng-repeat="inputType in option.inputTypes">' +
					'<div data-vn-element="group"' +
					'data-vn-modifiers="{{inputType.type}} {{option.class}}"' +
					'data-ng-include=" \'vn-product-option/\' + inputType.type + \'.html\' ">' +
					'</div>' +
				'</div>' +

				'<div data-ng-if="option.selected">' +
					'<div data-ng-repeat="option in option.options"' +
					'data-ng-include=" \'vn-product-option/index.html\' ">' +
					'</div>' +
				'</div>' +

			'</div>'
		);

		$templateCache.put(
			'vn-product-option/checkboxes.html',
			'<label data-vn-block="vn-labeled-checkbox"' +
					'data-vn-modifiers="{{option.class}}"' +
					'data-ng-repeat="itemKey in option.items"' +
					'data-ng-init="item=product.optionItems[itemKey]">' +

				'<div data-vn-element="checkbox">' +
					'<input type="checkbox"' +
					'data-ng-click="onCheckboxClicked(option)">' +
				'</div>' +

				'<div data-vn-element="content" data-ng-include=" \'vn-product-option/content.html\' "></div>' +

			'</label>'
		);

		$templateCache.put(
			'vn-product-option/content.html',
			'<div data-vn-element="color-image">' +
				'<div data-vn-element="color" data-ng-show="item.color" style="background-color: {{item.color}}"></div>' +
				'<img data-vn-element="image" data-ng-show="item.image" data-ng-src="{{item.image}}" alt="{{item.text}}">' +
			'</div>' +
			'<div data-vn-element="text" data-ng-bind="item.text"></div>' +
			'<div data-vn-element="border" data-ng-class="{ checked: option.selected===itemKey }"></div>'
		);

		$templateCache.put(
			'vn-product-option/radios.html',
			'<label data-vn-block="vn-labeled-radio"' +
					'data-vn-modifiers="{{option.class}}"' +
					'data-ng-repeat="itemKey in option.items"' +
					'data-ng-init="item=product.optionItems[itemKey]">' +

				'<div data-vn-element="radio">' +
					'<input type="radio" name="{{option.id}}"' +
						'data-ng-value="itemKey"' +
						'data-ng-model="option.selected"' +
						'data-ng-click="onOptionChanged(option, item)">' +
				'</div>' +

				'<div data-vn-element="content" data-ng-include=" \'vn-product-option/content.html\' "></div>' +

			'</label>'
		);

		$templateCache.put(
			'vn-product-option/select.html',
			'<select data-vn-element="select"' +
					'data-vn-modifiers="{{option.class}}"' +
					'data-ng-attr-size="{{inputType.size}}"' +
					'data-ng-model="option.selected"' +
					'data-ng-change="onOptionChanged(option, product.optionItems[option.selected])"' +
					'data-ng-options="product.optionItems[itemKey].text for itemKey in option.items">' +
			'</select>'
		);

		$templateCache.put(
			'vn-product-option/text.html',
			'<div data-ng-if="inputType.rows > 1">' +
				'<textarea data-vn-element="text"' +
						'data-vn-modifiers="{{option.class}}"' +
						'data-ng-focus="saveTo=saveTo||{}"' +
						'data-ng-model="saveTo[option.id]"' +
						'data-ng-maxlength="{{inputType.maxlength}}"' +
						'placeholder="{{inputType.placeholder}}"' +
						'rows="{{inputType.rows}}"' +
						'cols="{{inputType.cols}}"></textarea>' +
			'</div>' +

			'<div data-ng-if="!inputType.rows || inputType.rows < 2">' +
				'<input data-vn-element="text"' +
					'data-vn-modifiers="{{option.class}}"' +
					'data-ng-focus="saveTo=saveTo||{}"' +
					'data-ng-model="saveTo[option.id]"' +
					'data-ng-maxlength="{{inputType.maxlength}}"' +
					'placeholder="{{inputType.placeholder}}">' +
			'</div>'
		);
	}]);
