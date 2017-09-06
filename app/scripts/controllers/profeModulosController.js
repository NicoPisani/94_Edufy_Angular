'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfeModulos
 * @description
 * # ProfeModulos
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('ProfeModulos', function (GLOBAL, authUser, sessionControl, $scope, $http, $parse, $routeParams, toastr) {

    var nv = this;

    var modulo = {
      'modulo_id' : 1,
      'curso_id': $routeParams.id,
      'titulo' : '...',
      'descripcion' : '',
      'visible' : true,
      clases : []
    }

    var clase = {
      'clase_id' : 1,
      'modulo_id' : '',
      'nombre_clase' : '...',
      'descripcion_clase' : '',
      'visible' : true
    }

/*---------------------------------------------------------*/


  //Funciones Modulos
    nv.removerModulo = function(idModulo) {
      nv.modulos.splice(idModulo, 1);
    }

    nv.setearVisible = function(idModulo) {
      nv.modulos[idModulo].visible = !nv.modulos[idModulo].visible
    }

    nv.agregarModulo = function() {
      var modulos = nv.modulos;
      $http({ 
          url: GLOBAL.URL_API+"modulo/store", 
          method: "POST", 
          data:  modulos, 
        }).then( 
            function (respuesta){ 

              angular.forEach(nv.modulos, function(value, key) {
                value.modulo_id = respuesta.data;
                value.visible = true;
              });

            }, 
            function (error) { 
               toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje'); 
          }); 
          nv.modulos.push(angular.copy(modulo));
    }


    //Funciones Clases
    nv.agregarClase = function(idModulo, idModuloDB) {

      //Actualizo el modulo en cada alta de clase
      var modulos = nv.modulos;
      console.log(modulos);
      $http({ 
          url: GLOBAL.URL_API+"modulo/"+idModulo, 
          method: "PUT", 
          data:  modulos, 
        }).then( 
        function (respuesta){ 
          //toastr.success('Modulos Actualizado', 'Mensaje'); 
        }, 
        function (error) { 
          toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje'); 
      }); 


      //Alta de clase
       $http({ 
          url: GLOBAL.URL_API+"clase/store", 
          method: "POST", 
          data:  {clase, idModuloDB} 
        }).then( 
        function (respuesta){ 
          var res = respuesta.data.split(";");
          angular.forEach(nv.modulos[idModulo].clases, function(value,key) {
            value.clase_id = res[0];
            value.modulo_id = res[1];
            value.visible = true;
          })

        }, 
        function (error) { 
           toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje'); 
      }); 

      nv.modulos[idModulo].clases.push(angular.copy(clase));
    }

    nv.setearClaseVisible = function(idModulo, idClase, nombre_clase, descripcion_clase) {
      //Alta de clase
      console.log(descripcion_clase);
       $http({ 
          url: GLOBAL.URL_API+"clase/"+idClase, 
          method: "PUT", 
          data:  {idClase, idModulo, nombre_clase, descripcion_clase} 
        }).then( 
        function (respuesta){ 
          toastr.success('Clase guardada', 'Mensaje');
        }, 
        function (error) { 
           toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje'); 
      }); 

      //nv.modulos[idModulo].clases[idClase].visible = !nv.modulos[idModulo].clases[idClase].visible
    }

    nv.removerClase = function(idModulo, idClase) {
      nv.modulos[idModulo].clases.splice(idClase, 1);
    }

    nv.setearClaseVisibleYAgregarOtra = function(idModulo, idClase) {
      nv.modulos[idModulo].clases[idClase].visible = !nv.modulos[idModulo].clases[idClase].visible

      nv.agregarClase(idModulo, idClase);
    }

/*---------------------------------------------------------*/

    if($routeParams.id){
      //Edit Curso
      $scope.curso_id = $routeParams.id;
      $http.get(GLOBAL.URL_API+"modulo/clase/"+$routeParams.id)    
        .then(
          function (response) {

              $scope.modulo = [];
              $scope.clase = [];
              $scope.xx = 0;
              nv.modulos = [];
              nv.clase = [];
              angular.forEach(response.data, function(value, key) {

                //Modulos
                $scope.modulo = {
                  'curso_id'  : value.curso_id,
                  'modulo_id' : value.modulo_id,
                  'titulo' : value.titulo,
                  'descripcion' : value.desc,
                  'visible'  : true,
                  clases : []
                }
                //Clases
                if(value.nombre){  
                  $scope.clase = {
                    'clase_id' : value.id,
                    'modulo_id' : value.modulo_id,
                    'nombre_clase' : value.nombre,
                    'descripcion_clase' : value.descripcion,
                    'visible' : true
                  }
                  $scope.modulo.clases.push(angular.copy($scope.clase));
                }

                if($scope.xx != value.modulo_id){
                  nv.modulos.push(angular.copy($scope.modulo));
                }
                $scope.xx = value.modulo_id;

              }, $scope.modulo);

              //$scope.thumbnail = { dataUrl: response.data.imagen };
          },
          function (error) {
              $scope.curso_id = '';
              nv.modulos = [];
              nv.clase = [];
          });

    }else{
        // New Curso
       $scope.curso_id = '';
        nv.modulos = [];
        nv.clase = [];
    }

}) // fin controller
 
