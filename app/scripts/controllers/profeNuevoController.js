'use strict';

/**
* @ngdoc function
* @name yeomanApp.controller:ProfeNuevoCtrl
* @description
* # ProfeNuevoCtrl
* Controller of the yeomanApp
*/
angular.module('yeomanApp')
.controller('ProfeNuevoCtrl', function (GLOBAL, authUser, sessionControl, $scope, $http, $parse, $timeout, upload, $routeParams, toastr) {

  var nv = this;

  $scope.thumbnail;

  var curso = {
    'id' : '',
    'user_id' : '',
    'nombre' : '',
    'imagen' : '',
    'horas' : '',
    'precio' : '',
    'tema_1' : '',
    'tema_2' : '',
    'tema_3' : '',
    'estado' : '',
    'detalle' : '',
    'descripcion' : '',
    modulos : []
  }

  var modulo = {
    'modulo_id' : 1,
    'curso_id': 1,
    'nombre' : '...',
    'descripcion' : '',
    'visible' : true,
    clases : []
  }

  var clase = {
    'clase_id' : 1,
    'modulo_id' : '',
    'nombre' : '...',
    'descripcion' : '',
    'visible' : true
  }

  nv.menuTemplate = {
    url : 'views/navbar/navbar.html'
  },
  nv.sidebarTemplate = {
    url : 'views/sidebar/sidebar-profe.html'
  },
  nv.footerTemplate = {
    url : 'views/footer/footer.html'
  }

  /*-------------------------------------*/

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
              //$curso.imagen = e.target.result;
            });
          }
        });
      }
    }
  };


  /*-----------------------------------*/

  $scope.uploadFile = function (curso){
    upload.uploadFile(curso);
  }

}) // End Controller

.directive('uploaderModel', function ($parse){
  return {
    restrict : 'A',
    link: function (scope, iElement, iAttrs){
      iElement.on("change", function (e){
        $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
      });
    }
  };
}) // End Directive

.service('upload', function (GLOBAL, $http, $q, $routeParams, toastr,$location){
  this.uploadFile = function (curso){
    var deferred = $q.defer();

    if($routeParams.id){
      //EDIT
      $http({
        url: GLOBAL.URL_API+"curso/" + $routeParams.id,
        method: "PUT",
        data:  curso,
      }).then(
      function (respuesta){
        deferred.resolve(respuesta);
        toastr.success('Curso actualizado correctamente!', 'Mensaje');
      },
      function (error) {
        toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
      });
      return deferred.promise;

    }else{
      //NEW

      console.log(curso);

      // $http({
      //   url: GLOBAL.URL_API+"curso/store",
      //   method: "POST",
      //   //headers: {'Content-Type': 'multipart/form-data'},
      //   data: {curso},
      // }).then(
      // function (response){
      //   deferred.resolve(response);
      //   $location.path('/panel/profesor/edit/'+response.data);
      //   toastr.success('Curso creado correctamente!', 'Mensaje');
      // },
      // function (error) {
      //   toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
      // });
      // return deferred.promise;

    }
}
}) // End Service