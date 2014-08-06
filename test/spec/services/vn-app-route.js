'use strict';

describe('Service: vnAppRoute', function () {

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var VnAppRoute;
	beforeEach(inject(function (_VnAppRoute_) {
		VnAppRoute = _VnAppRoute_;
	}));

	it('should do something', function () {
		expect(!!VnAppRoute).toBe(true);
	});

});
