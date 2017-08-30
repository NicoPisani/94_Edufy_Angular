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
    //Array de Modulos
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

  //Funciones Modulos
    nv.removerModulo = function(idModulo) {
      nv.modulos.splice(idModulo, 1);
    }

    nv.setearVisible = function(idModulo) {
      nv.modulos[idModulo].visible = !nv.modulos[idModulo].visible
    }

    nv.agregarModulo = function() {
      angular.forEach(nv.modulos, function(value, key) {
        value.visible = false;
      });
      nv.modulos.push(angular.copy(modulo));

    }


    //Funciones Clases
    nv.agregarClase = function(idModulo) {
      angular.forEach(nv.modulos[idModulo].clases, function(value,key) {
        value.visible = false;
      })
      nv.modulos[idModulo].clases.push(angular.copy(clase));
    }

    nv.setearClaseVisible = function(idModulo, idClase) {
      nv.modulos[idModulo].clases[idClase].visible = !nv.modulos[idModulo].clases[idClase].visible
    }

    nv.removerClase = function(idModulo, idClase) {
      nv.modulos[idModulo].clases.splice(idClase, 1);
    }

    nv.setearClaseVisibleYAgregarOtra = function(idModulo, idClase) {
      nv.modulos[idModulo].clases[idClase].visible = !nv.modulos[idModulo].clases[idClase].visible

      nv.agregarClase(idModulo, idClase);
    }

    //Funciones de guardado
    nv.guardarModulos = function() {
        var modulos = nv.modulos;
        $http({ 
            url: GLOBAL.URL_API+"modulo/store", 
            method: "POST", 
            data:  modulos, 
          }).then( 
          function (respuesta){ 
            toastr.success('Modulos guardados correctamente!', 'Mensaje'); 
          }, 
          function (error) { 
             toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje'); 
        }); 
    } 

  }) // fin controller
 
