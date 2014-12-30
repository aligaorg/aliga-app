angular.module("aliga")

.factory("City", function($resource) {
  "use strict";
  return $resource("data/cities.json");
})

.controller("CityListCtrl", function($scope, $cordovaLocalNotification, $state, PouchDB, favCity, date2string, City) {
  "use strict";

  var info = {};
  City
    .query()
    .$promise
    .then(function(data) {

      var date = new Date();
      var year = date.getFullYear();
      date.setDate(date.getDate() + 1);
      var tomorrow = date2string.toString(date);
      info = {
        cities: data,
        year: year,
        tomorrow: tomorrow
      };

      $scope.info = info;

  });


  // // just testing if it works - to be moved
  // var now                  = new Date().getTime(),
  //     _10_seconds_from_now = new Date(now + 10*1000);
  // $scope.addNotification = function () {
  //   $cordovaLocalNotification.add({
  //     id: now,
  //     date: _10_seconds_from_now,
  //     repeat: "minutely",
  //     title: "Aliga ad Assemini",
  //     message: "Stasera: Umido, Ingombranti, Vetro e Lattine"
  //     // parameter documentation:
  //     // https://github.com/katzer/cordova-plugin-local-notifications#further-informations-1
  //   }).then(function () {
  //     console.log("callback for adding background notification");
  //   });
  // };

  favCity.getFavoriteCity().then(
    function(response) {
      // console.log("cCtrl favoriteCity response", response.favoriteCity);
      $scope.favoriteCity = response.favoriteCity;
    },
    function() {
      // console.log("cCtrl favoriteCity error", reason);
      $scope.favoriteCity = "nessuna";
    }
  );

  $scope.registerFavoriteCity = function (favoriteCity) {
    // console.log("in registerFavoriteCity");
    var db = new PouchDB("db");

    db.get("favoriteCity", function(err, doc) {

      if (err) {

        // console.log("get error", err);
        db.put({
          favoriteCity: favoriteCity.slug
        }, "favoriteCity").then(function() {
          // console.log("first put", response);
          $scope.favoriteCity = favoriteCity.slug;

          // WARNING maybe we could add an if (flag) here
          // console.log("state.go", favoriteCity.slug, info.year, info.tomorrow, $state.current);
          $state.transitionTo($state.current, {slug: favoriteCity.slug, year: info.year, date: info.tomorrow}, {
              reload: true,
              inherit: false,
              notify: true
          });

        });

      } else {

        // console.log("get success", doc);

        // remove only if not duplicate
        if (doc.favoriteCity !== favoriteCity.slug) {
          db.remove(doc).then(function() {
            // console.log("removed", response);

            db.put({
              favoriteCity: favoriteCity.slug
            }, "favoriteCity").then(function() {
              // console.log("put after remove", response);
              $scope.favoriteCity = favoriteCity.slug;

              // WARNING maybe we could add an if (flag) here
              // console.log("state.go", favoriteCity.slug, info.year, info.tomorrow, $state.current);
              $state.transitionTo($state.current, {slug: favoriteCity.slug, year: info.year, date: info.tomorrow}, {
                  reload: true,
                  inherit: false,
                  notify: true
              });

            }, function() {
              // console.log("put after remove, error", reason);
            });

          }, function() {
            // console.log("not removed", reason);
          });
        }

      }

    });

  };


});
