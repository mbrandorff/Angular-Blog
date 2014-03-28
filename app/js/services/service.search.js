angular.module('Blog.service.search', [])

  .service('searchService', function() {
    var observerCallbacks = [];
    var searchterm = "";

    //register an observer
    this.registerObserverCallback = function(callback){
      observerCallbacks.push(callback);
    };

    //call this when you know value has been changed
    this.notifyObservers = function(){
      angular.forEach(observerCallbacks, function(callback){
        callback();
      });
    };

    this.getSearch = function() {
      return searchterm;
    }

    this.search = function(term, cb) {
      searchterm = term;
      cb();
    }
  })