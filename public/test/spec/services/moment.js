describe("Factory: momentService", function() {
  "use strict";
  var moment;
  var myMoment;

  beforeEach(module("momentService"));
  beforeEach(inject(function(_moment_) {
    moment = _moment_;
    myMoment = moment("2011-09-10");
  }));

  it("should be able to create a new moment", function() {
    expect(myMoment.year()).toBe(2011);
    expect(myMoment.month()).toBe(8);
    expect(myMoment.date()).toBe(10);
  });

  it("should be able to add some days to moment", function() {
    expect(myMoment.add(6, "days").date()).toBe(16);
  });
});

