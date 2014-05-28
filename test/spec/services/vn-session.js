'use strict';

describe('Service: vnSession', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnSession;
    beforeEach(inject(function (_vnSession_) {
        vnSession = _vnSession_;
    }));

    it('should set the accountData when a new session is initialized', function () {

        expect(vnSession.getAccountData()).toEqual({});

        // Inline mocking :-(
        var mockResponse = {
            api     : 'http://www.samplestore.io/api/v1',
            account : 'asdf123',
            context : 'SiteBuilder',
            firebase: 'https://brilliant-fire-5600.firebaseio.com',
            fbToken : ']idk - this comes from node server[',
            apiToken: ']idk - how do I know if I am logging into edit[',
            sandbox : 'http://localhost:8080'
        };
        vnSession.initSession(mockResponse);
        expect(vnSession.getAccountData()).toEqual(mockResponse);
    });

    it('should init with true', function() {
        expect(vnSession.init()).toEqual(true);
    });

});
