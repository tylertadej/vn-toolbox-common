/*global angular */

angular.module('Volusion.toolboxCommon', [
//    'ngCookies',
//    'ngResource',
//    'ngSanitize',
    'ngRoute',
    'pascalprecht.translate',
    'angular-carousel'
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
