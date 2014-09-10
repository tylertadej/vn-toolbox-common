'use strict';

/**
 * @ngdoc service
 *
 * @name Volusion.toolboxCommon:vnSiteConfig
 *
 * @description
 * # vnSiteConfig
 * Site configuration service which gets the server side
 * configurations from the config API.
 *
 */

angular.module('Volusion.toolboxCommon')
	.service('vnSiteConfig', ['vnApi', '$q',
		function (vnApi, $q) {

			var siteConfig = {};

			siteConfig.getConfig = function () {
				var deferred = $q.defer();
				vnApi.Configuration().get().$promise
					.then(function (response) {
						deferred.resolve(response);
					});
				return deferred.promise;
			};

			return siteConfig;
		}]);
