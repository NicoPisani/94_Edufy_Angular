'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:UserPerfilCtrl
 * @description
 * # UserPerfilCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('UserPerfilCtrl', function (GLOBAL, authUser, sessionControl, $scope, $http, toastr) {
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
      pass : sessionControl.get('pass'),
      rol : sessionControl.get('rol'),
      birthday : sessionControl.get('birthday'),
      active : sessionControl.get('active'),
      plataforma : sessionControl.get('plataforma'),
      avatar : sessionControl.get('avatar')
    }

    $scope.update = function(){
      $http({
        url: GLOBAL.URL_API+"user/"+ nv.user.id,
        method: "PUT",
        data:  nv.user,
        /*headers: {'Content-Type': 'application/x-www-form-urlencoded'}*/
      }).then(
        function (respuesta){
          toastr.success('Datos actualizados!', 'Mensaje');
        },
        function (error) {
           toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
       });
    }

    $scope.changeNewPass = function (_oldpass, _newpass, _repass){
      if(_newpass === _repass && _oldpass === nv.user.pass){
        console.log(_oldpass+' -> '+_newpass)
        $http({
          url: GLOBAL.URL_API+'user/'+nv.user.id,
          method: 'PUT',
          data: {password: _newpass}
        }).then(
          function (respuesta){
            toastr.success('Datos actualizados!', 'Mensaje');
          },
          function (error) {
             toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
         });
      }
    }




  })

 