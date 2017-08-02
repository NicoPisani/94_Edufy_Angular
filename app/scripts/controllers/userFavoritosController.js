'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:UserFavoritosCtrl
 * @description
 * # UserFavoritosCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('UserFavoritosCtrl', function (GLOBAL, $http, $scope, $resource, sessionControl) {

    var nv = this;

    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
    nv.sidebarTemplate = {
      url : 'views/sidebar/sidebar-user.html'
    },
    nv.footerTemplate = {
      url : 'views/footer/footer.html'
    }


    $http.get(GLOBAL.URL_API+"favorito/user/" + sessionControl.get('id'))    
    .then(
     function (response) {
       $scope.favs = response.data;
        nv.User = $resource(GLOBAL.URL_API+"user-public/:id", {id: "@id"});
        $scope.user = nv.User.get({ id: $scope.favs.user_id });
     },
     function (error) {
       if(error.data.error === 'token_not_provided') {
         console.log('error')
       }
     });

  });