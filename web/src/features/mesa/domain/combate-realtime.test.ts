import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { actualizarPgUnido, combatiente, fijarUnidos } from './combate';

describe('Actualización de PG en tiempo real (Mesa del DM)', () => {
  const campId = 'camp-test-rt';
  const dummyPj = {
    id: 'pj-1',
    nombre: 'Valeros',
    clase: 'guerrero',
    nivel: 1,
    atributos: { fue: 16, des: 12, con: 14, int: 10, sab: 12, car: 8 },
    pgModo: 'maximo',
    used: { pg: 0 },
    pgTemp: 0,
  };

  const unido = {
    jugadorId: 'usr-1',
    jugador: 'Ana',
    personajeId: 'pj-1',
    nombre: 'Valeros',
    resumen: 'Guerrero 1',
    datos: dummyPj,
    actualizadoEn: new Date().toISOString(),
  };

  test('actualizarPgUnido actualiza los PG y puntos temporales en caliente', () => {
    fijarUnidos(campId, [unido]);
    const cp = { id: campId, nombre: 'Campaña RT', pjs: [], monstruos: [] };

    // Inicial
    const c1 = combatiente('jm:usr-1:pj-1', cp);
    assert.ok(c1, 'Combatiente debe existir');
    const pgMax = c1.pgMax;
    assert.equal(c1.pg, pgMax, 'Al inicio debe tener todos sus PG');

    // Daño recibido por el jugador (8 PG usados, 3 temporales)
    actualizarPgUnido(campId, {
      jugadorId: 'usr-1',
      personajeId: 'pj-1',
      pgUsados: 8,
      pgTemp: 3,
    });

    const c2 = combatiente('jm:usr-1:pj-1', cp);
    assert.ok(c2);
    assert.equal(c2.pg, pgMax - 8, 'Los PG deben haberse reducido exactamente en 8');
    assert.equal(c2.pj.pgTemp, 3, 'Los PG temporales deben ser 3');
  });

  test('actualizarPgUnido actualiza salvaciones contra muerte en tiempo real', () => {
    fijarUnidos(campId, [unido]);
    const cp = { id: campId, nombre: 'Campaña RT', pjs: [], monstruos: [] };

    actualizarPgUnido(campId, {
      jugadorId: 'usr-1',
      personajeId: 'pj-1',
      pgUsados: 20, // Caído
      muerteExitos: 2,
      muerteFallos: 1,
    });

    const c3 = combatiente('jm:usr-1:pj-1', cp);
    assert.ok(c3);
    assert.equal(c3.pj.used?.['muerte-exitos'], 2, 'Éxitos de muerte deben ser 2');
    assert.equal(c3.pj.used?.['muerte-fallos'], 1, 'Fallos de muerte deben ser 1');
  });

  test('ignora cambios dirigidos a otra campaña o personaje inexistente sin fallar', () => {
    fijarUnidos(campId, [unido]);
    const cp = { id: campId, nombre: 'Campaña RT', pjs: [], monstruos: [] };

    // Campaña equivocada
    actualizarPgUnido('otra-campana', {
      jugadorId: 'usr-1',
      personajeId: 'pj-1',
      pgUsados: 0,
    });

    // Personaje inexistente
    actualizarPgUnido(campId, {
      jugadorId: 'usr-999',
      personajeId: 'pj-999',
      pgUsados: 5,
    });

    const c = combatiente('jm:usr-1:pj-1', cp);
    assert.ok(c);
  });
});
