angular.module('Blog.service.object2Array', [])

  // a simple utility to create references to Firebase paths
  .filter('object2Array', function() {
    return function(input) {
      var out = []; 
      for(i in input){
        out.push(input[i]);
      }
      return out;
    }
  });