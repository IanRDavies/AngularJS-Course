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
	}

	signUpCtrl.submit = function(userData, form){
		if(userData.favItem){
			MenuService.getItemInfo(userData.favItem)
			.then(function(response){console.log(response)
				return response;})
			.then(function(response){
				userData.favItemInfo = response.data;
				userData.favItemImageUrl = 
					(ApiPath + "/images/" + userData.favItem + ".jpg")
				LogInService.createUser(userData);
				reset(form);
			})
			.catch(function(error){
				form.noSuchItem = true;
			});
		}
		else{
			LogInService.createUser(userData);
			reset(form);
		}
	}

};


})();