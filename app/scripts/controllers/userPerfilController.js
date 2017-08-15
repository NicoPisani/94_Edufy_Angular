'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:UserPerfilCtrl
 * @description
 * # UserPerfilCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('UserPerfilCtrl', function (GLOBAL, authUser, sessionControl, $scope, $http, $parse, $timeout, toastr) {
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

    nv.pass = sessionControl.get('pass');
    nv.user = {
      id : sessionControl.get('id'),
      email : sessionControl.get('email'),
      name : sessionControl.get('name'),
      birthday : sessionControl.get('birthday'),
      avatar : sessionControl.get('avatar')
    }

    $scope.update = function(){
      $http({
        url: GLOBAL.URL_API+"user/"+ nv.user.id,
        method: "PUT",
        data:  nv.user
      }).then(
        function (respuesta){
          sessionControl.set('name', nv.user.name);
          sessionControl.set('birthday', nv.user.birthday);
          sessionControl.set('avatar', nv.user.avatar);
          toastr.success('Datos actualizados!', 'Mensaje');
        },
        function (error) {
           toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
       });
    }

    $scope.changeNewPass = function (_oldpass, _newpass, _repass){
      if(_newpass === _repass && _oldpass === nv.pass){
        $http({
          url: GLOBAL.URL_API+'user/'+nv.user.id,
          method: 'PUT',
          data: {password: _newpass}
        }).then(
          function (respuesta){
            sessionControl.set('pass', _newpass);
            toastr.success('Datos actualizados!', 'Mensaje');
          },
          function (error) {
             toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
         });
      }
    }

    $scope.thumbnail = {
        dataUrl: 'none'
    };
    $scope.fileReaderSupported = window.FileReader != null;
    $scope.photoChanged = function(files){
        if (files != null) {
            var file = files[0];
            if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                $timeout(function() {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function(e) {
                        $timeout(function(){
                          $scope.thumbnail.dataUrl = e.target.result;
                        });
                    }
                });
            }
        }
    };

  })
 