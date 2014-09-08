'use strict';

/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnSortDefault
 * @description
 * # vnSortDefault
 * Constant in the Volusion.toolboxCommon to set up the sorting directive.
 * Will be ideal to have it in a constant so that vnAppRoute service can use it to
 * implement logic rules that relate to how urls should behave / look.
 */
angular.module('Volusion.toolboxCommon')
  .constant('vnSortDefault', 'relevence');
