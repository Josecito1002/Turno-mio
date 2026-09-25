/* Arma el encargo de investigación de un lote para otro asistente (Gemini): qué tiene hoy la app de esa clase y qué
   debe devolver, en un formato que después se revisa y se aplica aquí.
   Uso: npx tsx scripts/prompt-gemini.ts clerigo   →   ../docs/gemini/lote-08-clerigo.md */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { CLASES } from '../src/features/reglas/data/clases';
import { SUBCLASES } from '../src/features/reglas/data/subclases';
import { CATALOGO } from '../src/features/reglas/data/conjuros';

const LOTES: Record<string, number> = { brujo: 7, clerigo: 8, druida: 9, explorador: 10, guerrero: 11, hechicero: 12, mago: 13, monje: 14, paladin: 15, picaro: 16 };

const clase = process.argv[2];
if (!clase || !LOTES[clase]) { console.error('Clase: ' + Object.keys(LOTES).join(', ')); process.exit(1); }
const C = CLASES[clase] as any, nom = C.n as string, num = LOTES[clase];
const biblioteca = JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8'));
const lib = biblioteca.clases[clase] || {};
const doc = readFileSync('../docs/revision-reglas.md', 'utf8');

/* Los textos de las reglas a veces son funciones del personaje: se evalúan con uno de nivel 20 y modificadores +3 */
const pj: any = new Proxy({ lvl: 20, pb: 6, m: new Proxy({}, { get: () => 3 }), md: 12 }, { get: (o: any, k) => (k in o ? o[k] : 15) });
const texto = (t: any) => { try { return typeof t === 'function' ? t(pj) : t || ''; } catch { return '(se calcula en el código)'; } };
const linea = (r: any) => `- Nivel ${r.n} · ${r.nombre} [${r.t || 'pasiva'}]: ${texto(r.texto)}`.replace(/\s+/g, ' ');

