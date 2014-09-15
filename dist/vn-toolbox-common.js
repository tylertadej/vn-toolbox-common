
/*! vn-toolbox-common - ver.0.0.29 (2014-09-15) */

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

'use strict';
/**
 * @ngdoc controller
 * @name Volusion.toolboxCommon.controller:vnAppMessageCtrl
 *
 * @description
 * The `vnAppMessageCtrl` is associated with the `vnAppMessageDirective` and
 * interacts with the `vnAppMessageService` to get the list of messages and to
 * handle the user click to remove the message.
 *
 * @requires vnAppMessageService
 * */


angular.module('Volusion.toolboxCommon')
    .controller('vnAppMessageCtrl', ['vnAppMessageService', function(vnAppMessageService){
        var self = this;

        self.alerts = vnAppMessageService.getMessages();

        /**
         * closes the alert and removes it from the list of alerts.
         * @param messageId
         */
        self.closeAlert = function (messageId) {
            vnAppMessageService.removeMessage(messageId);
        };
}]);

'use strict';
/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnAppMessage
 *
 * @description
 * The vnAppMessage directive displays the list of messages
 * that will be displayed to the user.
 *
 * @restrict A
 * */


angular.module('Volusion.toolboxCommon')
    .directive('vnAppMessage', function () {
    return {
        restrict: 'EA',
        controller: 'vnAppMessageCtrl',
        controllerAs: 'appMessagesCtrl',
        templateUrl: 'appmessages/vnAppMessage.tpl.html'
    };
});

'use strict';
/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnAppMessageService
 *
 * @description
 * # vnAppMessageService
 * The vnAppMessageService service is used to add messages that
 * need to displayed. It sets up a timeout based on the timeout value
 * passed in the message object by the caller or a default of 4000ms
 *
 * @requires $timeout
 */

angular.module('Volusion.toolboxCommon')
    .service('vnAppMessageService', ['$timeout', function($timeout) {
        var self = {},
            messages = [];

        self.addMessage = function (message) {
            var msg = {
                id: Date.now(),
                type: message.type || 'warning',
                text: message.text
            };
            messages.push(msg);
            $timeout(function() {
                self.removeMessage(msg.id);
            }, message.timeout || 4000);
        };

        self.getMessages = function() {
            return messages;
        };

        self.removeMessage = function(id) {
            angular.forEach(messages, function(msg, messageIndex) {
                if (msg && msg.id === id) {
                    messages.splice(messageIndex, 1);
                }
            });
        };

        return self;
    }]);

'use strict';

/**
 * @ngdoc filter
 * @name Volusion.toolboxCommon:vnCacheBust
 *
 * @description
 * The `vnCacheBust` filter adds a cache busting token to the end of the
 * URL string passed in.
 *
 * @requires
 * vnTokenGenerator
 *
 * @usage
 * <a ng-href="foo.someUrl | vnCacheBust">Bar</a>
 *
 * @example
 */

angular.module('Volusion.toolboxCommon').filter('vnCacheBust', [
    'vnTokenGenerator',
    function (vnTokenGenerator) {


        function appendTokenToUrl(url) {
            if (!url || !url.trim()) {
                return url;
            }

            var separator = (url.indexOf('?') > -1) ? '&' : '?';
            return url + separator + '_=' + vnTokenGenerator.getCacheBustingToken();
        }

        return function (url) {
            return appendTokenToUrl(url);
        };
    }
]);

'use strict';
/**
 * @ngdoc service
 * @name Volusion.toolboxCommon:vnTokenGenerator
 *
 * @description
 * # vnTokenGenerator
 * The vnTokenGenerator service is used to generate a unique
 * token which can be used for cache busting
 *
 */

angular.module('Volusion.toolboxCommon')
	.factory('vnTokenGenerator', function () {

		function getCacheBustingToken() {
			return (new Date()).valueOf();
		}

		return {
			getCacheBustingToken: getCacheBustingToken
		};
	});

'use strict';

/**
 * @ngdoc provider
 *
 * @name Volusion.toolboxCommon:vnAppConfig
 *
 * @description
 * # vnAppConfig
 * Application configuration provider with methods to
 * set and get the application wide configuration
 * variables.
 *
 */

angular.module('Volusion.toolboxCommon')
	.provider('vnAppConfig', [function () {

		var apiHost,
			apiUrl,
			country = 'us',
			disableTranslations = false,
			lang = 'en',
			region = 'us',
			urlPrefix = '';


		// Private constructor
		function AppConfig() {
			this.AppConfig = function () {
				return this;
			};

			this.getApiHost = function () {
				return apiHost;
			};

		}

        this.setApiPath = function(host, endpoint) {
            apiHost = host;
            apiUrl = host + endpoint;
        };

		this.getApiPath = function () {
			return apiUrl;
		};

		this.getCountry = function () {
			return country;
		};

		this.getIsLocalEnv = function () {
			return (apiHost !== '');
		};

		this.getLang = function () {
			return lang;
		};

		this.getPrefix = function () {
			return urlPrefix;
		};

		this.getRegion = function () {
			return region;
		};

		this.getTranslations = function () {
			return disableTranslations;
		};


		this.setCountry = function (stringCountry) {
			country = stringCountry;
		};


		this.setLang = function (stringLang) {
			lang = stringLang;
		};

		this.setPrefix = function (stringPath) {
			urlPrefix = stringPath;
		};

		this.setRegion = function (stringRegion) {
			region = stringRegion;
		};

		this.setTranslations = function (bool) {
			disableTranslations = bool;
		};

		// Method for instantiating
		this.$get = function () {
			return new AppConfig();
		};
	}]);

'use strict';

/**
 * @ngdoc service
 *
 * @name Volusion.toolboxCommon:vnSiteConfig
 *
 * @description
 * # vnSiteConfig
 * Site configuration service which gets the server side
 * configurations from the config API.
 *
 */

angular.module('Volusion.toolboxCommon')
	.service('vnSiteConfig', ['vnApi', '$q',
		function (vnApi, $q) {

			var siteConfig = {};

			siteConfig.getConfig = function () {
				var deferred = $q.defer();
				vnApi.Configuration().get().$promise
					.then(function (response) {
						deferred.resolve(response);
					});
				return deferred.promise;
			};

			return siteConfig;
		}]);

angular.module('Volusion.toolboxCommon')
	.controller('OptionsCtrl', ['$rootScope','$scope',
		function($rootScope, $scope) {

			'use strict';

			function findOptionsAndOptionSKU(options) {
				var optionsToSKU = [];

				if (!options) {
					return optionsToSKU;
				}

				for (var i = 0; i < options.length; i++) {
					var option = options[i];

					if (option.isRequired && option.derivesToSKU) {
						optionsToSKU.push(option.label);
					}
				}

				return optionsToSKU;
			}

			// Initialize availability
			$scope.isItemAvailable = false;
			$scope.itemToken = $scope.option.key + ':' + $scope.item.key;

			var optionsAnsSKU = findOptionsAndOptionSKU($scope.product.options).length;

			if ($scope.product.optionSKUs.length > 0) {

				for (var idx = 0; idx < $scope.product.optionSKUs.length; idx++) {

					// find if there is more than one option to derive SKU
					// if there are more than one option - do not check self options in  optionSKUs (i.e 'color:blue')
					var takeOptionInConsideration = (optionsAnsSKU === 1 ||
						$scope.product.optionSKUs[idx].key !== $scope.itemToken);

					if (takeOptionInConsideration) {
						if ($scope.product.optionSKUs[idx].key.indexOf($scope.itemToken) > -1 &&
							$scope.product.optionSKUs[idx].quantityInStock > 0) {

							$scope.isItemAvailable = true;
							break;
						}
					}
				}
			} else {
				$scope.isItemAvailable = ($scope.product.availability.allowBackOrders ||
					$scope.product.availability.quantityInStock === null ||
					$scope.product.availability.quantityInStock > 0);
			}

			// Process item selected
			$scope.$on('VN_PRODUCT_SELECTED', function (event, selection, currentSelections) {

				var optionIdx = 0;
				for (var idxOpt = 0; idxOpt < $scope.product.options.length; idxOpt++) {
					if ($scope.product.options[idxOpt].key === $scope.option.key) {
						optionIdx = idxOpt;
						break;
					}
				}

				// Replace selected item in current selections to filter optionSelections
				// for currently selected item *************************************************************************
				var selections = currentSelections.split('|');
				selections[optionIdx] = $scope.itemToken;
				var tempSelections = selections.join('|');
				// *****************************************************************************************************

				for (var idx = 0; idx < $scope.product.optionSKUs.length; idx++) {

					if (tempSelections !== $scope.itemToken &&
						$scope.product.optionSKUs[idx].key.indexOf(tempSelections) > -1) {

						// TODO: What about the optionSelection's state?
						// According to Kevin at this moment we do not care ...
						$scope.isItemAvailable = ($scope.product.optionSKUs[idx].quantityInStock > 0);
					}
				}
			});
		}]);

angular.module('Volusion.toolboxCommon')
	.controller('VnProductOptionCtrl', ['$rootScope','$scope',
		function($rootScope, $scope) {

			'use strict';

			function preserveSubOptions() {
				traverseSelectedOptions($scope.product.options, null, function (option, item) {
					option.selected = item.key;
				});
			}

			function traverseSelectedOptions(options, filter, callback) {
				if (!options) {
					return;
				}

				filter = filter || function () {
					return true;
				};

				function isThisOptionSelected (item) {
					return $scope.saveTo.filter(function (obj) {
						return obj.id === item.id;
					});
				}

				angular.forEach(options, function (option) {
					var itemKeys = option.items;
					if (!itemKeys) {
						return;
					}
					for (var i = 0, len = itemKeys.length; i < len; i++) {
						var item = option.items[i],
							haveThisOption = isThisOptionSelected(item);

						if (haveThisOption.length > 0) {
							if (filter(option)) {
								callback(option, item);
							}
							if (option.options && option.options.length > 0) {
								traverseSelectedOptions(option.options, filter, callback);
							}
							break;
						}
					}
				});
			}

			function getCurrentSelections () {
				var selections = [],
					filter = function (option) {
						return option.derivesToSKU;
					};

				traverseSelectedOptions($scope.product.options, filter, function (option, item) {
					selections.push([
						option.key,
						item.key
					].join(':'));
				});

				return selections.join('|');
			}

			function buildSelection() {
				var selections = getCurrentSelections(),
					optionSKUs = {};
//					optionTemplateSelection = $scope.product.optionSKUs.filter(function (selection) {
//						return selection.key === 'template';
//					})[0];

				optionSKUs = $scope.product.optionSKUs.filter(function (selection) {
					return selection.key === selections;
				})[0];

//				return angular.extend({}, optionTemplateSelection, optionSKUs);
				return optionSKUs;
			}

			function verifyRequiredOptionsAreSelected(options) {
				if (!options) {
					return true;
				}

				for (var i = 0, len = options.length; i < len; i++) {
					var option = options[i];
					if (option.isRequired && !option.hasOwnProperty('selected')) {
						return false;
					}
					if (option.options.length >0 && verifyRequiredOptionsAreSelected(option.options) === false) {
						return false;
					}
				}

				return true;
			}

			function buildAndBroadcast (option, item) {
				var buildSel = buildSelection(),
					currentSel = getCurrentSelections(),
					verifySel = verifyRequiredOptionsAreSelected($scope.product.options);

				$rootScope.$broadcast('VN_PRODUCT_SELECTED',
					angular.extend({}, {
						product: $scope.product,
						option : option,
						item   : item,
						isValid: verifySel
					}, buildSel),
					currentSel);
			}

			$scope.onOptionChanged = function (option, item) {

				$scope.currentSelectionText = item.text;

				var optionKey = option.key,
					haveThisOption = $scope.saveTo.filter(function (obj) {
						return obj.id === item.id;
					}),
					haveAnotherFromThisOption = $scope.saveTo.filter(function (obj) {
						return obj.option === optionKey;
					});

				if (0 !== haveAnotherFromThisOption.length && 0 === haveThisOption.length) {
					$scope.saveTo = $scope.saveTo.filter(function (obj) {
						return obj.option !== optionKey;
					});
				}

				if (0 === haveThisOption.length) {
					$scope.saveTo.push({ id: item.id, option: optionKey });
				}

				preserveSubOptions();
				buildAndBroadcast(option, item);
			};

			$scope.onCheckboxClicked = function(option, item) {
				var optionKey = option.key,
					haveThisOption = $scope.saveTo.filter(function (obj) {
						return obj.id === item.id;
					});

				if (0 === haveThisOption.length) {
					$scope.saveTo.push({ id: item.id, option: optionKey });
				} else {
					$scope.saveTo = $scope.saveTo.filter(function (obj) {
						return obj.id !== item.id;
					});
				}

				buildAndBroadcast(option, item);
			};
		}]);

