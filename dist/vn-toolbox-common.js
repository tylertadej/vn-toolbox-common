
/*! vn-toolbox-common - ver.0.0.2 (2014-05-21) */

angular.module('Volusion.toolboxCommon', ['pascalprecht.translate', 'angular-carousel'])
    .config(
        ['$translateProvider',
            function ($translateProvider) {

                'use strict';

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
                        imageList: '='
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
                    }
                };
            }])
    .run(['$templateCache', function ($templateCache) {
        'use strict';

        $templateCache.put(
            'template/carousel.html',
            '<div>' +
                '<div class="vn-carousel">' +
                    '<!-- not happy with this but it seems better than angular-ui carousel' +
                    'http://blog.revolunet.com/angular-carousel/ -->' +
                    '<p translate="VN-CAROUSEL-TITLE">Images:</p>' +

                    '<ul rn-carousel rn-carousel-buffered rn-carousel-indicator rn-carousel-control  class="-carousel ng-cloak">' +
                        '<li ng-repeat="image in imageList" ng-style="{\'background-image\': \'url(\' + image.src + \')\'}"></li>' +
                    '</ul>' +
                    '<div class="-thumbs ng-cloak">' +
                        '<div class="thumb" ng-repeat="image in imageList" ' +
                                           'ng-click="$parent.slideIndex2=$index" ' +
                                           'ng-style="{\'background-image\': \'url(\' + image.src + \')\'}" ' +
                                           'ng-class="{\'is-active\': ($parent.slideIndex2==$index)}">' +
                        '</div>' +
                    '</div>' +

                '</div>' +
            '</div>'
        );
    }]);

angular.module('Volusion.toolboxCommon')
    .directive('vnImage',
        ['$rootScope',
            function ($rootScope) {
                'use strict';

                return {
                    templateUrl: 'template/image.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope      : {
                        currMode : '@currMode',
                        image    : '='
                    },
                    link       : function postLink(scope, element) {
                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        // Component constants *****************
                        scope.componentId = '100002';
                        scope.componentName = 'image';
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
                    }
                };
            }])
    .run(['$templateCache', function ($templateCache) {

        'use strict';

        $templateCache.put(
            'template/image.html',
            '<div>' +
                '<div class="vn-image">' +
                    '<p translate>VN-IMAGE-TITLE</p>' +
                    '<img src="{{ image.src }}" alt="{{ image.alt }}" />' +
                '</div>' +
            '</div>'
        );
    }]);

angular.module('Volusion.toolboxCommon')
    .directive('vnLink',
        ['$rootScope',
            function ($rootScope) {
                'use strict';

                return {
                    templateUrl: 'template/link.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope      : {
                        currMode : '@currMode',
                        link     : '='
                    },
                    link       : function postLink(scope, element) {
                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        // Component constants *****************
                        scope.componentId = '100003';
                        scope.componentName = 'link';
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
                    }
                };
            }])
    .run(['$templateCache', function ($templateCache) {

        'use strict';

        $templateCache.put(
            'template/link.html',
            '<div>' +
                '<div class="vn-link">' +
                    '<a href="{{ link.href }}" target="{{ link.target }}">{{ link.text }}</a>' +
                '</div>' +
            '</div>'
        );
    }]);

angular.module('Volusion.toolboxCommon')
    .directive('vnRating',
        ['$rootScope',
            function ($rootScope) {
                'use strict';

                return {
                    templateUrl: 'template/rating.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope      : {
                        currMode   : '@currMode',
                        ratingValue: '=',
                        readonly   : '@'
                    },
                    link       : function postLink(scope, element) {

                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        // Component constants *****************
                        scope.componentId = '100004';
                        scope.componentName = 'rating';
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

                        var idx,
                            max = 5;

                        function updateStars() {
                            scope.stars = [];
                            for (idx = 0; idx < max; idx++) {
                                scope.stars.push({filled: idx < scope.ratingValue});
                            }
                        }

                        scope.$watch('ratingValue', function (oldVal, newVal) {
                            if (newVal) {
                                updateStars();
                            }
                        });

                        scope.toggle = function (index) {
                            if (scope.readonly && scope.readonly === 'true') {
                                return;
                            }

                            scope.ratingValue = index + 1;
                        };
                    }
                };
            }])
    .run(['$templateCache', function ($templateCache) {

        'use strict';

        $templateCache.put(
            'template/rating.html',
            '<div>' +
                '<div class="vn-rating">' +
                    '<!-- not happy with this but it seems better than angular-ui carousel' +
                        'http://blog.revolunet.com/angular-carousel/ -->' +
                    '<p translate>VN-RATING-TITLE</p>' +
                    '<ul class="rating">' +
                        '<li ng-repeat="star in stars" class="tick" ng-class="star" ng-click="toggle($index)">' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
        );
    }]);
