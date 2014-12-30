angular.module("localNotificationService", ["ngCordova.plugins.localNotification"])
  .factory("localNotification",
    function ($q, $cordovaLocalNotification) {
      "use strict";

      var _cancelAllNotifications = function () {
        $cordovaLocalNotification.cancelAll().then(function () {
          console.log("all notifications cancelled");
        });
      };

      var _registerLocalNotification = function(time, slug) {
        console.log("_registerLocalNotification: " + time);
        var deferred = $q.defer();
        var now = new Date();
        console.log("local notification at: " + time + " for: " + slug);
        var dateTime = time.split(":").map(function(item) { return parseInt(item); });
        console.log(now.setHours(dateTime[0], dateTime[1]));
        $cordovaLocalNotification.add({
          id: "aliga." + slug,
          date: new Date(now.setHours(dateTime[0], dateTime[1])),
          autoCancel: true,
          repeat: "daily",
          title: "È ora di pensare ad Aliga",
          message: "Cosa porto fuori, oggi?"
          // parameter documentation:
          // https://github.com/katzer/cordova-plugin-local-notifications#further-informations-1
        })
        .then(function(response) {
          console.log("success adding local notification", response);
          deferred.resolve(response);
          return deferred.promise;
        }, function(reason){
          console.log("error adding local notification", reason);
          deferred.reject(reason);
          return deferred.promise;
        });

        return time;
      };

      return {
          registerLocalNotification: _registerLocalNotification,
          cancelAllNotifications: _cancelAllNotifications
      };

    }
  );
