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
            expect(typeof vnApi.Article()).toBe('function');
            expect(vnApi.Article.name).toBe('Article');
        });

        it('Categories', function() {
            expect(typeof vnApi.getCategory({id: 1})).toBe('object');
            expect(vnApi.getCategory.name).toBe('getCategory');
            expect( function(){ vnApi.getCategory(); } ).toThrow(new Error('The Category $resource needs an id.'));
        });

        it('Carts', function() {
            expect( typeof vnApi.getCart() ).toBe('object');
            expect(vnApi.getCart.name).toBe('getCart');
        });

        it('Config', function() {
            expect( typeof vnApi.getConfiguration() ).toBe('object'); // The promise object returned.
            expect(vnApi.getConfiguration.name).toBe('getConfiguration');
        });

        it('Countries', function() {
            expect(typeof vnApi.Country()).toBe('function');
            expect(vnApi.Country.name).toBe('Country');
        });

        it('Nav', function() {
            expect(typeof vnApi.Nav({navId: 1})).toBe('object');
            expect(vnApi.Nav.name).toBe('Nav');
            expect( function(){ vnApi.Nav(); } ).toThrow(new Error('The Nav $resource needs a navId'));

        });

        it('Products', function() {
            expect(typeof vnApi.Product()).toBe('function');
            expect(vnApi.Product.name).toBe('Product');
        });
    });

});
