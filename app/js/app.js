'use strict';

// Declare app level module which depends on filters, and services
angular.module('Blog',[
      'Blog.config',

      'Blog.controller.HeaderCtrl',
      'Blog.controller.HomeCtrl',
      'Blog.controller.LoginCtrl',
      'Blog.controller.AccountCtrl',
      'Blog.controller.ViewCtrl',
      'Blog.controller.ArticleCtrl',
      'Blog.controller.CreateCtrl',
      'Blog.controller.EditCtrl',
      'Blog.controller.404Ctrl',

      'Blog.directive.appVersion',
      'Blog.directive.navigation',

      'Blog.filter.interpolate',

      'Blog.service.firebase',
      'Blog.service.login',
      'Blog.service.markdown',
      'Blog.service.object2Array',
      'Blog.service.date',
      'Blog.service.checkIfArticleExists',

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

// Non-Angular Stuff

