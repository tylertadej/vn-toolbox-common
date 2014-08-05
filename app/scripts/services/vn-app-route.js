'use strict';

/**
 * @ngdoc service
 * @name vnToolboxCommonApp.vnAppRoute
 * @description
 * # vnAppRoute
 * Provider in the vnToolboxCommonApp.
 */
angular.module('Volusion.toolboxCommon')
	.provider('vnAppRoute', function () {

		// Private variables
		var currentRoute = '',
			newRoute = '';

		// Private constructor
		function AppRoute() {
			this.AppRoute = function () {
				return this;
			};
		}

		// Public API for configuration
		this.updateRoute = function () {
			console.log('ok this is the openeing.');
			console.log('curRoute: ', currentRoute);
			console.log('prevRoute: ', newRoute);
		};

		// Method for instantiating
		this.$get = function () {
			return new AppRoute();
		};
	});
