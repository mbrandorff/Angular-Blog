'use strict';

angular.module('Blog.controller.CreateCtrl', [])
.controller('CreateCtrl', [
  '$scope',
  'markdownHtml',
  '$sce',
  'FBURL',
  'checkIfArticleExists',
  'currentDate',
  'dateFormatted',
  function($scope, markdownHtml, $sce, FBURL, checkIfArticleExists, currentDate, dateFormatted) {

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

  var slugify = function(string) {
    string = string.replace( /\s/ig, "-");
    string = string.replace( /([a-z])/ig, function (all, letter) {
      return letter.toLowerCase();
    });
    string = string.replace( /\./g, "");
    return string;
  }


  $scope.article = {
    input: "Start writing an article!"
  };

  $scope.$watch('article.input', function(data){
    markdownHtml(data, "html");
    $scope.article.content = (output) ? output : '';
    $scope.preview = (output) ? $sce.trustAsHtml(output) : '';
  })

  
  $scope.submit = function() {

    var name = camelCase($scope.article.title);
    $scope.article.slug = slugify($scope.article.title);
    $scope.article.user_id = ($scope.auth.user) ? $scope.auth.user.id : null;

    checkIfArticleExists(articlesRef, name, function(articleName, exists){
      if(!exists) {
        $scope.article.date = currentDate();
        $scope.article.created = dateFormatted();

        articlesRef.child(articleName).set($scope.article, function(error){
          if(error) {
            console.log(error);
          } else {
            console.log('Article successfully created');
          }
        });
      }
      else {
        alert('Artikel existiert bereits');
      }
    });
  }

}]);