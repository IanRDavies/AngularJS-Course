(function(){
'use strict';


angular.module('public')
.controller("SignUpController", SignUpController);

SignUpController.$inject = ["LogInService", "MenuService", "ApiPath", "$scope"];
function SignUpController(LogInService, MenuService, ApiPath, $scope){
	var signUpCtrl = this;

	function reset(form){
		// Reset the form
		form.$setPristine();
    	form.$setUntouched();
    	form.noSuchItem = false;
    	signUpCtrl.user = {}
    	form.completed = false;
	}

	signUpCtrl.submit = function(userData, form){
		if(userData.favItem){
			MenuService.getItemInfo(userData.favItem.toUpperCase())
			.then(function(response){
				userData.favItemInfo = response.data;
				if(userData.favItemInfo.image_present){
					userData.favItemImageUrl = 
						(ApiPath + "/images/" + userData.favItem + ".jpg")
					}
				else{
					userData.favItemImageUrl = "images/ImgNotAvailable.jpg"
				}
				LogInService.createUser(userData);
				reset(form);
				form.completed = true;
			})
			.catch(function(error){
				form.noSuchItem = true;
			});
		}
		else{
			LogInService.createUser(userData);
			reset(form);
			form.completed = true;
		}
	}

};


})();