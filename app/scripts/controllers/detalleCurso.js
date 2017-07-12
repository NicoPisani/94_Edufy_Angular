'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:DetalleCursoCtrl
 * @description
 * # DetalleCursoCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('DetalleCursoCtrl', function () {
    var nv = this;
    var fo = this;
    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
     fo.footerTemplate = {
      url : 'views/footer/footer.html'
    }
  });