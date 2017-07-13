'use strict';

angular.module('yeomanApp')
	.controller('MenuCtrl', function(authUser, $location, $scope, sessionControl){
		var mu = this;

		mu.isLogin = authUser.isLoggedIn();

		$scope.$watch(function(){
			return authUser.isLoggedIn();
		},function(newVal){
			if(typeof newVal !== 'undefined'){
				mu.isLogin = authUser.isLoggedIn();
			}
		});

		mu.user = {
			email : sessionControl.get('email'),
			name : sessionControl.get('username'),
			avatar : sessionControl.get('avatar')
		}


		mu.logout = function(){
			authUser.logout();
		};

		mu.isActive = function(viewLocation){
			return viewLocation === $location.path();
		};
	});