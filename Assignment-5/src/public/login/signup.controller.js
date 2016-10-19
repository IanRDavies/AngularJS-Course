(function(){
'use strict';


angular.module('public')
.controller("SignUpController", SignUpController);

SignUpController.$inject = ["LogInService", "MenuService", "ApiPath", "$scope"];
function SignUpController(LogInService, MenuService, ApiPath, $scope){
	var signUpCtrl = this;

	signUpCtrl.submit = function(userData){
		console.log(userData);
		if(userData.favItem){
			MenuService.getItemInfo(userData.favItem)
			.then(function(response){
				userData.faveItemInfo = response.data;
				userData.faveItemImageUrl = 
					(ApiPath + "/images/" + itemName + ".jpg");
			})
		}
		LogInService.createUser(userData);
	}

};


})();