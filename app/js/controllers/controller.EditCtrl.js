'use strict';

angular.module('Blog.controller.EditCtrl', [])
.controller('EditCtrl', [
  '$scope',
  '$location',
  'markdownHtml',
  '$sce',
  'FBURL',
  'checkIfArticleExists',
  'currentDate',
  'dateFormatted',
  '$routeParams',
  function($scope, $location, markdownHtml, $sce, FBURL, checkIfArticleExists, currentDate, dateFormatted, $routeParams) {

  $scope.slug = $routeParams.slug;
  $scope.article = {};

  var articlesRef = new Firebase(FBURL + '/articles');

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

  var getArticle = function() {
    var name = ($scope.slug) ? camelCase($scope.slug) : 'undefined';

    var articleRef = new Firebase(FBURL + '/articles/' + name);

    articleRef.once('value', function(snapshot, err) {
      if(err){
        console.log(err);
      }
      $scope.article = snapshot.val();

      $scope.$apply();
    });
  }

  getArticle();

  $scope.$watch('article.input', function(data){
    markdownHtml(data, "html");
    $scope.preview = (output) ? $sce.trustAsHtml(output) : '';
  })

  
  $scope.submit = function() {

    var name = camelCase($scope.article.title);
    $scope.article.id = ($scope.auth.user) ? $scope.auth.user.id : null;
    $scope.processing = true;

    checkIfArticleExists(articlesRef, name, function(articleName, exists){
      if(!exists) {
        $scope.err = 'Error: Artikel existiert noch nicht oder nicht mehr';
        $scope.$apply(function(){
          $scope.processing = false;
        });
      }
      else {
        $scope.article.edited = dateFormatted();

        articlesRef.child(articleName).update($scope.article, function(error){
          if(error) {
            $scope.$apply(function(){
              $scope.processing = false;
            });
            $scope.err = 'Error: Artikel konnte nicht erstellt werden';
            console.log(error);
          }
          else {
            $scope.$apply(function(){
              $location.path("/articles/" + $scope.article.slug);
            });
          }
        });
      }
    });
  }

}]);