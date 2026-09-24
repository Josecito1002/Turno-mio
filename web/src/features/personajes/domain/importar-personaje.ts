/* eslint-disable */
// @ts-nocheck -- lógica portada de index.html
import { norm, slug } from '@/shared/utils/texto';
import { AB, SKILLS, ALINEAMIENTOS, abKey } from '@/features/reglas/data/caracteristicas';
import { ARMAS, ARMADURAS, findByAlias } from '@/features/reglas/data/equipo';
import { ESPECIES } from '@/features/reglas/data/especies';
import { ESTILOS } from '@/features/reglas/data/estilos';
import { CLASES } from '@/features/reglas/data/clases';
import { SUBCLASES } from '@/features/reglas/data/subclases';
import { CATALOGO } from '@/features/reglas/data/conjuros';
import { doteKey } from '@/features/reglas/data/dotes';
import { rasgoDe } from '@/features/reglas/domain/clasificar';
import { getLib, getC, getT, getAltos, getSubAltos, subclasesLib } from '@/features/biblioteca/domain/biblioteca';
import { aprenderBuilder, CLASS_KEY, libKey, especieBuiltin, trasfondoBuiltin, spellDeBuilder } from '@/features/biblioteca/domain/aprender-builder';
import { nuevoPj } from './modelo';
import { compute } from './calculo';

