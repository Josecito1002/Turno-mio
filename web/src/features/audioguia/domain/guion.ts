/* Una guía de sesión en Markdown (formato del «Manual para escribir guías») → guion para escucharla como un pódcast.
   Se lee el texto, los recuadros (anunciando de qué tipo son) y las tablas fila por fila. Las estadísticas del
   apéndice A se resumen. Se saltan los recuadros RELOJ DE PARED, las imágenes, los bloques de código y los apéndices
   de mapas, hoja de control y fichas de objeto. */
import { frases, paraOir, sinMarcas, trozos } from './oir';

export type Nivel = 1 | 2 | 3 | 4;

export type SeccionGuion = {
  /** el título tal como sale en el índice */
  titulo: string;
  /** 1 capítulo (##), 2 sección (###), 3 zona o PNJ (####), 4 lo más pequeño (#####) */
  nivel: Nivel;
  /** lo que dice la voz, en trozos de unas pocas frases */
  trozos: string[];
};

export type Guion = { titulo: string; secciones: SeccionGuion[] };

/** Recuadros que no se leen: el reloj de pared solo sirve en la mesa. */
const SIN_LEER = new Set(['RELOJ DE PARED']);

/** Cómo se anuncia cada recuadro antes de leerlo. */
const ANUNCIO: Record<string, string> = {
  'LEER EN VOZ ALTA': 'Para leer en voz alta',
  'PARA ENTREGAR A LOS JUGADORES': 'Documento para los jugadores',
  'CONSEJO PARA DM NOVATO': 'Consejo para DM',
  'CONSEJO PARA DM': 'Consejo para DM',
  'NOTA DEL DM': 'Nota del DM',
  'REGLA 2024': 'Regla',
};

const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

/** Apéndices que no se escuchan: se ven o se imprimen. */
const apendiceSinLeer = (t: string) => /^Ap[ée]ndice\b/i.test(t) && /\b(mapas|control|fichas)\b/i.test(t);
const esEstadisticas = (t: string) => /^Ap[ée]ndice\b/i.test(t) && /estad[íi]sticas/i.test(t);

const terminar = (s: string) => (/[.!?…:;]$/.test(s) ? s : `${s}.`);

/** Las frases de un texto, ya preparadas para la voz. */
const decir = (s: string) => frases(terminar(paraOir(s)));

/** Separa las celdas de una fila de tabla. */
const celdas = (fila: string) => fila.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim());

/** Una tabla, fila por fila: «Dayan: se le cae la taza…». Con más de dos columnas, cada celda con su encabezado. */
function tablaAFrases(filas: string[]): string[] {
  const datos = filas.filter((f) => !/^\s*\|?\s*:?-{2,}/.test(f)).map(celdas);
  if (!datos.length) return [];
  const [cab, ...resto] = datos;
  if (!resto.length) return decir(cab.filter(Boolean).join(', '));
  // la tabla de características (FUE, DES…) no se lee: no se entiende de oído
  if (cab.map((c) => sinMarcas(c)).join(' ') === 'FUE DES CON INT SAB CAR') return [];
  const vacia = (c: string) => !sinMarcas(c) || /^[—–-]$/.test(sinMarcas(c));
  const out: string[] = [];
  for (const r of resto) {
    const [primera, ...otras] = r;
    const partes = otras.map((c, i) => (vacia(c) ? '' : cab.length > 2 && sinMarcas(cab[i + 1] || '') ? `${sinMarcas(cab[i + 1])}: ${c}` : c)).filter(Boolean);
    const texto = vacia(primera) ? partes.join(' ') : `${terminar(sinMarcas(primera))} ${partes.map(terminar).join(' ')}`;
    out.push(...decir(texto));
  }
  return out;
}

