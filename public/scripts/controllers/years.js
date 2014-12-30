var app = angular.module("aliga");

app
.factory("Year", function($resource) {
  "use strict";
  //return $resource("/api/:slug/calendars/", { slug: "@slug" });
  return $resource("data/:slug.years.json", { slug: "@slug" });
});

app.controller("YearCtrl", function($scope, $stateParams, Year) {
  "use strict";

  Year.get({ slug: $stateParams.slug }, function(data) {
    var info = {
      cityName: data.city,
      slug: $stateParams.slug,
      calendars: data.calendars
    };
    $scope.info = info;
  });

});
