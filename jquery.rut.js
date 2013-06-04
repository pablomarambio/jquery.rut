// (c) 2013 Pablo Marambio Cathalifaud
// Todos los derechos reservados
// https://github.com/pablomarambio/jquery.rut


// Licencia de uso
// ---------------
//
// (1) Este código puede ser usado con fines comerciales 
// a un valor de USD 25 por 1 año o USD 100 por 100 años.
// (2) Instituciones sin fines de lucro y personas
// naturales pueden usarlo sin costo alguno siempre
// que sea para fines educativos o pruebas. En este
// segundo caso, el código estará regido por la licencia
// GPlv3 (https://gnu.org/licenses/gpl.html)
;(function($){
	var defaults = {
		validateOn: 'keyup',
		formatOn: 'keyup'
	};

	//private methods
	function clearFormat(value) {
		return value.replace(/[\.\-]/g, "");
	};
	function format(value) {
		rutAndDv = splitRutAndDv(value);
		var cRut = rutAndDv[0]; var cDv = rutAndDv[1];
		if(!(cRut && cDv)) return cRut || value;
		var rutF = "";
		while(cRut.length > 3) {
			rutF = "." + cRut.substr(cRut.length - 3) + rutF;
			cRut = cRut.substring(0, cRut.length - 3);
		}
		return cRut + rutF + "-" + cDv;
	};
	function isValidKey(key) {
		return /[0-9Kk]/.exec(key);
	};
	function isValidRut(rut) {
		if(typeof(rut) !== 'string') return false;
		var cRut = clearFormat(rut);
		if(cRut.length < 2) return false;
		var cDv = cRut.charAt(cRut.length - 1).toUpperCase();
		var nRut = parseInt(cRut.substr(0, cRut.length - 1));
		if(nRut === NaN) return false;
		return computeDv(nRut).toString().toUpperCase() === cDv;
	};
	function computeDv(rut) {
		var suma	= 0;
		var mul		= 2;
		if(typeof(rut) !== 'number') return;
		rut = rut.toString();
		for(var i=rut.length -1;i >= 0;i--) {
			suma = suma + rut.charAt(i) * mul;
			mul = ( mul + 1 ) % 8 || 2;
		}
		switch(suma % 11) {
			case 1	: return 'k';
			case 0	: return 0;
			default	: return 11 - (suma % 11);
		}
	};
	function formatInput($input) {
		$input.val(format($input.val()));
	};
	function splitRutAndDv(rut) {
		var cValue = clearFormat(rut);
		if(cValue.length == 0) return [null, null];
		if(cValue.length == 1) return [cValue, null];
		var cDv = cValue.charAt(cValue.length - 1);
		var cRut = cValue.substring(0, cValue.length - 1);
		return [cRut, cDv];
	};

	// public methods
	var methods = {
		init: function(options) {
			var that = this;
			this.opts = $.extend({}, defaults, options);
			this.opts.formatOn && this.on(this.opts.formatOn, function(e) { 
				formatInput(that);
			});
			that.opts.validateOn && this.on(that.opts.validateOn, function(e) { 
				if(isValidRut(that.val())) {
					that.trigger('rutValido', splitRutAndDv(that.val()));
				} else {
					that.trigger('rutInvalido');
				}
			});
			return this;
		}
	};

	$.fn.rut = function(methodOrOptions) {
		if(methods[methodOrOptions]) {
			return methods[methodOrOptions].apply(this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error("El método " + methodOrOptions + " no existe en jQuery.rut");
		}
	};
})(jQuery);