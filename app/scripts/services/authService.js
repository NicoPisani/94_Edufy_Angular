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
	.factory('getRol', function($auth, sessionControl, toastr, $location){
		return sessionControl.get('rol');
	})
	.factory('authUser', function($auth, sessionControl, toastr, $location){
		var cacheSession = function(email, name, rol, birthday, avatar){
			sessionControl.set('userIsLogin', true);
			sessionControl.set('email', email);
			sessionControl.set('name', name);
			sessionControl.set('rol', rol);
			sessionControl.set('birthday', birthday);
			sessionControl.set('avatar', avatar);
		};
		var unCacheSession = function(){
			sessionControl.unset('userIsLogin', true);
			sessionControl.unset('name', name);
			//sessionControl.unset('rol', rol);
			//sessionControl.unset('email', email);
			//sessionControl.unset('avatar', avatar);
		};
		var login = function(loginForm){
			$auth.login(loginForm).then(
				function (response){
					cacheSession(response.data.user.email, response.data.user.name, response.data.user.rol, response.data.user.birthday, loginForm.avatar );
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
			},
			getRol: function() {
		        return sessionControl.get('rol');
		    }
		}
	});
