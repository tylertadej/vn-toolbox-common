'use strict';
/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnPaginator
 *
 * @description
 * The `vnPaginator` directive displays pagination controls with
 * methods on the scope to allow moving to the next and previous
 * page.
 *
 * @restrict A
 *
 * @requires
 * vnProductParams
 * themeSettings
 *
 * @scope
 *
 * @usage
 * <div vn-paginator cursor="cursor" current-page="currentPage" query-fn="queryProducts()"></div>
 *
 * */


angular.module('Volusion.toolboxCommon')
	.directive('vnPaginator', ['vnProductParams', 'themeSettings', function (vnProductParams, themeSettings) {

		return {
			templateUrl: 'pagination/vnPaginator.tpl.html',

            restrict   : 'A',

            scope      : {
				cursor : '=',
				queryFn: '&'
			},
			link: function postLink(scope, elem, attrs) {

				vnProductParams.setPageSize(themeSettings.getPageSize());

				scope.nextPage = function () {
					if (scope.cursor.currentPage < scope.cursor.totalPages) {
						vnProductParams.nextPage();
						scope.queryFn();
					}
				};

				scope.prevPage = function () {
					if (scope.cursor.currentPage > 1) {
						vnProductParams.previousPage();
						scope.queryFn();
					}
				};

				scope.$watch(attrs.cursor, function (value) {

					if (value === undefined) {
						return;
					}

					scope.currentPage = value.currentPage.toString();
					vnProductParams.setPage(scope.currentPage);
				}, true);
			}
		};
	}]);
