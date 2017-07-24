'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:UserPagosCtrl
 * @description
 * # UserPagosCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('UserPagosCtrl', function () {
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