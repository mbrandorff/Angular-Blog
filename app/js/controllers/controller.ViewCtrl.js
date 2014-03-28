'use strict';

angular.module('Blog.controller.ViewCtrl', [])
.controller('ViewCtrl', ['$scope', '$routeParams', 'firebaseRef', '$sce', function($scope, $routeParams, firebaseRef, $sce) {

  var dataRef = firebaseRef('articles');

  var getArticles = function() {
    dataRef.once('value', function(snapshot) {
      $scope.articles = snapshot.val();
      $scope.$apply();
    });
  };
  
  getArticles();
}]);