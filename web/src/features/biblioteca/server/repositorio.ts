/* eslint-disable @typescript-eslint/no-explicit-any */
import { and, inArray, isNotNull, sql } from 'drizzle-orm';
import type { PgDatabase } from 'drizzle-orm/pg-core';
import * as t from './tablas';
import { libAFilas, type BibliotecaAnidada, type FilasBiblioteca } from '../domain/mapeo';
import type { Biblioteca } from '../domain/biblioteca';

type Db = PgDatabase<any, any, any>;

const trozos = <T,>(xs: T[], n = 400) => Array.from({ length: Math.ceil(xs.length / n) }, (_, i) => xs.slice(i * n, i * n + n));

export async function leerBiblioteca(db: Db): Promise<BibliotecaAnidada> {
  const [clases, subclases, especies, subespecies, rasgos, dotes, trasfondos, conjuros, cc, libExtra] = await Promise.all([
    db.select().from(t.clases).orderBy(t.clases.id),
    db.select().from(t.subclases).orderBy(t.subclases.claseId, t.subclases.clave),
    db.select().from(t.especies).orderBy(t.especies.id),
    db.select().from(t.subespecies),
    db.select().from(t.rasgos).orderBy(t.rasgos.origen, t.rasgos.orden),
    db.select().from(t.dotes).orderBy(t.dotes.id),
    db.select().from(t.trasfondos).orderBy(t.trasfondos.id),
    db.select().from(t.conjuros).orderBy(t.conjuros.nivel, t.conjuros.nombre),
    db.select().from(t.conjuroClases),
    db.select().from(t.libExtra),
  ]);
  const agrupar = <T extends Record<string, any>>(xs: T[], k: keyof T) => {
    const m = new Map<string, T[]>();
    for (const x of xs) { const key = x[k] as string; if (key == null) continue; m.set(key, [...(m.get(key) || []), x]); }
    return m;
  };
  const subsDe = agrupar(subclases, 'claseId'), subEspDe = agrupar(subespecies, 'especieId');
  const rasgosClase = agrupar(rasgos, 'claseId'), rasgosEsp = agrupar(rasgos, 'especieId');
  const clasesDe = agrupar(cc, 'conjuroId');
  return {
    clases: clases.map(c => ({ ...c, subclases: subsDe.get(c.id) || [], rasgos: rasgosClase.get(c.id) || [] })),
    especies: especies.map(e => ({ ...e, subespecies: subEspDe.get(e.id) || [], rasgos: rasgosEsp.get(e.id) || [] })),
    trasfondos, dotes,
    conjuros: conjuros.map(s => ({ ...s, clases: (clasesDe.get(s.id) || []).map(x => x.claseId) })),
    libExtra,
  };
}

async function insertar(db: Db, tabla: any, filas: any[], ignorarConflictos = false) {
  const out: any[] = [];
  for (const g of trozos(filas)) {
    const q = db.insert(tabla).values(g);
    out.push(...(await (ignorarConflictos ? q.onConflictDoNothing() : q).returning()));
  }
  return out;
}

/** Reemplaza toda la biblioteca (administrador). */
export async function reemplazarBiblioteca(db: Db, lib: Biblioteca) {
  const f = libAFilas(lib);
  await db.transaction(async tx => {
    for (const tabla of [t.rasgos, t.conjuroClases, t.subclases, t.subespecies, t.libExtra, t.conjuros, t.dotes, t.trasfondos, t.especies, t.clases]) {
      await tx.delete(tabla);
    }
    await cargar(tx as unknown as Db, f);
  });
}

async function cargar(db: Db, f: FilasBiblioteca) {
  await insertar(db, t.clases, f.clases);
  await insertar(db, t.especies, f.especies);
  await insertar(db, t.subclases, f.subclases);
  await insertar(db, t.subespecies, f.subespecies);
  await insertar(db, t.rasgos, f.rasgos);
  await insertar(db, t.dotes, f.dotes);
  await insertar(db, t.trasfondos, f.trasfondos);
  await insertar(db, t.conjuros, f.conjuros);
  await insertar(db, t.conjuroClases, f.conjuroClases);
  await insertar(db, t.libExtra, f.libExtra);
}

/** Agrega lo que no existe todavía, sin tocar ni borrar nada (cualquier usuario, al importar). Devuelve cuántas filas nuevas hubo. */
export async function aportarBiblioteca(db: Db, lib: Biblioteca) {
  const f = libAFilas(lib);
  return db.transaction(async txx => {
    const tx = txx as unknown as Db;
    const clasesNuevas = new Set((await insertar(tx, t.clases, f.clases, true)).map(x => x.id));
    const especiesNuevas = new Set((await insertar(tx, t.especies, f.especies, true)).map(x => x.id));
    const subsNuevas = new Set((await insertar(tx, t.subclases, f.subclases, true)).map(x => `${x.claseId}|${x.clave}`));
    await insertar(tx, t.subespecies, f.subespecies.filter(s => especiesNuevas.has(s.especieId)), true);

    // Rasgos de clases base que ya existían: solo los grupos que todavía no tienen rasgos
    const ids = [...new Set(f.rasgos.map(r => r.claseId).filter(Boolean))];
    const hay = ids.length
      ? await tx.select({ claseId: t.rasgos.claseId, origen: t.rasgos.origen, subclase: t.rasgos.subclase })
          .from(t.rasgos).where(and(isNotNull(t.rasgos.claseId), inArray(t.rasgos.claseId, ids))).groupBy(t.rasgos.claseId, t.rasgos.origen, t.rasgos.subclase)
      : [];
    const grupos = new Set(hay.map(h => `${h.claseId}|${h.origen}|${h.subclase ?? ''}`));
    const rasgos = f.rasgos.filter(r => {
      if (r.origen === 'especie') return especiesNuevas.has(r.especieId);
      if (r.origen === 'clase') return clasesNuevas.has(r.claseId);
      if (r.origen === 'subclase') return subsNuevas.has(`${r.claseId}|${r.subclase}`);
      return !grupos.has(`${r.claseId}|${r.origen}|${r.subclase ?? ''}`);
    });
    await insertar(tx, t.rasgos, rasgos);
    const n = [
      clasesNuevas.size, especiesNuevas.size, subsNuevas.size,
      (await insertar(tx, t.dotes, f.dotes, true)).length,
      (await insertar(tx, t.trasfondos, f.trasfondos, true)).length,
      (await insertar(tx, t.conjuros, f.conjuros, true)).length,
    ];
    await insertar(tx, t.conjuroClases, f.conjuroClases, true);
    n.push((await insertar(tx, t.libExtra, f.libExtra, true)).length);
    return n.reduce((a, b) => a + b, 0);
  });
}

export async function contarBiblioteca(db: Db) {
  const [r] = await db.select({ n: sql<number>`count(*)::int` }).from(t.clases);
  return r.n;
}
