/*global $ */

// ReSharper disable WrongExpressionStatement
describe('Directive: vnLabeledRadio', function() {

	'use strict';

//	function createScope(props) {
//		var scope = $rootScope.$new();
//
//		return angular.extend(scope, props || {});
//	}

	function compile(options) {
		options = options || {};
		var extend = options.extend || function(elem) { return elem;},
			input = extend(angular.element('<input data-vn-labeled-radio/>')
								   .attr('data-ng-model', 'selectedValue.value')),
			template = $compile(input),
			scope = options.scope || $rootScope.$new(),
			component = template(addFixtureData(scope));

		$rootScope.$digest();

		return component;
	}

	function addFixtureData($scope) {
		return angular.extend($scope, {
			foo: 'bar',
			isTrue: true,
			isFalse: false,
			selectedValue: {
				value: null
			}
		});
	}

//	function createLabeledRadio(attrs) {
//		var component = compile({
//			extend: function($elem) {
//				return $elem.attr(attrs);
//			}
//		});
//
//		return {
//			input: component.find('.vn-labeled-radio__input')
//		};
//	}

	// load the directive's module
	beforeEach(module('Volusion.toolboxCommon'));

	var $rootScope,
		$compile;

	// ReSharper disable InconsistentNaming
	beforeEach(inject(function(_$rootScope_, _$compile_) {
		// ReSharper restore InconsistentNaming
		$rootScope = _$rootScope_;
		$compile = _$compile_;
	}));

	it('generates a vn-labeled-radio block', function() {
		var component = compile();
		expect($(component)).toHaveClass('vn-labeled-radio');
		expect($(component)).toContainElement('.vn-labeled-radio__input');
		expect($(component)).toContainElement('.vn-labeled-radio__content');
	});

//	xit('transcludes content', function() {
//		var component = compile({
//			extend: function(elem) {
//				return elem.append('foo');
//			}
//		});
//		expect(component.find('.vn-labeled-radio__content')).to.have.text('foo');
//	});
//
//	xit('passes "name" through to the inner radio input', function() {
//		expect(createLabeledRadio({ 'data-name': 'foo' }).input).to.have.attr('name', 'foo');
//	});
//
//	xit('passes "value" through to the inner radio input', function() {
//		expect(createLabeledRadio({ value: 'foo' }).input).to.have.value('foo');
//	});
//
//	xit('passes "ng-value" through to the inner radio input', function() {
//		expect(createLabeledRadio({ 'data-ng-value': 'foo' }).input).to.have.value('bar');
//	});
//
//	xit('passes "ng-checked" through to the inner radio input', function() {
//		expect(createLabeledRadio({ 'data-ng-checked': 'isTrue' }).input).to.be.checked;
//		expect(createLabeledRadio({ 'data-ng-checked': 'isFalse' }).input).not.to.be.checked;
//	});
//
//	xit('passes "ng-disabled" through to the inner radio input', function() {
//		expect(createLabeledRadio({ 'data-ng-disabled': '{{isTrue}}' }).input).to.be.disabled;
//		expect(createLabeledRadio({ 'data-ng-disabled': '{{isFalse}}' }).input).not.to.be.disabled;
//	});
//
//	xit('responds to a change event', function() {
//		var scope = createScope({
//			change: sinon.spy()
//		});
//		var component = compile({
//			scope: scope,
//			extend: function($elem) {
//				return $elem.attr('data-ng-change', 'change()');
//			}
//		});
//		var radio = component.find('.vn-labeled-radio__input').get(0);
//		radio.click();
//		expect(scope.change).to.have.been.calledOnce;
//	});
//
//	xit('binds to a model', function() {
//		var scope = createScope();
//		var component = compile({
//			scope: scope,
//			extend: function(elem) {
//				return elem.attr('data-ng-value', 'foo');
//			}
//		});
//		var radio = component.find('.vn-labeled-radio__input');
//		expect(radio).not.to.be.checked;
//		expect(scope.selectedValue.value).not.to.eq('bar');
//		radio.get(0).click();
//		expect(radio).to.be.checked;
//		expect(scope.selectedValue.value).to.eq('bar');
//	});
});