'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnBlock
 * @restrict A
 * @requires bem
 * @scope
 *
 * @description
 *
 *
 * @usage
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnBlock', ['vnBem', function (vnBem) {
		return {
			restrict: 'A',
			controller: function() {
				this.getBlock = function() {
					return this.block;
				};

				this.getModifiers = function() {
					return this.modifiers;
				};
			},
			compile: function() {
				return {
					pre: function(scope, iElement, iAttrs, controller) {
						var block = iAttrs.vnBlock;
						var modifiers = iAttrs.vnModifiers;
						vnBem.addClasses(iElement, {
							block: block,
							blockModifiers: modifiers
						});
						controller.block = block;
						controller.modifiers = modifiers;
					}
				};
			}
		};
	}]);

angular.module('Volusion.toolboxCommon')
	.directive('vnCarousel',
	['$rootScope',
		function ($rootScope) {

			'use strict';

			return {
				templateUrl: 'template/carousel.html',
				restrict   : 'EA',
				replace    : true,
				scope      : {
					currMode       : '@currMode',
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
						pause   : 'hover',
						wrap    : true
					});

					scope.prev = function () {
						$('.carousel').carousel('prev');
//                            element.carousel('prev');
					};

					scope.next = function () {
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
				'<li data-ng-repeat="image in imageList" data-target="#vnCarousel" data-slide-to="{{ $index }}"></li>' +
				'</ol>' +
				'<div data-ng-repeat="image in imageList" class="carousel-inner">' +
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
				'</div>' +
				'</div>'
		);
	}]);



angular.module('Volusion.toolboxCommon')
	.directive('vnCategorySearch', ['$rootScope', '$routeParams', '$location', 'vnProductParams', 'vnAppRoute',
		function ($rootScope, $routeParams, $location, vnProductParams, vnAppRoute) {

			'use strict';

			return {
				templateUrl: 'vn-faceted-search/vn-category-search.html',
				restrict   : 'AE',
				scope      : {
					categories   : '=',
					queryProducts: '&'
				},
				link       : function postLink(scope) {

					/**
					 * First Display Strategy: 1 top level category && on that route
					 * - for example: current route is /c/home-decor
					 * - slug is home-decor and it matches category.slug
					 */
					function processFirstCategoryStrategy(cList) {
						angular.extend(cList, {displayStrategy: 'categoryDisplayOne'});
					}

					/**
					 * Second Display Strategy: 1 top level category &&
					 * also on one of the sub category route slugs
					 * - for example: current route is /c/furniture
					 * - routeParams.slug is furniture and it matches one of the
					 * - category.subCategories[i].slug values
					 */
					function processSecondCategoryStrategy(cList) {
						angular.extend(cList, {displayStrategy: 'categoryDisplayTwo'});
					}

					/**
					 * Third Display Strategy: on the search route
					 * - everything is clickable
					 */
					function processThirdCategoryStrategy(cList) {

						angular.forEach(cList, function (category) {
							angular.extend(category, {displayStrategy: 'categoryDisplayThree'});
							// Make sure that the sub cats will be links as well
							angular.forEach(category.subCategories, function (subCat) {
								angular.extend(subCat, { hideSubCatLink: true });
							});
						});

					}

					/**
					 * Utility function used in determining which strategy to apply to this set of category response data
					 */
					function checkSubCategoriesForSlugMatch(slug, categoryObject) {

						var catMatchTest = false;
						for (var i = categoryObject.subCategories.length - 1; i >= 0; i--) {
							if (slug === categoryObject.subCategories[i].slug) {
								angular.extend(categoryObject.subCategories[i], { hideSubCatLink: true });
								catMatchTest = true;
							} else {
								angular.extend(categoryObject.subCategories[i], { hideSubCatLink: false });
							}
						}
						return catMatchTest;

					}


					/**
					 * @ngdoc function
					 * @name updateRoute
					 * @return {String} newRoute reprensets the current parameters used to get products from the api.
					 * This function builds a string that can be used to update category links so that when navigating
					 * betweeen categories the current facets, categoryIds and min/max prices are reflected.
					 *
					 * @description
					 *
					 */
					function updateRoute() {
						var newRoute = '',
							facetString,
							minString,
							maxString,
							categoryString;

						function cleanUpRoute(dirtyRoute) {
							return dirtyRoute.replace(/&$/, '');
						}


						// has facets
						facetString = vnProductParams.getFacetString();
						// has minPrice
						minString = vnProductParams.getMinPrice();
						// has maxPrice
						maxString = vnProductParams.getMaxPrice();
						//has categories
						categoryString = vnProductParams.getCategoryString();

						// Do we even have a string right now?
						if ('' !== categoryString || '' !== facetString || '' !== minString || '' !== maxString) {
							newRoute += '?';
						} else {
							return '';
						}

						if ('search' === vnAppRoute.getRouteStrategy() && '' !== categoryString) {
							var categoryParams = 'categoryId=' + categoryString + '&';
							newRoute += categoryParams;
						}

						if ('' !== facetString) {
							var facetParams = 'facetIds=' + facetString + '&';
							newRoute += facetParams;
						}

						if ('' !== minString) {
							var minParam = 'minPrice=' + minString + '&';
							newRoute += minParam;
						}

						if ('' !== maxString) {
							var maxParam = 'maxPrice=' + maxString + '&';
							newRoute += maxParam;
						}

						// Check string for ending & and clean it up.
						newRoute = cleanUpRoute(newRoute);

						return newRoute;
					}

					scope.updateCategory = function (category) {
						vnProductParams.addCategory(category.id);
						scope.queryProducts();
					};

					scope.buildAppUrl = function (category) {
						// Which Strategy are we building for?
						if ('search' === vnAppRoute.getRouteStrategy()) {
							vnProductParams.addCategory(category.id);
							scope.queryProducts();
						} else if ('category' === vnAppRoute.getRouteStrategy()) {
							var categoryPath = category.url; // + scope.currentRoute;
							$location.path(categoryPath);
						}
					};

					scope.$watch($routeParams,
						function watchForParamChange() {
							scope.currentRoute = updateRoute();
						}, true);

					scope.$watch('categories', function (categories) {

						// Gaurd against the error message for while categories is not defined.
						if (!categories || !categories[0]) {
							return;
						} else if ('/search' === $location.path()) {
							processThirdCategoryStrategy(categories);
						} else if (1 === categories.length && $routeParams.slug === categories[0].slug) {
							processFirstCategoryStrategy(categories[0]);
						} else if (1 === categories.length && checkSubCategoriesForSlugMatch($routeParams.slug, categories[0])) {
							processSecondCategoryStrategy(categories[0]);
						} else {
							throw new Error('Is there a new display strategy for the category-search directive in toolbox?');
						}
					});
				}
			};
		}]);

'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnElement
 * @restrict A
 * @requires bem, vnBlock
 * @scope
 *
 * @description
 *
 *
 * @usage
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnElement', ['vnBem', function (vnBem) {
		return {
			require: '^vnBlock',
			restrict: 'A',
			compile: function() {
				return function(scope, iElement, iAttrs, blockCtrl) {
					vnBem.addClasses(iElement, {
						block: blockCtrl.getBlock(),
						blockModifiers: blockCtrl.getModifiers(),
						element: iAttrs.vnElement,
						elementModifiers: iAttrs.vnModifiers
					});
				};
			}
		};
	}]);

angular.module('Volusion.toolboxCommon')
	.directive('vnFacetSearch', ['$rootScope', '$window', 'vnProductParams',
		function ($rootScope, $window, vnProductParams) {

			'use strict';

			return {
				templateUrl: 'vn-faceted-search/vn-facet-search.html',
				restrict   : 'AE',
				scope      : {
					facets     : '=',
					queryProducts: '&'
				},
				link       : function postLink(scope) {

					// Manage the differences in behavior for mobile vs. deesktop
					enquire.register('screen and (max-width:767px)', {

						setup: function () {
							scope.defaultAccordianOpen = true;
						},

						unmatch: function () {
							scope.defaultAccordianOpen = true;
						},
						// transitioning to mobile mode
						match  : function () {
							scope.defaultAccordianOpen = false;
						}
					});

					scope.selectProperty = function (facet) {
						return vnProductParams.isFacetSelected(facet.id);
					};

					scope.refineFacetSearch = function (facet) {

						// Adding / Removing facet to selectedFacets
						if (!vnProductParams.isFacetSelected(facet.id)) {
							vnProductParams.addFacet(facet.id);
						} else {
							vnProductParams.removeFacet(facet.id);
						}
						scope.queryProducts();

					};

					scope.$watch('facets', function (facets) {
						scope.facets = facets;
					});
				}
			};
		}]);

angular.module('Volusion.toolboxCommon')
	.directive('vnFacetedSearch', ['$window', '$location', 'vnProductParams',
		function ($window, $location, vnProductParams) {

			'use strict';

			return {
				templateUrl: 'vn-faceted-search/vn-faceted-search.html',
				restrict   : 'EA',
				link       : function postLink(scope) {

					scope.showCategorySearch = false;
					scope.showFacetSearch = true;
					scope.showApplyButton = false;

					/* Control for the sort directive UI */
					// Only be visible on search pages
					var location = $location.url(),
						matcher;
					matcher = /^\/search/;
					scope.onSearchPage = matcher.test(location);

					scope.$watch('categoryList', function (categoryList) {
						if (categoryList) {
							scope.showCategorySearch = true;
						}
					});

					scope.$watch('facets', function (facets) {
						if (facets) {
							scope.showFacetSearch = true;
						}
					});

					scope.$watch(
						function() {
							return vnProductParams.getSort();
						},
						function(strategy) {
							scope.currentSort = strategy;
						}
					);

					enquire.register('screen and (max-width:767px)', {

						setup  : function () {
							scope.showApplyButton = false;
							scope.mobileDisplay = true;
							scope.showMobileSearch = false;
							scope.isMobileAndVisible = false;
							scope.isMobileAndHidden = true;
							scope.categoryAccordiansOpen = true;
							scope.priceAccordiansOpen = true;
							scope.sortAccordianIsOpen = true;
						},
						unmatch: function () {
							scope.showApplyButton = false;
							scope.mobileDisplay = true; // default cats and facets to open
							scope.showMobileSearch = false;
							scope.isMobileAndVisible = false;
							scope.isMobileAndHidden = true;
							scope.categoryAccordiansOpen = true;
							scope.priceAccordiansOpen = true;
							scope.sortAccordianIsOpen = true;
						},
						// transitioning to mobile mode
						match  : function () {
							scope.showApplyButton = true;
							scope.mobileDisplay = false; // default cats and facets default to closed
							scope.showMobileSearch = true;
							scope.isMobileAndVisible = false;
							scope.isMobileAndHidden = true;
							scope.categoryAccordiansOpen = false;
							scope.priceAccordiansOpen = false;
							scope.sortAccordianIsOpen = false;
						}
					});
				}
			};
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
            '<div class="vn-image">' +
                '<p translate>VN-IMAGE-TITLE</p>' +
                '<img src="{{ image.src }}" alt="{{ image.alt }}" />' +
            '</div>'
        );
    }]);

angular.module('Volusion.toolboxCommon')
	.directive('vnLabeledRadio',
		function () {

			'use strict';

			return {
				require    : 'ngModel',
				restrict   : 'A',
				replace    : true,
				transclude : true,
				templateUrl: 'template/labeled-radio.html',
				scope      : {
					ngModel   : '=',
					name      : '@',
					value     : '@',
					ngValue   : '=',
					ngChecked : '=',
					ngDisabled: '@',
					change    : '&ngChange'
				},
				compile    : function (tElement, tAttrs) {
					var $radio = tElement.find('input'),
						value = tAttrs.value,
						ngValue = tAttrs.ngValue;

					if (typeof value !== 'undefined' && typeof ngValue === 'undefined') {
						$radio.removeAttr('data-ng-value');
					}
				}
			};
		})
	.run(['$templateCache', function ($templateCache) {

		'use strict';

		$templateCache.put(
			'template/labeled-radio.html',
			'<label data-vn-block="vn-labeled-radio">' +
				'<input data-vn-element="input" type="radio" ' +
						'name="{{name}}" ' +
						'value="{{value}}" ' +
						'data-ng-model="ngModel" ' +
						'data-ng-value="ngValue" ' +
						'data-ng-checked="ngChecked" ' +
						'data-ng-change="change()" ' +
						'data-ng-disabled="{{ngDisabled}}">' +
				'<span data-vn-element="content" data-ng-transclude></span>' +
			'</label>'
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
            '<a class="vn-link" data-ng-transclude></a>'
        );
    }]);

