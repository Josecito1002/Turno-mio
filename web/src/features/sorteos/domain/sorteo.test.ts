import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CONECTADO_MS, OLVIDAR_MS, girarRuleta, presentes, tirarDados, tirarMoneda, type Azar } from './sorteo';

/** Azar fijo: devuelve los números de la lista en orden */
const fijo = (...xs: number[]): Azar => () => xs.shift() ?? 1;

test('dados: suma grupos, restas y número fijo', () => {
  const r = tirarDados('2d6 - 1d4 + 3', fijo(5, 2, 4));
  assert.deepEqual(r.grupos, [{ d: 6, s: 1, vals: [5, 2] }, { d: 4, s: -1, vals: [4] }]);
  assert.equal(r.total, 5 + 2 - 4 + 3);
  assert.equal(r.expr, '2d6-1d4+3');
});

test('dados: rechaza lo que no es una tirada o se pasa de los límites', () => {
  for (const e of ['', 'hola', '3', '51d6', '1d1', '1d2000', '2d6+']) assert.throws(() => tirarDados(e, fijo()), e);
});

test('moneda', () => {
  assert.equal(tirarMoneda(fijo(1)).cara, true);
  assert.equal(tirarMoneda(fijo(2)).cara, false);
});

test('ruleta: ganadores distintos, en el orden en que salen', () => {
  // De [A,B,C,D]: sale el 3.º (C); de [A,B,D], el 3.º (D)
  assert.deepEqual(girarRuleta(['A', 'B', 'C', 'D'], 2, fijo(3, 3)).ganadores, [2, 3]);
  assert.equal(girarRuleta(['A', 'B'], 9, fijo(1, 1)).ganadores!.length, 2);
  assert.throws(() => girarRuleta(['A', ' '], 1, fijo()));
});

test('presentes: anfitrión primero, conectados antes que desconectados, olvida a los viejos', () => {
  const ahora = 1_000_000_000;
  const lista = presentes({
    a: { n: 'Zoe', v: ahora - CONECTADO_MS - 1 },
    b: { n: 'Ana', v: ahora - 1000 },
    h: { n: 'Host', v: ahora - CONECTADO_MS - 5 },
    x: { n: 'Viejo', v: ahora - OLVIDAR_MS - 1 },
  }, 'h', ahora);
  assert.deepEqual(lista.map(p => [p.nombre, p.conectado]), [['Host', false], ['Ana', true], ['Zoe', false]]);
});
