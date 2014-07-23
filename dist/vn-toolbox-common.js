/*! vn-toolbox-common - ver.0.0.10 (2014-07-23) */
angular.module('Volusion.toolboxCommon.templates', []);
angular.module('Volusion.toolboxCommon', [
  'pascalprecht.translate',
  'Volusion.toolboxCommon.templates'
]).config([
  '$translateProvider',
  function ($translateProvider) {
    'use strict';
    var translationsEn = {
        'VN-CAROUSEL-TITLE': 'Inline Images:',
        'VN-IMAGE-TITLE': 'Image:',
        'VN-RATING-TITLE': 'Rating:'
      }, translationsEs = {
        'VN-CAROUSEL-TITLE': 'Im\xe1genes',
        'VN-IMAGE-TITLE': 'Im\xe1ge:',
        'VN-RATING-TITLE': 'Clasificaci\xf3n'
      };
    $translateProvider.translations('en', translationsEn).translations('es', translationsEs).preferredLanguage('en');
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name Volusion.toolboxCommon.controller:VnProductOptionCtrl
 * @description
 * # VnProductOptionCtrl
 * Controller of the Volusion.toolboxCommon
 */
angular.module('Volusion.toolboxCommon').controller('VnProductOptionCtrl', [
  '$rootScope',
  '$scope',
  function ($rootScope, $scope) {
    $scope.onOptionChanged = function (option, item) {
      $scope.saveTo[option.id] = item.id;
      preserveSubOptions();
      $rootScope.$emit('VN_PRODUCT_SELECTED', angular.extend({}, {
        product: $scope.product,
        option: option,
        item: item,
        isValid: verifyRequiredOptionsAreSelected($scope.product.options)
      }, buildSelection()));
    };
    function preserveSubOptions() {
      traverseSelectedOptions($scope.product.options, null, function (option, item) {
        option.selected = item.id;
      });
    }
    function traverseSelectedOptions(options, filter, callback) {
      if (!options) {
        return;
      }
      filter = filter || function () {
        return true;
      };
      var product = $scope.product;
      var saveTo = $scope.saveTo;
      angular.forEach(options, function (option) {
        var itemKeys = option.items;
        if (!itemKeys) {
          return;
        }
        for (var i = 0, len = itemKeys.length; i < len; i++) {
          var itemKey = itemKeys[i];
          var item = product.optionItems[itemKey];
          if (saveTo.hasOwnProperty(option.id) && saveTo[option.id] === item.id) {
            if (filter(option)) {
              callback(option, item);
            }
            if (option.options) {
              traverseSelectedOptions(option.options, filter, callback);
            }
            break;
          }
        }
      });
    }
    function buildSelection() {
      var selections = [];
      var filter = function (option) {
        return option.isComputedInSelection;
      };
      traverseSelectedOptions($scope.product.options, filter, function (option, item) {
        selections.push([
          option.id,
          item.id
        ].join(':'));
      });
      var optionSelections = $scope.product.optionSelections;
      return angular.extend({}, optionSelections.template, optionSelections[selections.join('|')]);
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
        if (verifyRequiredOptionsAreSelected(option.options) === false) {
          return false;
        }
      }
      return true;
    }
    $scope.onCheckboxClicked = function (option, itemKey) {
      var saveTo = $scope.saveTo;
      var items = saveTo[option.id] = saveTo[option.id] || [];
      var idx = items.indexOf(itemKey);
      if (idx > -1) {
        items.splice(idx, 1);
      } else {
        items.push(itemKey);
      }
      if (!items.length) {
        delete saveTo[option.id];
      }
    };
  }
]);
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
angular.module('Volusion.toolboxCommon').directive('vnBlock', [
  'vnBem',
  function (vnBem) {
    return {
      restrict: 'A',
      controller: function () {
        this.getBlock = function () {
          return this.block;
        };
        this.getModifiers = function () {
          return this.modifiers;
        };
      },
      compile: function () {
        return {
          pre: function (scope, iElement, iAttrs, controller) {
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
  }
]);
angular.module('Volusion.toolboxCommon').directive('vnCarousel', [
  '$rootScope',
  function ($rootScope) {
    'use strict';
    return {
      templateUrl: 'template/carousel.html',
      restrict: 'EA',
      replace: true,
      scope: {
        currMode: '@currMode',
        carouselObjects: '='
      },
      link: function postLink(scope, element) {
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
            scope.selected = component.id === scope.componentId;
          }
        });
        element.on('click', function (event) {
          // if in EDIT mode
          if (scope.currMode === 'off') {
            event.preventDefault();
            $rootScope.$broadcast('currentComponent.change', {
              'id': scope.componentId,
              'name': scope.componentName,
              'action': 'set'
            });
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
        scope.prev = function () {
          $('.carousel').carousel('prev');  //                            element.carousel('prev');
        };
        scope.next = function () {
          //                            element.carousel('next');
          $('.carousel').carousel('next');
        };
      }
    };
  }
]).run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('template/carousel.html', '<div id="vnCarousel" class="carousel slide" data-ride="carousel">' + '<!-- Indicators -->' + '<ol class="carousel-indicators">' + '<lidata-ng-repeat="image in imageList" data-target="#vnCarousel" data-slide-to="{{ $index }}"></li>' + '</ol>' + '<div data-ng-repeat="image in imageList" class="carousel-inner">' + '<div class="item active">' + '<img data-src="" alt="First slide" src="{{ image.src }}">' + '<div class="container">' + '<h1>Example headline.</h1>' + '<p>Note: If you\'re viewing this page via a <code>file://</code> URL, the "next" and "previous"  might not load/display properly.</p>' + '<p><a class="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>' + '</div>' + '</div>' + '<a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>' + '<a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>' + '</div>' + '</div>');
  }
]);
angular.module('Volusion.toolboxCommon').directive('vnCategorySearch', [
  '$rootScope',
  'vnProductParams',
  function ($rootScope, vnProductParams) {
    'use strict';
    return {
      templateUrl: 'vn-faceted-search/vn-category-search.html',
      restrict: 'AE',
      scope: { categories: '=' },
      link: function postLink(scope) {
        // Categories use this to update the search params.
        enquire.register('screen and (max-width:767px)', {
          setup: function () {
            scope.isCategoryVisible = true;
          },
          unmatch: function () {
            scope.isCategoryVisible = true;
          },
          match: function () {
            scope.isCategoryVisible = false;
          }
        });
        scope.toggleCategory = function () {
          console.log('toggle category');
          if (scope.isCategoryVisible) {
            scope.isCategoryVisible = false;
            return;
          }
          scope.isCategoryVisible = true;
        };
        scope.updateCategory = function (category) {
          vnProductParams.addCategory(category.id);
          $rootScope.$broadcast('ProductSearch.categoriesUpdated', { category: category });
        };
        // Have to do this to listen for the data returned async and passed into the directive
        scope.$watch('categories', function (categories) {
          // Gaurd against the error message for while categories is not defined.
          if (!categories || !categories[0]) {
            return;
          } else {
            scope.subCategories = categories[0].subCategories;
          }
        });
      }
    };
  }
]);
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
angular.module('Volusion.toolboxCommon').directive('vnElement', [
  'vnBem',
  function (vnBem) {
    return {
      require: '^vnBlock',
      restrict: 'A',
      compile: function () {
        return function (scope, iElement, iAttrs, blockCtrl) {
          vnBem.addClasses(iElement, {
            block: blockCtrl.getBlock(),
            blockModifiers: blockCtrl.getModifiers(),
            element: iAttrs.vnElement,
            elementModifiers: iAttrs.vnModifiers
          });
        };
      }
    };
  }
]);
angular.module('Volusion.toolboxCommon').directive('vnFacetSearch', [
  '$rootScope',
  '$window',
  'vnProductParams',
  function ($rootScope, $window, vnProductParams) {
    'use strict';
    return {
      templateUrl: 'vn-faceted-search/vn-facet-search.html',
      restrict: 'AE',
      scope: { facets: '=' },
      link: function postLink(scope) {
        function mobalizeFacetList(fList) {
          angular.forEach(fList, function (facet) {
            facet.show = false;
          });
        }
        function desktopizeFacetList(fList) {
          angular.forEach(fList, function (facet) {
            facet.show = true;
          });
        }
        // Manage the differences in behavior for mobile vs. deesktop
        enquire.register('screen and (max-width:767px)', {
          setup: function () {
            scope.isDesktopFacet = true;
            scope.isMobileMode = false;
            console.log('window width setup: ', $window.innerWidth);
          },
          unmatch: function () {
            desktopizeFacetList(scope.facets);
            scope.isDesktopFacet = true;
            scope.isMobileMode = false;
          },
          match: function () {
            mobalizeFacetList(scope.facets);
            scope.isDesktopFacet = false;
            scope.isMobileMode = true;
          }
        });
        // Handle the hide/show of a facet item's properties.
        scope.toggleFacetItems = function (idx) {
          console.log('facet item: ', scope.facets[idx]);
          if (scope.facets[idx].show) {
            scope.facets[idx].show = false;
            return;
          }
          scope.facets[idx].show = true;
        };
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
          // Broadcast an update to whomever if any is subscribed.
          $rootScope.$broadcast('ProductSearch.facetsUpdated');
        };
        scope.isMobileMode = false;
        // default to desktop
        //					function isMobileMode() {
        //						return scope.isMobileMode;
        //					}
        scope.$watch('facets', function (facets) {
          scope.facets = facets;
          // Default the facets to show
          // will need a more complicated routine here for checking if is selected
          //						var isDesktopFacet = isMobileMode();
          angular.forEach(scope.facets, function (facet) {
            var displayDefault = { show: false };
            angular.extend(facet, displayDefault);
          });
          // Need this to pre process responses and page load items
          if ($window.innerWidth < 767) {
            mobalizeFacetList(scope.facets);
          } else {
            desktopizeFacetList(scope.facets);
          }
        });
      }
    };
  }
]);
angular.module('Volusion.toolboxCommon').directive('vnImage', [
  '$rootScope',
  function ($rootScope) {
    'use strict';
    return {
      templateUrl: 'template/image.html',
      restrict: 'EA',
      replace: true,
      scope: {
        currMode: '@currMode',
        image: '='
      },
      link: function postLink(scope, element) {
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
            scope.selected = component.id === scope.componentId;
          }
        });
        element.on('click', function (event) {
          // if in EDIT mode
          if (scope.currMode === 'off') {
            event.preventDefault();
            $rootScope.$broadcast('currentComponent.change', {
              'id': scope.componentId,
              'name': scope.componentName,
              'action': 'set'
            });
          }
        });
      }
    };
  }
]).run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('template/image.html', '<div class="vn-image">' + '<p translate>VN-IMAGE-TITLE</p>' + '<img src="{{ image.src }}" alt="{{ image.alt }}" />' + '</div>');
  }
]);
angular.module('Volusion.toolboxCommon').directive('vnLabeledRadio', function () {
  'use strict';
  return {
    require: 'ngModel',
    restrict: 'A',
    replace: true,
    transclude: true,
    templateUrl: 'template/labeled-radio.html',
    scope: {
      ngModel: '=',
      name: '@',
      value: '@',
      ngValue: '=',
      ngChecked: '=',
      ngDisabled: '@',
      change: '&ngChange'
    },
    compile: function (tElement, tAttrs) {
      var $radio = tElement.find('input'), value = tAttrs.value, ngValue = tAttrs.ngValue;
      if (typeof value !== 'undefined' && typeof ngValue === 'undefined') {
        $radio.removeAttr('data-ng-value');
      }
    }
  };
}).run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('template/labeled-radio.html', '<label data-vn-block="vn-labeled-radio">' + '<input data-vn-element="input" type="radio" ' + 'name="{{name}}" ' + 'value="{{value}}" ' + 'data-ng-model="ngModel" ' + 'data-ng-value="ngValue" ' + 'data-ng-checked="ngChecked" ' + 'data-ng-change="change()" ' + 'data-ng-disabled="{{ngDisabled}}">' + '<span data-vn-element="content" data-ng-transclude></span>' + '</label>');
  }
]);
angular.module('Volusion.toolboxCommon').directive('vnLink', [
  '$rootScope',
  function ($rootScope) {
    'use strict';
    return {
      templateUrl: 'template/link.html',
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: { currMode: '@' },
      link: function postLink(scope, element) {
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
            scope.selected = component.id === scope.componentId;
          }
        });
        element.on('click', function (event) {
          // if in EDIT mode
          if (scope.currMode === 'off') {
            event.preventDefault();
            $rootScope.$broadcast('currentComponent.change', {
              'id': scope.componentId,
              'name': scope.componentName,
              'action': 'set'
            });
          }
        });
      }
    };
  }
]).run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('template/link.html', '<a class="vn-link" data-ng-transclude></a>');
  }
]);
angular.module('Volusion.toolboxCommon').directive('vnMetaTags', function () {
  'use strict';
  return {
    restrict: 'EA',
    scope: {
      title: '=',
      description: '=',
      keywords: '=',
      toAppend: '=',
      robots: '='
    },
    link: function (scope, elem) {
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
      var setMetaTag = function (metaTagName, metaTagContent) {
        var metaTag = elem.find('meta[name=' + metaTagName + ']');
        if (metaTag.length > 0) {
          metaTag.remove();
        }
        if (metaTagContent) {
          elem.append(angular.element('<meta/>').attr('name', metaTagName).attr('content', metaTagContent));
        }
      };
      var setDescription = function (description) {
        setMetaTag('description', description);
      };
      var setKeywords = function (keywords) {
        setMetaTag('keywords', keywords);
      };
      scope.$watch('title', setTitleTag);
      scope.$watch('description', setDescription);
      scope.$watch('keywords', setKeywords);
      scope.$watch('toAppend', appendElement);
      scope.$watch('robots', function (newValue) {
        if (typeof newValue !== 'undefined' && JSON.parse(newValue) === true) {
          setMetaTag('robots', 'index,follow');
          setMetaTag('GOOGLEBOT', 'INDEX,FOLLOW');
        }
      });
    }
  };
});
angular.module('Volusion.toolboxCommon').directive('vnNav', [
  '$rootScope',
  function ($rootScope) {
    'use strict';
    return {
      templateUrl: 'template/navbar.html',
      restrict: 'EA',
      replace: true,
      scope: {
        currMode: '@currMode',
        categoryList: '='
      },
      link: function postLink(scope, element) {
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
            scope.selected = component.id === scope.componentId;
          }
        });
        element.on('click', function (event) {
          // if in EDIT mode
          if (scope.currMode === 'off') {
            event.preventDefault();
            $rootScope.$broadcast('currentComponent.change', {
              'id': scope.componentId,
              'name': scope.componentName,
              'action': 'set'
            });
          }
        });
      }
    };
  }
]).run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('template/navbar.html', '<div class="collapse navbar-collapse " id="th-main-menu" data-ng-class="!navCollapsed && \'in\'" data-ng-click="navCollapsed=true">' + '<ul class="nav navbar-nav">' + '<li class="dropdown" data-ng-repeat="category in categoryList">' + '<a href class="dropdown-toggle th-dropdown-toggle" data-toggle="dropdown">{{category.name}}</a>' + '<ul class="dropdown-menu" data-ng-if="category.subCategories.length">' + '<li data-ng-repeat="subCategory in category.subCategories">' + '<a data-ng-href="#/category/{{ subCategory.id }}">{{subCategory.name}}</a>' + '</li>' + '</ul>' + '</li>' + '</ul>' + '</div>');
  }
]);
'use strict';
/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnProductOption
 * @description
 * # vnProductOption
 */
