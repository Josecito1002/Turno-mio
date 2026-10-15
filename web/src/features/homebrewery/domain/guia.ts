/* Convierte una guía de sesión escrita en Markdown (el formato de las guías de «El Precio de los Deseos»: `#` título,
   `##` capítulo, `###` sección, recuadros `> **ETIQUETA · Título**`) en bloques de Homebrewery listos para paginar. */

export type Bloque = {
  md: string;
  kind: 'h1' | 'h' | 'deck' | 'p' | 'list' | 'table' | 'box' | 'fig' | 'col';
  level?: number;
  text?: string;
  /** recuadros: apertura (`{{note,dm`), cabecera (etiqueta y título) y párrafos, para poder partirlos */
  open?: string;
  head?: string;
  paras?: string[];
  /** segunda parte de algo partido: no va al índice */
  cont?: boolean;
};

export type MetaGuia = { title: string; subtitle: string; running: string };

/** Etiqueta del recuadro → bloque de Homebrewery y clase de color. */
const CAJAS: Record<string, [string, string]> = {
  'LEER EN VOZ ALTA': ['descriptive', 'leer'],
  'PARA ENTREGAR A LOS JUGADORES': ['descriptive', 'entregar'],
  'CONVERSACIÓN': ['note', 'talk'],
  'NOTA DEL DM': ['note', 'dm'],
  'CONSEJO PARA DM NOVATO': ['note', 'tip'],
  'CONSEJO PARA DM': ['note', 'tip'],
  'CONSEJO': ['note', 'tip'],
  'PISTA': ['note', 'clue'],
  'REGLA 2024': ['note', 'rule'],
  'OPCIONAL': ['note', 'opt'],
  'CUIDADO': ['note', 'warn'],
  'POR DECIDIR': ['note', 'todo'],
  'TÁCTICA': ['note', 'tac'],
  'COMENTARIO DE TRAMA': ['note', 'trama'],
};

/** Jose (2026-10-15): «Consejo para DM», sin «novato». */
const sinNovato = (s: string) => s.replace(/(consejo para dm) novato/gi, '$1');

/** Escapa lo que Homebrewery leería como marca propia (bloques `{{ }}`, listas de definición `::`, superíndices `^`). */
export function escapar(s: string): string {
  return sinNovato(s).replace(/([{}^])/g, '\\$1').replace(/::/g, ':\\:');
}

export const textoPlano = (s: string) => s.replace(/\\([{}^*_[\]])/g, '$1').replace(/[*_`]/g, '').trim();

function recuadro(lineas: string[]): Bloque {
  const cuerpo = lineas.map((l) => l.replace(/^>\s?/, ''));
  let etiqueta = '', titulo = '';
  const m = /^\*\*([^*]+?)\*\*\s*$/.exec(cuerpo[0] || '');
  if (m) {
    const [a, ...b] = m[1].split(/\s+·\s+/);
    const cand = a.trim().toUpperCase();
    if (b.length && a === a.toUpperCase()) { etiqueta = cand; titulo = b.join(' · ').trim(); }
    else if (CAJAS[cand]) etiqueta = cand;
    if (etiqueta) cuerpo.shift();
  }
  const [base, cls] = CAJAS[etiqueta] || ['note', 'otro'];
  const head: string[] = [];
  if (base === 'note' && etiqueta) head.push(`{{lbl ${escapar(etiqueta === 'CONSEJO PARA DM NOVATO' ? 'CONSEJO PARA DM' : etiqueta)}}}`);
  if (base === 'descriptive' && cls === 'entregar') head.push('{{lbl PARA ENTREGAR A LOS JUGADORES}}');
  if (titulo) head.push(`##### ${escapar(titulo)}`);
  // cada línea del recuadro es un párrafo; las de lista van juntas
  const paras: string[] = [];
  for (const l of cuerpo) {
    if (!l.trim()) continue;
    const lista = /^([-*] |\d+[.)] )/.test(l);
    if (lista && paras.length && /^([-*] |\d+[.)] )/.test(paras[paras.length - 1].split('\n').pop() || '')) paras[paras.length - 1] += '\n' + escapar(l);
    else paras.push(lista ? escapar(l) : escaparLinea(l));
  }
  const open = `{{${base},${cls}`;
  const h = head.join('\n');
  return { md: `${open}\n${[...(h ? [h] : []), ...paras].join('\n\n')}\n}}`, kind: 'box', open, head: h, paras };
}

