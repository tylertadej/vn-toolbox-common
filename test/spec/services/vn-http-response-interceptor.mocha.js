'use strict';

describe('Service: vnHttpResponseInterceptor', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var $injector, $httpBackend, $rootScope, requestHandler, httpError;


    beforeEach(inject(function (_$injector_) {

        $injector = _$injector_;

        $httpBackend = $injector.get('$httpBackend');

        // backend definition common for all tests
        requestHandler = $httpBackend.whenGET(new RegExp(/./ ))
            .respond(500, 'error occurred', {resource: 'baz'});

        $rootScope = $injector.get('$rootScope');

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send an error event on the rootScope if there is an http 500 error', function (done) {
        $rootScope.$on('VN_HTTP_500_ERROR', function(event, err) {
            expect(err.status).to.equal(500);
            expect(err.message).to.equal('error occurred');
            expect(err.resource).to.equal('baz');
            done();
        });

        var http = $injector.get('$http');
        http.get('/foo/bar');
        $httpBackend.flush();

    });

});