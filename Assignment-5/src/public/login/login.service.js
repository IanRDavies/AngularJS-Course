(function() {
"use strict";

angular.module('public')
.service('LogInService', LogInService);

LogInService.$inject = ['$http', 'ApiPath'];
function LogInService() {
	var service = this;

	var users = [];
	var emails = [];
	var currentUser;

	service.uniqueUser = function(email){
		if(emails.includes(email.toLowerCase())){
			return false
		}
		else {
			return true
		}
	}

	service.createUser = function(userData) {
		// to prevent the same email with differing case being submitted
		userData.email = userData.email.toLowerCase();
		emails.push(userData.email);
		currentUser = userData;
		users.push(userData);
	}

	service.getCurrentUser = function(){
		return currentUser;
	}

};


})();	