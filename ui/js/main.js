'use strict';

// declare top-level module which depends on filters,and services
var myApp = angular.module('myApp',
    [   'AppConfig',
        'myApp.filters',
        'myApp.directives', // custom directives
        'myApp.home',
        'myApp.contracts',
        'myApp.contract',
        'myApp.workforce',
        'myApp.worker',
        'myApp.contratistas',
        'myApp.contratista',
        'myApp.maquinarias',
        'myApp.maquinaria',
        'myApp.vehiculos',
        'myApp.vehiculo',
        'myApp.main',
        'myApp.login',
        'myApp.services',
        // 'ngGrid', // angular grid
        // 'ui', // angular ui
        // 'ngSanitize', // for html-bind in ckeditor
        // 'ui.bootstrap', // jquery ui bootstrap
        // '$strap.directives' // angular strap

    ]);


var filters = angular.module('myApp.filters', []);
var directives = angular.module('myApp.directives', []);

// bootstrap angular
myApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    // TODO use html5 *no hash) where possible
    // $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl:'views/home/home.html',
        controller: 'homeCtrl'
    });

    $routeProvider.when('/login', {
        templateUrl:'views/login/login.html',
        controller: 'loginCtrl'
    });

    $routeProvider.when('/contracts', {
        templateUrl:'views/contracts/contracts.html'
    });

    $routeProvider.when('/workforce', {
        templateUrl:'views/workforce/workforce.html'
    });

    $routeProvider.when('/worker/:idP/:idE', {
        templateUrl:'views/workforce/worker.html',
        controller: 'workerCtrl'
    });

    $routeProvider.when('/contract/:id', {
        templateUrl:'views/contracts/contract.html',
        controller: 'contractCtrl'
    });

    $routeProvider.when('/contratistas', {
        templateUrl:'views/contratistas/contratistas.html',
        controller: 'contratistasCtrl'
    });

    $routeProvider.when('/maquinarias', {
        templateUrl:'views/maquinarias/maquinarias.html',
        controller: 'maquinariasCtrl'
    });

    $routeProvider.when('/vehiculos', {
        templateUrl:'views/vehiculos/vehiculos.html',
        controller: 'vehiculosCtrl'
    });

    $routeProvider.when('/contratista/:idP/:idC', {
        templateUrl:'views/contratistas/contratista.html',
        controller: 'contratistaCtrl'
    });

    $routeProvider.when('/maquinaria/:idP/:idM', {
        templateUrl:'views/maquinarias/maquinaria.html',
        controller: 'maquinariaCtrl'
    });

    $routeProvider.when('/vehiculo/:idP/:idV', {
        templateUrl:'views/vehiculos/vehiculo.html',
        controller: 'vehiculoCtrl'
    });

    // by default, redirect to site root
    $routeProvider.otherwise({
        redirectTo:'/'
    });

}]);

// this is run after angular is instantiated and bootstrapped
myApp.run(function ($rootScope, $location, $http, $timeout, AuthSrv, RedirectSrv) {

    // *****
    // Initialize authentication
    // *****
    $rootScope.authService = AuthSrv;

    $rootScope.$watch('authService.authorized()', function () {

        // if never logged in, do nothing (otherwise bookmarks fail)
        if (AuthSrv.initialState()) {
            // we are public browsing
            RedirectSrv.redirect('/login');
            return;
        }

        // when user logs in, redirect to home
        if (AuthSrv.authorized()) {
            //$location.path("/");
        }

        // when user logs out, redirect to login
        if (!AuthSrv.authorized()) {
            RedirectSrv.redirect('/login');
        }
    }, true);

});