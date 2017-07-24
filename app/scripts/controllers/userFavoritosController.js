'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:UserFavoritosCtrl
 * @description
 * # UserFavoritosCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('UserFavoritosCtrl', function () {
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