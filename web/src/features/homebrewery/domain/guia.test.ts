import { test } from 'node:test';
import assert from 'node:assert/strict';
import { guiaABloques } from './guia';
import { paginar, type Medidor } from './paginar';
import { enLinea, extraerEntregables } from './imprimibles';

const GUIA = `# El Precio de los Deseos · Sesión 9: Prueba

## Antes de jugar

*Lo que pasa en esta sesión.*

### La sesión

Texto con {llaves} y una
segunda línea.

> **CONSEJO PARA DM NOVATO · Respira**
> Primera idea.
> Segunda idea.

> **PARA ENTREGAR A LOS JUGADORES · La nota**
> «Ven sola.»
> Firmado: nadie.

| A | B |
|---|---|
| 1 | 2 |
`;

test('la guía en Markdown se vuelve bloques de Homebrewery', () => {
  const { meta, bloques } = guiaABloques(GUIA);
  assert.deepEqual(meta, { title: 'El Precio de los Deseos', subtitle: 'Sesión 9: Prueba', running: 'El Precio de los Deseos · Sesión 9: Prueba' });
  assert.deepEqual(bloques.map((b) => b.kind), ['h1', 'deck', 'h', 'p', 'box', 'box', 'table']);
  assert.equal(bloques[3].md, 'Texto con \\{llaves\\} y una segunda línea.');
  const consejo = bloques[4];
  assert.ok(consejo.md.startsWith('{{note,tip\n{{lbl CONSEJO PARA DM}}\n##### Respira'));
  assert.deepEqual(consejo.paras, ['Primera idea.', 'Segunda idea.']);
  assert.ok(bloques[5].md.startsWith('{{descriptive,entregar\n{{lbl PARA ENTREGAR A LOS JUGADORES}}\n##### La nota'));
});

test('cada capítulo empieza página y las páginas llevan índice y pie', async () => {
  const { meta, bloques } = guiaABloques(`${GUIA}\n## Segundo capítulo\n\nAlgo más.\n`);
  // medidor de juguete: todo cabe y todo cae en la columna izquierda
  const m: Medidor = { sobra: async () => 0, cajas: async (_md, pre) => ({ n: pre ? pre.split('\n\n').length : 0, els: [], alto: 100 }) };
  const texto = await paginar(bloques, meta, m);
  const paginas = texto.split(/^\\page$/m);
  assert.equal(paginas.length, 4); // portada, índice y los dos capítulos
  assert.ok(paginas[0].startsWith('<style>') && paginas[0].includes('{{frontCover}}'));
  assert.match(paginas[1], /\[\{\{ Segundo capítulo\}\}\{\{ 4\}\}\]\(#p4\)/);
  assert.ok(paginas[3].includes('# Segundo capítulo') && paginas[3].includes('{{footnote Sesión 9: Prueba}}'));
});

test('los documentos para entregar salen de la guía y del .txt ya maquetado, también partidos', () => {
  assert.deepEqual(extraerEntregables(GUIA), [{ titulo: 'La nota', parrafos: ['«Ven sola.»', 'Firmado: nadie.'] }]);
  const txt = '{{descriptive,entregar\n{{lbl PARA ENTREGAR A LOS JUGADORES}}\n##### El diario\n*Día 1.*\n\n*Día 2.*\n}}\n\n\\column\n\n{{descriptive,entregar\n*Día 3.*\n}}\n';
  assert.deepEqual(extraerEntregables(txt), [{ titulo: 'El diario', parrafos: ['*Día 1.*', '*Día 2.*', '*Día 3.*'] }]);
  assert.equal(enLinea('***A.*** *b* <c> \\{d\\}'), '<b><i>A.</i></b> <i>b</i> &lt;c&gt; {d}');
});
