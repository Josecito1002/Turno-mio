/* Encargo para Gemini del lote 21: los objetos mágicos oficiales (Guía del Dungeon Master 2024 y libros posteriores).
   Va en cinco partes para que cada respuesta no sea enorme: por rareza (a-d) y las variantes de armas y armaduras (e).
   Uso: npm run gemini:encargo-objetos   →   ../docs/gemini/lote-21a-objetos-comunes.md ... lote-21e-objetos-variantes.md
   Cada respuesta va en ../docs/gemini/respuesta-21a-objetos-comunes.md, etc., y se aplica en
   src/features/reglas/data/generadas/objetos-magicos.ts (tiene prioridad sobre el catálogo inicial de objetos-magicos.ts). */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { CATALOGO } from '../../src/features/reglas/data/conjuros';
import { OBJETOS_MAGICOS } from '../../src/features/reglas/data/objetos-magicos';
import { json, textoPlano, libro, LIBROS } from './oficial';

const biblioteca = JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8'));
const unaLinea = (s: string) => s.replace(/\s+/g, ' ').trim();
const esOficial = (src: string) => src === 'XDMG' || (LIBROS[src]?.[1] ?? 0) >= 2024;

const TIPO: Record<string, string> = { P: 'poción', RG: 'anillo', WD: 'varita', RD: 'vara', SC: 'pergamino', M: 'arma', R: 'arma',
  S: 'escudo', LA: 'armadura', MA: 'armadura', HA: 'armadura', SCF: 'bastón', INS: 'maravilloso', A: 'arma' };
const RAREZA: Record<string, string> = { common: 'común', uncommon: 'poco común', rare: 'rara', 'very rare': 'muy rara', legendary: 'legendaria', artifact: 'artefacto' };

const COMUN = `"Mi turno" es una app de hojas de personaje de D&D (reglas 2024) en español. Tu trabajo: pasar a español, en el
formato de abajo, los objetos mágicos del texto oficial en inglés que viene al final, usando **solo ese texto**. Ya es la
versión más reciente de cada objeto: no busques otras. Otra persona revisa y aplica tu respuesta con un script, así que el
formato tiene que ser exacto.

## Reglas

1. **Textos propios en español**, de 1 a 4 frases, que expliquen qué hace el objeto para quien lo lleva. No traduzcas
   literal: resume con tus palabras. Nombres: la traducción oficial al español si la conoces.
2. **Conjuros con el nombre exacto de la lista "Conjuros de la app"**. Si uno no está, pon tu traducción y detrás
   (NO ESTÁ EN LA APP).
3. Tipos de acción para \`t\` (cómo se usa): accion, adicional (acción adicional), reaccion, gratis (sin acción), pasiva
   (siempre activo), fuera (fuera de combate o lleva minutos).
4. Si algo no se entiende en el texto oficial, escríbelo igual con la marca [NO CONFIRMADO].
5. Responde **solo** con las dos partes, cada una empezando con su marcador solo en una línea (\`=== A ===\` y
   \`=== B ===\`). Nada antes de la primera ni después de la última.`;

