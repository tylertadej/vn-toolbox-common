'use strict';

describe('Service: vnAppRoute', function () {

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var vnAppRoute;
	beforeEach(inject(function (_vnAppRoute_) {
		vnAppRoute = _vnAppRoute_;
	}));

	it('should do something', function () {
		expect(!!vnAppRoute).toBe(true);
	});

});
