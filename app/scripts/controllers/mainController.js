'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('MainCtrl', function ($scope, $resource, $auth, sessionControl,) {
    var nv = this;

    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
    nv.footerTemplate = {
      url : 'views/footer/footer.html'
    },

   nv.Curso = $resource("http://localhost:8000/api/curso/:id", {id: "@id"});
   //nv.User = $resource("http://localhost:8000/api/user/:id", {id: "@id"});
   $scope.cursos = nv.Curso.query(); // query() -> GET /post -> devuelve un arraglo de post
   //$scope.users = nv.User.query(); // query() -> GET /post -> devuelve un arraglo de post

  });