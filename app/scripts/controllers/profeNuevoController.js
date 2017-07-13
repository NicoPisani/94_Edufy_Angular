'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfeNuevoCtrl
 * @description
 * # ProfeNuevoCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('ProfeNuevoCtrl', function () {

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

    //Array de Modulos
    nv.modulos = [
      {
        'titulo' : 'MÓDULO 1 - PRÁCTICAS DE LENGUAJE',
        'descripcion' : "Let's take a look at the areas you should consider for security. Attack surfaces, data transmission and storage, and more.",
        'visible' : true
      }
    ];

    var modulo = {
      'titulo' : 'MODULO',
      'descripcion' : "Let's take a look at the areas you should consider for security. Attack surfaces, data transmission and storage, and more.",
      'visible' : true
    }

    //Funciones

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


  });
