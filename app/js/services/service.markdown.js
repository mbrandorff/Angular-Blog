angular.module('Blog.service.markdown', [])

  // a simple utility to create references to Firebase paths
  .service('markdownHtml', function() {
    var converter = new Showdown.converter();

    return function(inputData, target){
      if(target == "html") {
        output = (inputData) ? converter.makeHtml(inputData) : '';
        console.log("Converted Markdown to HTML :)");
      }
      else if(target == "markdown") {
        output = (inputData) ? converter.makeMarkdown(inputData) : '';
        console.log("Converted HTML to Markdown :)");
      }
      else {
        output = "";
        console.log("target not defined.. doing nothing :/");
      }
    }
  });