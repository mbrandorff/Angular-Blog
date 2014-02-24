'use strict';

angular.module('myApp.controller.HomeCtrl', [])
.controller('HomeCtrl', ['$scope', 'syncData', 'markdown', '$sce', function($scope, syncData, markdown, $sce) {
  syncData('syncedValue').$bind($scope, 'syncedValue');

  var converter = new Showdown.converter();
  var convert = function() {
    $scope.$watch('blog.body', function(data){
      var unsafe = ( data ) ? converter.makeHtml(data) : '';
      $scope.markdown = $sce.trustAsHtml(unsafe);
    })
  }

  convert();
  
}]);