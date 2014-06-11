// A reference configuration file.
exports.config = {
    // ----- How to setup Selenium -----
    //
    // There are three ways to specify how to use Selenium. Specify one of the
    // following:
    //
    // 1. seleniumServerJar - to start Selenium Standalone locally.
    // 2. seleniumAddress - to connect to a Selenium server which is already
    //    running.
    // 3. sauceUser/sauceKey - to use remote Selenium servers via SauceLabs.
    //
    // If the chromeOnly option is specified, no Selenium server will be started,
    // and chromeDriver will be used directly (from the location specified in
    // chromeDriver)

    // The location of the selenium standalone server .jar file, relative
    // to the location of this config. If no other method of starting selenium
    // is found, this will default to
    // node_modules/protractor/selenium/selenium-server...
    seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.42.0.jar',
    // The port to start the selenium server on, or null if the server should
    // find its own unused port.
    seleniumPort     : null,
    // Chromedriver location is used to help the selenium standalone server
    // find chromedriver. This will be passed to the selenium jar as
    // the system property webdriver.chrome.driver. If null, selenium will
    // attempt to find chromedriver using PATH.
    chromeDriver     : 'node_modules/protractor/selenium/chromedriver',
    // Additional command line options to pass to selenium. For example,
    // if you need to change the browser timeout, use
    // seleniumArgs: ['-browserTimeout=60'],
    seleniumArgs     : [],

    // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
    // The tests will be run remotely using SauceLabs.
    sauceUser        : null,
    sauceKey         : null,

    // ----- What tests to run -----
    //
    // Spec patterns are relative to the location of this config.
    specs            : [
        './test/e2e/*.js'
    ],

    // ----- Capabilities to be passed to the webdriver instance ----
    //
    // For a full list of available capabilities, see
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    // and
    // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
    capabilities     : {
        'browserName': 'chrome' // Issues after I upgraded to Maverics and bleeding edge needs to work itself out.
        // 'browserName': 'safari'
        // 'browserName': 'firefox'
    },

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl          : 'http://localhost:9871',

    // Selector for the element housing the angular app - this defaults to
    // body, but is necessary if ng-app is on a descendant of <body>
    rootElement      : 'body',

    // ----- Options to be passed to minijasminenode -----
    jasmineNodeOpts  : {
        // onComplete will be called just before the driver quits.
        onComplete            : null,
        // If true, display spec names.
        isVerbose             : false,
        // If true, print colors to the terminal.
        showColors            : true,
        // If true, include stack traces in failures.
        includeStackTrace     : true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 10000
    }
};
