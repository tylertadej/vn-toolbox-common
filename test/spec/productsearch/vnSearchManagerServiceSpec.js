'use strict';

describe('Service: vnSearchManager', function () {

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var vnSearchManager;
	beforeEach(inject(function (_vnSearchManager_) {
        vnSearchManager = _vnSearchManager_;
	}));

	it('should exist', function () {
		expect(!!vnSearchManager).toBeDefined();
	});
});
