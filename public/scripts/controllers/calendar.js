var app = angular.module("aliga");

app
.factory("Calendar", function($resource) {
  "use strict";
  //return $resource("/api/:slug/calendars/:year", { slug: "@slug", year: "@year" });
  console.log("in factory");
  return $resource("data/:slug.schedule.:year.json", { slug: "@slug", year: "@year" });
});

app.controller("CalendarCtrl", function($scope, $stateParams, $location, $anchorScroll, _, $timeout, $ionicLoading, Calendar) {
  "use strict";

  console.log("in controller");
/*
  $scope.scrollTo = function (element) {
    var oldHash = $location.hash();
    $location.hash(element);
    $anchorScroll();
    $location.hash(oldHash);
  };
*/
  Calendar.get({ slug: $stateParams.slug, year: $stateParams.year }, function(data) {
    console.log("in get");
/*
    var tSchedule = data.schedule;
    var tToday = new Date();
    _.each(tSchedule, function(month) {
      _.each(month.days, function(day) {
        var formattedDay = new Date(day.date);
        formattedDay = [formattedDay.getFullYear(), formattedDay.getMonth()+1, formattedDay.getDate()].join("-");
        var today = [tToday.getFullYear(), tToday.getMonth()+1, tToday.getDate()].join("-");
        if ( today === formattedDay ) {
          day.dayId = "today";
        } else{
          day.dayId = day.date;
        }
      });
    });
*/
    // http://nathanleclaire.com/blog/2014/04/19/5-angularjs-antipatterns-and-pitfalls/
    // didn't work without a dot
    var info = {
      slug: $stateParams.slug,
      year: $stateParams.year,
      cityName: data.city,
      schedule: data.schedule,
    };

    $scope.info = info;

  });

});
