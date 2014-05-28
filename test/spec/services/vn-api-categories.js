'use strict';

describe('Service: vnApiCategories', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiCategories;
    beforeEach(inject(function (_vnApiCategories_) {
        vnApiCategories = _vnApiCategories_;
    }));

    it('should default to an empty object', function () {
        expect(vnApiCategories).toEqual({});
    });

    // When mocking or ajax testing is enabled test the integrity
    // of the responses structure.

});
