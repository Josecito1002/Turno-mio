import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EFECTOS_ALIADO, SEGUIMIENTOS, escalarDados } from './efectos-conjuro';

test('los dados suben por nivel de espacio sobre el base', () => {
  assert.equal(escalarDados('2d8', '1d8', 2), '4d8');
  assert.equal(escalarDados('2d8', '1d8', 0), '2d8');
  assert.equal(escalarDados('2d6', undefined, 3), '2d6');
  assert.equal(escalarDados('2d6', '1d8', 1), '2d6+1d8');
});

test('Rayo de hechicería se repite como acción adicional desde el turno siguiente y Esfera de llamas el mismo turno', () => {
  assert.equal(SEGUIMIENTOS['rayo de hechiceria'].en, 'adicional');
  assert.equal(SEGUIMIENTOS['rayo de hechiceria'].desde, 'siguiente');
  assert.equal(SEGUIMIENTOS['esfera de llamas'].desde, 'ya');
  assert.equal(SEGUIMIENTOS['esfera de llamas'].salv, 'DES');
});

test('los efectos sobre aliados traen su nombre y su texto', () => {
  assert.ok(EFECTOS_ALIADO['bendicion'].bono.includes('1d4'));
  assert.ok(EFECTOS_ALIADO['inspiracion bardica'].condicion);
});
