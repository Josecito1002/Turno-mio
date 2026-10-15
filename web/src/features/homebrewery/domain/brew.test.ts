import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prepararBrew, tituloDe, versionPedida } from './brew';

test('el estilo del principio pasa a la pestaña de estilo y el título sale de la portada', () => {
  const b = prepararBrew('<style>\n.page { color: red; }\n</style>\n\n{{frontCover}}\n\n# El Precio de los Deseos\n## Cinco ataúdes\n___\n\n\\page\n\nTexto', 'x.txt');
  assert.equal(b.style, '.page { color: red; }');
  assert.ok(b.text.startsWith('{{frontCover}}'));
  assert.equal(b.title, 'El Precio de los Deseos · Cinco ataúdes');
  assert.equal(b.renderer, 'V3');
});

test('sin portada ni título, se usa el nombre del archivo', () => {
  assert.equal(tituloDe('solo texto', 'Sesion_2_La_oscuridad.txt'), 'Sesion 2 La oscuridad');
  assert.equal(prepararBrew('texto\r\nmás').text, 'texto\nmás');
});

test('lee la versión que pide Homebrewery en su error 412', () => {
  assert.equal(versionPedida('{"message":"Client version 0 is out of date. Please save your changes elsewhere and refresh to pick up client version 3.24.1."}'), '3.24.1');
  assert.equal(versionPedida('otro error'), null);
});
