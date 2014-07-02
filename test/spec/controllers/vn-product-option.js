'use strict';

describe('Controller: VnProductOptionCtrl', function() {

	// load the controller's module
	beforeEach(module('Volusion.toolboxCommon'));

	var VnProductOptionCtrl;
	var scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		VnProductOptionCtrl = $controller('VnProductOptionCtrl', {
			$scope: scope
		});
	}));

	xit('should attach a list of awesomeThings to the scope', function() {
		expect(scope.awesomeThings.length).toBe(3);
	});
});
