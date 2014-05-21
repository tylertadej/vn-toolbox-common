'use strict';

describe('Service: vnConfig', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnConfig;
    beforeEach(inject(function (_vnConfig_) {
        vnConfig = _vnConfig_;
    }));

    it('should do something', function () {
        expect(!!vnConfig).toBe(true);
    });

});
