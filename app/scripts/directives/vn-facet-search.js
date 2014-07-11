/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnFacetSearch
 * @restrict EA
 * @requires $rootScope
 * @requires vnProductParams
 * @scope
 * @description
 * - docs needed for the directive scope functions available
 * - docs needed for the broadcast triggered so theme can listen for it
 * - docs needed for the html
 *
 * @usage
 * TODO: Add html and javascript here to demo it in docs.
 */
angular.module('Volusion.toolboxCommon')
	.directive('vnFacetSearch', ['$rootScope', 'vnProductParams',
		function ($rootScope, vnProductParams) {
			'use strict';

			return {
				templateUrl: 'template/vn-facet-search.html',
				restrict   : 'AE',
				scope      : {
					facets: '='
				},
				link       : function postLink(scope) {

					scope.$watch('facets', function (facets) {
						scope.facets = facets;
					});

					scope.selectProperty = function (facet) {
						return vnProductParams.isFacetSelected(facet.id);
					};

					scope.refineFacetSearch = function (facet) {

						// Adding / Removeing facet to selectedFacets
						if (!vnProductParams.isFacetSelected(facet.id)) {
							vnProductParams.addFacet(facet.id);
//                            console.log('adding facet: ', vnProductParams.getParamsObject());
						} else {
							vnProductParams.removeFacet(facet.id);
//                            console.log('removing facet: ', vnProductParams.getParamsObject());
						}

						// Broadcast an update to whomever is subscribed.
						$rootScope.$broadcast('ProductSearch.facetsUpdated');
					};
				}
			};
		}]).run(['$templateCache', function ($templateCache) {

		'use strict';

		$templateCache.put(
			'template/vn-facet-search.html',
                '<div class="-faceted-search">' +
                    '<div class="facets">' +
                        '<div class="facet-item" data-ng-repeat="facet in facets track by $index">' +
                            '<h5>{{ facet.title }}</h5>' +
							'<label class="-facet-property" data-ng-repeat="property in facet.properties track by $index">' +
								'<input type="checkbox" ' +
										'name="property.name" ' +
										'ng-checked="selectProperty(property)" ' +
										'ng-click="refineFacetSearch(property)" />' +
                '<span class="name">{{ property.name }}</span>' +
								'<span class="count">{{ property.count }}</span>' +
							'</label>' +
                        	'<hr>' +
                        '</div>' +
                    '</div>' +
                '</div>'
        );
    }]);
