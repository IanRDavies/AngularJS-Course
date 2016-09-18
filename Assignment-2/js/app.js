(function() {
"use strict";

angular.module("ShoppingListCheckOff", [])
.controller("ToBuyShoppingController", ToBuyShoppingController)
.controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
.service("ShoppingListCheckOffService", ShoppingListService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {

	var toBuyCtrl = this;

	toBuyCtrl.toBuyList = ShoppingListCheckOffService.getToBuyList();

	toBuyCtrl.buyItem = function(itemIndex){
		ShoppingListCheckOffService.buyItem(itemIndex);
	};

}//END OF TO BUY CONTROLLER

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
	var boughtListCtrl = this;

	boughtListCtrl.boughtList = ShoppingListCheckOffService.getBoughtList();


};//END OF BOUGHT CONTROLLER

function ShoppingListService() {
	var service = this;
	var toBuyList = [
						{
							name: "Almond Milk",
							quantity: "2 Pints of"
						},
						{
							name: "Donuts",
							quantity: "4"
						},
						{
							name: "Cookies",
							quantity:"A bag of"
						},
						{
							name: "Chocolates",
							quantity: "10"
						},
						{
							name: "Lemon Jelly",
							quantity: "500g of"
						}
					];


	var boughtList = [];

	service.getToBuyList = function(){
		return toBuyList;
	};

	service.getBoughtList = function(){
		return boughtList;
	};

	service.buyItem = function(itemIndex) {
		boughtList.push(toBuyList[itemIndex]);
		toBuyList.splice(itemIndex, 1);
	};


};


})();