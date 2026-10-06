/* Convierte las respuestas de Gemini de una clase de playtest (Investigator, Gunslinger, Illrigger, Savant, Warden,
   Warlord, Craftsman) al formato de la biblioteca. Lee todas las respuestas de la clase, limpia los textos, normaliza la
   clase, sus subclases y sus conjuros nuevos, e informa de lo que hay que corregir.
   Uso: npm run gemini:playtest -- <clase> [--aplicar]      (clase: investigador, gunslinger, illrigger, ...)
   Sin --aplicar solo informa. Con --aplicar escribe en biblioteca-mi-turno.json (la base se pone al día al publicar).
   Lo que sale en B (usos, elecciones, daños) no se aplica aquí: el informe lo lista para escribirlo en reglas-revisadas.ts. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { norm } from '../../src/shared/utils/texto';
import { SKILLS } from '../../src/features/reglas/data/caracteristicas';

/* Característica de lanzamiento de las clases que la tienen sin ser lanzadoras (la respuesta de Gemini no trae ese dato) */
const AJUSTES_LANZ: Record<string, string> = { 'lib:investigator': 'int' };
const CLASES: Record<string, { clave: string; src: string }> = {
  investigador: { clave: 'lib:investigator', src: 'Investigator (Mage Hand Press, 2024)' },
  gunslinger: { clave: 'lib:gunslinger', src: 'Gunslinger (playtest)' },
  illrigger: { clave: 'lib:illrigger', src: 'Illrigger Revised (playtest)' },
  savant: { clave: 'lib:savant', src: 'Savant (playtest)' },
  warden: { clave: 'lib:warden', src: 'Warden (playtest)' },
  warlord: { clave: 'lib:warlord', src: 'Warlord (playtest)' },
  craftsman: { clave: 'lib:craftsman', src: 'Craftsman (playtest)' },
  beastheart: { clave: 'lib:beastheart', src: 'Beastheart (Monstrous Companions, playtest)' },
};
const TIPOS_T = ['accion', 'adicional', 'reaccion', 'gratis', 'pasiva', 'fuera'];
const SV: Record<string, string> = { fuerza: 'fue', destreza: 'des', constitucion: 'con', inteligencia: 'int', sabiduria: 'sab', carisma: 'car', strength: 'fue', dexterity: 'des', constitution: 'con', intelligence: 'int', wisdom: 'sab', charisma: 'car' };
const HAB_SINONIMOS: Record<string, string> = { 'conocimiento arcano': 'Arcanos', arcano: 'Arcanos', 'manitas': 'Juego de Manos', 'juego de manos': 'Juego de Manos', 'trato animal': 'Trato con Animales' };
const kebab = (s: string) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* Quita lo que Gemini deja en los textos: [cite: 3], (PROPUESTA), negritas y cursivas */
const limpio = (s: any) => String(s ?? '').replace(/\[cite:[^\]]*\]/g, '').replace(/\s*\(PROPUESTA\)/gi, '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*\n]+)\*/g, '$1').replace(/[ \t]+\n/g, '\n').replace(/ {2,}/g, ' ').trim();
/* "Ritualista (Ritualist)" → "Ritualista" */
const sinIngles = (s: string) => { const t = limpio(s); const m = t.match(/^(.+?)\s*\(([A-Za-z'’\- ,:]+)\)\s*$/); return m && /[a-záéíóúñ]/i.test(m[1]) ? m[1].trim() : t; };

type Aviso = string;
const avisos: Aviso[] = [], aMano: string[] = [];

function partes(txt: string) {
  const out: Record<string, string> = {};
  const t = txt.split(/^\s*=+\s*([A-E])\s*=+\s*$/m);
  if (t.length >= 3) for (let i = 1; i < t.length; i += 2) out[t[i]] = t[i + 1] || '';
  else out.A = txt; // sin marcadores: se intenta con todo el archivo
  return out;
}
const codigo = (s = '') => {
  const m = s.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
  if (m) return m[1].trim();
  // Sin bloque de código: desde el primer "export const" hasta la última llave
  const t = s.replace(/```[a-zA-Z]*/g, ''), i = t.indexOf('export const'), j = Math.max(t.lastIndexOf('}'), t.lastIndexOf(']'));
  return (i >= 0 && j > i ? t.slice(i, j + 1) : t).trim();
};

async function cargar(ruta: string, id: string): Promise<Record<string, any>> {
  const P = partes(readFileSync(ruta, 'utf8'));
  mkdirSync('.cache/gemini', { recursive: true });
  const tmp = resolve(`.cache/gemini/pt-${id}-${Date.now()}.ts`);
  writeFileSync(tmp, codigo(P.A));
  try { return await import(pathToFileURL(tmp).href); } catch (e: any) { avisos.push(`${id}: la parte A no es TypeScript válido (${String(e.message).split('\n').slice(1, 2).join(' ').replace(/^.*scratch[^:]*:|^.*\.ts:/, 'línea ')})`); return {}; }
}

/* ---------- Normalizadores ---------- */
function rasgo(r: any, donde: string, soloClase = false) {
  let nombre = r.nombre, texto = String(r.texto ?? '');
  if (!nombre) { const m = texto.match(/^\s*\*\*(.+?)\*\*\s*\n?/); if (m) { nombre = m[1]; texto = texto.slice(m[0].length); } }
  nombre = sinIngles(nombre || '');
  if (!nombre) avisos.push(`${donde}: un rasgo sin nombre (nivel ${r.n}).`);
  const t = TIPOS_T.includes(r.t) ? r.t : 'pasiva';
  if (r.t && !TIPOS_T.includes(r.t)) avisos.push(`${donde} · ${nombre}: tipo "${r.t}" no válido; queda pasiva.`);
  const reset = /corto/i.test(r.reset || '') ? 'corto' : 'largo';
  if (r.reset && !/^(largo|corto)( o (largo|corto))?$/i.test(r.reset) && !/ninguno|^$/i.test(r.reset)) avisos.push(`${donde} · ${nombre}: descanso "${r.reset}" no es corto ni largo.`);
  const usos = typeof r.usos === 'number' ? r.usos : /^pb$/i.test(String(r.usos ?? '').trim()) ? 'pb' : /^\d+$/.test(String(r.usos ?? '').trim()) ? +r.usos : 0;
  if (r.usos && usos === 0 && !/^0*$/.test(String(r.usos))) avisos.push(`${donde} · ${nombre}: usos "${r.usos}" no es un número.`);
  const txt = limpio(texto);
  if (!txt || txt.length < 15) avisos.push(`${donde} · ${nombre}: sin texto.`);
  if (/NO CONFIRMADO/i.test(txt)) avisos.push(`${donde} · ${nombre}: tiene una marca NO CONFIRMADO.`);
  if (!Number.isInteger(r.n) || r.n < 1 || r.n > 20) avisos.push(`${donde} · ${nombre}: nivel ${r.n} no válido.`);
  void soloClase;
  return { nombre, t, texto: txt, n: r.n, manual: true, usos, reset };
}

function clase(v: any, ruta: string, c: { clave: string; src: string }, nombreExport = '') {
  const dado = typeof v.dado === 'number' ? v.dado : +String(v.dado).replace(/\D*(\d+)$/, '$1');
  const sv = [].concat(typeof v.sv === 'string' ? v.sv.split(/,|\sy\s/).map((x: string) => x.trim()).filter(Boolean) : v.sv || []).map((x: string) => SV[norm(x)] || (['fue', 'des', 'con', 'int', 'sab', 'car'].includes(norm(x)) ? norm(x) : (avisos.push(`${ruta}: salvación "${x}" desconocida.`), '')));
  const habs = (v.habs || []).map((h: string) => HAB_SINONIMOS[norm(h)] || SKILLS.find(([n]) => norm(n) === norm(h))?.[0] || (avisos.push(`${ruta}: habilidad "${h}" no existe en la app.`), h));
  const armTxt = norm([].concat(v.arm || []).join(' ')), armaTxt = norm([].concat(v.armas || []).join(' '));
  const marcial = /marcial/.test(armaTxt);
  const rasgos = (v.rasgos || []).map((r: any) => rasgo(r, `${ruta} (clase)`, true));
  const asi = rasgos.filter((r: any) => /mejora de caracteristica|don epico/.test(norm(r.nombre))).map((r: any) => r.n);
  // Maestría con armas: el texto dice con cuántos tipos de arma
  const mae = rasgos.find((r: any) => /maestria en armas/.test(norm(r.nombre)));
  const maestrias = mae ? (/\btres\b/i.test(mae.texto) ? 3 : /\bdos\b/i.test(mae.texto) ? 2 : 1) : 0;
  return {
    n: sinIngles(typeof v.n === 'string' ? v.n : typeof v.nombre === 'string' ? v.nombre : nombreExport || ruta), lib: true, src: c.src, dado, sv, habN: v.habN || 2, habs,
    arm: /todas/.test(armTxt) ? 'Todas las armaduras y escudos' : /pesad/.test(armTxt) ? 'Ligeras, medias, pesadas y escudos' : /media/.test(armTxt) ? 'Ligeras, medias y escudos' : /ligera/.test(armTxt) ? 'Ligeras' : 'Ninguna',
    armas: marcial ? 'Armas sencillas y marciales' : 'Armas sencillas',
    w: { simple: 1, martial: marcial ? 1 : 0, light: 0, finesseLight: 0 }, lanz: v.lanz || AJUSTES_LANZ[c.clave] || null, caster: v.caster || null,
    asi: asi.length ? asi : [4, 8, 12, 16, 19], estilo: 0, estilos: [], maestrias, hasta: 0, rasgos,
  };
}

function subclase(v: any, ruta: string) {
  const rasgos = (v.rasgos || []).map((r: any) => rasgo(r, ruta));
  const niveles = [...new Set(rasgos.map((r: any) => r.n))].sort((a: any, b: any) => a - b).join(',');
  if (!/^3/.test(niveles)) avisos.push(`${ruta}: sus rasgos empiezan en el nivel ${niveles.split(',')[0]}, no en el 3.`);
  return { n: sinIngles(v.n || ruta), rasgos };
}

const TIEMPO = (t: string) => { const x = norm(t); return /reaccion/.test(x) ? 'reaccion' : /adicional|bonus/.test(x) ? 'adicional' : /minuto|hora|ritual/.test(x) && !/^1 accion/.test(x) ? 'fuera' : 'accion'; };
function conjuro(v: any, ruta: string, claveClase: string) {
  const nombre = sinIngles(v.nombre);
  if (/NO CONFIRMADO/i.test(JSON.stringify(v))) avisos.push(`${ruta} · ${nombre}: tiene una marca NO CONFIRMADO.`);
  const dur = limpio(v.duracion || '');
  return {
    nombre, nivel: v.nivel, tiempo: TIEMPO(v.tiempo || ''), alcance: limpio(v.alcance || ''), dur, conc: /concentraci/i.test(dur), ritual: !!v.ritual,
    salv: '', ataque: false, dados: '', desc: `${v.componentes ? `Componentes: ${limpio(v.componentes)}. ` : ''}${limpio(v.desc)}`, clases: [claveClase],
  };
}

async function main() {
  const args = process.argv.slice(2), grupo = args.find(a => !a.startsWith('--')) || '', aplicar = args.includes('--aplicar');
  const c = CLASES[grupo];
  if (!c) { console.error('Clase: ' + Object.keys(CLASES).join(', ')); process.exit(1); }
  const dir = '../docs/gemini';
  const archivos = readdirSync(dir).filter(f => new RegExp(`^respuesta-\\d+[a-z]?-${grupo}[^/]*\\.md$`).test(f)).sort();
  if (!archivos.length) { console.error(`No hay respuestas para ${grupo} en ${dir}.`); process.exit(1); }

  let claseObj: any = null; const subs: Record<string, any> = {}; const conjuros: Record<string, any> = {}; const deQuien: Record<string, string> = {};
  const agregarSub = (k: string, v: any, id: string) => { if (subs[k]) avisos.push(`${id}: la subclase ${k} ya venía en ${deQuien[k]}; se usa esta.`); subs[k] = v; deQuien[k] = id; };
  for (const f of archivos) {
    const id = f.replace(/^respuesta-|\.md$/g, '');
    const mod = await cargar(`${dir}/${f}`, id);
    for (const [k, v] of Object.entries<any>(mod)) {
      if (!v || typeof v !== 'object') continue;
      if (Array.isArray(v.rasgos) && 'dado' in v) { if (claseObj) avisos.push(`${id}: ${k} es una segunda definición de la clase; se usa la última.`); claseObj = clase(v, id, c, k.replace(/^./, (x: string) => x.toUpperCase())); }
      else if (Array.isArray(v.rasgos) && /reglas|propiedades|compatibilidad/i.test(`${k} ${v.n}`)) aMano.push(`${id}: ${k} son reglas generales (${v.rasgos.length} apartados), no una subclase; se aplica a mano.`);
      else if (Array.isArray(v.rasgos)) {
        // Gemini a veces pone en "n" un nivel; entonces el nombre sale del nombre de la variable (academyOfChivalry → Academy Of Chivalry)
        const nom = typeof v.n === 'string' ? v.n : k.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ').replace(/^./, (x: string) => x.toUpperCase());
        agregarSub(kebab(nom.replace(/\(.*\)/, '')) || kebab(k), subclase({ ...v, n: nom }, `${id}/${k}`), id);
      }
      else if (Object.values(v).length && Object.values<any>(v).every(x => x && Array.isArray(x.rasgos))) for (const [kk, vv] of Object.entries<any>(v)) agregarSub(kebab(kk), subclase(vv, `${id}/${kk}`), id);
      else if (Object.values(v).length && Object.values<any>(v).every(x => x && x.nombre && x.nivel != null && x.desc)) for (const [kk, vv] of Object.entries<any>(v)) conjuros[kebab(kk)] = conjuro(vv, `${id}/${kk}`, c.clave);
      else aMano.push(`${id}: ${k} (${Array.isArray(v) ? 'lista' : 'objeto'} de ${Object.keys(v).length}) no tiene forma de clase, subclase ni conjuros; se aplica a mano.`);
    }
  }
  if (!claseObj) { console.error(`Ninguna respuesta de ${grupo} define la clase (un objeto con "dado" y "rasgos").`); process.exitCode = 1; }
  if (claseObj) claseObj.subclases = subs;

  console.log(`${c.clave}: ${archivos.length} respuesta(s) leídas`);
  if (claseObj) console.log(`  Clase ${claseObj.n}: d${claseObj.dado}, salvaciones ${claseObj.sv.join('/')}, ${claseObj.rasgos.length} rasgos, ${Object.keys(subs).length} subclases, ${Object.keys(conjuros).length} conjuros nuevos`);
  for (const [k, s] of Object.entries<any>(subs)) console.log(`    · ${k}: ${s.n} (${s.rasgos.length} rasgos)`);
  const lista = (t: string, xs: string[]) => xs.length && console.log(`\n${t} (${xs.length})\n${xs.map(x => '  - ' + x).join('\n')}`);
  lista('Avisos: conviene corregirlos', avisos);
  lista('Para hacer a mano', aMano);
  if (!aplicar || !claseObj) { if (!aplicar && claseObj) console.log(`\nPara guardar en la biblioteca: npm run gemini:playtest -- ${grupo} --aplicar`); return; }

  const ruta = '../biblioteca-mi-turno.json';
  const lib = JSON.parse(readFileSync(ruta, 'utf8'));
  lib.clases[c.clave] = claseObj;
  let nuevos = 0;
  for (const [k, v] of Object.entries(conjuros)) { if (!lib.conjuros[k]) nuevos++; lib.conjuros[k] = { ...(lib.conjuros[k] || {}), ...v }; }
  writeFileSync(ruta, JSON.stringify(lib, null, 1).replace(/\n/g, '\r\n'));
  console.log(`\n${ruta} actualizado: ${c.clave} (${claseObj.rasgos.length} rasgos, ${Object.keys(subs).length} subclases) y ${nuevos} conjuros nuevos. Falta: reglas (usos, elecciones), fuente y descripciones.`);
}

if (!existsSync('../biblioteca-mi-turno.json')) { console.error('Corre este comando desde mi-turno/web.'); process.exit(1); }
main();
