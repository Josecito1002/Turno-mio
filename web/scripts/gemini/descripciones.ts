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
import { DESC_LARGAS_CLASES, DESC_LARGAS_SUBCLASES } from '../../src/features/reglas/data/descripciones-largas';

const ESTILO = '../docs/gemini/estilo-y-glosario.txt';
// Con --largas: lote 41, descripciones largas (lo que se ve al elegir la clase o la subclase) de TODAS las clases y subclases
const LARGAS = process.argv.includes('--largas');
// Con --lote2: lote 42, solo lo que el 41 no dejó bien (Gemini se degradó en la parte final de la respuesta larga)
const LOTE2 = process.argv.includes('--lote2');
const NN = LOTE2 ? '42' : '41';
const ENCARGO = LARGAS ? `../docs/gemini/lote-${NN}-descripciones-largas.txt` : '../docs/gemini/lote-40-descripciones.txt';
const RESPUESTA = LARGAS ? `../docs/gemini/respuesta-${NN}-descripciones-largas.txt` : '../docs/gemini/respuesta-40-descripciones.txt';
const DESTINO = LARGAS ? 'src/features/reglas/data/descripciones-largas.ts' : 'src/features/reglas/data/descripciones-extra.ts';
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
const pendientes = () => LARGAS ? elementos(false).filter(i => !(i.tipo === 'c' ? DESC_LARGAS_CLASES : DESC_LARGAS_SUBCLASES)[i.clave]) : elementos(true);
// En el lote 42 la clave lleva c: o s: porque una clase y una subclase pueden llamarse igual (Investigator)
const claveDe = (i: Item) => LARGAS && LOTE2 ? `${i.tipo}:${i.clave}` : i.clave;
// Gemini se degrada al final de una respuesta muy larga: texto repetitivo, con adjetivos apilados o demasiado largo
const sospechosa = (d: string) => { const w = d.toLowerCase().split(/\s+/); return new Set(w).size / w.length < 0.78 || d.length > 520 || d.length < 150; };

function encargo() {
  const items = pendientes();
  const bloque = (i: Item) => `${claveDe(i)} | ${i.nombre}${i.de ? ` (${i.tipo === 'c' ? 'fuente' : 'clase'}: ${i.de})` : ''}\n` +
    (LARGAS ? `  corta: ${(i.tipo === 'c' ? DESC_CLASES : DESC_SUBCLASES)[i.clave] || ''}\n` : '') +
    i.rasgos.slice(0, i.tipo === 'c' ? 10 : 5).map((r: any) => `  - nivel ${r.n} ${r.nombre}: ${corto(r.texto, i.tipo === 'c' ? 60 : 110)}`).join('\n');
  const txt = LARGAS ? `TAREA: escribir la descripción larga de cada clase y subclase de la lista, para la app "Mi turno" (hojas de personaje de D&D 2024, en español). Se muestra al elegir la clase o la subclase, para decidir si te gusta.

REGLAS
1. De 250 a 400 caracteres, en uno o dos párrafos cortos sin saltos de línea: qué fantasía da, cómo se juega (qué gasta, cuándo brilla, qué papel cumple en el grupo) y qué la hace distinta. Empieza distinto de la descripción corta, sin repetirla. Frases normales y sobrias: no apiles adjetivos ni repitas palabras (mal: "letales puros veloces tácticos"); si no tienes más que decir, escribe menos. La calidad de la última descripción debe ser igual a la de la primera.
2. Estilo de Wizards of the Coast en español: directo, en presente, sin adornos ni publicidad; vocabulario del Manual del Jugador 2024 en español. Habla en tercera persona del plural ("Guerreros que...").
3. Con palabras propias: no copies ni traduzcas literal el texto de los rasgos; resúmelo. No inventes datos que los rasgos no den.
4. No inventes nombres en español. Si nombras un rasgo o un nombre propio sin traducción oficial, déjalo en inglés.
5. Hay ${items.length} elementos. Responde TODOS, en este mismo chat y sin partirlos en varias respuestas ni en varios archivos.

FORMATO DE LA RESPUESTA (texto plano, un elemento por línea, sin viñetas, sin negritas, sin nada antes ni después)
clave | descripción larga

${existsSync(ESTILO) ? readFileSync(ESTILO, 'utf8').trim() + '\n\n' : ''}LISTA (clave | nombre; debajo, la descripción corta y rasgos de ejemplo)

${items.map(bloque).join('\n\n')}
` : `TAREA: escribir la descripción corta de cada clase y subclase de la lista, para la app "Mi turno" (hojas de personaje de D&D 2024, en español).

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

${existsSync(ESTILO) ? readFileSync(ESTILO, 'utf8').trim() + '\n\n' : ''}LISTA (clave | nombre; debajo, rasgos de ejemplo para entender de qué va)

${items.map(bloque).join('\n\n')}
`;
  writeFileSync(ENCARGO, txt);
  console.log(`${ENCARGO}: ${items.length} elementos (${items.filter(i => i.tipo === 'c').length} clases, ${items.filter(i => i.tipo === 's').length} subclases), ${(txt.length / 1024).toFixed(1)} KB`);
}

