'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfeNuevoCtrl
 * @description
 * # sidebarProfeController
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('sidebarProfeCtrl', function ($location) {
    var vm = this;
    
    vm.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    }
  });
