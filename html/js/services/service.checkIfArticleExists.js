angular.module('Blog.service.checkIfArticleExists', [])

  .service('checkIfArticleExists', ['$rootScope', function($rootScope) {
    return function checkIfArticleExists(ref, articleName, cb) {
      ref.child(articleName).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        cb(articleName, exists);
      })
    }
  }])