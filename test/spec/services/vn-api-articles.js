'use strict';

describe('Service: vnApiArticles', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiArticles;
    beforeEach(inject(function (_vnApiArticles_) {
        vnApiArticles = _vnApiArticles_;
    }));

    it('should default to an empty object', function () {
        expect(vnApiArticles).toEqual({});
    });

});
