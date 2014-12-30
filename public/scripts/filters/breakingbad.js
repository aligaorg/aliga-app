/**
 * Description:
 *     first letter to uppercase
 *     second letter to lowercase
 * Usage:
 *   {{some_text | breakingbad}}
 *
 */

 angular.module("aliga.filters.breakingbad", []).filter("breakingbad", function() {
  "use strict";
  return function(input) {
    input = input.split(" e ").join("/");
    return (!!input) ? input.replace(/([^\W_]+[^\s\/]*) */g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.charAt(1).toLowerCase();}) : "";
  };
});

