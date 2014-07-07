'use strict';

// Declare app level module which depends on filters, and services
angular.module('Blog.config', ['ngRoute'])

   // version of this seed app is compatible with angularFire 0.6
   // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
   .constant('version', '0.6')

   // where to redirect users if they need to authenticate (see module.routeSecurity)
   .constant('loginRedirectPath', '/login')

   // your Firebase URL goes here
   .constant('FBURL', 'https://myangularblog.firebaseio.com')

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
         templateUrl: 'partials/home.html',
         controller: 'HomeCtrl'
      });

      $routeProvider.when('/home', {
         templateUrl: 'partials/home.html',
         controller: 'HomeCtrl'
      });

      $routeProvider.when('/erstellen', {
         templateUrl: 'partials/create.html',
         controller: 'CreateCtrl'
      });

      $routeProvider.when('/archiv', {
         templateUrl: 'partials/archive.html',
         controller: 'ViewCtrl'
      });
      $routeProvider.when('/artikel/:slug', {
         templateUrl: 'partials/article.html',
         controller: 'ArticleCtrl'
      });

      $routeProvider.when('/bearbeiten', {
         redirectTo: '/articles'
      });
      $routeProvider.when('/bearbeiten/:slug', {
         templateUrl: 'partials/edit.html',
         controller: 'EditCtrl'
      });

      $routeProvider.when('/account', {
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });

      $routeProvider.when('/suche', {
         templateUrl: 'partials/search.html',
         controller: 'SearchCtrl'
      });

      $routeProvider.when('/404', {
         templateUrl: 'partials/404.html',
         controller: '404Ctrl'
      });

      $routeProvider.otherwise({redirectTo: '/404'});
   }]);
