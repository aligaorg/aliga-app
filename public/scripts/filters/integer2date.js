/**
 * Description:
 *     from integer to proper date object suitable for filtering
 *     works only for months
 * Usage:
 *   {{ 9 | integer2date | date: 'MMMM' }}
 * From:
 *   http://stackoverflow.com/a/21482265
 */

 angular.module("aliga.filters.integer2date", []).filter("integer2date", function() {
  "use strict";
  return function(iMonth) {
    var convertme = iMonth-1;
    return new Date(2014, convertme);
  };
});

