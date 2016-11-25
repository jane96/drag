'use strict';

/* Controllers */

var app = angular.module('app')
  .constant('$config', {
    accessPassportToken: 'ACCESS-PASSPORT-TOKEN',
    userAuthStore: 'ASSESS-USER-AUTH-STORE' //用户登录成功后的存储认证信息
  })
  .controller('AppCtrl', ['$scope', '$localStorage', '$window',
    function($scope, $localStorage, $window) {
      var $win = $($window);
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        key: '48548598-f079-4c57-bb39-d9ca8344abd7', //认证KEY
        name: '智慧平台',
        version: '2.0.1',
        // for chart colors
        color: {
          primary: '#7266ba',
          info: '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger: '#f05050',
          light: '#e8eff0',
          dark: '#3a3f51',
          black: '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        },
        hosts: {
          userUrl: '../api/', //用户地址
          formUrl: '../../../assets/js/demo/', //表单地址
          bmpUrl: '../../../assets/js/demo/' //流程地址
        },
        actions: {
          'save': {
            method: 'POST',
            isArray: false
          },
          'set': {
            method: 'POST',
            isArray: false
          },
          'login': {
            method: 'POST',
            isArray: false
          },
          'delete': {
            method: 'DELETE',
            isArray: false
          },
          'query': {
            method: 'GET',
            isArray: false
          },
          'update': {
            method: 'PUT',
            isArray: false
          }
        },
        isMobile: (function() { // true if the browser is a mobile device
          var check = false;
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            check = true;
          };
          return check;
        })()
      }

      // save settings to local storage
      if (angular.isDefined($localStorage.settings)) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function() {
        if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      function isSmartDevice($window) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

      var viewport = function() {
        var e = window,
          a = 'inner';
        if (!('innerWidth' in window)) {
          a = 'client';
          e = document.documentElement || document.body;
        }
        return {
          width: e[a + 'Width'],
          height: e[a + 'Height']
        };
      };

      // function that adds information in a scope of the height and width of the page
      $scope.getWindowDimensions = function() {
        return {
          'h': viewport().height,
          'w': viewport().width
        };
      };
      // Detect when window is resized and set some variables
      $scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
        $scope.windowHeight = newValue.h;
        $scope.windowWidth = newValue.w;
        if (newValue.w >= 992) {
          $scope.isLargeDevice = true;
        } else {
          $scope.isLargeDevice = false;
        }
        if (newValue.w < 992) {
          $scope.isSmallDevice = true;
        } else {
          $scope.isSmallDevice = false;
        }
        if (newValue.w <= 768) {
          $scope.isMobileDevice = true;
        } else {
          $scope.isMobileDevice = false;
        }
      }, true);
      // Apply on resize
      $win.on('resize', function() {
        $scope.$apply();
      });
      app.controller('CustomTabController', ['$scope', function($scope) {
		  $scope.tabs = [true, false, false];
		  $scope.tab = function(index){
		    angular.forEach($scope.tabs, function(i, v) {
		      $scope.tabs[v] = false;
		    });
		    $scope.tabs[index] = true;
		  }
	 }]);
    }
  ]);