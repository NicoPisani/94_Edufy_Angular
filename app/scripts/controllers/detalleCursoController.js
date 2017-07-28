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
    nv.User = $resource("http://localhost:8000/api/user-public/:id", {id: "@id"});
    $scope.user = nv.User.get({id: $routeParams.id});

  });