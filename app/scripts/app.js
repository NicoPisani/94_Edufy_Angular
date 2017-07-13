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
    'authService',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'toastr'
  ])
  .config(function ($routeProvider, $locationProvider, $authProvider) {
    $locationProvider.hashPrefix('');
    $authProvider.loginUrl = "http://127.0.0.1:8000/api/auth/login";
    $routeProvider
      
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/detalle-curso', {
        templateUrl: 'views/detalle-curso.html',
        controller: 'DetalleCursoCtrl',
        controllerAs: 'detalleCurso'
      })//------------------------------------------------------------
      .when('/panel/user/perfil', {
        templateUrl: 'views/users/user-perfil.html',
        controller: 'UserPerfilCtrl',
        controllerAs: 'UserPerfil'
      })
      .when('/panel/user/favoritos', {
        templateUrl: 'views/users/user-favoritos.html',
        controller: 'UserFavoritosCtrl',
        controllerAs: 'UserFavoritos'
      })
      .when('/panel/user/pagos', {
        templateUrl: 'views/users/user-pagos.html',
        controller: 'UserPagosCtrl',
        controllerAs: 'UserPagos'
      })
      .when('/panel/user/cursos', {
        templateUrl: 'views/users/user-cursos.html',
        controller: 'UserCursosCtrl',
        controllerAs: 'UserCursos'
      })//------------------------------------------------------------
       .when('/panel/profesor/cursos', {
        templateUrl: 'views/profes/profe-cursos.html',
        controller: 'ProfeCursosCtrl',
        controllerAs: 'ProfeCursos'
      })
       .when('/panel/profesor/perfil', {
        templateUrl: 'views/profes/profe-perfil.html',
        controller: 'ProfePerfilCtrl',
        controllerAs: 'ProfePerfil'
      })
       .when('/panel/profesor/nuevo', {
        templateUrl: 'views/profes/profe-nuevo.html',
        controller: 'ProfeNuevoCtrl',
        controllerAs: 'ProfeNuevo'
      })
       .when('/panel/profesor/archivos', {
        templateUrl: 'views/profes/profe-archivos.html',
        controller: 'ProfeArchivosCtrl',
        controllerAs: 'ProfeArchivos'
      })//------------------------------------------------------------
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run( function($rootScope, $location, authUser, toastr) {
    var rutasPrivadas = ['/detalle-curso','/about'];
    $rootScope.$on('$routeChangeStart', function() {
        if(($.inArray($location.path(), rutasPrivadas) !== -1) && !authUser.isLoggedIn()){
          toastr.error('Debe iniciar sesión para poder continuar', 'Mensaje');
          $location.path('/login');
        }
    });
  });
