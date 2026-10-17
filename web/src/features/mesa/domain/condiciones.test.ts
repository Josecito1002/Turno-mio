import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contraObjetivo, efectoSalvacion, fallaSola, incapacidad, repiteSalvacion } from './condiciones';

test('la salvación de una acción de enemigo: condición si falla y mitad del daño', () => {
  assert.deepEqual(efectoSalvacion({ cd: 11, salv: 'con', t: 'Impacto: 7 (2d4 + 2) de daño cortante, y el objetivo debe superar una salvación de Constitución CD 11 o queda Paralizado 1 minuto.' }),
    { cd: 11, salv: 'con', condicion: 'Paralizado', mitad: false });
  assert.deepEqual(efectoSalvacion({ cd: 13, salv: 'car', t: 'Hace una salvación de Carisma CD 13. Si falla, 9 (2d8) de daño psíquico y queda Asustada hasta el final de su siguiente turno; si tiene éxito, la mitad.' }),
    { cd: 13, salv: 'car', condicion: 'Asustado', mitad: true });
  assert.deepEqual(efectoSalvacion({ cd: 12, salv: 'des' }), { cd: 12, salv: 'des', mitad: false });
  assert.equal(efectoSalvacion({ t: 'queda Paralizado' }), null);
});

test('reconoce la salvación que se repite al final de cada turno', () => {
  assert.ok(repiteSalvacion('Un humanoide queda Paralizado 1 minuto; repite la salvación al final de sus turnos.'));
  assert.ok(repiteSalvacion('Al final de cada uno de sus turnos, el objetivo repite la tirada de salvación y, si tiene éxito, se librará.'));
  assert.ok(repiteSalvacion('Hace una tirada de salvación de Constitución al final de cada uno de sus turnos.'));
  assert.ok(!repiteSalvacion('Si fallas una salvación, puedes repetirla con tu reacción.'));
  assert.ok(!repiteSalvacion('Queda Asustada hasta el final de su siguiente turno.'));
});

test('quien está paralizado pierde el turno, falla FUE y DES, y lo atacan con ventaja', () => {
  assert.equal(incapacidad(['Derribado', 'Paralizado'])?.cond, 'Paralizado');
  assert.equal(incapacidad(['Derribado']), null);
  assert.deepEqual(contraObjetivo(['Paralizado']), { ventaja: 'Paralizado', critCerca: 'Paralizado' });
  assert.deepEqual(contraObjetivo(['Aturdido']), { ventaja: 'Aturdido', critCerca: null });
  assert.equal(fallaSola(['Paralizado'], 'DES'), 'Paralizado');
  assert.equal(fallaSola(['Paralizado'], 'sab'), null);
});
