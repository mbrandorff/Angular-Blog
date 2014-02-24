'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp',[
      'myApp.config',

      'myApp.controller.HomeCtrl',
      'myApp.controller.CommentsCtrl',
      'myApp.controller.LoginCtrl',
      'myApp.controller.AccountCtrl',

      'myApp.directive.appVersion',
      'myApp.directive.navigation',

      'myApp.filter.interpolate',

      'myApp.service.firebase',
      'myApp.service.login',
      'myApp.service.markdown',

      'waitForAuth',
      'routeSecurity'
   ])

   .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         // double-check that the app has been configured
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
         setTimeout(function() {
            angular.element(document.body).removeClass('hide');
         }, 250);
      }
      else {
         // establish authentication
         $rootScope.auth = loginService.init('/login');
         $rootScope.FBURL = FBURL;
      }
   }]);
