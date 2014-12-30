describe("Factory: lodashService", function() {
  "use strict";
  var _;

  beforeEach(module("lodashService"));
  beforeEach(inject(function(___) {
    _ = ___;
  }));

  it("should find elements in a collection by index", function() {
    var myCollection = ["Buffy", "Xander", "Willow", "Giles"];
    var myGirls = ["Buffy", "Willow"];
    expect(_.at(myCollection, [0, 2])).toEqual(myGirls);
  });
});