export function convertBuilder(d){
  const LIB = getLib();
  aprenderBuilder(d);
  const pj = nuevoPj();
  pj.nombre = d.name || ''; pj.historia = d.lore || '';
  pj.alineamiento = ALINEAMIENTOS[norm(d.alignment)] || '';
  const cls = (d.classes && d.classes[0]) || d.class || {};
  const bk = CLASS_KEY(cls.id) || CLASS_KEY(cls.nombre);
  pj.clase = bk || (cls.id || cls.nombre ? libKey(cls) : '');
  pj.nivel = +(cls.nivel || d.level || 1);
  const C = getC(pj, pj.clase);
  const sub = d.subclass || cls.subclase, sn = norm(sub?.nombre || sub?.name || '');
  if (sub && sn) {
    if (pj.clase === 'brujo' && /cadena|chain/.test(sn)) pj.pactoCadena = true;
    else {
      const S = bk ? SUBCLASES.find(s => s.clase === bk && s.key !== 'cadena' && s.match.test(sn)) : null;
      pj.subclase = S ? S.key : 'lib:' + slug(sub.id || sub.nombre || sub.name);
      if (!S && !LIB.clases[pj.clase]?.subclases?.[slug(sub.id || sub.nombre || sub.name)]) {
        LIB.clases[pj.clase] = LIB.clases[pj.clase] || {subclases:{}};
        LIB.clases[pj.clase].subclases[slug(sub.id || sub.nombre || sub.name)] = {n: sub.nombre || sub.name, rasgos: (sub.rasgos || []).map(r => rasgoDe(r, +r.nivel || 3))};
      }
    }
  }

  const ek = especieBuiltin(d.race);
  if (ek) {
    pj.especie.key = ek;
    const E = ESPECIES[ek];
    if (E.subs && d.subrace) {
      const sk = norm(d.subrace.id || d.subrace.nombre);
      pj.especie.sub = Object.keys(E.subs).find(k => k === sk || sk.includes(k) || k.includes(sk) || (E.subs[k].al || []).some(a => sk.includes(a)) || norm(E.subs[k].n) === sk) || '';
    }
  } else if (d.race) { pj.especie.key = libKey(d.race); pj.especie.sub = d.subrace ? slug(d.subrace.id || d.subrace.nombre || d.subrace.name) : ''; }

  const feats = d.feats || [];
  const estiloF = feats.find(f => /estilo|combate|fighting/.test(norm(f.categoria || f.category)));
  if (estiloF) { const n = norm(estiloF.nombre || estiloF.name); pj.estilo = Object.keys(ESTILOS).find(k => n.includes(norm(ESTILOS[k][0]).split(' ')[0])) || ''; }
  const dotes = feats.filter(f => f !== estiloF);
  const fKey = f => doteKey(f.nombre || f.name) || libKey(f);

  const bg = d.background || {};
  const tk = trasfondoBuiltin(bg);
  pj.trasfondo.key = tk || (bg.nombre || bg.name ? libKey(bg) : '');
  const T = getT(pj, pj.trasfondo.key);
  if (T) pj.trasfondo.herr = T.herr;
  const bon = Object.entries(d.backgroundBonuses?.values || {}).map(([k, v]) => [abKey(k), v]).filter(([k, v]) => k && v);
  if (bon.length === 3 && bon.every(b => b[1] === 1)) pj.trasfondo.modo = '111';
  else { pj.trasfondo.modo = '21'; pj.trasfondo.a = (bon.find(b => b[1] === 2) || [''])[0]; pj.trasfondo.b = (bon.find(b => b[1] === 1) || [''])[0]; }
  pj.trasfondo.dote = dotes[0] ? fKey(dotes[0]) : (T?.dote || '');
  dotes.slice(1).forEach(f => pj.dotesExtra.push({key: fKey(f)}));

  pj.gen.metodo = 'manual';
  AB.forEach(([k, en]) => pj.gen.manual[k] = +(d.stats?.[en] ?? 10));

  const bgSet = new Set((T?.habs || []).map(norm));
  const lista = C ? (C.habs === 'todas' ? SKILLS.map(s => s[0]) : C.habs) : [];
  (d.skills || []).forEach(s => {
    const nombre = (SKILLS.find(x => norm(x[0]) === norm(s)) || [s])[0];
    if (bgSet.has(norm(nombre))) return;
    if (lista.includes(nombre) && pj.habClase.length < (C?.habN || 0)) pj.habClase.push(nombre);
    else pj.habExtra.push(nombre);
  });

  pj.conjuros = (d.spells || []).map(s => { const cat = CATALOGO.find(x => norm(x.nombre) === norm(s.nombre || s.name)); return cat ? {...cat} : spellDeBuilder(s); });

  const otros = [];
  (d.inventory || []).forEach(it => {
    const nm = it.nombre || it.name || '';
    const w = findByAlias(ARMAS, nm); if (w) { const ex = pj.armas.find(a => a[0] === w); if (ex) ex[1]++; else pj.armas.push([w, 1]); return; }
    const a = findByAlias(ARMADURAS, nm); if (a) { pj.armadura = a; return; }
    if (/\bescudo\b/.test(norm(nm))) { pj.escudo = true; return; }
    otros.push(nm);
  });
  pj.inventario = otros.join('\n'); pj.oro = +d.money || 0;
  pj.maestrias = (d.masteries || []).map(x => findByAlias(ARMAS, typeof x === 'string' ? x : (x.nombre || x.name || x.id || ''))).filter(Boolean);

  pj.pgModo = 'maximo';
  if (+d.hp?.max !== compute(pj).hpMax) pj.pgModo = 'promedio';
  snapshot(pj);
  return pj;
}
/* Copia dentro del personaje lo que usa de la biblioteca, para que funcione aunque se comparta */
export function snapshot(pj){
  const LIB = getLib();
  const prev = pj.contenido || {}, ct = {especies:{}, clases:{}, trasfondos:{}, dotes:{}, subclases:{}};
  const k1 = pj.especie?.key; if (k1?.startsWith('lib:')) { const v = LIB.especies[k1] || prev.especies?.[k1]; if (v) ct.especies[k1] = v; }
  const k2 = pj.clase; if (k2?.startsWith('lib:')) { const v = LIB.clases[k2]?.dado ? LIB.clases[k2] : prev.clases?.[k2]; if (v) ct.clases[k2] = {...v, subclases:{}}; }
  if (pj.subclase?.startsWith('lib:')) { const sk = pj.subclase.slice(4); const v = subclasesLib(k2)[sk] || prev.subclases?.[pj.subclase]; if (v) ct.subclases[pj.subclase] = {...v, clase:k2}; }
  if (CLASES[k2]) { const ra = getAltos(pj, k2), sa = pj.subclase && getSubAltos(pj, k2, pj.subclase); if (ra || sa) ct.altos = {[k2]: {rasgos: ra || null, subs: sa ? {[pj.subclase]: sa} : {}}}; }
  const k3 = pj.trasfondo?.key; if (k3?.startsWith('lib:')) { const v = LIB.trasfondos[k3] || prev.trasfondos?.[k3]; if (v) ct.trasfondos[k3] = v; }
  [pj.trasfondo?.dote, pj.doteHumano, ...(pj.dotesExtra || []).map(d => d.key)].forEach(k => { if (k?.startsWith('lib:')) { const v = LIB.dotes[k] || prev.dotes?.[k]; if (v) ct.dotes[k] = v; } });
  pj.contenido = ct;
}
