'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:DetalleCursoCtrl
 * @description
 * # DetalleCursoCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('DetalleCursoCtrl', function ($scope, $resource, $routeParams) {
    var nv = this;
    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
     nv.footerTemplate = {
      url : 'views/footer/footer.html'
    }

    nv.Curso = $resource("http://localhost:8000/api/curso/:id", {id: "@id"});
    $scope.curso = nv.Curso.get({id: $routeParams.id}); // devuelve 1 ob JSON / isArray = false 

  })

  .controller('profesorCtrl', function ($scope, $resource) {
	    var nv = this;

	   nv.User = $resource("http://localhost:8000/api/user-public/:id", {id: "@id"});
	   $scope.user = nv.User.get({id: '3'});

	   console.log($scope.curso.user_id);
  })

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