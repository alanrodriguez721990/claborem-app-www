'use strict';

angular.module('myApp.homePlanta', [])
.controller('homePlantaCtrl',
    ['$scope', '$rootScope', 'ApiHttpSrv', 'ConfigSrv', '$location', 'AuthSrv', 'RedirectSrv',
    function($scope, $rootScope, ApiHttpSrv, ConfigSrv, $location, AuthSrv, RedirectSrv) {

        var getdata = function () {
            var data = {
                'token': AuthSrv.currentUser().token
            };
            var getDataSuccess = function(data){
                // console.log(data[0]);
                $rootScope.data = data[0];
                $rootScope.collections = {};

                $scope.loading = false;
                $rootScope.updateHome = false; // flag de actualizar en false: no se volverá a pedir la data hasta no setearlo en true
            };
            var getDataFail = function(data){
                // console.log(data);
                $scope.loading = false;
                $scope.disconnect = true;
            };
            $scope.loading = true;
            $scope.disconnect = false;
            ApiHttpSrv.createApiHttp('post', ConfigSrv.getApiUrl('homePlanta'), data, data).success(getDataSuccess).error(getDataFail);
        }
        if (AuthSrv.initialState() || !AuthSrv.authorized()) {
            $location.path('/login');
        }

        // si ya estaba seteada la planta no la actualizo (salvo que esté seteado el flag de actualizar)
        if (!$rootScope.plant || $rootScope.updateHome) {
            getdata();
        }
        $scope.update = function(){
            getdata();
        }

}]);