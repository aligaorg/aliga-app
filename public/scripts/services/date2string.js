var date2stringService = angular.module("date2stringService", []);

date2stringService
  .factory("date2string",
    function() {
      "use strict";
      return {
          toString: function(date) {
            return [date.getFullYear(), date.getMonth()+1, date.getDate()].join("-");
          }
      };
    }
  );
