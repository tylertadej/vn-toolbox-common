'use strict';

describe('Service: vnFirebase', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnFirebase;
    beforeEach(inject(function (_vnFirebase_) {
        vnFirebase = _vnFirebase_;
    }));

    it('should exist', function () {
        expect(!!vnFirebase).toBe(true);
        expect(typeof vnFirebase).toBe('object');
    });

    it('should accept strings for getFirebaseData', function(){

        // Give it an object and see if it returns an error
        // DEV NOTE: do you see and rembember the anonomous function passed to expect?
        expect( function(){ vnFirebase.getFirebaseData({}); } ).toThrow(new Error('vnFirebase.getFirebaseData function failed.'));

        /** Give it something real and see if it returns an object
         * I have not yet figured out an easy way to do ajax without mocking
         * so tests end here for this fn.
         *
         */
        var test2 = vnFirebase.getFirebaseData( 'navs' );
        expect(typeof test2).toBe('object');

    });

    it('should accept strings for resetSiteBuilder', function(){

        var test2 = vnFirebase.resetSiteBuilder();
        expect(test2).toBe(true);

    });

    it('should accept strings and objects for resetDataForPath', function(){

        var test = vnFirebase.resetDataForPath('navs', {} );
        expect(test).toBe(true);
        expect( function(){ vnFirebase.resetDataForPath( {} ); } ).toThrow(new Error('vnFirebase.resetDataForPath() error.'));
        expect( function(){ vnFirebase.resetDataForPath( 'navs' ); } ).toThrow(new Error('vnFirebase.resetDataForPath() error.'));

    });
});
