describe("A suite is just a function", function() {

  it("should load jQuery", function() {

    expect(typeof jQuery).not.toBe("undefined");
  });

  it("should load jQuery.rut", function() {

    expect(typeof jQuery.formatRut).toBe("function");
  });
  
});