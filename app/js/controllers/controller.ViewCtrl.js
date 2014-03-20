'use strict';

angular.module('Blog.controller.ViewCtrl', [])
.controller('ViewCtrl', ['$scope', '$routeParams', 'firebaseRef', '$sce', function($scope, $routeParams, firebaseRef, $sce) {

  $scope.slug = $routeParams.slug;

  var dataRef = firebaseRef('articles');

  var camelCase = function(string) {
    string = string.replace( /\s([a-z])/ig, function( all, letter ) {
      return letter.toUpperCase();
    });
    string = string.replace( /-([a-z])/ig, function( all, letter ) {
      return letter.toUpperCase();
    });
    string = string.replace( /^([a-z])/ig, function( all, letter ) {
      return letter.toUpperCase();
    });
    string = string.replace( /\./g, "");
    return string;
  }

  var getArticles = function() {
    dataRef.once('value', function(snapshot) {
      $scope.articles = snapshot.val();
      var name = ($scope.slug) ? camelCase($scope.slug) : 'undefined';
      $scope.name = name;
      $scope.currentArticle = $scope.articles[name];
      if($scope.currentArticle) {
        $scope.currentArticle.safeHtml = $sce.trustAsHtml($scope.currentArticle.content);
      }
      $scope.$apply();
    });
  };
  
  getArticles();

  $scope.deleteArticle = function(article) {
    console.log(article);
    var child = camelCase(article);
    console.log(child);

    var x = confirm('Artikel wirklich löschen?');

    if(x == true) {
      dataRef.child(child).remove(function(error) {
        if (error) {
          console.log('Deletion failed.');
          console.log(error);
        }
        else {
          console.log('Deletion succeeded.');
        }
      });
    }
    else {
      console.log('Deletion aborted!')
    }
  };
}]);