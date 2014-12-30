var app = angular.module("aliga");

app
.factory("Day", function($resource) {
  "use strict";
  return $resource("data/:slug.schedule.:year.json", { slug: "@slug", year: "@year" });
});

app.controller("DayCtrl", function($scope, $stateParams, $ionicModal, $cordovaDevice, _, moment, Day, getOptions, date2string, localNotification) {
  "use strict";

  // console.log("day ctrl $stateParams", $stateParams.slug);

  var options = {},
         info = {};

  options.slug = $stateParams.slug !== undefined ? $stateParams.slug : getOptions.slug;
  options.year = $stateParams.year !== undefined ? $stateParams.year : getOptions.year;
  options.date = $stateParams.date !== undefined ? $stateParams.date : getOptions.date;

  $ionicModal.fromTemplateUrl("views/daycard-notification.html", {
    scope: $scope,
    animation: "slide-in-bottom"
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
    $scope.time = "21:00";
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.registerLocalNotification = function(notificationForm) {
    var time = notificationForm.time.$modelValue;

    localNotification.registerLocalNotification(time, options.slug);
    $scope.modal.hide();
      // .then(
      //   function(response) {
      //     console.log("registerLocalNotification success", response);
      //     $scope.modal.hide();
      // },
      //   function(reason){
      //     console.log("registerLocalNotification error", reason);
      //     $scope.modal.hide();
      //   }
      // );
  };
  $scope.cancelAllNotifications = function() {
    localNotification.cancelAllNotifications();
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on("$destroy", function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on("modal.hidden", function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on("modal.removed", function() {
    // Execute action
  });

  Day
    .get({ slug: options.slug, year: options.year })
    .$promise
    .then(function(data) {

      var tDayCard = {};
      var week = [];
      var maxDate = moment();

      var found = false;
      _.each(data.schedule, function(month) {
        _.each(month.days, function(day) {
          var currentDate = moment(day.date);
          var formattedDay = date2string.toString(new Date(day.date));
          if ( formattedDay === options.date ) {
            found = true;
            maxDate = currentDate.add(6, "days");
            tDayCard = day;
            week.push(day);
            return;
          }
          if ( found && currentDate <= maxDate ) {
            week.push(day);
          }
        });
      });

      var tomorrow = new Date(tDayCard.date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      var formattedTomorrow = date2string.toString(tomorrow);

      info = {
        city: data.city,
        week: week,
        day: tDayCard,
        activeSlide: 1, // start from tomorrow
        tomorrow: formattedTomorrow,
        slug: options.slug,
        year: options.year
      };

      if (
          $cordovaDevice.getPlatform() === "Android" &&
          parseInt($cordovaDevice.getVersion()) >= 4
          ) {
        info.canHaveNotification = true;
      }

      $scope.info = info;

  });

});
