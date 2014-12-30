var momentService = angular.module("momentService", []);

momentService.factory("moment", ["$window",
    function($window) {
      "use strict";
      return $window.moment;
    }
  ]
);
