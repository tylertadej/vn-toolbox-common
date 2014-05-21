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

});
