/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnConfig
 * @requires $q, $rootScope
 * @description
 *
 * # vnConfig
 * The vnConfig factory is used to manage user, account and app configuration that is more
 * dynamic than can be easily accomplished with constnats or values. Well perhaps not values,
 * Some of this should be depricated and moved into it's own value: currentAction, the tokens
 * urls and perhaps all of the app state itself should live in a currentAppState value service.
 * Hmmm. That's an interesting thought.
 *
 */

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

            /**
             @Input: null
             @Output: a string with the format https://YOURAPP.firebaseio.com
             @Description: a string with the correct firebase url for accessing real time data set
             */
            return firebaseUrl;
        }


        /**
         * @ngdoc method
         * @name initConfig
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @description
         *
         * #initConfig
         * Used in development as a mocking method to bootstrap with assumptions.
         * It sets up the dynamic configuration attributes for the app that prolly return from
         * and unknown api call at this point so we can use these properties: iframe url base,
         * firebase url, etc ...
         */
        function initConfig() {
            /*
             @function initConfig
             @param - none
             @return - none
             @description -
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

        /**
         * @ngdoc method
         * @name getAccount
         * @methodOf Volusion.toolboxCommon.vnConfig
         * @return {String} account is the string representing the configured account.
         *
         * @description
         *
         * # getAccount
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
         * - This is a bullet
         * - This is a bullet Too
         */
        function getIframePathBase() {
            if ('' === iFramePathBase) {
                initConfig();
            }
            return iFramePathBase;
        }

        function getGlobalNavState() {
            return globalNavState;
        }

        function setGlobalNavState(state) {
            globalNavState = state;
            $rootScope.$broadcast('vlnGlobalNavState.change', { state: state });
        }

        function setCurrentAction(action) {
            /*
             @Input a string
             @Output broadcast a message (nothing returned)
             @Purpose - update the string value of the currentAction for tha application

             */
            currentAction = action;
            $rootScope.$broadcast('vlnCurrentAction.change', {action: action });
        }

        function getCurrentAction() {
            /*
             @Input - none
             @Output - string value of currentAction
             @Purpose - return the current value of the string currentAction
             */
            return currentAction;
        }

        function getGlobalAttrBucketState() {
            return globalAttrBucketState;
        }

        function setGlobalAttrBucketState(state) {
            globalAttrBucketState = state;
            $rootScope.$broadcast('vlnGlobalAttrBucketState.change', { state: state });
        }

        function getScreenMode() {
            return screenMode;
        }

        function setScreenMode(mode) {
            screenMode = mode;
        }

        function getPreviewMode() {
            return previewMode ? 'on' : 'off';
        }

        function setPreviewMode(mode) {
            previewMode = mode;
        }

        function getWorkspaceDimensions() {
            return workspaceDimensions;
        }

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
