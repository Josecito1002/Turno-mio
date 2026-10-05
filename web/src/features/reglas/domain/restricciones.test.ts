import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { esDote, esDoteOrigen, esDoteMejora } from './restricciones';

describe('dotes de playtest', () => {
  it('cuentan como dotes aunque su categoría lleve la etiqueta (Playtest)', () => {
    assert.ok(esDote({ cat: 'Origen (Playtest)' }));
    assert.ok(esDote({ cat: 'Épica (Playtest)' }));
    assert.ok(esDote({ cat: 'Wild Talent (Playtest)' }));
    assert.ok(esDote({ cat: 'Ceremorphosis (Playtest)' }));
    assert.ok(!esDote({ cat: 'Pack' }));
  });
  it('las de origen de playtest valen como dotes de origen', () => {
    assert.ok(esDoteOrigen('lib:trapper', { cat: 'Origen (Playtest)' }));
    assert.ok(!esDoteOrigen('lib:atmokinesis', { cat: 'Wild Talent (Playtest)' }));
  });
  it('las épicas de playtest solo sirven desde su nivel mínimo', () => {
    const d = { cat: 'Épica (Playtest)', nivelMin: 19 };
    assert.ok(!esDoteMejora('lib:boon', d, 18));
    assert.ok(esDoteMejora('lib:boon', d, 19));
  });
});
