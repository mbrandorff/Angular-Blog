'use strict';

angular.module('Blog.controller.ViewCtrl', [])
.controller('ViewCtrl', ['$scope', '$routeParams', '$location', 'firebaseRef', '$sce', function($scope, $routeParams, $location, firebaseRef, $sce) {

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
      $scope.$apply();
    });
  };
  
  getArticles();
}]);