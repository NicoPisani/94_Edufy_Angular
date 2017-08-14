'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfePerfilCtrl
 * @description
 * # ProfePerfilCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('ProfePerfilCtrl', function (GLOBAL, authUser, sessionControl, $scope, $http, $parse, toastr) {
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

  })

  .controller('UploadController', function ($scope, fileReader) {
      $scope.getFile = function () {
          $scope.progress = 0;
          fileReader.readAsDataUrl($scope.file, $scope)
          .then(function(result) {
              $scope.imageSrc = result;
          });
      };
   
      $scope.$on("fileProgress", function(e, progress) {
          $scope.progress = progress.loaded / progress.total;
      });
  })

  .directive("ngFileSelect",function(){
    return {
      link: function($scope,el){
        el.bind("change", function(e){
          $scope.file = (e.srcElement || e.target).files[0];
          $scope.getFile();
        })
      }
    }  
  })