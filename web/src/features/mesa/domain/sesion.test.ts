import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { enemigosDe, leerSesion } from './sesion';
import { BESTIARIO_GENERADO as CAT } from '@/features/reglas/data/generadas/bestiario';

describe('Info sesión (Mesa del DM)', () => {
  test('JSON: busca en el bestiario por nombre en inglés y crea los que no están', () => {
    const s = leerSesion(JSON.stringify({
      tipo: 'miturno-sesion', sesion: 'Sesión 3', notas: 'Llegan al puerto',
      combates: [
        { nombre: 'Emboscada', enemigos: [{ monstruo: 'Goblin Warrior', cantidad: 3 }, { monstruo: 'Capitán Rhaz', cantidad: 1 }] },
        { nombre: 'Jefe', enemigos: [{ monstruo: 'Bruja del pantano', ca: 14, pg: 60, iniciativa: 3 }] },
      ],
      monstruos: { 'Capitán Rhaz': { n: 'Capitán Rhaz', ca: 16, pg: 45, ini: 2, cr: '3', acciones: [{ n: 'Cimitarra', atk: 5, dano: [{ d: '1d6+3', tipo: 'cortante' }] }] } },
    }), 'sesion-3.json', CAT);
    assert.equal(s.nombre, 'Sesión 3');
    assert.deepEqual(s.encuentros.map(e => e.nombre), ['Emboscada', 'Jefe']);
    assert.equal(s.encuentros[0].enemigos[0].ref, 'goblin-warrior');
    assert.equal(s.encuentros[0].enemigos[1].ref, 'capitan-rhaz');
    assert.equal(s.monstruos['bruja-del-pantano'].ca, 14);
    assert.deepEqual(s.sinDatos, []);
    const enemigos = enemigosDe(s.encuentros[0], r => s.monstruos[r] || CAT[r] || null);
    assert.equal(enemigos.length, 4);
    assert.equal(enemigos[0].nombre, 'Goblin Warrior 1');
    assert.equal(enemigos[0].pgMax, 10);
    assert.equal(enemigos[3].ca, 16);
  });

  test('CSV con punto y coma: agrupa por combate y avisa de los enemigos sin datos', () => {
    const csv = 'combate;enemigo;cantidad;ca;pg;iniciativa\nCombate 1;zombie;2;;;\nCombate 1;Sombra rara;1;;;\nCombate 2;Ogro jefe;1;13;80;0\n';
    const s = leerSesion(csv, 'info-sesion-4.csv', CAT);
    assert.equal(s.nombre, 'info-sesion-4');
    assert.deepEqual(s.encuentros.map(e => [e.nombre, e.enemigos.length]), [['Combate 1', 2], ['Combate 2', 1]]);
    assert.equal(s.encuentros[0].enemigos[0].ref, 'zombie');
    assert.equal(s.encuentros[0].enemigos[0].cantidad, 2);
    assert.deepEqual(s.sinDatos, ['Sombra rara']);
    assert.equal(s.monstruos['ogro-jefe'].pg, 80);
  });
});
