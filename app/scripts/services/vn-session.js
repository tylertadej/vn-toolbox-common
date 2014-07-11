/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnSession
 * @requires $rootScope
 * @requires $q
 * @requires vnApi
 * @requires vnFirebase
 * @description
 *
 * # vnSession
 * This is a service that manages the apps lifecycle and configuration. If you need access
 * to data servces with privlidges higher than simple GET to manage changes to the datasets,
 * the session needs to be configured with all appropriate endpoints and tokens for accessing
 * either the API or Firebase backend. vnSession does not have the vnConfig object injected to
 * t. It should not need to know anything about the configuration, vnFirebase & vnApi need it
 * as well as the endpoints to retrieve and update the account data set.
 *
 */

angular.module('Volusion.toolboxCommon')
    .factory('vnSession', ['$rootScope', 'vnApi', 'vnFirebase',
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
                console.log(path + ' / ' + resource);
//                console.log('Porting issue with the prromise and data ... to fix with data-ng-stub');
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
                        articles  : vnApi.Article(),
                        categories: vnApi.Category(),
                        carts     : vnApi.Cart(),
                        config    : vnApi.Configuration(),
                        countries : vnApi.Country(),
                        navs      : vnApi.Nav(),
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
                init          : init,
                initSession   : initSession,
                getAccountData: getAccountData
            };
        }]);
