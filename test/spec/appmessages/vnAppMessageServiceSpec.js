'use strict';
/**
 * @module test.Volusion.toolboxCommon
 * @name vnAppMessageService
 * @description
 * Tests for vnAppMessageService under Volusion.toolboxCommon
 * */


describe('Service: vnAppMessageService', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var vnAppMessageService, $timeout;
    beforeEach(inject(function (_vnAppMessageService_, _$timeout_) {
        $timeout = _$timeout_;
        vnAppMessageService = _vnAppMessageService_;
    }));

    it('should be defined', function () {
        expect(!!vnAppMessageService).toBeDefined();
    });

    it('returns an empty messages array initially', function () {
        expect(vnAppMessageService.getMessages().length).toBe(0);
    });

    it('adds a message to the messages array', function () {
        vnAppMessageService.addMessage({ text: 'foo', type: 'bar' });
        var messages = vnAppMessageService.getMessages();
        expect(messages.length).toBe(1);
        expect(messages[0].type).toBe('bar');
        $timeout.flush();
    });

    it('adds a message to the messages array and assigns id and default values', function () {
        vnAppMessageService.addMessage({ text: 'foo' });
        var messages = vnAppMessageService.getMessages();
        expect(messages.length).toBe(1);
        expect(messages[0].id).toBeDefined();
        expect(messages[0].type).toBe('warning');
        $timeout.flush();
    });

    it('removes a message that has been added automatically after a set time', function () {
        vnAppMessageService.addMessage({ text: 'foo' });
        expect(vnAppMessageService.getMessages().length).toBe(1);
        $timeout.flush();
        expect(vnAppMessageService.getMessages().length).toBe(0);
    });


    it('can remove a message from the array by calling `removeMessage()`', function () {
        vnAppMessageService.addMessage({ text: 'foo' });
        var messages = vnAppMessageService.getMessages();
        expect(messages.length).toBe(1);
        vnAppMessageService.removeMessage(messages[0].id);
        expect(messages.length).toBe(0);
    });

});
