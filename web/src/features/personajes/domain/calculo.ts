// @ts-nocheck -- lógica portada de index.html
/* eslint-disable */
import { norm, slug, cap, modOf, modStr, fmtMod } from '@/shared/utils/texto';
import { AB, SKILLS, COMPRA } from '@/features/reglas/data/caracteristicas';
import { ARMAS, ARMADURAS, MAESTRIAS } from '@/features/reglas/data/equipo';
import { ESTILOS } from '@/features/reglas/data/estilos';
import { SUBCLASES } from '@/features/reglas/data/subclases';
import { asiLevels, periciaN, pacto } from '@/features/reglas/data/clases';
import { trucosN, prepN } from '@/features/reglas/data/conjuros';
import { FULL_SLOTS } from '@/features/reglas/data/comunes';
import { REGLAS } from '@/features/reglas/data/reglas-revisadas';
import { doteKey } from '@/features/reglas/data/dotes';
import { clasificar } from '@/features/reglas/domain/clasificar';
import { getLib, getE, getC, getT, getD, getSubs, subNivel, getAltos, getSubAltos } from '@/features/biblioteca/domain/biblioteca';
import { baseScores } from './modelo';

export function compute(pj): any {
  const E = getE(pj, pj.especie?.key), C = getC(pj, pj.clase), T = getT(pj, pj.trasfondo?.key);
  const lvl = Math.min(20, Math.max(1, +pj.nivel || 1)), tl = lvl, pb = Math.ceil(tl / 4) + 1;
  const tb = pj.trasfondo || {};
  const base = baseScores(pj), sc = {...base};
  const bgAbs = T ? (T.custom ? (tb.abs || []) : T.ab) : [];
  const bono = {fue:0,des:0,con:0,int:0,sab:0,car:0};
  if (T) {
    if (tb.modo === '111') bgAbs.forEach(k => { if (k) bono[k] += 1; });
    else { if (tb.a) bono[tb.a] += 2; if (tb.b && tb.b !== tb.a) bono[tb.b] += 1; }
  }
  const asiLv = (C?.asi || asiLevels(pj.clase)).filter(n => n <= lvl);
  asiLv.forEach(L => { const mj = (pj.mejoras || {})[L]; if (!mj) return;
    if (mj.modo === 'una' && mj.a) bono[mj.a] += 2;
    if (mj.modo === 'dos') { if (mj.a) bono[mj.a] += 1; if (mj.b) bono[mj.b] += 1; } });
  for (const k in sc) sc[k] = Math.min(20, sc[k] + bono[k]);
  for (const [k, v] of Object.entries(pj.fix || {})) if (v !== '' && v != null && !isNaN(v)) sc[k] = +v;
  const m = {}; for (const k in sc) m[k] = modOf(sc[k]);

  const c = {pj, E, C, T, lvl, tl, pb, base, bono, sc, m, esub: pj.especie?.sub || '', futuros:[], asiLv};
  c.subDmg = E?.subs?.[c.esub]?.dmg || 'tu tipo de daño';
  c.subNivel = subNivel(pj, pj.clase);
  c.SD = lvl >= c.subNivel ? getSubs(pj, pj.clase).find(s => s.key === pj.subclase && s.key !== 'cadena') || null : null;
  c.chain = pj.clase === 'brujo' && pj.pactoCadena ? SUBCLASES.find(s => s.key === 'cadena') : null;

  // Dotes
  c.dotes = [];
  const addD = (k, src) => { const D = k && getD(pj, k); if (D) c.dotes.push({key:k, nombre:D.n, src}); };
  if (T) addD(tb.dote, 'Dote de origen');
  if (pj.especie?.key === 'humano') addD(pj.doteHumano, 'Dote de origen (humano)');
  asiLv.forEach(L => { const mj = (pj.mejoras || {})[L];
    if (mj?.modo === 'dote') { const k = mj.key || doteKey(mj.nombre); if (k && getD(pj, k)) addD(k, `Dote de nivel ${L}`); else c.dotes.push({nombre: mj.nombre || 'Dote', t: mj.t || 'pasiva', texto: mj.texto || '', src:`Dote de nivel ${L}`}); } });
  (pj.dotesExtra || []).forEach(d => d.key ? addD(d.key, 'Dote') : c.dotes.push({...d, src:'Dote'}));
  const has = k => c.dotes.some(d => d.key === k); c.has = has;
  c.estilo = C?.estilo && lvl >= C.estilo ? pj.estilo : '';

  c.isMonk = pj.clase === 'monje';
  c.md = c.isMonk ? (lvl >= 17 ? 12 : lvl >= 11 ? 10 : lvl >= 5 ? 8 : 6) : 0;
  c.casterAb = C?.lanz || null;
  if (c.casterAb) { c.mSpell = m[c.casterAb]; c.dcSpell = 8 + pb + c.mSpell; c.atkSpell = pb + c.mSpell; }
  c.dcFocus = 8 + pb + m.sab;
  c.extraAttack = lvl >= 5 && ['monje','paladin','guerrero','barbaro','explorador'].includes(pj.clase);

  // Armadura y CA
  c.armorKey = pj.armadura && pj.armadura !== 'ninguna' ? pj.armadura : null;
  c.armor = ARMADURAS[c.armorKey] || null; c.shield = !!pj.escudo;
  const opc = [c.armor ? c.armor.base + (c.armor.max === 0 ? 0 : c.armor.max ? Math.min(m.des, c.armor.max) : m.des) : 10 + m.des];
  [C?.ca, c.SD?.ca].forEach(f => { if (f) { const v = f(c); if (v != null) opc.push(v); } });
  c.ac = Math.max(...opc) + (c.shield ? 2 : 0) + (c.estilo === 'defensa' && c.armor ? 1 : 0);

  // Velocidad y visión
  const baseVel = !E ? 30 : pj.especie.key === 'custom' ? (+pj.especie.vel || 30) : (E.velSub?.[c.esub] || E.vel);
  c.speed = baseVel + (C?.velocidad ? C.velocidad(c) : 0) - (c.armor?.fue && sc.fue < c.armor.fue ? 10 : 0);
  c.vision = !E ? 0 : pj.especie.key === 'custom' ? (+pj.especie.vision || 0) : (E.visionSub?.[c.esub] || E.vision || 0);
  c.init = m.des + (has('alerta') ? pb : 0);

  // Habilidades
  c.bgHabs = T ? (T.custom ? (tb.habs || []).filter(Boolean) : T.habs) : [];
  const prof = new Set([...c.bgHabs, ...(pj.habClase || []), ...(pj.habExtra || [])].map(norm));
  const peri = new Set((pj.pericia || []).map(norm));
  const jack = pj.clase === 'bardo' && lvl >= 2 ? Math.floor(pb / 2) : 0;
  c.skill = {}; c.skillProf = {}; c.skillPer = {};
  SKILLS.forEach(([n, a]) => { const k = norm(n); c.skillProf[k] = prof.has(k); c.skillPer[k] = prof.has(k) && peri.has(k);
    c.skill[k] = m[a] + (prof.has(k) ? pb * (peri.has(k) ? 2 : 1) : jack); });
  c.passive = 10 + c.skill['percepcion'];
  c.saveProf = C?.sv || []; c.saves = {}; AB.forEach(([k]) => c.saves[k] = m[k] + (c.saveProf.includes(k) ? pb : 0));

  // PG
  const die = C?.dado || 8;
  let hp;
  if (pj.pgModo === 'maximo') hp = lvl * (die + m.con);
  else if (pj.pgModo === 'tiradas') { hp = die + m.con; for (let i = 0; i < lvl - 1; i++) hp += Math.max(1, (pj.pgTiradas?.[i] || (die / 2 + 1)) + m.con); }
  else hp = die + m.con + (lvl - 1) * (die / 2 + 1 + m.con);
  hp += (has('duro') ? 2 * tl : 0) + (E?.hpNivel ? tl : 0) + (c.SD?.hp ? c.SD.hp(c) : 0);
  c.die = die; c.hpMax = Math.max(1, hp);

  // Armas
  c.wProf = C?.w || {simple:1, martial:1};
  c.hasMastery = !!C?.maestrias;
  c.grappleDC = 8 + pb + (c.isMonk ? Math.max(m.fue, m.des) : m.fue);
  const uMod = c.isMonk ? Math.max(m.fue, m.des) : m.fue;
  let uDice = '';
  if (c.isMonk) uDice = `1d${c.md}`;
  else if (c.estilo === 'sinarmas') uDice = '1d6';
  else if (has('taberna')) uDice = '1d4';
  c.unarmed = uDice
    ? {atk: pb + uMod, expr: `${uDice}${modStr(uMod)}`, dmg: `${uDice}${fmtMod(uMod)} contundente`}
    : {atk: pb + uMod, expr: `${Math.max(1, 1 + uMod)}`, dmg: `${Math.max(1, 1 + uMod)} contundente`};
  c.armas = (pj.armas || []).map(([k, q], i) => ARMAS[k] ? weaponRow({k, q, i}, c) : null).filter(Boolean);
  c.lightCount = c.armas.filter(w => w.w.p.includes('ligera') && !w.w.dist).reduce((s, w) => s + w.q, 0);

  // Espacios
  c.slots = [];
  if (C?.caster === 'tabla') (C.slotsTabla?.[lvl - 1] || []).forEach((n, i) => { if (n > 0) c.slots.push({nivel:i + 1, n}); });
  if (C?.caster === 'full' || C?.caster === 'half') {
    const eff = C.caster === 'full' ? lvl : Math.ceil(lvl / 2);
    (FULL_SLOTS[eff - 1] || []).forEach((n, i) => c.slots.push({nivel:i + 1, n}));
  }

  c.entries = buildEntries(c);
  aplicarReglas(c);
  c.recursos = buildRecursos(c);
  c.extraAttack = c.extraAttack || c.entries.some(e => /ataque extra/.test(norm(e.nombre)));
  c.siempre = new Set();
  c.entries.filter(e => /^conjuros/.test(norm(e.nombre)) && e.texto.includes(':')).forEach(e => e.texto.split(':').slice(1).join(':').split(',').forEach(n => c.siempre.add(norm(n.replace(/\.$/, '')))));
  c.esExtra = s => !!s.extra || c.siempre.has(norm(s.nombre));
  c.nivelMax = pj.clase === 'brujo' ? pacto(lvl).nivel : (c.slots.length ? Math.max(...c.slots.map(s => s.nivel)) : 0);
  const conLimite = C?.lanz && !C.lib;
  c.trucosMax = conLimite ? trucosN(pj.clase, lvl) : null;
  c.prepMax = conLimite ? prepN(pj.clase, lvl) : null;
  c.trucosUsados = (pj.conjuros || []).filter(s => !+s.nivel && !c.esExtra(s)).length;
  c.prepUsados = (pj.conjuros || []).filter(s => +s.nivel > 0 && !c.esExtra(s)).length;
  aplicarTextos(c);
  c.entries.forEach(e => { if (e.textoF) e.texto = e.textoF(c); if (e.rollF) e.roll = e.rollF(c); });
  vincularRecursos(c);
  separarOpciones(c);
  c.entries.forEach(e => { e.tAuto = e.tAuto || e.t; const k = norm(e.nombre); e.t = pj.tipos?.[k] || getLib().tipos?.[k] || e.t; });
  c.avisos = buildAvisos(c);
  return c;
}

