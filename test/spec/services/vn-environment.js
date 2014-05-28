'use strict';

describe('Service: vnEnvironment', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnEnvironment;
    beforeEach(inject(function (_vnEnvironment_) {
        vnEnvironment = _vnEnvironment_;
    }));

    it('should default to Production', function () {
        expect(!!vnEnvironment).toBe(true);
        expect(vnEnvironment).toEqual('Production');
    });

    it('should be able to change the environment', function() {
        vnEnvironment = 'SiteBuilder';
        expect(vnEnvironment).not.toEqual('Production');
        expect(vnEnvironment).toEqual('SiteBuilder');
    });

});