/** Un recuadro `> **ETIQUETA · Título**`: se anuncia y se lee, salvo los que no se escuchan. */
function recuadroAFrases(lineas: string[]): string[] {
  const cuerpo = lineas.map((l) => l.replace(/^>\s?/, '')).filter((l) => l.trim());
  let etiqueta = '', titulo = '';
  const m = /^\*\*([^*]+?)\*\*\s*$/.exec(cuerpo[0] || '');
  if (m) {
    const [a, ...b] = m[1].split(/\s+·\s+/);
    if (a === a.toUpperCase() && /\p{L}/u.test(a)) { etiqueta = a.trim(); titulo = b.join(' · ').trim(); cuerpo.shift(); }
  }
  if (SIN_LEER.has(etiqueta)) return [];
  const out: string[] = [];
  if (etiqueta) out.push(...decir(`${ANUNCIO[etiqueta] || capitalizar(etiqueta)}${titulo ? `: ${titulo}` : ''}`));
  for (const l of cuerpo) {
    if (l.trim().startsWith('|')) continue;
    out.push(...decir(l.replace(/^\s*([-*+]|\d+[.)])\s+/, '')));
  }
  return out;
}

/** Una criatura del apéndice A, resumida: tipo, CA, PG, velocidad, desafío, rasgos y ataques. */
export function resumirCriatura(nombre: string, lineas: string[]): string[] {
  const texto = lineas.join('\n');
  const plano = sinMarcas(texto);
  const out: string[] = [];
  const tipo = lineas.map((l) => /^\*([^*].*[^*])\*\s*$/.exec(l.trim())?.[1]).find(Boolean);
  if (tipo) out.push(...decir(tipo));
  const ca = /(?:Clase de Armadura|\bCA)\s+(\d+)/i.exec(plano)?.[1];
  const pg = /(?:Puntos de golpe|\bPG)\s+(\d+)/i.exec(plano)?.[1];
  const vel = /Velocidad\s+(\d+ pies(?:,\s*\p{Ll}+ \d+ pies)*)/iu.exec(plano)?.[1];
  const datos = [ca && `clase de armadura ${ca}`, pg && `${pg} puntos de golpe`, vel && `velocidad ${vel}`].filter(Boolean);
  if (datos.length) { const d = datos.join(', '); out.push(...decir(d.charAt(0).toUpperCase() + d.slice(1))); }
  const vd = /(?:Valor de desaf[íi]o|\bVD)\s+([\d/]+)/i.exec(plano)?.[1];
  if (vd) out.push(...decir(`Valor de desafío ${vd}`));
  const rasgos: string[] = [];
  const ataques: string[] = [];
  for (const l of lineas) {
    const r = /^\*\*\*([^*]+?)\.?\*\*\*\s*(.*)$/.exec(l.trim());
    if (!r) continue;
    const cuerpo = sinMarcas(r[2]);
    const al = /([+−-]\d+) al ataque/.exec(cuerpo)?.[1];
    const dano = /Impacto:\s*(\d+)\s*(?:\([^)]*\))?\s*de daño (\w+)/.exec(cuerpo);
    if (al && dano) ataques.push(`${r[1]}: ${al} al ataque, ${dano[1]} de daño ${dano[2]}`);
    else rasgos.push(r[1]);
  }
  if (rasgos.length) out.push(...decir(`Rasgos: ${rasgos.length > 1 ? `${rasgos.slice(0, -1).join(', ')} y ${rasgos[rasgos.length - 1]}` : rasgos[0]}`));
  for (const a of ataques) out.push(...decir(a));
  if (!out.length) return decir(`${nombre}: las estadísticas están en la guía`);
  return out;
}

