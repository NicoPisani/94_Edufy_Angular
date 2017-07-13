'use strict';

angular.module('authService', [])
	.factory('sessionControl', function(){
		return {
			get: function(key){
				return sessionStorage.getItem(key);
			},
			set: function(key, val){
				return sessionStorage.setItem(key, val);
			},
			unset: function(key){
				return sessionStorage.removeItem(key);
			}
		}
	})
	.factory('authUser', function($auth, sessionControl, toastr, $location){
		var cacheSession = function(email, name, avatar){
			sessionControl.set('userIsLogin', true);
			sessionControl.set('email', email);
			sessionControl.set('name', name);
			sessionControl.set('avatar', avatar);
		};
		var unCacheSession = function(){
			sessionControl.unset('userIsLogin', true);
			sessionControl.unset('name', name);
			//sessionControl.unset('email', email);
			//sessionControl.unset('avatar', avatar);
		};
		var login = function(loginForm){
			$auth.login(loginForm).then(
				function (response){
					cacheSession(response.data.user.email, response.data.user.name, loginForm.avatar );
					$location.path('#/panel/user/perfil');
					toastr.success('Sesión iniciada con éxito', 'Mensaje');
				},
				function(error){
					unCacheSession();
					toastr.error(error.data.error, 'Error');
				}
			);
		};

		return {
			loginApi: function(loginForm){
				login(loginForm);
			},
			logout: function(){
				$auth.logout();
				unCacheSession();
				toastr.success('Sesión cerrada con exito', 'Mensaje');
				$location.path('/');
			},
			isLoggedIn: function(){
				return sessionControl.get('userIsLogin') !== null;
			}
		}
	});
