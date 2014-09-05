/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnCart
 * @description
 * # vnCart
 * Service in the vnToolboxCommonApp.
 */
angular.module('Volusion.toolboxCommon')
	.service('vnCart', ['vnApi',
		function (vnApi) {

			'use strict';

			var cart = {};

			function getCart() {
				return cart;
			}

			function getCartItemsCount() {
				if (cart === undefined || cart.totals === undefined) {
					return 0;
				}

				return cart.totals.qty;
			}

			function init() {

				// Initial cartId is empty
				vnApi.Cart({ cartId: '' }).get().$promise
					.then(function (response) {
						cart = response.data;
					});
			}

			function reset() {
				cart = {};
			}

			function saveCart(cartItem) {
				return vnApi.Cart().save({cartId: cart.id}, cartItem).$promise
					.then(function (response) {
						// on success
						cart = response.data;
						cart.serviceErrors = [];
						cart.warnings = response.data.warnings || [];
					},
					function (response) {
						// on error
						cart = response.data.data;
						cart.serviceErrors = response.data.serviceErrors || [];
						cart.warnings = response.data.warnings || [];
					})
					.then(function () {
						return cart;
					});
			}

			return {
				getCart          : getCart,
				getCartItemsCount: getCartItemsCount,
				init             : init,
				reset            : reset,
				saveCart         : saveCart
			};
		}]);
