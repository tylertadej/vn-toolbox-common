'use strict';

describe('Service: vnTokenGenerator', function () {

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var vnTokenGenerator;
	beforeEach(inject(function (_vnTokenGenerator_) {
        vnTokenGenerator = _vnTokenGenerator_;
	}));

	it('should do something', function () {
		expect(!!vnTokenGenerator).toBe(true);
	});

});
