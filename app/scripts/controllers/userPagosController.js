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
    var fo = this;
    var si = this;
    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
    si.sidebarTemplate = {
      url : 'views/sidebar/sidebar-user.html'
    },
     fo.footerTemplate = {
      url : 'views/footer/footer.html'
    }
  });