/* Lee los textos de rasgos para sacar lo que tiene efecto en la hoja */
export const ARMA_NATURAL = /garra|mordi|mordisco|cuerno|cabeza|arma natural|fauces|patada|casco|pico|cola|topetazo|pu[nñ]o/;
export const avgDado = d => { const [n, s] = d.split('d').map(Number); return n * (s + 1) / 2; };
export function aplicarTextos(c){
  const m = c.m;
  // Dado de golpe sin armas que da la clase (pugilistas y similares)
  let dadoClase = c.isMonk ? `1d${c.md}` : null;
  if (!c.isMonk) {
    let mejor = c.dadoReglas || null;
    if (!mejor) c.entries.filter(e => e.grupo === 'clase' || e.grupo === 'sub').forEach(e => {
      String(e.texto).split(/(?<=[.;])\s+/).forEach(s => { const ns = norm(s); if (/desarmad|sin armas/.test(ns)) { const d = s.match(/\d+d\d+/); if (d && (!mejor || avgDado(d[0]) > avgDado(mejor))) mejor = d[0]; } });
    });
    if (mejor) { dadoClase = mejor; const uMod = m.fue; c.unarmed = {atk: c.pb + uMod, expr: `${mejor}${modStr(uMod)}`, dmg: `${mejor}${fmtMod(uMod)} contundente`}; }
  }
  // Armas naturales (garras, cuernos, mordisco): en las reglas actuales son golpes sin armas con otro daño
  c.naturales = [];
  c.entries.filter(e => e.grupo === 'especie' || e.grupo === 'extra').forEach(e => {
    const frases = String(e.texto).split(/(?<=[.;])\s+/);
    const f = frases.find(s => ARMA_NATURAL.test(norm(s)) && /\d+d\d+/.test(s)); if (!f) return;
    const nf = norm(f);
    let dado = f.match(/\d+d\d+/)[0], nota = '';
    if (dadoClase && avgDado(dadoClase) > avgDado(dado)) { nota = ` Usa tu dado de ${c.isMonk ? 'Artes Marciales' : 'clase'} (${dadoClase}) en vez de ${dado}.`; dado = dadoClase; }
    const ab = c.isMonk ? (m.des > m.fue ? 'des' : 'fue') : (/destreza|\bdes\b/.test(nf) && !/fuerza|\bfue\b/.test(nf) ? 'des' : 'fue');
    const tipo = (nf.match(/cortante|perforante|contundente/) || ['contundente'])[0];
    const mod = m[ab];
    c.naturales.push({nombre: `Golpe sin armas: ${e.nombre}`, atk: c.pb + mod, expr: `${dado}${modStr(mod)}`, dmg: `${dado}${fmtMod(mod)} ${tipo}`,
      notas: [`Cuenta como golpe sin armas: lo usas con Atacar y con todo lo que te dé golpes sin armas extra${/accion adicional/.test(nf) ? '. Este rasgo además te deja hacerlo con acción adicional' : ''}${nota ? '. ' + nota.trim().replace(/\.$/, '') : ''}`]});
  });
  // CA natural o sin armadura descrita en rasgos (Mentón de Hierro, Armadura Natural, Caparazón)
  if (!c.armor) {
    const MOD = {destreza:'des', constitucion:'con', sabiduria:'sab', fuerza:'fue', carisma:'car', inteligencia:'int', des:'des', con:'con', sab:'sab', fue:'fue', car:'car'};
    c.entries.forEach(e => {
      const t = norm(e.texto), x = t.match(/\bca\b[^.]*?\b(\d{2})\b(?:\s*\+\s*(?:tu\s+)?(?:modificador de\s+)?(destreza|constitucion|sabiduria|fuerza|carisma|des|con|sab)\b)?/);
      if (!x || +x[1] < 10 || +x[1] > 20) return;
      const sinEscudo = /ni escudo|sin escudo/.test(t);
      if (sinEscudo && c.shield) return;
      const v = +x[1] + (x[2] ? m[MOD[x[2]]] : 0) + (c.shield ? 2 : 0);
      if (v > c.ac) c.ac = v;
    });
  }
}
/* Rasgos que listan opciones ("Puedes gastarlos para usar: A (...), B (...)") se separan en entradas propias */
export const TIPOS_CONOCIDOS: Record<string, any> = {'alistate': 'adicional', 'el viejo uno-dos': 'adicional', 'pegar y moverse': 'adicional'};
export function separarOpciones(c){
  const salida = [];
  c.entries.forEach(e => {
    salida.push(e);
    if (e.noSplit) return;
    const m = typeof e.texto === 'string' && e.texto.match(/(?:para usar|puedes usar|opciones|puedes elegir(?: entre)?)\s*:\s*(.+)$/i);
    if (!m) return;
    const items = [...m[1].matchAll(/([^,()]+?)\s*\(([^)]*)\)/g)].map(x => ({n: x[1].replace(/^\s*(y|o)\s+/i, '').trim(), d: x[2].trim()})).filter(x => x.n && x.n.length < 40);
    if (items.length < 2) return;
    e.t = e.tAuto = 'pasiva';
    const r = e.recurso && c.recursos.find(x => x.id === e.recurso);
    const corto = r ? ((r.nombre.match(/\(([^)]+)\)/) || [])[1] || r.nombre) : '';
    items.forEach(it => {
      const t = TIPOS_CONOCIDOS[norm(it.n).replace(/[¡!¿?]/g, '').trim()] || clasificar(it.d);
      salida.push({t, tAuto:t, nombre: it.n, texto: it.d, raw:true, coste: corto ? `1 de ${corto}` : '', src: e.nombre, grupo: e.grupo, recurso: e.recurso, opcion:true});
    });
  });
  c.entries = salida;
}
/* Une cada recurso con el rasgo que lo gasta, para mostrarlo junto a él */
export function vincularRecursos(c){
  const IGNORAR = new Set(['puntos','espacios','espacio','nivel','sin','usos','descanso','gratis']);
  const kws = c.recursos.filter(r => r.id !== 'pg' && !/^slot/.test(r.id) && !r.solo).map(r => ({r, kw: norm(r.nombre).replace(/[()]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !IGNORAR.has(w))}));
  c.entries.forEach(e => {
    if (e.recurso) return;
    const t = norm(e.nombre + ' ' + (e.coste || ''));
    let best = null, score = 0;
    kws.forEach(({r, kw}) => { const s = kw.filter(w => t.includes(w)).length; if (s > score) { best = r; score = s; } });
    if (best) e.recurso = best.id;
  });
}
export function weaponRow(a, c){
  const w = ARMAS[a.k], m = c.m, pj = c.pj;
  const monkW = c.isMonk && !w.dist && (w.cat === 'sencilla' || w.p.includes('ligera'));
  let ab = w.dist ? 'des' : 'fue';
  if (w.p.includes('sutil') || monkW) ab = m.des > m.fue ? 'des' : 'fue';
  const P = c.wProf;
  const prof = w.cat === 'sencilla' ? !!P.simple : (!!P.martial && (!P.light || w.p.includes('ligera')) && (!P.finesseLight || w.p.includes('ligera') || w.p.includes('sutil')));
  const atk = m[ab] + (prof ? c.pb : 0) + (c.estilo === 'arqueria' && w.dist ? 2 : 0);
  let dado = w.d;
  if (monkW) { const [nn, dd] = w.d.split('d').map(Number); if (nn === 1 && c.md > dd) dado = `1d${c.md}`; }
  const dmgMod = m[ab] + (c.estilo === 'duelo' && !w.dist && !w.p.includes('dos manos') ? 2 : 0);
  const min3 = c.estilo === 'dosmanos' && !w.dist && (w.p.includes('dos manos') || w.p.includes('versátil'));
  const notas = [];
  if (w.r) notas.push(`${w.p.includes('arrojadiza') ? 'Arrojadiza' : 'Alcance'} ${w.r} pies`);
  if (w.p.includes('alcance')) notas.push('Alcance de 10 pies');
  if (!prof) notas.push('Sin competencia');
  let maestria = null;
  if (c.hasMastery && (pj.maestrias || []).includes(a.k) && w.ma) {
    const [mn, md] = MAESTRIAS[w.ma];
    maestria = `${mn}: ${md}${w.ma === 'derribar' ? ` CD ${8 + m[ab] + c.pb}.` : ''}`;
  }
  return {k:a.k, q:a.q, i:a.i, w, nombre: w.n + (a.q > 1 ? ` (${a.q})` : ''), atk, expr:`${dado}${modStr(dmgMod)}`, dmg:`${dado}${fmtMod(dmgMod)} ${w.tipo}`,
    v: w.v ? {expr:`${w.v}${modStr(dmgMod)}`, dmg:`${w.v}${fmtMod(dmgMod)}`} : null, notas, maestria, min3};
}

