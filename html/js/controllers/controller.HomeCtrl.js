'use strict';

angular.module('Blog.controller.HomeCtrl', [])
.controller('HomeCtrl', ['$scope', 'markdownHtml', 'firebaseRef', '$sce', function($scope, markdownHtml, firebaseRef, $sce) {

  var dataRef = firebaseRef('articles');

  var getArticles = function() {
    dataRef.once('value', function(snapshot) {
      $scope.articles = snapshot.val();

      for(var article in $scope.articles){
        var input = $scope.articles[article].input;
        markdownHtml(input, "html");
        var html = (output) ? output : '';
        var preview = html.match(/^.{0,249}[^!?.]*..*/m);

        if(preview != null) {
          preview = preview.toString();
          $scope.articles[article].preview = $sce.trustAsHtml(preview);
        }
        else {
          preview = '<span class="text--italic">Ein Beitrag von ' + $scope.articles[article].author + '.';
          $scope.articles[article].preview = $sce.trustAsHtml(preview);
        }
      }

      $scope.$apply();
    });
  }
  
  getArticles();
  
}]);