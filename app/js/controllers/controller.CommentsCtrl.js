'use strict';

angular.module('myApp.controller.CommentsCtrl', [])
  .controller('CommentsCtrl', ['$scope', 'syncData', function($scope, syncData) {
    $scope.newComment = null;

    // constrain number of messages by limit into syncData
    // add the array into $scope.messages
    $scope.comments = syncData('comments', 10);

    // add new messages to the list
    $scope.addComment = function() {
      if( $scope.newComment ) {
        $scope.comments.$add({text: $scope.newComment});
        $scope.newComment = null;
      }
    };
  }]);