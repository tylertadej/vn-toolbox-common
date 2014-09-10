'use strict';

describe('Service: vnSiteConfig', function () {

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var vnSiteConfig,
		vnApi;

	beforeEach(inject(function (_vnApi_, _vnSiteConfig_) {
        vnSiteConfig = _vnSiteConfig_;
		vnApi = _vnApi_;
	}));

	it('should be defined', function () {
		expect(!!vnSiteConfig).toBeDefined();
	});

});