export function evalR(r, c, src, grupo){
  const fn = typeof r.texto === 'function';
  return {t:r.t || 'pasiva', nombre:r.nombre, coste: typeof r.coste === 'function' ? r.coste(c) : r.coste, texto: fn ? r.texto(c) : (r.texto || ''), raw: !fn, src, grupo, roll: r.roll ? r.roll(c) : null};
}
export function usoTxt(max, reset){ return `${max} uso${max > 1 ? 's' : ''} por descanso ${reset === 'corto' ? 'corto' : 'largo'}`; }

export function buildEntries(c){
  const E = [], pj = c.pj;
  c.extraRes = [];
  const pushR = (r, src, grupo, pre) => {
    const e = evalR(r, c, src, grupo);
    if (typeof r.texto === 'string' && !r.manual && (r.auto || ['clase','sub','especie'].includes(grupo))) e.t = clasificar(r.texto);
    e.tAuto = e.t;
    if (r.usos) { const max = r.usos === 'pb' ? c.pb : +r.usos; if (max) { e.coste = e.coste || usoTxt(max, r.reset); c.extraRes.push({id:pre + '-' + slug(r.nombre), nombre:r.nombre, max, reset:r.reset || 'largo'}); } }
    E.push(e);
  };
  if (c.C) [...c.C.rasgos, ...(getAltos(pj, pj.clase) || [])].filter(r => (+r.n || 1) <= c.lvl).forEach(r => pushR(r, c.C.n, 'clase', 'c'));
  [c.SD, c.chain].filter(Boolean).forEach(S => [...S.rasgos, ...(getSubAltos(pj, pj.clase, S.key) || [])].filter(r => (+r.n || 1) <= c.lvl).forEach(r => pushR(r, S.n, 'sub', 's')));
  const yaEstan = new Set(E.map(e => norm(e.nombre)));
  if (c.E) c.E.rasgos.forEach(r => {
    if (r.sub && r.sub !== c.esub) return;
    if (r.n && r.n > c.tl) { c.futuros.push({nombre:r.nombre, nivel:r.n}); return; }
    pushR(r, c.E.subs?.[c.esub]?.n || c.E.n, 'especie', 'e');
  });
  if (c.estilo && ESTILOS[c.estilo]) { const [n, t, txt] = ESTILOS[c.estilo]; E.push({t, nombre:`Estilo: ${n}`, texto:txt, src:'Estilo de combate', grupo:'clase'}); }
  c.dotes.forEach(d => {
    if (d.key) { const D = getD(pj, d.key); pushR({...D, nombre:D.n, t:D.t || 'pasiva'}, d.src, 'dote', 'd'); }
    else E.push({t:d.t || 'pasiva', nombre:d.nombre, texto:d.texto, raw:true, src:d.src, grupo:'dote'});
  });
  (pj.rasgosExtra || []).forEach((r, i) => {
    if (yaEstan.has(norm(r.nombre))) return;
    if ((+r.n || 1) > c.tl) { c.futuros.push({nombre:r.nombre, nivel:+r.n}); return; }
    pushR(r, 'Rasgo propio', 'extra', 'x' + i);
  });
  if (c.lightCount >= 2) E.push({t:'adicional', nombre:'Ataque con la otra arma ligera', src:'Reglas', grupo:'reglas',
    texto:`Si atacaste con un arma Ligera, atacas con otra distinta.${c.estilo === 'dosarmas' ? ' Sumas tu modificador al daño.' : ' No sumas tu modificador al daño salvo que sea negativo.'}`});
  return E;
}

