'use strict';

angular.module('Blog.controller.HeaderCtrl', [])
.controller('HeaderCtrl', ['$scope', '$location', 'searchService', function($scope, $location, searchService) {


  $scope.search = function() {
    console.log($scope.searchterm);
    searchService.search($scope.searchterm, function() {
      // Update other Controllers via the Service
      searchService.notifyObservers();
    });
    $location.path("/suche");
  }
}]);