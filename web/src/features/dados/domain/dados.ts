export type Termino = { n: number; d: number; s: number } | { k: number };
export type OpcionesTirada = {
  /** previo: el d20 que ya salió; con ventaja o desventaja se conserva y solo se tira el segundo */
  adv?: number; previo?: number; crit?: boolean; keep?: number; min3?: boolean; neutral?: boolean; noRepeat?: boolean;
  dmg?: string; dmgLabel?: string; dmgMin3?: boolean; conVentaja?: boolean;
  /** De dónde sale el número fijo de la tirada ("4 DES + 3 competencia") y el del daño que la sigue */
  mods?: string; dmgMods?: string;
  /** Lo que puede seguir a un ataque (rasgos al acertar, acciones adicionales), para ofrecerlo tras la tirada */
  extras?: { nombre: string; t: string; expr: string; atk?: string; gasta?: string; requiere?: 'ventaja' }[];
};
export type Grupo = { d: number; vals: number[]; kept: boolean[]; s: number; sum: number };
export type Resultado = { expr: string; groups: Grupo[]; consts: number; total: number; nat: number | null; label?: string; o?: OpcionesTirada };

export function rnd(d: number) {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return 1 + (a[0] % d);
}

export function parseRoll(s: string): Termino[] {
  s = String(s).replace(/−/g, '-').replace(/\s+/g, '').toLowerCase();
  const terms: Termino[] = [], re = /([+-]?)(?:(\d*)d(\d+)|(\d+))/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    const sg = m[1] === '-' ? -1 : 1;
    if (m[3]) terms.push({ n: +(m[2] || 1), d: +m[3], s: sg });
    else terms.push({ k: +m[4] * sg });
  }
  return terms;
}

export function resolver(expr: string, o: OpcionesTirada): Resultado {
  const groups: Grupo[] = [];
  let total = 0, consts = 0;
  parseRoll(expr).forEach(t => {
    if ('k' in t) { consts += t.k; return; }
    const n = t.n * (o.crit ? 2 : 1);
    let vals = Array.from({ length: n }, () => rnd(t.d)), kept = vals.map(() => true);
    if (t.d === 20 && n === 1 && o.adv) {
      vals = [o.previo || rnd(20), rnd(20)];
      const i = o.adv > 0 ? (vals[0] >= vals[1] ? 0 : 1) : (vals[0] <= vals[1] ? 0 : 1);
      kept = [i === 0, i === 1];
    }
    if (o.keep && o.keep < n) {
      const idx = vals.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]).slice(0, o.keep).map(x => x[1]);
      kept = vals.map((_, i) => idx.includes(i));
    }
    const eff = (v: number) => (o.min3 ? Math.max(3, v) : v);
    const sum = vals.reduce((s, v, i) => s + (kept[i] ? eff(v) : 0), 0);
    total += t.s * sum;
    groups.push({ d: t.d, vals, kept, s: t.s, sum });
  });
  total += consts;
  const g20 = groups.length === 1 && groups[0].d === 20 && groups[0].vals.length <= 2 ? groups[0] : null;
  return { expr, groups, consts, total, nat: g20 ? g20.vals[g20.kept.indexOf(true)] : null };
}
