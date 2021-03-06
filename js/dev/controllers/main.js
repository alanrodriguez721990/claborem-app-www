'use strict';

angular.module('myApp.main', [])
    .controller('mainCtrl',
        ['$scope', '$rootScope', '$window', 'ApiHttpSrv', 'ConfigSrv', '$location', 'AuthSrv', 'RedirectSrv',
        function($scope, $rootScope, $window, ApiHttpSrv, ConfigSrv, $location, AuthSrv, RedirectSrv) {

    // Evento Apache Cordova / Phonegap
    document.addEventListener("deviceready", onDeviceReady, false);

    if (AuthSrv.initialState() || !AuthSrv.authorized()) {
        $location.path("/login");
    }else{
        $rootScope.updateHome = true; // inicialmente debo actualizar la home
        RedirectSrv.redirect('/');
    }

    $rootScope.logout = function () {
        AuthSrv.logout();
        $rootScope.data = null;
        $rootScope.plantas = null;
        $rootScope.currentId = null;
        $rootScope.plant = null;
        $rootScope.collections = {};
    }
    $rootScope.changePlant = function(id){
        $rootScope.currentId = id;
        $rootScope.plant = $rootScope.plantas[id];
        $rootScope.collections = {}; // destruyo las colecciones (para prevenir errores con back button)
        RedirectSrv.redirect('/');
    }

    $scope.goToContratos = function(){
        RedirectSrv.redirect('/contratos');
    }

    $scope.goToContratoPage = function(id){
        RedirectSrv.redirect('/contrato/' + $rootScope.plant.id + '/' + id);
    }

    $scope.goToContratistas = function(){
        RedirectSrv.redirect('/contratistas');
    }

    $scope.goToContratistaPage = function(id){
        RedirectSrv.redirect('/contratista/' + $rootScope.plant.id + '/' + id);
    }

    $scope.goToPersonal = function(){
        RedirectSrv.redirect('/personal');
    }

    $scope.goToEmpleadoPage = function(id){
        RedirectSrv.redirect('/empleado/' + $rootScope.plant.id + '/' + id);
    }

    $scope.goToMaquinarias = function(){
        RedirectSrv.redirect('/maquinarias');
    }

    $scope.goToMaquinariaPage = function(id){
        RedirectSrv.redirect('/maquinaria/' + $rootScope.plant.id + '/' + id);
    }

    $scope.goToVehiculos = function(){
        RedirectSrv.redirect('/vehiculos');
    }

    $scope.goToVehiculoPage = function(id){
        RedirectSrv.redirect('/vehiculo/' + $rootScope.plant.id + '/' + id);
    }

    $scope.goToReportes = function(){
        RedirectSrv.redirect('/reportes');
    }

    $rootScope.goBack = function(){
        $window.history.back();
    }

    $rootScope.goToHome = function(){
        // $rootScope.updateHome = true;  // si aprieto inicio actualiza la home
        RedirectSrv.redirect('/');
    }

    $rootScope.open = function(link){
        $window.open(link, '_blank');
    }

    $scope.collapse = function(id){
        $('#' + id).removeClass('in');
        $('#' + id).addClass('collapse');
    }

    // Evento Apache Cordova / Phonegap
    function onDeviceReady() {
        $scope.$apply(function() {
            document.addEventListener("backbutton", onBackKeyButton, false); //Listen to the User clicking on the back button
        });
    }

    function onBackKeyButton(evt) {
        evt.preventDefault();
        if ($location.path() == '/' || $location.path() == '/login') {
            navigator.notification.confirm(
                '¿Desea cerrar la aplicación?', // message
                 exitApp,            // callback to invoke with index of button pressed
                'SALIR',           // title
                ['NO','SÍ']     // buttonLabels
            );
        }
        else {
            window.history.back();
        }
    }

    function exitApp(buttonIndex) {
        if(buttonIndex == 2) {
            navigator.app.exitApp();
        }
    }

}]);