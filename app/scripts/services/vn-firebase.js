/*globals Firebase*/
/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnFirebase
 * @requires vnConfig, vnDataEndpoint, $firebase
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