export function buildRecursos(c){
  const R = [{id:'pg', nombre:'Puntos de golpe', max:c.hpMax, reset:'largo', tipo:'pool'}];
  if (typeof c.C?.recursos === 'function') c.C.recursos(c).filter(Boolean).forEach(r => R.push(r));
  else if (c.C?.recursosTabla) Object.entries(c.C.recursosTabla[c.lvl - 1] || {}).forEach(([k, v]) => {
    if (!(v > 0)) return;
    const rasgo = c.C.rasgos.find(r => norm(r.nombre).includes(norm(k).replace(/_/g, ' ')));
    const t = norm(rasgo?.texto || '');
    R.push({id:'t-' + k, nombre: rasgo ? rasgo.nombre : cap(k.replace(/_/g, ' ')), max:v, reset: /descanso corto/.test(t) ? 'corto' : 'largo', tipo: v > 6 ? 'pool' : 'pips'});
  });
  [c.SD, c.chain].forEach(S => { if (typeof S?.recursos === 'function') S.recursos(c).filter(Boolean).forEach(r => R.push(r)); });
  c.slots.forEach(s => R.push({id:'slot' + s.nivel, nombre:`Espacios de nivel ${s.nivel}`, max:s.n, reset:'largo'}));
  c.extraRes.forEach(r => { if (!R.some(x => x.id === r.id)) R.push(r); });
  return R;
}