/* Secciones del documento de revisión que tocan este lote */
const titulo = `Lote ${num}: `;
const seccion = (h: string, desde: number) => {
  const i = doc.indexOf(h, desde);
  if (i < 0) return '';
  const nivel = h.match(/^#+/)![0].length, resto = doc.slice(i + h.length);
  const fin = resto.search(new RegExp(`\\n#{1,${nivel}} `));
  return (h + (fin < 0 ? resto : resto.slice(0, fin))).trim();
};
/* Cada cabecera con su bloque padre (Selectores / Por agregar / el lote), sin los comentarios de control */
const delDoc = [...doc.matchAll(/^(#{2,3}) [^\r\n]*/gm)]
  .filter(m => m[0].includes(titulo))
  .map(m => {
    const padre = m[1] === '###' ? [...doc.slice(0, m.index).matchAll(/^## ([^\r\n]*)/gm)].pop()?.[1] : '';
    return (padre ? `(${padre})\n` : '') + seccion(m[0], m.index);
  })
  .join('\n\n').replace(/ ?<!--.*?-->/g, '');

const integradas = SUBCLASES.filter((s: any) => s.clase === clase);
const partes: string[] = [];

partes.push(`# Encargo: Lote ${num} (${nom}) de la app "Mi turno"

Eres un asistente de investigación de reglas de D&D 5.ª edición revisada (2024). "Mi turno" es una app de hojas de
personaje en español. Tu trabajo: revisar todo lo que la app tiene de la clase **${nom}** contra la versión oficial más
reciente y devolver los datos corregidos en el formato de abajo. No escribes código de la app: otra persona revisa y
aplica tu respuesta, así que la precisión importa más que la extensión.

## Reglas del encargo

1. **Versión más reciente siempre.** Usa el Manual del Jugador 2024 y, para lo que no esté ahí, la publicación oficial
   más nueva (libros de 2025 y 2026 como Forgotten Realms: Heroes of Faerûn, Eberron: Forge of the Artificer, Ravenloft:
   The Horrors Within, o Unearthed Arcana/Arcana Unleashed si es lo único que existe; dilo en ese caso). Las revisiones
   de la comunidad no cuentan. **Nunca cambies algo por una versión más vieja**: lo que tiene la app puede venir ya de
   un libro de 2025 o 2026. Antes de dar por buena una versión de 2014 a 2020, busca si Heroes of Faerûn (2025),
   Ravenloft: The Horrors Within (2026) o Arcana Unleashed (2026) sacaron una versión nueva de esa subclase.
2. **Subclases antiguas sin versión 2024** (Xanathar, Tasha, Sword Coast...): se conservan, pero sus rasgos se mueven a
   los niveles de subclase de la clase 2024 (por ejemplo, lo de nivel 1 o 2 pasa al 3). Di en las notas qué moviste.
3. **Textos propios en español**, cortos (1 a 3 frases), escritos por ti. Nunca copies ni traduzcas literal el texto
   del libro. Nombres de rasgos y conjuros: la traducción oficial al español si existe, con el inglés entre paréntesis
   la primera vez que aparezca un conjuro, por ejemplo "Paso brumoso (Misty Step)". **Los conjuros escríbelos con el
   nombre exacto de la lista "Conjuros de la app" del final** (por ejemplo "Ayuda", no "Auxilio"); si uno no está en
   la lista, usa la traducción oficial y márcalo con (NO ESTÁ EN LA APP).
4. **No inventes.** Si no puedes confirmar un dato (un número, un nivel, un nombre), escríbelo igual con la marca
   **[NO CONFIRMADO]** y di por qué.
5. **Antes de agregar algo nuevo**, comprueba que no esté ya en la app con otro nombre (lista de abajo).
6. Tipos de acción válidos para \`t\`: accion, adicional (acción adicional), reaccion, gratis (sin acción, por ejemplo
   al acertar), pasiva, fuera (fuera de combate o ritual).

## Qué devolver (en este orden, cada parte en su bloque de código)

**A. Datos** (TypeScript, archivo \`scripts/datos/${clase}-2024.ts\`). Este formato exacto:

\`\`\`ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const ${clase.toUpperCase()}_2024 = {
  // Rasgos de la clase de nivel ${(C.hasta || 5) + 1} a 20 (los de nivel 1 a ${C.hasta || 5} ya los tiene la app)
  rasgosAltos: [
    r(9, 'Nombre del rasgo', 'accion', 'Texto propio.', { usos: 1, reset: 'largo' }),  // usos/reset solo si tiene usos fijos
  ],
  // Rasgos de nivel 6 en adelante de las subclases que la app trae integradas (clave: ${integradas.map((s: any) => s.key).join(', ') || 'ninguna'})
  subAltos: {
    clave: [ r(6, '...', 'pasiva', '...') ],
  },
  // Todas las demás subclases, completas (nivel 3 a 20). Clave en minúsculas-con-guiones.
  subclases: {
    'clave-nueva': { n: 'Nombre en español', rasgos: [ r(3, '...', 'pasiva', '...') ] },
  },
};
\`\`\`

Los conjuros siempre preparados de una subclase van en un rasgo llamado "Conjuros del/de la <subclase>" cuyo texto diga
solo que se amplían en tales niveles; la lista completa va en la parte B.

**B. Mecánicas** (JSON). Una entrada por cada cosa que la app debe calcular o dejar elegir. Fórmulas con estas
variables: \`nivel\` (de la clase), \`pb\` (bonificador por competencia), \`FUE DES CON INT SAB CAR\` (modificadores),
\`CD\` y \`ataqueConjuro\`.

\`\`\`json
[
  { "donde": "clase | clave de subclase", "rasgo": "Nombre del rasgo", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo | corto | corto desde nivel X" },
  { "donde": "...", "rasgo": "...", "tipo": "dado", "dado": "1d8; 2d8 desde nivel 10" },
  { "donde": "...", "rasgo": "...", "tipo": "ataque", "ataque": "ataqueConjuro", "alcance": "30 pies", "daño": "1d8 + SAB frío" },
  { "donde": "...", "rasgo": "...", "tipo": "ca | velocidad | vision | resistencia | competencia | pg", "detalle": "fórmula o valor" },
  { "donde": "...", "rasgo": "...", "tipo": "eleccion", "id": "id-corto", "cuantas": "2; 3 desde nivel 10",
    "opciones": [ { "key": "id-corto", "nombre": "...", "desc": "qué hace, 1 frase propia", "nivel": 1, "requiere": "key de otra opción o null" } ] },
  { "donde": "...", "rasgo": "Conjuros del ...", "tipo": "conjuros", "por_nivel": { "3": ["Bendecir (Bless)"], "5": [], "7": [], "9": [] } }
]
\`\`\`

**C. Fuentes** (JSON): \`{ "Nombre de subclase": "Libro (año)" }\` para cada subclase, incluidas las integradas.

**D. Descripciones** (JSON): \`{ "clave": "1 o 2 frases propias que presenten la subclase a quien no la conoce" }\`.

**E. Notas** (lista): por cada rasgo o subclase que cambiaste, qué versión usaste y en qué difería lo que tenía la app.
Incluye lo que no se agrega y por qué (reemplazado en 2024, duplicado con otro nombre, sin versión vigente).
Si algo de lo integrado en la app (rasgos de clase de nivel 1 a ${C.hasta || 5}, o los primeros niveles de las subclases
integradas) está mal, no lo metas en A: escribe aquí el rasgo, qué está mal y el texto corregido.

## Lo que tiene hoy la app

### Clase ${nom}, niveles 1 a ${C.hasta || 5} (integrados en la app)
${(C.rasgos || []).map(linea).join('\n') || '(sin rasgos)'}
`);

partes.push(`### Rasgos de nivel alto de la clase (biblioteca)\n${(lib.rasgosAltos || []).map(linea).join('\n') || '(ninguno)'}`);

for (const s of integradas) {
  const altos = lib.subAltos?.[s.key] || [];
  partes.push(`### ${s.n} (integrada, clave \`${s.key}\`)\n${(s.rasgos || []).map(linea).join('\n')}${altos.length ? '\n' + altos.map(linea).join('\n') : ''}`);
}
for (const [k, s] of Object.entries<any>(lib.subclases || {})) {
  partes.push(`### ${s.n} (biblioteca, clave \`${k}\`)\n${(s.rasgos || []).map(linea).join('\n')}`);
}
if (delDoc) partes.push(`## Pendientes de este lote en la revisión (selectores por hacer, subclases que faltan respecto a D&D Beyond, rasgos dudosos)\n\n${delDoc.replace(/^#+ /gm, '#### ')}`);

/* Nombres de conjuros tal como los tiene la app, por nivel, para que las listas coincidan con el catálogo */
const conj = new Map<string, number>();
for (const x of [...CATALOGO, ...Object.values<any>(biblioteca.conjuros || {})]) if (x?.nombre && !conj.has(x.nombre)) conj.set(x.nombre, +x.nivel || 0);
const porNivel = [...Array(10).keys()].map(n => [...conj].filter(([, v]) => v === n).map(([k]) => k).sort((a, b) => a.localeCompare(b, 'es')));
partes.push('## Conjuros de la app (usa estos nombres exactos)\n\n' + porNivel.map((l, n) => `- ${n ? 'Nivel ' + n : 'Trucos'}: ${l.join(', ')}`).join('\n'));

mkdirSync('../docs/gemini', { recursive: true });
const salida = `../docs/gemini/lote-${String(num).padStart(2, '0')}-${clase}.md`;
writeFileSync(salida, partes.join('\n\n') + '\n');
console.log(salida);
