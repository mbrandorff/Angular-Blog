'use strict';

angular.module('Blog.controller.SearchCtrl', [])
  .controller('SearchCtrl', ['$scope', 'searchService', 'FBURL', function($scope, searchService, FBURL) {
    // initial searchterm
    $scope.searchterm = searchService.getSearch();
    // service <-> ctrl kopplung
    var updateResults = function(){
      $scope.searchterm = searchService.getSearch();
    };
    searchService.registerObserverCallback(updateResults);

    var dataRef = new Firebase(FBURL + '/articles');
    var getArticles = function() {
      dataRef.once('value', function(snapshot) {
        $scope.articles = snapshot.val();
        $scope.$apply();
      });
    };
    
    getArticles();
  }]);