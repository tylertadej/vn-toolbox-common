/**
 * @ngdoc service
 *
 * @name vnDataEndpoint
 *
 * @description
 * This is a constant with two base urls for generating firebase or api access.
 * Note in the code the file is named vn-data-endpoints (because there are more than one)
 * But in code I use it as thus: vnDataEndpoint.fbUrl
 *
 * @example
 *
 * - vnDataEndpoint.fbUrl  ->  https://brilliant-fire-5600.firebaseio.com
 * - vnDataEndpoint.apiUrl ->  http://www.samplestore.io/api/v1
 */

angular.module('Volusion.toolboxCommon')
    .constant('vnDataEndpoint', (function() {
        'use strict';
        var firebase = 'https://brilliant-fire-5600.firebaseio.com',
            apibase = 'http://www.samplestore.io/api/v1';

        return {
            fbUrl: firebase,
            apiUrl: apibase
        };
    })()); // Dev Note: Notice the immediate invocation. This gives us a constant with two values.
