'use strict';

/**
 * @ngdoc service
 * @name vnToolboxCommonApp.vnAppRoute
 * @description
 * # vnAppRoute
 * Provider in the vnToolboxCommonApp.
 */
angular.module('Volusion.toolboxCommon')
	.provider('VnAppRoute', function () {

		// Private variables
		var currentRoute = 'test',
			newRoute = 'test';

		// Private constructor
		function VnAppRoute() {
			// Public API for configuration (available when provider is resolved by a route)
			this.updateRoute = function () {
				console.log('ok this is the in $get Function.');
				console.log('curRoute: ', currentRoute);
				console.log('prevRoute: ', newRoute);
			};

			this.VnAppRoute = function () {
				return this;
			};
		}

		// Public API for configuration (available in config phase)
		this.updateRoute = function () {
			console.log('ok this is in config phase.');
			console.log('curRoute: ', currentRoute);
			console.log('prevRoute: ', newRoute);
		};

		// Method for instantiating
		this.$get = function () {
			return new VnAppRoute();
		};
	});