angular.module('Volusion.toolboxCommon').directive('vnProductOption', function () {
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
angular.module('Volusion.toolboxCommon').directive('vnRating', [
  '$rootScope',
  function ($rootScope) {
    'use strict';
    return {
      templateUrl: 'template/rating.html',
      restrict: 'EA',
      replace: true,
      scope: {
        currMode: '@currMode',
        ratingValue: '=',
        readonly: '@'
      },
      link: function postLink(scope, element) {
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
            scope.selected = component.id === scope.componentId;
          }
        });
        element.on('click', function (event) {
          // if in EDIT mode
          if (scope.currMode === 'off') {
            event.preventDefault();
            $rootScope.$broadcast('currentComponent.change', {
              'id': scope.componentId,
              'name': scope.componentName,
              'action': 'set'
            });
          }
        });
        var idx, max = 5;
        scope.stars = [];
        function updateStars() {
          scope.stars = [];
          for (idx = 0; idx < max; idx++) {
            scope.stars.push({ filled: idx < scope.ratingValue });
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
  }
]).run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('template/rating.html', '<div class="vn-rating">' + '<!-- not happy with this but it seems better than angular-ui carousel' + 'http://blog.revolunet.com/angular-carousel/ -->' + '<p translate>VN-RATING-TITLE</p>' + '<ul class="rating">' + '<li data-ng-repeat="star in stars" class="tick" data-ng-class="star" data-ng-click="toggle($index)">' + '</li>' + '</ul>' + '</div>');
  }
]);
angular.module('Volusion.toolboxCommon').value('vnApiConfigurations', {});
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
angular.module('Volusion.toolboxCommon').value('vnApiProducts', {});
// Todo: figure out which $resources need all the access types. Remove the unused queries: put, remove delete etc ...
angular.module('Volusion.toolboxCommon').factory('vnApi', [
  '$resource',
  'vnDataEndpoint',
  function ($resource, vnDataEndpoint) {
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
             * Returns a $resource that resolves to the Volusion API endpoint for the configured site.
             * ## Usage
             * - vnApi.Article().query() -> returns a list of all articles
             * - vnApi.Artiucl().get( {slug: about-us} ); -> Returns the article for About Us
             */
    function Article() {
      return $resource(vnDataEndpoint.getApiUrl() + '/articles/:id', { id: '@id' }, {
        'get': { method: 'GET' },
        'save': { method: 'POST' },
        'query': {
          method: 'GET',
          isArray: false
        },
        'remove': { method: 'DELETE' },
        'delete': { method: 'DELETE' }
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
      return $resource(vnDataEndpoint.getApiUrl() + '/categories/:id', { id: '@id' }, {
        'get': { method: 'GET' },
        'save': { method: 'POST' },
        'query': {
          method: 'GET',
          isArray: false
        },
        'remove': { method: 'DELETE' },
        'delete': { method: 'DELETE' }
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
      return $resource(vnDataEndpoint.getApiUrl() + '/carts', {}, {
        'get': {
          method: 'GET',
          withCredentials: true
        },
        'save': {
          method: 'POST',
          headers: { 'vMethod': 'POST' },
          withCredentials: true
        },
        'update': {
          method: 'POST',
          headers: { 'vMethod': 'PUT' },
          withCredentials: true
        },
        'query': {
          method: 'GET',
          isArray: false
        },
        'remove': { method: 'DELETE' },
        'delete': { method: 'DELETE' }
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
      return $resource(vnDataEndpoint.getApiUrl() + '/config');
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
      return $resource(vnDataEndpoint.getApiUrl() + '/countries');
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
      return $resource(vnDataEndpoint.getApiUrl() + '/navs/:navId', { navId: '@navId' }, {
        'get': { method: 'GET' },
        'save': { method: 'POST' },
        'query': {
          method: 'GET',
          isArray: false
        },
        'remove': { method: 'DELETE' },
        'delete': { method: 'DELETE' }
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
      //Todo: put the possilbe query params into the description for documentation
      return $resource(vnDataEndpoint.getApiUrl() + '/products/:code', { code: '@code' }, {
        'get': { method: 'GET' },
        'save': { method: 'POST' },
        'query': {
          method: 'GET',
          isArray: false
        },
        'remove': { method: 'DELETE' },
        'delete': { method: 'DELETE' }
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
      return $resource(vnDataEndpoint.getApiUrl() + '/products/:code/reviews', { code: '@code' }, {
        'get': { method: 'GET' },
        'save': { method: 'POST' },
        'query': {
          method: 'GET',
          isArray: false
        },
        'remove': { method: 'DELETE' },
        'delete': { method: 'DELETE' }
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
      return $resource('/settings/themeSettings.json');
    }
    return {
      Article: Article,
      Category: Category,
      Cart: Cart,
      Configuration: Configuration,
      Country: Country,
      Nav: Nav,
      Product: Product,
      Review: Review,
      ThemeSettings: ThemeSettings
    };
  }
]);
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
angular.module('Volusion.toolboxCommon').factory('vnBem', function () {
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
angular.module('Volusion.toolboxCommon').factory('vnConfig', [
  '$q',
  '$rootScope',
  function ($q, $rootScope) {
    'use strict';
    var account, apiToken, apiUrl, context, currentAction = 'designAction',
      // Start them here but if conf is persisted turn this into a function.
      firebaseToken, firebaseUrl, globalAttrBucketState = true,
      // Show the app attributes by default.
      globalNavState = true,
      // Show the app navigation by default.
      iFramePathBase, previewMode = false,
      // Initial edit/preview mode
      screenMode = 'desktop',
      // Initial screen mode.
      workspaceDimensions = {
        width: 0,
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
          account: 'asdf123',
          context: 'SiteBuilder',
          firebase: 'https://brilliant-fire-5600.firebaseio.com',
          fbToken: ']idk - this comes from ??? server[',
          apiToken: ']idk - how do I know if I am logging into edit[',
          sandbox: 'http://localhost:8080'
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
      $rootScope.$broadcast('vlnCurrentAction.change', { action: action });
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
      if (d && d.width && d.height) {
        workspaceDimensions.height = d.height;
        workspaceDimensions.width = d.width;
        return;
      }
      throw new Error('Unable to set workspace dimensions.');
    }
    // Public API here
    return {
      getAccount: getAccount,
      getGlobalNavState: getGlobalNavState,
      setGlobalNavState: setGlobalNavState,
      getCurrentAction: getCurrentAction,
      setCurrentAction: setCurrentAction,
      getGlobalAttrBucketState: getGlobalAttrBucketState,
      setGlobalAttrBucketState: setGlobalAttrBucketState,
      getIframePathBase: getIframePathBase,
      initConfig: initConfig,
      getFirebaseUrl: getFirebaseUrl,
      getScreenMode: getScreenMode,
      setScreenMode: setScreenMode,
      getPreviewMode: getPreviewMode,
      setPreviewMode: setPreviewMode,
      getWorkspaceDimensions: getWorkspaceDimensions,
      setWorkspaceDimensions: setWorkspaceDimensions
    };
  }
]);
angular.module('Volusion.toolboxCommon').provider('vnDataEndpoint', function () {
  'use strict';
  var firebase = 'https://brilliant-fire-5600.firebaseio.com', apibase = 'http://www.samplestore.io/api/v1';
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
angular.module('Volusion.toolboxCommon').factory('vnDataSrc', [
  '$q',
  'vnEnvironment',
  'vnApi',
  'vnFirebase',
  'vnApiArticles',
  'vnApiCategories',
  'vnApiProducts',
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
        vnApi.Article().get().$promise.then(function (results) {
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
        vnApi.Category().get().$promise.then(function (results) {
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
        vnApi.Product(queryParams).get(queryParams).$promise.then(function (results) {
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
      getArticles: getArticles,
      getCategories: getCategories,
      getContext: getContextFn,
      getProducts: getProducts
    };
  }
]);
'use strict';
angular.module('Volusion.toolboxCommon').value('vnEnvironment', 'Production');
// can be overwritten later to be 'WorkSpace' or 'Production'
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
angular.module('Volusion.toolboxCommon').factory('vnFirebase', [
  'vnConfig',
  'vnDataEndpoint',
  '$firebase',
  function (vnConfig, vnDataEndpoint, $firebase) {
    'use strict';
    var fbItems = {
        articles: '/account_articles',
        carts: '/account_carts',
        categories: '/account_categories',
        config: '/account_config',
        countries: '/accounts_countries',
        navs: '/account_navs',
        products: '/account_products',
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
        component: {
          id: 'uniq id/code for the item',
          typeDesc: 'thing.attribute',
          typeId: '9999 - each component/widget has a type to id it, thereby enabling bideirectional communication between sitebuilder and workspace '
        },
        product: 'bucket for when a product is selected',
        category: 'bucket for when a category is selected',
        page: 'bucket for when a page is selected',
        theme: {
          id: '1',
          name: 'default',
          thumbnail: 'http://localhost:8090/default.png',
          cssRef: 'http://localhost:8090/default.css'
        },
        previewMode: 'on',
        preferredLanguge: 'en-us'
      };
    }
    // public api here
    return {
      getFirebaseData: getFirebaseData,
      resetSiteBuilder: resetSiteBuilder,
      resetDataForPath: resetDataForPath
    };
  }
]);
angular.module('Volusion.toolboxCommon').factory('vnProductParams', function () {
  'use strict';
  /**
		 * @ngdoc property
		 * @name accountData
		 * @property {Array} categoryIds
		 * @propertyOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * An array to hold category ids that have been selected by someone.
		 */
  var categoryIds = [],
    // Container for the category id's to query for
    /**
		 * @ngdoc property
		 * @name facets
		 * @property {Array} facets
		 * @propertyOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * An array to hold facet ids that have been selected by someone.
		 */
    facets = [],
    // Container for the facets to query for
    //        currentPageNumber = '',
    //        nextPageNumber = '',
    //        previousPageNumber = '',
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
      categoryIds: '',
      slug: '',
      facets: '',
      minPrice: '',
      maxPrice: '',
      accessoriesOf: '',
      sort: '',
      pageNumber: '',
      pageSize: ''
    };
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
		 * Price Management
		 */
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
		 * @name updateSearch
		 * @param {String} searchString is a string representing a string types by customer to search on products.
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * No matter what, it updates the paramsObject.search property.
		 */
  function updateSearch(searchString) {
    paramsObject.search = searchString;
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
		 * @name updateSearch
		 * @param {String} newSlug is a string representing the slug value of a product.
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * No matter what, it updates the paramsObject.slug property.
		 */
  function updateSlug(newSlug) {
    paramsObject.slug = newSlug;
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
		 * @name addCategory
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Given an id (as Int I believe at time of writing) If it is not already in the categoryIds array, add it to the
		 * categoryIds array and update the paramsObject.categoryIds value.
		 */
  function addCategory(id) {
    if (categoryIds.indexOf(id) < 0) {
      categoryIds.push(id);
      paramsObject.categoryIds = getCategoryString();
    }
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
      categoryIds: '',
      slug: '',
      facets: '',
      minPrice: '',
      maxPrice: '',
      accessoriesOf: '',
      sort: '',
      pageNumber: '',
      pageSize: ''
    };
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
		 * @name isFacetSelected
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Return true if the id is already in the facets array.
		 * Return false if the id is not already in the facets array.
		 */
  function isFacetSelected(id) {
    return facets.indexOf(id) > -1;
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
		 * @name setPageNumber
		 * @param {String} setPageNumber is a string that can be passed to api to modify the page to ask backend for
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Setter for the paramsObject pageNumber property.
		 */
  function setPageNumber(pageNumber) {
    paramsObject.pageNumber = pageNumber;
  }
  /**
		 * @ngdoc function
		 * @name getPageNumber
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Getter for the paramsObject pageNumber property.
		 */
  function getPageNumber() {
    return paramsObject.pageNumber;
  }
  /**
		 * @ngdoc function
		 * @name setPageNumber
		 * @param {String} setPageNumber is a string that can be passed to api to modify the page to ask backend for
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Setter for the paramsObject pageNumber property.
		 */
  function setPageSize(pageSize) {
    paramsObject.pageSize = pageSize;
  }
  /**
		 * @ngdoc function
		 * @name getPageNumber
		 * @methodOf Volusion.toolboxCommon.vnProductParams
		 *
		 * @description
		 * Getter for the paramsObject pageNumber property.
		 */
  function getPageSize() {
    return paramsObject.pageSize;
  }
  // Public API here
  return {
    addCategory: addCategory,
    getAccessoriesOf: getAccessoriesOf,
    addFacet: addFacet,
    getFacetString: getFacetString,
    getMinPrice: getMinPrice,
    getMaxPrice: getMaxPrice,
    getPageNumber: getPageNumber,
    getPageSize: getPageSize,
    getParamsObject: getParamsObject,
    getSort: getSort,
    isFacetSelected: isFacetSelected,
    removeSlug: removeSlug,
    removeSearch: removeSearch,
    setMinPrice: setMinPrice,
    removeMinPrice: removeMinPrice,
    removeMaxPrice: removeMaxPrice,
    removeAccessoriesOf: removeAccessoriesOf,
    removeCategory: removeCategory,
    removeFacet: removeFacet,
    removeSort: removeSort,
    resetCategories: resetCategories,
    resetFacets: resetFacets,
    resetParamsObject: resetParamsObject,
    setAccessoriesOf: setAccessoriesOf,
    setMaxPrice: setMaxPrice,
    setPageNumber: setPageNumber,
    setPageSize: setPageSize,
    setSort: setSort,
    updateSearch: updateSearch,
    updateSlug: updateSlug
  };
});
angular.module('Volusion.toolboxCommon').factory('vnSession', [
  '$rootScope',
  'vnApi',
  'vnFirebase',
  function ($rootScope, vnApi, vnFirebase) {
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
      //
      console.log(path + ' / ' + resource);  //                console.log('Porting issue with the prromise and data ... to fix with data-ng-stub');
                                             //                resource.get().$promise.then(function (result) {
                                             //                    vnFirebase.resetDataForPath(path, result.data);
                                             //                });
    }
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
          articles: vnApi.Article(),
          categories: vnApi.Category(),
          carts: vnApi.Cart(),
          config: vnApi.Configuration(),
          countries: vnApi.Country(),
          navs: vnApi.Nav(),
          products: vnApi.Product()
        }, keys = Object.keys(apiEndpoints);
      // proof-of-concept.
      vnFirebase.resetSiteBuilder();
      // i.e. called with no session state persistence considered.
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
    return {
      init: init,
      initSession: initSession,
      getAccountData: getAccountData
    };
  }
]);
angular.module('Volusion.toolboxCommon.templates', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('vn-faceted-search/vn-category-search.html', '<div class=-category-search><a href ng-click=toggleCategory()><h4>Categories</h4></a><div data-ng-repeat="subCat in subCategories" data-ng-show=isCategoryVisible><a data-ng-href="{{ subCat.url  }}">{{ subCat.name }}</a></div></div>');
    $templateCache.put('vn-faceted-search/vn-facet-search.html', '<div class=-faceted-search><div class=facets><div class=facet-item data-ng-repeat="facet in facets track by $index"><h4 ng-show=isDesktopFacet>{{ facet.title }}</h4><a ng-show=!isDesktopFacet ng-click=toggleFacetItems($index)><h4>{{ facet.title }}</h4></a><div ng-show=facets[$index].show><label class=-facet-property data-ng-repeat="property in facet.properties track by $index"><input type=checkbox name=property.name ng-checked=selectProperty(property) ng-click=refineFacetSearch(property)> <span class=name>{{ property.name }}</span> <span class=count>{{ property.count }}</span></label></div><hr></div></div></div>');
    $templateCache.put('vn-product-option/checkboxes.html', '<label data-vn-block=vn-labeled-checkbox data-vn-modifiers={{option.class}} data-ng-repeat="itemKey in option.items" data-ng-init="item=product.optionItems[itemKey]"><div data-vn-element=checkbox><input type=checkbox data-ng-click=onCheckboxClicked(option)></div><div data-vn-element=content data-ng-include=" \'vn-product-option/content.html\' "></div></label>');
    $templateCache.put('vn-product-option/content.html', '<div data-vn-element=color-image><div data-vn-element=color data-ng-show=item.color style="background-color: {{item.color}}"></div><img data-vn-element=image data-ng-show=item.image data-ng-src={{item.image}} alt={{item.text}}></div><div data-vn-element=text data-ng-bind=item.text></div><div data-vn-element=border data-ng-class="{ checked: option.selected===itemKey }"></div>');
    $templateCache.put('vn-product-option/index.html', '<div data-vn-block=vn-product-option><label data-vn-element=label data-ng-if=option.label data-ng-bind=option.label></label><div data-ng-repeat="inputType in option.inputTypes"><div data-vn-element=group data-vn-modifiers="{{inputType.type}} {{option.class}}" data-ng-include=" \'vn-product-option/\' + inputType.type + \'.html\' "></div></div><div data-ng-if=option.selected><div data-ng-repeat="option in option.options" data-ng-include=" \'vn-product-option/index.html\' "></div></div></div>');
    $templateCache.put('vn-product-option/radios.html', '<label data-vn-block=vn-labeled-radio data-vn-modifiers={{option.class}} data-ng-repeat="itemKey in option.items" data-ng-init="item=product.optionItems[itemKey]"><div data-vn-element=radio><input type=radio name={{option.id}} data-ng-value=itemKey data-ng-model=option.selected data-ng-click="onOptionChanged(option, item)"></div><div data-vn-element=content data-ng-include=" \'vn-product-option/content.html\' "></div></label>');
    $templateCache.put('vn-product-option/select.html', '<select data-vn-element=select data-vn-modifiers={{option.class}} data-ng-attr-size={{inputType.size}} data-ng-model=option.selected data-ng-change="onOptionChanged(option, product.optionItems[option.selected])" data-ng-options="product.optionItems[itemKey].text for itemKey in option.items"></select>');
    $templateCache.put('vn-product-option/text.html', '<div data-ng-if="inputType.rows > 1"><textarea data-vn-element=text data-vn-modifiers={{option.class}} data-ng-focus="saveTo=saveTo||{}" data-ng-model=saveTo[option.id] data-ng-maxlength={{inputType.maxlength}} placeholder={{inputType.placeholder}} rows={{inputType.rows}} cols={{inputType.cols}}></textarea></div><div data-ng-if="!inputType.rows || inputType.rows < 2"><input data-vn-element=text data-vn-modifiers={{option.class}} data-ng-focus="saveTo=saveTo||{}" data-ng-model=saveTo[option.id] data-ng-maxlength={{inputType.maxlength}} placeholder={{inputType.placeholder}}></div>');
  }
]);