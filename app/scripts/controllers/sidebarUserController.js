'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:sidebarUserCtrl
 * @description
 * # sidebarUserCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('sidebarUserCtrl', function (authUser, $location, $scope) {
    var si = this;

    si.logout = function(){
		authUser.logout();
	};

	si.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    }
   
  });
