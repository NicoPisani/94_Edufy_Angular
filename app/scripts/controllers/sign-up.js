'use strict';

angular.module('yeomanApp')
  .controller('Signup', function (GLOBAL, authUser, sessionControl, $http, $scope, $location, toastr){

    var sn = this;

    var C = authUser.isLoggedIn();
    $scope.IsAuthenticated = (C||null)==null?false:true;


    sn.registerForm = {
      name: '',
      email: '',
      password: '',
      rol: 2,
      active: 1,
      history: '',
      plataforma_id: 1
    };

    sn.registrar = function (){
      $http({
        url: GLOBAL.URL_API+"auth/signup",
        method: "POST",
        data:  sn.registerForm,
        /*headers: {'Content-Type': 'application/x-www-form-urlencoded'}*/
      }).then(
        function (respuesta){
          toastr.success('Registro completado correctamente!', 'Mensaje');
          $location.path('/login');
        },
        function (error) {
           toastr.error('Algo salio mal! vuelve a intentarlo', 'Mensaje');
       });
    }

  })