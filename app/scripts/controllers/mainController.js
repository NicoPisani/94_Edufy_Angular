'use strict';

angular.module('yeomanApp')
  .controller('MainCtrl', function (GLOBAL, $http, $scope, $routeParams) {
    
    $scope.global = GLOBAL;

    var nv = this;

    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
    nv.footerTemplate = {
      url : 'views/footer/footer.html'
    },

   //nv.Curso = $resource($scope.global.URL_API+"curso/:id", {id: "@id"});
   //$scope.cursos = nv.Curso.query(); // query() -> GET /post -> devuelve un arraglo de post

   $http({
        url: GLOBAL.URL_API+"curso/",
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
    })   
    .then(
     function (response) {
       $scope.cursos = response.data;
     },
     function (error) {
         console.log('error')
     });

  })
