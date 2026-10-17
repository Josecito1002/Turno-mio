/* eslint-disable @typescript-eslint/no-explicit-any */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hastaDesde, rondasDe, rondasRestantes, textoDuracion, vencerCondiciones, hastaDe, quitarConcentracion, repeticionesDe, quitarCondicion } from './duracion';

test('lee cuántas rondas dura un efecto', () => {
  assert.equal(rondasDe('Concentración, hasta 1 minuto'), 10);
  assert.equal(rondasDe('durante 10 minutos'), 100);
  assert.equal(rondasDe('Hasta el final de tu siguiente turno'), 1);
  assert.equal(rondasDe('una hora'), 600);
  assert.equal(rondasDe('Instantáneo'), null);
  assert.equal(rondasDe('8 horas'), null);
});

test('1 minuto dura 10 turnos de quien lo causó y termina al empezar el suyo', () => {
  const orden = [{ k: 'a' }, { k: 'b' }, { k: 'c' }];
  const h = hastaDesde(10, 2, 'b');
  assert.equal(rondasRestantes(h, { ronda: 2, turno: 1, orden }), 10);
  assert.equal(rondasRestantes(h, { ronda: 11, turno: 2, orden }), 1);
  assert.equal(rondasRestantes(h, { ronda: 12, turno: 0, orden }), 0);
  assert.equal(rondasRestantes(h, { ronda: 12, turno: 1, orden }), null);
  // quien lo causó salió del combate: termina al pasar su ronda
  assert.equal(rondasRestantes(h, { ronda: 12, turno: 1, orden: [{ k: 'a' }] }), 0);
  assert.equal(rondasRestantes(h, { ronda: 13, turno: 0, orden: [{ k: 'a' }] }), null);
});

test('escribe la duración', () => {
  assert.equal(textoDuracion(10), '1 minuto (10 rondas)');
  assert.equal(textoDuracion(1), '1 ronda');
  assert.equal(textoDuracion(600), '1 hora');
});

test('quita las condiciones que ya terminaron', () => {
  const estado: Record<string, any> = { 'm:1': { cond: ['Paralizado', 'Derribado'], dur: { Paralizado: 'x' }, hasta: { Paralizado: { ronda: 2, k: 'pj:a' } } } };
  const cb = { ronda: 2, turno: 0, orden: [{ k: 'pj:a' }, { k: 'm:1' }] };
  assert.deepEqual(vencerCondiciones(estado, { ...cb, ronda: 1, turno: 1 }), []);
  assert.deepEqual(vencerCondiciones(estado, cb, k => k === 'm:1' ? 'Goblin' : k), ['Goblin: Paralizado']);
  assert.deepEqual(estado['m:1'].cond, ['Derribado']);
  assert.equal(estado['m:1'].dur.Paralizado, undefined);
});

test('hasta el final o el inicio de un turno', () => {
  const cb = { ronda: 3, turno: 1, orden: [{ k: 'a' }, { k: 'b' }, { k: 'c' }] };
  // b lanza en su turno: "1 minuto" termina al empezar su turno 10 rondas después
  assert.deepEqual(hastaDe('Concentración, hasta 1 minuto', cb, 'b'), { rondas: 10, hasta: { ronda: 13, k: 'b' } });
  // "el final de tu siguiente turno": cuando empieza c en la ronda siguiente
  assert.deepEqual(hastaDe('hasta el final de tu siguiente turno', cb, 'b', 'a'), { rondas: 1, hasta: { ronda: 4, k: 'c' } });
  // "de su siguiente turno" es el del objetivo: c todavía no jugó esta ronda, así que termina al empezar a en la siguiente
  assert.deepEqual(hastaDe('queda Asustada hasta el final de su siguiente turno', cb, 'b', 'c')?.hasta, { ronda: 4, k: 'a' });
  // "el inicio de tu siguiente turno": al empezar b en la ronda siguiente
  assert.deepEqual(hastaDe('hasta el inicio de tu siguiente turno', cb, 'b', 'a')?.hasta, { ronda: 4, k: 'b' });
  assert.equal(hastaDe('instantáneo', cb, 'b'), null);
});

test('al perder la concentración se quita lo que dependía de ella', () => {
  const estado: Record<string, any> = {
    'm:1': { cond: ['Paralizado', 'Derribado'], conc: { Paralizado: 'p1-x' }, hasta: { Paralizado: { ronda: 9, k: 'a' } } },
    'm:2': { cond: ['Paralizado'], conc: { Paralizado: 'p2-y' } },
  };
  assert.deepEqual(quitarConcentracion(estado, 'p1-x'), ['m:1: Paralizado']);
  assert.deepEqual(estado['m:1'].cond, ['Derribado']);
  assert.deepEqual(estado['m:2'].cond, ['Paralizado']);
});

test('las salvaciones que se repiten son solo de las condiciones que siguen', () => {
  const e: any = { cond: ['Paralizado'], hasta: { Paralizado: { ronda: 5, k: 'a' } }, repite: { Paralizado: { salv: 'sab', cd: 13, de: 'Ana' }, Asustado: { salv: 'sab', cd: 13, de: 'Ana' } } };
  assert.deepEqual(repeticionesDe(e), [{ cond: 'Paralizado', r: { salv: 'sab', cd: 13, de: 'Ana' } }]);
  quitarCondicion(e, 'Paralizado');
  assert.deepEqual(e.cond, []); assert.equal(e.hasta.Paralizado, undefined); assert.equal(e.repite.Paralizado, undefined);
});
