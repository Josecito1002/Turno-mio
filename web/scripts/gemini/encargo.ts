/* Arma el encargo de un lote para Gemini: el texto oficial más reciente de la clase (para que no tenga que buscar),
   lo que tiene hoy la app y el formato exacto de la respuesta, que después lee scripts/gemini/revisar.ts.
   Uso: npm run gemini:encargo -- druida   →   ../docs/gemini/lote-09-druida.md */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { CLASES } from '../../src/features/reglas/data/clases';
import { SUBCLASES } from '../../src/features/reglas/data/subclases';
import { CATALOGO } from '../../src/features/reglas/data/conjuros';
import { oficial, type Rasgo } from './oficial';

export const LOTES: Record<string, number> = { brujo: 7, clerigo: 8, druida: 9, explorador: 10, guerrero: 11, hechicero: 12, mago: 13, monje: 14, paladin: 15, picaro: 16 };
export const archivoLote = (clase: string, que: 'lote' | 'respuesta') => `../docs/gemini/${que}-${String(LOTES[clase]).padStart(2, '0')}-${clase}.md`;

/* Los textos de las reglas a veces son funciones del personaje: se evalúan con uno de nivel 20 y modificadores +3 */
const pj: any = new Proxy({ lvl: 20, pb: 6, m: new Proxy({}, { get: () => 3 }), md: 12 }, { get: (o: any, k) => (k in o ? o[k] : 15) });
const texto = (t: any) => { try { return typeof t === 'function' ? t(pj) : t || ''; } catch { return '(se calcula en el código)'; } };
const linea = (r: any) => `- Nivel ${r.n} · ${r.nombre} [${r.t || 'pasiva'}]: ${texto(r.texto)}`.replace(/\s+/g, ' ');
const lineaOficial = (r: Rasgo) => `- Nivel ${r.n} · ${r.nombre}: ${r.texto}`.replace(/\s+/g, ' ');

