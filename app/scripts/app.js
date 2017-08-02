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

  .constant('GLOBAL',{
    URL_API: 'http://localhost:8000/api/'
  })

  .constant('ROLES', {
    ADMIN: {
      ROL: 4,
      PATH: "admin"
    },
     PROFE: {
      ROL: 3,
      PATH: "profes"
    },
    USER: {
      ROL: 2,
      PATH: "users"
    },
    GUEST: {
      ROL: 1,
      PATH: ""
    }
  })

  .config(function ($routeProvider, ROLES, $locationProvider, $authProvider) {
    $locationProvider.hashPrefix('');
    $authProvider.loginUrl = "http://127.0.0.1:8000/api/auth/login";
    $routeProvider

      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/detalle/curso/:id', {
        templateUrl: 'views/detalle-curso.html',
        controller: 'DetalleCursoCtrl',
        controllerAs: 'detalleCurso'
      })//------------------------------------------------------------
      .when('/panel/user/perfil', {
        templateUrl: 'views/'+ROLES.USER.PATH+'/user-perfil.html',
        controller: 'UserPerfilCtrl',
        controllerAs: 'UserPerfil',
        authorized: ROLES.USER.ROL
      })
      .when('/panel/user/favoritos', {
        templateUrl: 'views/'+ROLES.USER.PATH+'/user-favoritos.html',
        controller: 'UserFavoritosCtrl',
        controllerAs: 'UserFavoritos',
        authorized: ROLES.USER.ROL
      })
      .when('/panel/user/pagos', {
        templateUrl: 'views/'+ROLES.USER.PATH+'/user-pagos.html',
        controller: 'UserPagosCtrl',
        controllerAs: 'UserPagos',
        authorized: ROLES.USER.ROL
      })
      .when('/panel/user/cursos', {
        templateUrl: 'views/'+ROLES.USER.PATH+'/user-cursos.html',
        controller: 'UserCursosCtrl',
        controllerAs: 'UserCursos',
        authorized: ROLES.USER.ROL
      })
      .when('/panel/user/play-curso', {
        templateUrl: 'views/'+ROLES.USER.PATH+'/user-play-curso.html',
        controller: 'UserPlayCursoCtrl',
        controllerAs: 'UserPlayCurso',
        authorized: ROLES.USER.ROL
      })

      //------------------------------------------------------------
       .when('/panel/profesor/cursos', {
        templateUrl: 'views/'+ROLES.PROFE.PATH+'/profe-cursos.html',
        controller: 'ProfeCursosCtrl',
        controllerAs: 'ProfeCursos',
        authorized: ROLES.PROFE.ROL
      })
       .when('/panel/profesor/perfil', {
        templateUrl: 'views/'+ROLES.PROFE.PATH+'/profe-perfil.html',
        controller: 'ProfePerfilCtrl',
        controllerAs: 'ProfePerfil',
        authorized: ROLES.PROFE.ROL
      })
       .when('/panel/profesor/nuevo', {
        templateUrl:'views/'+ROLES.PROFE.PATH+'/profe-nuevo.html',
        controller: 'ProfeNuevoCtrl',
        controllerAs: 'ProfeNuevo',
        authorized: ROLES.PROFE.ROL
      })
       .when('/panel/profesor/pagos', {
        templateUrl: 'views/'+ROLES.PROFE.PATH+'/profe-pagos.html',
        controller: 'ProfePagosCtrl',
        controllerAs: 'ProfePagos',
        authorized: ROLES.PROFE.ROL
      })
       .when('/panel/profesor/archivos', {
        templateUrl: 'views/'+ROLES.PROFE.PATH+'/profe-archivos.html',
        controller: 'ProfeArchivosCtrl',
        controllerAs: 'ProfeArchivos',
        authorized: ROLES.PROFE.ROL
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

  .run( function ($rootScope, $location, authUser, toastr) {

    var rutasPrivadas = [
      '/panel/user/perfil',
      '/panel/user/favoritos',
      '/panel/user/pagos',
      '/panel/user/cursos',
      '/panel/user/play-curso',
      '/panel/profesor/cursos',
      '/panel/profesor/perfil',
      '/panel/profesor/nuevo',
      '/panel/profesor/archivos'
      ];
    $rootScope.$on('$routeChangeStart', function(event, next){
      if(($.inArray($location.path(), rutasPrivadas) !== -1) && !authUser.isLoggedIn()){
        toastr.error('Debe iniciar sesión para poder continuar', 'Mensaje');
        $location.path('/login');
      }

      if(next.authorized !== undefined){
        if(next.authorized == authUser.getRol()){
          //ingreso permitido
        }else{
          toastr.error('No tienes permitido ingresar a esa pagina ', 'Mensaje');
          $location.path('/');
        }
      }
  
    });
  });
