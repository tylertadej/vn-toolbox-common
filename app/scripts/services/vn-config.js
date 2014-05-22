/**
 * @ngdoc service
 * @name vnApi
 * @requires $q, $rootScope
 * @description
 *
 * vConfig
 * The vnConfig factory is used to manage user, account and app configuration that is more
 * dynamic than can be easily accomplished with constnats or values. Well perhaps not values,
 * Some of this should be depricated and moved into it's own value: currentAction, the tokens
 * urls and perhaps all of the app state itself should live in a currentAppState value service.
 * Hmmm. That's an interesting thought.
 *
 *
 * ### vnApi exposes the following API
 *
 * - getAccount
 * - getGlobalNavState
 * - setGlobalNavState
 * - getCurrentAction
 * - setCurrentAction
 * - getGlobalAttrBucketState
 * - setGlobalAttrBucketState
 * - getIframePathBase
 * - initConfig
 * - getFirebaseUrl
 * - getScreenMode
 * - setScreenMode
 * - getPreviewMode
 * - setPreviewMode
 * - getWorkspaceDimensions
 * - setWorkspaceDimensions
 *
 *
 */

angular.module('Volusion.toolboxCommon')
    .factory('vnConfig', ['$q', '$rootScope', function ($q, $rootScope) {

        /**
         * @function
         * @name vnConfig
         * @param $rootScope, $http
         * @return an object with public api contract to get/set dynamic app configuation states.
         */


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

        function getFirebaseUrlFn() {

            /**
             @Input: null
             @Output: a string with the format https://YOURAPP.firebaseio.com
             @Description: a string with the correct firebase url for accessing real time data set
             */
            return firebaseUrl;
        }

        function initConfigFn() {
            /*
             @function initConfigFn
             @param - none
             @return - none
             @description - sets up the dynamic configuarion attributes for the app (iframe url base, firebase url, etc)
             */

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

        function getAccountFn() {
            /**
             @function
             @name getAccount
             @description Return the account string for this account name
             @param {}
             @return String
             */
            return account;
        }

        function getIframePathBaseFn() {
            if ('' === iFramePathBase) {
                initConfigFn();
            }
            return iFramePathBase;
        }

        function getGlobalNavStateFn() {
            return globalNavState;
        }

        function setGlobalNavStateFn(state) {
            globalNavState = state;
            $rootScope.$broadcast('vlnGlobalNavState.change', { state: state });
        }

        function setCurrentActionFn(action) {
            /*
             @Input a string
             @Output broadcast a message (nothing returned)
             @Purpose - update the string value of the currentAction for tha application

             */
            currentAction = action;
            $rootScope.$broadcast('vlnCurrentAction.change', {action: action });
        }

        function getCurrentActionFn() {
            /*
             @Input - none
             @Output - string value of currentAction
             @Purpose - return the current value of the string currentAction
             */
            return currentAction;
        }

        function getGlobalAttrBucketStateFn() {
            return globalAttrBucketState;
        }

        function setGlobalAttrBucketStateFn(state) {
            globalAttrBucketState = state;
            $rootScope.$broadcast('vlnGlobalAttrBucketState.change', { state: state });
        }

        function getScreenModeFn() {
            return screenMode;
        }

        function setScreenModeFn(mode) {
            screenMode = mode;
        }

        function getPreviewModeFn() {
            return previewMode ? 'on' : 'off';
        }

        function setPreviewModeFn(mode) {
            previewMode = mode;
        }

        function getWorkspaceDimensionsFn() {
            return workspaceDimensions;
        }

        function setWorkspaceDimensionsFn(d) {

            if(d && d.width && d.height) {
                workspaceDimensions.height = d.height;
                workspaceDimensions.width = d.width;
                return;
            }
            throw new Error('Unable to set workspace dimensions.');


        }

        // Public API here
        return {
            getAccount              : getAccountFn,
            getGlobalNavState       : getGlobalNavStateFn,
            setGlobalNavState       : setGlobalNavStateFn,
            getCurrentAction        : getCurrentActionFn,
            setCurrentAction        : setCurrentActionFn,
            getGlobalAttrBucketState: getGlobalAttrBucketStateFn,
            setGlobalAttrBucketState: setGlobalAttrBucketStateFn,
            getIframePathBase       : getIframePathBaseFn,
            initConfig              : initConfigFn,
            getFirebaseUrl          : getFirebaseUrlFn,
            getScreenMode           : getScreenModeFn,
            setScreenMode           : setScreenModeFn,
            getPreviewMode          : getPreviewModeFn,
            setPreviewMode          : setPreviewModeFn,
            getWorkspaceDimensions  : getWorkspaceDimensionsFn,
            setWorkspaceDimensions  : setWorkspaceDimensionsFn
        };
    }]);
