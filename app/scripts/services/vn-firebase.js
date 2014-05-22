/*globals Firebase*/

/**
 * @ngdoc service
 * @name vnFirebase
 * @module Volusion.toolboxCommon
 * @description
 *
 * vnFirebase (core data service module)
 * The vnFirebase module is used by vnDataSrc when vnDataSrc determines that data
 * is stored in a Firebase. vnFirebase returns $firebase references for the configured
 * and uses the secure account token generated to access appropriate FIrebase resources.
 *
 * ### vnFirebase exposes the following API
 * - getFirebaseData
 * - resetSiteBuilder
 * - resetDataForPath
 *
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
             * @name vnFirebase.getFirebaseData
             * @module Volusion.toolboxCommon:vnFirebase
             * @function
             *
             * @summary
             *
             * # Description
             * The getFirebaseDataFn is exposed as a public api via getFirebaseData. Given
             * a string as an endpoint it generated a path to the correct Firebase resource
             * or it returns false. It depends on the vnConfig.getAccount() function to be
             * correctly configured with the current account (as it appears in the Firebase
             * schema) and have an appropriate secure token generated with the
             * firebase-token-generator service (not an angular service). NOTE: the firebase-
             * token-generator is still TODO.
             * ### This service should only be called from the vnDataSrc service
             *
             *
             * @param {String} path a string that identifies the item in the Firebase schema
             * @property {Constant} vnDataEndpoint.fbUrl - is the Firebase url for the base path to the resource
             * @property {Factory} vnConfig.getAccount   - is a functionthat returns the account currently configured
             * @returns {$firebase|Boolean} a new $firebase object for the generated Firebase reference
             *                            Or, false but this might be a good place to throe a new Error
             *
             * @example = return vnFirebase.getFirebaseData('articles')
             *
             */
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
