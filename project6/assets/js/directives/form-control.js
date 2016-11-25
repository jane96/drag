'use strict';


/**
 * 返回功能
 * 调用方式：<a href history>back</a>;
 */

app.directive('history', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind('click', function(value) {
        //alert(value);
        $window.history.back();
      });
    }
  };
}]);


/**
 * 本地存储
 */
app.factory('locals', ['$window', function($window) {
  return {
    //存储单个属性
    put: function(key, value) {
      $window.localStorage[key] = value;
    },
    //读取单个属性
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    //存储对象，以JSON格式存储
    putObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    //读取对象
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }

  }
}]);


/**
 * 显示html
 */
app.filter('toHtml', ['$sce', function($sce) {
  return function(text) {
    return $sce.trustAsHtml(text);
  }
}]);