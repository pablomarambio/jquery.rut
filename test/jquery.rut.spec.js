describe("jquery.rut", function() {
  var a;

  it("should load jQuery", function() {

    expect(typeof jQuery).not.toBe("undefined");
  });
  it("should load jQuery.rut", function() {

    expect(typeof jQuery.formatRut).toBe("function");
  });
});