const FORMATO = (ejemploBase: boolean) => `## Formato de la respuesta

=== A ===
Código TypeScript con **todos** los objetos del texto oficial, exactamente con esta forma:

\`\`\`ts
export const OBJETOS: Record<string, ObjetoMagico> = {
  'anillo-proteccion': { n: 'Anillo de Protección', rareza: 'rara', tipo: 'anillo', sint: true, bonoCA: 1, bonoSalv: 1,
    texto: 'Texto propio.' },
  'varita-bolas-fuego': { n: 'Varita de Bolas de Fuego', rareza: 'rara', tipo: 'varita', sint: true, t: 'accion',
    cargas: { max: 7, reset: 'largo', nota: 'Recupera 1d6 + 1 al amanecer' },
    conjuros: [{ n: 'Bola de fuego', coste: '1 carga (+1 por nivel extra, hasta 3)', cd: 15 }],
    texto: 'Texto propio.' },${ejemploBase ? `
  'lengua-llamas': { n: 'Lengua de Llamas', rareza: 'rara', tipo: 'arma', sint: true, t: 'adicional', base: 'arma', danoExtra: '2d6 fuego',
    texto: 'Texto propio. Sirve con cualquier arma cuerpo a cuerpo.' },` : ''}
};
\`\`\`

Campos (pon solo los que el objeto tenga):
- Clave: si el objeto ya está en "Lo que tiene hoy la app", usa su misma clave; si no, el nombre en español en
  minúsculas-con-guiones, sin tildes.
- \`n\` nombre, \`rareza\` (común, poco común, rara, muy rara, legendaria, artefacto; si varía, la más baja y en el texto
  las demás), \`tipo\` (maravilloso, arma, armadura, escudo, anillo, varita, vara, bastón, poción, pergamino).
- \`sint: true\` si pide sintonización; si la pide de alguien concreto ("by a Wizard"), dilo en la primera frase del texto.
- \`t\`: cómo se usa lo principal del objeto (si no se activa, no lo pongas).
- \`base\`: 'arma', 'armadura' o 'escudo' si el objeto es un arma, armadura o escudo que el jugador elige (Espada
  Vorpal, Armadura de Mithral...). Con \`bono\` (+N al ataque y al daño, o a la CA). Qué armas o armaduras valen, en el texto.
- \`bonoCA\`, \`bonoSalv\` (a todas las salvaciones), \`bonoConj\` (a la tirada de ataque y la CD de conjuros),
  \`danoExtra\` (daño que suma el arma al golpear, como '2d6 fuego'), \`fija\` ({ fue: 19 }: la característica pasa a ese
  valor mientras lo lleva; claves fue, des, con, int, sab, car).
- \`cargas\`: { max, reset: 'largo' (al amanecer o descanso largo) o 'corto', nota: cómo se recuperan }.
- \`conjuros\`: [{ n: nombre exacto de la app, coste: '1 carga', '1 vez al día', 'a voluntad'..., cd?: número fijo,
  atk?: número fijo }]. Si usa tu CD de conjuros, no pongas \`cd\`.
- \`texto\`: 1 a 4 frases propias. Lo que la app no calcula (resistencias, velocidades, ventajas, efectos al golpear)
  va aquí.

=== B ===
Lista breve: dudas, objetos que no encajan en estos campos y en qué difieren de "Lo que tiene hoy la app".`;

function conjurosApp() {
  const conj = new Map<string, number>();
  for (const x of [...CATALOGO, ...Object.values<any>(biblioteca.conjuros || {})]) if (x?.nombre && !conj.has(x.nombre)) conj.set(x.nombre, +x.nivel || 0);
  const porNivel = [...Array(10).keys()].map(n => [...conj].filter(([, v]) => v === n).map(([k]) => k).sort((a, b) => a.localeCompare(b, 'es')));
  return '## Conjuros de la app (usa estos nombres exactos)\n\n' + porNivel.map((l, n) => `- ${n ? 'Nivel ' + n : 'Trucos'}: ${l.join(', ')}`).join('\n');
}
const enApp = (rarezas: string[]) => Object.entries(OBJETOS_MAGICOS).filter(([, d]) => rarezas.includes(d.rareza))
  .map(([k, d]) => `- \`${k}\` · ${d.n} (${d.rareza}, ${d.tipo}): ${unaLinea(d.texto)}`).join('\n') || '(ninguno)';

