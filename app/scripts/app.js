/*global angular */

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

angular.module('Volusion.toolboxCommon', [
//    'ngCookies',
    'ngResource',
//    'ngSanitize',
    'ngRoute',
    'pascalprecht.translate',
    'angular-carousel',
    'firebase'
])
    .config(
        ['$routeProvider', '$locationProvider', '$translateProvider', '$translatePartialLoaderProvider',
            function ($routeProvider, $locationProvider, $translateProvider) {

                'use strict';

                $locationProvider.html5Mode(true);

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
