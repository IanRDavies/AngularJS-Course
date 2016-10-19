(function(){
'use strict';


angular.module('public')
.controller("SignUpController", SignUpController);

SignUpController.$inject = ["LogInService", "MenuService", "ApiPath"];
function SignUpController(LogInService) {
	var signUpCtrl = this;

	signUpCtrl.submit = function(userData){
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