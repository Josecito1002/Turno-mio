/* eslint-disable @typescript-eslint/no-explicit-any */
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

test('los jugadores solo reciben de un enemigo lo que el DM reveló', async () => {
  const { datosVivos } = await import('./combate-vivo');
  const cp: any = { monstruos: [{ id: 'g', nombre: 'Lobo', ca: 13, pg: 11, pgMax: 11, bono: 2 }], pjs: [], estado: {},
    combate: { activo: true, ronda: 1, turno: 0, orden: [{ k: 'm:g', init: 10, bono: 2 }] } };
  assert.equal(datosVivos(cp).orden[0]!.info, undefined);
  cp.estado['m:g'] = { cond: [], muerte: { e: 0, f: 0 }, rev: 'b' };
  assert.deepEqual(datosVivos(cp).orden[0]!.info, { nivel: 'b', ca: 13 });
});
