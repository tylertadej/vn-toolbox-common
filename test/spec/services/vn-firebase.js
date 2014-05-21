'use strict';

describe('Service: vnFirebase', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnFirebase;
    beforeEach(inject(function (_vnFirebase_) {
        vnFirebase = _vnFirebase_;
    }));

    it('should do something', function () {
        expect(!!vnFirebase).toBe(true);
    });

    it('should exist', function () {
        expect(!!vnFirebase).toBe(true);
        expect(typeof vnFirebase).toBe('object');
    });

    it('should accept strings for getFirebaseData', function(){
        var test = vnFirebase.getFirebaseData( {} );
        expect(test).toBe(false);
        var test2 = vnFirebase.getFirebaseData( 'navs' );
        expect(typeof test2).toBe('object');
    });

    it('should accept strings and objects for resetDataForPath', function(){
        var test = vnFirebase.resetDataForPath('navs', {} );
        expect(test).toBe(true);

        var test2 = vnFirebase.resetDataForPath( {} );
        expect(test2).toBe(false);

        var test3 = vnFirebase.resetDataForPath( 'navs' );
        expect(test3).toBe(false);

//        var test2 = vnFirebase.resetDataForPath( 'navs', {} );
//        expect(typeof test2).toBe('object');
    });
});
