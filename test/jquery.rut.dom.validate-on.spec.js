describe("jquery.rut validateOn", function() {
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
    jQuery("#txt2").remove();
  });

  it ("should validate a short rut as it is typed into a textbox", function() {
    validRuts = [];
    invalidRuts = [];
    $("#txtRut")
      .rut({validateOn: 'keydown'})
      .on("rutValido", function(e, rut, dv) {
        validRuts.push($(this).val());
      })
      .on("rutInvalido", function(e) {
        invalidRuts.push($(this).val());
      });
    $("#txtRut").focus();
    keyPress(1, $("#txtRut"));
    keyPress(9, $("#txtRut"));
    expect(validRuts.length).toBe(1);
    expect(validRuts).toContain("19");
    expect(invalidRuts.length).toBe(1);
    expect(invalidRuts).toContain("1");
  });

  it ("should validate a long rut as it is typed into a textbox", function() {
    validRuts = [];
    invalidRuts = [];
    $("#txtRut")
      .rut({validateOn: 'keydown'})
      .on("rutValido", function(e, rut, dv) {
        validRuts.push($(this).val());
      })
      .on("rutInvalido", function(e) {
        invalidRuts.push($(this).val());
      });
    $("#txtRut").focus();
    keyPress(1, $("#txtRut"));
    keyPress(5, $("#txtRut"));
    keyPress(7, $("#txtRut"));
    keyPress(7, $("#txtRut"));
    keyPress(6, $("#txtRut"));
    keyPress(8, $("#txtRut"));
    keyPress(4, $("#txtRut"));
    keyPress(4, $("#txtRut"));
    keyPress(1, $("#txtRut"));
    expect(validRuts.length).toBe(2);
    expect(validRuts).toContain("15776");
    expect(validRuts).toContain("157768441");
    expect(invalidRuts.length).toBe(7);
    expect(invalidRuts).not.toContain("15776");
    expect(invalidRuts).not.toContain("157768441");
  });
});