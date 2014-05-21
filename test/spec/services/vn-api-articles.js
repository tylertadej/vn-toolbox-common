'use strict';

describe('Service: vnApiArticles', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApiArticles;
    beforeEach(inject(function (_vnApiArticles_) {
        vnApiArticles = _vnApiArticles_;
    }));

    it('should do something', function () {
        expect(!!vnApiArticles).toBe(true);
        expect(!!vnApiArticles).toBe(true);
    });

});
