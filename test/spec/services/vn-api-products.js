'use strict';

describe('Service: vnApiProducts', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiProducts;
    beforeEach(inject(function (_vnApiProducts_) {
        vnApiProducts = _vnApiProducts_;
    }));

    it('should default to an empty object', function () {
        expect(vnApiProducts).toEqual({});
    });

    // When mocking or ajax testing is enabled test the integrity
    // of the responses structure.

});
