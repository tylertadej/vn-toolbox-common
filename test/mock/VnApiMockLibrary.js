VnApiMockLibrary = (function () {
	'use strict';

	// Data pulled from here on 9/4/2014
	// http://www.samplestore.io/api/v1/carts?sort=highest%20price&page=1
	var returnObj = {
		data: {
			id             : '262FB2FF1F944EBE90B07452F73F92A7',
			items          : [
				{
					id                 : 37579,
					code               : 'shirt-0025',
					name               : 'Shirt - Blue - Large - 300',
					qty                : 4,
					pricing            : {
						unitPrice     : 22,
						subtotal      : 88,
						recurringPrice: {
							price       : 0,
							startPrice  : 0,
							everyXMonths: '',
							startXMonths: null,
							thenXMonths : ''
						}
					},
					tax                : {
						tax1: 0,
						tax2: 0,
						tax3: 0
					},
					taxable            : true,
					productUrl         : '/p/shirt',
					imgUrl             : '//cdn3.volusion.com/glvus.qafjh/v/vspfiles/photos/shirt-1.jpg',
					options            : [],
					isGiftWrapAvailable: false,
					giftWrap           : {
						price   : 0,
						message : '',
						selected: false
					},
					kits               : []
				},
				{
					id                 : 37598,
					code               : 'shirt-0044',
					name               : 'Shirt - Warm Dust - Large - 500',
					qty                : 8,
					pricing            : {
						unitPrice     : 22,
						subtotal      : 176,
						recurringPrice: {
							price       : 0,
							startPrice  : 0,
							everyXMonths: '',
							startXMonths: null,
							thenXMonths : ''
						}
					},
					tax                : {
						tax1: 0,
						tax2: 0,
						tax3: 0
					},
					taxable            : true,
					productUrl         : '/p/shirt',
					imgUrl             : '//cdn3.volusion.com/glvus.qafjh/v/vspfiles/photos/shirt-1.jpg',
					options            : [],
					isGiftWrapAvailable: false,
					giftWrap           : {
						price   : 0,
						message : '',
						selected: false
					},
					kits               : []
				},
				{
					id                 : 37596,
					code               : 'shirt-0042',
					name               : 'Shirt - Midnight Plaid - Large - 500',
					qty                : 4,
					pricing            : {
						unitPrice     : 22,
						subtotal      : 88,
						recurringPrice: {
							price       : 0,
							startPrice  : 0,
							everyXMonths: '',
							startXMonths: null,
							thenXMonths : ''
						}
					},
					tax                : {
						tax1: 0,
						tax2: 0,
						tax3: 0
					},
					taxable            : true,
					productUrl         : '/p/shirt',
					imgUrl             : '//cdn3.volusion.com/glvus.qafjh/v/vspfiles/photos/shirt-1.jpg',
					options            : [],
					isGiftWrapAvailable: false,
					giftWrap           : {
						price   : 0,
						message : '',
						selected: false
					},
					kits               : []
				},
				{
					id                 : 37580,
					code               : 'shirt-0026',
					name               : 'Shirt - Midnight Plaid - Large - 300',
					qty                : 1,
					pricing            : {
						unitPrice     : 22,
						subtotal      : 22,
						recurringPrice: {
							price       : 0,
							startPrice  : 0,
							everyXMonths: '',
							startXMonths: null,
							thenXMonths : ''
						}
					},
					tax                : {
						tax1: 0,
						tax2: 0,
						tax3: 0
					},
					taxable            : true,
					productUrl         : '/p/shirt',
					imgUrl             : '//cdn3.volusion.com/glvus.qafjh/v/vspfiles/photos/shirt-1.jpg',
					options            : [],
					isGiftWrapAvailable: false,
					giftWrap           : {
						price   : 0,
						message : '',
						selected: false
					},
					kits               : []
				},
				{
					id                 : 37572,
					code               : 'shirt-0018',
					name               : 'Shirt - Midnight Plaid - Small - 300',
					qty                : 2,
					pricing            : {
						unitPrice     : 22,
						subtotal      : 44,
						recurringPrice: {
							price       : 0,
							startPrice  : 0,
							everyXMonths: '',
							startXMonths: null,
							thenXMonths : ''
						}
					},
					tax                : {
						tax1: 0,
						tax2: 0,
						tax3: 0
					},
					taxable            : true,
					productUrl         : '/p/shirt',
					imgUrl             : '//cdn3.volusion.com/glvus.qafjh/v/vspfiles/photos/shirt-1.jpg',
					options            : [],
					isGiftWrapAvailable: false,
					giftWrap           : {
						price   : 0,
						message : '',
						selected: false
					},
					kits               : []
				}
			],
			discounts      : [],
			totals         : {
				qty               : 5,
				giftWrap          : 0,
				shipping          : 0,
				tax1              : 0,
				tax2              : 0,
				tax3              : 0,
				taxTotal          : 0,
				items             : 530,
				kitItems          : 0,
				discounts         : 0,
				grandTotal        : 0,
				giftCardAmountUsed: 0
			},
			shippingAddress: {
				firstName  : '',
				lastName   : '',
				companyName: '',
				address1   : '',
				address2   : '',
				city       : '',
				state      : '',
				country    : '',
				postalCode : '',
				phoneNumber: '',
				residential: true,
				preferred  : false
			},
			shippingMethods: [],
			paymentProfile : {
				method   : '',
				preferred: false,
				card     : {
					cardType    : '',
					cardTypeName: '',
					holdersName : '',
					last4       : '',
					expMonth    : '',
					expYear     : '',
					issueMonth  : '',
					issueYear   : '',
					issueNumber : '',
					pCIaaSId    : '',
					cardNumber  : ''
				}
			},
			billingAddress : {
				firstName  : '',
				lastName   : '',
				companyName: '',
				address1   : '',
				address2   : '',
				city       : '',
				state      : '',
				postalCode : '',
				country    : '',
				phoneNumber: '',
				faxNumber  : '',
				preferred  : false
			},
			misc           : {
				comment: '',
				isGift : ''
			},
			paypalInfo     : {
				token          : '',
				paymentMethodId: -1,
				transactionId  : '',
				totalAmount    : '0',
				paymentStatus  : '',
				useStoreCredit : false
			},
			customFields   : [],
			customer       : {
				id          : -1,
				storeCredit : 0,
				emailAddress: '',
				phoneNumber : '',
				pageName    : ''
			},
			warnings		: [],
			serviceErrors	: []
		}
	};

	function updateCart(status) {

		returnObj.data.discounts = [
			{
				couponCode : '123'
			}
		];

		returnObj.data.totals.discounts = -10;

		if (!status.success) {
			returnObj.warnings = [
				{
					Code      : 'couponCode',
					Message   : 'Coupon code "1234" is not valid.',
					Identifier: ''
				}
			];

			//TODO: Errors not defined yet
			returnObj.serviceErrors = [
				{
					Code      : '',
					Message   : '',
					Identifier: ''
				}
			];
		} else {
			returnObj.warnings = [];
			returnObj.serviceErrors = [];
		}

		return returnObj;
	}

	function saveCart(status) {
		if (!status.success) {
			returnObj.warnings = [
				{
					Code      : 'CART_ITEM_SHIPPING_DELAY',
					Message   : 'The shipping time for this product is delayed by 42 micro seconds.',
					Identifier: 'ah-chairbamboo'
				}
			];
			returnObj.serviceErrors = [
				{
					Code      : 'CART_ITEM_MIN_ORDER_QTY',
					Message   : 'The minimum order quantity for product \"Modern Bamboo Chair\" is 2.',
					Identifier: 'ah-chairbamboo'
				}
			];
		} else {
			returnObj.warnings = [];
			returnObj.serviceErrors = [];
		}

		return returnObj;
	}

	function initialCartResponse() {
		return {
			data: {
				id             : '',
				items          : [],
				discounts      : [],
				totals         : {
					qty               : 0,
					giftWrap          : 0,
					shipping          : 0,
					tax1              : 0,
					tax2              : 0,
					tax3              : 0,
					taxTotal          : 0,
					items             : 0,
					kitItems          : 0,
					discounts         : 0,
					grandTotal        : 0,
					giftCardAmountUsed: 0
				},
				shippingAddress: {
					firstName  : '',
					lastName   : '',
					companyName: '',
					address1   : '',
					address2   : '',
					city       : '',
					state      : '',
					country    : '',
					postalCode : '',
					phoneNumber: '',
					residential: true,
					preferred  : false
				},
				shippingMethods: [],
				paymentProfile : {
					method   : '',
					preferred: false,
					card     : {
						cardType    : '',
						cardTypeName: '',
						holdersName : '',
						last4       : '',
						expMonth    : '',
						expYear     : '',
						issueMonth  : '',
						issueYear   : '',
						issueNumber : '',
						pCIaaSId    : '',
						cardNumber  : ''
					}
				},
				billingAddress : {
					firstName  : '',
					lastName   : '',
					companyName: '',
					address1   : '',
					address2   : '',
					city       : '',
					state      : '',
					postalCode : '',
					country    : '',
					phoneNumber: '',
					faxNumber  : '',
					preferred  : false
				},
				misc           : {
					comment: '',
					isGift : ''
				},
				paypalInfo     : {
					token          : '',
					paymentMethodId: -1,
					transactionId  : '',
					totalAmount    : '0',
					paymentStatus  : '',
					useStoreCredit : false
				},
				customFields   : [],
				customer       : {
					id          : -1,
					storeCredit : 0,
					emailAddress: '',
					phoneNumber : '',
					pageName    : ''
				}
			}
		};

	}

	return {
		updateCartResponse : updateCart,
		saveCartResponse   : saveCart,
		initialCartResponse: initialCartResponse
	};
})();
