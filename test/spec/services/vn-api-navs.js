'use strict';

describe('Service: vnApiNavs', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiNavs;
    beforeEach(inject(function (_vnApiNavs_) {
        vnApiNavs = _vnApiNavs_;
    }));

    it('should do something', function () {
        expect(!!vnApiNavs).toBe(true);
    });

});