/** Convierte la guía en el guion que se escucha. */
export function guiaAGuion(md: string): Guion {
  const lineas = md.replace(/\r\n?/g, '\n').split('\n');
  const secciones: SeccionGuion[] = [];
  let titulo = '';
  let frasesActuales: string[] = [];
  let actual: SeccionGuion | null = null;
  const cerrar = () => {
    if (actual) actual.trozos = trozos(frasesActuales);
    frasesActuales = [];
  };
  const abrir = (t: string, nivel: Nivel, anuncio: string) => {
    cerrar();
    actual = { titulo: t, nivel, trozos: [] };
    secciones.push(actual);
    frasesActuales.push(...decir(anuncio));
  };
  const add = (f: string[]) => {
    if (!actual) abrir(titulo || 'Inicio', 1, titulo || 'Inicio');
    frasesActuales.push(...f);
  };

  let estadisticas = false;
  let i = 0;
  while (i < lineas.length) {
    const l = lineas[i];
    if (/^\s*(```|~~~)/.test(l)) {
      i++;
      while (i < lineas.length && !/^\s*(```|~~~)/.test(lineas[i])) i++;
      i++;
      continue;
    }
    if (!l.trim() || /^(-{3,}|_{3,}|\*{3,})\s*$/.test(l) || /^\s*!\[/.test(l) || /^\s*<!--.*-->\s*$/.test(l)) { i++; continue; }
    const h = /^(#{1,6})\s+(.*)$/.exec(l);
    if (h) {
      const n = h[1].length, t = sinMarcas(h[2].trim());
      i++;
      if (n === 1) {
        if (!titulo) titulo = t;
        continue;
      }
      if (n === 2) {
        if (apendiceSinLeer(t)) {
          while (i < lineas.length && !/^#{1,2}\s/.test(lineas[i])) i++;
          continue;
        }
        estadisticas = esEstadisticas(t);
        abrir(t, 1, `Capítulo: ${t}`);
        continue;
      }
      if (estadisticas && n >= 3) {
        const cuerpo: string[] = [];
        while (i < lineas.length && !/^#{1,4}\s/.test(lineas[i])) cuerpo.push(lineas[i++]);
        abrir(t, Math.min(n - 1, 4) as Nivel, t);
        frasesActuales.push(...resumirCriatura(t, cuerpo));
        continue;
      }
      abrir(t, Math.min(n - 1, 4) as Nivel, t);
      continue;
    }
    if (l.startsWith('>')) {
      const grupo: string[] = [];
      while (i < lineas.length && lineas[i].startsWith('>')) grupo.push(lineas[i++]);
      add(recuadroAFrases(grupo));
      continue;
    }
    if (l.trimStart().startsWith('|')) {
      const filas: string[] = [];
      while (i < lineas.length && lineas[i].trimStart().startsWith('|')) filas.push(lineas[i++]);
      add(tablaAFrases(filas));
      continue;
    }
    if (/^\s*([-*+] |\d+[.)] )/.test(l)) {
      const items: string[] = [];
      while (i < lineas.length && lineas[i].trim() && (/^\s*([-*+] |\d+[.)] )/.test(lineas[i]) || /^\s{2,}\S/.test(lineas[i]))) {
        const x = lineas[i++];
        if (/^\s*([-*+] |\d+[.)] )/.test(x) || !items.length) items.push(x.replace(/^\s*([-*+]|\d+[.)])\s+(\[[ xX]\]\s*)?/, ''));
        else items[items.length - 1] += ' ' + x.trim();
      }
      for (const it of items) add(decir(it));
      continue;
    }
    const partes: string[] = [];
    while (i < lineas.length && lineas[i].trim() && !/^(#{1,6}\s|>|\s*\||\s*!\[|\s*([-*+] |\d+[.)] )|\s*(```|~~~)|(-{3,}|_{3,})\s*$)/.test(lineas[i])) partes.push(lineas[i++].trim());
    if (!partes.length) { i++; continue; }
    add(decir(partes.join(' ')));
  }
  cerrar();
  return { titulo: titulo || secciones[0]?.titulo || 'Guía', secciones: secciones.filter((s) => s.trozos.length) };
}

/** Minutos que dura, más o menos, a velocidad normal (unas 14 letras por segundo). */
export function minutos(g: Guion): number {
  const letras = g.secciones.reduce((n, s) => n + s.trozos.reduce((m, t) => m + t.length, 0), 0);
  return Math.max(1, Math.round(letras / 14 / 60));
}
