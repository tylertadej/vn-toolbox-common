/*global angular */

angular
    .module('toolboxCommon', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'pascalprecht.translate',
        'angular-carousel'
    ])
    .config(
        ['$routeProvider', '$locationProvider', '$translateProvider', '$translatePartialLoaderProvider',
            function ($routeProvider, $locationProvider, $translateProvider, $translatePartialLoaderProvider) {

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

                $translatePartialLoaderProvider.addPart('main');
                $translateProvider.useLoader('$translatePartialLoader', {
                    urlTemplate: '/i18n/{part}/{lang}.json'
                });
                $translateProvider.preferredLanguage('es');
            }]
    );
