describe("jquery.rut", function() {
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
    $("#txtRut").rut({formatOn: 'keydown'});
  });

  afterEach(function() {
    jQuery("#txtRut").remove();
  });

  it ("should format a short rut typed into a textbox", function() {
    $("#txtRut").focus();
    keyPress(1, $("#txtRut"));
    keyPress(9, $("#txtRut"));
    expect($("#txtRut").val()).toBe("1-9");
  });

  it ("should format a long rut typed into a textbox", function() {
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
    expect($("#txtRut").val()).toBe("15.776.844-1");
  });
});