'use strict';

describe('Service: vnApiConfigurations', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiConfigurations;
    beforeEach(inject(function (_vnApiConfigurations_) {
        vnApiConfigurations = _vnApiConfigurations_;
    }));

    it('should default to an empty object', function () {
        expect(vnApiConfigurations).toEqual({});
    });

    // When mocking or ajax testing is enabled test the integrity
    // of the responses structure.

});
