'use strict';
/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnAppMessage
 *
 * @description
 * The vnAppMessage directive displays the list of messages
 * that will be displayed to the user.
 *
 * @restrict A
 * */


angular.module('Volusion.toolboxCommon')
    .directive('vnAppMessage', function () {
    return {
        restrict: 'EA',
        controller: 'vnAppMessageCtrl',
        controllerAs: 'appMessagesCtrl',
        templateUrl: 'appmessages/vnAppMessage.tpl.html'
    };
});
