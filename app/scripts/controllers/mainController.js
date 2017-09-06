'use strict';

angular.module('yeomanApp')
  .controller('MainCtrl', function (GLOBAL, $http, $scope, $resource, $routeParams) {
    
    $scope.global = GLOBAL;

    var nv = this;

    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
    nv.footerTemplate = {
      url : 'views/footer/footer.html'
    },

    nv.Curso = $resource($scope.global.URL_API+"curso/");
    $scope.cursos = nv.Curso.query(); // query() -> GET /post -> devuelve un arraglo de post

  })
