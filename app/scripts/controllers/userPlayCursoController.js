'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:UserPlayCursoCtrl
 * @description
 * # UserPlayCursoCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('UserPlayCursoCtrl', function () {
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

   nv.styleNavBar = {
     display: 'true'
   };

   nv.setearActiveMenu = function() {
     if(nv.styleNavBar.display === 'true') {

       nv.styleNavBar.display = 'none'
     } else {
       nv.styleNavBar.display = 'true';
     }
   }
  });
