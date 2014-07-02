'use strict';

describe('Directive: vnProductOption', function() {

	// load the directive's module
	beforeEach(module('Volusion.toolboxCommon'));

	var element;
	var scope;

	beforeEach(inject(function($rootScope) {
		scope = $rootScope.$new();
	}));

	xit('should make hidden element visible', inject(function($compile) {
		element = angular.element('<vn-product-option></vn-product-option>');
		element = $compile(element)(scope);
		expect(element.text()).toBe('this is the vnProductOption directive');
	}));
});
