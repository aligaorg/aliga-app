describe("Filter: breakingbad", function() {
  "use strict";
  var breakingbadFilter;

  beforeEach(module("aliga"));
  beforeEach(inject(function(_breakingbadFilter_) {
    breakingbadFilter = _breakingbadFilter_;
  }));

  it("should be able to transform from 'abcdef' to 'Ab' an input string", function() {
    expect(breakingbadFilter("breaking")).toBe("Br");
  });

  it("should be able to transform from 'abcdef e ghilmn' to 'Ab/Gh' an input string", function() {
    expect(breakingbadFilter("breaking e bad")).toBe("Br/Ba");
  });

  it("should NOT be able to transform from 'abc def ghi' to 'Ab/De/Gh' an input string", function() {
    expect(breakingbadFilter("breaking bad sucks")).not.toBe("Br/Ba/Su");
  });
});
