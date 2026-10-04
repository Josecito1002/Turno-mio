/* Encargo para Gemini del lote 22: nombres y textos en español del bestiario (Manual de Monstruos 2025).
   Las estadísticas ya están en la app (scripts/bestiario-base.ts); Gemini solo pone el nombre en español (el oficial si
   lo hay, si no el inglés), una descripción propia y el nombre y texto de cada rasgo y acción.
   Va en partes de unos 60 monstruos, ordenados por desafío: lote-22a-bestiario.md, lote-22b-bestiario.md...
   Uso: npm run gemini:encargo-bestiario   →   ../docs/gemini/lote-22?-bestiario.md
   La respuesta va en ../docs/gemini/respuesta-22?-bestiario.md y se aplica con npm run gemini:aplicar-bestiario. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mkdirSync, writeFileSync } from 'node:fs';
import { json, textoPlano, sinEtiquetas } from './oficial';
import { BESTIARIO_GENERADO } from '../../src/features/reglas/data/generadas/bestiario';
import { valorCr } from '../../src/features/reglas/data/bestiario';

const POR_PARTE = 60;
const unaLinea = (s: string) => s.replace(/\s+/g, ' ').trim();
const slug = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const COMUN = `"Mi turno" es una app de D&D (reglas 2024) en español. Su Mesa del DM ya tiene las estadísticas de los monstruos del
Manual de Monstruos 2025 (CA, PG, ataques, daños, CD). Tu trabajo: poner en español, en el formato de abajo, el nombre de
cada monstruo, una descripción y el nombre y texto de cada rasgo y acción, usando **solo el texto oficial en inglés** que
viene al final. Otra persona aplica tu respuesta con un script, así que el formato tiene que ser exacto.

## Reglas

1. **Nombres**: el nombre oficial en español del Manual de Monstruos si lo conoces con seguridad (Goblin → "Goblin",
   Owlbear → "Oso lechuza"). Si no hay traducción oficial o no estás seguro, deja el nombre en **inglés** tal cual: no
   inventes nombres. Lo mismo para los rasgos y acciones con nombre propio.
2. **Textos propios en español**, nunca traducción literal: resume con tus palabras.
   - \`texto\` (descripción del monstruo): 2 a 4 frases sobre qué es, dónde vive y cómo se comporta, a partir de la
     descripción oficial. Si no hay descripción oficial, 1 o 2 frases a partir de sus rasgos.
   - Rasgos y acciones: 1 a 3 frases con lo que hace. **No repitas los números** que la app ya muestra (bono de ataque,
     alcance, daño, CD y salvación): di solo el efecto extra (derriba, agarra, envenena, recarga, cuántos ataques hace...).
3. Los nombres de conjuros, en español si conoces el oficial.
4. Si algo no se entiende, escríbelo igual con la marca [NO CONFIRMADO].
5. Responde **solo** con el bloque de código JSON, sin nada antes ni después.`;

const FORMATO = `## Formato de la respuesta

Un único bloque \`\`\`json con un objeto: clave = la clave del monstruo (la que va entre corchetes en el texto oficial,
p. ej. [goblin-warrior]). Dentro de \`partes\`, una entrada por cada rasgo y acción, con su nombre en inglés **exacto**
como clave (tal como aparece en el texto oficial, incluido "(Recarga 5–6)" si lo trae):

\`\`\`json
{
  "goblin-warrior": {
    "n": "Guerrero goblin",
    "texto": "Descripción propia de 2 a 4 frases.",
    "partes": {
      "Scimitar": { "n": "Cimitarra", "t": "Si tenía ventaja en el ataque, hace 1d4 de daño cortante extra." },
      "Nimble Escape": { "n": "Huida ágil", "t": "Se retira o se esconde como acción adicional." }
    }
  }
}
\`\`\`

Incluye **todos** los monstruos del texto oficial, sin saltarte ninguno.`;

(async () => {
  const d = await json('bestiary/bestiary-xmm.json');
  const fluff = (await json('bestiary/fluff-bestiary-xmm.json')).monsterFluff;
  const desc = (x: any) => {
    const f = fluff.find((y: any) => y.name === x.name) || (x.group && fluff.find((y: any) => y.name === x.group[0]));
    return f ? unaLinea(textoPlano(f.entries || [])) : '';
  };
  const partesDe = (x: any) => ['trait', 'action', 'bonus', 'reaction', 'legendary'].flatMap(k => (x[k] || []).map((a: any) => {
    const n = sinEtiquetas(String(a.name).replace(/\{@recharge(?: (\d))?\}/g, (_: string, r: string) => r && r !== '6' ? `(Recarga ${r}–6)` : '(Recarga 6)'));
    return `  - ${n}: ${unaLinea(textoPlano(a.entries || []))}`;
  }));
  const conjuros = (x: any) => (x.spellcasting || []).map((s: any) => `  - ${s.name} (conjuros): ${unaLinea([textoPlano(s.headerEntries || []), ...(s.will || []).map(sinEtiquetas), ...Object.values<any>(s.daily || {}).flat().map(sinEtiquetas)].join(' '))}`);
  const lista = d.monster.filter((x: any) => BESTIARIO_GENERADO[slug(x.name)])
    .map((x: any) => ({ k: slug(x.name), x, m: BESTIARIO_GENERADO[slug(x.name)] }))
    .filter(({ m }: any) => m.n === m.en) // los ya traducidos no se vuelven a pedir
    .sort((a: any, b: any) => valorCr(a.m.cr) - valorCr(b.m.cr) || a.k.localeCompare(b.k));
  mkdirSync('../docs/gemini', { recursive: true });
  for (let i = 0; i * POR_PARTE < lista.length; i++) {
    const parte = lista.slice(i * POR_PARTE, (i + 1) * POR_PARTE), letra = String.fromCharCode(97 + i);
    const texto = parte.map(({ k, x, m }: any) => [
      `### [${k}] ${x.name} — desafío ${m.cr}, ${m.tam} ${m.tipo}`,
      desc(x) && `Descripción oficial: ${desc(x)}`,
      ...partesDe(x), ...conjuros(x),
    ].filter(Boolean).join('\n')).join('\n\n');
    const nombre = `lote-22${letra}-bestiario`;
    writeFileSync(`../docs/gemini/${nombre}.md`, [
      `# Encargo: Lote 22${letra} (bestiario, desafío ${parte[0].m.cr} a ${parte[parte.length - 1].m.cr}) de la app "Mi turno"\n\n${COMUN}`,
      FORMATO,
      `## Texto oficial (fuente única): ${parte.length} monstruos\n\n${texto}`,
    ].join('\n\n') + '\n');
    console.log(`../docs/gemini/${nombre}.md (${parte.length})  →  respuesta en ../docs/gemini/${nombre.replace(/^lote/, 'respuesta')}.md`);
  }
})();
