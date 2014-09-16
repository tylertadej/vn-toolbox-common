'use strict';
/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnModalService
 * @description
 * The vnErrorModalService provides methods to show a
 * modal window with template passed in or the default
 * error template.
 *
 * */


angular.module('Volusion.toolboxCommon')
    .factory('vnModalService', ['$modal', function($modal){

    return {
        showError: function(errorViewTemplateUrl, errorScope) {
            return $modal.open({
                templateUrl: errorViewTemplateUrl || 'modal/vnErrorModal.tpl.html',
				scope: errorScope
            });
        },
		showMessage: function (modalViewTemplateUrl, modalScope) {
			return $modal.open({
				templateUrl: modalViewTemplateUrl || 'modal/vnModalMessage.tpl.html',
				scope      : modalScope
			});
		}
    };
}]);
