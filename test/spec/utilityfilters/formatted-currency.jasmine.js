describe('Filter: vnFormattedCurrency', function() {

	'use strict';

	beforeEach(module('Volusion.toolboxCommon'));
	var $compile, scope;

	/*jshint camelcase: false */
	beforeEach(inject(function($rootScope, _$compile_) {
		scope = $rootScope.$new();
		$compile = _$compile_;
	}));
	/*jshint camelcase: true */

	function compile(content) {
		scope.content = content;
		var element,
			htmlTemplate = '<div data-ng-bind-html="content | vnFormattedCurrency" />';

		element = angular.element(htmlTemplate);

		element = $compile(element)(scope);
		scope.$digest();
		return element;
	}

	it('should hide fractions if zero', function() {
		var price = 10,
			elem;

		elem = compile(price);
		expect(elem.html()).toBe('$10');
	});

	it('should display fractions if not zero', function() {
		var price = 10.99,
			elem;

		elem = compile(price);
		expect(elem.html()).toBe('$10<span class="th-price--cents">99</span>');
	});

	it('should display negative price for US locale', function() {
		var price = -10,
			elem;

		elem = compile(price);
		expect(elem.html()).toBe('($10)');
	});
});