export function buildAvisos(c){
  const A = [], pj = c.pj, C = c.C;
  const falta = (t, txt, paso) => A.push({nivel:'aviso', t, txt, paso});
  if (!c.E) falta('Falta la especie', 'Elige una especie.', 'especie');
  else if (c.E.subs && !c.esub) falta(`Falta ${c.E.subL.toLowerCase()}`, `Elige ${c.E.subL.toLowerCase()} de ${c.E.n.toLowerCase()}.`, 'especie');
  if (!C) falta('Falta la clase', 'Elige una clase.', 'clase');
  if (!c.T) falta('Falta el trasfondo', 'Elige un trasfondo.', 'trasfondo');
  else if (pj.trasfondo.modo !== '111' && (!pj.trasfondo.a || !pj.trasfondo.b)) falta('Bonificadores del trasfondo', 'Elige a qué características van el +2 y el +1.', 'trasfondo');
  const g = pj.gen;
  if ((g.metodo === 'tirar' || g.metodo === 'estandar') && Object.keys(g.asig || {}).length < 6) falta('Características sin asignar', 'Asigna un valor a cada característica.', 'stats');
  if (g.metodo === 'compra') { const gasto = AB.reduce((s, [k]) => s + (COMPRA[g.compra[k]] || 0), 0); if (gasto > 27) falta('Compra de puntos', `Gastaste ${gasto} de 27 puntos.`, 'stats'); }
  c.asiLv.forEach(L => { const mj = pj.mejoras?.[L];
    if (!mj || (mj.modo === 'una' && !mj.a) || (mj.modo === 'dos' && (!mj.a || !mj.b)) || (mj.modo === 'dote' && !mj.nombre && !mj.key)) falta(`Mejora de nivel ${L}`, 'Elige +2 a una característica, +1 a dos, o una dote.', 'stats'); });
  if (C) {
    if ((pj.habClase || []).length < C.habN) falta('Habilidades de clase', `Te faltan ${C.habN - pj.habClase.length} por elegir.`, 'habs');
    const pn = periciaN(pj.clase, c.lvl); if ((pj.pericia || []).length < pn) falta('Pericia', `Elige ${pn - (pj.pericia || []).length} habilidad(es) con pericia.`, 'habs');
    if (c.lvl >= c.subNivel && !pj.subclase && getSubs(pj, pj.clase).some(s => s.key !== 'cadena')) falta('Falta la subclase', `A nivel ${c.subNivel} eliges subclase.`, 'clase');
    if (C.estilo && c.lvl >= C.estilo && !pj.estilo) falta('Estilo de combate', 'Elige tu estilo de combate.', 'clase');
    if (C.maestrias && (pj.maestrias || []).length < C.maestrias) falta('Maestría con armas', `Elige ${C.maestrias} tipos de armas.`, 'equipo');
    if (C.hasta && c.lvl > C.hasta && !getAltos(pj, pj.clase)) A.push({nivel:'info', t:'Rasgos de nivel alto', txt:`Los rasgos de ${C.n.toLowerCase()} están cargados hasta nivel ${C.hasta}. Agrega los de niveles superiores en Rasgos propios.`, paso:'rasgos'});
    if (c.lvl >= c.subNivel && pj.subclase === 'otra') A.push({nivel:'info', t:'Subclase propia', txt:'Sus rasgos van en Rasgos propios, con su tipo de acción.', paso:'rasgos'});
    else if (c.SD && c.SD.hasta && c.lvl > c.SD.hasta && !getSubAltos(pj, pj.clase, c.SD.key)) A.push({nivel:'info', t:'Rasgos de subclase', txt:`${c.SD.n} está cargada hasta nivel ${c.SD.hasta}.`, paso:'rasgos'});
  }
  const extraN = (pj.especie.key === 'humano' ? 1 : 0) + (pj.especie.key === 'elfo' ? 1 : 0) + 3 * c.dotes.filter(d => d.key === 'habil').length + (pj.clase === 'barbaro' && c.lvl >= 3 ? 1 : 0);
  if ((pj.habExtra || []).length > extraN) A.push({nivel:'info', t:'Habilidades de más', txt:`Tiene ${pj.habExtra.length} habilidades extra y le tocan ${extraN}. Si las dio tu DM, ignora esto.`, paso:'habs'});
  if (c.trucosMax != null) {
    if (c.trucosUsados > c.trucosMax) A.push({nivel:'aviso', t:'Demasiados trucos', txt:`Tiene ${c.trucosUsados} y a nivel ${c.lvl} le tocan ${c.trucosMax}.`, paso:'conjuros'});
    else if (c.trucosUsados < c.trucosMax) A.push({nivel:'info', t:'Trucos por elegir', txt:`Puede aprender ${c.trucosMax - c.trucosUsados} más.`, paso:'conjuros'});
  }
  if (c.prepMax != null) {
    if (c.prepUsados > c.prepMax) A.push({nivel:'aviso', t:'Demasiados conjuros', txt:`Tiene ${c.prepUsados} preparados y a nivel ${c.lvl} le tocan ${c.prepMax}.`, paso:'conjuros'});
    else if (c.prepUsados < c.prepMax) A.push({nivel:'info', t:'Conjuros por preparar', txt:`Puede preparar ${c.prepMax - c.prepUsados} más.`, paso:'conjuros'});
  }
  if (!c.armas.length) A.push({nivel:'aviso', t:'Sin armas', txt:`Solo aparece el golpe sin armas.${C?.equipo ? ` El equipo inicial trae ${C.equipo.txt}.` : ''}`, paso:'equipo'});
  if (c.armor?.fue && c.sc.fue < c.armor.fue) A.push({nivel:'aviso', t:'Armadura muy pesada', txt:`${c.armor.n} pide FUE ${c.armor.fue}: velocidad −10 pies.`, paso:'equipo'});
  if (c.futuros.length) A.push({nivel:'info', t:'Llegan más adelante', txt: c.futuros.map(f => `${f.nombre} (nivel ${f.nivel})`).join(', ') + '.'});
  return A;
}


