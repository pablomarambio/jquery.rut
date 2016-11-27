describe("jquery.rut / jQuery.validateRut", function() {
  describe("minimum length default", function() {
    it("should validate long rut without formatting", function() {
      var rut = "145694841";
      expect(jQuery.validateRut(rut)).toBe(true);
    });
    it("should validate short rut without formatting", function() {
      var rut = "19";
      expect(jQuery.validateRut(rut)).toBe(true);
    });
    it("should not validate invalid long rut without formatting", function() {
      var rut = "145694842";
      expect(jQuery.validateRut(rut)).toBe(false);
    });
    it("should not validate invalid short rut without formatting", function() {
      var rut = "17";
      expect(jQuery.validateRut(rut)).toBe(false);
    });
    it("should validate and split long rut without formatting", function() {
      var rut = "145694841";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(rut).toBe("14569484");
        expect(dv).toBe("1");
      });
    });
    it("should validate and split long rut with formatting", function() {
      var rut = "14.569.484-1";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(rut).toBe("14569484");
        expect(dv).toBe("1");
      });
    });
    it("should validate and split long rut with bad formatting", function() {
      var rut = "14.5694841";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(rut).toBe("14569484");
        expect(dv).toBe("1");
      });
    });
    it("should validate and split short rut without formatting", function() {
      var rut = "19";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(rut).toBe("1");
        expect(dv).toBe("9");
      });
    });
    it("should validate and split short rut with formatting", function() {
      var rut = "1-9";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(rut).toBe("1");
        expect(dv).toBe("9");
      });
    });
    it("should validate and split short rut with bad formatting", function() {
      var rut = "1.9";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(rut).toBe("1");
        expect(dv).toBe("9");
      });
    });
    it("should not validate and split invalid short rut", function() {
      var rut = "1.7";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(1).toBe(0); // assert false
      });
    });
    it("should not validate and split invalid long rut", function() {
      var rut = "145694842";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(1).toBe(0); // assert false
      });
    });
  });

  describe("minimum length = 5", function() {
    it("should validate long rut without formatting", function() {
      var rut = "145694841";
      expect(jQuery.validateRut(rut, undefined, {minimumLength:5})).toBe(true);
    });
    it("should validate short rut without formatting", function() {
      var rut = "19";
      expect(jQuery.validateRut(rut, undefined, {minimumLength:5})).toBe(false);
    });
    it("should not validate invalid long rut without formatting", function() {
      var rut = "145694842";
      expect(jQuery.validateRut(rut, undefined, {minimumLength:5})).toBe(false);
    });
    it("should not validate invalid short rut without formatting", function() {
      var rut = "17";
      expect(jQuery.validateRut(rut, undefined, {minimumLength:5})).toBe(false);
    });
    it("should validate and split long rut without formatting", function() {
      var rut = "145694841";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(rut).toBe("14569484");
        expect(dv).toBe("1");
      }, {minimumLength:5});
    });
    it("should validate and split long rut with formatting", function() {
      var rut = "14.569.484-1";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(rut).toBe("14569484");
        expect(dv).toBe("1");
      }, {minimumLength:5});
    });
    it("should validate and split long rut with bad formatting", function() {
      var rut = "14.5694841";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(rut).toBe("14569484");
        expect(dv).toBe("1");
      }, {minimumLength:5});
    });
    it("should validate and split short rut without formatting", function() {
      var rut = "19";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(1).toBe(0); // assert false
      }, {minimumLength:5});
    });
    it("should validate and split short rut with formatting", function() {
      var rut = "1-9";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(1).toBe(0); // assert false
      }, {minimumLength:5});
    });
    it("should validate and split short rut with bad formatting", function() {
      var rut = "1.9";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(1).toBe(0); // assert false
      }, {minimumLength:5});
    });
    it("should not validate and split invalid short rut", function() {
      var rut = "1.7";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(1).toBe(0); // assert false
      }, {minimumLength:5});
    });
    it("should not validate and split invalid long rut", function() {
      var rut = "145694842";
      jQuery.validateRut(rut, function(rut, dv) {
        expect(1).toBe(0); // assert false
      }, {minimumLength:5});
    });
  });

});