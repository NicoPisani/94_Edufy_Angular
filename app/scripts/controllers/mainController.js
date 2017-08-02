'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanApp
 */
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

   //nv.Curso = $resource($scope.global.URL_API+"curso/:id", {id: "@id"});
   //$scope.cursos = nv.Curso.query(); // query() -> GET /post -> devuelve un arraglo de post

   $http.get(GLOBAL.URL_API+"curso/")    
    .then(
     function (response) {
       $scope.cursos = response.data;
       //arreglar el $scope.cursos[0].user_id trae solo el 1º no el que corresponde a cada obj
       $http.get(GLOBAL.URL_API+"user-public/"+$scope.cursos[0].user_id)    
        .then(
         function (response2) {
           $scope.user = response2.data;
         })
     },
     function (error) {
       if(error.data.error === 'token_not_provided') {
         console.log('error')
       }
     });

  });