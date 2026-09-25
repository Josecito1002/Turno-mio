/* Encargos para Gemini de lo que no es una clase: dotes (lotes 17 a 19) y el lote 20 (especies que faltan y selectores
   de clase que no entraron en ningún lote). Mismo sistema que encargo.ts: texto oficial más reciente como fuente única
   y respuesta con marcadores === A === ... === E ===.
   Uso: npm run gemini:encargo-extra   →   ../docs/gemini/lote-17-dotes-generales.md ... lote-20-especies-y-selectores.md */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { norm } from '../../src/shared/utils/texto';
import { CLASES } from '../../src/features/reglas/data/clases';
import { SUBCLASES } from '../../src/features/reglas/data/subclases';
import { DOTES } from '../../src/features/reglas/data/dotes';
import { CATALOGO } from '../../src/features/reglas/data/conjuros';
import { json, textoPlano, libro, LIBROS, oficial } from './oficial';

const biblioteca = JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8'));
const unaLinea = (s: string) => s.replace(/\s+/g, ' ').trim();

const COMUN = `"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el
formato de abajo, lo que se pide, usando **solo el texto oficial en inglés que viene al final**. Ese texto ya es la versión
más reciente de cada cosa: no busques otras versiones. Otra persona revisa y aplica tu respuesta con un script, así que
el formato tiene que ser exacto.

## Reglas

1. **Textos propios en español**, de 1 a 4 frases, que expliquen qué hace para quien juega. No traduzcas literal:
   resume con tus palabras. Nombres: la traducción oficial al español si la conoces.
2. **Conjuros con el nombre exacto de la lista "Conjuros de la app"**. Si uno no está, pon tu traducción y detrás
   (NO ESTÁ EN LA APP).
3. Tipos de acción para \`t\`: accion, adicional (acción adicional), reaccion, gratis (sin acción), pasiva, fuera
   (fuera de combate o ritual).
4. Si algo no se entiende en el texto oficial, escríbelo igual con la marca [NO CONFIRMADO].
5. Responde **solo** con las cinco partes, cada una empezando con su marcador solo en una línea (\`=== A ===\` ...
   \`=== E ===\`). Nada antes de la primera ni después de la última.`;

const MECANICAS = `JSON con lo que la app calcula o deja elegir. Fórmulas con: \`nivel\` (nivel total), \`pb\` (competencia),
\`FUE DES CON INT SAB CAR\` (modificadores), \`CD\`, \`max(a, b)\`.

\`\`\`json
[
  { "donde": "clave", "rasgo": "Nombre", "tipo": "usos", "usos": "pb", "reset": "largo | corto" },
  { "donde": "clave", "rasgo": "Nombre", "tipo": "eleccion", "id": "id-corto", "cuantas": "1 | 2",
    "opciones": [ { "key": "id-corto", "nombre": "...", "desc": "1 frase propia", "nivel": 1, "requiere": null } ] },
  { "donde": "clave", "rasgo": "Nombre", "tipo": "otro", "detalle": "daños, CA, velocidad, resistencias... con su fórmula" }
]
\`\`\``;

function conjurosApp() {
  const conj = new Map<string, number>();
  for (const x of [...CATALOGO, ...Object.values<any>(biblioteca.conjuros || {})]) if (x?.nombre && !conj.has(x.nombre)) conj.set(x.nombre, +x.nivel || 0);
  const porNivel = [...Array(10).keys()].map(n => [...conj].filter(([, v]) => v === n).map(([k]) => k).sort((a, b) => a.localeCompare(b, 'es')));
  return '## Conjuros de la app (usa estos nombres exactos)\n\n' + porNivel.map((l, n) => `- ${n ? 'Nivel ' + n : 'Trucos'}: ${l.join(', ')}`).join('\n');
}
function guardar(nombre: string, partes: string[]) {
  mkdirSync('../docs/gemini', { recursive: true });
  const ruta = `../docs/gemini/${nombre}.md`;
  writeFileSync(ruta, partes.join('\n\n') + '\n');
  console.log(`${ruta}  →  respuesta en ../docs/gemini/${nombre.replace(/^lote/, 'respuesta')}.md`);
}

