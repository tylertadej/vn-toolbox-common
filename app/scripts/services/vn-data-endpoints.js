/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnDataEndpoint
 *
 * @description
 *
 * # vnDataEndpoint
 * Used by the vnDataSrc service to build on the firebase or apibase variables. Both
 * will point to the appropriate backend for the app.
 * If you need to determine constant use vnConfig and vnSession services for that.
 *
 */
angular.module('Volusion.toolboxCommon')
	.provider('vnDataEndpoint', function () {

		'use strict';

		var firebase = 'https://brilliant-fire-5600.firebaseio.com',
			apibase = 'http://www.samplestore.io/api/v1';

		function VnDataEndpoint() {
			this.VnDataEndpoint = function () {
				return this;
			};

			/**
			 * @ngdoc method
			 * @name getFirebaseUrl
			 * @methodOf Volusion.toolboxCommon.vnDataEndpoint
			 * @returns {String} The string representing a Firebase resource
			 */
			this.getFirebaseUrl = function () {
				return firebase;
			};

			/**
			 * @ngdoc method
			 * @name getApiUrl
			 * @methodOf Volusion.toolboxCommon.vnDataEndpoint
			 * @returns {String} The string representing a API resource
			 */
			this.getApiUrl = function () {
				return apibase;
			};

		}

		// Method for instantiating
		this.$get = function () {
			return new VnDataEndpoint();
		};

		/**
		 * @ngdoc method
		 * @name setFirebaseUrl
		 * @methodOf Volusion.toolboxCommon.vnDataEndpoint
		 * @returns {String} Sets the string representing a Firebase resource
		 */
		this.setFirebaseUrl = function (path) {
			firebase = path;
		};

		/**
		 * @ngdoc method
		 * @name setApiUrl
		 * @methodOf Volusion.toolboxCommon.vnDataEndpoint
		 * @returns {String} Sets the string representing a API resource
		 */
		this.setApiUrl = function (path) {
			apibase = path;
		};

	});
