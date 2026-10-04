import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ordenar } from './combate';

test('un compañero toma la iniciativa de su dueño y va justo después de él', () => {
  const cp = { combate: { turno: 0, orden: [
    { k: 'm:g', init: 15, bono: 1 },
    { k: 'm:al-bestia', init: 3, bono: 0, con: 'pj:a' },
    { k: 'pj:a', init: 15, bono: 2 },
    { k: 'm:f', init: 9, bono: 0 },
  ] } };
  ordenar(cp);
  assert.deepEqual(cp.combate.orden.map(o => o.k), ['pj:a', 'm:al-bestia', 'm:g', 'm:f']);
  assert.equal(cp.combate.orden[1].init, 15);
});
