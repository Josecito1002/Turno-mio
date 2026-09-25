/* eslint-disable @typescript-eslint/no-explicit-any */
import { norm } from '@/shared/utils/texto';

/** Dados que suma el conjuro por cada nivel de espacio por encima del suyo ("+1d6 por nivel de espacio", "aumenta en 1d8 por cada nivel"). */
export function mejoraPorNivel(desc: string): { n: number; d: number } | null {
  const m = /(\d+)d(\d+)\s+(?:de daño\s+(?:\S+\s+)?)?(?:más\s+)?por\s+(?:cada\s+)?nivel/i.exec(desc || '');
  return m ? { n: +m[1], d: +m[2] } : null;
}

/** Dados del conjuro lanzado con un espacio de nivel `espacio`: suma la mejora por nivel y los bonos fijos elegidos. */
export function dadosAlLanzar(base: string, nivel: number, espacio: number, desc: string, bono = 0) {
  let expr = base;
  const extra = espacio - nivel, mej = mejoraPorNivel(desc);
  if (expr && mej && extra > 0) {
    const m = /^(\d+)d(\d+)/.exec(expr);
    expr = m && +m[2] === mej.d ? expr.replace(/^(\d+)d/, `${+m[1] + mej.n * extra}d`) : `${expr}+${mej.n * extra}d${mej.d}`;
  }
  if (expr && bono) expr += bono > 0 ? `+${bono}` : `${bono}`;
  return expr;
}

/** Niveles de espacio con los que se puede lanzar un conjuro de nivel `nivel`, con los que quedan. */
export function espaciosPara(c: any, nivel: number) {
  const used = c.pj?.used || {};
  return (c.recursos || []).filter((r: any) => /^slot\d+$/.test(r.id) && +r.id.slice(4) >= nivel)
    .map((r: any) => ({ nivel: +r.id.slice(4), nombre: r.nombre, quedan: r.max - Math.min(used[r.id] || 0, r.max) }))
    .sort((a: any, b: any) => a.nivel - b.nivel);
}

const AL_ACERTAR = /(al|cuando|si|tras|cada vez que|despues de) (aciert|acertar|impact|golpe)|al atacar|accion atacar|un ataque (adicional|extra)|otro ataque/;

/** Lo que puede seguir a un ataque: rasgos que se activan al acertar y acciones adicionales que atacan, con sus dados. */
export function extrasAtaque(c: any): { nombre: string; t: string; expr: string }[] {
  const dado = (txt: string) => /(\d+d\d+(?:\s*[+-]\s*\d+)?)/.exec(txt || '')?.[1]?.replace(/\s/g, '') || '';
  const ents = (c.entries || []).filter((e: any) => ['gratis', 'adicional', 'pasiva'].includes(e.t) && !/^ataque extra/.test(norm(e.nombre))
    && AL_ACERTAR.test(norm(e.texto || '')))
    .map((e: any) => ({ nombre: e.nombre, t: e.t, expr: e.dado || dado(e.texto) }));
  const sps = (c.conjuros || []).filter((s: any) => s.tiempo === 'adicional' && AL_ACERTAR.test(norm(s.desc || '')))
    .map((s: any) => ({ nombre: s.nombre, t: 'adicional', expr: s.dados || '' }));
  return [...ents, ...sps];
}
