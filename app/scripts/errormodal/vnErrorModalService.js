'use strict';
/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnErrorModalService
 * @description
 * The vnErrorModalService provides methods to show a
 * modal window with template passed in or the default
 * error template.
 *
 * */


angular.module('Volusion.toolboxCommon')
    .factory('vnErrorModalService', ['$modal', function($modal){

    return {
        showError: function(errorViewTemplateUrl) {
            return $modal.open({
                templateUrl: errorViewTemplateUrl || 'errormodal/vnErrorModal.tpl.html'
            });
        }
    };
}]);
