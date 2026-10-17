import { test } from 'node:test';
import assert from 'node:assert/strict';
import { partesTirada, textoTirada } from './dados';

test('separa los dados del número fijo', () => {
  assert.deepEqual(partesTirada('1d8+3'), { dados: '1d8', mod: 3, conDados: true });
  assert.deepEqual(partesTirada('2d6+1d4-1'), { dados: '2d6 + 1d4', mod: -1, conDados: true });
  assert.deepEqual(partesTirada('8d6'), { dados: '8d6', mod: 0, conDados: true });
  assert.deepEqual(partesTirada('4'), { dados: '', mod: 4, conDados: false });
});

test('en un crítico se duplican los dados y no el número fijo', () => {
  assert.deepEqual(partesTirada('1d8+1d6+3', true), { dados: '2d8 + 2d6', mod: 3, conDados: true });
});

test('escribe la tirada para leerla', () => {
  assert.equal(textoTirada('1d20', 5), '1d20 + 5');
  assert.equal(textoTirada('2d6', -1), '2d6 − 1');
  assert.equal(textoTirada('8d6', 0), '8d6');
});
