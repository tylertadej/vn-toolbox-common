'use strict';

describe('Service: vnApiCategories', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiCategories;
    beforeEach(inject(function (_vnApiCategories_) {
        vnApiCategories = _vnApiCategories_;
    }));

    it('should do something', function () {
        expect(!!vnApiCategories).toBe(true);
    });

});
