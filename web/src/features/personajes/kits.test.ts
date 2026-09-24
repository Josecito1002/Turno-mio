/* eslint-disable @typescript-eslint/no-explicit-any */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { agregarAporte, quitarAporte } from './acciones';

const pjBase = () => ({ armas: [['daga', 1]] as any[], armadura: 'ninguna', escudo: false, inventario: 'Cuerda', oro: 5 });
const kit = () => ({ armas: [['daga', 2], ['maza', 1]] as [string, number][], armadura: 'cuero', escudo: true, bloque: 'De la clase (Prueba):\n- Mochila', oro: 10 });

test('quitar un kit devuelve el personaje a como estaba', () => {
  const pj: any = pjBase(), ap = agregarAporte(pj, kit());
  assert.deepEqual(pj.armas, [['daga', 3], ['maza', 1]]);
  assert.equal(pj.oro, 15);
  quitarAporte(pj, ap);
  assert.deepEqual(pj, pjBase());
});

test('si cambiaste la armadura después, quitar el kit no la toca; el oro no baja de 0', () => {
  const pj: any = pjBase(), ap = agregarAporte(pj, kit());
  pj.armadura = 'mallas'; pj.oro = 3;
  quitarAporte(pj, ap);
  assert.equal(pj.armadura, 'mallas');
  assert.equal(pj.oro, 0);
  assert.equal(pj.inventario, 'Cuerda');
});
