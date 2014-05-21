'use strict';

describe('Service: vnApi', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnApi;
    beforeEach(inject(function (_vnApi_) {
        vnApi = _vnApi_;
    }));

    it('should be available', function () {
        expect(!!vnApi).toBe(true);
    });

    describe('should have a resource for', function() {
        it('Articles', function() {
            expect(typeof vnApi.Article).toBe('function');
            expect(vnApi.Article.name).toBe('Resource');
        });

        it('Categories', function() {
            expect(typeof vnApi.Category).toBe('function');
            expect(vnApi.Category.name).toBe('Resource');
        });

        it('Carts', function() {
            expect(typeof vnApi.Cart).toBe('function');
            expect(vnApi.Cart.name).toBe('Resource');
        });

        it('Config', function() {
            expect(typeof vnApi.Configuration).toBe('function');
            expect(vnApi.Configuration.name).toBe('Resource');
        });

        it('Countries', function() {
            expect(typeof vnApi.Country).toBe('function');
            expect(vnApi.Country.name).toBe('Resource');
        });

        it('Navs', function() {
            expect(typeof vnApi.Nav).toBe('function');
            expect(vnApi.Nav.name).toBe('Resource');
        });

        it('Products', function() {
            expect(typeof vnApi.Product).toBe('function');
            expect(vnApi.Product.name).toBe('Resource');
        });
    });

});
