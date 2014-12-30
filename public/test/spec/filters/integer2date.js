describe("Filter: integer2date", function() {
  "use strict";
  var integer2dateFilter;

  beforeEach(module("aliga"));
  beforeEach(inject(function(_integer2dateFilter_) {
    integer2dateFilter = _integer2dateFilter_;
  }));

  it("should be able to transform an Integer indicating a month, to a Date object", function() {
    // 9 is September, September is 8 in a Date object
    expect(integer2dateFilter(9).getMonth()).toBe(8);
  });

});
