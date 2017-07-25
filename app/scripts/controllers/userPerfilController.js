'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:UserPerfilCtrl
 * @description
 * # UserPerfilCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('UserPerfilCtrl', function (authUser, sessionControl, $scope, $http) {
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
      id : sessionControl.get('id'),
      email : sessionControl.get('email'),
      name : sessionControl.get('name'),
      rol : sessionControl.get('rol'),
      birthday : sessionControl.get('birthday'),
      active : sessionControl.get('active'),
      plataforma : sessionControl.get('plataforma'),
      avatar : sessionControl.get('avatar')
    }

    $scope.update = function(){

       console.log(nv.user);

       $http.put('http://127.0.0.1:8000/api/user/'+nv.user.id, nv.user);
    }


  })

 