async function main() {
  const clase = process.argv[2];
  if (!clase || !LOTES[clase]) { console.error('Clase: ' + Object.keys(LOTES).join(', ')); process.exit(1); }
  const C = CLASES[clase] as any, nom = C.n as string, num = LOTES[clase], hasta = C.hasta || 5;
  const biblioteca = JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8'));
  const lib = biblioteca.clases[clase] || {};
  const doc = readFileSync('../docs/revision-reglas.md', 'utf8');
  const of = await oficial(clase);
  const integradas = SUBCLASES.filter((s: any) => s.clase === clase);

  /* Selectores pendientes de este lote en el documento de revisión */
  const selectores = (doc.split(/^## /m).find(b => b.startsWith('Selectores')) || '').split(/^### /m)
    .filter(b => b.startsWith(`Lote ${num}:`)).map(b => b.split('\n').slice(1).join('\n').trim()).join('\n').replace(/ ?<!--.*?-->/g, '');

  const partes: string[] = [];
  partes.push(`# Encargo: Lote ${num} (${nom}) de la app "Mi turno"

"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el formato
de abajo, la clase **${nom}** y todas sus subclases, usando **solo el texto oficial en inglés que viene al final** de
este encargo. Ese texto ya es la versión más reciente de cada cosa y sus niveles ya están adaptados a 2024: no busques
otras versiones ni cambies niveles. Otra persona revisa y aplica tu respuesta con un script, así que el formato tiene
que ser exacto.

## Reglas

1. **Una subclase por cada subclase del texto oficial**, ni más ni menos. Si la app ya la tiene (lista "Lo que tiene
   hoy la app"), usa su misma clave; si es nueva, inventa una clave en minúsculas-con-guiones.
2. **Textos propios en español**, de 1 a 3 frases por rasgo, que expliquen qué hace para quien juega. No traduzcas
   literal: resume con tus palabras. Nombres: la traducción oficial al español si la conoces.
3. **Conjuros con el nombre exacto de la lista "Conjuros de la app"** (por ejemplo "Ayuda", no "Auxilio"). Si uno no
   está en la lista, pon tu traducción y detrás (NO ESTÁ EN LA APP).
4. Tipos de acción para \`t\`: accion, adicional (acción adicional), reaccion, gratis (sin acción, por ejemplo al acertar),
   pasiva, fuera (fuera de combate o ritual).
5. Si algo no se entiende en el texto oficial, escríbelo igual con la marca [NO CONFIRMADO].

## Formato de la respuesta

Responde **solo** con estas cinco partes, en este orden, cada una empezando con su marcador solo en una línea
(\`=== A ===\`, \`=== B ===\`...). Nada antes de la primera ni después de la última.

=== A ===
Código TypeScript, exactamente con esta forma:

\`\`\`ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const ${clase.toUpperCase()}_2024 = {
  // Rasgos de la clase de nivel ${hasta + 1} a 20 (sin "Ability Score Improvement", "Epic Boon" ni "Subclass Feature")
  rasgosAltos: [
    r(9, 'Nombre del rasgo', 'accion', 'Texto propio.', { usos: 1, reset: 'largo' }),  // usos/reset solo si son un número fijo
  ],
  // Rasgos de nivel 6 en adelante de las subclases integradas en la app (claves: ${integradas.map((s: any) => s.key).join(', ') || 'ninguna'})
  subAltos: {
${integradas.map((s: any) => `    ${s.key}: [ r(6, '...', 'pasiva', '...') ],`).join('\n') || '    // ninguna'}
  },
  // Todas las demás subclases, completas (todos sus niveles)
  subclases: {
    'clave': { n: 'Nombre en español', rasgos: [ r(3, '...', 'pasiva', '...') ] },
  },
};
\`\`\`

Si una subclase tiene conjuros siempre preparados, van en un rasgo llamado "Conjuros del <nombre de la subclase>" cuyo
texto solo diga en qué niveles se amplían; la lista va en B.

=== B ===
JSON con lo que la app calcula o deja elegir. Fórmulas con: \`nivel\` (de la clase), \`pb\` (competencia),
\`FUE DES CON INT SAB CAR\` (modificadores), \`CD\`, \`ataqueConjuro\`, \`max(a, b)\`. "donde" es "clase" o la clave de la
subclase, y "rasgo" el nombre exacto que usaste en A.

\`\`\`json
[
  { "donde": "clave", "rasgo": "Nombre", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo | corto | corto desde nivel 6" },
  { "donde": "clave", "rasgo": "Nombre", "tipo": "conjuros", "por_nivel": { "3": ["Bendecir"], "5": [], "7": [], "9": [] } },
  { "donde": "clave", "rasgo": "Nombre", "tipo": "eleccion", "id": "id-corto", "cuantas": "1 | 2; 3 desde nivel 10",
    "opciones": [ { "key": "id-corto", "nombre": "...", "desc": "1 frase propia", "nivel": 1, "requiere": null } ] },
  { "donde": "clave", "rasgo": "Nombre", "tipo": "otro", "detalle": "daños, CA, velocidad, resistencias... en una frase con su fórmula" }
]
\`\`\`
${of.opciones ? `\nLas ${of.opciones.titulo.toLowerCase()} del texto oficial van como una "eleccion" de "clase" con todas sus opciones (con su nivel mínimo y, en "requiere", la key de la opción que exijan).\n` : ''}
=== C ===
JSON \`{ "clave": "Libro (año)" }\` con el libro de cada subclase, copiado del texto oficial.

=== D ===
JSON \`{ "clave": "1 o 2 frases propias que presenten la subclase a quien no la conoce" }\`.

=== E ===
Lista breve: qué difiere de lo que tiene hoy la app (rasgos que cambian de nivel, de tipo o de nombre, subclases
nuevas). Si algo de lo integrado en la app (clase de nivel 1 a ${hasta}, o los primeros niveles de las subclases integradas)
está mal según el texto oficial, di cuál y cómo debería quedar.

## Lo que tiene hoy la app

### Clase ${nom}, niveles 1 a ${hasta} (integrados)
${(C.rasgos || []).map(linea).join('\n') || '(sin rasgos)'}

### Rasgos de nivel alto de la clase
${(lib.rasgosAltos || []).map(linea).join('\n') || '(ninguno)'}`);

  for (const s of integradas) {
    const altos = lib.subAltos?.[s.key] || [];
    partes.push(`### ${s.n} (integrada, clave \`${s.key}\`)\n${[...(s.rasgos || []), ...altos].map(linea).join('\n')}`);
  }
  for (const [k, s] of Object.entries<any>(lib.subclases || {})) partes.push(`### ${s.n} (clave \`${k}\`)\n${(s.rasgos || []).map(linea).join('\n')}`);
  if (selectores) partes.push(`### Selectores que faltan en este lote\n${selectores}`);

  partes.push(`## Texto oficial (fuente única)\n\n### Clase ${nom} (Manual del Jugador 2024)\n${of.clase.map(lineaOficial).join('\n')}`);
  for (const s of of.subclases) partes.push(`### ${s.nombre} — ${s.libro}\n${s.rasgos.map(lineaOficial).join('\n')}${(s.opciones || []).map(o => `\n\nOpciones de ${o.titulo}:\n${o.items.map(x => `- ${x.nombre}${x.requisito ? ` (${x.requisito})` : ''}: ${x.texto}`.replace(/\s+/g, ' ')).join('\n')}`).join('')}`);
  if (of.opciones) partes.push(`### ${of.opciones.titulo} (Manual del Jugador 2024)\n${of.opciones.items.map(o => `- ${o.nombre}${o.requisito ? ` (${o.requisito})` : ''}: ${o.texto}`.replace(/\s+/g, ' ')).join('\n')}`);

  /* Nombres de conjuros tal como los tiene la app, por nivel */
  const conj = new Map<string, number>();
  for (const x of [...CATALOGO, ...Object.values<any>(biblioteca.conjuros || {})]) if (x?.nombre && !conj.has(x.nombre)) conj.set(x.nombre, +x.nivel || 0);
  const porNivel = [...Array(10).keys()].map(n => [...conj].filter(([, v]) => v === n).map(([k]) => k).sort((a, b) => a.localeCompare(b, 'es')));
  partes.push('## Conjuros de la app (usa estos nombres exactos)\n\n' + porNivel.map((l, n) => `- ${n ? 'Nivel ' + n : 'Trucos'}: ${l.join(', ')}`).join('\n'));

  mkdirSync('../docs/gemini', { recursive: true });
  const salida = archivoLote(clase, 'lote');
  writeFileSync(salida, partes.join('\n\n') + '\n');
  console.log(`${salida}\nCuando Gemini responda, guarda su respuesta completa en ${archivoLote(clase, 'respuesta')} y corre: npm run gemini:revisar -- ${clase}`);
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('gemini/encargo.ts')) main();
