'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfeArchivosCtrl
 * @description
 * # ProfeArchivosCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('ProfeArchivosCtrl', function () {
    var nv = this;
    var fo = this;
    var si = this;
    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
    si.sidebarTemplate = {
      url : 'views/sidebar/sidebar-profe.html'
    },
     fo.footerTemplate = {
      url : 'views/footer/footer.html'
    }
  });