/**
 * Created by gukun on 2016/11/21.
 */
app.controller('chatDemoController',["$scope",function($scope){
    $scope.tabs = [false, true];
    $scope.tab = function(index){
        angular.forEach($scope.tabs, function(i, v) {
            $scope.tabs[v] = false;
        });
        $scope.tabs[index] = true;
    };
}]);