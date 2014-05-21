'use strict';

describe('Service: vnDataEndpoint', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnDataEndpoint;
    beforeEach(inject(function (_vnDataEndpoint_) {
        vnDataEndpoint = _vnDataEndpoint_;
    }));

    it('should have a valid firebase endpoint', function () {
        expect(vnDataEndpoint.fbUrl).toBeTruthy();
        expect(vnDataEndpoint.fbUrl).toEqual('https://brilliant-fire-5600.firebaseio.com');
    });

    it('should have a valid apibase endpoint', function () {
        expect(vnDataEndpoint.apiUrl).toBeTruthy();
        expect(vnDataEndpoint.apiUrl).toEqual('http://www.samplestore.io/api/v1');
    });

});
