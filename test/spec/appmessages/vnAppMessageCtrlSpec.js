/**
 * @module test.Volusion.toolboxCommon
 * @name vnAppMessageCtrl
 * @description
 * Tests for appMessagesCtrl under Volusion.toolboxCommon
 * */


describe('Controller: Volusion.toolboxCommon.vnAppMessageCtrl', function () {

    // load the controller's module
    beforeEach(module('Volusion.toolboxCommon'));

    var ctrl,
        scope,
        message,
        vnAppMessageService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _vnAppMessageService_) {
        vnAppMessageService = _vnAppMessageService_;
        message = {
            id: Date.now(),
            text: 'foo',
            type: 'danger'
        };
        spyOn(vnAppMessageService, 'getMessages').and.returnValue([message]);
        scope = $rootScope.$new();
        ctrl = $controller('vnAppMessageCtrl', {
            $scope: scope
        });
    }));

    it('should be defined', function () {
        expect(ctrl).toBeDefined();
    });

    it('should populate the alerts property with the array returned from the service', function () {
        expect(ctrl.alerts).toBeDefined();
        expect(ctrl.alerts.length).toBe(1);
    });

    it('should remove an alert with a given id', function () {
        spyOn(vnAppMessageService, 'removeMessage');
        ctrl.closeAlert(message.id);
        expect(vnAppMessageService.removeMessage).toHaveBeenCalledWith(message.id);
    });
});
