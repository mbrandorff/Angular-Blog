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
  'waitForAuth',
  function($scope, $routeParams, $location, firebaseRef, $sce, markdownHtml, syncData, waitForAuth) {

  // Variablen
  $scope.slug = $routeParams.slug;
  var name = ($scope.slug) ? $scope.slug : 'undefined';
  var dataRef = firebaseRef('articles/' + name);
  var userRef = firebaseRef('users');

  waitForAuth.then(function() {
    if($scope.auth.user) {
      syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
    }
  })

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
    $scope.processing = "add";

    waitForAuth.then(function() {
      if($scope.auth.user) {
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
            $scope.processing = null;
          })
        })
      }
      else {
        $scope.newComment.author = $scope.user.name;

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
          $scope.processing = null;
        })
      }
    })
  }

  $scope.deleteComment = function (comment) {
    $scope.processing = comment.name;
    dataRef.child("comments").child(comment.name).remove(function(error) {
      if (error) {
        console.log('Deletion failed.');
        console.log(error);
      }
      else {
        console.log('Deletion succeeded.');
        getComments();
      }
      $scope.processing = null;
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
