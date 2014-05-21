'use strict';

describe('Service: vnDataSrc', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnDataSrc;
    beforeEach(inject(function (_vnDataSrc_) {
        vnDataSrc = _vnDataSrc_;
    }));

    it('should do something', function () {
        expect(!!vnDataSrc).toBe(true);
    });

});
