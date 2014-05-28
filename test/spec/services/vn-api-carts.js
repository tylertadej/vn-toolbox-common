'use strict';

describe('Service: vnApiCarts', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiCarts;
    beforeEach(inject(function (_vnApiCarts_) {
        vnApiCarts = _vnApiCarts_;
    }));

    it('should default to an empty object', function () {
        expect(vnApiCarts).toEqual({});
    });

    // When mocking or ajax testing is enabled test the integrity
    // of the Cart structure.
});
