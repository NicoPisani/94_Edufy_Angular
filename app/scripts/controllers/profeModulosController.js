'use strict';

/**
* @ngdoc function
* @name yeomanApp.controller:ProfeModulos
* @description
* # ProfeModulos
* Controller of the yeomanApp
*/
angular.module('yeomanApp')
.controller('ProfeModulos', function (GLOBAL, authUser, sessionControl, $scope, $http, $parse, $routeParams, toastr) {

  var nv = this;

  $scope.upload='';

  var curso = {
    'id' : '',
    'user_id' : '',
    'nombre' : '',
    'imagen' : '',
    'horas' : '',
    'precio' : '',
    'tema_1' : '',
    'tema_2' : '',
    'tema_3' : '',
    'estado' : '',
    'detalle' : '',
    'descripcion' : '',
    modulos : []
  }

  var modulo = {
    'modulo_id' : 1,
    'curso_id': $routeParams.id,
    'nombre' : '...',
    'descripcion' : '',
    'visible' : true,
    clases : []
  }

  var clase = {
    'clase_id' : 1,
    'modulo_id' : '',
    'nombre' : '...',
    'descripcion' : '',
    'visible' : true
  }


/*---------------------------------------------------------*/

  if($routeParams.id){

    $scope.titulo = 'EDITAR CURSO';
    $scope.curso_id = $routeParams.id;
    $http.get(GLOBAL.URL_API+"curso/"+$routeParams.id)    
    .then(
      function (response) {
        nv.curso = response.data;
        nv.modulos = response.data.modulos;
      },
      function (error) {
        $scope.curso_id = '';
        nv.modulos = [];
        nv.clases = [];
      });

  }else{

    $scope.titulo = 'NUEVO CURSO'; 
    $scope.thumbnail = {dataUrl: ''};
    $scope.curso_id = '';
    nv.modulos = [];
    nv.clases = [];
    
  }

/*---------------------------------------------------------*/


  //Funciones Modulos
  nv.removerModulo = function(idModulo) {
    nv.modulos.splice(idModulo, 1);
  }

  nv.setearVisible = function(idModulo) {
    nv.modulos[idModulo].visible = !nv.modulos[idModulo].visible
  }

  nv.agregarModulo = function() {
    angular.forEach(nv.modulos, function(value,key) {
      value.visible = false;
    })
	// console.log(modulo);
    // nv.modulos.push(angular.copy(modulo));
    nv.modulos.push(modulo);
  }

/*---------------------------------------------------------*/

  //Funciones Clases
  nv.agregarClase = function(idModulo, idModuloDB) {
    angular.forEach(nv.modulos[idModulo].clases, function(value,key) {
      value.visible = false;
    })
    nv.modulos[idModulo].clases.push(angular.copy(clase));
  }

  nv.setearClaseVisible = function(idModulo, idClase, nombre_clase, descripcion_clase) {
	  if( nv.modulos[idModulo] !== undefined ) { nv.modulos[idModulo].clases[idClase].visible = !nv.modulos[idModulo].clases[idClase].visible; }
  }

  nv.removerClase = function(idModulo, idClase) {
    nv.modulos[idModulo].clases.splice(idClase, 1);
  }

  nv.setearClaseVisibleYAgregarOtra = function(idModulo, idClase) {
    nv.modulos[idModulo].clases[idClase].visible = !nv.modulos[idModulo].clases[idClase].visible
    nv.agregarClase(idModulo, idClase);
  }

/*---------------------------------------------------------*/

  $scope.submit = function() {

     //ENVIA A LA API
      //$scope.formData = new FormData();
      //$scope.formData.append('curso',  $scope.curso);
      //$scope.formData.append('imagen',  file[0]);
	if ($scope.curso.id !== undefined) {
		$http({
			url: GLOBAL.URL_API+"curso/store",
			method: "POST",
			data:   $scope.curso,
			headers: {'Content-Type': 'Application/json'}
		}).then({
			function (respuesta) {
				toastr.success('Datos actualizados!', 'Mensaje');
			},
			function (error) {
				toastr.error('Algo salio mal.', 'Mensaje');
			}
		});
	} else {
      $http({
        //url: GLOBAL.URL_API+"curso/" + $routeParams.id,
        url: GLOBAL.URL_API+"curso/store",
        method: "POST",
        data:   $scope.curso,
        // headers: {'Content-Type': undefined}
        headers: { 'Content-Type': 'Application/json' }
      }).then(
        function (respuesta){
          toastr.success('Datos actualizados!', 'Mensaje');
        },
        function (error) {
           toastr.error('Algo salio mal, vuelve a intentarlo', 'Mensaje');
       });
	}
  };

}) // fin controller
