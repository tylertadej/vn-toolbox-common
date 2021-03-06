
/*global describe, module, beforeEach, inject */

describe('Controller: MainCtrl', function () {

    'use strict';

    // load the controller's module
    beforeEach(module('Volusion.toolboxCommon'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

});
