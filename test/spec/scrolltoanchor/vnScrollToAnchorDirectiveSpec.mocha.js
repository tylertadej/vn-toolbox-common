describe('Directive: vnScrollToAnchor', function () {

	'use strict';

	// load the directive's module
	beforeEach(module('Volusion.toolboxCommon'));

	var element,
		scope;

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should exist', inject(function ($compile) {
		element = angular.element('<a data-vn-scroll-to-anchor-"foo"></scroll-to>');
		element = $compile(element)(scope);
		expect(element).not.to.be.undefined;
	}));
});
