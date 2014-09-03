'use strict';
/**
 * @ngdoc controller
 * @name Volusion.toolboxCommon.controller:vnAppMessageCtrl
 *
 * @description
 * The `vnAppMessageCtrl` is associated with the `vnAppMessageDirective` and
 * interacts with the `vnAppMessageService` to get the list of messages and to
 * handle the user click to remove the message.
 *
 * @requires vnAppMessageService
 * */


angular.module('Volusion.toolboxCommon')
    .controller('vnAppMessageCtrl', ['vnAppMessageService', function(vnAppMessageService){
        var self = this;

        self.alerts = vnAppMessageService.getMessages();

        /**
         * closes the alert and removes it from the list of alerts.
         * @param messageId
         */
        self.closeAlert = function (messageId) {
            vnAppMessageService.removeMessage(messageId);
        };
}]);
