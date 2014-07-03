'use strict';

window.bem = (function() {

	function createElement(dataAttrs, modifiers) {
		dataAttrs = dataAttrs || {};
		dataAttrs['vn-modifiers'] = modifiers || '';
		var $elem = angular.element('<div/>');
		Object.keys(dataAttrs).forEach(function(key) {
			$elem.attr('data-' + key, dataAttrs[key]);
		});
		return $elem;
	}

	return {
		block: function(name, modifiers) {
			return createElement({ 'vn-block': name }, modifiers);
		},
		element: function(name, modifiers) {
			return createElement({ 'vn-element': name }, modifiers);
		}
	};

})();
