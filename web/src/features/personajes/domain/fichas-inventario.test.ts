import { test } from 'node:test';
import assert from 'node:assert/strict';
import { equipoDe, fichaArma, fichaArmadura, fichaMagico, fichaObjeto } from './fichas-inventario';
import { ARMAS } from '@/features/reglas/data/equipo';
import { OBJETOS_MAGICOS } from '@/features/reglas/data/objetos-magicos';

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

test('fichas del inventario: dibujos de armas, pociones y objetos de la campaña', () => {
  assert.equal(fichaArma(ARMAS.daga, 'https://x').imagen, 'https://x/fichas/equipo/daga.jpg');
  assert.equal(fichaArma(ARMAS.espada_larga, 'https://x').imagen, '');
  assert.equal(fichaMagico(OBJETOS_MAGICOS['pocion-curacion-mayor'], '', 'pocion-curacion-mayor', 'https://x').imagen, 'https://x/fichas/equipo/pocion-curacion-mayor.jpg');
  const e = fichaObjeto({ n: 'Escudo de serpientes', q: 1 }, 'https://x');
  assert.deepEqual([e.tipo, e.imagen], ['Escudo · 50 po', 'https://x/fichas/equipo/escudo-serpientes.jpg']);
  assert.equal(equipoDe('Escudo'), undefined);
});
