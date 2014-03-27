angular.module('Blog.service.date', [])

  .service('currentDate', function() {
    function twoDigits (x) {
      x = x.toString();
      if(x.length == 1) {
        x = '0' + x;
      }
      return x;
    }

    return function() {
      var now = new Date();
      var result = now.getFullYear() + '/' + twoDigits(now.getMonth() + 1) + '/' + twoDigits(now.getDate());
      return result;
    }
  })

  .service('dateFormatted', function() {
    function twoDigits (x) {
      x = x.toString();
      if(x.length == 1) {
        x = '0' + x;
      }
      return x;
    }
    
    return function() {
      var now = new Date();
      var result = twoDigits(now.getDate()) + '/' + twoDigits(now.getMonth() + 1) + '/' + now.getFullYear();
      return result;
    }
  })