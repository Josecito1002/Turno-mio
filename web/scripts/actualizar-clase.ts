/* Pone al día partes de la biblioteca con su versión más reciente, en biblioteca-mi-turno.json y en la base.
   Uso: npm run db:actualizar-clase -- <clase|pugilista|artifice|especies|playtest|dotes|especies-playtest|psion> [--solo-archivo] [--ver]
   --solo-archivo: no toca la base.  --ver: muestra lo que cambiaría y no guarda nada.
   Solo reemplaza lo que se actualiza (esa clase, esas especies); el resto de la biblioteca no se toca. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { crearDb } from '../src/shared/db/conectar';
import { leerBiblioteca, reemplazarClase, reemplazarEspecie } from '../src/features/biblioteca/server/repositorio';
import { PUGILISTA_2024, ARENA_ROYALE_EXTRA } from './datos/pugilista-2024';
import { ESPECIES_2025 } from './datos/especies-2025';
import { ARTIFICE_2026 } from './datos/artifice-2026';
import { PLAYTEST_2025 } from './datos/playtest-2025';
import { PLAYTEST_2026 } from './datos/playtest-2026';
import { DOTES_PLAYTEST } from './datos/dotes-playtest';
import { ESPECIES_PLAYTEST } from './datos/especies-playtest';
import { PSION_2025, PSION_CONJUROS_NUEVOS, PSION_LISTA } from './datos/psion-2025';
import { norm } from '../src/shared/utils/texto';

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
  // Artífice: se suman las subclases nuevas sin tocar las del lote 2
  artifice: [{ seccion: 'clases', id: 'lib:arcanista', nueva: actual => ({ ...actual, subclases: { ...(actual?.subclases || {}), ...structuredClone(ARTIFICE_2026.subclases) } }) }],
  // Subclases de prueba (Unearthed Arcana): se suman a las de cada clase sin quitar ninguna
  playtest: [...new Set([...Object.keys(PLAYTEST_2025), ...Object.keys(PLAYTEST_2026)])].map(clase => ({
    seccion: 'clases' as const, id: clase,
    nueva: (actual: any) => ({ ...actual, subclases: { ...(actual?.subclases || {}), ...structuredClone(PLAYTEST_2025[clase] || {}), ...structuredClone(PLAYTEST_2026[clase] || {}) } }),
  })),
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

/* Clase del manual con su archivo scripts/datos/<clase>-2024.ts (los que genera scripts/gemini/revisar.ts) */
async function deDatos(op: string): Promise<Cambio[] | undefined> {
  const ruta = `./datos/${op}-2024`;
  if (!/^[a-z]+$/.test(op) || !existsSync(`scripts/datos/${op}-2024.ts`)) return undefined;
  const datos = (await import(ruta))[`${op.toUpperCase()}_2024`];
  // Las subclases de prueba (Unearthed Arcana) no vienen en el lote: se conservan
  const playtest = (actual: any) => Object.fromEntries(Object.keys({ ...PLAYTEST_2025[op], ...PLAYTEST_2026[op] }).filter(k => actual?.subclases?.[k]).map(k => [k, actual.subclases[k]]));
  return datos && [{ seccion: 'clases', id: op, nueva: actual => {
    const n = { ...actual, ...structuredClone(datos) };
    return { ...n, subclases: { ...n.subclases, ...playtest(actual) } };
  } }];
}

/* Dotes y especies de playtest: se suman a la sección del archivo; la base se pone al día al publicar (scripts/despliegue.ts) */
function sumarNuevos(seccion: 'dotes' | 'especies', datos: Record<string, any>, ver: boolean) {
  const archivo = JSON.parse(readFileSync(RUTA, 'utf8'));
  const nuevas = Object.keys(datos).filter(k => !archivo[seccion]?.[k]);
  console.log(`${seccion} que se agregan (${nuevas.length}):`, nuevas.map(k => datos[k].n).join(' | ') || 'nada');
  if (ver) return;
  archivo[seccion] = { ...archivo[seccion], ...structuredClone(datos) };
  writeFileSync(RUTA, JSON.stringify(archivo, null, 1));
  console.log(`${RUTA} actualizado. La base se actualiza al publicar.`);
}

/* Psion: la clase, sus conjuros nuevos y la clase lib:psion en cada conjuro de su lista. Solo el archivo; la base se pone al día al publicar */
function aplicarPsion(ver: boolean) {
  const archivo = JSON.parse(readFileSync(RUTA, 'utf8'));
  const nuevos = Object.keys(PSION_CONJUROS_NUEVOS).filter(k => !archivo.conjuros?.[k]);
  const conjuros = { ...archivo.conjuros, ...Object.fromEntries(nuevos.map(k => [k, structuredClone(PSION_CONJUROS_NUEVOS[k])])) };
  const porNombre = new Map<string, any>(Object.values<any>(conjuros).map(s => [norm(s.nombre), s]));
  const sinJson = PSION_LISTA.filter(nombre => !porNombre.has(norm(nombre)));
  let marcados = 0;
  for (const nombre of PSION_LISTA) {
    const s = porNombre.get(norm(nombre));
    if (s && !(s.clases || []).includes('lib:psion')) { s.clases = [...(s.clases || []), 'lib:psion']; marcados++; }
  }
  console.log(`Psion: ${archivo.clases['lib:psion'] ? 'se reemplaza' : 'se agrega'} lib:psion (${PSION_2025.rasgos.length} rasgos, ${Object.keys(PSION_2025.subclases).length} subclases).`);
  console.log(`Conjuros nuevos: ${nuevos.length}. Conjuros marcados para el Psion en el archivo: ${marcados}. Solo en el catálogo del código: ${sinJson.length}.`);
  if (ver) return;
  archivo.clases['lib:psion'] = structuredClone(PSION_2025);
  archivo.conjuros = conjuros;
  writeFileSync(RUTA, JSON.stringify(archivo, null, 1));
  console.log(`${RUTA} actualizado. La base se actualiza al publicar.`);
}

async function main() {
  const args = process.argv.slice(2);
  const op = args.find(a => !a.startsWith('--')) || '';
  if (op === 'psion') return aplicarPsion(args.includes('--ver'));
  if (op === 'dotes') return sumarNuevos('dotes', DOTES_PLAYTEST, args.includes('--ver'));
  if (op === 'especies-playtest') return sumarNuevos('especies', ESPECIES_PLAYTEST, args.includes('--ver'));
  const cambios = OPCIONES[op] || await deDatos(op);
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
  writeFileSync(RUTA, JSON.stringify(archivo, null, 1));
  console.log(`\n${RUTA} actualizado.`);
  if (db) {
    let rasgos = 0;
    for (const { c, nueva } of nuevas) rasgos += (c.seccion === 'clases' ? await reemplazarClase(db.db, c.id, nueva) : await reemplazarEspecie(db.db, c.id, nueva)).rasgos;
    console.log(`Base actualizada: ${nuevas.length} elemento(s), ${rasgos} rasgos.`);
    await db.cerrar();
  }
}
main().catch(e => { console.error(e); process.exit(1); });
