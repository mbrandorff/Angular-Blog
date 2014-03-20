'use strict';

angular.module('Blog.controller.HomeCtrl', [])
.controller('HomeCtrl', ['$scope', 'markdownHtml', 'firebaseRef', '$sce', function($scope, markdownHtml, firebaseRef, $sce) {

  var dataRef = firebaseRef('articles');

  var camelCase = function(string) {
    var result = string.replace( /-([a-z])/ig, function( all, letter ) {
      return letter.toUpperCase();
    });

    result = result.replace( /^([a-z])/ig, function( all, letter ) {
      return letter.toUpperCase();
    });

    return result;
  }

  var getArticles = function() {
    dataRef.once('value', function(snapshot) {
      $scope.articles = snapshot.val();

      for(var article in $scope.articles){
        var preview = $scope.articles[article].content.match(/<p>[\s\S]+<\/p>/).toString();
        console.log(preview);

        $scope.articles[article].preview = (preview) ? $sce.trustAsHtml(preview) : '';
        console.log($scope.articles[article].title);
      }

      $scope.$apply();
    });
  }
  
  getArticles();

  $scope.$watch('markdown.input', function(data){
    markdownHtml(data, "html");
    $scope.safeHtml = (output) ? $sce.trustAsHtml(output) : '';
  })
  
}]);