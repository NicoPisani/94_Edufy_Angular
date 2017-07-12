'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('MainCtrl', function () {
    var nv = this;
    var fo = this;
    nv.menuTemplate = {
      url : 'views/navbar/navbar.html'
    },
     fo.footerTemplate = {
      url : 'views/footer/footer.html'
    }
  });