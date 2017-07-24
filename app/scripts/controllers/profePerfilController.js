'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfePerfilCtrl
 * @description
 * # ProfePerfilCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('ProfePerfilCtrl', function () {
    var nv = this;
    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
    nv.sidebarTemplate = {
      url : 'views/sidebar/sidebar-profe.html'
    },
    nv.footerTemplate = {
      url : 'views/footer/footer.html'
    }
  });