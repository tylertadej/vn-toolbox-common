/**
 * @ngdoc overview
 * @module Volusion.toolboxCommon
 * @name Volusion.toolboxCommon
 * @description
 *
 * # Volusion.toolboxCommon
 *
 * ## Directives
 * The Volusion.toolboxCommon module is a set of directives to be used as
 * reusable components when building a Volusion theme. The directives are
 * designed to be used 'out-of-the-box' and coupled with the data service
 * a theme can be quickly build with real api data as well as maintain
 * compatability with Firebase.
 *
 * ## Data
 * Data Servivces should be used to retrieve, create, update and delete site
 * data. The data service is also context aware of it's environment and can
 * be configured for elevated permissions with proper authentication.
 *
 */

angular.module('Volusion.toolboxCommon.templates', []);
angular.module('Volusion.toolboxCommon', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'pascalprecht.translate',
    'firebase',
    'ui.bootstrap',
    'Volusion.toolboxCommon.templates'
])
    .config(
        ['$routeProvider', '$locationProvider', '$httpProvider', '$translateProvider',
            function ($routeProvider, $locationProvider, $httpProvider, $translateProvider) {

                'use strict';

//                $sceDelegateProvider.resourceUrlWhitelist([
//                    // Allow same origin resource loads.
//                    // Allow loading from our assets domain.  Notice the difference between * and **.
//                    'self',
//                    'http://www.samplestore.io/api/v1/**'
//                ]);
                $httpProvider.interceptors.push('vnHttpResponseInterceptor');

                $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller : 'MainCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });

                var translationsEn = {
                        // Main - SHOULD BE REMOVED IN 'DIST' **************
                        'TEST_VAR' : 'This is a English test text.',
                        'CURRENT_LANG_CODE' : 'en',
                        'VN-GOOGLE-LINK' : 'Go to Google',
                        'VN-YAHOO-LINK' : 'Go to Yahoo',
                        // *************************************************

                        // Carousel
                        'VN-CAROUSEL-TITLE' : 'Inline Images:',

                        // Image
                        'VN-IMAGE-TITLE' : 'Image:',

                        // Rating
                        'VN-RATING-TITLE' : 'Rating:'
                    },
                    translationsEs = {
                        // Main - SHOULD BE REMOVED IN 'DIST' **************
                        'TEST_VAR' : 'Este es un texto de prueba Inglés.',
                        'CURRENT_LANG_CODE' : 'es',
                        'VN-GOOGLE-LINK' : 'Ir a Google',
                        'VN-YAHOO-LINK' : 'Ir a Yahoo',
                        // *************************************************

                        // Carousel
                        'VN-CAROUSEL-TITLE' : 'Imágenes',

                        // Image
                        'VN-IMAGE-TITLE' : 'Imáge:',

                        // Rating
                        'VN-RATING-TITLE' : 'Clasificación'
                    };

                $translateProvider
                    .translations('en', translationsEn)
                    .translations('es', translationsEs)
                    .preferredLanguage('en');
            }]
    );
