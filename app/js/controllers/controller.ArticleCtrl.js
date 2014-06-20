'use strict';

angular.module('Blog.controller.ArticleCtrl', [])
.controller('ArticleCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'firebaseRef',
  '$sce',
  'markdownHtml',
  'syncData',
  function($scope, $routeParams, $location, firebaseRef, $sce, markdownHtml, syncData) {

  // Variablen
  $scope.slug = $routeParams.slug;
  var name = ($scope.slug) ? $scope.slug : 'undefined';
  var dataRef = firebaseRef('articles/' + name);
  var userRef = firebaseRef('users');

  // Firebase Daten holen
  function getArticle() {
    dataRef.once('value', function(snapshot) {
      $scope.currentArticle = snapshot.val();
      if($scope.currentArticle) {
        // convert input markdown to html
        var input = $scope.currentArticle.input;
        markdownHtml(input, "html");
        var html = (output) ? output : '';
        // make it trusted with $sce
        $scope.currentArticle.safeHtml = $sce.trustAsHtml(html);

        // Kategorie
        switch($scope.currentArticle.category){
          case "website":
            $scope.category = "Website- und Blogentwicklung";
            break;
          case "random-thoughts":
            $scope.category = "Random Thoughts";
            break;
          case "web-design":
            $scope.category = "Web Design";
            break;
        }
      }
      $scope.$apply();
    });
  };
  getArticle();

  // Kommentare
  function getComments(cb) {
    dataRef.once('value', function(snapshot) {
      $scope.currentArticle.comments = snapshot.val().comments;
      $scope.comments = snapshot.val().comments;

      for (var comment in $scope.comments) {
        var input = $scope.comments[comment].input;
        markdownHtml(input, "html");
        var html = (output) ? output : '';

        $scope.comments[comment].content = $sce.trustAsHtml(html);
      }

      $scope.$apply();

      if (typeof(cb) === "function") {
        cb();
      }
    });
  }
  getComments();

  $scope.newComment = {};
  $scope.$watch('newComment.input', function(data){
    markdownHtml(data, "html");
    $scope.preview = (output) ? $sce.trustAsHtml(output) : '';
  })
  $scope.addComment = function() {
    $scope.newComment.id = $scope.auth.user.id;
    $scope.newComment.uid = $scope.auth.user.uid;

    userRef.child($scope.auth.user.uid).once('value', function(snapshot) {
      $scope.newComment.author = snapshot.val().name;

      var newRef = dataRef.child("comments").push($scope.newComment, function(err) {
        if(err) {
          console.log(err);
        }
        else {
          $scope.newComment = {};

          getComments(function() {
            // Add name to Comments
            var name = newRef.name();
            if(typeof($scope.currentArticle.comments === "undefined")) {
              $scope.currentArticle.comments = {};
            }
            $scope.currentArticle.comments[name] = $scope.comments[name];
            $scope.currentArticle.comments[name].content = null;
            $scope.currentArticle.comments[name].name = name;

            dataRef.child("comments/" + name).update($scope.currentArticle.comments[name], function(error) {
              if(error) {
                console.log(error);
              }
              else {
                getComments();
              }
            })
          });
        }
      })
    })
  }

  $scope.deleteComment = function (comment) {
    delete $scope.currentArticle.comments[comment.name];

    dataRef.child("comments").set($scope.currentArticle.comments, function(error) {
      if (error) {
        console.log('Deletion failed.');
        console.log(error);
      }
      else {
        console.log('Deletion succeeded.');
        getComments();
      }
    });
  }

  // Löschen
  $scope.deleteArticle = function(article) {
    var child = article;

    var x = confirm('Artikel wirklich löschen?');

    if(x == true) {
      dataRef.parent().child(child).remove(function(error) {
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