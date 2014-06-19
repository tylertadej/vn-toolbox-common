/*global describe, module, beforeEach, inject, it, expect */

describe('Service: vnApi', function () {

    'use strict';

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

    describe('should have a resource for', function () {
        it('Articles', function () {
            expect(typeof vnApi.Article()).toBe('function');
            expect(vnApi.Article.name).toBe('Article');
        });

        it('Categories', function() {
            expect(typeof vnApi.Category()).toBe('function');
            expect(vnApi.Category.name).toBe('Category');
        });

        it('Carts', function() {
            expect( typeof vnApi.Cart() ).toBe('function');
            expect(vnApi.Cart.name).toBe('Cart');
        });

        it('Config', function() {
            expect( typeof vnApi.Configuration() ).toBe('function');
            expect(vnApi.Configuration.name).toBe('Configuration');
        });

        it('Countries', function () {
            expect(typeof vnApi.Country()).toBe('function');
            expect(vnApi.Country.name).toBe('Country');
        });

        it('Nav', function() {
            expect(typeof vnApi.Nav()).toBe('function');
            expect(vnApi.Nav.name).toBe('Nav');
        });

        it('Products', function () {
            expect(typeof vnApi.Product()).toBe('function');
            expect(vnApi.Product.name).toBe('Product');
        });
    });

});
