describe('Service: vnCart', function () {

	'use strict';

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var vnCart, $httpBackend, $rootScope, $q;//, response;

	beforeEach(inject(function (_vnCart_, $injector) {
		vnCart = _vnCart_;
//		var cart = vnCart.getCart();
		$httpBackend = $injector.get('$httpBackend');
		$q = $injector.get('$q');
		$rootScope = $injector.get('$rootScope');
	}));

	afterEach(function () {
		vnCart = null;
		$httpBackend = null;
		$rootScope = null;
	});

	it('should not have a cart when uninitialized', function () {
		expect(vnCart).not.toEqual(null);
		expect(vnCart).not.toEqual(undefined);
		expect(vnCart.getCart()).toEqual({});
	});

	it('should handle initialization', function() {

		// Response to the init GET request
		$httpBackend.when('GET', 'http://www.samplestore.io/api/v1/carts')
			.respond(200, VnApiMockLibrary.initialCartResponse());

		vnCart.init();

		// Get ready for tests
		$httpBackend.flush();
		$rootScope.$digest();

		var cart = vnCart.getCart();

		expect(cart).not.toEqual({});
		expect(cart.totals.qty).toBe(0);

	});

	it('should return data on success', function () {
		var data,
			deferred = $q.defer(),
			promise = deferred.promise;

		// Respond to the saveCart POST
		$httpBackend.when('POST', 'http://www.samplestore.io/api/v1/carts')
			.respond(200, VnApiMockLibrary.saveCartResponse({success: true}));

		promise.then(function (response) {
			data = response;
		});

		vnCart.saveCart({action: 'success'})
			.then(function (response) {
				deferred.resolve(response);
			});

		// Get ready for tests
		$httpBackend.flush();
		$rootScope.$digest();

		expect(data).not.toBeFalsy();
		expect(data.totals.qty).toBe(5);
		expect(data.items.length).toBe(5);
		expect(data.totals.qty).toBe(data.items.length);
		expect(data.serviceErrors.length).toBe(0);
		expect(data.warnings.length).toBe(0);
	});

	it('should handle warnings', function () {
		var data,
			deferred = $q.defer(),
			promise = deferred.promise;

		// Respond to the saveCart POST
		$httpBackend.when('POST', 'http://www.samplestore.io/api/v1/carts')
			.respond(500, VnApiMockLibrary.saveCartResponse({success: false}));

		promise.then(function (response) {
			data = response;
		});

		vnCart.saveCart({action: 'errors'})
			.then(function (response) {
				deferred.resolve(response);
			});

		// Get ready for tests
		$httpBackend.flush();
		$rootScope.$digest();

		expect(data.warnings[0]).toBeTruthy();
		expect(data.warnings[0]).toBeTruthy();
		var warn1 = data.warnings[0];
		expect(warn1.Code).toBe('CART_ITEM_SHIPPING_DELAY');
		expect(warn1.Message).toBe('The shipping time for this product is delayed by 42 micro seconds.');
		expect(warn1.Identifier).toBe('ah-chairbamboo');
	});

	it('should handle serviceErrors', function () {
		var data,
			deferred = $q.defer(),
			promise = deferred.promise;

		// Respond to the saveCart POST
		$httpBackend.when('POST', 'http://www.samplestore.io/api/v1/carts')
			.respond(500, VnApiMockLibrary.saveCartResponse({success: false}));

		promise.then(function (response) {
			data = response;
		});

		vnCart.saveCart({action: 'warning'})
			.then(function (response) {
				deferred.resolve(response);
			});

		// Get ready for tests
		$httpBackend.flush();
		$rootScope.$digest();

		expect(data.serviceErrors[0]).toBeTruthy();
		var err1 = data.serviceErrors[0];
		expect(err1.Code).toBe('CART_ITEM_MIN_ORDER_QTY');
		expect(err1.Message).toBe('The minimum order quantity for product \"Modern Bamboo Chair\" is 2.');
		expect(err1.Identifier).toBe('ah-chairbamboo');
	});
});
