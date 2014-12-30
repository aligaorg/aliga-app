var lodashService = angular.module("lodashService", []);

lodashService.factory("_", ["$window",
    function($window) {
      "use strict";
      return $window._;
    }
  ]
);
