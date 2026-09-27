/* eslint-disable @typescript-eslint/no-explicit-any */
import { OBJETOS_MAGICOS, type ObjetoMagico } from '@/features/reglas/data/objetos-magicos';
import { ARMAS, ARMADURAS } from '@/features/reglas/data/equipo';

/* ---------- Objetos mágicos ----------
   pj.magicos: [{id, k (clave del catálogo) o def (personalizado), sint (sintonizado), arma?, armadura?, escudo?}].
   Las armas y armaduras mágicas (+1, +2, +3 o del catálogo con `base`) crean su propia arma o armadura 'x:…'
   en el inventario, con el bono ya puesto; el objeto guarda su clave para quitarla junto con él. */
export const MAX_SINTONIA = 3;
/** Límite de sintonía del personaje: 3, o más si un rasgo lo sube (Usar Objeto Mágico del Ladrón pone `c.maxSintonia`). */
export const maxSintonia = (c: any) => c?.maxSintonia || MAX_SINTONIA;

export const defDe = (m: any): ObjetoMagico | null => m.def || OBJETOS_MAGICOS[m.k] || null;
/** Cuenta si no pide sintonización o si está sintonizado. */
export const activo = (m: any) => { const d = defDe(m); return !!d && (!d.sint || !!m.sint); };
export const magicosDe = (pj: any) => (pj.magicos || []).filter((m: any) => defDe(m));
export const sintonizados = (pj: any) => magicosDe(pj).filter((m: any) => defDe(m)!.sint && m.sint).length;

/** Arma o armadura que crea un objeto con `base`: copia la elegida con el nombre del objeto y el bono. */
export function armaMagica(baseKey: string, d: ObjetoMagico) {
  const w = ARMAS[baseKey]; if (!w) return null;
  const n = /^Arma \+\d$/.test(d.n) ? `${w.n} +${d.bono}` : `${d.n} (${w.n.toLowerCase()})`;
  return { ...w, n, bono: d.bono || 0, ...(d.danoExtra ? { danoExtra: d.danoExtra } : {}), magico: true };
}
export function armaduraMagica(baseKey: string, d: ObjetoMagico) {
  const a = ARMADURAS[baseKey]; if (!a) return null;
  const n = /^Armadura \+\d$/.test(d.n) ? `${a.n} +${d.bono}` : `${d.n} (${a.n.toLowerCase()})`;
  return { ...a, n, base: a.base + (d.bono || 0), magico: true };
}

/** Características que fija un objeto activo (Guanteletes de Fuerza de Ogro: FUE 19 si era menor). */
export function aplicarFijas(pj: any, sc: Record<string, number>) {
  for (const m of magicosDe(pj)) {
    if (!activo(m)) continue;
    for (const [k, v] of Object.entries(defDe(m)!.fija || {})) if (sc[k] < v) sc[k] = v;
  }
}

/** Claves de armas mágicas cuyo objeto pide sintonización y no la tiene: no suman su bono. */
export function armasInactivas(pj: any) {
  return new Set(magicosDe(pj).filter((m: any) => m.arma && !activo(m)).map((m: any) => m.arma));
}

/** Bonos, cargas, conjuros y la entrada de cada objeto activo. Va después de las reglas y antes de los conjuros de rasgos. */
export function aplicarMagicos(c: any) {
  c.magicos = [];
  for (const m of magicosDe(c.pj)) {
    const d = defDe(m)!, on = activo(m);
    c.magicos.push({ m, d, activo: on });
    if (!on) continue;
    const escudo = d.base === 'escudo' || d.tipo === 'escudo';
    if (escudo && d.bono && c.shield) c.bonoCAMagica = (c.bonoCAMagica || 0) + d.bono;
    if (d.bonoCA && (!escudo || c.shield)) c.bonoCAMagica = (c.bonoCAMagica || 0) + d.bonoCA;
    if (d.bonoSalv) for (const k in c.saves) c.saves[k] += d.bonoSalv;
    if (d.bonoConj && c.casterAb) { c.atkSpell += d.bonoConj; c.dcSpell += d.bonoConj; }
    const id = 'mg-' + m.id, recurso = d.cargas ? id : '';
    if (d.cargas) c.extraRes.push({ id, nombre: d.n, max: d.cargas.max, reset: d.cargas.reset || 'largo', nota: d.cargas.nota || '', solo: true });
    (d.conjuros || []).forEach(s => c.conjurosReglas.push({ nombre: s.n, src: d.n, nota: `Con ${d.n}: ${s.coste}`, coste: s.coste,
      recurso: /carga/.test(s.coste) ? recurso : '', cd: s.cd, atk: s.atk }));
    // Las armas y armaduras mágicas ya salen en Atacar y en la CA: su entrada solo hace falta si hacen algo más
    if ((m.arma || m.armadura || m.escudo) && !d.cargas && !d.conjuros && /^(Arma|Armadura|Escudo) \+\d$/.test(d.n)) continue;
    c.entries.push({ t: d.t || 'pasiva', tAuto: d.t || 'pasiva', nombre: d.n, texto: d.texto, raw: true, src: 'Objeto mágico', grupo: 'objeto',
      coste: d.cargas ? `${d.cargas.max} cargas` : '', recurso, noSplit: true, revisada: true });
  }
  c.sintonizados = sintonizados(c.pj);
}
