'use strict';

describe('Service: bem', function () {

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var bem;
	beforeEach(inject(function (_bem_) {
		bem = _bem_;
	}));

	it('should do something', function () {
		expect(!!bem).toBeDefined();
	});

});
