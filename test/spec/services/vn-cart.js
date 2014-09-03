'use strict';

describe('Service: vnCart', function () {

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var vnCart;
	beforeEach(inject(function (_vnCart_) {
		vnCart = _vnCart_;
	}));

	it('should do something', function () {
		expect(!!vnCart).toBe(true);
	});

});
