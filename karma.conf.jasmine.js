'use strict';

// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {

	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
            'app/bower_components/jquery/dist/jquery.js',
			'app/bower_components/angular/angular.js',
            'app/bower_components/angular-ui-bootstrap-bower/ui-bootstrap.js',
			'app/bower_components/angular-mocks/angular-mocks.js',
			'app/bower_components/angular-resource/angular-resource.js',
			'app/bower_components/angular-cookies/angular-cookies.js',
			'app/bower_components/angular-sanitize/angular-sanitize.js',
			'app/bower_components/angular-route/angular-route.js',
			'app/bower_components/angular-translate/angular-translate.js',
			'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
			//'app/bower_components/angular-touch/angular-touch.js',
			//'app/bower_components/angular-carousel/dist/angular-carousel.js',
            'app/bower_components/easyzoom/dist/easyzoom.js',
			'app/bower_components/firebase/firebase.js',
			'app/bower_components/angularfire/dist/angularfire.js',
			//'app/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
			'app/scripts/*.js',
			'app/scripts/**/*.js',
			'test/mock/**/*.js',
			'test/spec/**/*.js',

			// templates
			'app/views/**/*.html'
		],

		// list of files / patterns to exclude
		exclude: [
			'test/spec/**/*.mocha.js'
		],

		ngHtml2JsPreprocessor: {
			// strip this from the file path
			stripPrefix: 'app/views/partials',
			// prepend this to the
			prependPrefix: '',

			// or define a custom transform function
			//cacheIdFromPath: function(filepath) {
			//	return cacheId;
			//},

			// setting this option will create only a single module that contains templates
			// from all the files, so you can load them all with module('foo')
			moduleName: 'Volusion.toolboxCommon.templates'
		},

		preprocessors: {
			'app/scripts/**/*.js': ['coverage'],
			'app/views/partials/**/*.html': ['ng-html2js']
		},

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit'
		reporters: ['progress', 'coverage'],
		coverageReporter: {
			reporters: [
				{ type: 'html', dir: 'coverage/' },
				{ type: 'json', dir: 'coverage/' },
				{ type: 'lcov', dir: 'coverage/' }
			]
		},

		// web server port
		port: 8080,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};
