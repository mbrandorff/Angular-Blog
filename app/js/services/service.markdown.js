angular.module('Blog.service.markdown', [])

  // a simple utility to create references to Firebase paths
  .service('markdownHtml', function() {
    var converter = new Showdown.converter();

    return function(inputData, target){
      if(target == "html") {
        output = (inputData) ? converter.makeHtml(inputData) : '';
      }
      else if(target == "markdown") {
        output = (inputData) ? converter.makeMarkdown(inputData) : '';
      }
      else {
        output = "";
        console.log("target not defined.. doing nothing :/");
      }
    }
  });