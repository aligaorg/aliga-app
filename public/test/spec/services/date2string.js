describe("Factory: date2stringService", function() {
  "use strict";
  var date2string;
  var date;

  beforeEach(module("date2stringService"));

  beforeEach(inject(function(_date2string_) {
    date2string = _date2string_;
    date = new Date("2011-09-10");
  }));

  it("should be able to create a new date2string", function() {
    expect(date2string.toString(date)).toBe("2011-9-10");
  });

});

