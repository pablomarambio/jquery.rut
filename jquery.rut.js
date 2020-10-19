//!     jQuery.rut.js
//		Permission is hereby granted, free of charge, to any person obtaining a copy
//		of this software and associated documentation files (the "Software"), to deal
//		in the Software without restriction, including without limitation the rights
//		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//		copies of the Software, and to permit persons to whom the Software is
//		furnished to do so, subject to the following conditions:

//		The above copyright notice and this permission notice shall be included in
//		all copies or substantial portions of the Software.

//		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//		THE SOFTWARE.

//		Para obtener este programa bajo otra licencia, póngase en
//		contacto con @pablomarambio en Twitter.
;(function($){
	var defaults = {
		validateOn: 'blur',
		formatOn: 'blur',
		ignoreControlKeys: true,
		useThousandsSeparator: true,
		minimumLength: 2
	};

	//private methods
	function clearFormat(value) {
		return value.replace(/[\.\-\_]/g, "");
	}

	function format(value, useThousandsSeparator) {
		var rutAndDv = splitRutAndDv(value);
		var cRut = rutAndDv[0]; var cDv = rutAndDv[1];
		if(!(cRut && cDv)) { return cRut || value; }
		var rutF = "";
		var thousandsSeparator = useThousandsSeparator ? "." : "";
		while(cRut.length > 3) {
			rutF = thousandsSeparator + cRut.substr(cRut.length - 3) + rutF;
			cRut = cRut.substring(0, cRut.length - 3);
		}
		return cRut + rutF + "-" + cDv;
	}

	function isControlKey(e) {
		return e.type && e.type.match(/^key(up|down|press)/) &&
			(
				e.keyCode ===  8 || // del
				e.keyCode === 16 || // shift
				e.keyCode === 17 || // ctrl
				e.keyCode === 18 || // alt
				e.keyCode === 20 || // caps lock
				e.keyCode === 27 || // esc
				e.keyCode === 37 || // arrow
				e.keyCode === 38 || // arrow
				e.keyCode === 39 || // arrow
				e.keyCode === 40 || // arrow
				e.keyCode === 91    // command
			);
	}

	function isValidRut(rut, options) {
		if(typeof(rut) !== 'string') { return false; }
		var cRut = clearFormat(rut);
		// validar por largo mínimo, sin guiones ni puntos:
		// x.xxx.xxx-x
		if ( typeof options.minimumLength === 'boolean' ) {
			if ( options.minimumLength && cRut.length < defaults.minimumLength ) {
				return false;
			}
		} else {
			var minLength = parseInt( options.minimumLength, 10 );
			if ( cRut.length < minLength ) {
				return false;
			}
		}
		var cDv = cRut.charAt(cRut.length - 1).toUpperCase();
		var nRut = parseInt(cRut.substr(0, cRut.length - 1));
		if(isNaN(nRut)){ return false; }
		return computeDv(nRut).toString().toUpperCase() === cDv;
	}

	function computeDv(rut) {
		var suma	= 0;
		var mul		= 2;
		if(typeof(rut) !== 'number') { return; }
		rut = rut.toString();
		for(var i=rut.length -1;i >= 0;i--) {
			suma = suma + rut.charAt(i) * mul;
			mul = ( mul + 1 ) % 8 || 2;
		}
		switch(suma % 11) {
			case 1	: return 'k';
			case 0	: return 0;
			default	: return 11 - (suma % 11);
		}
	}

	function formatInput($input, useThousandsSeparator) {
		$input.val(format($input.val(), useThousandsSeparator));
	}

	function validateInput($input) {
		if(isValidRut($input.val(), $input.opts)) {
			$input.trigger('rutValido', splitRutAndDv($input.val()));
		} else {
			$input.trigger('rutInvalido');
		}
	}

	function splitRutAndDv(rut) {
		var cValue = clearFormat(rut);
		if(cValue.length === 0) { return [null, null]; }
		if(cValue.length === 1) { return [cValue, null]; }
		var cDv = cValue.charAt(cValue.length - 1);
		var cRut = cValue.substring(0, cValue.length - 1);
		return [cRut, cDv];
	}

	// public methods
	var methods = {
		init: function(options) {
			if (this.length > 1) {
				/* Valida multiples objetos a la vez */
				for (var i = 0; i < this.length; i++) {
					console.log(this[i]);
					$(this[i]).rut(options);
				}
			} else {
				var that = this;
				that.opts = $.extend({}, defaults, options);
				that.opts.formatOn && that.on(that.opts.formatOn, function(e) {
					if(that.opts.ignoreControlKeys && isControlKey(e)) { return; }
					formatInput(that, that.opts.useThousandsSeparator);
				});
				that.opts.validateOn && that.on(that.opts.validateOn, function() {
					validateInput(that);
				});
			}
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

	$.formatRut = function (rut, useThousandsSeparator) {
		if(useThousandsSeparator===undefined) { useThousandsSeparator = true; }
		return format(rut, useThousandsSeparator);
	};

	$.computeDv = function(rut){
		var cleanRut = clearFormat(rut);
		return computeDv( parseInt(cleanRut, 10) );
	};

	$.validateRut = function(rut, fn, options) {
		options = options || {};
		if(isValidRut(rut, options)) {
			var rd = splitRutAndDv(rut);
			$.isFunction(fn) && fn(rd[0], rd[1]);
			return true;
		} else {
			return false;
		}
	};
})(jQuery);
