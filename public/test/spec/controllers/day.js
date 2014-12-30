// describe("Controller: DayCtrl", function() {
//   "use strict";
//   var $q,
//       getDeferred,
//       $rootScope,
//       $scope,
//       mockDay,
//       mockDayResource = {
//         "city": "San Sperate",
//         "year": 2014,
//         "schedule": [
//           {
//             "month": 1,
//             "days": [
//               {
//                 "date": "2014-01-29",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               },
//               {
//                 "date": "2014-01-30",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               },
//               {
//                 "date": "2014-01-31",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               }
//             ]
//           },
//           {
//             "month": 2,
//             "days": [
//               {
//                 "date": "2014-02-01",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               },
//               {
//                 "date": "2014-02-02",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               },
//               {
//                 "date": "2014-02-03",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               },
//               {
//                 "date": "2014-02-04",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               },
//               {
//                 "date": "2014-02-05",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               },
//               {
//                 "date": "2014-02-06",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               },
//               {
//                 "date": "2014-02-07",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               },
//               {
//                 "date": "2014-02-08",
//                 "zones": [
//                   {
//                     "name": "Zona unica",
//                     "types": null
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       },
//       mockGetOptions = {
//         slug: "san-sperate",
//         year: "2014",
//         date: "2014-1-29"
//       },
//       mockWeek2Months = [
//         {
//           "date": "2014-01-29",
//           "zones": [
//             {
//               "name": "Zona unica",
//               "types": null
//             }
//           ]
//         },
//         {
//           "date": "2014-01-30",
//           "zones": [
//             {
//               "name": "Zona unica",
//               "types": null
//             }
//           ]
//         },
//         {
//           "date": "2014-01-31",
//           "zones": [
//             {
//               "name": "Zona unica",
//               "types": null
//             }
//           ]
//         },
//         {
//           "date": "2014-02-01",
//           "zones": [
//             {
//               "name": "Zona unica",
//               "types": null
//             }
//           ]
//         },
//         {
//           "date": "2014-02-02",
//           "zones": [
//             {
//               "name": "Zona unica",
//               "types": null
//             }
//           ]
//         },
//         {
//           "date": "2014-02-03",
//           "zones": [
//             {
//               "name": "Zona unica",
//               "types": null
//             }
//           ]
//         },
//         {
//           "date": "2014-02-04",
//           "zones": [
//             {
//               "name": "Zona unica",
//               "types": null
//             }
//           ]
//         }
//       ];

//   beforeEach(module("aliga"));

//   beforeEach(inject(function(_$q_, _$rootScope_) {
//     $q = _$q_;
//     $rootScope = _$rootScope_;
//   }));

//   beforeEach(inject(function($controller) {
//     $scope = $rootScope.$new();

//     mockDay = {
//       get: function() {
//         getDeferred = $q.defer();
//         return {$promise: getDeferred.promise};
//       }
//     };

//     spyOn(mockDay, "get").and.callThrough();

//     $controller("DayCtrl", {
//       "$scope": $scope,
//       "getOptions": mockGetOptions,
//       "Day": mockDay
//     });
//   }));

//   describe("Day.get", function() {

//     beforeEach(inject(function($httpBackend) {
//       $httpBackend.when("GET", "views/daycard-notification.html").respond("");
//     }));

//     beforeEach(function() {
//       getDeferred.resolve(mockDayResource);
//       $rootScope.$apply();
//     });

//     it("should get the Day", function() {
//       expect(mockDay.get).toHaveBeenCalled();
//     });

//     it("should set the response.city from the Dayget to $scope.info.city", function() {
//       expect($scope.info.city).toEqual(mockDayResource.city);
//     });

//     it("should set a full week in between two different months", function() {
//       expect($scope.info.week).toEqual(mockWeek2Months);
//     });

//     it("should set the active slide to 1 – the second", function() {
//       expect($scope.info.activeSlide).toBe(1);
//     });

//     it("should set info.slug to getOptions.slug", function() {
//       expect($scope.info.slug).toEqual(mockGetOptions.slug);
//     });

//     it("should set info.year to getOptions.year", function() {
//       expect($scope.info.year).toEqual(mockGetOptions.year);
//     });

//   });
// });
