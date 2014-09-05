TestUtils = (function() {
	'use strict';
	/**
	 * Usually called to ensure a promise executes
	 * @see https://github.com/angular/angular.js/issues/2431
	 */
	function patchNoPendingFlushError(rootScope)  {
		rootScope.$digest();
	}

	return {
		patchNoPendingFlushError : patchNoPendingFlushError
	};
})();
