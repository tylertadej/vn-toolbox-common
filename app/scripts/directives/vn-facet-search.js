/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnFacetSearch
 * @restrict EA
 * @requires $rootScope
 * @requires vnProductParams
 * @scope
 * @description
 *
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
        }])    .run(['$templateCache', function ($templateCache) {

        'use strict';

        $templateCache.put(
            'template/vn-facet-search.html',
                '<div class="-faceted-search">' +
                    '<header>Refine by</header>' +
                    '<div class="facets">' +
                        '<div class="facet-item" ng-repeat="facet in facets track by $index">' +
                            '<header>{{ facet.title }}</header>' +
                            '<div class="-facet-property" ng-repeat="property in facet.properties track by $index">' +
                                '<div class="row">' +
                                    '<label>{{ property.name }}' +
                                        '<input type="checkbox"' +
                                        'name="property.name"' +
                                        'ng-checked="selectProperty(property)"' +
                                        'ng-click="refineFacetSearch(property)"/>' +
                                    '</label>' +
                                '</div>' +
                            '</div>' +
                        '<hr>' +
                        '</div>' +
                    '</div>' +
                '</div>'
        );
    }]);
