describe("A suite is just a function", function() {
  var a;

  it("should pass", function() {
    a = true;

    expect(a).toBe(true);
  });
});