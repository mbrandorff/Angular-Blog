angular.module('Blog.service.checkIfArticleExists', [])

  // a simple utility to create references to Firebase paths
  .service('checkIfArticleExists', function() {
    return function checkIfArticleExists(ref, articleName, cb) {
      ref.child(articleName).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        cb(articleName, exists);
      })
    }
  })