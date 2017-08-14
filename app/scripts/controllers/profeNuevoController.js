'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfeNuevoCtrl
 * @description
 * # ProfeNuevoCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('ProfeNuevoCtrl', function (GLOBAL, authUser, sessionControl, $scope, $http, $parse, toastr) {

    var nv = this;

    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
    nv.sidebarTemplate = {
      url : 'views/sidebar/sidebar-profe.html'
    },
    nv.footerTemplate = {
      url : 'views/footer/footer.html'
    }

    nv.curso = {
      nombre : '',
      descripcion : '',
      precio : '',
      horas : '',
      tema_1 : '',
      tema_2 : '',
      tema_3 : '',
      detalle : '',
      estado : 'Pendiente'
    }

    console.log(nv.curso);

    $scope.insert = function(){
      $http({
        url: GLOBAL.URL_API+"curso/store",
        method: "POST",
        data:  nv.curso
      }).then(
        function (respuesta){
          toastr.success('Curso creado correctamente!', 'Mensaje');
        },
        function (error) {
           toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
       });
    }

  })
