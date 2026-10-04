/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { crearDb } from '@/shared/db/conectar';
import { usuarios } from '@/features/cuentas/server/tablas';
import { personajes } from '@/features/personajes/server/tablas';
import { campanas, mesaJugadores } from './tablas';
import { createRequire } from 'node:module';

/* El estado del combate vive en la base: aquí se prueba con un Postgres embebido (PGlite), sin red */
let Q: any, M: any;
let dir = '', base: ReturnType<typeof crearDb>, dm: any, jug: any, otro: any;
const ctx = (u: any) => ({ db: base.db, usuario: u }) as any;
const unido = { dmId: '', campanaId: 'c1', personajeId: 'pj1' };

before(async () => {
  // `server-only` rechaza cualquier import fuera de Next; en la prueba se anula
  const req = createRequire(import.meta.url);
  req.cache[req.resolve('server-only')] = { id: 'server-only', exports: {}, loaded: true } as any;
  const { mesaGraphQL } = await import('./graphql');
  Q = mesaGraphQL.resolvers.Query; M = mesaGraphQL.resolvers.Mutation;
  dir = mkdtempSync(join(tmpdir(), 'mesa-'));
  base = crearDb('pglite:' + dir);
  await base.migrar('./drizzle');
  const [a, b, c] = await base.db.insert(usuarios).values([
    { email: 'dm@x', nombre: 'DM', hash: 'x', rol: 'dm' }, { email: 'j@x', nombre: 'Jug', hash: 'x' }, { email: 'o@x', nombre: 'Otro', hash: 'x' },
  ]).returning();
  dm = { id: a.id, rol: 'dm' }; jug = { id: b.id, rol: 'jugador' }; otro = { id: c.id, rol: 'jugador' };
  unido.dmId = a.id;
  await base.db.insert(campanas).values({ usuarioId: a.id, id: 'c1', nombre: 'Mesa', datos: {} });
  await base.db.insert(personajes).values({ usuarioId: b.id, id: 'pj1', datos: {} });
  await base.db.insert(mesaJugadores).values({ dmId: a.id, campanaId: 'c1', jugadorId: b.id, personajeId: 'pj1' });
});
after(async () => { await base.cerrar(); rmSync(dir, { recursive: true, force: true }); });

