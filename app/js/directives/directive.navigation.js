'use strict';

angular.module('Blog.directive.navigation', [])
  .directive('navigation', function() {
    var naventries = [
    {
      name: "Home",
      link: "/"
    },{
      name: "Artikel",
      link: "/artikel"
    },{
      name: "Kategorien",
      link: "/kategorien"
    },{
      name: "Erstellen",
      link: "/erstellen"
      // attr: 'ng-show-auth="login"'
    },{
      name: "Login",
      link: "/login",
      attr: 'ng-show-auth="logout,error"'
    },{
      name: "Account",
      link: "/account",
      attr: 'ng-show-auth="login"'
    }];

    return {
      restrict: "A",
      compile: function(element, attrs) {
        for (var i = 0; i <= naventries.length - 1; i++) {
          var attr = "";
          if(naventries[i].attr){
            attr = naventries[i].attr;
          }
          element.append('<li ' + attr + '><a href="#' + naventries[i].link + '">' + naventries[i].name + '</a></li>');
        }
      }
    }
  });