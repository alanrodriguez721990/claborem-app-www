'use strict';

angular.module('myApp.contratistas', []).controller('contratistasCtrl', ['$scope', '$rootScope','AuthSrv', '$filter', '$window', 'RedirectSrv', 'ApiHttpSrv', 'ConfigSrv',function($scope, $rootScope, AuthSrv, $filter, $window, RedirectSrv, ApiHttpSrv, ConfigSrv) {

    if (AuthSrv.initialState() || !AuthSrv.authorized()) {
        RedirectSrv.redirect('/login');
    };
    $scope.sortingOrder = 'Num';
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    if($rootScope.plant.id){
        console.log($rootScope.plant);
        var data = {
            token : AuthSrv.currentUser().token,
            idPlanta : $rootScope.plant.id
        }
        ApiHttpSrv.createApiHttp('get', ConfigSrv.getApiUrl('contratistas'), data, data).success(function(d){
            console.log(d);
            $scope.items = d;
        })
    }
        

    $rootScope.$watch('plant', function () {
        if($rootScope.plant.id){
            var data = {
                token : AuthSrv.currentUser().token,
                idPlanta : $rootScope.plant.id
            }
            ApiHttpSrv.createApiHttp('get', ConfigSrv.getApiUrl('contratistas'), data, data).success(function(d){
                console.log(d);
                $scope.items = d;
                $scope.search();
            })
            
        };
    }, true);

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        if(haystack){
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        }
    };

    $scope.open = function(link){
        $window.open(link, '_blank');
    }

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };
    
    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };
    
    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    if($rootScope.plant.data){
        $scope.search();
    }
    
    $scope.goToContractPage = function(id){
        RedirectSrv.redirect('contract/' + id);
    }

    // change sorting order
    $scope.sort_by = function(newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

       
    };

}]);