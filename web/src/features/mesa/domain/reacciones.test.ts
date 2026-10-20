import { test } from 'node:test';
import assert from 'node:assert/strict';
import { efectoDeReaccion, resultadoReaccion } from './reacciones';

const d = { pb: 3, car: 2 };

test('las reacciones se leen de su texto', () => {
  assert.deepEqual(efectoDeReaccion('Cuando te golpean: +5 a la CA hasta el inicio de tu próximo turno, también contra ese ataque.', d), { tipo: 'ca', bono: 5, luegoMitad: undefined });
  assert.deepEqual(efectoDeReaccion('Cuando eres atacado cuerpo a cuerpo, puedes usar tu reacción para sumar tu PB a tu CA contra ese ataque.', d), { tipo: 'ca', bono: 3, luegoMitad: undefined });
  assert.deepEqual(efectoDeReaccion('usas tu reacción para sumar tu mod. de CAR (mínimo +1) a su CA contra ese ataque.', { pb: 2, car: -1 }), { tipo: 'ca', bono: 1, luegoMitad: undefined });
  assert.deepEqual(efectoDeReaccion('con tu reacción tiras 1d8 y lo sumas a la CA del objetivo contra ese ataque; si aun así acierta, el objetivo tiene resistencia', d), { tipo: 'ca', dados: '1d8', luegoMitad: true });
  assert.deepEqual(efectoDeReaccion('Cuando un atacante que ves te golpea, reduces a la mitad el daño de ese ataque.', d), { tipo: 'mitad' });
  assert.deepEqual(efectoDeReaccion('Cuando un atacante que ves te golpea, reduces el daño a la mitad.', d), { tipo: 'mitad' });
  assert.deepEqual(efectoDeReaccion('Cuando recibes daño, puedes usar tu Reacción para obtener Resistencia a ese daño.', d), { tipo: 'mitad' });
  assert.deepEqual(efectoDeReaccion('Cuando te golpea un ataque contundente, cortante o perforante, reduces el daño en 1d10 + 7. Si queda en 0, lo devuelves.', d), { tipo: 'reduce', dados: '1d10+7' });
  // Con una característica sin número no se puede calcular: queda a mano
  assert.equal(efectoDeReaccion('con tu reacción y 1 Moxie lo reduces en 1d10 + FUE + tu nivel', d), null);
  assert.equal(efectoDeReaccion('Cuando te dañan, usas tu reacción para infligir 2d10 de fuego al atacante.', d), null);
});

test('el resultado: el ataque falla con la CA nueva, o el daño baja', () => {
  assert.deepEqual(resultadoReaccion({ tipo: 'ca', bono: 5 }, 9, 16, 19), { falla: true, dano: 0, caNueva: 21 });
  assert.deepEqual(resultadoReaccion({ tipo: 'ca', bono: 5 }, 9, 16, 21), { falla: false, dano: 9, caNueva: 21 });
  assert.deepEqual(resultadoReaccion({ tipo: 'ca', bono: 5 }, 9, 16, 99), { falla: false, dano: 9, caNueva: 21 });
  assert.equal(resultadoReaccion({ tipo: 'ca', bono: 5 }, 9, 16, null), null);
  assert.deepEqual(resultadoReaccion({ tipo: 'ca', dados: '1d8', luegoMitad: true }, 9, 16, 20, 3), { falla: false, dano: 4, caNueva: 19 });
  assert.deepEqual(resultadoReaccion({ tipo: 'mitad' }, 9, 16, 20), { falla: false, dano: 4 });
  assert.deepEqual(resultadoReaccion({ tipo: 'reduce', dados: '1d10+7' }, 9, 16, 20, 12), { falla: false, dano: 0 });
});
