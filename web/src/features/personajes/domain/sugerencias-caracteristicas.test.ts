/* eslint-disable @typescript-eslint/no-explicit-any */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aplicarOrden, sugerenciaDe } from './sugerencias-caracteristicas';

test('cada clase tiene sus seis características ordenadas', () => {
  for (const c of ['artifice', 'barbaro', 'bardo', 'brujo', 'clerigo', 'druida', 'explorador', 'guerrero', 'hechicero', 'mago', 'monje', 'paladin', 'picaro']) {
    const s = sugerenciaDe(c)!;
    assert.equal(new Set(s.orden).size, 6, c);
  }
  assert.equal(sugerenciaDe('desconocida'), null);
});
test('una subclase con ajuste cambia el orden y las demás siguen la clase', () => {
  assert.deepEqual(sugerenciaDe('picaro', 'Embaucador Arcano')!.orden.slice(0, 2), ['des', 'int']);
  assert.equal(sugerenciaDe('picaro', 'Embaucador Arcano')!.esSub, true);
  assert.equal(sugerenciaDe('picaro', 'Ladrón')!.esSub, false);
  assert.deepEqual(sugerenciaDe('clerigo', 'Dominio del Engaño')!.orden.slice(0, 3), ['sab', 'con', 'des']);
});
test('repartir pone el valor mayor en la característica más importante', () => {
  const g: any = { metodo: 'tirar', valores: [10, 15, 8, 14, 12, 13], asig: {} };
  assert.equal(aplicarOrden(g, ['sab', 'con', 'des', 'int', 'car', 'fue']), true);
  assert.equal(g.valores[g.asig.sab], 15); assert.equal(g.valores[g.asig.con], 14); assert.equal(g.valores[g.asig.fue], 8);
  assert.equal(aplicarOrden({ metodo: 'tirar', valores: [10], asig: {} }, ['sab', 'con', 'des', 'int', 'car', 'fue']), false);
  assert.equal(aplicarOrden({ metodo: 'manual' }, ['sab', 'con', 'des', 'int', 'car', 'fue']), false);
  const c: any = { metodo: 'compra', compra: {} };
  aplicarOrden(c, ['fue', 'con', 'des', 'sab', 'car', 'int']);
  assert.equal(c.compra.fue, 15); assert.equal(c.compra.int, 8);
});
