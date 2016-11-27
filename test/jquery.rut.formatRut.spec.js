describe("jquery.rut / jQuery.formatRut", function() {
  describe ("with thousandsSeparator", function() {
    it("should format long rut without previous formatting", function() {

      var rut = "145694841";
      expect(jQuery.formatRut(rut)).toBe("14.569.484-1");
    });
    it("should format short rut without previous formatting", function() {

      var rut = "19";
      expect(jQuery.formatRut(rut)).toBe("1-9");
    });
    it("should format long rut with previous formatting", function() {

      var rut = "14.569.484-1";
      expect(jQuery.formatRut(rut)).toBe("14.569.484-1");
    });
    it("should format short rut with previous formatting", function() {

      var rut = "1-9";
      expect(jQuery.formatRut(rut)).toBe("1-9");
    });
    it("should format long rut with bad formatting 1", function() {

      var rut = "14.569.4841";
      expect(jQuery.formatRut(rut)).toBe("14.569.484-1");
    });
    it("should format long rut with bad formatting 2", function() {

      var rut = "14.5694841";
      expect(jQuery.formatRut(rut)).toBe("14.569.484-1");
    });
    it("should short long rut with bad formatting 1", function() {

      var rut = "1.9";
      expect(jQuery.formatRut(rut)).toBe("1-9");
    });
    it("should short long rut with bad formatting 2", function() {

      var rut = "1..9";
      expect(jQuery.formatRut(rut)).toBe("1-9");
    });
  });
  describe ("without thousandsSeparator", function() {
    it("should format long rut without previous formatting", function() {

      var rut = "145694841";
      expect(jQuery.formatRut(rut, false)).toBe("14569484-1");
    });
    it("should format short rut without previous formatting", function() {

      var rut = "19";
      expect(jQuery.formatRut(rut, false)).toBe("1-9");
    });
    it("should format long rut with previous formatting", function() {

      var rut = "14.569.484-1";
      expect(jQuery.formatRut(rut, false)).toBe("14569484-1");
    });
    it("should format short rut with previous formatting", function() {

      var rut = "1-9";
      expect(jQuery.formatRut(rut, false)).toBe("1-9");
    });
    it("should format long rut with bad formatting 1", function() {

      var rut = "14.569.4841";
      expect(jQuery.formatRut(rut, false)).toBe("14569484-1");
    });
    it("should format long rut with bad formatting 2", function() {

      var rut = "14.5694841";
      expect(jQuery.formatRut(rut, false)).toBe("14569484-1");
    });
    it("should short long rut with bad formatting 1", function() {

      var rut = "1.9";
      expect(jQuery.formatRut(rut, false)).toBe("1-9");
    });
    it("should short long rut with bad formatting 2", function() {

      var rut = "1..9";
      expect(jQuery.formatRut(rut, false)).toBe("1-9");
    });
  });
});