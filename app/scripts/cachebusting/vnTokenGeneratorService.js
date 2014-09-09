'use strict';
/**
 * @ngdoc service
 * @name Volusion.toolboxCommon:vnTokenGenerator
 *
 * @description
 * # vnTokenGenerator
 * The vnTokenGenerator service is used to generate a unique
 * token which can be used for cache busting
 *
 */

angular.module('Volusion.toolboxCommon')
	.factory('vnTokenGenerator', function () {

		function getCacheBustingToken() {
			return (new Date()).valueOf();
		}

		return {
			getCacheBustingToken: getCacheBustingToken
		};
	});
