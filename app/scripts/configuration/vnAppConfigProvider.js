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
