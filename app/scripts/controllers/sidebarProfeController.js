'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfeNuevoCtrl
 * @description
 * # sidebarProfeController
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('sidebarProfeCtrl', function (authUser, $location, $scope) {
    var vm = this;

    vm.logout = function(){
		authUser.logout();
	};
    
    vm.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    }
  });
