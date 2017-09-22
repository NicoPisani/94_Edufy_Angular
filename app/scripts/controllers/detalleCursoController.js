'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:DetalleCursoCtrl
 * @description
 * # DetalleCursoCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
.controller('DetalleCursoCtrl', function (GLOBAL, $http, $scope, $resource, $routeParams ) {

    var nv = this;

    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
     nv.footerTemplate = {
      url : 'views/footer/footer.html'
    }

    /*------------------------------------------------------------*/

    $http.get(GLOBAL.URL_API+"curso/"+$routeParams.id)    
    .then(
     function (response) {
       $scope.curso = response.data;
        nv.User = $resource(GLOBAL.URL_API+"user-public/:id", {id: "@id"});
        $scope.user = nv.User.get({ id: $scope.curso.user_id });
     },
     function (error) {
     });

    $scope.comprar = function(_curso){
      alert("Gracias por comprar el curso -> "+_curso)
    }
})// end controller

// modulos
.controller('tabController', function ($scope, authUser) {

    var C = authUser.isLoggedIn();
    $scope.IsAuthenticated = (C||null)==null?false:true;

    $scope.IsVisible = true;
    $scope.ShowHide = function () {
        $scope.IsVisible = $scope.IsVisible ? false : true;
    };

})

//comentarios
.controller('commentController', function (GLOBAL, authUser, $http, $scope, $resource, $routeParams, sessionControl, toastr){

    var nv = this;

    var C = authUser.isLoggedIn();
    $scope.IsAuthenticated = (C||null)==null?false:true;

    $scope.comment.nombre = 'pregunta';

    if(C){
      $http.get(GLOBAL.URL_API+"faqs/"+$routeParams.id)
      .then(
       function (response) {
         $scope.comentarios = response.data;
       },
       function (error) {
       });
    }



    $scope.submit = function() {

      nv.comment = {
        'nombre': $scope.comment.nombre,
        'descripcion': $scope.comment.descripcion,
        'curso_id': $routeParams.id,
        'user_id': sessionControl.get('id')
      }

      console.log(nv.comment);
      $http({
        url: GLOBAL.URL_API+"faqs/store",
        method: "POST",
        data:  nv.comment,
      }).then(
        function (response){
          $scope.comentarios = response.data;
          $scope.comment.descripcion='';
        },
        function (error) {
           toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
       });
    };

})
