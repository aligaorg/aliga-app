// Tests here

describe("Factory: favoriteCityService", function() {
  "use strict";
  var favCity;
  var rootScope;
  var $q;

  var PouchDBGetMockData;

  beforeEach(module("favoriteCityService", function ($provide) {
    $provide.decorator("PouchDB", function () {
      // console.log("$delegate", $delegate);
      return function PouchDB() {
        return {
          get: jasmine.createSpy().and.returnValue(PouchDBGetMockData)
        };
      };
    });
  }));

  beforeEach(inject(function(_favCity_, _$q_) {
    favCity = _favCity_;
    $q = _$q_;
  }));

  beforeEach( inject( function(_$rootScope_){
    rootScope = _$rootScope_;
  }));

  it("should be able to call getFavoriteCity", function() {
    PouchDBGetMockData = $q.defer().promise;
    expect(favCity.getFavoriteCity()).toBeTruthy();
  });

  it("should return the response if success", function() {
    var defer = $q.defer();
    PouchDBGetMockData = defer.promise;
    defer.resolve({});

    var res;
    favCity.getFavoriteCity().then(function (response) {
      res = response;
    });
    rootScope.$digest();
    expect(res).toBeTruthy();
  });

  it("should return the mocked 'wien' if success", function() {
    var defer = $q.defer();
    PouchDBGetMockData = defer.promise;
    defer.resolve({ favoriteCity: "wien" });

    var res;
    favCity.getFavoriteCity().then(function (response) {
      res = response;
    });
    rootScope.$digest();
    expect(res.favoriteCity).toBe("wien");
  });
});
