/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnDataSrc
 * @requires $q
 * @requires vnEnvironment
 * @requires vnApi
 * @requires vnFirebase
 * @requires vnApiArticle
 * @requires vnApiCategory
 * @requires vnApiProduct
 * @description
 *
 * # vnDataSrc
 * This is a service that routes the data requests based on the vnEnvironment. It provides an
 * api for Volusion Data in an angular app. When used in themes it can grab and return data
 * from both the api and Firebase. If data is retrived from api it needs to be modified to
 * look more like the $firebase object so that caller can handle both types of data retriveal
 * objects.
 *
 * **If the app needs to set data is should not be done here.** This is a one way path from
 * either the Firebase source or the api source and a service to make them both look almost
 * the same so they can be consumed by the caller requesting the data.
 *
 *
 */

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
