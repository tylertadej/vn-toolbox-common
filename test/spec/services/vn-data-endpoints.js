'use strict';

describe('Service: vnDataEndpoint', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnFirebaseEndpoint,
		vnApiEndpoint;

    beforeEach(inject(function (_vnDataEndpoint_) {
		vnFirebaseEndpoint = _vnDataEndpoint_.getFirebaseUrl();
		vnApiEndpoint = _vnDataEndpoint_.getApiUrl();
    }));

    xit('should have a valid firebase endpoint', function () {
        expect(vnDataEndpoint.getFirebaseUrl()).toBeTruthy();
		console.log(vnDataEndpoint.getFirebaseUrl());
        expect(vnDataEndpoint.getFirebaseUrl()).toEqual('https://brilliant-fire-5600.firebaseio.com');
    });

    xit('should have a valid apibase endpoint', function () {
//        Todo: figure out the best way for vnDataEndpoint to initialize itsself for local-dev, tx-dev and production
        expect(vnApiEndpoint).toBeTruthy();
//        expect(vnApiEndpoint).toEqual('http://www.samplestore.io/api/v1');
    });

});
