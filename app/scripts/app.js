'use strict';

/**
 * @ngdoc overview
 * @name yeomanApp
 * @description
 * # yeomanApp
 *
 * Main module of the application.
 */
angular
  .module('yeomanApp', [
    //'authService',
    'navbar',
    'header',
    'sectionCursos',
    'sectionFuncionamiento',
    'footer',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer'
  ])
  .config(function ($routeProvider, $authProvider) {
  //.config(function ($routeProvider, $locationProvider) {
  //  $locationProvider.hashPrefix(''); //Arreglo el codigo de la URL por la version de Angular
    $authProvider.loginUrl = "http://127.0.0.1:8000/api/auth/login";
    $routeProvider
      
      .when('/detalle-curso', {
        templateUrl: 'views/detalle-curso.html',
        controller: 'DetalleCursoCtrl',
        controllerAs: 'DetalleCurso'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
