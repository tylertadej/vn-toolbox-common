'use strict';
/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnSearchForm
 *
 * @description
 * The `vnSearchForm` directive displays the search box and the
 * search toggle menu displayed in the mobile screen size.
 *
 * @restrict AE
 *
 * @scope
 *
 * @usage
 * <div vn-search-form></div>
 *
 * */


angular.module('Volusion.toolboxCommon')
	.directive('vnSearchForm', ['vnSearchManager', function (vnSearchManager) {

		return {
			templateUrl: 'productsearch/vnSearchForm.tpl.html',
			restrict   : 'AE',
			replace    : true,
            scope       : {
                searchTerm : '=',
                showSearch : '='
            },
			link       : function postLink(scope, element, attrs) {
				element.bind('click', function () {
					element.find('input').focus();
				});

                scope.searchTerm = scope.searchTerm || vnSearchManager.getSearchText();
                scope.allowCollapse = attrs.allowCollapse && !!(JSON.parse(attrs.allowCollapse));

                scope.doSearch = function () {
                    vnSearchManager.updateSearch(scope.searchTerm);
                };
			}
		};
	}]);
