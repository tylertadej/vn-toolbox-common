angular.module('Volusion.toolboxCommon.templates', []);
angular.module('Volusion.toolboxCommon', ['ngCookies', 'ngSanitize', 'pascalprecht.translate', 'ui.bootstrap', 'Volusion.toolboxCommon.templates'])
    .config(
        [ '$httpProvider', '$translateProvider',
            function ( $httpProvider, $translateProvider) {

                'use strict';

                $httpProvider.interceptors.push('vnHttpResponseInterceptor');

                var translationsEn = {
                        // Carousel
                        'VN-CAROUSEL-TITLE' : 'Inline Images:',

                        // Image
                        'VN-IMAGE-TITLE' : 'Image:',

                        // Rating
                        'VN-RATING-TITLE' : 'Rating:'
                    },
                    translationsEs = {
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
