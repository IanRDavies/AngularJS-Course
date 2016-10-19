(function() {
"use strict";

angular.module('public')
.service('LogInService', LogInService);

LogInService.$inject = ['$http', 'ApiPath'];
function LogInService() {
	var service = this;

	var users = []
	var emails = []

	service.uniqueUser = function(email){
		if(emails.includes(email)){
			return false
		}
		else {
			return true
		}
	}

	service.createUser = function(userData) {
		users.push(userData);
	}

};


})();