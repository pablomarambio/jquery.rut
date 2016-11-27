describe("jquery.rut formatOn", function() {
  $ = jQuery;
  var spyEvent;

  function keyPress(number, element) {
    var keydown = jQuery.Event("keydown");
    var keyup = jQuery.Event("keyup");
    keydown.which = 48 + number;
    element.val(element.val() + String.fromCharCode(keydown.which));
    element.trigger(keydown);
    element.trigger(keyup);
  }
   
  beforeEach(function() {
    jQuery("body").append(jQuery("<input type='text' id='txtRut' name='txtRut' value='' />"));
    jQuery("body").append(jQuery("<input type='text' id='txt2' name='txt2' value='' />"));
  });

  afterEach(function() {
    jQuery("#txtRut").remove();
  });

  describe ("with thousandsSeparator", function() {
  
    it ("should format a short rut as it is typed into a textbox", function() {
      $("#txtRut").rut({formatOn: 'keydown'});
      $("#txtRut").focus();
      keyPress(1, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1");
      keyPress(9, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1-9");
    });
  
    it ("should format a long rut as it is typed into a textbox", function() {
      $("#txtRut").rut({formatOn: 'keydown'});
      $("#txtRut").focus();
      keyPress(1, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1");
      keyPress(5, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1-5");
      keyPress(7, $("#txtRut"));
      expect($("#txtRut").val()).toBe("15-7");
      keyPress(7, $("#txtRut"));
      expect($("#txtRut").val()).toBe("157-7");
      keyPress(6, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1.577-6");
      keyPress(8, $("#txtRut"));
      expect($("#txtRut").val()).toBe("15.776-8");
      keyPress(4, $("#txtRut"));
      expect($("#txtRut").val()).toBe("157.768-4");
      keyPress(4, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1.577.684-4");
      keyPress(1, $("#txtRut"));
      expect($("#txtRut").val()).toBe("15.776.844-1");
    });
  });

  describe ("without thousandsSeparator", function() {
  
    it ("should format a short rut as it is typed into a textbox", function() {
      $("#txtRut").rut({formatOn: 'keydown', useThousandsSeparator:false});
      $("#txtRut").focus();
      keyPress(1, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1");
      keyPress(9, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1-9");
    });
  
    it ("should format a long rut as it is typed into a textbox", function() {
      $("#txtRut").rut({formatOn: 'keydown', useThousandsSeparator:false});
      $("#txtRut").focus();
      keyPress(1, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1");
      keyPress(5, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1-5");
      keyPress(7, $("#txtRut"));
      expect($("#txtRut").val()).toBe("15-7");
      keyPress(7, $("#txtRut"));
      expect($("#txtRut").val()).toBe("157-7");
      keyPress(6, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1577-6");
      keyPress(8, $("#txtRut"));
      expect($("#txtRut").val()).toBe("15776-8");
      keyPress(4, $("#txtRut"));
      expect($("#txtRut").val()).toBe("157768-4");
      keyPress(4, $("#txtRut"));
      expect($("#txtRut").val()).toBe("1577684-4");
      keyPress(1, $("#txtRut"));
      expect($("#txtRut").val()).toBe("15776844-1");
    });
  });

  it ("should format a short rut on change", function() {
    $("#txtRut").rut({formatOn: 'change'});
    $("#txtRut").focus();
    keyPress(1, $("#txtRut"));
    expect($("#txtRut").val()).toBe("1");
    keyPress(9, $("#txtRut"));
    expect($("#txtRut").val()).toBe("19");
    $("#txt2").focus();
    $("#txtRut").change();
    expect($("#txtRut").val()).toBe("1-9");
  });

  it ("should format a long rut on change", function() {
    $("#txtRut").rut({formatOn: 'change'});
    $("#txtRut").focus();
    keyPress(1, $("#txtRut"));
    expect($("#txtRut").val()).toBe("1");
    keyPress(5, $("#txtRut"));
    expect($("#txtRut").val()).toBe("15");
    keyPress(7, $("#txtRut"));
    expect($("#txtRut").val()).toBe("157");
    keyPress(7, $("#txtRut"));
    expect($("#txtRut").val()).toBe("1577");
    keyPress(6, $("#txtRut"));
    expect($("#txtRut").val()).toBe("15776");
    keyPress(8, $("#txtRut"));
    expect($("#txtRut").val()).toBe("157768");
    keyPress(4, $("#txtRut"));
    expect($("#txtRut").val()).toBe("1577684");
    keyPress(4, $("#txtRut"));
    expect($("#txtRut").val()).toBe("15776844");
    keyPress(1, $("#txtRut"));
    expect($("#txtRut").val()).toBe("157768441");
    $("#txt2").focus();
    $("#txtRut").change();
    expect($("#txtRut").val()).toBe("15.776.844-1");
  });

  it ("should format a short rut on blur by default", function() {
    $("#txtRut").rut();
    $("#txtRut").focus();
    keyPress(1, $("#txtRut"));
    expect($("#txtRut").val()).toBe("1");
    keyPress(9, $("#txtRut"));
    expect($("#txtRut").val()).toBe("19");
    $("#txt2").focus();
    $("#txtRut").blur();
    expect($("#txtRut").val()).toBe("1-9");
  });

  it ("should format a long rut on blur by default", function() {
    $("#txtRut").rut();
    $("#txtRut").focus();
    keyPress(1, $("#txtRut"));
    expect($("#txtRut").val()).toBe("1");
    keyPress(5, $("#txtRut"));
    expect($("#txtRut").val()).toBe("15");
    keyPress(7, $("#txtRut"));
    expect($("#txtRut").val()).toBe("157");
    keyPress(7, $("#txtRut"));
    expect($("#txtRut").val()).toBe("1577");
    keyPress(6, $("#txtRut"));
    expect($("#txtRut").val()).toBe("15776");
    keyPress(8, $("#txtRut"));
    expect($("#txtRut").val()).toBe("157768");
    keyPress(4, $("#txtRut"));
    expect($("#txtRut").val()).toBe("1577684");
    keyPress(4, $("#txtRut"));
    expect($("#txtRut").val()).toBe("15776844");
    keyPress(1, $("#txtRut"));
    expect($("#txtRut").val()).toBe("157768441");
    $("#txt2").focus();
    $("#txtRut").blur();
    expect($("#txtRut").val()).toBe("15.776.844-1");
  });
});