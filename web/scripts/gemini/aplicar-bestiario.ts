/* Aplica las respuestas del lote 22 (nombres y textos en español del bestiario) sobre
   src/features/reglas/data/generadas/bestiario.ts. Lee todas las ../docs/gemini/respuesta-22?-bestiario.md que haya.
   Uso: npm run gemini:aplicar-bestiario            →  solo informa (qué falta, qué no coincide)
        npm run gemini:aplicar-bestiario -- --aplicar */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { BESTIARIO_GENERADO } from '../../src/features/reglas/data/generadas/bestiario';

const DESTINO = 'src/features/reglas/data/generadas/bestiario.ts', DIR = '../docs/gemini/';
const aplicar = process.argv.includes('--aplicar');
const B: Record<string, any> = structuredClone(BESTIARIO_GENERADO);
const avisos: string[] = [];
const SIN_EFECTO = /^(no tiene efectos adicionales|sin efectos adicionales|ataque (cuerpo a cuerpo|a distancia)( o (arrojadizo|a distancia))?( b[aá]sico| simple| sin efectos adicionales))\.?$/i;
let monstruos = 0, partes = 0;
/** El nombre en español conserva los usos y la recarga del original ("(1/Day)" → "(1/día)", "(Recarga 5–6)"), que Gemini a veces omite */
function conUsos(en: string, n: string) {
  let r = n.replace(/\s*\(\d+\/D[ií]a\)/i, '');
  const dia = en.match(/\((\d+)\/Day/), rec = en.match(/\((Recarga[^)]*)\)/);
  if (dia && !/\/d[ií]a/i.test(n)) r += ` (${dia[1]}/día)`; else if (dia) r = n.replace(/\/D[ií]a/, '/día');
  if (rec && !/Recarga/.test(r)) r += ` (${rec[1]})`;
  return r;
}

const archivos = existsSync(DIR) ? readdirSync(DIR).filter(f => /^respuesta-22[a-z]-bestiario\.md$/.test(f)).sort() : [];
if (!archivos.length) { console.log('No hay respuestas del lote 22 en docs/gemini.'); process.exit(0); }
for (const f of archivos) {
  const texto = readFileSync(DIR + f, 'utf8');
  const m = texto.match(/```json\s*([\s\S]*?)```/) || [null, texto];
  let r: Record<string, any>;
  try { r = JSON.parse(m[1]!); } catch (e) { avisos.push(`${f}: el JSON no se puede leer (${(e as Error).message})`); continue; }
  for (const [k, x] of Object.entries(r)) {
    const mo = B[k];
    if (!mo) { avisos.push(`${f}: no existe el monstruo ${k}`); continue; }
    if (x.n) mo.n = x.n;
    if (x.texto) mo.texto = x.texto;
    monstruos++;
    const todas = ['rasgos', 'acciones', 'adicionales', 'reacciones', 'legendarias', 'conjuros'].flatMap(s => mo[s] || []);
    // Gemini copia el nombre tal cual del encargo: con "(conjuros)" detrás o con la marca {@recharge N} sin convertir
    const partesX: Record<string, any> = {};
    for (const [en0, p] of Object.entries<any>(x.partes || {}))
      partesX[en0.replace(/\s*\(conjuros\)$/, '').replace(/\{@recharge(?: (\d))?\}/g, (_: string, r: string) => r && r !== '6' ? `(Recarga ${r}–6)` : '(Recarga 6)').trim()] = p;
    for (const [en, p] of Object.entries<any>(partesX)) {
      const a = todas.find((y: any) => y.en === en);
      if (!a) { avisos.push(`${f}: ${k} no tiene "${en}"`); continue; }
      if (p.n) a.n = conUsos(en, p.n);
      // Las acciones sin nada que explicar no llevan texto: el bloque ya muestra el ataque, el alcance y el daño
      if (!('lista' in a)) { if (p.t && !SIN_EFECTO.test(p.t.trim())) a.t = p.t; else delete a.t; }
      partes++;
    }
    const faltan = todas.filter((y: any) => !partesX[y.en] && !('lista' in y)).map((y: any) => y.en);
    if (faltan.length) avisos.push(`${f}: ${k} sin texto para ${faltan.join(', ')}`);
    if (/NO CONFIRMADO/.test(JSON.stringify(x))) avisos.push(`${f}: ${k} tiene marcas [NO CONFIRMADO]`);
  }
}
const sin = Object.entries(B).filter(([, m]) => m.n === m.en && !m.texto).length;
console.log(`${archivos.length} respuesta(s): ${monstruos} monstruos y ${partes} rasgos o acciones con texto. Quedan ${sin} sin traducir.`);
if (avisos.length) console.log('\nAvisos:\n' + avisos.map(a => '- ' + a).join('\n'));
if (aplicar) {
  const s = readFileSync(DESTINO, 'utf8'), i = s.indexOf('= {');
  writeFileSync(DESTINO, s.slice(0, i) + '= ' + JSON.stringify(B, null, 0).replace(/\},"/g, '},\n"') + ';\n');
  console.log(`\nEscrito ${DESTINO}.`);
} else console.log('\nNo se escribió nada. Para aplicar: npm run gemini:aplicar-bestiario -- --aplicar');
