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
  .constant('CONFIG',{
    TEMPLATE_DIR: "views/",
    ROL_CURRENT_USER: 1
  })
  .constant('ROLES', {
    ADMIN: {
      ROL: 4,
      PATH: "/admin"
    },
     PROFE: {
      ROL: 3,
      PATH: "/profe"
    },
    USER: {
      ROL:2,
      PATH: "/user"
    },
    GUEST: {
      ROL: 1,
      PATH: ""
    }
  })
  .config(function ($routeProvider, CONFIG, ROLES, $locationProvider, $authProvider) {
    $locationProvider.hashPrefix('');
    $authProvider.loginUrl = "http://127.0.0.1:8000/api/auth/login";
    $routeProvider

      .when('/', {
        templateUrl: CONFIG.TEMPLATE_DIR+'main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/detalle/curso', {
        templateUrl: CONFIG.TEMPLATE_DIR+'detalle-curso.html',
        controller: 'DetalleCursoCtrl',
        controllerAs: 'detalleCurso'
      })//------------------------------------------------------------
      .when('/panel/user/perfil', {
        templateUrl: CONFIG.TEMPLATE_DIR+'/users/user-perfil.html',
        controller: 'UserPerfilCtrl',
        controllerAs: 'UserPerfil',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.USER.ROL]
        }
      })
      .when('/panel/user/favoritos', {
        templateUrl: CONFIG.TEMPLATE_DIR+'/users/user-favoritos.html',
        controller: 'UserFavoritosCtrl',
        controllerAs: 'UserFavoritos',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.USER.ROL]
        }
      })
      .when('/panel/user/pagos', {
        templateUrl: CONFIG.TEMPLATE_DIR+'/users/user-pagos.html',
        controller: 'UserPagosCtrl',
        controllerAs: 'UserPagos',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.USER.ROL]
        }
      })
      .when('/panel/user/cursos', {
        templateUrl: CONFIG.TEMPLATE_DIR+'/users/user-cursos.html',
        controller: 'UserCursosCtrl',
        controllerAs: 'UserCursos',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.USER.ROL]
        }
      })
      .when('/panel/user/play-curso', {
        templateUrl: CONFIG.TEMPLATE_DIR+'/users/user-play-curso.html',
        controller: 'UserPlayCursoCtrl',
        controllerAs: 'UserPlayCurso',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.USER.ROL]
        }
      })

      //------------------------------------------------------------
       .when('/panel/profesor/cursos', {
        templateUrl: CONFIG.TEMPLATE_DIR+'/profes/profe-cursos.html',
        controller: 'ProfeCursosCtrl',
        controllerAs: 'ProfeCursos',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.PROFE.ROL]
        }
      })
       .when('/panel/profesor/perfil', {
        templateUrl: CONFIG.TEMPLATE_DIR+'/profes/profe-perfil.html',
        controller: 'ProfePerfilCtrl',
        controllerAs: 'ProfePerfil',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.PROFE.ROL]
        }
      })
       .when('/panel/profesor/nuevo', {
        templateUrl: CONFIG.TEMPLATE_DIR+'/profes/profe-nuevo.html',
        controller: 'ProfeNuevoCtrl',
        controllerAs: 'ProfeNuevo',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.PROFE.ROL]
        }
      })
       .when('/panel/profesor/pagos', {
        templateUrl: CONFIG.TEMPLATE_DIR+'/profes/profe-pagos.html',
        controller: 'ProfePagosCtrl',
        controllerAs: 'ProfePagos',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.PROFE.ROL]
        }
      })
       .when('/panel/profesor/archivos', {
        templateUrl: CONFIG.TEMPLATE_DIR+'/profes/profe-archivos.html',
        controller: 'ProfeArchivosCtrl',
        controllerAs: 'ProfeArchivos',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.PROFE.ROL]
        }
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
  .run( function($rootScope, $location, authUser, toastr, CONFIG, ROLES) {
    var rutasPrivadas = [
      '/panel/user/perfil',
      '/panel/user/favoritos',
      '/panel/user/pagos',
      '/panel/user/cursos',
      '/panel/profesor/cursos',
      '/panel/profesor/perfil',
      '/panel/profesor/nuevo',
      '/panel/profesor/archivos',
      '/panel/user/play-curso'
      ];
    $rootScope.$on('$routeChangeStart', function(event, next){
      if(($.inArray($location.path(), rutasPrivadas) !== -1) && !authUser.isLoggedIn()){
        toastr.error('Debe iniciar sesión para poder continuar', 'Mensaje');
        $location.path('/login');
      }
      if(next.data !== undefined){
        if(next.data.authorized.indexOf(CONFIG.ROL_CURRENT_USER) !== -1){
          CONFIG.ROL_CURRENT_USER=authUser.getRol();
          console.log(CONFIG.ROL_CURRENT_USER);
        }/*else{
          if(CONFIG.ROL_CURRENT_USER == 4){
            $location.path(ROLES.ADMIN.PATH); 
          }else if(CONFIG.ROL_CURRENT_USER == 3){
            $location.path(ROLES.PROFE.PATH);
          }else if(CONFIG.ROL_CURRENT_USER == 2){
              $location.path(ROLES.USER.PATH);
          }else if(CONFIG.ROL_CURRENT_USER == 1){
              $location.path(ROLES.GUEST.PATH);
          }
        }*/
      }
    });
  });
