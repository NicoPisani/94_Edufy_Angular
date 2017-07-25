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
		var cacheSession = function(id, email, name, rol, birthday, active, plataforma_id, avatar){
			sessionControl.set('userIsLogin', true);
			sessionControl.set('id', id);
			sessionControl.set('email', email);
			sessionControl.set('name', name);
			sessionControl.set('rol', rol);
			sessionControl.set('birthday', birthday);
			sessionControl.set('active', active);
			sessionControl.set('plataforma', plataforma_id);
			sessionControl.set('avatar', avatar);
		};
		var unCacheSession = function(id, email, name, rol, birthday, active, plataforma_id, avatar){
			sessionControl.unset('userIsLogin', true);
			sessionControl.unset('id', id);
			sessionControl.unset('email', email);
			sessionControl.unset('name', name);
			sessionControl.unset('rol', rol);
			sessionControl.unset('birthday', birthday);
			sessionControl.unset('active', active);
			sessionControl.unset('plataforma', plataforma_id);
			sessionControl.unset('avatar', avatar);
		};
		var login = function(loginForm){
			$auth.login(loginForm).then(
				function (response){
					cacheSession(
						response.data.user.id, 
						response.data.user.email, 
						response.data.user.name, 
						response.data.user.rol, 
						response.data.user.birthday, 
						response.data.user.active, 
						response.data.user.plataforma_id, 
						response.data.user.avatar 
					);
					$location.path('#/panel/user/perfil');
					toastr.success('Sesión iniciada con éxito', 'Mensaje');
				},
				function(error){
					unCacheSession();
					toastr.error('Usuario o contraseña incorrecto', 'Error');
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
