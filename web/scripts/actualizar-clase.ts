/* Pone al día partes de la biblioteca con su versión más reciente, en biblioteca-mi-turno.json y en la base.
   Uso: npm run db:actualizar-clase -- <pugilista|especies|barbaro|bardo|brujo|clerigo> [--solo-archivo] [--ver]
   --solo-archivo: no toca la base.  --ver: muestra lo que cambiaría y no guarda nada.
   Solo reemplaza lo que se actualiza (esa clase, esas especies); el resto de la biblioteca no se toca. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync, writeFileSync } from 'node:fs';
import { crearDb } from '../src/shared/db/conectar';
import { leerBiblioteca, reemplazarClase, reemplazarEspecie } from '../src/features/biblioteca/server/repositorio';
import { PUGILISTA_2024, ARENA_ROYALE_EXTRA } from './datos/pugilista-2024';
import { ESPECIES_2025 } from './datos/especies-2025';
import { BARBARO_2024 } from './datos/barbaro-2024';
import { BARDO_2024 } from './datos/bardo-2024';
import { BRUJO_2024 } from './datos/brujo-2024';
import { CLERIGO_2024 } from './datos/clerigo-2024';

const RUTA = '../biblioteca-mi-turno.json';

type Cambio = { seccion: 'clases' | 'especies'; id: string; nueva: (actual: any) => any };

/* Qué se actualiza con cada opción, y cómo se arma la versión nueva a partir de la actual */
const OPCIONES: Record<string, Cambio[]> = {
  pugilista: [{
    seccion: 'clases', id: 'lib:pugilista',
    nueva: actual => {
      // Arena Royale y Matones Sabuesos no tienen versión 2024: se conservan, y a Arena Royale se le agrega lo que le faltaba
      const subs: Record<string, any> = { ...PUGILISTA_2024.subclases };
      for (const k of ['arena-royale', 'matones-sabuesos']) if (actual?.subclases?.[k]) subs[k] = structuredClone(actual.subclases[k]);
      const arena = subs['arena-royale'];
      if (arena && !arena.rasgos.some((x: any) => x.nombre === ARENA_ROYALE_EXTRA.nombre)) arena.rasgos.unshift(ARENA_ROYALE_EXTRA);
      return { ...PUGILISTA_2024, subclases: subs };
    },
  }],
  // Clase del manual: la biblioteca guarda sus rasgos de nivel alto y sus subclases
  barbaro: [{ seccion: 'clases', id: 'barbaro', nueva: actual => ({ ...actual, ...structuredClone(BARBARO_2024) }) }],
  bardo: [{ seccion: 'clases', id: 'bardo', nueva: actual => ({ ...actual, ...structuredClone(BARDO_2024) }) }],
  brujo: [{ seccion: 'clases', id: 'brujo', nueva: actual => ({ ...actual, ...structuredClone(BRUJO_2024) }) }],
  clerigo: [{ seccion: 'clases', id: 'clerigo', nueva: actual => ({ ...actual, ...structuredClone(CLERIGO_2024) }) }],
  // Se conservan el nombre, la etiqueta de subespecie y lo demás de cada especie; cambian velocidad, visión, fuente y rasgos
  especies: Object.entries(ESPECIES_2025).map(([k, e]) => ({
    seccion: 'especies' as const, id: 'lib:' + k,
    nueva: (actual: any) => {
      const { subs, ...resto } = e;
      return { ...actual, ...resto, ...(subs ? { subs } : {}) };
    },
  })),
};

const nombres = (x: any) => [
  ...(x?.rasgos || []).map((r: any) => `${r.sub ? r.sub + ': ' : ''}${r.n ?? ''} ${r.nombre}`),
  ...(x?.rasgosAltos || []).map((r: any) => `alto: ${r.n} ${r.nombre}`),
  ...Object.entries<any>(x?.subclases || {}).flatMap(([k, s]) => (s.rasgos || []).map((r: any) => `${k}: ${r.n} ${r.nombre}`)),
];

async function main() {
  const args = process.argv.slice(2);
  const cambios = OPCIONES[args.find(a => !a.startsWith('--')) || ''];
  if (!cambios) throw new Error(`Opción desconocida. Opciones: ${Object.keys(OPCIONES).join(', ')}`);
  const archivo = JSON.parse(readFileSync(RUTA, 'utf8'));
  const soloArchivo = args.includes('--solo-archivo'), ver = args.includes('--ver');

  const db = soloArchivo ? null : crearDb();
  const enBase = db ? await leerBiblioteca(db.db) : null;
  const nuevas = cambios.map(c => {
    const actual = archivo[c.seccion][c.id];
    if (!actual) throw new Error(`${c.id} no está en ${RUTA}`);
    const nueva = c.nueva(actual);
    const a = new Set(nombres(actual)), b = new Set(nombres(nueva));
    const base = (enBase as any)?.[c.seccion]?.find((x: any) => x.id === c.id);
    console.log(`\n${c.id}${base ? ` (en la base: ${base.rasgos.length} rasgos)` : db ? ' (no está en la base: se agrega)' : ''}`);
    console.log('  Se quitan:', [...a].filter(x => !b.has(x)).join(' | ') || 'nada');
    console.log('  Se agregan:', [...b].filter(x => !a.has(x)).join(' | ') || 'nada');
    return { c, nueva };
  });
  if (ver) { await db?.cerrar(); return; }

  for (const { c, nueva } of nuevas) archivo[c.seccion][c.id] = nueva;
  writeFileSync(RUTA, JSON.stringify(archivo, null, 1).replace(/\n/g, '\r\n'));
  console.log(`\n${RUTA} actualizado.`);
  if (db) {
    let rasgos = 0;
    for (const { c, nueva } of nuevas) rasgos += (c.seccion === 'clases' ? await reemplazarClase(db.db, c.id, nueva) : await reemplazarEspecie(db.db, c.id, nueva)).rasgos;
    console.log(`Base actualizada: ${nuevas.length} elemento(s), ${rasgos} rasgos.`);
    await db.cerrar();
  }
}
main().catch(e => { console.error(e); process.exit(1); });
