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

const recursoDe = (c: any, id: string) => (c.recursos || []).find((r: any) => r.id === id);
/** El recurso, si todavía le queda algún uso. */
function recursoLibre(c: any, id: string) {
  const r = recursoDe(c, id); if (!r) return null;
  return Math.min(c.pj?.used?.[id] || 0, r.max) < r.max ? r : null;
}

const AL_ACERTAR = /(al|cuando|si|tras|cada vez que|despues de) (aciert|acertar|impact|golpe)|al atacar|accion atacar|un ataque (adicional|extra)|otro ataque/;

export type Extra = { nombre: string; t: string; expr: string; atk?: string; gasta?: string; requiere?: 'ventaja' };

/** Lo que puede seguir a un ataque con `a` (fila de Atacar): rasgos que se activan al acertar, acciones adicionales
    que atacan (con la otra arma ligera) y conjuros como Castigo divino, uno por nivel de espacio que te quede. */
export function extrasAtaque(c: any, a?: any): Extra[] {
  const dado = (txt: string) => /(\d+d\d+(?:\s*[+-]\s*\d+)?)/.exec(txt || '')?.[1]?.replace(/\s/g, '') || '';
  const w = a?.w, sutilODist = !!w && (w.dist || (w.p || []).includes('sutil'));
  const out: Extra[] = [];
  for (const e of c.entries || []) {
    const n = norm(e.nombre);
    // Disparos Arcanos: al acertar con un arma con munición, gastando un uso (los que se disparan sin tirar ataque no siguen a un ataque)
    if (/uso de disparo arcano/.test(norm(e.coste || ''))) {
      const r = (c.recursos || []).find((x: any) => norm(x.nombre) === 'disparo arcano'), libre = r && recursoLibre(c, r.id);
      if (libre && (w?.p || []).includes('munición') && !/^no tiras ataque/.test(norm(e.texto || ''))) out.push({ nombre: e.nombre, t: 'gratis', expr: dado(e.texto), gasta: libre.id });
      continue;
    }
    if (!['gratis', 'adicional', 'pasiva'].includes(e.t) || /^ataque extra/.test(n) || !AL_ACERTAR.test(norm(e.texto || ''))) continue;
    // Ataque Furtivo: con un arma sutil o a distancia, y con ventaja
    if (/^ataque furtivo/.test(n)) { if (sutilODist) out.push({ nombre: e.nombre, t: e.t, expr: dado(e.texto), requiere: 'ventaja' }); continue; }
    // Un rasgo que se paga con espacios (Castigo Divino): una opción por nivel de espacio que te quede, y la gratis si le queda uso.
    // Lo que no se puede pagar no se ofrece.
    const expr = dado(e.texto), rec = e.recurso ? recursoLibre(c, e.recurso) : null;
    if (/espacio/.test(norm(e.coste || ''))) {
      // El uso gratis equivale a un espacio de nivel 1: mientras quede, se ofrece ese y los espacios desde el nivel 2
      if (rec) out.push({ nombre: `${e.nombre} gratis`, t: e.t, expr, gasta: rec.id });
      for (const x of espaciosPara(c, rec ? 2 : 1).filter((x: any) => x.quedan > 0))
        out.push({ nombre: `${e.nombre} con espacio de nivel ${x.nivel}`, t: e.t, expr: dadosAlLanzar(expr, 1, x.nivel, e.texto), gasta: 'slot' + x.nivel });
      continue;
    }
    if (e.recurso && !rec && recursoDe(c, e.recurso)) continue;
    out.push({ nombre: e.nombre, t: e.t, expr, ...(rec ? { gasta: rec.id } : {}) });
  }
  // Con un arma ligera en la mano principal, el ataque con la otra (acción adicional)
  const otra = (c.entries || []).find((e: any) => e.nombre === 'Ataque con la otra arma ligera');
  if (otra?.roll && a?.mano === 'principal' && (w?.p || []).includes('ligera'))
    out.push({ nombre: `Ataque con ${otra.roll[2] || 'la otra arma'}`, t: 'adicional', atk: otra.roll[0], expr: otra.roll[1] });
  for (const s of c.conjuros || []) {
    if (s.tiempo !== 'adicional' || !AL_ACERTAR.test(norm(s.desc || ''))) continue;
    const nv = +s.nivel || 0;
    if (!nv) { out.push({ nombre: s.nombre, t: 'adicional', expr: s.dados || '' }); continue; }
    for (const e of espaciosPara(c, nv).filter((x: any) => x.quedan > 0))
      out.push({ nombre: `${s.nombre} con espacio de nivel ${e.nivel}`, t: 'adicional', expr: dadosAlLanzar(s.dados || '', nv, e.nivel, s.desc), gasta: 'slot' + e.nivel });
  }
  return out;
}

/** Conjuros de Evocación de la app (Manual del Jugador 2024 y los de otros libros), para bonos como Evocación Potenciada. */
export const EVOCACION = new Set([
  'Agarre electrizante', 'Arma espiritual', 'Bola de fuego', 'Bola de fuego de explosión retardada', 'Castigo abrasador', 'Castigo atronador',
  'Castigo brillante', 'Castigo cegador', 'Castigo divino', 'Cono de frío', 'Descarga de fuego', 'Descarga sobrenatural', 'Explosión sobrenatural',
  'Escudo de fuego', 'Esfera congelante de Otiluke', 'Esfera Vitriólica', 'Espada de mordenkainen', 'Explosión Solar', 'Flecha Ácida de Melf',
  'Fuego feérico', 'Golpe Flamígero', 'Hacer añicos', 'Hoja de fuego', 'Llama sagrada', 'Luz', 'Luz del día', 'Mano de Bigby', 'Manos ardientes',
  'Muro de fuego', 'Muro de fuerza', 'Muro de hielo', 'Muro de piedra', 'Muro de viento', 'Ola atronadora', 'Onda atronadora', 'Orbe cromático',
  'Oscuridad', 'Palabra de resplandor', 'Proyectil mágico', 'Rayo abrasador', 'Rayo de escarcha', 'Rayo de fuego', 'Rayo de hechicería', 'Rayo de luna',
  'Rayo guía', 'Saeta guía', 'Rayo solar', 'Relámpago', 'Relámpago en cadena', 'Rociada prismática', 'Ráfaga de viento', 'Tormenta de hielo',
  'Tormenta de meteoritos', 'Tormenta resplandeciente de Jallarzi', 'Tronar', 'Voluta estelar',
].map(norm));
export const esEvocacion = (s: any) => EVOCACION.has(norm(s?.nombre || ''));

/** Bonos de rasgos que se suman solos al daño del conjuro (c.bonosConjuro: {nombre, valor, si(s)}). */
export const bonosPara = (c: any, s: any) => (c.bonosConjuro || []).filter((b: any) => !b.si || b.si(s));
