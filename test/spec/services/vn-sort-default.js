'use strict';

describe('Service: vnSortDefault', function () {

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var vnSortDefault;
	beforeEach(inject(function (_vnSortDefault_) {
		vnSortDefault = _vnSortDefault_;
	}));

	it('should default to "relevence"', function () {
		expect(!!vnSortDefault).toBe(true);
		expect(vnSortDefault).toBe('relevence');
	});
});
