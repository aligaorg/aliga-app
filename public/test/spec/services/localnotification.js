// describe("Factory: localNotificationService", function() {
//   "use strict";
//   var localNotification;
//   var rootScope;
//   var $q;

//   var mockData;
//   var MockCordovaLocalNotification = {
//       add: function () {
//         return jasmine.createSpy().and.returnValue(mockData);
//       }
//   };

//   beforeEach(module("localNotificationService", function($provide) {
//     $provide.value("$cordovaLocalNotification", MockCordovaLocalNotification);
//   }));

//   beforeEach(inject(function(_localNotification_, _$q_) {
//     localNotification = _localNotification_;
//     $q = _$q_;
//   }));

//   beforeEach(inject(function(_$rootScope_){
//     rootScope = _$rootScope_;
//   }));

//   it("should be able to call registerLocalNotification", function() {
//     mockData = $q.defer().promise;
//     expect(localNotification.registerLocalNotification("21:00")).toBeTruthy();
//   });
// });
