export const norm = (s: unknown) =>
  String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

export const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

/** Escapa y deja pasar solo <br>, <b>, <i>, <strong>, <em>. */
export const rich = (s: unknown) =>
  esc(s).replace(/&lt;br\s*\/?&gt;/gi, '<br>').replace(/&lt;(\/?)(b|i|strong|em)&gt;/gi, '<$1$2>');

export const richT = (s: unknown) => rich(s).replace(/\n/g, '<br>');

export const sign = (n: number) => (n >= 0 ? '+' : '−') + Math.abs(n);
export const fmtMod = (n: number) => (n > 0 ? ' + ' + n : n < 0 ? ' − ' + Math.abs(n) : '');
export const modStr = (n: number) => (n > 0 ? '+' + n : n < 0 ? '-' + Math.abs(n) : '');
export const modOf = (v: number) => Math.floor((v - 10) / 2);
export const slug = (s: unknown) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'personaje';
export const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export function stripTags(s: unknown) {
  return String(s || '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
}

type Obj = Record<string, unknown>;

/** Asigna un valor siguiendo una ruta con puntos ("mejoras.4.modo"), creando objetos intermedios. */
export function setPath(o: object, path: string, v: unknown) {
  const ks = path.split('.');
  let x = o as Obj;
  for (let i = 0; i < ks.length - 1; i++) {
    if (x[ks[i]] == null || typeof x[ks[i]] !== 'object') x[ks[i]] = {};
    x = x[ks[i]] as Obj;
  }
  x[ks[ks.length - 1]] = v;
}

export function getPath(o: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((x, k) => (x == null ? undefined : (x as Obj)[k]), o);
}
