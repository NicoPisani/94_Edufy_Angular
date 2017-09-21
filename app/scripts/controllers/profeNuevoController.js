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

  $scope.thumbnail = {dataUrl: ''};
  $scope.curso_id = '';
  $scope.upload='';
  nv.modulos = [];
  nv.clases = [];
  nv.curso = [];

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


  $scope.fileReaderSupported = window.FileReader != null;
  $scope.photoChanged = function(files){
    if (files != null) {
      var file = files[0];
      $scope.imagen = files[0];
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

.service('upload', function (GLOBAL, $http, $q, $routeParams, toastr, $location){
    var deferred = $q.defer();
}) // End Service