/* ---------- Dotes ---------- */
const CAT: Record<string, string> = { G: 'General', EB: 'Épica', O: 'Origen', D: 'Marca de Dragón', DG: 'Don Oscuro', FS: 'Estilo de Combate', 'FS:P': 'Estilo de Combate', 'FS:R': 'Estilo de Combate' };
async function dotes() {
  const f = (await json('feats.json')).feat.filter((x: any) => LIBROS[x.source]?.[1] >= 2024);
  const prereq = (x: any) => (x.prerequisite || []).map((p: any) => unaLinea([
    p.level && `nivel ${p.level.level ?? p.level}`, p.ability && `característica ${JSON.stringify(p.ability).replace(/[{}"[\]]/g, '')}`,
    p.feat && `dote ${p.feat.join(', ')}`, p.feature && `rasgo ${p.feature.join(', ')}`, p.spellcasting2020 || p.spellcasting ? 'lanzar conjuros' : '',
    p.proficiency && `competencia ${JSON.stringify(p.proficiency).replace(/[{}"[\]]/g, '')}`, p.other, p.otherSummary?.entry,
  ].filter(Boolean).join(', '))).join(' o ');
  const oficiales = (cats: string[]) => f.filter((x: any) => cats.includes(x.category)).sort((a: any, b: any) => a.name.localeCompare(b.name))
    .map((x: any) => unaLinea(`- ${x.name} — ${libro(x.source)} — ${CAT[x.category] || x.category}${prereq(x) ? ` — Requisito: ${prereq(x)}` : ''}${x.ability ? ` — Mejora: ${JSON.stringify(x.ability).replace(/[{}"[\]]/g, '')}` : ''}: ${textoPlano(x.entries)}`));
  const enApp = (cats: string[]) => Object.entries<any>(biblioteca.dotes || {}).filter(([, d]) => cats.includes(d.cat))
    .map(([k, d]) => `- \`${k}\` · ${d.n} (${d.cat}, nivel ${d.nivelMin}): ${unaLinea(d.texto || '')}`).join('\n') || '(ninguna)';
  const integradas = Object.values<any>(DOTES).map(d => d.n).join(', ');

  const lote = (nombre: string, titulo: string, catsOf: string[], catsApp: string[], nivelMin: string) => guardar(nombre, [
    `# Encargo: ${titulo} de la app "Mi turno"\n\n${COMUN}`,
    `## Formato de la respuesta

=== A ===
Código TypeScript con **todas** las dotes del texto oficial, exactamente con esta forma:

\`\`\`ts
export const DOTES_NUEVAS: Record<string, { n: string; t: string; cat: string; nivelMin: number; texto: string }> = {
  'lib:actor': { n: 'Actor', t: 'pasiva', cat: 'General', nivelMin: 4, texto: 'Sumas +1 a Carisma. Texto propio. Requisito: nivel 4, Carisma 13+.' },
};
\`\`\`

- Clave: si la app ya tiene esa dote (lista "Lo que tiene hoy la app"), usa su misma clave; si no, \`lib:\` + nombre en
  minúsculas-con-guiones.
- \`cat\`: ${[...new Set(catsOf.map(c => CAT[c]))].join(', ')}. \`nivelMin\`: ${nivelMin}.
- Si la dote sube una característica, **la primera frase del texto es exactamente** "Sumas +1 a Fuerza o Destreza." (con
  las características que permita) o "Sumas +1 a una característica." (las épicas: "Sumas +1 a una característica
  (máx 30)."). Los requisitos van al final: "Requisito: ...".
- No incluyas las dotes que la app ya trae integradas: ${integradas}.

=== B ===
${MECANICAS.replace(/"clave"/g, '"clave de la dote"')}

=== C ===
JSON \`{ "clave": "Libro (año)" }\` con el libro de cada dote, copiado del texto oficial.

=== D ===
JSON \`{}\` (esta vez no hace falta nada aquí).

=== E ===
Lista breve: dotes de la app que cambian (nombre, texto, nivel o categoría) y dotes de la app que no aparecen en el texto
oficial (di si es porque se renombró o si ya no existe en 2024).`,
    `## Lo que tiene hoy la app\n\n${enApp(catsApp)}`,
    `## Texto oficial (fuente única)\n\n${oficiales(catsOf).join('\n')}`,
    conjurosApp(),
  ]);
  lote('lote-17-dotes-generales', 'Lote 17: dotes generales', ['G'], ['General'], '4 (o el nivel que diga su requisito)');
  lote('lote-18-dotes-origen-y-otras', 'Lote 18: dotes de origen, estilos de combate, marcas de dragón y dones oscuros', ['O', 'FS', 'FS:P', 'FS:R', 'D', 'DG'], ['Marca de Dragón', 'Origen', 'Don Oscuro', 'Estilo de Combate'], '1 (o el nivel que diga su requisito)');
  lote('lote-19-dotes-epicas', 'Lote 19: dotes épicas', ['EB'], ['Épica'], '19');
}

/* ---------- Lote 20: especies que faltan y selectores sueltos ---------- */
const SELECTORES = [
  { clase: 'clerigo', que: 'Orden Divina', of: /^Divine Order$/, app: /^orden divina/ },
  { clase: 'druida', que: 'Orden Primordial', of: /^Primal Order$/, app: /^orden primordial/ },
  { clase: 'druida', que: 'Formas de Forma Salvaje (bestias conocidas)', of: /^Wild Shape$/, app: /^forma salvaje$/ },
  { clase: 'hechicero', que: 'Hechicería Dracónica: Afinidad Elemental (tipo de daño)', of: /^Elemental Affinity$|^Draconic Resilience$/, app: /afinidad elemental|resistencia draconica/ },
  { clase: 'mago', que: 'Dominio de Conjuros y Conjuros Distintivos', of: /^Spell Mastery$|^Signature Spells$/, app: /dominio de conjuros|conjuros distintivos|conjuros insignia/ },
  { clase: 'artifice', que: 'Planos de Replicar Objeto Mágico', of: /^Replicate Magic Item$/, app: /replicar objeto/ },
  { clase: 'bardo', que: 'Colegio de la Luna: truco de druida', of: /^College of the Moon$/, app: /saber primigenio/ },
  { clase: 'guerrero', que: 'Campeón: Estilo de Combate Adicional', of: /^Additional Fighting Style$/, app: /estilo de combate adicional/ },
];
async function lote20() {
  const races = (await json('races.json')).race;
  const PEDIDAS = [['Aarakocra', 'MPMM'], ['Deep Gnome', 'MPMM'], ['Duergar', 'MPMM'], ['Dragonborn (Gem)', 'FTD']];
  const especies = PEDIDAS.map(([n, src]) => races.find((x: any) => x.name === n && x.source === src)).filter(Boolean)
    .map((x: any) => unaLinea(`### ${x.name} — ${libro(x.source)}\nVelocidad ${JSON.stringify(x.speed)}; visión en la oscuridad ${x.darkvision || 0}; tamaño ${(x.size || []).join('/')}\n${(x.entries || []).map((e: any) => `- ${e.name || ''}: ${textoPlano(e.entries || e)}`).join('\n')}`).replace(/ - /g, '\n- ').replace(/ ### /g, '\n### '));

  // Nombres de los rasgos en la app, para que "rasgo" coincida
  const nombresApp = (clase: string, re: RegExp) => {
    const lib = biblioteca.clases[clase === 'artifice' ? 'artifice' : clase] || {};
    const rs = [...((CLASES as any)[clase]?.rasgos || []), ...SUBCLASES.filter((s: any) => s.clase === clase).flatMap((s: any) => (s.rasgos || []).map((r: any) => ({ ...r, sub: s.key }))),
      ...(lib.rasgos || []), ...(lib.rasgosAltos || []), ...Object.entries<any>(lib.subclases || {}).flatMap(([k, s]) => (s.rasgos || []).map((r: any) => ({ ...r, sub: k }))),
      ...Object.entries<any>(lib.subAltos || {}).flatMap(([k, rs2]) => (rs2 || []).map((r: any) => ({ ...r, sub: k })))];
    return [...new Set(rs.filter(r => re.test(norm(r.nombre || ''))).map(r => `"${r.nombre}" (donde: "${r.sub || 'clase:' + clase}")`))].join(', ') || '(no está: pon el nombre oficial en español y donde: "clase:' + clase + '")';
  };
  const oficiales: string[] = [];
  for (const s of SELECTORES) {
    const of = await oficial(s.clase);
    const textos = [...of.clase, ...of.subclases.flatMap(x => x.rasgos)].filter(r => s.of.test(r.nombre));
    oficiales.push(`### ${s.que}\nEn la app: ${nombresApp(s.clase, s.app)}\n${textos.map(r => unaLinea(`- Nivel ${r.n} · ${r.nombre}: ${r.texto}`)).join('\n') || '- (buscar en el texto de la clase)'}`);
  }

  guardar('lote-20-especies-y-selectores', [
    `# Encargo: Lote 20 (especies que faltan y selectores sueltos) de la app "Mi turno"\n\n${COMUN}`,
    `## Formato de la respuesta

=== A ===
Código TypeScript con las especies del texto oficial, exactamente con esta forma:

\`\`\`ts
const r = (nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, manual: true, usos: 0, reset: 'largo', ...extra });

export const ESPECIES_NUEVAS = {
  'lib:aarakocra': { n: 'Aarakocra', vel: 30, vision: 0, src: 'Monsters of the Multiverse (2022)', rasgos: [
    r('Vuelo', 'pasiva', 'Texto propio.'),
    r('Rasgo con usos', 'accion', 'Texto propio.', { usos: 'pb', reset: 'largo' }),
  ] },
};

// El Dracónido de gema no es una especie aparte: sus cinco linajes se agregan al Dracónido de la app
export const LINAJES_GEMA = [
  { key: 'amatista', n: 'Amatista', dano: 'fuerza', texto: 'Texto propio de lo que cambia con este linaje.' },
];
\`\`\`

Claves: \`lib:aarakocra\`, \`lib:gnomo-profundidades\`, \`lib:duergar\`. Si una especie da una habilidad fija, agrega al rasgo
\`{ habs: ['Percepción'] }\`.

=== B ===
${MECANICAS}

Aquí también van **los selectores** de la sección "Selectores": uno o más "eleccion" por selector, con "donde" y
"rasgo" tal como dice "En la app". Cada opción con su "desc" (qué hace) y su "nivel" mínimo si lo tiene. Para las formas
de Forma Salvaje, las opciones son bestias del Manual del Jugador 2024 (clave, nombre, VD y, en "desc", tamaño,
velocidades y ataque), con "nivel" 2, 4 u 8 según el VD que permita la tabla de Forma Salvaje. Para los planos del
Artífice, las opciones son los objetos de las tablas de planos, con su "nivel" de artífice.

=== C ===
JSON \`{ "clave de especie": "Libro (año)" }\`.

=== D ===
JSON \`{ "clave de especie": "1 o 2 frases propias que presenten la especie" }\`.

=== E ===
Lista breve de dudas y de lo que no encaja en la app.`,
    `## Texto oficial: especies (fuente única)\n\n${especies.join('\n\n')}`,
    `## Texto oficial: selectores (fuente única)\n\n${oficiales.join('\n\n')}`,
    conjurosApp(),
  ]);
}

(async () => { await dotes(); await lote20(); })();
