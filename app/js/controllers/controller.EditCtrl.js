'use strict';

angular.module('Blog.controller.EditCtrl', [])
.controller('EditCtrl', [
  '$scope',
  'markdownHtml',
  '$sce',
  'FBURL',
  'checkIfArticleExists',
  'currentDate',
  'dateFormatted',
  '$routeParams',
  function($scope, markdownHtml, $sce, FBURL, checkIfArticleExists, currentDate, dateFormatted, $routeParams) {

  $scope.slug = $routeParams.slug;

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
    $scope.article.user_id = ($scope.auth.user) ? $scope.auth.user.id : null;

    checkIfArticleExists(articlesRef, name, function(articleName, exists){
      if(!exists) {
        alert('Artikel existiert noch nicht.');
      }
      else {
        $scope.article.edited = dateFormatted();

        articlesRef.child(articleName).update($scope.article, function(error){
          if(error) {
            console.log(error);
          } else {
            console.log('Article successfully updated');
          }
        });
      }
    });
  }

}]);