angular.module('Volusion.toolboxCommon')
	.directive('vnMetaTags', function () {
		'use strict';

		return {
			restrict: 'EA',
			scope   : {
				title      : '=',
				description: '=',
				keywords   : '=',
				toAppend   : '=',
				robots     : '=',
				socialPageTitle : '=',
				socialPageUrl : '=',
				socialImageUrl : '='
			},
			link    : function (scope, elem) {

				var appendElement = function (elementToAppend) {
					if (typeof elementToAppend !== 'undefined') {
						elem.append(elementToAppend);
					}
				};

				var setTitleTag = function (titleText) {
					var titleTag = elem.find('title');
					if (titleTag.length > 0) {
						titleTag.remove();
					}
					if (titleText) {
						elem.append(angular.element('<title/>').text(titleText));
					}
				};

				var setMetaTag = function (metaTagName, metaTagContent, attributeName) {
					var metaTag = elem.find('meta[' + attributeName + '="' + metaTagName + '"]');

					if (metaTag.length > 0) {
						metaTag.remove();
					}
					if (metaTagContent) {
						elem.append(angular.element('<meta/>').attr(attributeName, metaTagName).
							attr('content', metaTagContent));
					}
				};

				var setDescription = function (description) {
					setMetaTag('description', description, 'name');
				};

				var setKeywords = function (keywords) {
					setMetaTag('keywords', keywords, 'name');
				};

				var setFacebookOpenGraphPageTitle = function (pageTitle) {
					setMetaTag('og:title', pageTitle, 'property');
				};

				var setFacebookOpenGraphPageUrl = function (pageUrl) {
					setMetaTag('og:url', pageUrl, 'property');
				};

				var setFacebookOpenGraphImageUrl = function (imageUrl) {
					setMetaTag('og:image', imageUrl, 'property');
				};

				scope.$watch('socialPageTitle', setFacebookOpenGraphPageTitle);
				scope.$watch('socialPageUrl', setFacebookOpenGraphPageUrl);
				scope.$watch('socialImageUrl', setFacebookOpenGraphImageUrl);
				scope.$watch('title', setTitleTag);
				scope.$watch('description', setDescription);
				scope.$watch('keywords', setKeywords);
				scope.$watch('toAppend', appendElement);
				scope.$watch('robots', function (newValue) {
					if (typeof newValue !== 'undefined' &&
						JSON.parse(newValue) === true) {
						setMetaTag('robots', 'index,follow', 'name');
						setMetaTag('GOOGLEBOT', 'INDEX,FOLLOW', 'name');
					}
				});
			}
		};
	});

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
                                '<a data-ng-href="#/category/{{ subCategory.id }}">{{subCategory.name}}</a>' +
                            '</li>' +
                        '</ul>' +
                    '</li>' +
                '</ul>' +
            '</div>'
        );
    }]);

'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnPriceSearch
 * @restrict EA
 * @requires vnProductParams
 * @description
 * - Implewments search by price for a min::max range
 * $watches via vnProductParams.getMinPrice() for resetting the field
 * $watches via vnProductParams.getMaxPrice() for resetting the field
 *
 * Inherits the parent $controller's queryProducts function and calls if enter is keyed
 * The parent controller is responsible for resetting these values to nil as needed.
 *
 */
angular.module('Volusion.toolboxCommon')
	.directive('vnPriceSearch', ['vnProductParams', function (vnProductParams) {
		return {
			templateUrl: 'vn-faceted-search/vn-price-search.html',
			restrict   : 'AE',
			scope      : {
				queryProducts: '&'
			},
			link       : function postLink(scope) {

				scope.$watch(
					function() {
						return vnProductParams.getMinPrice();
					},
					function(min) {
						scope.minPrice = min;
					}
				);

				scope.$watch(
					function() {
						return vnProductParams.getMaxPrice();
					},
					function(max) {
						scope.maxPrice = max;
					}
				);

				scope.searchByPrice = function (event) {

					vnProductParams.setMinPrice(scope.minPrice);
					vnProductParams.setMaxPrice(scope.maxPrice);

					if (event.which === 13 || 'click' === event.type) {
						scope.queryProducts();
					}

				};
			}
		};
	}]);

'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnProductOption
 * @description
 * # vnProductOption
 */
angular.module('Volusion.toolboxCommon')
	.directive('vnProductOption', function() {
		return {
			restrict: 'A',
			replace: true,
			controller: 'VnProductOptionCtrl',
			templateUrl: 'vn-product-option/index.html',
			scope: {
				option: '=',
				product: '=',
				saveTo: '='
			}
		};
	});

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
                    editable   : '=',
                    maximum    : '=',
                    ratingValue: '='
                },
                link       : function postLink(scope, element, attrs) {
                    var filledClass = attrs.filledClass || 'fa fa-star';
                    var emptyClass = attrs.emptyClass || 'fa fa-star-o';
                    var halfFilledClass = attrs.halfFilledClass || 'fa fa-star-half-o';
                    scope.title = typeof attrs.title !== 'undefined' ? attrs.title : 'Rating';

                    var idx,
                        max = scope.maximum || 5;

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

                    function getStarCssClass(index) {
                        if (scope.ratingValue % 1 === 0 && index < scope.ratingValue) {
                            return filledClass;
                        } else if(scope.ratingValue % 1 === 0.5 && scope.ratingValue - index > 0.5) {
                                return filledClass;
                        } else  if (scope.ratingValue % 1 === 0.5 && scope.ratingValue - index === 0.5){
                            return halfFilledClass;
                        } else {
                            return emptyClass;
                        }
                    }

                    scope.stars = [];
                    function updateStars() {
                        scope.stars = [];
                        for (idx = 0; idx < max; idx++) {
                            scope.stars.push({
                                cssClass: getStarCssClass(idx)
                            });
                        }
                    }

                    scope.$watch('ratingValue', function (oldVal, newVal) {
                        if (newVal === 0 || newVal) {
                            updateStars();
                        }
                    });

                    scope.toggle = function (index) {
                        if (!scope.editable) {
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
                    '<p class="vn-rating-title" data-ng-bind="title"></p>' +
                    '<ul class="rating">' +
                        '<li data-ng-repeat="star in stars" data-ng-click="toggle($index)">' +
                            '<i class=" {{ star.cssClass }} " />' +
                        '</li>' +
                    '</ul>' +
                '</div>'
        );
    }]);

angular.module('Volusion.toolboxCommon')
	.directive('vnSortSearch', ['vnProductParams', 'vnSortDefault', function (vnProductParams, vnSortDefault) {

		'use strict';

		return {
			templateUrl: 'vn-faceted-search/vn-sort-search.html',
			restrict   : 'AE',
			scope: {
				queryProducts: '&'
			},
			link       : function postLink(scope) {
				// THe implication here is that nothing was parsed from the url so lets use this as default
				if ('' === vnProductParams.getSort()) {
					vnProductParams.setSort(vnSortDefault);
				}

				scope.sortBy = function (strategy) {
					vnProductParams.setSort(strategy);
					scope.queryProducts();
				};
			}
		};
	}]);

'use strict';
/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnShowOnDropdownHover
 *
 * @description
 * The `vnShowOnDropdownHover` enables a bootstrap dropdown menu
 * to be displayed when user hovers over the element.
 *
 * @restrict A
 *
 * @requires
 * $timeout
 *
 * @scope
 *
 * @usage
 *  <ul vn-show-on-dropdown-hover class="dropdown-menu" data-ng-if="category.subCategories.length">
 *      <li data-ng-repeat="subCategory in category.subCategories">
 *          <a data-ng-href="{{ subCategory.url }}">{{subCategory.name}}</a>
 *      </li>
 *  </ul>
 *
 * */

angular.module('Volusion.toolboxCommon')
	.directive('vnShowOnDropdownHover', ['$timeout',
		function ($timeout) {

			return {
				restrict: 'A',
				link    : function postLink(scope, element) {

					var timerHide,
						triggerHover = angular.element(element.parent().find('a')[0]);

					element.bind('mouseenter', function () {
						element.show();
						$timeout.cancel(timerHide);
					})
						.bind('mouseleave', function () {
							timerHide = $timeout(function () {
								element.hide();
							}, 100);
						});

					triggerHover.bind('mouseenter', function () {
						element.show();
						$timeout.cancel(timerHide);
					})
						.bind('mouseleave', function () {
							timerHide = $timeout(function () {
								element.hide();
							}, 100);
						})
						.bind('click', function () {
							element.show();
						});

					/* jshint unused:false */
					scope.$on('$destroy',
						function (event) {
							$timeout.cancel(timerHide);
						}
					);
					/* jshint unused:true */
				}
			};
		}]);

'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnEasyZoom
 * @restrict A
 * @scope
 *
 *
 * @description
 * Directive to show the zoomed in image when hovering
 * over an image. It wraps the easyzoom.js library
 * (http://i-like-robots.github.io/EasyZoom/)
 *
 * @usage
 * <img easy-zoom
 *     ng-src="product.image.medium"
 *     ez-zoom-src="product.image.large"
 *     ez-adjacent="isInDesktopMode"
 *     ez-overlay="!isInDesktopMode"
 *     alt="{{product.name}}">
 *
 *
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnEasyZoom', function() {


		var imageHash = {};

		function swapImages(zoomApi) {
			if (imageHash.standardSrc && imageHash.zoomSrc) {
				zoomApi.swap(imageHash.standardSrc, imageHash.zoomSrc);
				imageHash = {};
			}
		}

		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'easyzoom/vnEasyZoom.tpl.html',
			scope: {
				ngSrc: '=',
				ezAdjacent: '=',
				ezOverlay: '=',
				ezZoomSrc: '=',
				alt: '@'
			},
			link: function(scope, element) {
				var easyzoom = element.easyZoom(),
					api = easyzoom.data('easyZoom');

				scope.$watch('ngSrc', function(newValue) {
					if (newValue === undefined) {
						return;
					}

					imageHash.standardSrc = newValue;
					swapImages(api);
				});

				scope.$watch('ezZoomSrc', function(newValue) {
					if (newValue === undefined) {
						return;
					}

					imageHash.zoomSrc = newValue;
					swapImages(api);
				});

				scope.$on('$destroy', function() {
					api.teardown();
				});
			}
		};
	});

'use strict';
/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnErrorModalService
 * @description
 * The vnErrorModalService provides methods to show a
 * modal window with template passed in or the default
 * error template.
 *
 * */


angular.module('Volusion.toolboxCommon')
    .factory('vnErrorModalService', ['$modal', function($modal){

    return {
        showError: function(errorViewTemplateUrl, errorScope) {
            return $modal.open({
                templateUrl: errorViewTemplateUrl || 'errormodal/vnErrorModal.tpl.html',
				scope: errorScope
            });
        }
    };
}]);

'use strict';

/**
 * @ngdoc filter
 * @name Volusion.toolboxCommon.filter:vnProductImageFilter
 * @param {String} optionName is the name of the image collection to parse for
 * @param {String} imageSize is the name of the image size to parse for
 * @function
 * @description
 * # vnProductImageFilter
 * Filter for product.imageCollections
 *
 * ## Default behavior
 * Given a product.imageCollections object, return the url of the medium size image
 *
 * - If callee wants default: $filter('vnProductImageFilter')(product.imageCollections);
 * - if callee want default,small: $filter('vnProductImageFilter')(product.imageCollections, 'default', 'small');
 * - If callee want option named fuzzyFoo: $filter('vnProductImageFilter')(product.imageCollections, 'fuzzyFoo', 'medium');
 * - if no match is found an empty string is returned so callee can handle it with the theme default.
 */
angular.module('Volusion.toolboxCommon')
	.filter('vnProductImageFilter', function () {
		return function (imageCollections, optionName, imageSize) {

			/**
			 * @ngdoc method
			 * @name parseImage
			 * @param {String} option is the option name to parse the imageCollections for. Example: 'default'
			 * @param {String} imageSize is the string representation of the size property in an image collection. Example: 'medium'.
			 * @methodOf Volusion.toolboxCommon.filter:vnProductImageFilter
			 * @returns {String} imagePath is the configured url for the image site needs to display
			 *
			 * @description
			 * This is a private function used by the filter to parse images.
			 * If it doesn't find an image it returns an empty string.
			 * It uses the given option and size params to build and return a string with an image url in it If available.
			 */
			function parseImage(option, size) {
				var imagePath = '';

				if(imageCollections.length >= 0) {
					for(var i = imageCollections.length - 1; i >=0; i--) {
						var currentImageCollection = imageCollections[i];
						if(option === currentImageCollection.key) {
							imagePath = currentImageCollection.images[0][size];
							break;
						}
					}
				}

				return imagePath;
			}


			// Filter logic and gaurd code
			var imagePath = '';

			if (imageCollections && imageCollections.length <= 0) {					// Guard for when not a valid image collection, but passed
				imagePath = '';
			} else if (arguments.length === 1) {									// When only imageCollections arg is passed, do default
				imagePath = parseImage('default', 'medium');
			} else if(arguments.length === 3) {										// Get non-default image url from one of imageCollections.
				// return theme default
				imagePath = parseImage(optionName, imageSize);
			} else {
				throw new Error('vnProductImageFilter was unable to process the arguments supplied.');
			}

			return imagePath;
		};
	});

