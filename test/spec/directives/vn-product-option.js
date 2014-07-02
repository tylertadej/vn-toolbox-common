'use strict';

describe('Directive: vnProductOption', function() {

	// load the directive's module
	beforeEach(module('Volusion.toolboxCommon'));

	//var $rootScope;
	//var $compile;

	//// ReSharper disable InconsistentNaming
	//beforeEach(inject(function(_$rootScope_, _$compile_) {
	//	// ReSharper restore InconsistentNaming
	//	$rootScope = _$rootScope_;
	//	$compile = _$compile_;
	//}));

	//function createComponent(options) {
	//	options = options || {};
	//	options.templateAttrs = options.templateAttrs || {};
	//	options.scopeAttrs = options.scopeAttrs || {};
	//	options.product = options.product || {};
	//	var template = compileTemplate(options.templateAttrs);
	//	var scope = createScope(options.product, options.scopeAttrs);
	//	var $component = template(scope);
	//	$rootScope.$digest();
	//	return $component;
	//}

	//function compileTemplate(attrs) {
	//	var $div = angular.element('<div data-vn-product-option/>').attr(angular.extend({
	//		'data-option': 'product.options[0]',
	//		'data-product': 'product'
	//	}, attrs || {})).append($('<p>'));
	//	return $compile($div);
	//}

	//var $scope;

	//function createScope(product, attrs) {
	//	$scope = $rootScope.$new();
	//	$scope.cartItem = { options: {} };
	//	$scope.product = angular.extend(product, {
	//		onOptionChanged: sinon.spy(),
	//		onCheckboxClicked: sinon.spy()
	//	});
	//	return angular.extend($scope, attrs || {});
	//}

	//it('replaces content with a vn-product-option block', function() {
	//	var $component = createComponent();
	//	expect($component).to.have.attr('data-vn-block', 'vn-product-option');
	//});

	//describe('display types', function() {

	//	function createComponentWithInputType(inputType, options) {
	//		inputType = angular.extend(options || {}, { type: inputType });
	//		return createComponent({
	//			product: {
	//				options: [
	//					{
	//						id: 'colorId',
	//						label: 'Choose a Color',
	//						'class': 'colorClass',
	//						inputTypes: [
	//							inputType
	//						],
	//						items: ['fooId', 'barId']
	//					}
	//				],
	//				optionItems: {
	//					fooId: {
	//						id: 'fooId',
	//						text: 'fooText',
	//						color: 'rgb(1, 2, 3);',
	//						image: 'data:image/png;base64,foo'
	//					},
	//					barId: {
	//						id: 'barId',
	//						text: 'barText'
	//					}
	//				},
	//				selections: {
	//					template: {
	//						available: 0,
	//						state: 'sold-out'
	//					},
	//					'colorId:fooId': {
	//						available: 1,
	//						state: 'fooState'
	//					},
	//					'colorId:barId': {
	//						state: 'barState'
	//					}
	//				},
	//				cartItem: {
	//					options: {
	//						color: 'barId'
	//					},
	//					quantity: 1
	//				}
	//			}
	//		});
	//	}

	//	describe('radios', function() {

	//		var $labels;
	//		beforeEach(function() {
	//			var $component = createComponentWithInputType('radios');
	//			$labels = $component.find('[data-vn-block=vn-labeled-radio]');
	//		});

	//		it('adds class as a modifier', function() {
	//			$labels.each(function(i, label) {
	//				expect($(label)).to.have.attr('data-vn-modifiers', 'colorClass');
	//			});
	//		});

	//		it('assigns the option id as the name for each radio', function() {
	//			expect($labels.find('input')).to.have.attr('name', 'colorId');
	//		});

	//	});

	//	describe('checkboxes', function() {

	//		var $labels;
	//		beforeEach(function() {
	//			var $component = createComponentWithInputType('checkboxes');
	//			$labels = $component.find('[data-vn-block=vn-labeled-checkbox]');
	//		});

	//		it('adds class as a modifier', function() {
	//			$labels.each(function(i, label) {
	//				expect($(label)).to.have.attr('data-vn-modifiers', 'colorClass');
	//			});
	//		});

	//	});

	//	describe('content partial', function() {

	//		var $contents;
	//		beforeEach(function() {
	//			var $component = createComponentWithInputType('radios');
	//			$contents = $component.find('[data-vn-element=content]');
	//		});

	//		it('composes content within a content div', function() {
	//			expect($contents).to.exist;
	//		});

	//		it('generates a color div', function() {
	//			$contents.each(function(i, content) {
	//				expect($(content)).to.have('[data-vn-element=color]');
	//			});
	//		});

	//		it('hides the color div when color is not specified', function() {
	//			expect($contents.first().find('[data-vn-element=color]')).not.to.have.class('ng-hide');
	//			expect($contents.last().find('[data-vn-element=color]')).to.have.class('ng-hide');
	//		});

	//		it('generates an image', function() {
	//			$contents.each(function(i, content) {
	//				expect($(content)).to.have('[data-vn-element=image]');
	//			});
	//		});

	//		it('hides the image when the image is not specified', function() {
	//			expect($contents.first().find('[data-vn-element=image]')).not.to.have.class('ng-hide');
	//			expect($contents.last().find('[data-vn-element=image]')).to.have.class('ng-hide');
	//		});

	//		it('generates text', function() {
	//			expect($contents.first().find('[data-vn-element=text]')).to.have.text('fooText');
	//			expect($contents.last().find('[data-vn-element=text]')).to.have.text('barText');
	//		});

	//		it('generates a border div', function() {
	//			$contents.each(function(i, content) {
	//				expect($(content)).to.have('[data-vn-element=border]');
	//			});
	//		});

	//	});

	//	describe('select', function() {

	//		var $select;

	//		function createSelect(attrs) {
	//			var $component = createComponentWithInputType('select', attrs);
	//			return $component.find('[data-vn-element=select]');
	//		}

	//		it('adds class to modifiers', function() {
	//			$select = createSelect();
	//			expect($select).to.have.attr('data-vn-modifiers', 'colorClass');
	//		});

	//		it('adds a size attributes when size is specified', function() {
	//			$select = createSelect({ size: 5 });
	//			expect($select).to.have.attr('size', '5');
	//		});

	//	});

	//	describe('input text', function() {

	//		var $input;

	//		function createInputText(attrs) {
	//			var $component = createComponentWithInputType('text', attrs);
	//			return $component.find('[data-vn-element=text]');
	//		}

	//		it('generates an input element with no type', function() {
	//			$input = createInputText();
	//			expect($input.is('input')).to.be.true;
	//			expect($input.is('[type=text]')).to.be.false;
	//		});

	//		it('adds class to modifiers', function() {
	//			expect($input).to.have.attr('data-vn-modifiers', 'colorClass');
	//		});

	//		it('supports maxlength', function() {
	//			$input = createInputText({
	//				maxlength: 42
	//			});
	//			expect($input).to.have.attr('data-ng-maxlength', '42');
	//		});

	//		it('adds placeholder text', function() {
	//			$input = createInputText({ placeholder: 'placeholderText' });
	//			expect($input).to.have.attr('placeholder', 'placeholderText');
	//		});

	//	});

	//	describe('textarea', function() {

	//		var $textarea;

	//		function createTextarea(attrs) {
	//			var $component = createComponentWithInputType('text', attrs);
	//			return $component.find('[data-vn-element=text]');
	//		}

	//		it('generates a textarea element when rows > 1', function() {
	//			$textarea = createTextarea({ rows: 1 });
	//			expect($textarea.is('textarea')).to.be.false;

	//			$textarea = createTextarea({ rows: 2 });
	//			expect($textarea.is('textarea')).to.be.true;
	//		});

	//		it('adds class to modifiers', function() {
	//			expect($textarea).to.have.attr('data-vn-modifiers', 'colorClass');
	//		});

	//		it('supports maxlength', function() {
	//			$textarea = createTextarea({
	//				rows: 2,
	//				maxlength: 42
	//			});
	//			expect($textarea).to.have.attr('data-ng-maxlength', '42');
	//		});

	//		it('adds placeholder text', function() {
	//			$textarea = createTextarea({
	//				rows: 2,
	//				placeholder: 'placeholderText'
	//			});
	//			expect($textarea).to.have.attr('placeholder', 'placeholderText');
	//		});

	//		it('adds rows', function() {
	//			$textarea = createTextarea({
	//				rows: 2
	//			});
	//			expect($textarea).to.have.attr('rows', '2');
	//		});

	//		it('adds cols', function() {
	//			$textarea = createTextarea({
	//				rows: 2,
	//				cols: 30
	//			});
	//			expect($textarea).to.have.attr('cols', '30');
	//		});

	//	});

	//});

	//it('supports progressive disclosure', function() {
	//	var $component = createComponent({
	//		product: {
	//			options: [
	//				{
	//					label: 'foo',
	//					selected: 'fooItem',
	//					options: [
	//						{
	//							label: 'bar',
	//							options: [
	//								{
	//									label: 'baz'
	//								}
	//							]
	//						}
	//					]
	//				}
	//			]
	//		}
	//	});
	//	var $labels = $component.find('[data-vn-element=label]');
	//	expect($labels.first()).to.have.text('foo');
	//	expect($labels.last()).to.have.text('bar');
	//});

});
