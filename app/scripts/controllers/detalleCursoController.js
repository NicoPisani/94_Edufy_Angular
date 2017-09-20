'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:DetalleCursoCtrl
 * @description
 * # DetalleCursoCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('DetalleCursoCtrl', function (GLOBAL, $http, $scope, $resource, $routeParams ) {

    var nv = this;

    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
     nv.footerTemplate = {
      url : 'views/footer/footer.html'
    }

	   //trae datos del curso
     //nv.Curso = $resource(GLOBAL.URL_API+"curso/:id", {id: "@id"});
     //$scope.curso = nv.Curso.get({id: $routeParams.id})
    /*------------------------------------------------------------*/
    $http.get(GLOBAL.URL_API+"curso/"+$routeParams.id)    
    .then(
     function (response) {
       $scope.curso = response.data;
       console.log(response.data);
        nv.User = $resource(GLOBAL.URL_API+"user-public/:id", {id: "@id"});
        $scope.user = nv.User.get({ id: $scope.curso.user_id });
     },
     function (error) {
       if(error.data.error === 'token_not_provided') {
         console.log('error')
       }
     });


    $scope.comprar = function(_curso){
      alert("Gracias por comprar el curso -> "+_curso)
    }
  })

  .controller('tabController', function ($scope) {

	 // modulos
    $scope.IsVisible = true;
    $scope.ShowHide = function () {
        $scope.IsVisible = $scope.IsVisible ? false : true;
    };

  })