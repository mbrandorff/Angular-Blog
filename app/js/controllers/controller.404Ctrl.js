'use strict';

angular.module('Blog.controller.404Ctrl', [])
  .controller('404Ctrl', ['$scope', function($scope) {
    $scope.err = "Seite nicht gefunden. Tut mir sorry.";
  }]);