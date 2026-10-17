import { test } from 'node:test';
import assert from 'node:assert/strict';
import { efectoSalvacion } from './condiciones';

test('la salvación de una acción de enemigo: condición si falla y mitad del daño', () => {
  assert.deepEqual(efectoSalvacion({ cd: 11, salv: 'con', t: 'Impacto: 7 (2d4 + 2) de daño cortante, y el objetivo debe superar una salvación de Constitución CD 11 o queda Paralizado 1 minuto.' }),
    { cd: 11, salv: 'con', condicion: 'Paralizado', mitad: false });
  assert.deepEqual(efectoSalvacion({ cd: 13, salv: 'car', t: 'Hace una salvación de Carisma CD 13. Si falla, 9 (2d8) de daño psíquico y queda Asustada hasta el final de su siguiente turno; si tiene éxito, la mitad.' }),
    { cd: 13, salv: 'car', condicion: 'Asustado', mitad: true });
  assert.deepEqual(efectoSalvacion({ cd: 12, salv: 'des' }), { cd: 12, salv: 'des', mitad: false });
  assert.equal(efectoSalvacion({ t: 'queda Paralizado' }), null);
});
