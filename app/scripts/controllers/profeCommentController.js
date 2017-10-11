'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfeArchivosCtrl
 * @description
 * # ProfeArchivosCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('ProfeCommentCtrl', function () {
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