'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:UserCursosCtrl
 * @description
 * # UserCursosCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('UserCursosCtrl', function () {
    var nv = this;
    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
    nv.sidebarTemplate = {
      url : 'views/sidebar/sidebar-user.html'
    },
    nv.footerTemplate = {
      url : 'views/footer/footer.html'
    }
  });