/*! vn-toolbox-common - ver.0.0.2 (2014-06-10) */

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
            '</div>'
        );
    }]);

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnImage
 * @restrict EA
 * @requires $rootScope
 * @scope
 * @description
 *
 * Replace the element with image's html markup.Accepts image as object
 *
 * <pre>
 *      $scope.image = {
 *          src: 'http://lorempixel.com/450/300/people/0',
 *          alt: 'Random people image'
 *      },
 * </pre>
 *
 * @usage
 <div vn-image image="image"></div>

 -OR-------------------------------------

 <vn-image image="imageList[2]"></vn-image>
 *
 * @example
     <example module="app">
        <file name="script.js">
             angular.module('app', [])
                 .controller('ImageCtrl',
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
             <div ng-controller="ImageCtrl">
                <vn-image image="imageList[2]" />
             </div>
         </file>
     </example>
 */

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
            '<div class="vn-image">' +
                '<p translate>VN-IMAGE-TITLE</p>' +
                '<img src="{{ image.src }}" alt="{{ image.alt }}" />' +
            '</div>'
        );
    }]);

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnLink
 * @restrict EA
 * @requires $rootScope
 * @scope
 *
 * @description
 *
 * Replace the element with anchor and transcluded caption.
 *
 * **Note:** If target is not specified if will be set to "_SELF"
 *
 * @usage
 <a
    vn-link
    href="{{ PATH_TO }}"
    target="{{ _self || _blank || _top">
        {{ LINK_CAPTION | translated }}
 </a>

 -OR-------------------------------------

 <vn-link
    href="{{ PATH_TO }}"
    target="{{ _self || _blank || _top">
        {{ LINK_CAPTION | translated }}
 </vn-link>
 *
// * @example
// *<a vn-link href="http://www.yahoo.com" target="_self">Go to Yahoo</a>
 *
 * @example
     <example module="app">
         <file name="script.js">
             angular.module('app', [])
                 .controller('LinkCtrl',
                    function ($scope) {

                        $scope.pathTo = 'http://www.yahoo.com';

                    });
         </file>
         <file name="index.html">
             <div ng-controller="LinkCtrl">
                <vn-link href="pathTo">Go to Yahoo</vn-link>
             </div>
         </file>
     </example>
 */

