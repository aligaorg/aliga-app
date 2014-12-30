
/**
 * @ngdoc overview
 * @name publicApp
 * @description
 * # publicApp
 *
 * Main module of the application.
 */

angular
  .module("aliga", [
    "ionic",
    "ngResource",
    "ngCordova.plugins.splashscreen",
    "ngCordova.plugins.device",
    "lodashService",
    "momentService",
    "favoriteCityService",
    "localNotificationService",
    "date2stringService",
    "pouchdb",
    "aliga.filters.nospace",
    "aliga.filters.capitalize",
    "aliga.filters.integer2date",
    "aliga.filters.breakingbad"
  ])

  .run(function($ionicPlatform, $cordovaSplashscreen, $document, $state) {
    "use strict";
    $ionicPlatform.ready(function() {
      if(window.StatusBar) {
        // org.apache.cordova.statusbar required
        window.StatusBar.styleDefault();
      }

      if ( window.cordova !== undefined ) {
        $cordovaSplashscreen.hide();
      }

      $document.on("resume", function() {
        $state.reinit();
      });

    });
  })

  .config(function ($provide, $stateProvider, $urlRouterProvider) {
    "use strict";

    $provide.decorator("$state", function($delegate) {
      $delegate.reinit = function() {
        this.transitionTo(this.current, this.$current.params, { reload: true, inherit: true, notify: true });
      };
      return $delegate;
    });

    $stateProvider
      .state("app", {
        url: "/app",
        abstract: true,
        templateUrl: "views/menu.html",
        controller: "AppCtrl"
      })
      .state("app.daycard", {
        // url: "/:slug/calendars/:year/:date",
        url: "/daycard",
        views: {
          "menuContent":{
            templateUrl: "views/daycard.html",
            controller: "DayCtrl",
            params: ["slug", "year", "date"],
            resolve: {
              date2string: "date2string",
              favCity: "favCity",
              favoriteCity: function(favCity) {
                return favCity.getFavoriteCity().then(
                  function(response) {
                    // console.log("router fc ok", response);
                    return response;
                  },
                  function() {
                    // console.log("router fc err", reason);
                    return {
                      favoriteCity: undefined
                    };
                  }
                );
              },
              getOptions: function(favoriteCity, date2string) {
                // console.log("getOptions", $stateParams);
                var today = new Date();
                return {
                  slug: favoriteCity.favoriteCity,
                  year: today.getFullYear(),
                  date: date2string.toString(today)
                };
              }
            }
          }
        }
      })
      .state("main", {
        url: "/",
        templateUrl: "views/main.html",
        controller: "MainCtrl"
      })
      .state("years", {
        url: "/:slug/calendars/",
        templateUrl: "views/years.html",
        controller: "YearCtrl",
      })
      .state("calendar", {
        url: "/:slug/calendars/:year",
        templateUrl: "views/calendar.html",
        controller: "CalendarCtrl"
      });
      //$urlRouterProvider.otherwise("/app/:slug/calendars/:year/:date");
      $urlRouterProvider.otherwise("/app/daycard");
  });

var onDeviceReady = function() {
    "use strict";
    angular.bootstrap( document, ["aliga"]);
};
document.addEventListener("deviceready", onDeviceReady);

