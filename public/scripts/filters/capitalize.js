/**
 * Description:
 *     first letter to uppercase
 * Usage:
 *   {{some_text | capitalize}}
 * From:
 *   http://codepen.io/WinterJoey/pen/sfFaK
 */

 angular.module("aliga.filters.capitalize", []).filter("capitalize", function() {
  "use strict";
  return function(input) {
    return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : "";
  };
});

