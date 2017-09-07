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
            });
          }
        });
      }
    }
  };


  /*-----------------------------------*/

  $scope.uploadFile = function (){

    nv.curso = {
      nombre : $scope.nombre,
      descripcion : $scope.descripcion,
      precio : $scope.precio,
      horas : $scope.horas,
      tema_1 : $scope.tema_1,
      tema_2 : $scope.tema_2,
      tema_3 : $scope.tema_3,
      imagen : $scope.file,
      detalle : $scope.detalle,
      estado : 'Pendiente'
    }

    upload.uploadFile(nv.curso).then(function (res){
      console.log(res);
    })
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
      var nombre = curso.nombre;
      var descripcion = curso.descripcion;
      var precio = curso.precio;
      var horas = curso.horas;
      var tema_1 = curso.tema_1;
      var tema_2 = curso.tema_2;
      var tema_3 = curso.tema_3;
      var file = curso.imagen;
      var detalle = curso.detalle;
      var estado = curso.estado;

      $http({
        url: GLOBAL.URL_API+"curso/store",
        method: "POST",
        //headers: {'Content-Type': 'multipart/form-data'},
        data: { file, nombre,descripcion,precio,horas,tema_1,tema_2,tema_3,detalle,estado},
      }).then(
      function (response){
        deferred.resolve(response);
        $location.path('/panel/profesor/edit/'+response.data);
        toastr.success('Curso creado correctamente!', 'Mensaje');
      },
      function (error) {
        toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
      });
      return deferred.promise;

    }
}
}) // End Service