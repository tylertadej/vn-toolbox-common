/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnHttpResponseInterceptor
 * @requires $q
 * @requires $rootScope
 * @description
 *
 * # vnHttpResponseInterceptor
 * This service is added as an interceptor to the $http module. This intercepts
 * the $http service and provides response and responseError handlers. If there
 * is a response error, it emits an event on the $rootScope with the key VN_HTTP_ERROR.
 * Any module using the `Volusion.toolboxCommon` module can add an event listener on the
 * $rootScope and take necessary action. The second parameter of the event listener
 * function contains the response status and data / message.
 *
 * @example
 *
 *  $rootScope.$on('VN_HTTP_ERROR', function(event, err) {
 *     // Logic to display error to user
 *  });
 *
 */
'use strict';

angular.module('Volusion.toolboxCommon')
    .factory('vnHttpResponseInterceptor', ['$q', '$rootScope', function($q, $rootScope) {

        return {
            response: function(response) {
                // response.status === 200
                return response || $q.when(response);
            },
            responseError: function(rejection) {

                if(rejection.status === 500) {
                    $rootScope.$emit('VN_HTTP_500_ERROR', { status: rejection.status, message: rejection.data, resource: rejection.headers('resource') || '' });
                }

                return $q.reject(rejection);
            }
        };

    }]);