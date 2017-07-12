'use strict';

angular.module('yeomanApp')
	.controller('LoginCtrl', function(authUser){
		var vm = this;
		vm.loginForm = {
			email: '',
			password: ''
		};

		vm.login = function(){
			authUser.loginApi(vm.loginForm);
		}
	});