/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { sql } from 'drizzle-orm';
import { crearDb } from '@/shared/db/conectar';
import { MAX_TIRADAS } from '../domain/sorteo';

/* La sala vive en la base: se prueba con un Postgres embebido (PGlite), sin red */
let M: any, dir = '', base: ReturnType<typeof crearDb>;
const ctx = () => ({ db: base.db, usuario: null }) as any;

before(async () => {
  const req = createRequire(import.meta.url);
  req.cache[req.resolve('server-only')] = { id: 'server-only', exports: {}, loaded: true } as any;
  M = (await import('./graphql')).sorteosGraphQL.resolvers.Mutation;
  dir = mkdtempSync(join(tmpdir(), 'sorteo-'));
  base = crearDb('pglite:' + dir);
  await base.migrar('./drizzle');
});
after(async () => { await base.cerrar(); rmSync(dir, { recursive: true, force: true }); });

test('sala de sorteo: crear, entrar, tirar, permisos y presencia', async () => {
  const { codigo, secreto } = await M.crearSalaSorteo(null, { visitante: 'host-12345', quien: 'Jose' }, ctx());
  assert.equal(codigo.length, 6);

  // Un espectador entra con el código (en minúsculas y con guion también vale)
  const vista = await M.latidoSorteo(null, { codigo: codigo.toLowerCase().replace(/^(...)/, '$1-'), visitante: 'espec-12345', quien: 'Ana' }, ctx());
  assert.equal(vista.nombre, 'Sorteo de Jose');
  assert.deepEqual(vista.presentes.map((p: any) => [p.nombre, p.host, p.conectado]), [['Jose', true, true], ['Ana', false, true]]);

  // El espectador no tira hasta que el anfitrión lo permite
  await assert.rejects(M.tirarSorteo(null, { codigo, visitante: 'espec-12345', quien: 'Ana', tipo: 'moneda' }, ctx()), /solo tira/);
  await assert.rejects(M.configurarSorteo(null, { codigo, secreto: 'otro', todosTiran: true }, ctx()), /Solo quien/);
  await M.configurarSorteo(null, { codigo, secreto, todosTiran: true, opciones: ['Ana', 'Beto', ' ', 'Caro'] }, ctx());
  const r = await M.tirarSorteo(null, { codigo, visitante: 'espec-12345', quien: 'Ana', tipo: 'ruleta', cuantos: 2 }, ctx());
  assert.deepEqual(r.tiradas[0].opciones, ['Ana', 'Beto', 'Caro']);
  assert.equal(new Set(r.tiradas[0].ganadores).size, 2);
  assert.equal(r.tiradas[0].por, 'Ana');

  // Solo se guardan las últimas tiradas, la más nueva primero
  for (let i = 0; i < MAX_TIRADAS + 2; i++) await M.tirarSorteo(null, { codigo, visitante: 'host-12345', quien: 'Jose', secreto, tipo: 'dados', expr: '1d20+' + i }, ctx());
  const fin = await M.latidoSorteo(null, { codigo, visitante: 'host-12345', quien: 'Jose' }, ctx());
  assert.equal(fin.tiradas.length, MAX_TIRADAS);
  assert.equal(fin.tiradas[0].expr, '1d20+' + (MAX_TIRADAS + 1));

  await assert.rejects(M.tirarSorteo(null, { codigo, visitante: 'host-12345', quien: 'Jose', secreto, tipo: 'dados', expr: 'xx' }, ctx()), /1d20/);
  await assert.rejects(M.latidoSorteo(null, { codigo: 'ZZZZZZ', visitante: 'host-12345', quien: 'Jose' }, ctx()), /no existe/);
});

test('si la tabla no existe (migración sin aplicar), se crea al usarla', async () => {
  await base.db.execute(sql.raw('DROP TABLE "salas_sorteo"'));
  const { codigo } = await M.crearSalaSorteo(null, { visitante: 'host-12345', quien: 'Jose' }, ctx());
  const vista = await M.latidoSorteo(null, { codigo, visitante: 'host-12345', quien: 'Jose' }, ctx());
  assert.equal(vista.codigo, codigo);
});
