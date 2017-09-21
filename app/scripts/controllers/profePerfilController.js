'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfePerfilCtrl
 * @description
 * # ProfePerfilCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('ProfePerfilCtrl', function (GLOBAL, authUser, sessionControl, $scope, $http, $parse, $timeout, toastr) {
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

    nv.pass = sessionControl.get('pass');
    nv.user = {
      id : sessionControl.get('id'),
      email : sessionControl.get('email'),
      name : sessionControl.get('name'),
      birthday : sessionControl.get('birthday'),
      avatar : sessionControl.get('avatar'),
      history : sessionControl.get('history')
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
          sessionControl.set('history', nv.user.history);
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
        dataUrl: nv.user.avatar
    };
    $scope.fileReaderSupported = window.FileReader != null;

    $scope.photoChanged = function(files){
        if (files != null) {
            var file = files[0];
            if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {

              //ENVIA A LA API
              $scope.formData = new FormData();
              $scope.formData.append('avatar', files[0]);
              $scope.formData.append('_method', 'PUT');
              $http({
                url: GLOBAL.URL_API+"user/"+ nv.user.id,
                method: "POST",
                data:  $scope.formData,
                headers: {'Content-Type': undefined}
              }).then(
                function (respuesta){
                  sessionControl.set('avatar', respuesta.data);
                  toastr.success('Datos actualizados!', 'Mensaje');
                },
                function (error) {
                   toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
               });

                //RENDERIZO LA IMAGEN
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