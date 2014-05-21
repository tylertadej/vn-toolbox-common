'use strict';

describe('Service: vnApiConfigurations', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiConfigurations;
    beforeEach(inject(function (_vnApiConfigurations_) {
        vnApiConfigurations = _vnApiConfigurations_;
    }));

    it('should do something', function () {
        expect(!!vnApiConfigurations).toBe(true);
    });

});
