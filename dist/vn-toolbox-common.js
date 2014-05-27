
/*! vn-toolbox-common - ver.0.0.2 (2014-05-27) */

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
     <example module="app">
            <file name="script.js">
                angular.module('app', [])
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
                    <vn-carousel image-list="imageList" />
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
                    link       : function postLink(scope, element, attr) {
                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        // Component constants *****************
                        scope.componentId = '100003';
                        scope.componentName = 'link';
                        // *************************************

                        // Component is not selected by default
                        scope.selected = false;

                        // attr will be copied over so have to set it only of empty
                        scope.target = (attr.target === undefined || attr.target === '') ? '_self' : '';

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
            '<a class="vn-link" target="{{ target }}" ng-transclude></a>'
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

'use strict';

angular.module('Volusion.toolboxCommon')
    .value('vnApiArticles', 42);

'use strict';

angular.module('Volusion.toolboxCommon')
    .value('vnApiCarts', 42);

'use strict';

angular.module('Volusion.toolboxCommon')
  .value('vnApiCategories', 42);

'use strict';

angular.module('Volusion.toolboxCommon')
    .value('vnApiConfigurations', 42);

'use strict';

angular.module('Volusion.toolboxCommon')
    .value('vnApiNavs', 42);

'use strict';

angular.module('Volusion.toolboxCommon')
    .value('vnApiProducts', 42);

angular.module('Volusion.toolboxCommon')
    .factory('vnApi', ['$resource', 'vnDataEndpoint', function ($resource, vnDataEndpoint) {
        'use strict';

        return {
            Article        : $resource(vnDataEndpoint.apiUrl + '/articles'),
            Category       : $resource(vnDataEndpoint.apiUrl + '/categories'),
            Cart           : $resource(vnDataEndpoint.apiUrl + '/carts'),
            Configuration  : $resource(vnDataEndpoint.apiUrl + '/config'),
            Country        : $resource(vnDataEndpoint.apiUrl + '/countries'),
            Nav            : $resource(vnDataEndpoint.apiUrl + '/navs'),
            Product        : $resource(vnDataEndpoint.apiUrl + '/products/')
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

'use strict';

angular.module('Volusion.toolboxCommon')
    .factory('vnDataSrc', function () {
        // Service logic
        // ...

        var meaningOfLife = 42;

        // Public API here
        return {
            someMethod: function () {
                return meaningOfLife;
            }
        };
    });

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

            function getFirebaseDataFn(path) {
                if (path && 'string' === typeof path) {
                    return $firebase(new Firebase(vnDataEndpoint.fbUrl + fbItems[path] + '/' + vnConfig.getAccount() + '/'));
                }
                return false;
            }



            function generatePathFn(path) {
                /**
                 @function
                 @name generateFBPathFn
                 @description Given a partial path as a string use vnConfig info to construct a path to FB resources
                 @param {String} path
                 @return String
                 */

                if (path && 'string' === typeof path) {
                    return vnDataEndpoint.fbUrl + fbItems[path] + '/' + vnConfig.getAccount() + '/';
                }
                return false;
            }

            function resetSiteBuilderFn() {
                /**
                 @function
                 @name resetSiteBuilderFn
                 @description reset the SiteBuilder App state to default settings.
                 @param {}
                 @return Boolean
                 */

                var sbRef = $firebase(new Firebase(vnDataEndpoint.fbUrl + '/account_sitebuilder/asdf123'));
                var sbd = new SiteBuilderDefaults();
                sbRef.$set(sbd);

                return true;
            }

            function resetDataForPathFn(path, data) {
                /**
                 @function
                 @name resetDataForPathFn
                 @description Given a string path & datacreate a firebase reference and update the data for that path
                 @param {String, Object || Array of Objects} path, data
                 @return Boolean
                 */

                var fullPath;
                if (path && data && 'string' === typeof path) {
                    fullPath = generatePathFn(path);
                    var pathRef = $firebase(new Firebase(fullPath));
                    pathRef.$set(data);
                    return true;
                }
                return false;
            }

            /**
             *
             * @returns {{component: {id: string, typeDesc: string, typeId: string}, product: string, category: string, page: string, theme: {id: string, name: string, thumbnail: string, cssRef: string}, previewMode: string, preferredLanguge: string}}
             * @constructor SiteBuilder
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
                getFirebaseData : getFirebaseDataFn,
                resetSiteBuilder: resetSiteBuilderFn,
                resetDataForPath: resetDataForPathFn
            };
        }]);

'use strict';

angular.module('Volusion.toolboxCommon')
    .factory('vnSession', function () {
        // Service logic
        // ...

        var meaningOfLife = 42;

        // Public API here
        return {
            someMethod: function () {
                return meaningOfLife;
            }
        };
    });
