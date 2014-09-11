'use strict';

/**
 * @ngdoc service
 * @name volusionMethodThemeApp.searchManager
 * @description
 * # searchManager
 * Factory in the volusionMethodThemeApp.
 */
angular.module('Volusion.toolboxCommon')
	.factory('vnSearchManager', ['$route', '$location', 'vnProductParams', function ($route, $location, vnProductParams) {

        function getSearchText() {
            return vnProductParams.getSearchText();
        }

		function updateSearch(terms) {
			vnProductParams.updateSearch(terms);
			$location.search('q', terms);
			if ('/search' !== $location.path()) {
				$location.path('/search');
			}
			$route.reload();
		}


		return {
            getSearchText: getSearchText,
			updateSearch: updateSearch
		};
	}]);