/** Una línea por objeto con los datos que ya trae 5etools (sintonización, cargas, bonos, conjuros) y su texto. */
function linea(x: any) {
  const tipo = TIPO[String(x.type || '').split('|')[0]] || (x.wondrous ? 'maravilloso' : x.type ? String(x.type).split('|')[0] : 'maravilloso');
  const conj = x.attachedSpells ? JSON.stringify(x.attachedSpells).replace(/\|[a-z]+/g, '').replace(/[{}"[\]]/g, '') : '';
  const datos = [
    RAREZA[x.rarity] || x.rarity, tipo, x.baseItem && `base ${x.baseItem.split('|')[0]}`,
    x.reqAttune && `sintonización${typeof x.reqAttune === 'string' ? ' ' + x.reqAttune : ''}`,
    x.charges && `cargas ${x.charges}${x.recharge ? ` (recarga ${x.recharge}${x.rechargeAmount ? ' ' + textoPlano(String(x.rechargeAmount)) : ''})` : ''}`,
    x.bonusWeapon && `arma ${x.bonusWeapon}`, x.bonusAc && `CA ${x.bonusAc}`, x.bonusSavingThrow && `salvaciones ${x.bonusSavingThrow}`,
    x.bonusSpellAttack && `ataque de conjuros ${x.bonusSpellAttack}`, x.bonusSpellSaveDc && `CD de conjuros ${x.bonusSpellSaveDc}`,
    x.ability && `características ${JSON.stringify(x.ability).replace(/[{}"]/g, '')}`, conj && `conjuros ${conj}`, x.requiere && `vale para ${x.requiere}`,
  ].filter(Boolean).join('; ');
  return unaLinea(`- ${x.name} — ${libro(x.source)} — ${datos}: ${textoPlano(x.entries || [])}`);
}

function guardar(nombre: string, partes: string[]) {
  mkdirSync('../docs/gemini', { recursive: true });
  const ruta = `../docs/gemini/${nombre}.md`;
  writeFileSync(ruta, partes.join('\n\n') + '\n');
  console.log(`${ruta}  →  respuesta en ../docs/gemini/${nombre.replace(/^lote/, 'respuesta')}.md`);
}

(async () => {
  LIBROS.XDMG = ['Guía del Dungeon Master', 2024];
  const items = (await json('items.json')).item.filter((x: any) => esOficial(x.source) && x.rarity && !['none', 'unknown', 'unknown (magic)', 'varies'].includes(x.rarity))
    .sort((a: any, b: any) => a.name.localeCompare(b.name));
  const partes: [string, string, string[]][] = [
    ['lote-21a-objetos-comunes', 'comunes y poco comunes', ['common', 'uncommon']],
    ['lote-21b-objetos-raros', 'raros', ['rare']],
    ['lote-21c-objetos-muy-raros', 'muy raros', ['very rare']],
    ['lote-21d-objetos-legendarios', 'legendarios y artefactos', ['legendary', 'artifact']],
  ];
  for (const [nombre, titulo, rarezas] of partes) {
    const xs = items.filter((x: any) => rarezas.includes(x.rarity));
    guardar(nombre, [
      `# Encargo: Lote 21 (objetos mágicos ${titulo}) de la app "Mi turno"\n\n${COMUN}`,
      FORMATO(false),
      `## Lo que tiene hoy la app\n\n${enApp(rarezas.map(r => RAREZA[r]))}`,
      `## Texto oficial (fuente única): ${xs.length} objetos\n\n${xs.map(linea).join('\n')}`,
      conjurosApp(),
    ]);
  }
  // Variantes: armas y armaduras mágicas que se aplican sobre una que elige el jugador (las +1, +2 y +3 ya están en la app)
  const vs = (await json('magicvariants.json')).magicvariant
    .filter((v: any) => esOficial(v.inherits?.source) && !/^\+\d (Weapon|Armor|Shield)/.test(v.name))
    .map((v: any) => {
      const req = (v.requires || []).map((r: any) => JSON.stringify(r).replace(/[{}"]/g, '')).join(' o ');
      const tipo = /type:S\b|shield/i.test(req) ? 'S' : /type:(LA|MA|HA)|armor/i.test(req) ? 'LA' : 'M';
      const legible = req.replace(/\|[a-z]+/gi, '').replace(/type:(M|R|A|AF)\b/g, (_: string, t: string) => ({ M: 'armas cuerpo a cuerpo', R: 'armas a distancia', A: 'munición', AF: 'munición' } as any)[t])
        .replace(/type:(LA|MA|HA|S)\b/g, (_: string, t: string) => ({ LA: 'armadura ligera', MA: 'armadura media', HA: 'armadura pesada', S: 'escudo' } as any)[t]);
      return { type: tipo, ...v.inherits, name: v.name.replace(/ \(\*\)$/, ''), requiere: legible };
    })
    .sort((a: any, b: any) => a.name.localeCompare(b.name));
  guardar('lote-21e-objetos-variantes', [
    `# Encargo: Lote 21 (armas y armaduras mágicas que se aplican sobre otra) de la app "Mi turno"\n\n${COMUN}`,
    FORMATO(true) + `\n\nAquí **todos** los objetos llevan \`base\` ('arma', 'armadura' o 'escudo'; la munición cuenta como 'arma'),
porque el jugador elige sobre qué arma o armadura va. En el texto, di con qué armas o armaduras vale (según "vale para").`,
    `## Lo que tiene hoy la app\n\n${Object.entries(OBJETOS_MAGICOS).filter(([, d]) => d.base).map(([k, d]) => `- \`${k}\` · ${d.n}`).join('\n')}`,
    `## Texto oficial (fuente única): ${vs.length} objetos\n\n${vs.map(linea).join('\n')}`,
    conjurosApp(),
  ]);
})();
