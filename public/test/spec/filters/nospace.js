describe("Filter: nospace", function() {
  "use strict";
  var nospaceFilter;

  beforeEach(module("aliga"));
  beforeEach(inject(function(_nospaceFilter_) {
    nospaceFilter = _nospaceFilter_;
  }));

  it("should be able to transform 'abcd efgh' to 'abcdefgh'", function() {
    expect(nospaceFilter("no space")).toBe("nospace");
  });

});
