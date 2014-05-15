angular.module('Volusion.toolboxCommon', ['pascalprecht.translate', 'angular-carousel'])
    .config(
        ['$translateProvider',
            function ($translateProvider) {

                'use strict';

                $translateProvider.useLoader('$translatePartialLoader', {
                    urlTemplate: '/i18n/{part}/{lang}.json'
                });
            }]
    );
