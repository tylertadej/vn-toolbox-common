'use strict';

describe('Service: vnProductParams', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnProductParams;
    beforeEach(inject(function (_vnProductParams_) {
        vnProductParams = _vnProductParams_;
    }));

    it('should do something', function () {
        expect(!!vnProductParams).toBe(true);
    });

});
