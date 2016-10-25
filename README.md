## jQuery.rut [![Code Climate](https://codeclimate.com/github/pablomarambio/jquery.rut.png)](https://codeclimate.com/github/pablomarambio/jquery.rut)

Plugin de jQuery para formateo y validación de RUTs.

### Uso en input

**Ejemplos.** Para probar la funcionalidad, descarga `jquery.rut.js` y `demo.html` en una misma carpeta y abre `demo.html`en un browser.

**General.** Para activar la funcionalidad, basta invocar el método `.rut()` en objeto jQuery

```javascript
// asumiendo que la página cuenta con un input[type='text'] con 
// id "rut", la siguiente línea activa el plugin en dicho input.
$("input#rut").rut();
```

**Formateo y validación.** Por omisión, el plugin formatea cuando se gatilla el evento 'blur' del input, esto es, cuando pierde foco. Para formatear o validar en otro evento, el plugin debe invocarse con un valor distinto de `'blur'` para las opciones `'formatOn'` y `'validateOn'`. 

*Importante: Sólo se ha testeado para los eventos `'blur'` y `'keyup'`. Además, se sabe que el formato no funcionará en `'keypress'`*

```javascript
// formateará el RUT cada vez que se escriba en el campo y
// validará cuando el texto haya cambiado
$("input#rut").rut({
	formatOn: 'keyup',
    minimumLength: 8, // validar largo mínimo; default: 2
	validateOn: 'change' // si no se quiere validar, pasar null
});

// es posible pasar varios eventos separados por espacio, útil
// para validar el rut aún cuando el browser autocomplete el campo
$("input#rut").rut({validateOn: 'change keyup'});
```

**Validación del largo mínimo.** Es posible parametrizar la validación del largo mínimo del RUT. Esta opción acepta un entero (por defecto su valor es `2`) o un booleano (al utilizar `true` se utiliza el valor por defecto `2`). Técnicamente, el RUT `1-9` es válido; y existen RUTs válidos de personas vivas de 3 caracteres.

**Teclas omitidas.** Si se formatea en `keyup`, el sistema omite las teclas de control: flechas, borrar, shift, etc. Si no se quiere omitir esas teclas, usar la opción `ignoreControlKeys: false`.

La opción `ignoreControlKeys: false` **no** afecta la validación del RUT.

```javascript
// El sistema formateará el RUT incluso cuando se presionen teclas de control
$("input#rut").rut({formatOn: 'keyup', ignoreControlKeys: false});
```

**Eventos.** Cuando el plugin valida el RUT, gatilla uno de dos eventos: `rutValido` y `rutInvalido`. La página puede responder a estos eventos de la manera que encuentre apropiada. Por ejemplo,

```javascript
// muestra un mensaje de error cuando el rut es inválido
$("input#rut").rut().on('rutInvalido', function(e) {
	alert("El rut " + $(this).val() + " es inválido");
});
```

```javascript
// muestra un mensaje de alerta con el rut y el dígito 
// verificador cuando el RUT es válido
$("input#rut").rut().on('rutValido', function(e, rut, dv) {
	alert("El rut " + rut + "-" + dv + " es correcto");
});
```

Notar que cuando el rut es válido, la función recibe dos argumentos adicionales, el RUT y el dígito verificador. En este caso, el RUT no vendrá formateado.

### Uso con string

También es posible formatear y validar strings que contienen un RUT.

**Formateo.** Invocar la función `formatRut`, la que recibe el RUT a formatear.

```javascript
var rut = "145694841";
$.formatRut(rut); // => "14.569.484-1";
```

**Validación.** Invocar la función `validateRut`, la que recibe el RUT a testear y, opcionalmente, una función para procesar el rut separado de su dígito verificador.

```javascript
var rut = "145694841";
// retorna true si es válido
if($.validateRut(rut)) {
	alert("El rut es válido!");
}
// callback para recibir el RUT dividido en partes
$.validateRut(rut, function(r, dv) {
	// esta función sólo se invoca si el RUT es válido
	alert("El RUT es " + r +  "y su DV es " + dv);
});

// la función acepta un tercer parámetro como objeto que se puede
// utilizar para condicionar la validación del largo mínimo
var isValid = $.validateRut(rut, null, { minimumLength: 4 });
```

### Requisitos y limitaciones

- Para usar el plugin, inclúyelo en una página que cuente con jQuery 1.4+
- Sólo funciona con inputs de tipo texto

### Licencia

Este plugin y todo el código contenido en este repositorio está regido por la licencia MIT

