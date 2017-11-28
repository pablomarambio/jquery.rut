## jQuery.rut [![Code Climate](https://codeclimate.com/github/pablomarambio/jquery.rut.png)](https://codeclimate.com/github/pablomarambio/jquery.rut) [![TravisCI](https://travis-ci.org/pablomarambio/jquery.rut.svg?branch=master)](https://travis-ci.org/pablomarambio/jquery.rut/)

Plugin de jQuery para formateo y validación de RUTs. Puede validar y decorar el rut *en vivo*, mientras se escribe. Testeado en distintos browsers [de forma automática](https://travis-ci.org/pablomarambio/jquery.rut/).

### TL; DR (Muy largo, me da lata leer)
Baja el archivo `jquery.rut.js` y déjalo en la raíz de tu proyecto. Linkéalo a tu html pegando esto en el head: `<script src="jquery.rut.js"></script>`. Asumiendo que tu página tiene un `<input type="test" id="rut" name="rut" />`, donde el usuario escribe el rut, puedes formatear y validar su contenido incluyendo este código al final de tu página:
```javascript
<script>
$(function() {
    $("#rut").rut().on('rutValido', function(e, rut, dv) {
        alert("El rut " + rut + "-" + dv + " es correcto");
    }, { minimumLength: 7} );
})
</script>
```

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

// si no se quiere mostrar el punto para separador de miles, 
// pasar la opción useThousandsSeparator : false
$("input#rut").rut({useThousandsSeparator : false}); //formateará '145694841' como '14569484-1'
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

// el segundo argumento opcional permite omitir los puntos
$.formatRut(rut, false); // => "14569484-1";
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

$.validateRut("1-9", function(r, dv) {
	alert("nunca me verás"); // este mensaje no aparecerá ...
}, { minimumLength: 4 }); // ... porque los ruts de largo inferior a 4 no se consideran válidos
```

### Requisitos y limitaciones

- Para usar el plugin, inclúyelo en una página que cuente con jQuery 1.4+
- Sólo funciona con inputs de tipo texto

### Contribuir
**Lista de bugs e ideas.** Si encontraste un bug, por favor [regístralo acá](https://github.com/pablomarambio/jquery.rut/issues). El mismo lugar sirve para discutir nuevas ideas.

**Patches.** Si quieres incluir un cambio tú mismo, eres bienvenido! Simplemente [crea un pull request](https://github.com/pablomarambio/jquery.rut/pulls). 

**Tests.** El repositorio cuenta con más de 50 tests que se corren de manera automática en Safari, Firefox y Chrome. Para correrlos, haz:
```sh
npm install
npm test
```

Para ejecutar los tests debes tener node.js y Firefox, Chrome y Safari. Si no quieres probar en todos los browsers, puedes cambiar la lista de browsers a probar en `/karma.conf.js`.

Si vas a hacer un cambio, éste debe pasar todos los tests y *debe incluir sus propios tests*. Al menos deben pasar en Firefox38, que es el browser usado por [Travis](https://travis-ci.org/pablomarambio/jquery.rut/).

### Licencia

Este plugin y todo el código contenido en este repositorio está regido por la licencia MIT

