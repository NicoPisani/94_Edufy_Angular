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

   // Array de Modulos
    nv.modulos = [
      {
        'curso_id': $routeParams.id,
        'titulo' : 'MÓDULO 1 - PRÁCTICAS DE LENGUAJE',
        'descripcion' : "Let's take a look at the areas you should consider for security. Attack surfaces, data transmission and storage, and more.",
        'visible' : true,
        clases : [
          {
            'titulo' : 'TITULO',
            'visible' : true
          }

        ]
      }
    ];

    var modulo = {
      'curso_id': $routeParams.id,
      'titulo' : 'MODULO',
      'descripcion' : "Let's take a look at the areas you should consider for security. Attack surfaces, data transmission and storage, and more.",
      'visible' : true,
      clases : [
        // {
        //   'titulo' : 'TITULO',
        //   'visible' : true
        // }
      ]
    }
    var clase = {
      'titulo' : 'TITULO',
      'visible' : true
    }

  //Funciones
   // Modulos
    nv.removerModulo = function(idModulo) {
      nv.modulos.splice(idModulo, 1);
    }

    nv.setearVisible = function(idModulo) {
      nv.modulos[idModulo].visible = !nv.modulos[idModulo].visible;
    }

    nv.agregarModulo = function() {
      angular.forEach(nv.modulos, function(value, key) {
        value.visible = false;
      });
      nv.modulos.push(angular.copy(modulo));

    }


   // Clases
    nv.agregarClase = function(idModulo) {
      angular.forEach(nv.modulos[idModulo].clases, function(value,key) {
        value.visible = false;
      })
      nv.modulos[idModulo].clases.push(angular.copy(clase));
    }

    nv.setearClaseVisible = function(idModulo, idClase) {
      nv.modulos[idModulo].clases[idClase].visible = !nv.modulos[idModulo].clases[idClase].visible;
      
      var curso_id = nv.modulos[0].curso_id;
      var titulo = nv.modulos[0].titulo;
      var descripcion = nv.modulos[0].descripcion;
      $http({
            url: GLOBAL.URL_API+"modulo/store",
            method: "POST",
            data:  {curso_id,titulo,descripcion},
             //headers: {"Content-type": undefined},
             //transformRequest: angular.identity
          }).then(
          function (response){
            nv.modulo_id = response.data;
            toastr.success('Modulo creado correctamente!', 'Mensaje');
            /*-----------------------------*/
            var titulo = nv.modulos[0].clases[0].titulo;
            var modulo_id = nv.modulo_id;
            var descripcion = '';
            $http({
                url: GLOBAL.URL_API+"clase/store",
                method: "POST",
                data:  {modulo_id,titulo,descripcion},
                 //headers: {"Content-type": undefined},
                 //transformRequest: angular.identity
              }).then(
              function (respuesta){
                toastr.success('Clase creada correctamente!', 'Mensaje');
              },
              function (error) {
                 toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
             });
              /*-----------------------------*/
          },
          function (error) {
             toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
         });
 
     /* $http({
            url: GLOBAL.URL_API+"clase/store",
            method: "POST",
            data:  {modulo_id,titulo},
             //headers: {"Content-type": undefined},
             //transformRequest: angular.identity
          }).then(
          function (respuesta){
            toastr.success('Clase creada correctamente!', 'Mensaje');
          },
          function (error) {
             toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
         });*/
    }

    nv.removerModulo = function(idModulo, idClase) {
      nv.modulos[idModulo].clases.splice(idModulo, 1);
    }

    nv.setearClaseVisibleYAgregarOtra = function(idModulo, idClase) {
      nv.modulos[idModulo].clases[idClase].visible = !nv.modulos[idModulo].clases[idClase].visible

      nv.agregarClase(idModulo, idClase);
    }

    /*------------------------------------------*/
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
              // headers: {"Content-type": undefined},
              //transformRequest: angular.identity
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