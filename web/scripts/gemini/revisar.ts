/* Revisa la respuesta de Gemini a un encargo (scripts/gemini/encargo.ts) y, con --aplicar, la convierte en:
     scripts/datos/<clase>-2024.ts                    los rasgos (parte A), que aplica scripts/actualizar-clase.ts
     src/features/reglas/data/generadas/<clase>.ts    reglas (parte B), fuentes (C) y descripciones (D)
     docs/revision-reglas.md                          el lote marcado como revisado
   Uso: npm run gemini:revisar -- druida [--aplicar] [archivo]   (por defecto ../docs/gemini/respuesta-09-druida.md)
   Sin --aplicar solo informa: errores (impiden aplicar), avisos y lo que queda para hacer a mano. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { norm } from '../../src/shared/utils/texto';
import { CLASES } from '../../src/features/reglas/data/clases';
import { SUBCLASES } from '../../src/features/reglas/data/subclases';
import { CATALOGO } from '../../src/features/reglas/data/conjuros';
import { oficial } from './oficial';
import { LOTES, archivoLote } from './encargo';

const TIPOS_T = ['accion', 'adicional', 'reaccion', 'gratis', 'pasiva', 'fuera'];
const GENERADAS = 'src/features/reglas/data/generadas/';
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
const q = (s: string) => JSON.stringify(s);

/* Partes de la respuesta: por marcadores "=== A ===", o por títulos "A. Datos" si se perdieron al copiar */
function partes(txt: string) {
  const out: Record<string, string> = {};
  let trozos = txt.split(/^\s*=+\s*([A-E])\s*=+\s*$/m);
  if (trozos.length < 3) trozos = txt.split(/^\s*[#*]*\s*([A-E])\.\s+(?:Datos|Mec[aá]nicas|Fuentes|Descripciones|Notas)\b[^\n]*$/m);
  for (let i = 1; i < trozos.length; i += 2) out[trozos[i]] = trozos[i + 1] || '';
  return out;
}
const limpiar = (s = '') => s.replace(/```[a-zA-Z]*\s*/g, '').replace(/^\s*(?:TypeScript|ts|JSON|json)(?=\s|const|export|\[|\{)/, '').trim();
const json = (s = '', abre: string) => { const t = limpiar(s), i = t.indexOf(abre), j = t.lastIndexOf(abre === '[' ? ']' : '}'); return JSON.parse(t.slice(i, j + 1).replace(/,\s*([\]}])/g, '$1')); };

/* Fórmulas de Gemini (max(1, SAB), pb, nivel...) a código de las reglas */
const PJ_PRUEBA = { lvl: 11, pb: 4, m: { fue: 1, des: 2, con: 1, int: 0, sab: 3, car: -1 }, dcSpell: 15, atkSpell: 7 };
function formula(s: any): string {
  const js = String(s).trim()
    .replace(/\bmax\(/gi, 'Math.max(').replace(/\bmin\(/gi, 'Math.min(').replace(/\bfloor\(/gi, 'Math.floor(')
    .replace(/\bnivel\b/g, 'c.lvl').replace(/\bpb\b/g, 'c.pb').replace(/\b(FUE|DES|CON|INT|SAB|CAR)\b/g, m => 'c.m.' + m.toLowerCase())
    .replace(/\bCD\b/g, 'c.dcSpell').replace(/\bataqueConjuro\b/g, 'c.atkSpell');
  if (!/^[\w\s.+\-*/(),]*$/.test(js)) throw new Error(`fórmula no válida: ${s}`);
  const v = new Function('c', `return (${js});`)(PJ_PRUEBA);
  if (!Number.isFinite(v)) throw new Error(`la fórmula no da un número: ${s}`);
  return js;
}
/* "2; 3 desde nivel 10" o "corto desde nivel 6" → valor fijo o por nivel */
function porNivel(s: any, convertir: (x: string) => string): string {
  const [base, ...resto] = String(s).split(/[;,]/).map(x => x.trim()).filter(Boolean);
  let js = convertir(base.replace(/\s*desde.*$/, ''));
  for (const r of resto) {
    const m = r.match(/^(.+?)\s+desde (?:el )?nivel (\d+)$/);
    if (!m) throw new Error(`no entiendo "${r}"`);
    js = `c.lvl >= ${m[2]} ? ${convertir(m[1])} : ${js}`;
  }
  return resto.length ? `c => ${js}` : js;
}
const reset = (s: any) => porNivel(s || 'largo', x => { const v = x.toLowerCase(); if (!/^(largo|corto)$/.test(v)) throw new Error(`descanso "${x}"`); return q(v); });

async function main() {
  const args = process.argv.slice(2);
  const clase = args.find(a => !a.startsWith('--') && LOTES[a]) || '';
  if (!clase) { console.error('Clase: ' + Object.keys(LOTES).join(', ')); process.exit(1); }
  const ruta = args.find(a => !a.startsWith('--') && a !== clase) || archivoLote(clase, 'respuesta');
  if (!existsSync(ruta)) { console.error(`No existe ${ruta}: guarda ahí la respuesta de Gemini.`); process.exit(1); }
  const aplicar = args.includes('--aplicar');
  const C = CLASES[clase] as any, hasta = C.hasta || 5, NOMBRE = `${clase.toUpperCase()}_2024`;
  const lib = JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8')).clases[clase] || {};
  const of = await oficial(clase);
  const integradas = SUBCLASES.filter((s: any) => s.clase === clase);
  const catalogo = new Set([...CATALOGO.map((x: any) => x.nombre), ...Object.values<any>(JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8')).conjuros || {}).map((x: any) => x.nombre)]);
  const errores: string[] = [], avisos: string[] = [], aMano: string[] = [];
  const txt = readFileSync(ruta, 'utf8');
  const P = partes(txt);
  for (const k of 'ABCDE') if (!P[k]?.trim()) errores.push(`Falta la parte ${k}.`);
  if (errores.length) return fin();

  /* ---------- A: datos ---------- */
  let codigoA = limpiar(P.A);
  if (!/export const \w+_2024/.test(codigoA)) { errores.push(`La parte A no exporta ${NOMBRE}.`); return fin(); }
  codigoA = codigoA.replace(/export const \w+_2024/, `export const ${NOMBRE}`);
  mkdirSync('.cache/gemini', { recursive: true });
  const tmp = resolve(`.cache/gemini/${clase}-a-${Date.now()}.ts`);
  writeFileSync(tmp, codigoA);
  let A: any;
  try { A = (await import(pathToFileURL(tmp).href))[NOMBRE]; } catch (e: any) { errores.push(`La parte A no es TypeScript válido: ${e.message.split('\n')[0]}`); return fin(); }
  if (!A || !Array.isArray(A.rasgosAltos) || typeof A.subclases !== 'object') { errores.push('La parte A no tiene rasgosAltos y subclases.'); return fin(); }
  A.subAltos = A.subAltos || {};

  const todos: { donde: string; src: string; r: any }[] = [
    ...A.rasgosAltos.map((r: any) => ({ donde: 'clase', src: clase, r })),
    ...Object.entries<any>(A.subAltos).flatMap(([k, rs]) => (rs || []).map((r: any) => ({ donde: k, src: integradas.find((s: any) => s.key === k)?.n || k, r }))),
    ...Object.entries<any>(A.subclases).flatMap(([k, s]) => (s.rasgos || []).map((r: any) => ({ donde: k, src: s.n, r }))),
  ];
  for (const { donde, r } of todos) {
    const donde_ = `${donde}: ${r.nombre || '(sin nombre)'}`;
    if (!r.nombre) errores.push(`${donde}: un rasgo sin nombre.`);
    if (!Number.isInteger(r.n) || r.n < 1 || r.n > 20) errores.push(`${donde_}: nivel ${r.n} no válido.`);
    if (!TIPOS_T.includes(r.t)) errores.push(`${donde_}: tipo "${r.t}" no válido.`);
    if (!r.texto || r.texto.length < 15) errores.push(`${donde_}: sin texto.`);
    else if (r.texto.length > 600) avisos.push(`${donde_}: texto muy largo (${r.texto.length} caracteres); ¿copiado del libro?`);
  }
  for (const k of Object.keys(A.subAltos)) if (!integradas.some((s: any) => s.key === k)) errores.push(`subAltos.${k}: no es una subclase integrada (${integradas.map((s: any) => s.key).join(', ') || 'no hay'}).`);
  for (const k of Object.keys(lib.subclases || {})) if (!A.subclases[k]) errores.push(`La subclase \`${k}\` (${lib.subclases[k].n}) de la app no está en A: se borraría.`);

  // Subclases y niveles contra el texto oficial
  const niveles = (rs: any[]) => [...new Set(rs.map(r => r.n))].sort((a, b) => a - b).join(',');
  const total = Object.keys(A.subclases).length + integradas.length;
  if (total !== of.subclases.length) avisos.push(`Hay ${total} subclases (con las integradas) y el texto oficial tiene ${of.subclases.length}: ${of.subclases.map(s => s.corto).join(', ')}.`);
  const nivelesOf = new Set(of.subclases.map(s => niveles(s.rasgos)));
  for (const [k, s] of Object.entries<any>(A.subclases)) if (!nivelesOf.has(niveles(s.rasgos || []))) avisos.push(`${k}: tiene rasgos en los niveles ${niveles(s.rasgos || [])}, que no coinciden con ninguna subclase oficial (${[...nivelesOf].join(' / ')}).`);
  const altosOf = [...new Set(of.clase.filter(r => r.n > hasta && !/Ability Score Improvement|Epic Boon|Subclass Feature|Subclass$/i.test(r.nombre)).map(r => r.n))];
  const altosA = new Set(A.rasgosAltos.map((r: any) => r.n));
  const faltan = altosOf.filter(n => !altosA.has(n));
  if (faltan.length) avisos.push(`rasgosAltos: faltan rasgos de los niveles ${faltan.join(', ')} (${of.clase.filter(r => faltan.includes(r.n)).map(r => r.nombre).join(', ')}).`);

  /* ---------- B: mecánicas → reglas ---------- */
  let B: any[] = [];
  try { B = json(P.B, '['); } catch (e: any) { errores.push(`La parte B no es JSON válido: ${e.message}`); }
  const reglas = new Map<string, { de: string; n: string; campos: string[]; eleccion: string[]; opciones: string[] }>();
  const deDe = (donde: string) => donde === 'clase' ? `/^${esc(norm(clase))}$/` : `/^${esc(norm(A.subclases[donde]?.n || integradas.find((s: any) => s.key === donde)?.n || donde))}$/`;
  for (const m of B) {
    const donde_ = `${m.donde}: ${m.rasgo}`;
    const existe = todos.some(x => x.donde === m.donde && x.r.nombre === m.rasgo) || (m.donde === 'clase' && (C.rasgos || []).some((r: any) => r.nombre === m.rasgo));
    if (!existe) { errores.push(`B · ${donde_}: ese rasgo no está en A.`); continue; }
    const clave = `${m.donde}|${m.rasgo}`;
    if (!reglas.has(clave)) reglas.set(clave, { de: deDe(m.donde), n: `/^${esc(norm(m.rasgo))}$/`, campos: [], eleccion: [], opciones: [] });
    const R = reglas.get(clave)!;
    try {
      if (m.tipo === 'usos') {
        R.campos.push(`usos: ${String(m.usos).trim() === 'pb' ? "'pb'" : `c => ${formula(m.usos)}`}`, `reset: ${reset(m.reset)}`);
      } else if (m.tipo === 'conjuros') {
        const tabla = Object.entries<any>(m.por_nivel || {}).filter(([, l]) => l?.length).map(([n, l]) => [+n, l.map((x: string) => x.replace(/\s*\((?:NO ESTÁ EN LA APP|[A-Z][^)]*)\)\s*/g, '').trim())] as [number, string[]]);
        for (const [, l] of tabla) for (const x of l) if (!catalogo.has(x)) avisos.push(`B · ${donde_}: "${x}" no está en el catálogo de conjuros.`);
        R.campos.push(`texto: siempre(${JSON.stringify(tabla)})`);
      } else if (m.tipo === 'eleccion') {
        const ops = m.opciones || [];
        if (!m.id || !ops.length) throw new Error('elección sin id u opciones');
        const keys = new Set(ops.map((o: any) => o.key));
        if (keys.size !== ops.length) throw new Error('keys de opciones repetidas');
        for (const o of ops) if (o.requiere && !keys.has(o.requiere)) throw new Error(`"${o.key}" requiere "${o.requiere}", que no existe`);
        const cuantas = String(m.cuantas ?? '1').trim();
        const max = cuantas === '1' ? '' : `, max: ${porNivel(cuantas, x => { if (!/^\d+$/.test(x)) throw new Error(`cuántas "${x}"`); return x; })}`;
        R.eleccion.push(`{id: ${q(m.id)}, titulo: ${q(m.rasgo)}${max}, opciones: [\n      ${ops.map((o: any) => `{key: ${q(o.key)}, nombre: ${q(o.nombre)}, desc: ${q(o.desc || '')}${o.nivel > 1 ? `, nivel: ${+o.nivel}` : ''}${o.requiere ? `, requiere: ${q(o.requiere)}` : ''}}`).join(',\n      ')}]}`);
        for (const o of ops) R.opciones.push(`{nombre: ${q(o.nombre)}, t: ${q(TIPOS_T.includes(o.t) ? o.t : 'pasiva')}, elegida: [${q(m.id)}, ${q(o.key)}], si: c => elegidos(c, ${q(m.id)}).includes(${q(o.key)}), texto: () => ${q(o.desc || '')}}`);
      } else {
        aMano.push(`${donde_} (${m.tipo}): ${m.detalle || JSON.stringify(m)}`);
      }
    } catch (e: any) { errores.push(`B · ${donde_}: ${e.message}`); }
  }

  /* ---------- C y D ---------- */
  let Cf: Record<string, string> = {}, D: Record<string, string> = {};
  try { Cf = json(P.C, '{'); } catch (e: any) { errores.push(`La parte C no es JSON válido: ${e.message}`); }
  try { D = json(P.D, '{'); } catch (e: any) { errores.push(`La parte D no es JSON válido: ${e.message}`); }
  const subs = [...Object.keys(A.subclases), ...integradas.map((s: any) => s.key)];
  for (const k of subs) {
    if (!Cf[k]) avisos.push(`C: falta el libro de \`${k}\`.`);
    if (!D[k]) avisos.push(`D: falta la descripción de \`${k}\`.`);
  }
  for (const k of Object.keys(Cf)) if (!subs.includes(k)) avisos.push(`C: \`${k}\` no es ninguna subclase de A.`);
  const libros = new Set(of.subclases.map(s => s.libro));
  for (const [k, v] of Object.entries(Cf)) if (![...libros].some(l => norm(v).includes(norm(l.replace(/\s*\(\d+\)$/, ''))) && v.includes(l.match(/\d{4}/)![0]))) avisos.push(`C · ${k}: "${v}" no es ninguno de los libros del texto oficial (${[...libros].join(', ')}).`);

  const marcas = txt.split('\n').filter(l => /NO CONFIRMADO|NO ESTÁ EN LA APP/.test(l)).map(l => l.trim().slice(0, 200));
  for (const l of marcas) avisos.push(`Marca de Gemini: ${l}`);

  fin();
  if (!aplicar || errores.length) return;

  /* ---------- Aplicar ---------- */
  writeFileSync(`scripts/datos/${clase}-2024.ts`, `/* ${C.n} de la biblioteca puesto al día con su versión oficial más reciente (texto oficial de 5etools, redactado por
   Gemini y revisado con scripts/gemini/revisar.ts). Libros: ${[...new Set(Object.values(Cf))].join('; ')}.
   Lo aplica scripts/actualizar-clase.ts (opción "${clase}"). */

${codigoA.replace(/^\s*(\/\*[\s\S]*?\*\/\s*)?/, '')}
`);
  const cuerpo = [...reglas.values()].filter(R => R.campos.length || R.eleccion.length).map(R => `  {de:${R.de}, n:${R.n}${R.campos.length ? ', ' + R.campos.join(', ') : ''}${R.eleccion.length ? `,\n    eleccion: [${R.eleccion.join(', ')}]` : ''}${R.opciones.length ? `,\n    opciones: [\n      ${R.opciones.join(',\n      ')}]` : ''}},`).join('\n');
  const nombresSub = Object.fromEntries(subs.map(k => [k, A.subclases[k]?.n || integradas.find((s: any) => s.key === k)?.n]));
  writeFileSync(`${GENERADAS}${clase}.ts`, `/* ${C.n}: reglas, fuentes y descripciones generadas por scripts/gemini/revisar.ts a partir de la respuesta de Gemini
   (lote ${LOTES[clase]}). Se pueden retocar a mano; lo que necesite más lógica va en reglas-revisadas.ts, que tiene prioridad. */
/* eslint-disable */
// @ts-nocheck
const elegidos = (c, id) => [].concat(c.pj?.elecciones?.[id] || []);
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => \`Siempre preparados, sin contar en tu límite: \${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.\`;

export const reglas = [
${cuerpo}
];
${aMano.length ? `\n/* Para hacer a mano en reglas-revisadas.ts:\n${aMano.map(x => '   - ' + x.replace(/\*\//g, '* /')).join('\n')} */\n` : ''}
/* Libro de cada subclase, por su nombre normalizado */
export const fuentes: Record<string, string> = ${JSON.stringify(Object.fromEntries(Object.entries(Cf).filter(([k]) => nombresSub[k]).map(([k, v]) => [norm(nombresSub[k]), v])), null, 2)};

export const descripciones: Record<string, string> = ${JSON.stringify(D, null, 2)};
`);
  // Índice con todas las clases generadas
  const clases = readdirSync(GENERADAS).filter(f => /^[a-z]+\.ts$/.test(f) && f !== 'index.ts').map(f => f.replace('.ts', ''));
  writeFileSync(`${GENERADAS}index.ts`, `/* Índice de lo generado por scripts/gemini/revisar.ts (no editar a mano: se rehace al aplicar un lote) */
/* eslint-disable @typescript-eslint/no-explicit-any */
${clases.map(k => `import * as ${k} from './${k}';`).join('\n')}

const todas: any[] = [${clases.join(', ')}];
export const REGLAS_GENERADAS: any[] = todas.flatMap(x => x.reglas);
export const FUENTES_GENERADAS: Record<string, string> = Object.assign({}, ...todas.map(x => x.fuentes));
export const DESCRIPCIONES_GENERADAS: Record<string, string> = Object.assign({}, ...todas.map(x => x.descripciones));
`);
  marcarDoc(clase, C.n, todos, Cf, lib);
  spawnSync('npm', ['run', '-s', 'auditar-reglas'], { stdio: 'ignore', shell: true });
  console.log(`\nAplicado. Siguiente: npm run db:actualizar-clase -- ${clase} --ver   (y sin --ver para guardar)`);

  function fin() {
    const lista = (t: string, xs: string[]) => xs.length && console.log(`\n${t} (${xs.length})\n${xs.map(x => '  - ' + x).join('\n')}`);
    console.log(`Revisión de ${ruta}`);
    lista('ERRORES: hay que corregirlos antes de aplicar', errores);
    lista('Avisos', avisos);
    lista('Para hacer a mano', aMano);
    if (P.E?.trim()) console.log(`\nNotas de Gemini (E):\n${P.E.trim()}`);
    if (!errores.length && !aplicar) console.log('\nSin errores. Para aplicar: npm run gemini:revisar -- ' + clase + ' --aplicar');
    if (errores.length) process.exitCode = 1;
  }
}

