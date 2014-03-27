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
        var input = $scope.articles[article].input;
        markdownHtml(input, "html");
        var html = (output) ? output : '';
        var preview = html.match(/<p>[\s\S]+<\/p>/);

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