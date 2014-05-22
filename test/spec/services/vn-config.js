'use strict';

describe('Service: vnConfig', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnConfig;

    describe('before configuration', function () {
        beforeEach(inject(function (_vnConfig_) {
            vnConfig = _vnConfig_;
        }));

        it('should not have an account defined', function () {
            expect(vnConfig.getAccount()).not.toBeDefined();
        });

        it('should default to true for globalNavState ', function () {
            expect(vnConfig.getGlobalNavState()).toBe(true);
        });

        it('should default to the designAction ', function () {
            expect(vnConfig.getCurrentAction()).toBe('designAction');
        });

        it('should default to true for the globalAttrBucketState', function () {
            expect(vnConfig.getGlobalAttrBucketState()).toBe(true);
        });

        it('should not have an iframe base path', function () {
            expect(vnConfig.getIframePathBase()).not.toBeDefined();
        });

        it('should not have a firebase endpoint', function () {
            expect(vnConfig.getFirebaseUrl()).not.toBeDefined();
        });

        it('should default screenMode to desktop', function () {
            expect(vnConfig.getScreenMode()).toBe('desktop');
        });

        it('should default to off for preview mode', function () {
            expect(vnConfig.getPreviewMode()).toBe('off');
        });

        it('should have default workspace dimensions', function () {
            var wsd = vnConfig.getWorkspaceDimensions();

            expect(wsd).toBeDefined();
            expect(wsd.width).toBeDefined();
            expect(wsd.width).toBe(0);
            expect(wsd.height).toBeDefined();
            expect(wsd.height).toBe(0);
        });

    });

    describe('after configuration', function () {
        beforeEach(inject(function (_vnConfig_) {
            vnConfig = _vnConfig_;

            // TODO - Implicit test of initConfig fn needs to be made explicit
            vnConfig.initConfig(); // The mock is baked into this method for dev
        }));

        it('should return an account', function () {
            var testAccount = vnConfig.getAccount();
            expect(testAccount).toBeDefined();
            expect(typeof testAccount).toBe('string');
        });

        it('should return an globalNavState', function () {
            var navState = vnConfig.getGlobalNavState();
            expect(navState).toBeDefined();
            expect(typeof navState).toBe('boolean');
        });

        it('should set a global nav state', function () {
            vnConfig.setGlobalNavState(false);
            expect(vnConfig.getGlobalNavState()).toBe(false);

            vnConfig.setGlobalNavState(true);
            expect(vnConfig.getGlobalNavState()).toBe(true);
        });

        it('should return a current action', function () {
            var testAction = vnConfig.getCurrentAction();
            expect(testAction).toBeDefined();
            expect(typeof testAction).toBe('string');
        });

        it('should set a current action', function () {
            //TODO - force only specific action types as string
            var testAction = 'testAction';

            vnConfig.setCurrentAction(testAction);
            expect(vnConfig.getCurrentAction()).toBe('testAction');
        });

        it('should return an iFramePathBase', function () {
            //TODO - answer why this doesn't have a setter. How is it set?
            var test = vnConfig.getIframePathBase();

            expect(test).toBeDefined();
            expect(typeof test).toBe('string');
        });

        it('should return a firebase url ', function () {
            var test = vnConfig.getFirebaseUrl();
            expect(test).toBeDefined();
            expect(typeof test).toBe('string');
        });

        it('should get the screenMode', function () {
            var test = vnConfig.getScreenMode();
            expect(test).toBeDefined();
            expect(typeof test).toBe('string');
        });

        it('should set a screenMode', function () {
            vnConfig.setScreenMode(true);
            expect(vnConfig.getScreenMode()).toBe(true);

            vnConfig.setScreenMode(false);
            expect(vnConfig.getScreenMode()).toBe(false);
        });


        //TODO Talk w/ tsnako re the setter takes Boolean and the getter returns string
        //TODO optimize it?
        it('should get the preview mode', function () {
            var test = vnConfig.getPreviewMode();
            expect(test).toBeDefined();
            expect(typeof test).toBe('string');
        });

        it('should set the preview mode', function () {
            vnConfig.setPreviewMode(true);
            expect(vnConfig.getPreviewMode()).toBe('on');

            vnConfig.setPreviewMode(false);
            expect(vnConfig.getPreviewMode()).toBe('off');
        });

        it('should get workspace dimensions', function () {
            var test = vnConfig.getWorkspaceDimensions();
            expect(test).toBeDefined();
            expect(typeof test).toBe('object');
        });

        it('should set workspace dimensions', function () {
            var mock = {
                width: 11,
                height: 99
            };
            vnConfig.setWorkspaceDimensions(mock);

            var test = vnConfig.getWorkspaceDimensions();
            expect(test.width).toEqual(11);
            expect(test.height).toEqual(99);
        });

    });

});
