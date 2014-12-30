describe("Filter: capitalize", function() {
  "use strict";
  var capitalizeFilter;

  beforeEach(module("aliga"));
  beforeEach(inject(function(_capitalizeFilter_) {
    capitalizeFilter = _capitalizeFilter_;
  }));

  it("should be able to transform 'abcd' to 'Abcd'", function() {
    expect(capitalizeFilter("capitalize")).toBe("Capitalize");
  });

});
