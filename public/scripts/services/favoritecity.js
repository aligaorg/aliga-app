angular.module("favoriteCityService", ["pouchdb"])
  .factory("favCity",
    function (PouchDB, $q) {
      "use strict";
      return {
          getFavoriteCity: function () {
            return new PouchDB("db").get("favoriteCity")
              .then(function(response) {
                  if (typeof response === "object") {
                      // console.log("getFavoriteCity fulfilled", response);
                      return response;
                  } else {
                      // invalid response
                      // console.log("getFavoriteCity rejected", response);
                      return $q.reject(response);
                  }

              }, function(response) {
                  // something went wrong
                  // console.log("getFavoriteCity invalid", response);
                  return $q.reject(response);
            });
          }
      };
    }
  );
