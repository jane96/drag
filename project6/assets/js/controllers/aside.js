'use strict';
/** 
 * controller for angular-aside
 * Off canvas side menu to use with ui-bootstrap. Extends ui-bootstrap's $modal provider.
 */
app.controller('AsideCtrl', ["$scope", "$aside", "$modal", "$log", function($scope, $aside, $modal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.open = function(size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openAside = function(position) {
    $aside.open({
      templateUrl: 'asideContent.html',
      placement: position,
      size: 'lg',
      backdrop: true,
      controller: function($scope, $modalInstance) {
        $scope.ok = function(e) {
          $modalInstance.close();
          e.stopPropagation();
        };
        $scope.cancel = function(e) {
          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    });
  };
}]);

app.controller('ModalInstanceCtrl', ["$scope", "$modalInstance", "items", function($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);