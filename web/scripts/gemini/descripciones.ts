/* Descripciones cortas (lo que sale bajo el nombre en las tarjetas de clase y subclase) de lo que todavía no las tiene.
   Un solo archivo de texto de ida y uno de vuelta, para que Gemini no lo parta en trozos.
   Uso:
     npm run gemini:encargo-descripciones     →  ../docs/gemini/lote-40-descripciones.txt  (se lo pasas a Gemini)
     (respuesta de Gemini)                    →  ../docs/gemini/respuesta-40-descripciones.txt
     npm run gemini:aplicar-descripciones     →  informa; con --aplicar escribe src/features/reglas/data/descripciones-extra.ts */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { DESC_CLASES, DESC_SUBCLASES } from '../../src/features/reglas/data/descripciones';
import { SUBCLASES } from '../../src/features/reglas/data/subclases';
import { CLASES } from '../../src/features/reglas/data/clases';

const ENCARGO = '../docs/gemini/lote-40-descripciones.txt';
const RESPUESTA = '../docs/gemini/respuesta-40-descripciones.txt';
const DESTINO = 'src/features/reglas/data/descripciones-extra.ts';
const biblioteca = JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8'));
const corto = (s: string, n: number) => { const t = String(s || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n).replace(/\s\S*$/, '') + '…' : t; };

type Item = { tipo: 'c' | 's'; clave: string; nombre: string; de: string; rasgos: any[] };
function elementos(soloPendientes: boolean): Item[] {
  const out: Item[] = [];
  const falta = (d: Record<string, any>, k: string) => !soloPendientes || !d[k];
  for (const k of Object.keys(CLASES)) if (falta(DESC_CLASES, k)) out.push({ tipo: 'c', clave: k, nombre: (CLASES as any)[k].n, de: '', rasgos: [] });
  for (const [k, C] of Object.entries<any>(biblioteca.clases)) {
    if (C.dado && falta(DESC_CLASES, k.replace(/^lib:/, ''))) out.push({ tipo: 'c', clave: k.replace(/^lib:/, ''), nombre: C.n, de: C.src || '', rasgos: C.rasgos || [] });
    for (const [sk, s] of Object.entries<any>(C.subclases || {})) if (falta(DESC_SUBCLASES, sk)) out.push({ tipo: 's', clave: sk, nombre: s.n, de: C.n || k, rasgos: s.rasgos || [] });
  }
  for (const s of SUBCLASES as any[]) if (falta(DESC_SUBCLASES, s.key) && !out.some(o => o.clave === s.key)) out.push({ tipo: 's', clave: s.key, nombre: s.n, de: s.clase, rasgos: [] });
  return out;
}
const pendientes = () => elementos(true);

function encargo() {
  const items = pendientes();
  const bloque = (i: Item) => `${i.clave} | ${i.nombre}${i.de ? ` (${i.tipo === 'c' ? 'fuente' : 'clase'}: ${i.de})` : ''}\n` +
    i.rasgos.slice(0, i.tipo === 'c' ? 10 : 5).map((r: any) => `  - nivel ${r.n} ${r.nombre}: ${corto(r.texto, i.tipo === 'c' ? 60 : 110)}`).join('\n');
  const txt = `TAREA: escribir la descripción corta de cada clase y subclase de la lista, para la app "Mi turno" (hojas de personaje de D&D 2024, en español).

REGLAS
1. Una sola frase de 80 a 140 caracteres que diga qué fantasía o estilo de juego da y qué hace de especial. Sin punto final si queda más limpio.
2. Estilo de Wizards of the Coast en español: directo, en presente, sin adornos ni publicidad; vocabulario del Manual del Jugador 2024 en español
   (acción adicional, tirada de salvación, Puntos de Golpe, descanso corto...). Habla del grupo en plural ("Guerreros que...", "Agentes que...").
3. Con palabras propias: no copies ni traduzcas literal el texto de los rasgos; resúmelo.
4. No inventes nombres en español. Si nombras un rasgo o un nombre propio sin traducción oficial, déjalo en inglés.
5. Hay ${items.length} elementos. Responde TODOS, en este mismo chat y sin partirlos en varias respuestas ni en varios archivos.

FORMATO DE LA RESPUESTA (texto plano, un elemento por línea, sin viñetas, sin negritas, sin nada antes ni después)
clave | descripción

Ejemplo (inventado, no es de la lista):
ejemplo | Tiradores que convierten cada disparo en un truco: puntería, recarga rápida y ases bajo la manga

LISTA (clave | nombre; debajo, rasgos de ejemplo para entender de qué va)

${items.map(bloque).join('\n\n')}
`;
  writeFileSync(ENCARGO, txt);
  console.log(`${ENCARGO}: ${items.length} elementos (${items.filter(i => i.tipo === 'c').length} clases, ${items.filter(i => i.tipo === 's').length} subclases), ${(txt.length / 1024).toFixed(1)} KB`);
}

function aplicar(escribir: boolean) {
  if (!existsSync(RESPUESTA)) { console.log(`Falta ${RESPUESTA}: pega ahí la respuesta de Gemini.`); process.exit(1); }
  // Con la respuesta ya aplicada una vez, esas claves dejan de estar pendientes: se acepta cualquier clase o subclase conocida
  const claves = new Map(elementos(false).map(i => [i.clave, i]));
  const ok: Record<string, string> = {}, avisos: string[] = [];
  for (const linea of readFileSync(RESPUESTA, 'utf8').split(/\r?\n/)) {
    const m = linea.replace(/^[\s*\-•]+/, '').match(/^([\w:-]+)\s*\|\s*(.+)$/);
    if (!m) continue;
    const [, k, d0] = m; const d = d0.replace(/\*\*|\[cite[^\]]*\]/g, '').replace(/\s+/g, ' ').trim();
    if (!claves.has(k)) { avisos.push(`${k}: no es una clase ni una subclase de la app; se ignora.`); continue; }
    if (d.length < 40 || d.length > 220) avisos.push(`${k}: ${d.length} caracteres (ideal 80 a 140).`);
    if (/NO CONFIRMADO|PROPUESTA/i.test(d)) avisos.push(`${k}: trae una marca de duda.`);
    ok[k] = d.replace(/'/g, '’');
  }
  const faltan = pendientes().map(i => i.clave).filter(k => !ok[k]);
  console.log(`${Object.keys(ok).length} descripciones leídas; pendientes de la lista: ${pendientes().length}.${faltan.length ? ' Faltan: ' + faltan.join(', ') : ''}`);
  avisos.forEach(a => console.log('  aviso · ' + a));
  if (!escribir) { console.log('Con --aplicar se escriben en ' + DESTINO); return; }
  const cl = [...claves.values()].filter(i => i.tipo === 'c' && ok[i.clave]).map(i => `  '${i.clave}': '${ok[i.clave]}',`);
  const sb = [...claves.values()].filter(i => i.tipo === 's' && ok[i.clave]).map(i => `  '${i.clave}': '${ok[i.clave]}',`);
  writeFileSync(DESTINO, `/* Descripciones cortas de clases y subclases (lote 40, scripts/gemini/descripciones.ts). Las de descripciones.ts tienen prioridad. */\n` +
    `export const DESC_CLASES_EXTRA: Record<string, string> = {\n${cl.join('\n')}\n};\nexport const DESC_SUBCLASES_EXTRA: Record<string, string> = {\n${sb.join('\n')}\n};\n`);
  console.log(`${DESTINO} escrito.`);
}

if (process.argv.includes('--aplicar-respuesta')) aplicar(process.argv.includes('--aplicar'));
else encargo();
