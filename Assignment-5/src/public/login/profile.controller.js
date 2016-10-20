(function(){
"use strict";

angular.module('public')
.controller("ProfileController", ProfileCtrl);

ProfileCtrl.$inject = ['user']
function ProfileCtrl(user) {
	var userInfo = this;

	userInfo.user = user;
};

})();