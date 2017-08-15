'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfeNuevoCtrl
 * @description
 * # ProfeNuevoCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('ProfeNuevoCtrl', function (GLOBAL, authUser, sessionControl, $scope, $http, $parse, $timeout, upload, toastr) {

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

    /*$scope.insert = function(){
      console.log(nv.curso);
      $http({
        url: GLOBAL.URL_API+"curso/store",
        method: "POST",
        data:  nv.curso,
        headers: {"Content-type": undefined},
        transformRequest: angular.identity
      }).then(
        function (respuesta){
          toastr.success('Curso creado correctamente!', 'Mensaje');
        },
        function (error) {
           toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
       });
    }*/


    $scope.uploadFile = function (){

      nv.curso = {
        nombre : '',
        descripcion : '',
        precio : '',
        horas : '',
        tema_1 : '',
        tema_2 : '',
        tema_3 : '',
        imagen : $scope.file,
        detalle : '',
        estado : 'Pendiente'
      }



      upload.uploadFile(nv.curso).then(function (res){
        console.log(res);
      })
    }

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

  .service('upload', function (GLOBAL, $http, $q, toastr){
    this.uploadFile = function (curso){
      var deferred = $q.defer();
      console.log(curso);
      $http({
          url: GLOBAL.URL_API+"curso/store",
          method: "POST",
          data:  curso,
          headers: {"Content-type": undefined},
          transformRequest: angular.identity
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
  })