'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon:vnLegacyLink
 * @restrict AE
 *
 *
 * @description
 * The `vnLegacyLink` directive is used to link to URLs
 * which are not part of the Single Page Application.
 *
 * @usage
 * <a data-vn-legacy-link="/reviewnew.asp?productcode={{product.code}}">
 *     Write a Review
 * </a>
 *
 *
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnLegacyLink', [
		'$window',
		function ($window) {

			return {
				restrict: 'AE',
				link    : function (scope, element, attrs) {

					attrs.$observe('vnLegacyLink', function (newValue) {
						element.attr('href', newValue);
					});

					element.on('click', function (e) {
						e.preventDefault();
						$window.location.assign(this.href);
					});
				}
			};
		}
	]);

'use strict';

/**
 * @ngdoc filter
 * @name Volusion.toolboxCommon:vnLegacyLinkify
 *
 * @description
 * The `vnLegacyLinkify` filter sets the `target` attribute of `<a>` elements
 * within the HTML string passed in.
 *
 * @usage
 * <h1 data-vn-element="title" data-ng-bind-html="article.title | vnLegacyLinkify | html"></h1>
 *
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.filter('vnLegacyLinkify',
		function() {

			return function(html) {
				var $div = angular.element('<div/>').html(html);
				angular.forEach($div.find('a'), function(a) {
					var $a = angular.element(a);
					$a.attr('target', $a.attr('target') || '_self');
				});
				return $div.html();
			};
		});

'use strict';
/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnPaginator
 *
 * @description
 * The `vnPaginator` directive displays pagination controls with
 * methods on the scope to allow moving to the next and previous
 * page.
 *
 * @restrict A
 *
 * @requires
 * vnProductParams
 * themeSettings
 *
 * @scope
 *
 * @usage
 * <div vn-paginator cursor="cursor" current-page="currentPage" query-fn="queryProducts()"></div>
 *
 * */


angular.module('Volusion.toolboxCommon')
	.directive('vnPaginator', ['vnProductParams', 'themeSettings', function (vnProductParams, themeSettings) {

		return {
			templateUrl: 'pagination/vnPaginator.tpl.html',

            restrict   : 'A',

            scope      : {
				cursor : '=',
				queryFn: '&'
			},
			link: function postLink(scope, elem, attrs) {

				vnProductParams.setPageSize(themeSettings.getPageSize());

				scope.nextPage = function () {
					if (scope.cursor.currentPage < scope.cursor.totalPages) {
						vnProductParams.nextPage();
						scope.queryFn();
					}
				};

				scope.prevPage = function () {
					if (scope.cursor.currentPage > 1) {
						vnProductParams.previousPage();
						scope.queryFn();
					}
				};

				scope.$watch(attrs.cursor, function (value) {

					if (value === undefined) {
						return;
					}

					scope.currentPage = value.currentPage.toString();
					vnProductParams.setPage(scope.currentPage);
				}, true);
			}
		};
	}]);

'use strict';
/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnSearchForm
 *
 * @description
 * The `vnSearchForm` directive displays the search box and the
 * search toggle menu displayed in the mobile screen size.
 *
 * @restrict AE
 *
 * @scope
 *
 * @usage
 * <div vn-search-form></div>
 *
 * */


angular.module('Volusion.toolboxCommon')
	.directive('vnSearchForm', ['vnSearchManager', function (vnSearchManager) {

		return {
			templateUrl: 'productsearch/vnSearchForm.tpl.html',
			restrict   : 'AE',
			replace    : true,
            scope       : {
                searchTerm : '=',
                showSearch : '='
            },
			link       : function postLink(scope, element, attrs) {
				element.bind('click', function () {
					element.find('input').focus();
				});

                scope.searchTerm = scope.searchTerm || vnSearchManager.getSearchText();
                scope.allowCollapse = attrs.allowCollapse && !!(JSON.parse(attrs.allowCollapse));

                scope.doSearch = function () {
                    vnSearchManager.updateSearch(scope.searchTerm);
                };
			}
		};
	}]);

'use strict';

/**
 * @ngdoc service
 * @name volusionMethodThemeApp.searchManager
 * @description
 * # searchManager
 * Factory in the volusionMethodThemeApp.
 */
angular.module('Volusion.toolboxCommon')
	.factory('vnSearchManager', ['$route', '$location', 'vnProductParams', function ($route, $location, vnProductParams) {

        function getSearchText() {
            return vnProductParams.getSearchText();
        }

		function updateSearch(terms) {
			vnProductParams.updateSearch(terms);
			$location.search('q', terms);
			if ('/search' !== $location.path()) {
				$location.path('/search');
			}
			$route.reload();
		}


		return {
            getSearchText: getSearchText,
			updateSearch: updateSearch
		};
	}]);

'use strict';

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnScrollToAnchor
 * @restrict A
 * @scope
 *
 *
 * @description
 * Directive to automatically scroll to the `hash` location in
 * the page.
 *
 * @usage
 *
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.directive('vnScrollToAnchor', ['$location', '$anchorScroll',
		function ($location, $anchorScroll) {

			return {
				restrict: 'AC',
				compile : function () {

					return function (scope, element, attr) {
						element.bind('click', function (event) {
							event.preventDefault();
							$location.hash(attr.vnScrollToAnchor);
							$anchorScroll();
						});
					};
				}
			};
		}]);

angular.module('Volusion.toolboxCommon')
    .value('vnApiConfigurations', {});

// TODO: Determine if this is still necessary and prune if no.
/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnApiProducts
 * @description
 *
 * # vnApiProducts
 * The vnApiProducts value is used to hold and resolve the data returned from
 * the api. This is a value service that can be passed around and injected
 * where its needed.
 *
 */

angular.module('Volusion.toolboxCommon')
    .value('vnApiProducts', {});