describe('combate en vivo', () => {
  test('el DM publica y el jugador unido lo lee', async () => {
    await M.fijarCombateVivo(null, { campanaId: 'c1', datos: { activo: true, ronda: 1, turno: 0, orden: [{ k: 'm:1', nombre: 'Orco' }] } }, ctx(dm));
    const v = await Q.combateMesa(null, unido, ctx(jug));
    assert.equal(v.ronda, 1); assert.equal(v.orden[0].nombre, 'Orco');
  });
  test('gastar acción se guarda por personaje y no lo pisa una nueva publicación del DM', async () => {
    await M.gastarAccionMesa(null, { ...unido, tipo: 'accion', gastado: true }, ctx(jug));
    await M.gastarAccionMesa(null, { ...unido, tipo: 'reaccion', gastado: true }, ctx(jug));
    await M.fijarCombateVivo(null, { campanaId: 'c1', datos: { activo: true, ronda: 1, turno: 1, orden: [] } }, ctx(dm));
    const v = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    assert.deepEqual(v.economia.pj1, { accion: true, reaccion: true });
    assert.equal(v.turno, 1);
  });
  test('recuperar una acción, y la nueva ronda las devuelve todas', async () => {
    await M.gastarAccionMesa(null, { ...unido, tipo: 'accion', gastado: false }, ctx(jug));
    assert.deepEqual((await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm))).economia.pj1, { accion: false, reaccion: true });
    await M.fijarCombateVivo(null, { campanaId: 'c1', datos: { activo: true, ronda: 2, turno: 0, orden: [] }, reiniciarEconomia: true }, ctx(dm));
    const v = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    assert.deepEqual(v.economia, {}); assert.equal(v.ronda, 2);
  });
  test('quien no está en la mesa no lee ni gasta', async () => {
    await assert.rejects(Q.combateMesa(null, unido, ctx(otro)), /no está en esa mesa/);
    await assert.rejects(M.gastarAccionMesa(null, { ...unido, tipo: 'accion', gastado: true }, ctx(otro)), /no está en esa mesa/);
  });
  test('solo existen la acción, la adicional y la reacción', async () => {
    await assert.rejects(M.gastarAccionMesa(null, { ...unido, tipo: 'otra', gastado: true }, ctx(jug)), /no existe/);
  });
  test('los golpes de los jugadores se acumulan, se confirman y la publicación del DM no los pisa', async () => {
    await M.enviarGolpeMesa(null, { ...unido, objetivo: 'm:abc', dano: 7, condicion: 'Derribado' }, ctx(jug));
    await M.enviarGolpeMesa(null, { ...unido, objetivo: 'm:def', dano: 3 }, ctx(jug));
    await M.fijarCombateVivo(null, { campanaId: 'c1', datos: { activo: true, ronda: 2, turno: 0, orden: [], golpes: [] } }, ctx(dm));
    const v = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    assert.equal(v.golpes.length, 2); assert.equal(v.golpes[0].condicion, 'Derribado'); 
    await M.confirmarGolpes(null, { campanaId: 'c1', ids: [v.golpes[0].id] }, ctx(dm));
    const w = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    assert.equal(w.golpes.length, 1); assert.equal(w.golpes[0].objetivo, 'm:def');
  });
  test('un golpe solo va a enemigos, con daño válido y de quien está en la mesa', async () => {
    await assert.rejects(M.enviarGolpeMesa(null, { ...unido, objetivo: 'pj:x', dano: 1 }, ctx(jug)));
    await assert.rejects(M.enviarGolpeMesa(null, { ...unido, objetivo: 'm:a', dano: -5 }, ctx(jug)));
    await assert.rejects(M.enviarGolpeMesa(null, { ...unido, objetivo: 'm:a', dano: 1 }, ctx(otro)));
  });
  test('el DM marca la acción de un enemigo y de un jugador, y el jugador no puede hacerlo por otro', async () => {
    await M.fijarAccionDm(null, { campanaId: 'c1', clave: 'm:abc', tipo: 'accion', gastado: true }, ctx(dm));
    await M.fijarAccionDm(null, { campanaId: 'c1', clave: 'pj1', tipo: 'reaccion', gastado: true }, ctx(dm));
    const v = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    assert.equal(v.economia['m:abc'].accion, true); assert.equal(v.economia.pj1.reaccion, true);
    await assert.rejects(M.fijarAccionDm(null, { campanaId: 'c1', clave: 'm:abc', tipo: 'accion', gastado: false }, ctx(jug)));
    await assert.rejects(M.fijarAccionDm(null, { campanaId: 'c1', clave: 'm:abc', tipo: 'otra', gastado: false }, ctx(dm)));
  });
  test('usar una acción la marca gastada y deja dicho qué se hizo', async () => {
    await M.usarAccionMesa(null, { ...unido, tipo: 'adicional', nombre: 'Correr', resumen: 'Doblas tu velocidad' }, ctx(jug));
    const v = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    assert.equal(v.economia.pj1.adicional, true); assert.equal(v.ultimas.pj1.nombre, 'Correr');
    await assert.rejects(M.usarAccionMesa(null, { ...unido, tipo: 'accion', nombre: 'X' }, ctx(otro)));
  });
  test('las salvaciones piden tirada a varios enemigos y el DM las resuelve de una en una', async () => {
    await M.enviarSalvacionMesa(null, { ...unido, objetivos: ['m:a', 'm:b'], salv: 'DES', cd: 14, dano: 20, mitad: true, condicion: 'Derribado' }, ctx(jug));
    let v = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    const id = v.salvaciones[0].id;
    assert.deepEqual(v.salvaciones[0].objetivos, ['m:a', 'm:b']);
    await M.resolverSalvacion(null, { campanaId: 'c1', id, clave: 'm:a' }, ctx(dm));
    v = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    assert.deepEqual(v.salvaciones[0].objetivos, ['m:b']);
    await M.resolverSalvacion(null, { campanaId: 'c1', id, clave: 'm:b' }, ctx(dm));
    v = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    assert.equal(v.salvaciones.length, 0);
    await assert.rejects(M.enviarSalvacionMesa(null, { ...unido, objetivos: ['pj:x'], salv: 'DES', cd: 14, dano: 1, mitad: false }, ctx(jug)));
    await assert.rejects(M.enviarSalvacionMesa(null, { ...unido, objetivos: ['m:a'], salv: 'XXX', cd: 14, dano: 1, mitad: false }, ctx(jug)));
  });
  test('el DM manda descansos e inspiración, se guardan las últimas 30 y solo el DM puede', async () => {
    await M.enviarOrdenDm(null, { campanaId: 'c1', tipo: 'largo' }, ctx(dm));
    await M.enviarOrdenDm(null, { campanaId: 'c1', tipo: 'inspiracion', personajeId: 'pj1' }, ctx(dm));
    let v = await Q.combateMesa(null, unido, ctx(jug));
    assert.equal(v.ordenes.length, 2); assert.equal(v.ordenes[0].tipo, 'largo'); assert.equal(v.ordenes[0].personajeId, null); assert.equal(v.ordenes[1].personajeId, 'pj1');
    await M.fijarCombateVivo(null, { campanaId: 'c1', datos: { activo: true, ronda: 3, turno: 0, orden: [], ordenes: [] } }, ctx(dm));
    v = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    assert.equal(v.ordenes.length, 2);
    for (let i = 0; i < 35; i++) await M.enviarOrdenDm(null, { campanaId: 'c1', tipo: 'corto' }, ctx(dm));
    v = await Q.combateVivo(null, { campanaId: 'c1' }, ctx(dm));
    assert.equal(v.ordenes.length, 30); assert.equal(v.ordenes[29].tipo, 'corto');
    await assert.rejects(M.enviarOrdenDm(null, { campanaId: 'c1', tipo: 'largo' }, ctx(jug)));
    await assert.rejects(M.enviarOrdenDm(null, { campanaId: 'c1', tipo: 'otra' }, ctx(dm)));
  });
});
