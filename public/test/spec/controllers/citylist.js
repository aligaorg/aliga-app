describe("Controller: CityListCtrl", function() {
  "use strict";
  var $q,
      queryDeferred,
      $rootScope,
      $scope,
      mockCity,
      mockCityResource = [
        {
          "city": "Gotham City",
          "province": "GO",
          "slug": "gotham-city"
        },
        {
          "city": "Metropolis",
          "province": "ME",
          "slug": "metropolis"
        }
      ];

  beforeEach(module("aliga"));

  beforeEach(inject(function(_$q_, _$rootScope_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject(function($controller) {
    $scope = $rootScope.$new();

    mockCity = {
      query: function() {
        queryDeferred = $q.defer();
        return {$promise: queryDeferred.promise};
      }
    };

    spyOn(mockCity, "query").and.callThrough();

    $controller("CityListCtrl", {
      "$scope": $scope,
      "City": mockCity
    });
  }));

  describe("City.query", function() {

    beforeEach(function() {
      queryDeferred.resolve(mockCityResource);
      $rootScope.$apply();
    });

    it("should query the City", function() {
      expect(mockCity.query).toHaveBeenCalled();
    });

    it("should set the response from the CityQuery to $scope.info.cities", function() {
      expect($scope.info.cities).toEqual(mockCityResource);
    });

    it("should set $scope.info to a known mocked object", function() {
      var date = new Date();
      var year = date.getFullYear();
      date.setDate(date.getDate() + 1);
      var tomorrow = [year, date.getMonth()+1, date.getDate()].join("-");
      var tInfo = {
        cities: mockCityResource,
        year: year,
        tomorrow: tomorrow
      };
      expect($scope.info).toEqual(tInfo);
    });

    it("should set $scope.registerFavoriteCity as a function", function() {
      expect(typeof $scope.registerFavoriteCity).toBe("function");
    });
  });
});
