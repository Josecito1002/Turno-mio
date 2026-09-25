/* Corre en Vercel antes de `next build`, solo en producción, y deja la base igual que el repositorio:
   1. Aplica las migraciones pendientes.
   2. Biblioteca: cada clase, especie y dote de biblioteca-mi-turno.json que difiera de la base se reescribe (lo que
      solo está en la base, como lo aportado desde la app, no se toca).
   3. Personajes de prueba: la cuenta de scripts/datos/personajes-prueba.json queda con exactamente esos.
   Así una sesión sin acceso a la base (Claude Code en la nube) solo tiene que subir los cambios.
   Si algo falla, lo dice en el registro de la compilación pero no la detiene.
   Uso local: npx tsx --env-file-if-exists=.env.local scripts/despliegue.ts --forzar [--ver] */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from 'node:fs';
import { crearDb } from '../src/shared/db/conectar';
import * as t from '../src/features/biblioteca/server/tablas';
import { libAFilas } from '../src/features/biblioteca/domain/mapeo';
import { reemplazarClase, reemplazarEspecie } from '../src/features/biblioteca/server/repositorio';
import { leerLista, sincronizarPrueba } from './gemini/personajes-prueba';
import { BESTIAS_COLADAS } from '../src/features/reglas/data/especies';

/* Forma comparable de una fila: sin id autogenerado ni campos vacíos, con las claves ordenadas */
const canon = (o: any): any => Array.isArray(o) ? o.map(canon)
  : o && typeof o === 'object' ? Object.fromEntries(Object.keys(o).filter(k => k !== 'id' && o[k] != null).sort().map(k => [k, canon(o[k])])) : o;
const huella = (filas: any[]) => filas.map(f => JSON.stringify(canon(f))).sort().join('\n');
const agrupar = (filas: any[], k: string) => { const m = new Map<string, any[]>(); for (const f of filas) if (f[k] != null) m.set(f[k], [...(m.get(f[k]) || []), f]); return m; };

async function main() {
  const args = process.argv.slice(2), ver = args.includes('--ver');
  if (process.env.VERCEL_ENV !== 'production' && !args.includes('--forzar')) { console.log('[despliegue] No es producción: no se toca la base.'); return; }
  if (!process.env.DATABASE_URL) { console.log('[despliegue] Sin DATABASE_URL: no se toca la base.'); return; }
  const { db, migrar, cerrar } = crearDb();
  try {
    if (!ver) await migrar('./drizzle');
    const archivo = JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8'));
    const [clases, subclases, especies, subespecies, rasgos, dotes] = await Promise.all([
      db.select().from(t.clases), db.select().from(t.subclases), db.select().from(t.especies),
      db.select().from(t.subespecies), db.select().from(t.rasgos), db.select().from(t.dotes)]);
    const subsDe = agrupar(subclases, 'claseId'), subEspDe = agrupar(subespecies, 'especieId');
    const rasgosClase = agrupar(rasgos, 'claseId'), rasgosEsp = agrupar(rasgos, 'especieId');
    const cambios: string[] = [];

    for (const [id, c] of Object.entries<any>(archivo.clases || {})) {
      const f = libAFilas({ clases: { [id]: c } } as any);
      const enBase = clases.find((x: any) => x.id === id);
      const igual = enBase && huella([enBase]) === huella(f.clases) && huella(subsDe.get(id) || []) === huella(f.subclases) && huella(rasgosClase.get(id) || []) === huella(f.rasgos);
      if (igual) continue;
      cambios.push(`clase ${id}`);
      if (!ver) await reemplazarClase(db, id, c);
    }
    for (const [id, e] of Object.entries<any>(archivo.especies || {})) {
      if (BESTIAS_COLADAS.includes(id)) continue; // bestias que se colaron como especies: la app las descarta
      const f = libAFilas({ especies: { [id]: e } } as any);
      const enBase = especies.find((x: any) => x.id === id);
      const igual = enBase && huella([enBase]) === huella(f.especies) && huella(subEspDe.get(id) || []) === huella(f.subespecies) && huella(rasgosEsp.get(id) || []) === huella(f.rasgos);
      if (igual) continue;
      cambios.push(`especie ${id}`);
      if (!ver) await reemplazarEspecie(db, id, e);
    }
    const filasDotes = libAFilas({ dotes: archivo.dotes || {} } as any).dotes;
    for (const d of filasDotes as any[]) {
      const enBase = dotes.find((x: any) => x.id === d.id);
      if (enBase && huella([enBase]) === huella([d])) continue;
      cambios.push(`dote ${d.id}`);
      const { id: _id, ...resto } = d; void _id;
      if (!ver) await db.insert(t.dotes).values(d).onConflictDoUpdate({ target: t.dotes.id, set: resto });
    }
    console.log(`[despliegue] Biblioteca: ${cambios.length ? `${ver ? 'cambiaría' : 'actualizado'}: ${cambios.join(', ')}` : 'ya estaba al día'}.`);

    const lista = leerLista();
    if (!ver) {
      const r = await sincronizarPrueba(db, lista.correo, lista.personajes, archivo);
      console.log(`[despliegue] Personajes de prueba en ${lista.correo}: ${r.creados.length} creados, ${r.rehechos.length} rehechos, ${r.borrados.length} borrados.`);
    } else console.log(`[despliegue] Personajes de prueba pedidos: ${lista.personajes.length}.`);
  } catch (e: any) {
    console.error('[despliegue] ERROR (la compilación sigue):', e?.message || e);
  } finally {
    await cerrar();
  }
}

main();
