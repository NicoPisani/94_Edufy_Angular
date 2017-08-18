'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:ProfeCursosCtrl
 * @description
 * # ProfeCursosCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('ProfeCursosCtrl', function (GLOBAL, $http, $scope, $resource, sessionControl) {
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

    $http.get(GLOBAL.URL_API+"curso/profe/" + sessionControl.get('id'))    
    .then(
     function (response) {
       $scope.cursos = response.data;
     },
     function (error) {
       if(error.data.error === 'token_not_provided') {
         console.log('error')
       }
     });

  })