// Todo: figure out which $resources need all the access types. Remove the unused queries: put, remove delete etc ...
angular.module('Volusion.toolboxCommon')
    .factory('vnApi', ['$resource', 'vnDataEndpoint', 'vnResourceTypes',
        function ($resource, vnDataEndpoint, vnResourceTypes) {
            'use strict';

            var headers = {'resource': ''};

            /**
             * @ngdoc method
             * @name Article
             * @methodOf Volusion.toolboxCommon.vnApi
             * @param {Object} params a key value object of the params needed to manage the request
             * @returns {$resource} $resource A $resource promise that resolves the the results of
             * the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Article().query() -> returns a list of all articles
             * - vnApi.Artiucl().get( {slug: about-us} ); -> Returns the article for About Us
             */
            function Article() {
                headers.resource = vnResourceTypes.article;

                return $resource(vnDataEndpoint.getApiUrl() + '/articles/:id',
                    { id : '@id' },
                    {
                        'get'   : { method: 'GET', headers: headers },
                        'save'  : { method: 'POST', headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
                    });

            }

            /**
             * @ngdoc method
             * @name Category
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource an angular $resource
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Category().query() -> returns a list of all articles
             * - vnApi.Category().get( {id: id} ); -> Returns the category for id
             * - vnApi.Category().get( {slug: slug} ); -> Returns the category for slug
             *
             */
            function Category() {
                headers.resource = vnResourceTypes.category;

                return $resource(vnDataEndpoint.getApiUrl() + '/categories/:id',
                    { id: '@id' },
                    {
                        'get'   : { method: 'GET', headers: headers},
                        'save'  : { method: 'POST', headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
                    });

            }

            /**
             * @ngdoc method
             * @name Cart
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource promise that resolves the the results of
             * the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Cart().query() -> returns the Cart data
             * - vnApi.Cart().post(???? FIX THIS ?????); -> Returns ???
             */
            function Cart() {
                headers.resource = vnResourceTypes.cart;

                return $resource(vnDataEndpoint.getApiUrl() + '/carts',
                    {},
                    {
                        'get'   : { method: 'GET', withCredentials: true, headers: headers },
                        'save'  : { method: 'POST', withCredentials: true, headers: headers },
                        'update': { method: 'PUT', withCredentials: true, headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
                    });
            }

            /**
             * @ngdoc method
             * @name Configuration
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource has a promise that resolves the results of
             * the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Configuration().query() -> returns a the site configuration data.
             */
            function Configuration() {
                headers.resource = vnResourceTypes.config;
                return $resource(vnDataEndpoint.getApiUrl() + '/config', {}, { headers: headers });
            }

            /**
             * @ngdoc method
             * @name Country
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Country().query() -> returns a list of all countries
             */
            function Country() {
                headers.resource = 'countries';
                return $resource(vnDataEndpoint.getApiUrl() + '/countries', {}, { headers: headers });
            }

            /**
             * @ngdoc method
             * @name Nav
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource promise that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Nav().query() -> returns all the navigations
             * - vnApi.Nav().get( {navId: 1} ); -> Returns the navigation for id = 1
             */
            function Nav() {
                headers.resource = vnResourceTypes.nav;
                return $resource(vnDataEndpoint.getApiUrl() + '/navs/:navId',
                    {navId: '@navId'},
                    {
                        'get'   : { method: 'GET', headers: headers },
                        'save'  : { method: 'POST', headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
                    });
            }

            /**
             * @ngdoc method
             * @name Product
             * @methodOf Volusion.toolboxCommon.vnApi
             * @params {Object} object should be any valid objectified key value pairs
             * @returns {$resource} $resource A $resource that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Product().query() -> returns a list of all products
             * - vnApi.Product().get( {slug: theSlug} ); -> Returns the product for slug, /api/v1/products?slug=theSlug
             * - vnApi.Product().get( {any possible query params} ); -> Returns a collection of products, /api/v1/products?{any valid params}
             *
             * ## Valid key value pairs for the endpoint
             * - key: value description follows here
             * - categoryIds: Numeric categoryIds of products to be retrieved. Example: 10
             * - slug: String slug of the product, which is the search engine optimized url keywords. Example: nike-air-jordan-2015-shoe
             * - search: Search string. Only the first 4 words seperated by spaces will be used in the search. Example: nike air jordan
             * - facets: String 1822,1818,1829 to filter products that are for example (Orange[1822] OR Red[1818]) AND Wood[1829]. Example: 1822,1818,1829
             * - minPrice: Numeric minPrice of products to be retrieved. Example: 25
             * - maxPrice: Numeric maxPrice of products to be retrieved. Example: 100
             * - accessoriesOf: Used to retrieve accessory products of specified product code(s). Example: ah-lchair
             * - sort: Sort order keyword of either relevance, lowest price, highest price, newest, oldest, or popularity. Example: relevance
             * - pageNumber: Numeric pageNumber of products to be retrieved. Example: 1
             * - pageSize: Numeric pageSize of products to be retrieved. Example: 10
             *
             */
            function Product() {
                headers.resource = vnResourceTypes.product;
                //Todo: put the possilbe query params into the description for documentation
                return $resource(vnDataEndpoint.getApiUrl() + '/products/:code',
                    {
                        code: '@code'
                    },
                    {
                        'get'   : { method: 'GET', headers: headers},
                        'save'  : { method: 'POST', headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
                    });
            }

            /**
             * @ngdoc method
             * @name Product
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Review().query() -> returns a list of all products
             * - vnApi.Review().get( {productCode: productCode} ); -> Returns the reviews for a product
             */

            function Review() {
                headers.resource = vnResourceTypes.reviews;
                return $resource(vnDataEndpoint.getApiUrl() + '/products/:code/reviews',
                    {
                        code: '@code'
                    },
                    {
                        'get'   : { method: 'GET', headers: headers },
                        'save'  : { method: 'POST', headers: headers },
                        'query' : { method: 'GET', isArray: false, headers: headers },
                        'remove': { method: 'DELETE', headers: headers },
                        'delete': { method: 'DELETE', headers: headers }
                    });
            }

            /**
             * @ngdoc method
             * @name ThemeSettings
             * @methodOf Volusion.toolboxCommon.vnApi
             * @returns {$resource} $resource A $resource that resolves the the results of the request.
             *
             * @description
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.ThemeSettings() -> returns a JSON with theme settings
             */

            function ThemeSettings() {
                headers.resource = vnResourceTypes.themesettings;
                return $resource('/settings/themeSettings.json', {}, { headers: headers });
            }

            return {
                Article      : Article,
                Category     : Category,
                Cart         : Cart,
                Configuration: Configuration,
                Country      : Country,
                Nav          : Nav,
                Product      : Product,
                Review       : Review,
                ThemeSettings: ThemeSettings
            };
        }]);

'use strict';

/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnAppRoute
 * @requires vnProductParams
 * @requires $location
 *
 * @description
 * # vnAppRoute
 * Factory in the Volusion.toolboxCommon module to implement the following business rules outlined below.
 *
 * # Category Navigation Rules - starts when customer lands on a category page via top level navigation.
 * Update the url to reflect categories and facets added (or removed in the case of facets) so that hte link can be
 * copied, pasted and shared. Intelligently figure out how to let customer click one of the categories and navigate to
 * that category page while keeping the rest of the categories already clicked or added to product params.
 *
 * - Top level (traditial website) navigation elements in header always go to /c/slug and reset the url (and product params)
 * - Detect navigation to here when $route params exist and there is a slug (slug not present when starting a search)
 * - Given a user navigates with the top level application nav menus, they:
 *     - Get a new category controller
 *     - All Product Params are cleared
 * - Given that a user is on a top level category page /c/:slug
 *     - When they click 'Narrow by' categories
 *     - Then, They are taken to that category page /c/:slug
 *     - And, any selected facets are preserved
 * - Category URLS should look like this:
 *     - /c/apparel?facets=123,456&sort=relevance&page=2&pageSize=32
 *     - /c/womens-apparel?facets=123,456&sort=relevance&page=2&pageSize=32
 *     - /c/mens-apparel?facets=123,456&sort=relevance&page=2&pageSize=32/c/womens-activewear?facets=123,456&sort=relevance&page=2&pageSize=32
 *
 * # Search Navigation Rules - starts when a customer searches with the site provided search box.
 * Intelligently decide when to take the customer to a category page while preserving hte search information. Update the
 * url with consumable information so that the link can be copied, pasted and the same app state passed to a different customer.
 *
 * - Given a user searches for chair, then:
 *     - The url will change to /search?q=chair
 *     - If the user selects one or more facets
 *         - Then they stay on the /search?q=chair
 *         - And, the url is updated to /search?q=chair&facets=123,321&categoryIds=123
 *     - If the user selects the home-decor or furniture categories in Narrow by
 *         - Then, they are taken to /c/home-decor?q=chair&facets=123,321&categoryIds=123
 *         - Then, they are taken to /c/furniture?q=chair&facets=123,321&categoryIds=123
 * - Detect search when the $route has q parameter with a search term value.
 * - New search restarts the process and clears the url (and product params)
 *
 */

angular.module('Volusion.toolboxCommon')
	.factory('vnAppRoute', ['$q', '$rootScope', '$route', '$location', '$routeParams', 'vnProductParams', 'vnSortDefault',
		function ($q, $rootScope, $route, $location, $routeParams, vnProductParams, vnSortDefault) {

			var currentStrategy = '';
//			var currentUpdate = {
//
//			}


			/**
			 * @ngdoc function
			 * @name watchParams
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * NOTE: In code this is unnamed but it uses the $rootScope.$watch(fn1, fn2) form.
			 * Sets up a deep watch on the vnProductParams object. When changes are detected it updates the app route.
			 */
			$rootScope.$watch(
				function () {
					return vnProductParams.getParamsObject();
				}, function () {
					updateActiveRoute(vnProductParams.getParamsObject());
				}, true  // Deep watch the params object.
			);


			/**
			 * @ngdoc function
			 * @name updateActiveRoute
			 * @param {Object} paramsObject should be returned from the vnProductParams.getParamsObject() and passed in
			 * here.
			 *
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Runs the functions needed to update an apps url with consumable info. This is called from the theme:
			 * - when category or search routes are resolved (shared link / direct navigation
			 * - when intra category navigation is detected as customer changes the category used to narrow products.
			 *
			 * We currently update routes for the following:
			 * - categoryId
			 * - facetIds
			 * - minPrice
			 * - maxPrice
			 * - page (as in the current page retrieved from api)
			 * - sort (strategy for sorting)
			 */
			function updateActiveRoute(paramsObject) {
				if(!paramsObject) {
					return;
				}

				updateCategory();
				updateFacets();
				updateMinPrice();
				updateMaxPrice();
				updatePage();
				updateSort();
				updateSearch();

//				applyUpdates();
			}

			/**
			 * @ngdoc function
			 * @name updateCategory
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for a category and update the route is there is one. If there is not one,
			 * remove the **categoryId** query string from the route.
			 */
			function updateCategory() {
				if ('search' === getRouteStrategy() && '' !== vnProductParams.getCategoryString()) {
					$location.search('categoryId', vnProductParams.getCategoryString());
				} else {
					$location.search('categoryId', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name updateFacets
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for facets and update the route is there is one. If there is not one,
			 * remove the **facetIds** query string from the route.
			 */
			function updateFacets() {
				if ('' !== vnProductParams.getFacetString()) {
					$location.search('facetIds', vnProductParams.getFacetString());
				} else {
					$location.search('facetIds', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name updateMaxPrice
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for maxPrice and update the route is there is one. If there is not one,
			 * remove the **maxPrice** query string from the route.
			 */
			function updateMaxPrice() {
				if ('' !== vnProductParams.getMaxPrice()) {
					$location.search('maxPrice', vnProductParams.getMaxPrice());
				} else {
					$location.search('maxPrice', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name updateMinPrice
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for minPrice and update the route is there is one. If there is not one,
			 * remove the **minPrice** query string from the route.
			 */
			function updateMinPrice() {
				if ('' !== vnProductParams.getMinPrice()) {
					$location.search('minPrice', vnProductParams.getMinPrice());
				} else {
					$location.search('minPrice', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name updatePage
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for facets and update the route is there is one. If there is not one,
			 * remove the **page** query string from the route.
			 */
			function updatePage() {
				if('' !== vnProductParams.getPage() && '1' !== vnProductParams.getPage() ) {
					$location.search('page', vnProductParams.getPage());
				} else {
					$location.search('page', null);
				}
			}

			function updateSearch() {
				if('/search' !== $location.path()) {
					return;
				} else if ('/search' === $location.path() && '' === vnProductParams.getSearchText()) {
					$location.search('q', '');
				} else {
					$location.search('q', vnProductParams.getSearchText());
				}
			}

			/**
			 * @ngdoc function
			 * @name updateSort
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Check the product params for sort strategy
			 * - If the sort strategy is the default leave it out of the url
			 * - If it's there and not default update the url
			 * - If there is no sort strategy, remove the **sort** query string from the route
			 */
			function updateSort() {
				if('' !== vnProductParams.getSort() && vnSortDefault !== vnProductParams.getSort()) {
					$location.search('sort', vnProductParams.getSort());
				} else {
					$location.search('sort', null);
				}
			}

			/**
			 * @ngdoc function
			 * @name setRouteStrategy
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 *
			 * @description
			 * Set the current routing strategy. It is the responsability of the calling theme controller to set this
			 * to either 'search' or 'category' to enable smarter management of the categoryId queryParam.
			 */
			function setRouteStrategy(strategy) {
				currentStrategy = strategy;
			}

			/**
			 * @ngdoc function
			 * @name getRouteStrategy
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 * @return {String} currentStrategy
			 *
			 * @description
			 * Is the result of this if you need to know what routing strategy the service is currently useing.
			 */
			function getRouteStrategy() {
				return currentStrategy;
			}

			/**
			 * @ngdoc function
			 * @name resolveParams
			 * @methodOf Volusion.toolboxCommon.vnAppRoute
			 * @return {Object} deferred.promise is a $q.promise object that can and should be resolved immediately with
			 * boolean true.
			 *
			 * @description
			 * Is the result of this if you need to know what routing strategy the service is currently using.
			 * This is used in Method in two places:
			 * 1. When the app is configured it is put into the resolve section for the /c/:slug & /search routes.
			 * 2. When the method theme category controller is used for app navigation between categories or sub-categories
			 * the query params are consumed in the $viewContentLoaded event.
			 */
			function resolveParams(locations) {
				/**
				 @function
				 @name resolveParameters
				 @description set the vnParmeterObject up with current URL information if its there.
				 @param {Object} location
				 @param {Object} params
				 @return promise
				 */
				var deferred = $q.defer();

				vnProductParams.preLoadData(locations);
				deferred.resolve(true);

				return deferred.promise;

			}

			return {
				getRouteStrategy: getRouteStrategy,
				setRouteStrategy: setRouteStrategy,
				resolveParams   : resolveParams
			};
		}]);

'use strict';

/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.service:vnBem
 *
 * @requires
 * @scope
 *
 * @description
 *
 *
 * @usage
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.factory('vnBem', function () {

		function generateClasses(base, modifiers) {
			var result = [base];
			angular.forEach(splitModifiers(modifiers), function (modifier) {
				result.push(base + '--' + modifier);
			});
			return result;
		}

		function splitModifiers(modifiers) {
			modifiers = modifiers && modifiers.replace(/^\s+|\s+$/g, '');
			if (!modifiers) {
				return [];
			}
			return modifiers.split(/\s+/);
		}

		return {
			addClasses: function ($elem, options) {

				options = options || {};

				var block = options.block;
				if (!block) {
					return;
				}

				var blockClasses = generateClasses(block, options.blockModifiers);

				var element = options.element;

				if (!element) {
					angular.forEach(blockClasses, function (blockClass) {
						$elem.addClass(blockClass);
					});
					return;
				}

				var elementClasses = generateClasses('__' + element, options.elementModifiers);
				angular.forEach(blockClasses, function (blockClass) {
					angular.forEach(elementClasses, function (elementClass) {
						$elem.addClass(blockClass + elementClass);
					});
				});
			}
		};
	});

angular.module('Volusion.toolboxCommon')
	.service('vnCart', ['vnApi',
		function (vnApi) {

			'use strict';

			var cart = {};

			function getCart() {
				return cart;
			}

			function getCartItemsCount() {
				if (cart === undefined || cart.totals === undefined) {
					return 0;
				}

				return cart.totals.qty;
			}

			function init() {

				// Initial cartId is empty
				vnApi.Cart({ cartId: '' }).get().$promise
					.then(function (response) {
						cart = response.data;
					});
			}

			function reset() {
				cart = {};
			}

			function saveCart(cartItem) {
				return vnApi.Cart().save({cartId: cart.id}, cartItem).$promise
					.then(function (response) {
						// on success
						cart = response.data;
						cart.serviceErrors = [];
						cart.warnings = response.warnings || response.data.warnings || [];
					},
					function (response) {
						// on error
						cart = response.data.data;
						cart.serviceErrors = response.serviceErrors || response.data.serviceErrors || [];
						cart.warnings = response.warnings || response.data.warnings || [];
					})
					.then(function () {
						return cart;
					});
			}

			function updateCart() {
				return vnApi.Cart().update({cartId: cart.id}, cart).$promise
					.then(function (response) {
						// on success
						cart = response.data;
						cart.serviceErrors = [];
						cart.warnings = response.warnings || response.data.warnings || [];
					},
					function (response) {
						// on error
						cart = response.data.data;
						cart.serviceErrors = response.serviceErrors || response.data.serviceErrors || [];
						cart.warnings = response.warnings || response.data.warnings || [];
					})
					.then(function () {
						return cart;
					});
			}

			return {
				getCart          : getCart,
				getCartItemsCount: getCartItemsCount,
				init             : init,
				reset            : reset,
				saveCart         : saveCart,
				updateCart		 : updateCart
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
                //api     : 'http://www.samplestore.io/api/v1', // This has moved into vnDataEndpoint value.
                account : 'asdf123',
                context : 'SiteBuilder',
                firebase: 'https://brilliant-fire-5600.firebaseio.com',
                fbToken : ']idk - this comes from ??? server[',
                apiToken: ']idk - how do I know if I am logging into edit[',
                sandbox : 'http://localhost:8080'
            };

            //Simulate an admin login response
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
	.provider('vnDataEndpoint', function () {

		'use strict';

		var firebase = 'https://brilliant-fire-5600.firebaseio.com',
			apibase = 'http://www.samplestore.io/api/v1';

		function VnDataEndpoint() {
			this.VnDataEndpoint = function () {
				return this;
			};

			/**
			 * @ngdoc method
			 * @name getFirebaseUrl
			 * @methodOf Volusion.toolboxCommon.vnDataEndpoint
			 * @returns {String} The string representing a Firebase resource
			 */
			this.getFirebaseUrl = function () {
				return firebase;
			};

			/**
			 * @ngdoc method
			 * @name getApiUrl
			 * @methodOf Volusion.toolboxCommon.vnDataEndpoint
			 * @returns {String} The string representing a API resource
			 */
			this.getApiUrl = function () {
				return apibase;
			};

		}

		// Method for instantiating
		this.$get = function () {
			return new VnDataEndpoint();
		};

		/**
		 * @ngdoc method
		 * @name setFirebaseUrl
		 * @methodOf Volusion.toolboxCommon.vnDataEndpoint
		 * @returns {String} Sets the string representing a Firebase resource
		 */
		this.setFirebaseUrl = function (path) {
			firebase = path;
		};

		/**
		 * @ngdoc method
		 * @name setApiUrl
		 * @methodOf Volusion.toolboxCommon.vnDataEndpoint
		 * @returns {String} Sets the string representing a API resource
		 */
		this.setApiUrl = function (path) {
			apibase = path;
		};

	});

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
//                            console.log('vds apiprods: ', vnApiArticles);
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
                    return $firebase(new Firebase(vnDataEndpoint.getFirebaseUrl() + fbItems[path] + '/' + vnConfig.getAccount() + '/'));
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
                    return vnDataEndpoint.getFirebaseUrl() + fbItems[path] + '/' + vnConfig.getAccount() + '/';
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

                var sbRef = $firebase(new Firebase(vnDataEndpoint.getFirebaseUrl() + '/account_sitebuilder/' + vnConfig.getAccount()));
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

'use strict';

angular.module('Volusion.toolboxCommon')
    .factory('vnHttpResponseInterceptor', ['$q', '$rootScope', function($q, $rootScope) {

        return {
            response: function(response) {
                // response.status === 200
                return response || $q.when(response);
            },
            responseError: function(rejection) {

                if(rejection.status === 500) {
                    $rootScope.$emit('VN_HTTP_500_ERROR', {err :rejection} , { status: rejection.status, message: rejection.data, resource: rejection.headers('resource') || '' });
                }

                return $q.reject(rejection);
            }
        };

    }]);

angular.module('Volusion.toolboxCommon')
	.factory('vnImagePreloader', ['$q', '$rootScope',
		function( $q, $rootScope ) {

			'use strict';

			/**
			 * @ngdoc function
			 * @name VnPreloader
			 * @methodOf Volusion.toolboxCommon.vnPreloader
			 *
			 * @description
			 * Manage the preloading of image objects. Accepts an array of image URLs.
			 **/
			function VnPreloader( imageLocations ) {

				// I am the image SRC values to preload.
				this.imageLocations = imageLocations;

				// As the images load, we'll need to keep track of the load/error
				// counts when announing the progress on the loading.
				this.imageCount = this.imageLocations.length;
				this.loadCount = 0;
				this.errorCount = 0;

				// I am the possible states that the preloader can be in.
				this.states = {
					PENDING: 1,
					LOADING: 2,
					RESOLVED: 3,
					REJECTED: 4
				};

				// I keep track of the current state of the preloader.
				this.state = this.states.PENDING;

				// When loading the images, a promise will be returned to indicate
				// when the loading has completed (and / or progressed).
				this.deferred = $q.defer();
				this.promise = this.deferred.promise;
			}

			// ---
			// STATIC METHODS.
			// ---

			/**
			 * @ngdoc function
			 * @name preloadImages
			 * @methodOf Volusion.toolboxCommon.vnPreloader
			 *
			 * @description
			 * reload the given images [Array] and return a promise. The promise
			 * will be resolved with the array of image locations.
			 **/
			VnPreloader.preloadImages = function( imageLocations ) {

				var preloader = new VnPreloader( imageLocations );

				return( preloader.load() );
			};

			// INSTANCE METHODS.
			VnPreloader.prototype = {

				// Best practice for 'instnceof' operator.
				constructor: VnPreloader,

				// PUBLIC METHODS.

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnPreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				isInitiated: function isInitiated() {
					return( this.state !== this.states.PENDING );
				},

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnPreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I determine if the preloader has failed to load all of the images.
				isRejected: function isRejected() {
					return( this.state === this.states.REJECTED );
				},

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnPreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I determine if the preloader has successfully loaded all of the images.
				isResolved: function isResolved() {
					return( this.state === this.states.RESOLVED );
				},

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnPreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I initiate the preload of the images. Returns a promise.
				load: function load() {
					// If the images are already loading, return the existing promise.
					if ( this.isInitiated() ) {
						return( this.promise );
					}

					this.state = this.states.LOADING;

					for ( var i = 0 ; i < this.imageCount ; i++ ) {
						this.loadImageLocation( this.imageLocations[ i ] );
					}

					// Return the deferred promise for the load event.
					return( this.promise );
				},

				// PRIVATE METHODS.

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnPreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I handle the load-failure of the given image location.
				handleImageError: function handleImageError( imageLocation ) {
					this.errorCount++;

					// If the preload action has already failed, ignore further action.
					if ( this.isRejected() ) {
						return;
					}

					this.state = this.states.REJECTED;

					this.deferred.reject( imageLocation );
				},

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnPreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I handle the load-success of the given image location.
				handleImageLoad: function handleImageLoad( imageLocation ) {
					this.loadCount++;

					// If the preload action has already failed, ignore further action.
					if ( this.isRejected() ) {
						return;
					}

					// Notify the progress of the overall deferred. This is different
					// than Resolving the deferred - you can call notify many times
					// before the ultimate resolution (or rejection) of the deferred.
					this.deferred.notify({
						percent: Math.ceil( this.loadCount / this.imageCount * 100 ),
						imageLocation: imageLocation
					});

					// If all of the images have loaded, we can resolve the deferred
					// value that we returned to the calling context.
					if ( this.loadCount === this.imageCount ) {
						this.state = this.states.RESOLVED;
						this.deferred.resolve( this.imageLocations );
					}
				},

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnPreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I load the given image location and then wire the load / error
				// events back into the preloader instance.
				// --
				// NOTE: The load/error events trigger a $digest.
				loadImageLocation: function loadImageLocation( imageLocation ) {
					var preloader = this;

					// When it comes to creating the image object, it is critical that
					// we bind the event handlers BEFORE we actually set the image
					// source. Failure to do so will prevent the events from proper
					// triggering in some browsers.
					var image = $( new Image() )
						.load(function( event ) {

							// Since the load event is asynchronous, we have to
							// tell AngularJS that something changed.
							$rootScope.$apply(
								function() {
									preloader.handleImageLoad( event.target.src );

									// Clean up object reference to help with the
									// garbage collection in the closure.
									preloader = image = event = null;
								}
							);
						})
						.error(
						function( event ) {

							// Since the load event is asynchronous, we have to
							// tell AngularJS that something changed.
							$rootScope.$apply(
								function() {
									preloader.handleImageError( event.target.src );

									// Clean up object reference to help with the
									// garbage collection in the closure.
									preloader = image = event = null;
								}
							);
						})
						.prop( 'src', imageLocation );
				}
			};

			// Return the factory instance.
			return( VnPreloader );

		}]);

angular.module('Volusion.toolboxCommon')
	.factory('vnProductParams', function () {

		'use strict';

		/**
		 * @ngdoc property
		 * @name categoryIds
		 * @property {Array} categoryIds
		 * @propertyOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * An array to hold category ids that have been selected by someone.
		 */
		var categoryIds = [],    // Container for the category id's to query for
		/**
		 * @ngdoc property
		 * @name facets
		 * @property {Array} facets
		 * @propertyOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * An array to hold facet ids that have been selected by someone.
		 */
		facets = [],             // Container for the facets to query for
		//        currentPage = '',
		/**
		 * @ngdoc property
		 * @name paramsObject
		 * @property {Array} paramsObject
		 * @propertyOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * An object that holds properties representing all the possible product api parameter options. It should be
		 * passed to the vnApi.Products().get( paramsObject ); and used with a promises pattern.
		 */
		paramsObject = {
			categoryIds  : '',
			slug         : '',
			facets       : '',
			minPrice     : '',
			maxPrice     : '',
			accessoriesOf: '',
			sort         : '',
			page         : '',
			pageSize     : ''
		};

		/**
		 * @ngdoc function
		 * @name addCategory
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Given an id (as Int I believe at time of writing) If it is not already in the categoryIds array, add it to the
		 * categoryIds array and update the paramsObject.categoryIds value.
		 */
		function addCategory(id) {

			//Todo: refactor params object and change category related methods from [] to String
			categoryIds.length = 0;
			categoryIds.push(id);
			paramsObject.categoryIds = getCategoryString();
		}

		/**
		 * @ngdoc function
		 * @name addFacet
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Add the given id to the facets array and update the paramsObject.facets value.
		 *
		 * ## Dev note:
		 *
		 * - this doesn't have a guard for adding duplicates. as I rely on the way I call it in the directive to check
		 * if isFacetSelected
		 */
		function addFacet(id) {
			facets.push(id);
			paramsObject.facets = getFacetString();
		}


		/**
		 * @ngdoc function
		 * @name getAccessoriesOf
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Getter for the paramsObject accessoriesOf property.
		 */
		function getAccessoriesOf() {
			return paramsObject.accessoriesOf;
		}

		/**
		 * @ngdoc function
		 * @name getCategoryString
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Return the items in categoryIds as a string joined by commas.
		 */
		function getCategoryString() {
			return categoryIds.join(',');
		}

		/**
		 * @ngdoc function
		 * @name getFacetString
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Return the items in the facets array as a  string joined with commas.
		 * if isFacetSelected
		 */
		function getFacetString() {
			// stringify the facets array and return it.
			return facets.join(',');
		}

		/**
		 * @ngdoc function
		 * @name getMaxPrice
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Getter for the paramsObject.maxPrice property.
		 */
		function getMaxPrice() {
			return paramsObject.maxPrice;
		}

		/**
		 * @ngdoc function
		 * @name getMinPrice
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Getter for the paramsObject.minPrice property.
		 */
		function getMinPrice() {
			return paramsObject.minPrice;
		}

		/**
		 * @ngdoc function
		 * @name getPage
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Getter for the paramsObject page property.
		 */
		function getPage() {
			return paramsObject.page;
		}

		/**
		 * @ngdoc function
		 * @name getPageSize
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Getter for the paramsObject pageSize property.
		 */
		function getPageSize() {
			return paramsObject.pageSize;
		}

		/**
		 * @ngdoc function
		 * @name getParamsObject
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Return the paramsObject in its current state.
		 */
		function getParamsObject() {
			return paramsObject;
		}

		/**
		 * @ngdoc function
		 * @name getSearchText
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 * @return {String} productParams.search property that holds the current value of the search string.
		 *
		 * @description
		 * Return the paramsObject.search value in its current state. First implemented to watch in the search
		 * controller of the method theme.
		 */
		function getSearchText() {
			return paramsObject.search;
		}

		/**
		 * @ngdoc function
		 * @name getSort
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Getter for the paramsObject sort property.
		 */
		function getSort() {
			return paramsObject.sort;
		}

		/**
		 * @ngdoc function
		 * @name isFacetSelected
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Return true if the id is already in the facets array.
		 * Return false if the id is not already in the facets array.
		 */
		function isFacetSelected(id) {
			return (facets.indexOf(id) > -1);
		}

		/**
		 * @ngdoc function
		 * @name nextPage
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Sets the paramsObject page property to the next page.
		 */
		function nextPage() {
			paramsObject.page++;
		}

		/**
		 * @ngdoc function
		 * @name preloadData
		 * @param {Object} routeParams as the $routeParams service provided by angular.
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 *
		 */
		function preLoadData(searchParams) {
//			console.log('preloading params: ', searchParams);
			if (searchParams.categoryId) {
				addCategory(parseInt(searchParams.categoryId));
			}

			if (searchParams.facetIds) {
				var ids = searchParams.facetIds.split(',');
				angular.forEach(ids, function (id) {
					// vn-facet-search directive gets facet ids as numbers from product json data
					if (!isFacetSelected(parseInt(id))) {
						addFacet(parseInt(id));
					}
				});
			}

			if (searchParams.minPrice) {
				setMinPrice(searchParams.minPrice);
			}

			if (searchParams.maxPrice) {
//				console.log('setting max price to : ', searchParams.maxPrice);
				setMaxPrice(searchParams.maxPrice);
			}

			if (searchParams.q) {
				updateSearch(searchParams.q);
			}

			if (searchParams.sort) {
				setSort(searchParams.sort);
			}

			if (searchParams.page) {
				setPage(searchParams.page);
			}
//			console.log('preloaded paramsObject: ', paramsObject);
		}

		/**
		 * @ngdoc function
		 * @name previousPage
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Sets the paramsObject page property to the previous page.
		 */
		function previousPage() {
			paramsObject.page--;
		}

		/**
		 * @ngdoc function
		 * @name removeSlug
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Reset the paramsObject.slug property to ''.
		 */
		function removeSlug() {
			paramsObject.slug = '';
		}

		/**
		 * @ngdoc function
		 * @name removeSearch
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Reset the paramsObject.search property to ''.
		 */
		function removeSearch() {
			paramsObject.search = '';
		}

		/**
		 * @ngdoc function
		 * @name removeMinPrice
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Reset the paramsObject.minPrice property to ''.
		 */
		function removeMinPrice() {
			paramsObject.minPrice = '';
		}

		/**
		 * @ngdoc function
		 * @name removeMaxPrice
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * reset the paramsObject.maxPrice property.
		 */
		function removeMaxPrice() {
			paramsObject.maxPrice = '';
		}

		/**
		 * @ngdoc function
		 * @name removeAccessoriesOf
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * reset the paramsObject.accessoriesOf property.
		 */
		function removeAccessoriesOf() {
			paramsObject.accessoriesOf = '';
		}

		/**
		 * @ngdoc function
		 * @name removeCategory
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Remove the passed id from the categoryIds array and update the paramsObject.categoryIds value.
		 */
		function removeCategory(id) {
			var index = categoryIds.indexOf(id);
			categoryIds.splice(index, 1);
			paramsObject.categoryIds = getCategoryString();
		}

		/**
		 * @ngdoc function
		 * @name removeFacet
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Given an id, remove it from the facets array and update the paramsObject.facets value.
		 */
		function removeFacet(id) {
			var index = facets.indexOf(id);
			facets.splice(index, 1);
			paramsObject.facets = getFacetString();
		}

		/**
		 * @ngdoc function
		 * @name removeSort
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * reset the paramsObject.sort property.
		 */
		function removeSort() {
			paramsObject.sort = '';
		}

		/**
		 * @ngdoc function
		 * @name resetCategories
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * reset the category list to nothing
		 */
		function resetCategories() {
			categoryIds = [];
			paramsObject.categoryIds = '';
		}

		/**
		 * @ngdoc function
		 * @name resetFacets
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * reset the facet list to nothing
		 */
		function resetFacets() {
			facets = [];
			paramsObject.facets = '';
		}

		/**
		 * @ngdoc function
		 * @name resetParamsObject
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Return everything in this factory to initial state, blank and fresh and ready for more product searches.
		 */
		function resetParamsObject() {
			categoryIds = [];
			facets = [];
			paramsObject = {
				categoryIds  : '',
				slug         : '',
				facets       : '',
				minPrice     : '',
				maxPrice     : '',
				accessoriesOf: '',
				sort         : '',
				page         : '',
				pageSize     : ''
			};
		}

		/**
		 * @ngdoc function
		 * @name setAccessories
		 * @param {String} productCode is a string that will cause the api to return accessories of the product code.
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Setter for the paramsObject accessoriesOf property.
		 */
		function setAccessoriesOf(productCode) {
			paramsObject.accessoriesOf = productCode;
		}

		/**
		 * @ngdoc function
		 * @name setMaxPrice
		 * @param {String} numString is a string representing the max prioce to query product by.
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Setter for the paramsObject.maxPrice  property.
		 */
		function setMaxPrice(numString) {
			paramsObject.maxPrice = numString;
		}

		/**
		 * @ngdoc function
		 * @name setMinPrice
		 * @param {String} numString is a string representing the min price to query product by.
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Setter for the paramsObject.minPrice  property.
		 */
		function setMinPrice(numString) {
			paramsObject.minPrice = numString;
		}

		/**
		 * @ngdoc function
		 * @name setPage
		 * @param {String} setPage is a string that can be passed to api to modify the page to ask backend for
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Setter for the paramsObject page property.
		 */
		function setPage(page) {
			paramsObject.page = page;
		}

		/**
		 * @ngdoc function
		 * @name setPageSize
		 * @param {String} setPageSize is a string that can be passed to api to modify the page to ask backend for
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Setter for the paramsObject page property.
		 */
		function setPageSize(pageSize) {
			paramsObject.pageSize = pageSize;
		}

		/**
		 * @ngdoc function
		 * @name setSort
		 * @param {String} sortString is a string that can be passed to api to modify the sorting of the results
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Setter for the paramsObject sort property.
		 */
		function setSort(sortString) {

			paramsObject.sort = sortString;
		}

		/**
		 * @ngdoc function
		 * @name updateSearch
		 * @param {String} searchString is a string representing a string types by customer to search on products.
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * No matter what, it updates the paramsObject.search property.
		 */
		function updateSearch(searchString) {
			paramsObject.search = decodeURIComponent(searchString);
		}

		// Public API here
		return {
			addCategory        : addCategory,
			addFacet           : addFacet,
			getAccessoriesOf   : getAccessoriesOf,
			getCategoryString  : getCategoryString,
			getFacetString     : getFacetString,
			getMaxPrice        : getMaxPrice,
			getMinPrice        : getMinPrice,
			getPage            : getPage,
			getPageSize        : getPageSize,
			getParamsObject    : getParamsObject,
			getSearchText      : getSearchText,
			getSort            : getSort,
			isFacetSelected    : isFacetSelected,
			nextPage           : nextPage,
			preLoadData        : preLoadData,
			previousPage       : previousPage,
			removeSlug         : removeSlug,
			removeSearch       : removeSearch,
			removeMinPrice     : removeMinPrice,
			removeMaxPrice     : removeMaxPrice,
			removeAccessoriesOf: removeAccessoriesOf,
			removeCategory     : removeCategory,
			removeFacet        : removeFacet,
			removeSort         : removeSort,
			resetCategories    : resetCategories, // Todo: confimrm this is used
			resetFacets        : resetFacets,     // Todo: confimrm this is used
			resetParams        : resetParamsObject,
			setAccessoriesOf   : setAccessoriesOf,
			setMaxPrice        : setMaxPrice,
			setMinPrice        : setMinPrice,
			setPage            : setPage,
			setPageSize        : setPageSize,
			setSort            : setSort,
			updateSearch       : updateSearch
		};
	});



angular.module('Volusion.toolboxCommon')
    .constant('vnResourceTypes', {
        article: 'article',
        cart: 'cart',
        category: 'category',
        config: 'config',
        countries: 'countries',
        nav: 'nav',
        product: 'product',
        reviews: 'reviews',
        themesettings: 'themesettings'

    });

'use strict';

/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnSortDefault
 * @description
 * # vnSortDefault
 * Constant in the Volusion.toolboxCommon to set up the sorting directive.
 * Will be ideal to have it in a constant so that vnAppRoute service can use it to
 * implement logic rules that relate to how urls should behave / look.
 */
angular.module('Volusion.toolboxCommon')
  .constant('vnSortDefault', 'relevence');

'use strict';
/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.themeSettings
 *
 * @description
 * # themeSettings
 * The themeSettings service is used to fetch the theme settings
 * using the vnApi, so that it can be used within the theme.
 *
 * @requires $q, vnApi
 */

angular.module('Volusion.toolboxCommon')
	.service('themeSettings', ['$q', 'vnApi',
		function ($q, vnApi) {

			var themeSettings = {};

			function hasEmptySettings(obj) {
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						return false;
					}
				}
				return true;
			}

			function init() {
				if (hasEmptySettings(themeSettings)) {
					vnApi.ThemeSettings().get().$promise
						.then(function (response) {
							// Remember themeSettings is a $resource!
							themeSettings = response;
						});
				}
			}

			function getPageSize() {
				return themeSettings.itemsPerPage || 8;
			}

			function getThemeSettings() {
				var deferred = $q.defer();

				if (hasEmptySettings(themeSettings)) {
					vnApi.ThemeSettings().get().$promise
						.then(function (response) {
							deferred.resolve(response);
							themeSettings = response;
						});
				} else {
					deferred.resolve(themeSettings);
				}

				return deferred.promise;
			}

			return {
				init            : init,
				getThemeSettings: getThemeSettings,
				getPageSize     : getPageSize
			};
		}]);

'use strict';

angular.module('Volusion.toolboxCommon')
	.factory('storage', [
		'$window', '$cookieStore',
		function($window, $cookieStore) {

			function createLocalStorageAdapter() {
				return {
					get: function(key) {
						var value = $window.localStorage.getItem(key);
						if (value === null) {
							return resolveCookieValue(key);
						}
						return value;
					},
					set: function(key, value) {
						return $window.localStorage.setItem(key, value);
					},
					remove: function(key) {
						return $window.localStorage.removeItem(key);
					}
				};
			}

			function resolveCookieValue(key) {
				var value = $cookieStore.get(key);
				return (typeof value === 'undefined') ? null : value;
			}

			function createCookieStorageFacade() {
				return {
					get: function(key) {
						return resolveCookieValue(key);
					},
					set: function(key, value) {
						return $cookieStore.put(key, value);
					},
					remove: function(key) {
						return $cookieStore.remove(key);
					}
				};
			}

			if ('localStorage' in $window && $window.localStorage !== null) {
				return createLocalStorageAdapter();
			} else {
				return createCookieStorageFacade();
			}

		}
	]);

'use strict';

var storageKey = 'VN_TRANSLATE';

// ReSharper disable once InconsistentNaming
function Translate($translate, $translatePartialLoader, storage, options, disableTranslations) {
	this.$translate = $translate;
	this.$translatePartialLoader = $translatePartialLoader;
	this.storage = storage;
	this.disableTranslations = disableTranslations;
	this.configure(angular.extend(options, this.getConfig()));
	this.addPart = $translatePartialLoader.addPart;
}

Translate.prototype.getConfig = function() {
	var storage = this.storage;
	var config = JSON.parse(storage.get(storageKey)) || {};
	var lang = storage.get('NG_TRANSLATE_LANG_KEY');
	if (!this.disableTranslations && lang && lang !== 'undefined') {
		config.lang = lang;
	}
	return config;
};

Translate.prototype.configure = function(config) {
	config = angular.extend(this.getConfig(), config);
	this.storage.set(storageKey, JSON.stringify(config));
	this.$translate.use(config.lang);
};

Translate.prototype.addParts = function() {
	if (this.disableTranslations) {
		return true;
	}

	var loader = this.$translatePartialLoader;

	angular.forEach(arguments, function(part) {
		loader.addPart(part);
	});

	return this.$translate.refresh();
};


function TranslateProvider($translateProvider) {
	this.$translateProvider = $translateProvider;
	this.setPreferredLanguage = $translateProvider.preferredLanguage;
}

TranslateProvider.prototype.$get = [
	'$translate', '$translatePartialLoader', 'storage',
	function($translate, $translatePartialLoader, storage) {
		var options = this.options;

		return new Translate($translate, $translatePartialLoader, storage, {
			region: options.region,
			lang: options.lang,
			country: options.country
		}, options.disableTranslations);
	}
];

TranslateProvider.prototype.configure = function(options) {
	options = angular.extend({ region: 'us', lang: 'en', country: 'us' }, options);

	if (options.lang) {
		this.setPreferredLanguage(options.lang);
	}
	this.options = options;

	if (!options.disableTranslations) {
		this.initTranslateProvider(options.lang);
	}
};

TranslateProvider.prototype.initTranslateProvider = function(lang) {
	var $translateProvider = this.$translateProvider;
	$translateProvider.useLoader('$translatePartialLoader', {
		urlTemplate: '/translations/{part}/{lang}.json'
	});
	if (lang === 'en') {
		$translateProvider.useMessageFormatInterpolation();
	}
	$translateProvider.useMissingTranslationHandlerLog();
	$translateProvider.useLocalStorage();
};

angular.module('Volusion.toolboxCommon')
	.provider('translate', ['$translateProvider', TranslateProvider]);

angular.module('Volusion.toolboxCommon')
	.filter('html', [
		'$sce',
		function ($sce) {

			'use strict';

			return function (content) {
				return $sce.trustAsHtml(content);
			};
		}
	]);

angular.module('Volusion.toolboxCommon')
	.filter('reverse', function() {

		'use strict';

		return function(items) {
			return (items === undefined) ? null : items.slice().reverse();
		};
	});

angular.module('Volusion.toolboxCommon')
	.filter('seoFriendly', function seoFriendly() {

		'use strict';

		return function (input) {
			var words = input.match(/[0-9a-z]+/gi);
			return words ? words.join('-') : '';
		};
	});

angular.module('Volusion.toolboxCommon.templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("vn-faceted-search/vn-category-search.html",
    "<div class=vn-category-search__category-items data-ng-repeat=\"cat in categories\" data-ng-class=\"{ '-last': $last }\">\n" +
    "\n" +
    "	<a href data-ng-if=\"cat.displayStrategy == 'categoryDisplayTwo' || cat.displayStrategy == 'categoryDisplayThree' \" data-ng-click=buildAppUrl(cat) class=vn-category-search__category-items__category-title data-ng-class=\"{ '-noborder': $last && cat.displayStrategy == 'categoryDisplayOne' }\">\n" +
    "\n" +
    "		<span data-ng-if=\"cat.displayStrategy == 'categoryDisplayTwo' \" class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "		{{ cat.name }}\n" +
    "	</a>\n" +
    "	<span class=vn-category-search__category-items__category-title data-ng-if=\"cat.displayStrategy == 'categoryDisplayOne' \">{{ cat.name }}</span>\n" +
    "	<div class=vn-category-search__category-items__category-item data-ng-repeat=\"subCat in cat.subCategories\" data-ng-class=\"{ '-noborder': $last }\">\n" +
    "\n" +
    "		<span data-ng-if=subCat.hideSubCatLink>{{ subCat.name }}</span>\n" +
    "		<a href data-ng-if=!subCat.hideSubCatLink data-ng-click=buildAppUrl(subCat)>{{ subCat.name }}</a>\n" +
    "	</div>\n" +
    "</div>");
  $templateCache.put("vn-faceted-search/vn-facet-search.html",
    "<div data-accordion-group class=facet-item data-ng-repeat=\"facet in facets track by $index\" data-is-open=defaultAccordianOpen>\n" +
    "	<div data-accordion-heading>\n" +
    "		<div>\n" +
    "			<span>{{ facet.title }}</span>\n" +
    "			<i class=\"pull-right glyphicon\" data-ng-class=\"{'glyphicon-chevron-down': defaultAccordianOpen, 'glyphicon-chevron-right': !defaultAccordianOpen}\"></i>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "    <div data-ng-if=\"facet.displayType != 'swatches'\" class=facet-properties>\n" +
    "        <label class=facet-property data-ng-repeat=\"property in facet.properties track by $index\" data-ng-class=\"{ '-last': $last }\">\n" +
    "\n" +
    "            <input type=checkbox name=property.name data-ng-checked=selectProperty(property) data-ng-click=\"refineFacetSearch(property)\">\n" +
    "            <span class=name>{{ property.name }}</span>\n" +
    "            <span class=count>{{ property.count }}</span>\n" +
    "        </label>\n" +
    "    </div>\n" +
    "    <div data-ng-if=\"facet.displayType == 'swatches'\" class=\"facet-properties clearfix\">\n" +
    "        <div data-ng-repeat=\"property in facet.properties\" class=facet-property__swatch data-ng-click=refineFacetSearch(property) data-ng-class=\"{'facet-property__swatch--selected': selectProperty(property)}\">\n" +
    "			<div class=facet-property__swatch--color data-ng-style=\"{'backgroundColor': property.color }\">\n" +
    "			</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
  $templateCache.put("vn-faceted-search/vn-faceted-search.html",
    "<div class=vn-faceted-search-header data-ng-show=showApplyButton>\n" +
    "	<button class=\"btn btn-success __cancel-action\" href data-ng-click=dismissMobileFilters()>Apply\n" +
    "	</button>\n" +
    "	\n" +
    "	<button class=\"btn __clear-action\" href data-ng-click=clearAllFilters()>Clear\n" +
    "	</button>\n" +
    "	\n" +
    "</div>\n" +
    "<div class=-faceted-search data-ng-show=showFacetSearch>\n" +
    "	<div class=facets>\n" +
    "		<div data-accordion data-close-others=false>\n" +
    "\n" +
    "			\n" +
    "			<div data-accordion-group class=facet-item__by-category data-is-open=categoryAccordiansOpen data-ng-show=\"categoryList.length > 0\">\n" +
    "				<div data-accordion-heading>\n" +
    "					<div>\n" +
    "						<span>Category</span>\n" +
    "						<i class=\"pull-right glyphicon\" data-ng-class=\"{'glyphicon-chevron-down': categoryAccordiansOpen, 'glyphicon-chevron-right': !categoryAccordiansOpen}\"></i>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div vn-category-search categories=categoryList query-products=queryProducts() data-ng-show=showCategorySearch class=category-search>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			\n" +
    "			<div vn-facet-search facets=facets query-products=queryProducts() data-ng-show=\"facets.length > 0\"></div>\n" +
    "\n" +
    "			\n" +
    "			<div data-accordion-group class=facet-item__by-price data-is-open=priceAccordiansOpen data-ng-show=\"facets.length > 0\">\n" +
    "				<div data-accordion-heading>\n" +
    "					<div>\n" +
    "						<span>Price</span>\n" +
    "						<i class=\"pull-right glyphicon\" data-ng-class=\"{'glyphicon-chevron-down': priceAccordiansOpen, 'glyphicon-chevron-right': !priceAccordiansOpen}\"></i>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=facet-item__by-price__inputs vn-price-search query-products=queryProducts()></div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		\n" +
    "		<div class=vn-faceted-search-footer data-ng-show=!showApplyButton>\n" +
    "			<button class=\"btn __clear-action\" href data-ng-click=clearAllFilters()>Reset Filters\n" +
    "			</button>\n" +
    "			\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "</div>");
  $templateCache.put("vn-faceted-search/vn-price-search.html",
    "<input data-ng-model=minPrice data-ng-keypress=searchByPrice($event) placeholder=\"$\">\n" +
    "&thinsp;to&thinsp;\n" +
    "<input data-ng-model=maxPrice data-ng-keypress=searchByPrice($event) placeholder=\"$$\">\n" +
    "<button class=\"btn btn-default facet-item__by-price__button\" type=button ng-click=searchByPrice($event)>Go\n" +
    "</button>");
  $templateCache.put("vn-faceted-search/vn-sort-search.html",
    "<div class=dropdown>\n" +
    "	<button class=\"btn btn-default dropdown-toggle\" type=button id=dropdownMenu1 data-toggle=dropdown>\n" +
    "		Sort by\n" +
    "		<span class=caret></span>\n" +
    "	</button>\n" +
    "	<ul class=dropdown-menu role=menu aria-labelledby=dropdownMenu1>\n" +
    "		<li role=presentation>\n" +
    "			<a role=menuitem tabindex=-1 href=\"\" data-ng-click=\"sortBy('relevence')\">Relevance</a>\n" +
    "		</li>\n" +
    "		<li role=presentation>\n" +
    "			<a role=menuitem tabindex=-1 href=\"\" data-ng-click=\"sortBy('highest price')\">Highest price</a>\n" +
    "		</li>\n" +
    "		<li role=presentation>\n" +
    "			<a role=menuitem tabindex=-1 href=\"\" data-ng-click=\"sortBy('lowest price')\">Lowest price</a>\n" +
    "		</li>\n" +
    "		<li role=presentation>\n" +
    "			<a role=menuitem tabindex=-1 href=\"\" data-ng-click=\"sortBy('relevence')\">Popularity</a>\n" +
    "		</li>\n" +
    "		<li role=presentation>\n" +
    "			<a role=menuitem tabindex=-1 href=\"\" data-ng-click=\"sortBy('newest')\">Newest</a>\n" +
    "		</li>\n" +
    "		<li role=presentation>\n" +
    "			<a role=menuitem tabindex=-1 href=\"\" data-ng-click=\"sortBy('oldest')\">Oldest</a>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>");
  $templateCache.put("vn-product-option/checkboxes.html",
    "<label data-vn-block=vn-labeled-checkbox data-vn-modifiers={{option.class}} data-ng-repeat=\"item in option.items\" data-ng-init=item>\n" +
    "\n" +
    "	<div data-vn-element=checkbox>\n" +
    "		<input type=checkbox data-ng-click=\"onCheckboxClicked(option, item)\">\n" +
    "	</div>\n" +
    "\n" +
    "	<div data-vn-element=content data-ng-include=\" 'vn-product-option/content.html' \"></div>\n" +
    "</label>");
  $templateCache.put("vn-product-option/content.html",
    "<div data-vn-element=color-image>\n" +
    "	<div data-vn-element=color data-ng-show=item.color style=\"background-color: {{item.color}}\"></div>\n" +
    "	<img data-vn-element=image data-ng-show=item.swatchImage data-ng-src={{item.swatchImage}} alt={{item.text}}>\n" +
    "</div>\n" +
    "<div data-vn-element=text data-ng-bind=item.text data-ng-controller=OptionsCtrl data-ng-class=\"{ '-disabled': !isItemAvailable }\"></div>\n" +
    "<div data-vn-element=border data-ng-class=\"{ checked: option.selected === item.key }\"></div>");
  $templateCache.put("vn-product-option/index.html",
    "<div data-vn-block=vn-product-option>\n" +
    "\n" +
    "	<label data-vn-element=label data-ng-if=option.label data-ng-bind=option.label></label>\n" +
    "\n" +
    "	<div data-ng-repeat=\"inputType in option.inputTypes\">\n" +
    "		<div data-vn-element=group data-vn-modifiers=\"{{inputType.type}} {{option.class}}\" data-ng-include=\" 'vn-product-option/' + inputType.type + '.html' \">\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div data-ng-if=option.selected>\n" +
    "		<div data-ng-repeat=\"option in option.options\" data-ng-include=\" 'vn-product-option/index.html' \">\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "</div>");
  $templateCache.put("vn-product-option/radios.html",
    "<label data-vn-block=vn-labeled-radio data-vn-modifiers={{option.class}} data-ng-repeat=\"item in option.items\" data-ng-init=item data-ng-controller=OptionsCtrl data-ng-class=\"{ '-disabled': !isItemAvailable }\">\n" +
    "\n" +
    "	<div data-vn-element=radio>\n" +
    "\n" +
    "		<input type=radio name={{option.id}} data-ng-value=item.key data-ng-model=option.selected data-ng-click=\"onOptionChanged(option, item)\">\n" +
    "	</div>\n" +
    "\n" +
    "	<div data-vn-element=content data-ng-include=\" 'vn-product-option/content.html' \"></div>\n" +
    "\n" +
    "</label>");
  $templateCache.put("vn-product-option/select.html",
    "<div class=dropdown data-vn-element=select data-vn-modifiers=\"{{ option.class }}\" data-ng-attr-size=\"{{ inputType.size }}\">\n" +
    "\n" +
    "	<button class=\"btn btn-default dropdown-toggle\" type=button id=\"dropdownMenuOption{{ option.id }}\" data-toggle=dropdown>\n" +
    "		{{ currentSelectionText }}\n" +
    "		<span class=caret></span>\n" +
    "	</button>\n" +
    "	<ul class=dropdown-menu role=menu aria-labelledby=\"dropdownMenuOption{{ option.id }}\">\n" +
    "		<li role=presentation data-ng-repeat=\"item in option.items\">\n" +
    "			<a role=menuitem tabindex=-1 href data-ng-click=\"onOptionChanged(option, item)\" data-ng-controller=OptionsCtrl data-ng-class=\"{ '-disabled': !isItemAvailable }\">\n" +
    "				{{ item.text }}\n" +
    "			</a>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>");
  $templateCache.put("vn-product-option/text.html",
    "<div data-ng-if=\"inputType.rows > 1\">\n" +
    "	<textarea data-vn-element=text data-vn-modifiers={{option.class}} data-ng-focus=\"saveTo=saveTo||{}\" data-ng-model=saveTo[option.id] data-ng-maxlength={{inputType.maxlength}} placeholder={{inputType.placeholder}} rows={{inputType.rows}} cols={{inputType.cols}}></textarea>\n" +
    "</div>\n" +
    "\n" +
    "<div data-ng-if=\"!inputType.rows || inputType.rows < 2\">\n" +
    "	<input data-vn-element=text data-vn-modifiers={{option.class}} data-ng-focus=\"saveTo=saveTo||{}\" data-ng-model=saveTo[option.id] data-ng-maxlength={{inputType.maxlength}} placeholder={{inputType.placeholder}}>\n" +
    "</div>");
  $templateCache.put("appmessages/vnAppMessage.tpl.html",
    "<alert ng-repeat=\"alert in appMessagesCtrl.alerts track by alert.id\" type=\"{{ alert.type }}\" close=appMessagesCtrl.closeAlert(alert.id)>{{alert.text}}</alert>");
  $templateCache.put("easyzoom/vnEasyZoom.tpl.html",
    "<div class=easyzoom data-ng-class=\"{ 'easyzoom--adjacent': ezAdjacent, 'easyzoom--overlay': ezOverlay }\">\n" +
    "    <a data-ng-href={{ezZoomSrc}}>\n" +
    "        <img class=img-responsive data-ng-src={{ngSrc}} alt={{alt}}>\n" +
    "        <div class=th-product-view__zoom></div>\n" +
    "    </a>\n" +
    "</div>");
  $templateCache.put("errormodal/vnErrorModal.tpl.html",
    "<div class=\"th-error-wrap clearfix\">\n" +
    "    <div class=th-error-details>\n" +
    "        <div class=\"th-error-details__header modal-header\">\n" +
    "            <h1>Sorry, something went wrong with the page...</h1>\n" +
    "            <div class=modal-body>\n" +
    "                <p class=th-error-details__section1>... but it might just be a small glitch. Try refreshing the page\n" +
    "                    to see if that fixes it.</p>\n" +
    "\n" +
    "                <p class=th-error-details__section2>\n" +
    "                    If the problem persists, please try again later.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "            <div class=modal-footer>\n" +
    "                <button class=\"btn btn-warning\" ng-click=$close()>Close</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
  $templateCache.put("pagination/vnPaginator.tpl.html",
    "<ul class=pager data-ng-if=\"cursor.totalPages > 1\">\n" +
    "	<li data-ng-class=\"{disabled: cursor.currentPage == 1}\">\n" +
    "		<a href data-ng-click=prevPage()><span class=\"glyphicon glyphicon-chevron-left\"></span></a></li>\n" +
    "	<li data-ng-class=\"{disabled: cursor.currentPage == cursor.totalPages}\">\n" +
    "		<a href data-ng-click=nextPage()><span class=\"glyphicon glyphicon-chevron-right\"></span></a></li>\n" +
    "</ul>\n" +
    "\n" +
    "	<div class=pager>\n" +
    "		Page {{ cursor.currentPage }} of {{ cursor.totalPages }}\n" +
    "	</div>");
  $templateCache.put("productsearch/vnSearchForm.tpl.html",
    "<div role=search>\n" +
    "	<a id=search-toggle ng-show=allowCollapse type=button class=th-search-popout__trigger data-ng-class=\"{ '-position' : !showSearch }\" data-ng-click=\"showSearch = !showSearch\">\n" +
    "		<span class=\"glyphicon glyphicon-search\"></span>\n" +
    "	</a>\n" +
    "\n" +
    "	<div data-ng-show=showSearch class=pull-left>\n" +
    "		<form class=form-inline role=search name=frmSearch data-ng-submit=doSearch() novalidate>\n" +
    "			<div class=form-group>\n" +
    "				<input data-ng-model=searchTerm class=th-search-popout__input placeholder=Search...>\n" +
    "				<button type=button data-ng-click=doSearch() class=\"btn btn-xs btn-primary th-search-popout__submit\">Go!\n" +
    "				</button>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "</div>");
}]);
