'use strict';

angular.module('Blog.controller.CreateCtrl', [])
.controller('CreateCtrl', [
  '$scope',
  '$location',
  'markdownHtml',
  '$sce',
  'FBURL',
  'checkIfArticleExists',
  'currentDate',
  'dateFormatted',
  function($scope, $location, markdownHtml, $sce, FBURL, checkIfArticleExists, currentDate, dateFormatted) {

  var articlesRef = new Firebase(FBURL + '/articles');
  var usersRef = new Firebase(FBURL + '/users');

  var slugify = function(string) {
    string = string.replace( /\s/ig, "-");
    string = string.replace( /([a-z])/ig, function (all, letter) {
      return letter.toLowerCase();
    });
    string = string.replace( /\./g, "");
    return string;
  }


  $scope.article = {
    input: ""
  };

  $scope.$watch('article.input', function(data){
    markdownHtml(data, "html");
    $scope.preview = (output) ? $sce.trustAsHtml(output) : '';
  })
  
  $scope.submit = function() {

    $scope.article.slug = slugify($scope.article.title);
    var name = $scope.article.slug;
    $scope.article.id = ($scope.auth.user) ? $scope.auth.user.id : null;
    $scope.article.uid = ($scope.auth.user) ? $scope.auth.user.uid : null;

    var createArticle = function() {
      checkIfArticleExists(articlesRef, name, function(articleName, exists){
        if(!exists) {
          $scope.article.date = currentDate();
          $scope.article.created = dateFormatted();
          
          articlesRef.child(articleName).set($scope.article, function(error){
            if(error) {
              $scope.$apply(function(){
                $scope.processing = false;
              });
              $scope.err = 'Error: Artikel konnte nicht erstellt werden';
            }
            else {
              console.log($scope.article.slug);
              $scope.$apply(function(){
                $location.path("/artikel/" + $scope.article.slug);
              });
            }
          });
        }
        else {
          $scope.err = 'Error: Artikel existiert bereits';
          $scope.$apply(function(){
            $scope.processing = false;
          });
        }
      });
    }

    usersRef.child($scope.auth.user.uid + '/name').once('value', function(snapshot) {
      if (snapshot.val() !== null) {
        console.log(snapshot.val());
        $scope.article.author = snapshot.val();

        createArticle();
      }
      else {
        $scope.$apply(function(){
          $scope.processing = false;
          $scope.err = 'Error: Username nicht definiert';
        });
      }
    });

    $scope.processing = true;
  }

}]);