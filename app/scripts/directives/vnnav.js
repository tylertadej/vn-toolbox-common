/*global angular, alert */

/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnNav
 * @restrict EA
 * @requires $rootScope
 * @scope
 * @description
 *
 * Replace the element with navbar's html markup. Accepts categoryList as array of objects
 *
 * @usage
 <div vn-nav category-list="categoryList" callback="alert('Item selected')"></div>

 -OR-------------------------------------

 <vn-nav category-list="categoryList"></vn-nav>
 *
 *
 * @example
     <example module="Volusion.toolboxCommon" deps="">
         <file name="script.js">
             angular.module('Volusion.toolboxCommon', [])
                .controller('NavCtrl',
                    function ($scope) {

                        $scope.categoryList = [
                            {name : 'Apparel',
                                subCategories: [
                                    {id: 123, name : 'Women'},
                                    {id: 234, name : 'Men'}
                                ]},
                            {name : 'Home decor',
                                subCategories: [
                                    {id: 123, name : 'Furniture'},
                                    {id: 234, name : 'Home Accessories'}
                                ]},
                            {name : 'Beauty',
                                subCategories: [
                                    {id: 123, name : 'Bath and Body'},
                                    {id: 234, name : 'Hair Care'}
                                ]},
                            {name : 'Gourmet food',
                                subCategories: [
                                    {id: 123, name : 'Speciality Items'},
                                    {id: 234, name : 'Sweets'}
                                ]}
                        ];

                    });
         </file>
         <file name="index.html">
             <div ng-controller="NavCtrl">
                <vn-nav category-list="categoryList"></vn-nav>
             </div>
         </file>
     </example>
 */

angular.module('Volusion.toolboxCommon')
    .directive('vnNav',
        ['$rootScope',
            function ($rootScope) {

                'use strict';

                return {
                    templateUrl: 'template/navbar.html',
                    restrict   : 'EA',
                    replace    : true,
                    scope      : {
                        currMode     : '@currMode',
                        categoryList : '=',
                        callback     : '@'
                    },
                    link       : function postLink(scope, element) {
                        if (scope.currMode === undefined) {
                            scope.currMode = 'on';
                        }

                        if (scope.callback === undefined) {
                            scope.callback = function () {
                                alert('Item selected');
                            };
                        }

                        // Component constants *****************
                        scope.componentId = '100005';
                        scope.componentName = 'navbar';
                        // *************************************

                        // Component is not selected by default
                        scope.selected = false;

                        scope.$on('currentComponent.change', function (event, component) {
                            if (component && component.id && scope.currMode === 'off') {
                                scope.selected = (component.id === scope.componentId);
                            }
                        });

                        element.on('click', function (event) {
                            // if in EDIT mode
                            if (scope.currMode === 'off') {
                                event.preventDefault();
                                $rootScope.$broadcast('currentComponent.change', {'id': scope.componentId, 'name': scope.componentName, 'action': 'set'});
                            }
                        });
                    }
                };
            }])
    .run(['$templateCache', function ($templateCache) {
        'use strict';

        $templateCache.put(
            'template/navbar.html',
            '<div class="collapse navbar-collapse " id="th-main-menu" data-ng-class="!navCollapsed && \'in\'" data-ng-click="navCollapsed=true">' +
                '<ul class="nav navbar-nav">' +
                    '<li class="dropdown" data-ng-repeat="category in categoryList">' +
                        '<a href class="dropdown-toggle th-dropdown-toggle" data-toggle="dropdown">{{category.name}}</a>' +
                        '<ul class="dropdown-menu" data-ng-if="category.subCategories.length">' +
                            '<li data-ng-repeat="subCategory in category.subCategories">' +
                                '<a href ng-click="{{ callback }}">{{subCategory.name}}</a>' +
                            '</li>' +
                        '</ul>' +
                    '</li>' +
                '</ul>' +
            '</div>'
        );
    }]);
