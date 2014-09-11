'use strict';

/**
 * @ngdoc filter
 * @name Volusion.toolboxCommon:vnCacheBust
 *
 * @description
 * The `vnCacheBust` filter adds a cache busting token to the end of the
 * URL string passed in.
 *
 * @requires
 * vnTokenGenerator
 *
 * @usage
 * <a ng-href="foo.someUrl | vnCacheBust">Bar</a>
 *
 * @example
 */

angular.module('Volusion.toolboxCommon').filter('vnCacheBust', [
    'vnTokenGenerator',
    function (vnTokenGenerator) {


        function appendTokenToUrl(url) {
            if (!url || !url.trim()) {
                return url;
            }

            var separator = (url.indexOf('?') > -1) ? '&' : '?';
            return url + separator + '_=' + vnTokenGenerator.getCacheBustingToken();
        }

        return function (url) {
            return appendTokenToUrl(url);
        };
    }
]);
