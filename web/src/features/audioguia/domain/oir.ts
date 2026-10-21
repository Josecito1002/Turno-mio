/* Texto de una guía → texto para decir en voz alta. Sigue la tabla de abreviaturas del «Manual para escribir guías»
   (apartado 10): CD 13 → dificultad 13, 2d6 → 2 de 6, po → piezas de oro, A3 → a 3, FUE → fuerza… Los números se
   dejan en cifras: la voz los lee bien en español. */

const LETRAS: Record<string, string> = {
  A: 'a', B: 'be', C: 'ce', D: 'de', E: 'e', F: 'efe', G: 'ge', H: 'hache', I: 'i', J: 'jota', K: 'ka', L: 'ele',
  M: 'eme', N: 'ene', O: 'o', P: 'pe', Q: 'cu', R: 'erre', S: 'ese', T: 'te', U: 'u', V: 've', W: 'doble ve',
  X: 'equis', Y: 'ye', Z: 'zeta',
};
const letra = (c: string) => LETRAS[c.toUpperCase()] || c;

const CARACTERISTICAS: Record<string, string> = {
  FUE: 'fuerza', DES: 'destreza', CON: 'constitución', INT: 'inteligencia', SAB: 'sabiduría', CAR: 'carisma',
};

const MONEDAS: Record<string, string> = {
  po: 'piezas de oro', pp: 'piezas de plata', pc: 'piezas de cobre', pe: 'piezas de electro', ppt: 'piezas de platino',
};

const FRACCIONES: Record<string, string> = { '1/2': 'un medio', '1/4': 'un cuarto', '1/8': 'un octavo', '3/4': 'tres cuartos' };

const signo = (s: string) => (s === '+' ? 'más' : 'menos');

/** Quita las marcas de Markdown y deja solo el texto. */
export function sinMarcas(s: string): string {
  return s
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\\([\\{}^*_[\]#>|~:.+-])/g, '$1')
    .replace(/[*_`]+/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/** Lo que se le pasa a la voz: sin marcas y con las abreviaturas dichas enteras. */
export function paraOir(texto: string): string {
  let t = sinMarcas(texto);
  // dados: 2d6 + 3, 1d20, d6
  t = t.replace(/\b(\d*)d(\d+)\b(?:\s*([+−-])\s*(\d+))?/g, (_, n: string, caras: string, s?: string, k?: string) =>
    `${n ? `${n} de ${caras}` : `de ${caras}`}${s ? ` ${signo(s)} ${k}` : ''}`);
  t = t
    .replace(/[«»“”"]/g, '')
    .replace(/[‘’]/g, "'")
    .replace(/\s*[—]\s*/g, ', ')
    .replace(/(\d)\s*[–-]\s*(\d)/g, '$1 a $2')
    .replace(/\s*–\s*/g, ', ')
    .replace(/→/g, ' a ')
    .replace(/≈/g, 'unos ')
    .replace(/\bp\. ?ej\./gi, 'por ejemplo')
    .replace(/\bvs\./gi, 'contra')
    .replace(/(\d)\.(\d{3})\b/g, '$1$2')
    .replace(/(\d)\s*%/g, '$1 por ciento');
  t = t
    .replace(/\bCD\s*(\d)/g, 'dificultad $1')
    .replace(/\bCD\b/g, 'dificultad')
    .replace(/\bCA\s*(\d)/g, 'clase de armadura $1')
    .replace(/\bCA\b/g, 'clase de armadura')
    .replace(/\bPG\b/g, 'puntos de golpe')
    .replace(/\bPX\b/g, 'puntos de experiencia')
    .replace(/\bPNJ\b/g, 'personajes no jugadores')
    .replace(/(\d)\s*(ppt|po|pp|pc|pe)\b/g, (_, d: string, m: string) => `${d} ${MONEDAS[m]}`)
    .replace(/(\d)\s*cm\b/g, '$1 centímetros')
    .replace(/(\d)\s*mm\b/g, '$1 milímetros')
    .replace(/(\d)\s*km\b/g, '$1 kilómetros')
    .replace(/(\d)\s*kg\b/g, '$1 kilos')
    .replace(/(\d)\s*min\b\.?/g, '$1 minutos')
    .replace(/(\d)\s*h\b\.?/g, '$1 horas')
    .replace(/\b(\d)\/(\d)\b/g, (m) => FRACCIONES[m] || m.replace('/', ' de '))
    .replace(/\b(FUE|DES|CON|INT|SAB|CAR)\b/g, (m) => CARACTERISTICAS[m])
    .replace(/\b(Fue|Des|Con|Int|Sab|Car)(?=\s*[+−-]\d)/g, (m) => CARACTERISTICAS[m.toUpperCase()])
    // zonas del mapa: A3 → a 3, T15 → te 15, A3a → a 3 a
    .replace(/\b([A-Z])(\d{1,2})([a-z])?\b/g, (_, l: string, n: string, sub?: string) => `${letra(l)} ${n}${sub ? ` ${letra(sub)}` : ''}`)
    .replace(/(^|[\s(])\+(\d)/g, '$1más $2')
    .replace(/(^|[\s(])[−-](\d)/g, '$1menos $2')
    .replace(/×/g, ' por ')
    .replace(/\s*·\s*/g, ', ')
    .replace(/\s*\(\s*/g, ', ')
    .replace(/\s*\)\s*/g, ', ')
    .replace(/\s*\/\s*/g, ' o ')
    .replace(/\s*[|]\s*/g, ', ');
  return t
    .replace(/\s+/g, ' ')
    .replace(/,\s*([,.;:!?])/g, '$1')
    .replace(/([.!?…:;])\s*,\s*/g, '$1 ')
    .replace(/(?<!\.)\.\.(?!\.)/g, '.')
    .replace(/^[\s,]+|[\s,]+$/g, '')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

/** Parte un texto en frases. */
export function frases(texto: string): string[] {
  return texto
    .split(/(?<=[.!?…:;])\s+(?=[¿¡A-ZÁÉÍÓÚÑ0-9])/)
    .map((x) => x.trim())
    .filter((x) => /[\p{L}\p{N}]/u.test(x));
}

/** Junta frases seguidas en trozos de hasta `max` letras: cada trozo es un audio. */
export function trozos(lista: string[], max = 280): string[] {
  const out: string[] = [];
  let actual = '';
  for (const f of lista) {
    if (actual && (actual + ' ' + f).length > max) { out.push(actual); actual = f; }
    else actual = actual ? `${actual} ${f}` : f;
  }
  if (actual) out.push(actual);
  return out;
}
