'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:UserPerfilCtrl
 * @description
 * # UserPerfilCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('UserPerfilCtrl', function (authUser, sessionControl) {
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


    nv.user = {
      email : sessionControl.get('email'),
      name : sessionControl.get('name'),
      rol : sessionControl.get('rol'),
      birthday : sessionControl.get('birthday'),
      avatar : sessionControl.get('avatar')
    }
  });