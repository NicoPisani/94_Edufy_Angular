'use strict';

angular.module('yeomanApp')
	.controller('MenuCtrl', function (authUser, $location, $scope, sessionControl){
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
			name : sessionControl.get('name'),
			rol : sessionControl.get('rol'),
			avatar : sessionControl.get('avatar')
		}

		$scope.$watch(function(){
			return sessionControl.get('name');
		}, function(newVal){
			if(typeof newVal !== 'undefined'){
				mu.user.email = sessionControl.get('email');
			}
		});

		var C = authUser.isLoggedIn();
		$scope.IsAuthenticated = (C||null)==null?false:true;


		mu.logout = function(){
			authUser.logout();
		};

		mu.isActive = function(viewLocation){
			return viewLocation === $location.path();
		};

		mu.getRol = authUser.getRol();

	   $scope.$watch( function() {
	     return authUser.getRol();
	   }, function(newVal) {
	     if(newVal !== undefined) {
	       mu.getRol = authUser.getRol;
	     }
	   });

	});