angular.module('Volusion.toolboxCommon')
    .directive('vnLink',
        ['$rootScope',
            function ($rootScope) {
                'use strict';

                return {
                    templateUrl: 'template/link.html',
                    restrict   : 'EA',
                    transclude : true,
                    replace    : true,
                    scope      : {
                        currMode : '@'
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
            '<a class="vn-link" ng-transclude></a>'
        );
    }]);

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnNav
 * @restrict EA
 * @requires $rootScope
 * @scope
 * @description
 *
 * Replace the element with navbar's html markup. Accepts categoryList as array of objects
 *
 * @usage
 <div vn-nav category-list="categoryList" callback-fn="alert('Item selected')"></div>

 -OR-------------------------------------

 <vn-nav category-list="categoryList"></vn-nav>
 *
 *
 * @example
     <example module="Volusion.toolboxCommon" deps="">
         <file name="script.js">
             angular.module('Volusion.toolboxCommon', [])
                .controller('NavCtrl',
                    function ($scope) {

                        $scope.categoryList = [
                            {name : 'Apparel',
                                subCategories: [
                                    {id: 123, name : 'Women'},
                                    {id: 234, name : 'Men'}
                                ]},
                            {name : 'Home decor',
                                subCategories: [
                                    {id: 123, name : 'Furniture'},
                                    {id: 234, name : 'Home Accessories'}
                                ]},
                            {name : 'Beauty',
                                subCategories: [
                                    {id: 123, name : 'Bath and Body'},
                                    {id: 234, name : 'Hair Care'}
                                ]},
                            {name : 'Gourmet food',
                                subCategories: [
                                    {id: 123, name : 'Speciality Items'},
                                    {id: 234, name : 'Sweets'}
                                ]}
                        ];

                    });
         </file>
         <file name="index.html">
             <div ng-controller="NavCtrl">
                <vn-nav category-list="categoryList"></vn-nav>
             </div>
         </file>
     </example>
 */

angular.module('Volusion.toolboxCommon')
    .directive('vnNav',
        ['$rootScope',
            function ($rootScope) {

                'use strict';

                return {
                    templateUrl: 'template/navbar.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope      : {
                        currMode     : '@currMode',
                        categoryList : '='
                    },
                    link       : function postLink(scope, element) {
                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        // Component constants *****************
                        scope.componentId = '100005';
                        scope.componentName = 'navbar';
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
            'template/navbar.html',
            '<div class="collapse navbar-collapse " id="th-main-menu" data-ng-class="!navCollapsed && \'in\'" data-ng-click="navCollapsed=true">' +
                '<ul class="nav navbar-nav">' +
                    '<li class="dropdown" data-ng-repeat="category in categoryList">' +
                        '<a href class="dropdown-toggle th-dropdown-toggle" data-toggle="dropdown">{{category.name}}</a>' +
                        '<ul class="dropdown-menu" data-ng-if="category.subCategories.length">' +
                            '<li data-ng-repeat="subCategory in category.subCategories">' +
                                '<a ng-href="#/category/{{ subCategory.id }}">{{subCategory.name}}</a>' +
                            '</li>' +
                        '</ul>' +
                    '</li>' +
                '</ul>' +
            '</div>'
        );
    }]);

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnRating
 * @restrict EA
 * @requires $rootScope
 * @scope
 * @description
 *
 * Replace the element with rating's html markup.Accepts ratingValue as Integer and readonly as expression
 *
 * **Note:** If readonly attribute is not specified "FALSE" will be assumed
 *
 * @usage
 <div vn-rating rating-value="{{ VALUE }}"></div>

 -OR-------------------------------------

 <vn-rating rating-value="{{ VALUE }}" data-readonly="{{ BOOLEAN }}"></vn-rating>
 *
 * @example
     <example module="app">
         <file name="script.js">
             angular.module('app', [])
                .controller('RatingCtrl',
                    function ($scope) {

                        $scope.ratingValue = 3;

                    });
         </file>
         <file name="index.html">
             <div ng-controller="LinkCtrl">
                <vn-rating rating-value="ratingValue"></vn-rating>
             </div>
         </file>
     </example>
 */

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

                        if (scope.ratingValue === undefined || scope.ratingValue === '') {
                            scope.ratingValue = 0;
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

                        scope.stars = [];

                        function updateStars() {
                            scope.stars = [];
                            for (idx = 0; idx < max; idx++) {
                                scope.stars.push({filled: idx < scope.ratingValue});
                            }
                        }

                        scope.$watch('ratingValue', function (oldVal, newVal) {
                            if (newVal === 0 || newVal) {
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
            '<div class="vn-rating">' +
                '<!-- not happy with this but it seems better than angular-ui carousel' +
                    'http://blog.revolunet.com/angular-carousel/ -->' +
                '<p translate>VN-RATING-TITLE</p>' +
                '<ul class="rating">' +
                    '<li ng-repeat="star in stars" class="tick" ng-class="star" ng-click="toggle($index)">' +
                    '</li>' +
                '</ul>' +
            '</div>'
        );
    }]);

angular.module('Volusion.toolboxCommon')
    .value('vnApiArticles', {});

angular.module('Volusion.toolboxCommon')
    .value('vnApiCarts', {});

angular.module('Volusion.toolboxCommon')
  .value('vnApiCategories', {});

angular.module('Volusion.toolboxCommon')
    .value('vnApiConfigurations', {});

angular.module('Volusion.toolboxCommon')
    .value('vnApiNavs', {});

angular.module('Volusion.toolboxCommon')
    .value('vnApiProducts', {});

angular.module('Volusion.toolboxCommon')
    .factory('vnApi', ['$resource', 'vnDataEndpoint', function ($resource, vnDataEndpoint) {
        'use strict';


        /**
         * @ngdoc method
         * @name Article
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Article function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Article(params) {

            if (!params) {
                // Handle configuring the $resource appropriately for the articles endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Article Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/articles');
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/articles');
            }

        }


        /**
         * @ngdoc method
         * @name Category
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Category function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Category(params) {

            if (!params) {
                // Handle configuring the $resource appropriately for the category endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Category Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/categories');
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/categories');
            }

        }

        /**
         * @ngdoc method
         * @name Cart
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Cart function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Cart(params) {

            if (!params) {
                // Handle configuring the $resource appropriately for the cart endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Cart Call. That\'s ok for dev though.');
                return $resource();
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/carts');
            }

        }

        /**
         * @ngdoc method
         * @name Configuration
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Configuration function returns a
         * $resource promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Configuration(params) {

            if (!params) {
                // Handle configuring the $resource appropriately for the configuration endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Configuration Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/config');
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/config');
            }

        }

        /**
         * @ngdoc method
         * @name Country
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Country function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Country(params) {

            if (!params) {
                return $resource(vnDataEndpoint.apiUrl + '/countries');
            } else {
                // Handle configuring the $resource appropriately for the country endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Country Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/countries');
            }

        }

        /**
         * @ngdoc method
         * @name Nav
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Nav function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */
        function Nav(params) {

            if (!params) {
                // Handle configuring the $resource appropriately for the nav endpoint.
                // Dev IDEA is to use a private function to handle this business logic
                console.log('vnApi - no params for Nav Call. That\'s ok for dev though.');
                return $resource(vnDataEndpoint.apiUrl + '/navs');
            } else {
                return $resource(vnDataEndpoint.apiUrl + '/navs');
            }

        }

        /**
         * @ngdoc method
         * @name Product
         * @methodOf Volusion.toolboxCommon.vnApi
         * @param {Object} params a key value object of the params needed to manage the request
         * @returns {$resource} $resource A $resource promise that resolves the the results of
         * the request.
         *
         * @description
         * Given an object (or nothing for full list) the Product function returns a $resource
         * promise that resolves to the Volusion API endpoint for the configured site.
         */

        function Product(params) { // jshint ignore:line
            /**
             * Since the params is referenced in a string later, we tell jshint to ignore the fact that it's not 'used'
             * in the code.
             */
            return $resource(vnDataEndpoint.apiUrl + '/products',
                {
                    categoryId: '@params.categoryId',
                    filter    : '@params.filter',
                    facets    : '@params.facets',
                    pageNumber: '@params.pageNumber',
                    pageSize  : '@params.pageSize'
                });
        }

        return {
            Article      : Article,
            Category     : Category,
            Cart         : Cart,
            Configuration: Configuration,
            Country      : Country,
            Nav          : Nav,
            Product      : Product
        };
    }]);

angular.module('Volusion.toolboxCommon')
    .factory('vnConfig', ['$q', '$rootScope', function ($q, $rootScope) {

        'use strict';

        var account,
            apiToken,
            apiUrl,
            context,
            currentAction = 'designAction',  // Start them here but if conf is persisted turn this into a function.
            firebaseToken,
            firebaseUrl,
            globalAttrBucketState = true,    // Show the app attributes by default.
            globalNavState = true,           // Show the app navigation by default.
            iFramePathBase,
            previewMode = false,             // Initial edit/preview mode
            screenMode = 'desktop',          // Initial screen mode.
            workspaceDimensions = {          // Initial height (use in Action section ... etc.)
                width : 0,
                height: 0
            };

        /**
         * @ngdoc method
         * @name getFirebaseUrl
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @returns {String} The string representing a Firebase resource
         */
        function getFirebaseUrl() {
            return firebaseUrl;
        }


        /**
         * @ngdoc method
         * @name initConfig
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @description
         *
         * Used in development as a mocking method to bootstrap with assumptions.
         * It sets up the dynamic configuration attributes for the app that prolly return from
         * and unknown api call at this point so we can use these properties: iframe url base,
         * firebase url, etc ...
         */
        function initConfig() {

            var mockResponse = {
                api     : 'http://www.samplestore.io/api/v1',
                account : 'asdf123',
                context : 'SiteBuilder',
                firebase: 'https://brilliant-fire-5600.firebaseio.com',
                fbToken : ']idk - this comes from node server[',
                apiToken: ']idk - how do I know if I am logging into edit[',
                sandbox : 'http://localhost:8080'
            };

            //Simulate a admin login response
            account = mockResponse.account;
            apiToken = mockResponse.apiToken;
            apiUrl = mockResponse.api;
            context = mockResponse.context;
            iFramePathBase = mockResponse.sandbox;
            firebaseToken = mockResponse.fbToken;
            firebaseUrl = mockResponse.firebase;

            if (mockResponse && mockResponse.apiToken) {
                $rootScope.$broadcast('vnSession.init', mockResponse);
            }
        }

        /**
         * @ngdoc method
         * @name getAccount
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @return {String} account is the string representing the configured account.
         *
         * @description
         *
         * Gets the account configured. Initial use was in generating Firebase urls.
         */
        function getAccount() {

            return account;
        }

        /**
         * @ngdoc method
         * @name getIframePathBase
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @return {String} the string pointing to the Volusion base Volusion API.
         *
         * @description
         *
         * # getIframePathBase
         * Gets the account configured. Initial use was in generating the API urls.
         *
         */
        function getIframePathBase() {
            if ('' === iFramePathBase) {
                initConfig();
            }
            return iFramePathBase;
        }

        /**
         * @ngdoc method
         * @name getGlobalNavState
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @return {Boolean} globalNavState = true: show the nav bar on left side of SiteBuilder
         *
         * @description
         *
         * # getGlobalNavState
         * Return the current state of the SiteBuilder app navigation directive.
         *
         */
        function getGlobalNavState() {
            return globalNavState;
        }

        /**
         * @ngdoc method
         * @name setGlobalNavState
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @param {Boolean} state - pass true to show the app navigation directive.
         *
         * @description
         *
         * Sets the globalNavState to the value passed in as a param. It $broadcasts a system
         * wide message: vlnGlobalNavState.change with the param.
         */
        function setGlobalNavState(state) {
            globalNavState = state;
            $rootScope.$broadcast('vlnGlobalNavState.change', { state: state });
        }

        /**
         * @ngdoc method
         * @name setCurrentAction
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @param {String} action - one of 'pageAction' or 'designAction'
         *
         * @description
         *
         * Set the app action to the param passed in and broadcast that change to the system.
         */
        function setCurrentAction(action) {
            currentAction = action;
            $rootScope.$broadcast('vlnCurrentAction.change', {action: action });
        }

        /**
         * @ngdoc method
         * @name getCurrentAction
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @return {String} currentAction
         *
         * @description
         *
         * Returns the vnConfig property value for currentAction
         */
        function getCurrentAction() {
            return currentAction;
        }

        /**
         * @ngdoc method
         * @name getGlobalAttrBucketState
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @return {Boolean} globalAttrBucketState
         *
         * @description
         *
         * Returns the vnConfig property vlaue for globalAttrBucketState
         */
        function getGlobalAttrBucketState() {
            return globalAttrBucketState;
        }

        /**
         * @ngdoc method
         * @name setGlobalAttrBucketState
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @param {Boolean} state - true shows the AttrBucket Editor directive in SiteBuilder UI
         *
         * @description
         *
         * Sets the setGlobalAttrBucketState property for the vnCOnfig object to the value
         * passed in as the state param. It broadcasts the vlnGlobalAttrBucketState.change
         * notification.
         */
        function setGlobalAttrBucketState(state) {
            globalAttrBucketState = state;
            $rootScope.$broadcast('vlnGlobalAttrBucketState.change', { state: state });
        }

        /**
         * @ngdoc method
         * @name getScreenMode
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @return {String} screenMode
         *
         * @description
         *
         * Return the vnConfig property value of screenMode.
         */
        function getScreenMode() {
            return screenMode;
        }

        /**
         * @ngdoc method
         * @name setScreenMode
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @param {Boolean} mode - true enables preview mode / false enabled edit mode.
         * @description
         *
         * Set the vnConfig property screenMode to the value of the mode param passed in.
         */
        function setScreenMode(mode) {
            screenMode = mode;
        }

        /**
         * @ngdoc method
         * @name getPreviewMode
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @return {String} 'on' OR 'off' - is the output fromthe function.
         *
         * @description
         *
         * Use Boolean value of vnProperty previewMode to decide which string to return.
         */
        function getPreviewMode() {
            return previewMode ? 'on' : 'off';
        }

        /**
         * @ngdoc method
         * @name setPreviewMode
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @param {String} mode - Can be one of 'desktop', '?tablet?' or '?phone?'
         *
         * @description
         *
         * Set the preview mode for the iframe by updating the vnConfig property to the value
         * passed in with mode param.
         */
        function setPreviewMode(mode) {
            previewMode = mode;
        }

        /**
         * @ngdoc method
         * @name getWorkspaceDimensions
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @return {String} workspaceDimensions
         *
         * @description
         *
         * Return the current value of the vnConfig property workspaceDimensions.
         */
        function getWorkspaceDimensions() {
            return workspaceDimensions;
        }

        /**
         * @ngdoc method
         * @name setWorkspaceDimensions
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @param {Object} d - an object with two properties d.width & d.height
         *
         * @description
         *
         * Takes an object with width and height properties and sets the vnConfig
         * workspaceDimension values for height and width.
         */
        function setWorkspaceDimensions(d) {

            if(d && d.width && d.height) {
                workspaceDimensions.height = d.height;
                workspaceDimensions.width = d.width;
                return;
            }
            throw new Error('Unable to set workspace dimensions.');


        }

        // Public API here
        return {
            getAccount              : getAccount,
            getGlobalNavState       : getGlobalNavState,
            setGlobalNavState       : setGlobalNavState,
            getCurrentAction        : getCurrentAction,
            setCurrentAction        : setCurrentAction,
            getGlobalAttrBucketState: getGlobalAttrBucketState,
            setGlobalAttrBucketState: setGlobalAttrBucketState,
            getIframePathBase       : getIframePathBase,
            initConfig              : initConfig,
            getFirebaseUrl          : getFirebaseUrl,
            getScreenMode           : getScreenMode,
            setScreenMode           : setScreenMode,
            getPreviewMode          : getPreviewMode,
            setPreviewMode          : setPreviewMode,
            getWorkspaceDimensions  : getWorkspaceDimensions,
            setWorkspaceDimensions  : setWorkspaceDimensions
        };
    }]);

angular.module('Volusion.toolboxCommon')
    .constant('vnDataEndpoint', (function () {
        'use strict';
        var firebase = 'https://brilliant-fire-5600.firebaseio.com',
            apibase = 'http://www.samplestore.io/api/v1';

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

angular.module('Volusion.toolboxCommon')
    .factory('vnDataSrc', ['$q', 'vnEnvironment', 'vnApi', 'vnFirebase', 'vnApiArticles', 'vnApiCategories', 'vnApiProducts',
        function ($q, vnEnvironment, vnApi, vnFirebase, vnApiArticles, vnApiCategories, vnApiProducts) {
            'use strict';

            /**
             * @ngdoc property
             * @name environmentContext
             * @property {Object} environmentContext
             * @propertyOf Volusion.toolboxCommon.vnDataSrc
             *
             * @description
             * A Volusion.toolboxCommon value that can be set to the app/theme
             * environment
             */
            var environmentContext = vnEnvironment;

            /**
             * @ngdoc function
             * @name getContextFn
             * @methodOf Volusion.toolboxCommon.vnDataSrc
             * @return {Value} environmentContext The Value service for the app that sets the
             * environment to SiteBuilder, WorkSpace or Production.
             *
             * @description
             * return the environmentContext property configured for the app.
             *
             */
            function getContextFn() {

                return environmentContext;

            }

            /**
             * @ngdoc function
             * @name getArticles
             * @methodOf Volusion.toolboxCommon.vnDataSrc
             * @return {Object} Either a $firebase object with article items or an api response
             * modified to look almost like a $firebase object
             *
             * @description
             * Uses the environmentContext and determines where to get data from. If data is from the api
             * the data response gets modified to make it look more like a $firebase object.
             *
             */
            function getArticles() {
                if ('Production' !== environmentContext) {
                    return vnFirebase.getFirebaseData('articles');  // is an object
                } else {
                    vnApi.Article().get()
                        .$promise.then(function (results) {
                            angular.forEach(results.data, function (r) {
                                var aid = r.id;
                                vnApiArticles[aid] = r;
                            });
                            console.log('vds apiprods: ', vnApiArticles);
                        });
                    return vnApiArticles;
                }
            }

            /**
             * @ngdoc function
             * @name getCategories
             * @methodOf Volusion.toolboxCommon.vnDataSrc
             * @return {Object} Either a $firebase object with article items or an api response
             * modified to look almost like a $firebase object
             *
             * @description
             * Uses the environmentContext and determines where to get data from. If data is from the api
             * the data response gets modified to make it look more like a $firebase object.
             *
             */
            function getCategories() {
                if ('Production' !== environmentContext) {
                    return vnFirebase.getFirebaseData('categories');
                } else {
                    vnApi.Category().get()
                        .$promise.then(function (results) {
                            angular.forEach(results.data, function (r) {
                                var cid = r.id;
                                vnApiCategories[cid] = r;
                            });
                        });
                    return vnApiCategories;
                }
            }

            /**
             * @ngdoc function
             * @name getProducts
             * @param {String} dataKey is the name of the key to access the results in the vnApiProducts value service
             * @param {Object} queryParams is the object og key/value query params passed to the vnApi service $resource generator.
             * @methodOf Volusion.toolboxCommon.vnDataSrc
             * @return {Object} Either a $firebase object with article items or an api response
             * modified to look almost like a $firebase object
             *
             * @description
             * Uses the environmentContext and determines where to get data from. If data is from the api
             * the data response gets modified to make it look more like a $firebase object.
             *
             */

            // http://volusion.apiary-mock.com/api/v1/products/?categoryId=10&filter=featured&facets=1822,1818,1829&pageNumber=1&pageSize=10
            function getProducts(dataKey, queryParams) {

                if ('Production' !== environmentContext) {
                    return vnFirebase.getFirebaseData('products');
                } else {
//                    console.log('setting product for dataKey', dataKey);
                    vnApiProducts[dataKey] = {};
                    vnApi.Product(queryParams).get(queryParams)
                        .$promise.then(function (results) {
                            angular.forEach(results.data, function (r) {
                                var pid = r.id;
                                vnApiProducts[dataKey][pid] = r;
                            });
                        });
//                    console.log('vnDataSrc vnApiProducts: ', vnApiProducts);
                    return vnApiProducts;
                }
            }

            return {
                getArticles  : getArticles,
                getCategories: getCategories,
                getContext   : getContextFn,
                getProducts  : getProducts
            };
        }]);

'use strict';

angular.module('Volusion.toolboxCommon')
//    .value('vnEnvironmentContext', 'SiteBuilder');  // can be overwritten later to be 'WorkSpace' or 'Production'
    .value('vnEnvironment', 'Production');  // can be overwritten later to be 'WorkSpace' or 'Production'

/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnFirebase
 * @requires vnConfig
 * @requires vnDataEndpoint
 * @requires $firebase
 * @description
 *
 * # vnFirebase
 * This is a service to manage the data flow into and out of the firebase service when
 * an app is in either the SiteBuilder or WorkSpace environment. It can generate $firebase
 * reverence objects, sync data from the api into firebase and sync data from firebase back
 * to the api as well as reseting the accounts firebase with data for a new session.
 *
 */

angular.module('Volusion.toolboxCommon')
    .factory('vnFirebase', ['vnConfig', 'vnDataEndpoint', '$firebase',
        function (vnConfig, vnDataEndpoint, $firebase) {
            'use strict';

            var fbItems = {
                articles   : '/account_articles',
                carts      : '/account_carts',
                categories : '/account_categories',
                config     : '/account_config',
                countries  : '/accounts_countries',
                navs       : '/account_navs',
                products   : '/account_products',
                sitebuilder: '/account_sitebuilder'
            };

            /**
             * @ngdoc method
             * @name getFirebaseData
             * @methodOf Volusion.toolboxCommon.vnFirebase
             * @param {String} path is the string path to a Firebase Item
             * @returns {$firebase} $firebase Reference to the firebase reference for the
             * given path.
             *
             * @description
             * Takes a string path for a Firebase item and created a $firebase reference for
             * one of the
             */
            function getFirebaseData(path) {

                if (path && 'string' === typeof path) {
                    return $firebase(new Firebase(vnDataEndpoint.fbUrl + fbItems[path] + '/' + vnConfig.getAccount() + '/'));
                } else {
                    throw new Error('vnFirebase.getFirebaseData function failed.');
                }

            }

            /**
             * @ngdoc method
             * @name generatePath
             * @methodOf Volusion.toolboxCommon.vnFirebase
             * @param {String} path A string path to the Firebase item that we want to create
             * a Firebase resource to.
             * @returns {String} Directly returns the string created inline.
             */
            function generatePath(path) {

                if (path && 'string' === typeof path) {
                    return vnDataEndpoint.fbUrl + fbItems[path] + '/' + vnConfig.getAccount() + '/';
                } else {
                    throw new Error('vnFirebase.generatePath function failed.');
                }

            }

            /**
             * @ngdoc method
             * @name resetSiteBuilder
             * @methodOf Volusion.toolboxCommon.vnFirebase
             * @param {String} account The name of the account which needs to b e reset.
             * @returns {Boolean} THere is no error handling yet so it returns true.
             *
             * @description
             * Still mocked with a fake asdf123 account path.
             * This function does the following:
             *
             * 1. Creates a Firebase reference to the configured account
             * 2. Grabs the default object for a new session
             * 3. Sets that data for the Firebase reference.
             *
             */
            function resetSiteBuilder() {

                var sbRef = $firebase(new Firebase(vnDataEndpoint.fbUrl + '/account_sitebuilder/' + vnConfig.getAccount()));
                var sbd = new SiteBuilderDefaults();
                sbRef.$set(sbd);
                return true;
            }

            /**
             * @ngdoc method
             * @name resetDataForPath
             * @methodOf Volusion.toolboxCommon.vnFirebase
             * @param {String} path The item or resource in Firebase
             * @param {Object} data The data that needs to be updated for the given path.
             * @returns {Boolean} THere is no error handling yet so it returns true.
             * @returns {Error} err Inline generation of an error if not a string.
             *
             * @description
             * Control is followed if path is a string and data exists. If not, an error
             * is returned.
             *
             */
            function resetDataForPath(path, data) {

                var fullPath;
                if (path && data && 'string' === typeof path) {
                    fullPath = generatePath(path);
                    var pathRef = $firebase(new Firebase(fullPath));
                    pathRef.$set(data);
                    return true;
                } else {
                    throw new Error('vnFirebase.resetDataForPath() error.');
                }

            }

            /**
             * @ngdoc method
             * @name SiteBuilderDefaults
             * @methodOf Volusion.toolboxCommon.vnFirebase
             * @returns {Object} data
             *
             * @description
             *
             *  Use this to reset the SiteBuilder Session (app state, other things??)
             *  to the pre-determined sane defaults we have chosen.
             *
             */
            function SiteBuilderDefaults() {
                /**
                 @function
                 @name SiteBuilderDefaults
                 @description Return an object with the SiteBuilder Default settings for Firebase
                 @param {}
                 @return Object
                 */

                // Note this will get more complicated when we want to start remembering things
                // like current theme, state etc ...
                return {
                    component       : {
                        id      : 'uniq id/code for the item',
                        typeDesc: 'thing.attribute',
                        typeId  : '9999 - each component/widget has a type to id it, thereby enabling bideirectional communication between sitebuilder and workspace '
                    },
                    product         : 'bucket for when a product is selected',
                    category        : 'bucket for when a category is selected',
                    page            : 'bucket for when a page is selected',
                    theme           : {
                        id       : '1',
                        name     : 'default',
                        thumbnail: 'http://localhost:8090/default.png',
                        cssRef   : 'http://localhost:8090/default.css'
                    },
                    previewMode     : 'on',
                    preferredLanguge: 'en-us'
                };
            }

            // public api here
            return {
                getFirebaseData : getFirebaseData,
                resetSiteBuilder: resetSiteBuilder,
                resetDataForPath: resetDataForPath
            };
        }]);

angular.module('Volusion.toolboxCommon')
    .factory('vnSession', ['$rootScope', '$q', 'vnApi', 'vnFirebase',
        function ($rootScope, $q, vnApi, vnFirebase) {
            'use strict';

            /**
             * @ngdoc property
             * @name accountData
             * @property {Object} accountData
             * @propertyOf Volusion.toolboxCommon.vnSession
             *
             * @description
             * A key/value object matching the expected response api/backend authentication
             * service.
             */
            var accountData = {};

            /**
             * @ngdoc event
             * @name vnSession.init
             * @eventOf Volusion.toolboxCommon.vnSession
             * @param {Object} event is the event passed when vnSession.init is broadcast
             * @param {Object} args are the values to be passed in here
             *
             * @description
             * Hears the vnSession.init event when it is broadcast and Passes the args to
             * the private init function.
             */
            $rootScope.$on('vnSession.init', function (event, args) {
                initSession(args);

            });

            /**
             * @ngdoc function
             * @name bootstrapSessionData
             * @methodOf Volusion.toolboxCommon.vnSession
             *
             * @description
             * The Dev purpose for calling this function is to define the apiEndpoints where
             * we will be getting data from. Here is the flow:
             *
             * 1. It should be called after configuration is set for SiteBuilder
             * 2. It resets the Firebase account data to a blank slate
             * 3. It uses the date for the vnApi endpoints to get data
             * 4. it calls setFirebaseData with each endpoint promise.
             *
             * <br/>
             * It does not return anything as the promises are async and network latency plays
             * role in how long a response will take. We just set the data xfer process in motion
             * here and return control to the caller.
             *
             */
            function bootstrapSessionData() {

                // The places interesting data sets live ...
                var apiEndpoints = {
//                        articles  : vnApi.Article.get().$promise,
                        articles  : vnApi.Article(),
//                        categories: vnApi.Category.get().$promise,
                        categories: vnApi.Category(),
//                        carts     : vnApi.Cart.get().$promise,
                        carts     : vnApi.Cart(),
//                        config    : vnApi.Configuration.get().$promise,
                        config    : vnApi.Configuration(),
//                        countries : vnApi.Country.get().$promise,
                        countries : vnApi.Country(),
//                        navs      : vnApi.Nav.get().$promise,
                        navs      : vnApi.Nav(),
//                        products  : vnApi.Product.get().$promise
                        products  : vnApi.Product()

                    },
                    keys = Object.keys(apiEndpoints);

                // proof-of-concept.
                vnFirebase.resetSiteBuilder(); // i.e. called with no session state persistence considered.

                // Grab the keys for api endpoints so we know what goes where in firebase
                // NOTE: The key depends on accuracy of the firebase schema as it is used as a string elsewhere
                //       for firebase url generation.
                angular.forEach(keys, function (k) {
                    setFirebaseData(k, apiEndpoints[k]);
                });

            }

            /**
             * @ngdoc function
             * @name getAccountData
             * @methodOf Volusion.toolboxCommon.vnSession
             * @return {object} accountData is the factory property that holds the accountData
             * given to us from the api/backend auth services.
             *
             * @description
             * Getter for the factory property accountData.
             */
            function getAccountData() {
                return accountData;
            }

            /**
             * @ngdoc function
             * @name init
             * @methodOf Volusion.toolboxCommon.vnSession
             * @return {Boolean} true or throw a new Error if there are issues.
             *
             * @description
             * Use this to call basic initialization. set up the vnConfig object with its environment
             * and any other stuff that site-dna needs to use when GETting data from the Volusion API.
             */
            function init() {
                // Pre authentication set up stuff goes here.
                return true;
            }

            /**
             * @ngdoc function
             * @name initSession
             * @methodOf Volusion.toolboxCommon.vnSession
             * @param {Object} response The login response from the api/backend authentication
             * services used for eleveated data access perminssions. (SiteBuilder & WorkSpace)
             * @return {Boolean} true or throw a new Error if there are issues.
             *
             * @description
             * Use this to call basic initialization. set up the vnConfig object with its environment
             * and any other stuff that site-dna needs to use when GETting data from the Volusion API.
             */
            function initSession(response) {

//                we only init once per session but have not set this yet? 5-28.2014 -matth
                accountData = response;
                bootstrapSessionData();

            }

            /**
             * @ngdoc function
             * @name setFirebaseData
             * @param {String} path Is the <ITEM> path for the resource in our Firebase schema.
             * @param {$resource} resource Is a $resource for the vnApi Item Model
             * @methodOf Volusion.toolboxCommon.vnSession
             *
             * @description
             * Given the results of a $resource.get().$promise reset the data for the
             * Firebase path associated with its corresponding api items.
             *
             * 1. Execute the given promise
             * 2. Then, pass the path and promise params to the vnFirebase.resetDataForPath
             *
             * <br/>
             * It does not return anything as the promises are async and network latency plays
             * role in how long a response will take. We just set the data xfer process in motion
             * here and return control to the caller. THIS HAD ISSUES IN PORTING REMOVE THIS WHEN
             * THEN PART OF PROMISE WORKS AGAIN!!!
             *
             */
            function setFirebaseData(path, resource) {

                console.log(resource);
                console.log('Porting issue with the prromise and data ... to fix with ng-stub');
//                resource.get().$promise.then(function (result) {
//                    vnFirebase.resetDataForPath(path, result.data);
//                });

            }

            return {
                init          : init,
                initSession   : initSession,
                getAccountData: getAccountData
            };
        }]);
