'use strict';

angular.module('Blog.controller.CategoriesCtrl', [])
  .controller('CategoriesCtrl', [
    '$scope',
    'FBURL',
    function($scope, FBURL) {
      var articlesRef = new Firebase(FBURL + '/articles');

      articlesRef.once('value', function(snap) {
        $scope.$apply(function() {
          $scope.articles = snap.val();
        })
      })

      $scope.categoryfilter = undefined;
      $scope.category = "everything";
      $scope.$watch('category', function(data){
        if(data=="everything") {
          $scope.categoryfilter = undefined;
        }
        else {
          $scope.categoryfilter = $scope.category;
        }
      })

      $scope.authorfilter = undefined;
      $scope.author = "everyone";
      $scope.$watch('author', function(data){
        if(data=="everyone") {
          $scope.authorfilter = undefined;
        }
        else {
          $scope.authorfilter = $scope.author;
        }
      })
  }]);