function aplicar(escribir: boolean) {
  if (!existsSync(RESPUESTA)) { console.log(`Falta ${RESPUESTA}: pega ahí la respuesta de Gemini.`); process.exit(1); }
  // Con la respuesta ya aplicada una vez, esas claves dejan de estar pendientes: se acepta cualquier clase o subclase conocida
  const claves = new Map<string, Item>(elementos(false).flatMap(i => [[i.clave, i], [`${i.tipo}:${i.clave}`, i]] as [string, Item][]));
  const ok: Record<string, string> = {}, avisos: string[] = [], rechazadas: string[] = [];
  // Gemini a veces junta todo en una sola línea: se parte por cada "clave | " conocida
  const texto = readFileSync(RESPUESTA, 'utf8').replace(/^\uFEFF/, '').replace(/\r?\n/g, ' ');
  const ordenadas = [...claves.keys()].sort((x, y) => y.length - x.length).map(k => k.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
  const marcas = [...texto.matchAll(new RegExp(`(?:^|\\s)(${ordenadas.join('|')})\\s*\\|\\s*`, 'g'))];
  marcas.forEach((m, i) => {
    const k = m[1], it = claves.get(k)!, kk = `${it.tipo}:${it.clave}`, d = texto.slice(m.index! + m[0].length, marcas[i + 1]?.index ?? texto.length).replace(/\*\*|\[cite[^\]]*\]/g, '').replace(/\s+/g, ' ').trim();
    if (LARGAS ? d.length < 150 || d.length > 600 : d.length < 40 || d.length > 220) avisos.push(`${k}: ${d.length} caracteres (ideal ${LARGAS ? '250 a 400' : '80 a 140'}).`);
    if (/NO CONFIRMADO|PROPUESTA/i.test(d)) avisos.push(`${k}: trae una marca de duda.`);
    // Lote 41: se descarta lo repetitivo y el tramo final degradado (los de la posición 150 a 250); esos pasan al lote 42
    if (LARGAS && (sospechosa(d) || (!LOTE2 && i >= 150 && i <= 250))) { rechazadas.push(kk); return; }
    ok[kk] = d.replace(/'/g, '’');
  });
  if (rechazadas.length) console.log(`${rechazadas.length} descartadas por mala calidad (van al lote 42 con --lote2): ${rechazadas.join(', ')}`);
  const faltan = pendientes().map(i => `${i.tipo}:${i.clave}`).filter(k => !ok[k] && !rechazadas.includes(k));
  console.log(`${Object.keys(ok).length} descripciones leídas; pendientes de la lista: ${pendientes().length}.${faltan.length ? ' Faltan: ' + faltan.join(', ') : ''}`);
  avisos.forEach(a => console.log('  aviso · ' + a));
  if (!escribir) { console.log('Con --aplicar se escriben en ' + DESTINO); return; }
  const todo = new Map([...claves.values()].map(i => [`${i.tipo}:${i.clave}`, i]));
  const previo = (t: 'c' | 's') => (LARGAS ? Object.entries(t === 'c' ? DESC_LARGAS_CLASES : DESC_LARGAS_SUBCLASES) : []).map(([k, d]) => [`${t}:${k}`, d] as const);
  const lineas = (t: 'c' | 's') => [...previo(t), ...[...todo.values()].filter(i => i.tipo === t && ok[`${t}:${i.clave}`]).map(i => [`${t}:${i.clave}`, ok[`${t}:${i.clave}`]] as const)]
    .map(([k, d]) => `  '${k.slice(2)}': '${d}',`);
  const cl = lineas('c'), sb = lineas('s');
  writeFileSync(DESTINO, LARGAS
    ? `/* Descripciones largas de clases y subclases (lotes 41 y 42, scripts/gemini/descripciones.ts --largas). Salen al elegir la clase o la subclase. */\nexport const DESC_LARGAS_CLASES: Record<string, string> = {\n${cl.join('\n')}\n};\nexport const DESC_LARGAS_SUBCLASES: Record<string, string> = {\n${sb.join('\n')}\n};\n`
    : `/* Descripciones cortas de clases y subclases (lote 40, scripts/gemini/descripciones.ts). Las de descripciones.ts tienen prioridad. */\n` +
    `export const DESC_CLASES_EXTRA: Record<string, string> = {\n${cl.join('\n')}\n};\nexport const DESC_SUBCLASES_EXTRA: Record<string, string> = {\n${sb.join('\n')}\n};\n`);
  console.log(`${DESTINO} escrito.`);
}

if (process.argv.includes('--aplicar-respuesta')) aplicar(process.argv.includes('--aplicar'));
else encargo();
