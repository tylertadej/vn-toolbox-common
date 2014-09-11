'use strict';
/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnAppMessageService
 *
 * @description
 * # vnAppMessageService
 * The vnAppMessageService service is used to add messages that
 * need to displayed. It sets up a timeout based on the timeout value
 * passed in the message object by the caller or a default of 4000ms
 *
 * @requires $timeout
 */

angular.module('Volusion.toolboxCommon')
    .service('vnAppMessageService', ['$timeout', function($timeout) {
        var self = {},
            messages = [];

        self.addMessage = function (message) {
            var msg = {
                id: Date.now(),
                type: message.type || 'warning',
                text: message.text
            };
            messages.push(msg);
            $timeout(function() {
                self.removeMessage(msg.id);
            }, message.timeout || 4000);
        };

        self.getMessages = function() {
            return messages;
        };

        self.removeMessage = function(id) {
            angular.forEach(messages, function(msg, messageIndex) {
                if (msg && msg.id === id) {
                    messages.splice(messageIndex, 1);
                }
            });
        };

        return self;
    }]);