/** Un párrafo que empieza como título, cita o lista numerada se escapa para que siga siendo párrafo. */
const escaparLinea = (l: string) => escapar(l.trim()).replace(/^(#|>|[-+] )/, '\\$1').replace(/^(\d+)([.)]) /, '$1\\$2 ');

export function guiaABloques(texto: string): { meta: MetaGuia; bloques: Bloque[] } {
  const lineas = texto.replace(/\r\n?/g, '\n').split('\n');
  const bloques: Bloque[] = [];
  const meta: MetaGuia = { title: '', subtitle: '', running: '' };
  let i = 0;
  const add = (b: Bloque) => bloques.push(b);
  while (i < lineas.length) {
    const l = lineas[i];
    if (!l.trim() || /^(-{3,}|_{3,}|\*{3,})\s*$/.test(l)) { i++; continue; }
    const h = /^(#{1,6})\s+(.*)$/.exec(l);
    if (h) {
      const n = h[1].length, t = h[2].trim();
      i++;
      if (n === 1) {
        meta.running = textoPlano(t);
        const [a, ...b] = t.split(/\s+·\s+/);
        if (!meta.title) { meta.title = textoPlano(a); meta.subtitle = textoPlano(b.join(' · ')); }
        continue;
      }
      if (n === 2) {
        add({ md: `# ${escapar(t)}`, kind: 'h1', text: textoPlano(t) });
        // la entradilla en cursiva justo debajo del capítulo
        let j = i;
        while (j < lineas.length && !lineas[j].trim()) j++;
        const d = /^\*([^*].*[^*])\*\s*$/.exec(lineas[j] || '');
        if (d) { add({ md: `{{wide,deck\n${escapar(d[1])}\n}}`, kind: 'deck' }); i = j + 1; }
        continue;
      }
      add({ md: `${'#'.repeat(Math.min(n, 5))} ${escapar(t)}`, kind: 'h', level: n - 1, text: textoPlano(t) });
      continue;
    }
    if (l.startsWith('>')) {
      const grupo: string[] = [];
      while (i < lineas.length && lineas[i].startsWith('>')) grupo.push(lineas[i++]);
      add(recuadro(grupo));
      continue;
    }
    if (l.trimStart().startsWith('|')) {
      const filas: string[] = [];
      while (i < lineas.length && lineas[i].trimStart().startsWith('|')) filas.push(escapar(lineas[i++].trim()));
      add({ md: filas.join('\n'), kind: 'table' });
      continue;
    }
    const img = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/.exec(l.trim());
    if (img) {
      const pie = img[1].trim();
      add({ md: `{{fig,incol\n![${pie}](${img[2]}){width:60%}${pie ? `\n\n{{cap ${escapar(pie)}}}` : ''}\n}}`, kind: 'fig' });
      i++;
      continue;
    }
    if (/^\s*([-*+] |\d+[.)] )/.test(l)) {
      const items: string[] = [];
      while (i < lineas.length && lineas[i].trim() && (/^\s*([-*+] |\d+[.)] )/.test(lineas[i]) || /^\s{2,}\S/.test(lineas[i]))) {
        const x = lineas[i++];
        if (/^\s*([-*+] |\d+[.)] )/.test(x) || !items.length) items.push(escapar(x.replace(/^\s*\* /, '- ')));
        else items[items.length - 1] += ' ' + escapar(x.trim());
      }
      add({ md: items.join('\n'), kind: 'list' });
      continue;
    }
    // párrafo: líneas seguidas hasta una en blanco o algo que no sea texto
    const partes: string[] = [];
    while (i < lineas.length && lineas[i].trim() && !/^(#{1,6}\s|>|\s*\||!\[|\s*([-*+] |\d+[.)] )|(-{3,}|_{3,})\s*$)/.test(lineas[i])) partes.push(lineas[i++].trim());
    if (!partes.length) { add({ md: escaparLinea(lineas[i++]), kind: 'p' }); continue; }
    add({ md: escaparLinea(partes.join(' ')), kind: 'p' });
  }
  if (!meta.title) meta.title = meta.running = 'Guía';
  return { meta, bloques };
}
