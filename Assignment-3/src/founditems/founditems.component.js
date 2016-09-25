(function() {
"use strict";

angular.module('NarrowItDownApp')
.component('foundItems', {
	templateUrl: "src/founditems/founditems.template.html",
	controller: FoundItemsComponentController,
	bindings: {
		found: '<',
		onRemove: '&',
		showList: '<'
	}
});

function FoundItemsComponentController() {
	var $ctrl = this;

	$ctrl.remove = function(itemIndex) {
		$ctrl.onRemove({ index: itemIndex });
	};
}

})();