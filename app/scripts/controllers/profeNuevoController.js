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

    nv.curso = {
      nombre : '',
      descripcion : '',
      precio : '',
      horas : '',
      tema_1 : '',
      tema_2 : '',
      tema_3 : '',
      imagen : '',
      detalle : '',
      estado : ''
    }

  /*------------------------------------*/

    if($routeParams.id){

        $scope.titulo = 'EDITAR CURSO';

        $http.get(GLOBAL.URL_API+"curso/"+$routeParams.id)    
        .then(
           function (response) {
             $scope.curso = response.data;
             $scope.thumbnail = { dataUrl: response.data.imagen };
           },
           function (error) {
             if(error.data.error === 'token_not_provided') {
               console.log('error')
             }
           });

    }else{

        $scope.titulo = 'NUEVO CURSO'; 
        $scope.thumbnail = { dataUrl: '' };
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

    /*--------------------------------*/
  })

  .directive('uploaderModel', function ($parse){
    return {
      restrict : 'A',
      link: function (scope, iElement, iAttrs){
        iElement.on("change", function (e){
          $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
        });
      }
    };
  })

  .service('upload', function (GLOBAL, $http, $q, $routeParams, toastr){
    this.uploadFile = function (curso){
      var deferred = $q.defer();
      if($routeParams.id){
          console.log(curso);
          $http({
              url: GLOBAL.URL_API+"curso/" + $routeParams.id,
              method: "PUT",
              data:  curso,
              // headers: {"Content-type": undefined},
              // transformRequest: angular.identity
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

          $http({
              url: GLOBAL.URL_API+"curso/store",
              method: "POST",
              data:  curso,
              // headers: {"Content-type": undefined},
              // transformRequest: angular.identity
            }).then(
            function (respuesta){
              deferred.resolve(respuesta);
              toastr.success('Curso creado correctamente!', 'Mensaje');
            },
            function (error) {
               toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
           });
          return deferred.promise;

      }
     }
  })