/* Marca el lote en docs/revision-reglas.md: cada rasgo revisado con su libro, y las subclases que faltaban como agregadas */
function marcarDoc(clase: string, nombre: string, todos: { donde: string; src: string; r: any }[], Cf: Record<string, string>, lib: any) {
  const p = '../docs/revision-reglas.md';
  let d = readFileSync(p, 'utf8');
  const i = d.indexOf(`## Lote ${LOTES[clase]}: ${nombre}`);
  if (i < 0) return;
  const j = d.indexOf('\n## ', i + 5), bloque = d.slice(i, j < 0 ? undefined : j);
  const nuevas = todos.map(({ donde, src, r }) => {
    const id = `${norm(src)}|${norm(r.nombre)}`;
    if (bloque.includes(`<!-- ${id} -->`) && !bloque.includes(`- [ ] **${r.nombre}**`)) return '';
    const nueva = donde !== 'clase' && lib.subclases && !lib.subclases[donde] && !(lib.subAltos || {})[donde];
    return `- [x] **${r.nombre}** (nivel ${r.n}): \`${r.t}\`. ${nueva ? 'subclase nueva; ' : ''}${Cf[donde] || 'Manual del Jugador (2024)'}. <!-- ${id} -->`;
  }).filter(Boolean);
  if (nuevas.length) {
    const fin = j < 0 ? d.length : j;
    d = d.slice(0, fin) + (bloque.includes('### Revisados') ? '\n' : '\n### Revisados\n\n') + nuevas.join('\n') + '\n' + d.slice(fin);
  }
  // Subclases de D&D Beyond que faltaban
  d = d.replace(/- \[ \] \*\*([^*]+)\*\* \(([^)]+)\) <!-- (agregar\|[^>]*) -->/g, (m, que, libroViejo, id) => {
    const n = norm(que.replace(/\s*\(.*\)$/, ''));
    const hecho = todos.find(x => x.donde !== 'clase' && norm(x.src) === n);
    return hecho ? `- [x] **${que}** (${libroViejo}): agregado${Cf[hecho.donde] ? `, versión de ${Cf[hecho.donde]}` : ''}. <!-- ${id} -->` : m;
  });
  writeFileSync(p, d);
}

main();
