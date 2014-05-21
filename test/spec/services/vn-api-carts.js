'use strict';

describe('Service: vnApiCarts', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiCarts;
    beforeEach(inject(function (_vnApiCarts_) {
        vnApiCarts = _vnApiCarts_;
    }));

    it('should do something', function () {
        expect(!!vnApiCarts).toBe(true);
    });

});
