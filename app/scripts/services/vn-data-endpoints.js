/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnDataEndpoint
 *
 * @property {String} firebase - A private property that is the url configured for
 * the firebase instance used by apps in WorkSpace and SiteBuilder.
 * @property {String} apibase - A private property that is the url configured for
 * the apibackend
 *
 * @description
 *
 * # vnDataEndpoint
 * Used by the vnDataSrc service to build on the firebase or apibase constant. Both
 * the firebase and apibase constants point to the appropriate backend for the app.
 * If you need to determine constant use vnConfig and vnSession services for that.
 *
 * ### Note:
 * This is a self invoking constant that returns an object that can refer to more
 * than one string. If you are generating a url with the apps api or firebase
 * endpoint this can help you. So fbUrl and apiRul are not methods.
 *
 * @example
 <doc:example>
    <doc:source>
        <script>
            var fBase = vnDataEndpoint.fbUrl;
             var aBase = vnDataPoint.apiUrl;

             console.log(fbase); // Will print: https://brilliant-fire-5600.firebaseio.com
             console.log(aBase); // Will print: http://www.samplestore.io/api/v1
        </script>
        <div>
            <p>var fBase = vnDataEndpoint.fbUrl;</p>
            <p>var aBase = vnDataPoint.apiUrl;</p>
        </div>
    </doc:source>
 </doc:example>
 *
 */
angular.module('Volusion.toolboxCommon')
    .constant('vnDataEndpoint', (function () {
        'use strict';
        var firebase = 'https://brilliant-fire-5600.firebaseio.com',
            apibase = 'http://www.samplestore.io/api/v1';
<<<<<<< HEAD
            //apibase = 'http://txlpt374-vm.corp.volusion.com/api/v1';
=======
//            apibase = 'http://txlpt374-vm.corp.volusion.com/api/v1';
>>>>>>> 930cbb82b5eb8425161e894ef9349ea2bf59d04c

        return {
            /**
             * @ngdoc method
             * @name fbUrl
             * @propertyOf Volusion.toolboxCommon.vnDataEndpoint
             * @returns {String} The string representing the base firebase url
             */
            fbUrl : firebase,
            /**
             * @ngdoc method
             * @name apiUrl
             * @propertyOf Volusion.toolboxCommon.vnDataEndpoint
             * @returns {String} The string representing the base firebase url
             */
            apiUrl: apibase
        };
    })()); // Dev Note: Notice the immediate invocation. This gives us a constant with two values.
