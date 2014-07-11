/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnCategorySearch
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
    .directive('vnCategorySearch', ['$rootScope', 'vnProductParams', function ($rootScope, vnProductParams) {
        'use strict';
        return {
            templateUrl: 'template/vn-category-search.html',
            restrict   : 'AE',
            scope      : {
                categories: '='
            },
            link       : function postLink(scope) {
                // Categories use this to update the search params.
                scope.updateCategory = function (category) {
                    vnProductParams.addCategory(category.id);
                    $rootScope.$broadcast('ProductSearch.categoriesUpdated', { category: category });
                };

                // Have to do this to listen for the data returned async
                scope.$watch('categories', function (categories) {

                    // Gaurd against the error message for while categories is not defined.
                    if (!categories || !categories[0]) {
                        return;
                    } else {
                        // Navigating / parsing the api response to get the data
                        // Optimization opportunity: handle this in the api service so directive doesn't have to parse
                        // and just return an object or even better create a category model object.
                        scope.categories = categories[0];
                        scope.subCategories = categories[0].subCategories;
                    }
                });
            }
        };
    }])
    .run(['$templateCache', function ($templateCache) {

        'use strict';

        $templateCache.put(
            'template/vn-category-search.html',
                '<div class="-category-search">' +
                    '<div data-ng-repeat="category in categories">' +
                        '<a data-ng-href="{{ category.url  }}">{{ category.name }}</a>' +
                    '</div>' +

                    '<div data-ng-repeat="subCat in subCategories">' +
                        '<a data-ng-href="{{ subCat.url  }}">{{ subCat.name }}</a>' +
                    '</div>' +
                '</div>'
        );
    }]);
