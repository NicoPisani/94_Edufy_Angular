'use strict';
/**
 * @ngdoc function
 * @name yeomanApp.controller:tabController
 * @description
 * # tabController
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
    .controller('tabController', function ($scope) {

        $scope.IsVisible = true;
        $scope.ShowHide = function () {
            $scope.IsVisible = $scope.IsVisible ? false : true;
        };

	    //Array de Modulos
	    $scope.modulos = [
	      {
	        'titulo' : 'MÓDULO 1 - PRÁCTICAS DE LENGUAJE',
	        'descripcion' : "Let's take a look at the areas you should consider for security. Attack surfaces, data transmission and storage, and more.",
	        'visible' : true,
	        clases : [
	           {
	            'titulo' : 'CLASE 1: INTRODUCCIÓN A LA ORATORIA',
	            'visible' : true
	          },
	          {
	            'titulo' : 'CLASE 2: INTRODUCCIÓN A LA ORATORIA',
	            'visible' : true
	          }

	        ]
	      },
	      {
	        'titulo' : 'MÓDULO 2 - PRÁCTICAS DE LENGUAJE',
	        'descripcion' : "Let's take a look at the areas you should consider for security. Attack surfaces, data transmission and storage, and more.",
	        'visible' : true,
	        clases : [
	           {
	            'titulo' : 'CLASE 1: INTRODUCCIÓN A LA ORATORIA',
	            'visible' : true
	          },
	          {
	            'titulo' : 'CLASE 2: INTRODUCCIÓN A LA ORATORIA',
	            'visible' : true
	          }

	        ]
	      },
	      {
	        'titulo' : 'MÓDULO 3 - PRÁCTICAS DE LENGUAJE',
	        'descripcion' : "Let's take a look at the areas you should consider for security. Attack surfaces, data transmission and storage, and more.",
	        'visible' : true,
	        clases : [
	           {
	            'titulo' : 'CLASE 1: INTRODUCCIÓN A LA ORATORIA',
	            'visible' : true
	          },
	           {
	            'titulo' : 'CLASE 2: INTRODUCCIÓN A LA ORATORIA',
	            'visible' : true
	          }

	        ]
	      }
	    ];
   });