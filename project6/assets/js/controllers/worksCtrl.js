app.controller('WorksCtrl', ['$scope', function($scope) {
  $scope.folds = [
    {name: '待办', filter:''},
    {name: '已办', filter:'starred'},
    {name: '待阅', filter:'sent'},
    {name: '已阅', filter:'important'},
  ];

  $scope.labels = [
    {name: '已发起的', filter:'launched'},
    {name: '在草稿中的', filter:'draft'}
  ];

  $scope.addLabel = function(){
    $scope.labels.push(
      {
        name: $scope.newLabel.name,
        filter: angular.lowercase($scope.newLabel.name),
        color: '#ccc'
      }
    );
    $scope.newLabel.name = '';
    };

  $scope.labelClass = function(label) {
    return {
      'b-l-info': angular.lowercase(label) === 'angular',
      'b-l-primary': angular.lowercase(label) === 'bootstrap',
      'b-l-warning': angular.lowercase(label) === 'client',
      'b-l-success': angular.lowercase(label) === 'work'
    };
  };
}]);

app.controller('WorksListCtrl', ['$scope', "$aside", 'mails','$stateParams','$filter','$location','utilsService',function($scope, $aside, mails, $stateParams,$filter,$location,utilsService) {
    $scope.fold = $stateParams.fold;
  mails.all().then(function(mails){
    $scope.mails = mails;
  });
  angular.forEach($scope.folds, function(value, i) {
      if(value.filter==$scope.fold){
          if(value.name=='待办'){
              $scope.overtime='超时待办';
          }
        $scope.identify=value.name;
    }
  });
  angular.forEach($scope.labels, function(value, i) {
      if(value.filter==$scope.fold){
        $scope.identify=value.name;
    }
  });

  if($scope.fold==''){
      $scope.overtimeFlag=true;
      $scope.number="4";
  }else {
      $scope.overtimeFlag=false;
      $scope.number="2";
  }

  if($scope.fold=="sent"){
     $scope.showSort=true;
     $scope.showFilter=true;
  }else if ($scope.fold=="") {
      $scope.showSort=true;
      $scope.showFilter=false;
 }else{
     $scope.showSort=false;
     $scope.showFilter=false;
 }

  $scope.refresh=function(){
    //   $location.path("/app/works/inbox/sent");
    window.location.reload();
  };

  $scope.week = "";
  $scope.str = new Date().getDay();

  if ($scope.str == 0) {
          $scope.week = "周日";
  } else if ($scope.str == 1) {
          $scope.week = "周一";
  } else if ($scope.str == 2) {
          $scope.week = "周二";
  } else if ($scope.str == 3) {
          $scope.week = "周三";
  } else if ($scope.str == 4) {
          $scope.week = "周四";
  } else if ($scope.str == 5) {
          $scope.week = "周五";
  } else if ($scope.str == 6) {
          $scope.week = "周六";
  }

  var dayArr=$filter('date')(new Date(), 'yyyy-MM-dd').split('-');
   $scope.year=dayArr[0]+'年';
   $scope.today=dayArr[1]+'月'+dayArr[2]+'日';

  $scope.openFlow = function(position) {
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

app.controller('WorksDetailCtrl', ['$scope', 'mails', '$stateParams','utilsService', function($scope, mails, $stateParams,utilsService) {
  mails.get($stateParams.mailId).then(function(mail){
    $scope.mail = mail;
    });
}]);

app.controller('MailNewCtrl', ['$scope', function($scope) {
  $scope.mail = {
    to: '',
    subject: '',
    content: ''
  }
  $scope.tolist = [
    {name: 'James', email:'james@gmail.com'},
    {name: 'Luoris Kiso', email:'luoris.kiso@hotmail.com'},
    {name: 'Lucy Yokes', email:'lucy.yokes@gmail.com'}
  ];
}]);

app.controller('ScrollController', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.datasource = {
		get : function(index, count, success) {
            return $timeout(function() {
                var i, result, _i, _ref;
                result = [];
                for (i = _i = index, _ref = index + count - 1; index <= _ref ? _i <= _ref : _i >= _ref; i = index <= _ref ? ++_i : --_i) {
                    result.push('item #' + i);
                    // if(i==0) return;
                }
                return success(result);
            }, 100);
         }
	};
}]);

app.controller('CustomTabController', ['$scope', function($scope) {
  $scope.tabs = [true, false];
  $scope.tab = function(index){
    angular.forEach($scope.tabs, function(i, v) {
      $scope.tabs[v] = false;
    });
    $scope.tabs[index] = true;
    };
}]);

angular.module('app').directive('labelColor', function(){
  return function(scope, $el, attrs){
    $el.css({'color': attrs.color});
    };
});
