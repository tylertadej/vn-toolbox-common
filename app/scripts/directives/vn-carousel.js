/*global angular,$ */

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnCarousel
 * @restrict EA
 * @requires $rootScope
 * @scope
 * @description
 *
 * Replace the element with carousel's html markup. Accepts image list as array of objects
 *
 * @usage
    <div vn-carousel image-list="imageList"></div>

    -OR-------------------------------------

    <vn-carousel image-list="imageList"></vn-carousel>
 *
 *
 * @example
     <example module="Volusion.toolboxCommon" deps="">
        <file name="toolbox.js" src="https://raw.githubusercontent.com/volusion-angular/vn-toolbox-common/master/dist/vn-toolbox-common.js?token=2973530__eyJzY29wZSI6IlJhd0Jsb2I6dm9sdXNpb24tYW5ndWxhci92bi10b29sYm94LWNvbW1vbi9tYXN0ZXIvZGlzdC92bi10b29sYm94LWNvbW1vbi5qcyIsImV4cGlyZXMiOjE0MDE5MDIxNTN9--cab7a2826771ca99b3c8c2c8ca883038756d8ef3"></file>
        <file name="script.js">
            angular.module('Volusion.toolboxCommon', [])
                .controller('CarouselCtrl',
                    function ($scope) {

                        $scope.imageList = [
                            {src: 'http://lorempixel.com/450/300/people/0', alt: 'Random image'},
                            {src: 'http://lorempixel.com/450/300/people/1', alt: 'Random image'},
                            {src: 'http://lorempixel.com/450/300/people/2', alt: 'Random image'},
                            {src: 'http://lorempixel.com/450/300/people/3', alt: 'Random image'}
                        ];

                    });
        </file>
        <file name="index.html">
            <div ng-controller="CarouselCtrl">
                <vn-carousel image-list="imageList"></vn-carousel>
            </div>
        </file>
     </example>
 */

angular.module('Volusion.toolboxCommon')
    .directive('vnCarousel',
        ['$rootScope',
            function ($rootScope) {

                'use strict';

                return {
                    templateUrl: 'template/carousel.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope: {
                        currMode: '@currMode',
                        carouselObjects: '='
                    },
                    link       : function postLink(scope, element) {
                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        // Component constants *****************
                        scope.componentId = '100001';
                        scope.componentName = 'carousel';
                        // *************************************

                        // Component is not selected by default
                        scope.selected = false;

                        scope.$on('currentComponent.change', function (event, component) {
                            if (component && component.id && scope.currMode === 'off') {
                                scope.selected = (component.id === scope.componentId);
                            }
                        });

                        element.on('click', function (event) {
                            // if in EDIT mode
                            if (scope.currMode === 'off') {
                                event.preventDefault();
                                $rootScope.$broadcast('currentComponent.change', {'id': scope.componentId, 'name': scope.componentName, 'action': 'set'});
                            }
                        });

//                        Initialize the slider
//                        element.carousel({
//                            interval: 5000,
//                            pause: 'hover',
//                            wrap: true
//                        });
                    $('.carousel').carousel({
                        interval: 5000,
                        pause: 'hover',
                        wrap: true
                    });

                        scope.prev = function() {
                    $('.carousel').carousel('prev');
//                            element.carousel('prev');
                        };

                        scope.next = function() {
//                            element.carousel('next');
                    $('.carousel').carousel('next');
                        };
                    }
                };
            }])
    .run(['$templateCache', function ($templateCache) {
        'use strict';

        $templateCache.put(
            'template/carousel.html',
            '<div id="vnCarousel" class="carousel slide" data-ride="carousel">' +
                '<!-- Indicators -->' +
                '<ol class="carousel-indicators">' +
                    '<li ng-repeat="image in imageList" data-target="#vnCarousel" data-slide-to="{{ $index }}"></li>' +
                '</ol>' +
                '<div ng-repeat="image in imageList" class="carousel-inner">' +
                    '<div class="item active">' +
                        '<img data-src="" alt="First slide" src="{{ image.src }}">' +
                        '<div class="container">' +
                            '<h1>Example headline.</h1>' +
                            '<p>Note: If you\'re viewing this page via a <code>file://</code> URL, the "next" and "previous"  might not load/display properly.</p>' +
                            '<p><a class="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>' +
                        '</div>' +
                    '</div>' +
                    '<a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>' +
                    '<a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
                '</div>'+
            '</div>'
        );
    }]);


