'use strict';


describe('Directive: vnEasyZoom', function() {

	// load the directive's module
	beforeEach(module('Volusion.toolboxCommon'));

	var element;
	var scope;

	beforeEach(inject(function($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should make hidden element visible', inject(function($compile) {
		element = angular.element('<img vn-easy-zoom />');
		element = $compile(element)(scope);
		expect(element).toExist;
	}));
});