export function aplicarReglas(c){
  const out = [];
  c.entries.forEach(e => {
    const n = norm(e.nombre), de = norm(e.src || '');
    const R = REGLAS.find(r => r.n.test(n) && (!r.de || r.de.test(de)));
    if (!R) { out.push(e); return; }
    if (R.t) e.t = e.tAuto = R.t;
    if (R.texto) { e.textoF = R.texto; e.texto = R.texto(c); e.raw = false; }
    if (R.coste) e.coste = R.coste;
    if (R.dado) c.dadoReglas = R.dado(c);
    if (R.usos) { const id = 'rg-' + slug(e.nombre); c.extraRes = c.extraRes.filter(r => r.nombre !== e.nombre); c.extraRes.push({id, nombre:e.nombre, max:R.usos, reset:R.reset || 'largo', solo:true}); e.recurso = id; e.coste = R.coste || usoTxt(R.usos, R.reset); }
    e.revisada = true; e.noSplit = true;
    out.push(e);
    (R.opciones || []).forEach(o => {
      const x = {t:o.t, tAuto:o.t, nombre:o.nombre, texto:o.texto(c), textoF:o.texto, coste:o.coste || '', src:e.nombre, grupo:e.grupo, revisada:true, opcion:true, noSplit:true};
      if (o.usos) { x.recurso = 'rg-' + slug(o.nombre); c.extraRes.push({id:x.recurso, nombre:o.nombre, max:o.usos, reset:o.reset || 'largo', solo:true}); x.coste = x.coste || usoTxt(o.usos, o.reset); }
      x.rollF = o.roll;
      out.push(x);
    });
  });
  c.entries = out;
}

export function puedeLanzar(c){
  return !!c.C?.lanz || c.entries.some(e => ['especie','dote','sub','extra'].includes(e.grupo) && /\btruco|\bconjuro|\blanzas\b|\blanzar\b/.test(norm(e.texto)));
}
