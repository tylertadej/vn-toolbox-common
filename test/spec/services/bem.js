'use strict';

describe('Service: vnBem', function () {

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var bem;
	beforeEach(inject(function (_vnBem_) {
		bem = _vnBem_;
	}));

	it('should do something', function () {
		expect(!!bem).toBeDefined();
	});

});
