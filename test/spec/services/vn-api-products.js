'use strict';

describe('Service: vnApiProducts', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiProducts;
    beforeEach(inject(function (_vnApiProducts_) {
        vnApiProducts = _vnApiProducts_;
    }));

    it('should do something', function () {
        expect(!!vnApiProducts).toBe(true);
    });

});
