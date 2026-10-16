import { test } from 'node:test';
import assert from 'node:assert/strict';
import { equipoDe, fichaArma, fichaArmadura, fichaObjeto } from './fichas-inventario';
import { ARMAS } from '@/features/reglas/data/equipo';

test('fichas del inventario: equipo conocido, paquetes, armas y armaduras', () => {
  assert.equal(equipoDe('Antorcha (5)')?.n, 'Antorcha');
  assert.equal(equipoDe('10 antorchas')?.n, 'Antorcha');
  assert.equal(equipoDe('Útiles de sanador')?.n, 'Útiles de sanador');
  assert.equal(equipoDe('Tu herencia'), undefined);
  const a = fichaObjeto({ n: 'Antorcha (5)', q: 2 }, 'https://x');
  assert.equal(a.imagen, 'https://x/fichas/equipo/antorcha.jpg');
  assert.equal(a.tipo, 'Equipo de aventura · 2');
  const p = fichaObjeto({ n: 'Paquete de explorador (mochila, petate, cuerda)', q: 1 });
  assert.deepEqual([p.titulo, p.parrafos], ['Paquete de explorador', ['**Contiene:** mochila, petate, cuerda.']]);
  assert.deepEqual(fichaObjeto({ n: 'Llave rara', q: 1, t: 'Abre algo.' }).parrafos, ['Abre algo.']);
  const d = fichaArma(ARMAS.daga);
  assert.match(d.parrafos.join(' '), /1d4 perforante.*arrojadiza \(20\/60 pies\).*Mellar/);
  assert.match(fichaArmadura('pieles').parrafos[0], /12 \+ tu modificador de Destreza \(máximo 2\)/);
});
