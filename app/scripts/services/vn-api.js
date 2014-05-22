/**
 * @ngdoc service
 * @name $cacheFactory
 *
 * @description
 * Factory that constructs {@link $cacheFactory.Cache Cache} objects and gives access to
 * them.
 *
 * ```js
 *
 *  var cache = $cacheFactory('cacheId');
 *  expect($cacheFactory.get('cacheId')).toBe(cache);
 *  expect($cacheFactory.get('noSuchCacheId')).not.toBeDefined();
 *
 *  cache.put("key", "value");
 *  cache.put("another key", "another value");
 *
 *  // We've specified no options on creation
 *  expect(cache.info()).toEqual({id: 'cacheId', size: 2});
 *
 * ```
 *
 *
 * @param {string} cacheId Name or id of the newly created cache.
 * @param {object=} options Options object that specifies the cache behavior. Properties:
 *
 *   - `{number=}` `capacity` — turns the cache into LRU cache.
 *
 * @returns {object} Newly created cache object with the following set of methods:
 *
 * - `{object}` `info()` — Returns id, size, and options of cache.
 * - `{{*}}` `put({string} key, {*} value)` — Puts a new key-value pair into the cache and returns
 *   it.
 * - `{{*}}` `get({string} key)` — Returns cached value for `key` or undefined for cache miss.
 * - `{void}` `remove({string} key)` — Removes a key-value pair from the cache.
 * - `{void}` `removeAll()` — Removes all cached values.
 * - `{void}` `destroy()` — Removes references to this cache from $cacheFactory.
 *
 * @example
 <example module="cacheExampleApp">
 <file name="index.html">
 <div ng-controller="CacheController">
 <input ng-model="newCacheKey" placeholder="Key">
 <input ng-model="newCacheValue" placeholder="Value">
 <button ng-click="put(newCacheKey, newCacheValue)">Cache</button>

 <p ng-if="keys.length">Cached Values</p>
 <div ng-repeat="key in keys">
 <span ng-bind="key"></span>
 <span>: </span>
 <b ng-bind="cache.get(key)"></b>
 </div>

 <p>Cache Info</p>
 <div ng-repeat="(key, value) in cache.info()">
 <span ng-bind="key"></span>
 <span>: </span>
 <b ng-bind="value"></b>
 </div>
 </div>
 </file>
 <file name="script.js">
 angular.module('cacheExampleApp', []).
 controller('CacheController', ['$scope', '$cacheFactory', function($scope, $cacheFactory) {
           $scope.keys = [];
           $scope.cache = $cacheFactory('cacheId');
           $scope.put = function(key, value) {
             $scope.cache.put(key, value);
             $scope.keys.push(key);
           };
         }]);
 </file>
 <file name="style.css">
 p {
         margin: 10px 0 3px;
       }
 </file>
 </example>
 */

angular.module('Volusion.toolboxCommon')
    .factory('vnApi', ['$resource', 'vnDataEndpoint', function ($resource, vnDataEndpoint) {
        'use strict';

        /**
         * @ngdoc method
         * @name $cacheFactory.Cache#put
         * @function
         *
         * @description
         * Inserts a named entry into the {@link $cacheFactory.Cache Cache} object to be
         * retrieved later, and incrementing the size of the cache if the key was not already
         * present in the cache. If behaving like an LRU cache, it will also remove stale
         * entries from the set.
         *
         * It will not insert undefined values into the cache.
         *
         * @param {string} key the key under which the cached data is stored.
         * @param {*} value the value to store alongside the key. If it is undefined, the key
         *    will not be stored.
         * @returns {*} the value stored.
         */

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
