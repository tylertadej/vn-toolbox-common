'use strict';

/**
 * @ngdoc filter
 * @name Volusion.toolboxCommon:vnLegacyLinkify
 *
 * @description
 * The `vnLegacyLinkify` filter sets the `target` attribute of `<a>` elements
 * within the HTML string passed in.
 *
 * @usage
 * <h1 data-vn-element="title" data-ng-bind-html="article.title | vnLegacyLinkify | html"></h1>
 *
 * @example
 */

angular.module('Volusion.toolboxCommon')
	.filter('vnLegacyLinkify',
		function() {

			return function(html) {
				var $div = angular.element('<div/>').html(html);
				angular.forEach($div.find('a'), function(a) {
					var $a = angular.element(a);
					$a.attr('target', $a.attr('target') || '_self');
				});
				return $div.html();
			};
		});
