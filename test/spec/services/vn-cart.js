describe('Service: vnCart', function () {

	'use strict';

	// load the service's module
	beforeEach(module('Volusion.toolboxCommon'));

	// instantiate service
	var vnCart, vnApiEndpoint, $httpBackend, $rootScope, $q;//, response;

	beforeEach(inject(function ($injector) {
		vnCart = $injector.get('vnCart');
		vnApiEndpoint = $injector.get('vnDataEndpoint');
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
		$httpBackend.when('GET', vnApiEndpoint.getApiUrl() + '/carts')
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
		$httpBackend.when('POST', vnApiEndpoint.getApiUrl() + '/carts')
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
		$httpBackend.when('POST', vnApiEndpoint.getApiUrl() + '/carts')
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
		$httpBackend.when('POST', vnApiEndpoint.getApiUrl() + '/carts')
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

	it('should return data on update', function () {
		var data,
			deferred = $q.defer(),
			promise = deferred.promise;

		// Respond to the saveCart POST
		$httpBackend.when('PUT', vnApiEndpoint.getApiUrl() + '/carts')
			.respond(200, VnApiMockLibrary.updateCartResponse({success: true}));

		promise.then(function (response) {
			data = response;
		});

		vnCart.updateCart({action: 'success'})
			.then(function (response) {
				deferred.resolve(response);
			});

		// Get ready for tests
		$httpBackend.flush();
		$rootScope.$digest();

		expect(data).not.toBeFalsy();
		expect(data.discounts[0]).toBeTruthy();
		var coupon = data.discounts[0];
		expect(coupon.couponCode).toBe('123');

		expect(data.totals.discounts).toBe(-10);
		expect(data.serviceErrors.length).toBe(0);
		expect(data.warnings.length).toBe(0);
	});

	it('should handle warnings on update', function () {
		var data,
			deferred = $q.defer(),
			promise = deferred.promise;

		// Respond to the saveCart POST
		$httpBackend.when('PUT', vnApiEndpoint.getApiUrl() + '/carts')
			.respond(500, VnApiMockLibrary.updateCartResponse({success: false}));

		promise.then(function (response) {
			data = response;
		});

		vnCart.updateCart({action: 'errors'})
			.then(function (response) {
				deferred.resolve(response);
			});

		// Get ready for tests
		$httpBackend.flush();
		$rootScope.$digest();

		expect(data.warnings[0]).toBeTruthy();
		var warn1 = data.warnings[0];
		expect(warn1.Code).toBe('couponCode');
		expect(warn1.Message).toBe('Coupon code "1234" is not valid.');
		expect(warn1.Identifier).toBe('');
	});

	it('should handle serviceErrors on update', function () {
		var data,
			deferred = $q.defer(),
			promise = deferred.promise;

		// Respond to the saveCart POST
		$httpBackend.when('PUT', vnApiEndpoint.getApiUrl() + '/carts')
			.respond(500, VnApiMockLibrary.updateCartResponse({success: false}));

		promise.then(function (response) {
			data = response;
		});

		vnCart.updateCart({action: 'warning'})
			.then(function (response) {
				deferred.resolve(response);
			});

		// Get ready for tests
		$httpBackend.flush();
		$rootScope.$digest();

		//TODO: Errors not defined yet
		expect(data.serviceErrors[0]).toBeTruthy();
		var err1 = data.serviceErrors[0];
		expect(err1.Code).toBe('');
		expect(err1.Message).toBe('');
		expect(err1.Identifier).toBe('');
	});
});
