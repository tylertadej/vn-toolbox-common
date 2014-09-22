'use strict';
/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnShowOnDropdownHover
 *
 * @description
 * The `vnShowOnDropdownHover` enables a bootstrap dropdown menu
 * to be displayed when user hovers over the element.
 *
 * @restrict A
 *
 * @requires
 * $timeout
 *
 * @scope
 *
 * @usage
 *  <ul vn-show-on-dropdown-hover class="dropdown-menu" data-ng-if="category.subCategories.length">
 *      <li data-ng-repeat="subCategory in category.subCategories">
 *          <a data-ng-href="{{ subCategory.url }}">{{subCategory.name}}</a>
 *      </li>
 *  </ul>
 *
 * */

angular.module('Volusion.toolboxCommon')
	.directive('vnShowOnDropdownHover', ['$timeout',
		function ($timeout) {

			return {
				restrict: 'A',
				link    : function postLink(scope, element) {

					var timerHide,
						triggerHover = angular.element(element.parent().find('a')[0]);

					element.bind('mouseenter', function () {
						element.show();
						$timeout.cancel(timerHide);
					})
						.bind('mouseleave', function () {
							timerHide = $timeout(function () {
								element.hide();
							}, 100);
						});

					triggerHover.bind('mouseenter', function () {
						element.show();
						$timeout.cancel(timerHide);
					})
						.bind('mouseleave', function () {
							timerHide = $timeout(function () {
								element.hide();
							}, 100);
						})
						.bind('click', function () {
							element.show();
						});

					/* jshint unused:false */
					scope.$on('$destroy',
						function (event) {
							$timeout.cancel(timerHide);
						}
					);
					/* jshint unused:true */
				}
			};
		}]);
