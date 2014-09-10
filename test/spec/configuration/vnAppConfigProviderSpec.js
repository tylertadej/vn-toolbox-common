'use strict';

describe('Service: AppConfig', function () {

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var vnAppConfig,
		vnApi;

	beforeEach(inject(function (_vnApi_, _vnAppConfig_) {
        vnAppConfig = _vnAppConfig_;
		vnApi = _vnApi_;
	}));

	it('should be defined', function () {
		expect(!!vnAppConfig).toBeDefined();
	});

});
