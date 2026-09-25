/* eslint-disable */
// @ts-nocheck -- lógica portada de index.html
import { norm, slug, cap, modOf, modStr, fmtMod } from '@/shared/utils/texto';
import { AB, SKILLS, COMPRA, TIPOS } from '@/features/reglas/data/caracteristicas';
import { ARMAS, ARMADURAS, MAESTRIAS } from '@/features/reglas/data/equipo';
import { ESTILOS } from '@/features/reglas/data/estilos';
import { SUBCLASES } from '@/features/reglas/data/subclases';
import { asiLevels, periciaN, pacto } from '@/features/reglas/data/clases';
import { trucosN, prepN } from '@/features/reglas/data/conjuros';
import { FULL_SLOTS } from '@/features/reglas/data/comunes';
import { REGLAS } from '@/features/reglas/data/reglas-revisadas';
import { doteKey } from '@/features/reglas/data/dotes';
import { kitTrasfondo } from '@/features/reglas/data/equipo-trasfondos';
import { kitClase } from '@/features/reglas/data/equipo-clases';
import { clasificar } from '@/features/reglas/domain/clasificar';
import { getLib, getE, getC, getT, getD, getSubs, subNivel, getAltos, getSubAltos, todosConjuros } from '@/features/biblioteca/domain/biblioteca';
import { competenciasBase, leerCompetencias, competenteArma } from '@/features/reglas/domain/competencias';
import { mejoraDeDote } from '@/features/reglas/domain/mejora-dote';
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
  // El +1 de las dotes (2024): las épicas pueden pasar de 20 hasta 30. subeDote: característica elegida por nombre de dote
  const epico = {fue:0,des:0,con:0,int:0,sab:0,car:0}, subeDote = {};
  asiLv.forEach(L => { const mj = (pj.mejoras || {})[L]; if (!mj) return;
    if (mj.modo === 'una' && mj.a) bono[mj.a] += 2;
    if (mj.modo === 'dos') { if (mj.a) bono[mj.a] += 1; if (mj.b) bono[mj.b] += 1; }
    const D = mj.modo === 'dote' && mj.key && mj.key !== 'otra' ? getD(pj, mj.key) : null, md = mejoraDeDote(D);
    const k = md && (md.opciones.length === 1 ? md.opciones[0] : md.opciones.includes(mj.sube) ? mj.sube : '');
    if (k) { (md.max > 20 ? epico : bono)[k] += 1; subeDote[norm(D.n)] = k; } });
  for (const k in sc) sc[k] = Math.min(30, Math.min(20, sc[k] + bono[k]) + epico[k]);
  for (const k in bono) bono[k] += epico[k];
  for (const [k, v] of Object.entries(pj.fix || {})) if (v !== '' && v != null && !isNaN(v)) sc[k] = +v;
  const m = {}; for (const k in sc) m[k] = modOf(sc[k]);

  const c = {pj, E, C, T, lvl, tl, pb, base, bono, sc, m, esub: pj.especie?.sub || '', futuros:[], asiLv, subeDote};
  c.subDmg = E?.subs?.[c.esub]?.dmg || 'tu tipo de daño';
  c.subNivel = subNivel(pj, pj.clase);
  c.SD = lvl >= c.subNivel ? getSubs(pj, pj.clase).find(s => s.key === pj.subclase && s.key !== 'cadena') || null : null;
  // Pacto de la Cadena: en 2024 es una invocación (o la casilla de antes, para personajes viejos)
  c.chain = pj.clase === 'brujo' && (pj.pactoCadena || [].concat(pj.elecciones?.invocaciones || []).includes('pacto-cadena')) ? SUBCLASES.find(s => s.key === 'cadena') : null;

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
  // El Campeón gana un segundo estilo en el nivel 7 (se elige en el paso Clase)
  c.estilos = [c.estilo, norm(c.SD?.n || '') === 'campeon' && lvl >= 7 ? pj.elecciones?.['estilo-campeon'] : ''].filter(Boolean);
  const estilo = k => c.estilos.includes(k); c.tieneEstilo = estilo;

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
  c.ac = Math.max(...opc) + (c.shield ? 2 : 0) + (estilo('defensa') && c.armor ? 1 : 0);

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
  // Habilidades fijas que da la especie (rasgos con `habs`, p. ej. Percepción y Sigilo del tabaxi)
  (E?.rasgos || []).filter(r => r.habs && (!r.sub || r.sub === c.esub) && (!r.n || r.n <= tl)).forEach(r => r.habs.forEach(h => {
    const s = SKILLS.find(([n]) => norm(n) === norm(h)); if (!s) return;
    const k = norm(s[0]); if (c.skillProf[k]) return;
    c.skillProf[k] = true; c.skillPer[k] = peri.has(k);
    c.skill[k] = m[s[1]] + pb * (c.skillPer[k] ? 2 : 1);
  }));
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
  // Competencias de la clase y el trasfondo; los rasgos suman más después de aplicar las reglas
  competenciasBase(c, T ? (T.custom ? tb.herr : T.herr) : '');
  c.hasMastery = !!C?.maestrias;
  c.grappleDC = 8 + pb + (c.isMonk ? Math.max(m.fue, m.des) : m.fue);
  const uMod = c.isMonk ? Math.max(m.fue, m.des) : m.fue;
  let uDice = '';
  if (c.isMonk) uDice = `1d${c.md}`;
  else if (estilo('sinarmas')) uDice = '1d6';
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
  conjurosDeRasgos(c);
  c.passive = 10 + c.skill['percepcion']; // una regla pudo dar competencia en Percepción
  // Competencias que dan los rasgos (especie, subclase, dotes); si cambian las de armas, las filas de ataque se recalculan
  if (leerCompetencias(c) || c.rehacerArmas) c.armas = (pj.armas || []).map(([k, q], i) => ARMAS[k] ? weaponRow({k, q, i}, c) : null).filter(Boolean);
  c.sinCompArmadura = !!c.armor && !c.compArm[c.armor.cat];
  c.sinCompEscudo = c.shield && !c.compArm.escudo;
  c.recursos = buildRecursos(c);
  c.extraAttack = c.extraAttack || c.entries.some(e => /ataque extra/.test(norm(e.nombre)));
  // Los conjuros que dan los rasgos no cuentan en el límite, aunque el jugador también los haya agregado a mano
  c.siempre = new Set([...listasDeConjuros(c).map(x => norm(x.nombre)), ...c.conjurosRasgo.map(s => norm(s.nombre))]);
  c.esExtra = s => !!s.extra || c.siempre.has(norm(s.nombre));
  // Todos los conjuros de la hoja: los elegidos (con la marca del rasgo si alguno también lo da) y los de los rasgos
  const propios = (pj.conjuros || []).map(s => { const r = c.conjurosRasgo.find(x => norm(x.nombre) === norm(s.nombre)); return r ? {...s, rasgo: r.rasgo, nota: r.nota} : s; });
  c.conjuros = [...propios, ...c.conjurosRasgo.filter(r => !propios.some(s => norm(s.nombre) === norm(r.nombre)))];
  c.nivelMax = pj.clase === 'brujo' ? pacto(lvl).nivel : (c.slots.length ? Math.max(...c.slots.map(s => s.nivel)) : 0);
  const conLimite = C?.lanz && !C.lib;
  // Las clases de biblioteca no traen estos límites; una regla revisada puede darlos (c.trucosReglas, c.prepReglas)
  c.trucosMax = conLimite ? trucosN(pj.clase, lvl) : (c.trucosReglas ?? null);
  c.prepMax = conLimite ? prepN(pj.clase, lvl) : (c.prepReglas ?? null);
  c.trucosUsados = (pj.conjuros || []).filter(s => !+s.nivel && !c.esExtra(s)).length;
  c.prepUsados = (pj.conjuros || []).filter(s => +s.nivel > 0 && !c.esExtra(s)).length;
  aplicarTextos(c);
  // Sin competencia con escudos, el escudo no suma a la CA (reglas 2024)
  if (c.sinCompEscudo) c.ac -= 2;
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
    // Los rasgos con regla revisada no se leen: si cambian el dado, lo dicen con `dado`
    if (!mejor) c.entries.filter(e => (e.grupo === 'clase' || e.grupo === 'sub') && !e.revisada).forEach(e => {
      String(e.texto).split(/(?<=[.;])\s+/).forEach(s => { const ns = norm(s); if (/desarmad|sin armas/.test(ns)) { const d = s.match(/\d+d\d+/); if (d && (!mejor || avgDado(d[0]) > avgDado(mejor))) mejor = d[0]; } });
    });
    if (mejor) { dadoClase = mejor; const uMod = m.fue; c.unarmed = {atk: c.pb + uMod, expr: `${mejor}${modStr(uMod)}`, dmg: `${mejor}${fmtMod(uMod)} contundente`}; }
  }
  // Armas naturales (garras, cuernos, mordisco): en las reglas actuales son golpes sin armas con otro daño
  c.naturales = [...(c.ataquesReglas || [])];
  c.entries.filter(e => e.grupo === 'especie' || e.grupo === 'extra').forEach(e => {
    const frases = String(e.texto).split(/(?<=[.;])\s+/);
    const f = frases.find(s => ARMA_NATURAL.test(norm(s)) && /\d+d\d+/.test(s)); if (!f) return;
    const nf = norm(f);
    let dado = f.match(/\d+d\d+/)[0], nota = '';
    if (dadoClase && avgDado(dadoClase) > avgDado(dado)) { nota = ` Usa tu dado de ${c.isMonk ? 'Artes Marciales' : 'clase'} (${dadoClase}) en vez de ${dado}.`; dado = dadoClase; }
    const ab = c.isMonk ? (m.des > m.fue ? 'des' : 'fue') : /constitucion/.test(nf) ? 'con' : (/destreza|\bdes\b/.test(nf) && !/fuerza|\bfue\b/.test(nf) ? 'des' : 'fue');
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
      salida.push({t, tAuto:t, nombre: it.n, texto: it.d, raw:true, coste: corto ? `1 de ${corto}` : '', src: e.nombre, grupo: e.grupo, nivel: e.nivel, recurso: e.recurso, opcion:true});
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
  // Armas que pueden atacar con CAR (arma de pacto del Pacto del Filo, Guerrero Maleficio); `c.usaCar(w)` lo pone una regla
  const conCar = !!c.usaCar?.(w);
  if (conCar && m.car > m[ab]) ab = 'car';
  const prof = competenteArma(c, a.k) || (c.pactoFilo && !w.dist);
  const atk = m[ab] + (prof ? c.pb : 0) + (c.tieneEstilo('arqueria') && w.dist ? 2 : 0);
  let dado = w.d;
  if (monkW) { const [nn, dd] = w.d.split('d').map(Number); if (nn === 1 && c.md > dd) dado = `1d${c.md}`; }
  const dmgMod = m[ab] + (c.tieneEstilo('duelo') && !w.dist && !w.p.includes('dos manos') ? 2 : 0);
  const min3 = c.tieneEstilo('dosmanos') && !w.dist && (w.p.includes('dos manos') || w.p.includes('versátil'));
  const notas = [];
  if (w.r) notas.push(`${w.p.includes('arrojadiza') ? 'Arrojadiza' : 'Alcance'} ${w.r} pies`);
  if (w.p.includes('alcance')) notas.push('Alcance de 10 pies');
  if (!prof) notas.push('Sin competencia');
  if (conCar) notas.push(c.pactoFilo && !w.dist ? 'Como arma de pacto usa CAR si es mayor' : 'Si es tu arma de Guerrero Maleficio, usa CAR si es mayor');
  let maestria = null;
  // Maestrías de la clase, más las que dan dotes como Maestro de Armas (c.maestriasExtra)
  if (w.ma && ((c.hasMastery && (pj.maestrias || []).includes(a.k)) || c.maestriasExtra?.has(a.k))) {
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
    e.nivel = +r.n || 1;
    if (typeof r.texto === 'string' && !r.manual && (r.auto || ['clase','sub','especie'].includes(grupo))) e.t = clasificar(r.texto);
    e.tAuto = e.t;
    if (r.habsElegir) e.habsElegir = r.habsElegir; // habilidades a elegir que da el rasgo (cuentan en el paso Habilidades)
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
  c.estilos.filter(k => ESTILOS[k]).forEach(k => { const [n, t, txt] = ESTILOS[k]; E.push({t, nombre:`Estilo: ${n}`, texto:txt, src:'Estilo de combate', grupo:'clase'}); });
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
    texto:`Si atacaste con un arma Ligera, atacas con otra distinta.${c.tieneEstilo('dosarmas') ? ' Sumas tu modificador al daño.' : ' No sumas tu modificador al daño salvo que sea negativo.'}`});
  return E;
}

export function buildRecursos(c){
  const R = [{id:'pg', nombre:'Puntos de golpe', max:c.hpMax, reset:'largo', tipo:'pool'}];
  if (typeof c.C?.recursos === 'function') c.C.recursos(c).filter(Boolean).forEach(r => R.push(r));
  else if (c.C?.recursosTabla) Object.entries(c.C.recursosTabla[c.lvl - 1] || {}).forEach(([k, v]) => {
    // Las columnas de conocidos (maldiciones, infusiones, trucos) y de objetos creados son conteos, no usos que se gastan
    if (!(v > 0) || /conocid|known|cantrip|truco|infundid/.test(norm(k))) return;
    const rasgo = c.C.rasgos.find(r => norm(r.nombre).includes(norm(k).replace(/_/g, ' ')));
    const t = norm(rasgo?.texto || '');
    R.push({id:'t-' + k, nombre: rasgo ? rasgo.nombre : cap(k.replace(/_/g, ' ')), max:v, reset: /descanso corto/.test(t) ? 'corto' : 'largo', tipo: v > 6 ? 'pool' : 'pips'});
  });
  [c.SD, c.chain].forEach(S => { if (typeof S?.recursos === 'function') S.recursos(c).filter(Boolean).forEach(r => R.push(r)); });
  c.slots.forEach(s => R.push({id:'slot' + s.nivel, nombre: s.nombre || `Espacios de nivel ${s.nivel}`, max:s.n, reset: s.reset || 'largo'}));
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
    if (!mj || (mj.modo === 'una' && !mj.a) || (mj.modo === 'dos' && (!mj.a || !mj.b)) || (mj.modo === 'dote' && !mj.nombre && !mj.key)) falta(`Mejora de nivel ${L}`, 'Elige +2 a una característica, +1 a dos, o una dote.', 'stats');
    else if (mj.modo === 'dote' && mj.key && mj.key !== 'otra') { const D = getD(pj, mj.key), md = mejoraDeDote(D);
      if (md && md.opciones.length > 1 && !md.opciones.includes(mj.sube)) falta(`Mejora de nivel ${L}`, `Elige qué característica sube 1 con ${D.n}.`, 'stats'); } });
  if (C) {
    if ((pj.habClase || []).length < C.habN) falta('Habilidades de clase', `Te faltan ${C.habN - pj.habClase.length} por elegir.`, 'habs');
    const pn = periciaN(pj.clase, c.lvl); if ((pj.pericia || []).length < pn) falta('Pericia', `Elige ${pn - (pj.pericia || []).length} habilidad(es) con pericia.`, 'habs');
    if (c.lvl >= c.subNivel && !pj.subclase && getSubs(pj, pj.clase).some(s => s.key !== 'cadena')) falta('Falta la subclase', `A nivel ${c.subNivel} eliges subclase.`, 'clase');
    if (C.estilo && c.lvl >= C.estilo && !pj.estilo) falta('Estilo de combate', 'Elige tu estilo de combate.', 'clase');
    (c.elecciones || []).filter(e => e.multi ? e.valor.length < e.max : !e.valor).forEach(e =>
      falta(`Falta elegir: ${e.titulo.toLowerCase()}`, e.multi ? `${e.src} te deja elegir ${e.max}; llevas ${e.valor.length}.` : `${e.src} te pide elegir ${e.titulo.toLowerCase()}.`, e.grupo === 'especie' ? 'especie' : 'clase'));
    if (C.maestrias && (pj.maestrias || []).length < C.maestrias) falta('Maestría con armas', `Elige ${C.maestrias} tipos de armas.`, 'equipo');
    if (C.hasta && c.lvl > C.hasta && !getAltos(pj, pj.clase)) A.push({nivel:'info', t:'Rasgos de nivel alto', txt:`Los rasgos de ${C.n.toLowerCase()} están cargados hasta nivel ${C.hasta}. Agrega los de niveles superiores en Rasgos propios.`, paso:'rasgos'});
    if (c.lvl >= c.subNivel && pj.subclase === 'otra') A.push({nivel:'info', t:'Subclase propia', txt:'Sus rasgos van en Rasgos propios, con su tipo de acción.', paso:'rasgos'});
    else if (c.SD && c.SD.hasta && c.lvl > c.SD.hasta && !getSubAltos(pj, pj.clase, c.SD.key)) A.push({nivel:'info', t:'Rasgos de subclase', txt:`${c.SD.n} está cargada hasta nivel ${c.SD.hasta}.`, paso:'rasgos'});
  }
  const extraN = (pj.especie.key === 'humano' ? 1 : 0) + (pj.especie.key === 'elfo' ? 1 : 0) + (c.E?.habsElegir || 0) + c.entries.reduce((s, e) => s + (e.habsElegir || 0), 0) + 3 * c.dotes.filter(d => d.key === 'habil').length + (pj.clase === 'barbaro' && c.lvl >= 3 ? 1 : 0);
  if ((pj.habExtra || []).length > extraN) A.push({nivel:'info', t:'Habilidades de más', txt:`Tiene ${pj.habExtra.length} habilidades extra y le tocan ${extraN}. Si las dio tu DM, ignora esto.`, paso:'habs'});
  if (c.trucosMax != null) {
    if (c.trucosUsados > c.trucosMax) A.push({nivel:'aviso', t:'Demasiados trucos', txt:`Tiene ${c.trucosUsados} y a nivel ${c.lvl} le tocan ${c.trucosMax}.`, paso:'conjuros'});
    else if (c.trucosUsados < c.trucosMax) A.push({nivel:'info', t:'Trucos por elegir', txt:`Puede aprender ${c.trucosMax - c.trucosUsados} más.`, paso:'conjuros'});
  }
  if (c.prepMax != null) {
    if (c.prepUsados > c.prepMax) A.push({nivel:'aviso', t:'Demasiados conjuros', txt:`Tiene ${c.prepUsados} preparados y a nivel ${c.lvl} le tocan ${c.prepMax}.`, paso:'conjuros'});
    else if (c.prepUsados < c.prepMax) A.push({nivel:'info', t:'Conjuros por preparar', txt:`Puede preparar ${c.prepMax - c.prepUsados} más.`, paso:'conjuros'});
  }
  if (c.T && !pj.trasfondo?.equipo && kitTrasfondo(pj.trasfondo?.key, c.T)) A.push({nivel:'info', t:'Equipo del trasfondo', txt:'Elige entre el kit de tu trasfondo o su oro.', paso:'trasfondo'});
  if (C && !pj.inicial && kitClase(pj.clase)) A.push({nivel:'info', t:'Equipo de la clase', txt:'Elige uno de los kits de tu clase o su oro.', paso:'equipo'});
  if (!c.armas.length) A.push({nivel:'aviso', t:'Sin armas', txt:`Solo aparece el golpe sin armas.${C && !pj.inicial && kitClase(pj.clase) ? ' El kit de tu clase trae armas.' : ''}`, paso:'equipo'});
  if (c.sinCompArmadura) A.push({nivel:'aviso', t:'Armadura sin competencia', txt:`No eres competente con ${c.armor.n.toLowerCase()}: desventaja en pruebas, salvaciones y ataques de FUE o DES, y no puedes lanzar conjuros.`, paso:'equipo'});
  if (c.sinCompEscudo) A.push({nivel:'aviso', t:'Escudo sin competencia', txt:'No eres competente con escudos: el escudo no suma a tu CA.', paso:'equipo'});
  if (c.armor?.fue && c.sc.fue < c.armor.fue) A.push({nivel:'aviso', t:'Armadura muy pesada', txt:`${c.armor.n} pide FUE ${c.armor.fue}: velocidad −10 pies.`, paso:'equipo'});
  if (c.futuros.length) A.push({nivel:'info', t:'Llegan más adelante', txt: c.futuros.map(f => `${f.nombre} (nivel ${f.nivel})`).join(', ') + '.'});
  return A;
}


/* Campos de una regla revisada (t, coste y usos pueden ser funciones de c):
   nombre (el oficial, si la biblioteca usa otro), t, texto, coste, recurso (id del recurso de la clase que gasta), usos ('pb', número, o función; 0 = sin límite), reset, dado (dado sin armas de la clase),
   efecto(c) (cambia números ya calculados: velocidad, salvaciones, espacios...), ataques(c) (filas extra en Ataques),
   opciones (entradas propias que salen del rasgo, con los mismos campos, `si(c)` para mostrarlas solo cuando aplican
   y `elegida: [id, key]` para ordenarlas de la última elegida a la primera),
   conjuros(c) (conjuros que da el rasgo: [{nombre, nivel?, desde?, usos?, reset?, nota?, ab?}]; salen en la hoja sin contar en el límite),
   eleccion {id, titulo, opciones: [{key, nombre, nivel?}], max?} (algo que el jugador elige dentro del rasgo, como el patrón
   de un pacto; con `max`, número o función de c, se eligen varias. Se guarda en pj.elecciones[id] y el paso Clase muestra el selector) */
const valor = (x, c) => typeof x === 'function' ? x(c) : x;
const usosMax = (u, c) => { const v = valor(u, c); return v === 'pb' ? c.pb : +v || 0; };
export function aplicarReglas(c){
  const out = [];
  c.ataquesReglas = [];
  c.conjurosReglas = [];
  // Conjuros que da la regla o una de sus opciones (los arma conjurosDeRasgos)
  const conjuros = (x, src) => [].concat(valor(x, c) || []).forEach(s => c.conjurosReglas.push({src, ...s}));
  c.elecciones = [];
  const conUsos = (x, R, id) => {
    c.extraRes = c.extraRes.filter(r => r.nombre !== x.nombre);
    const max = usosMax(R.usos, c); if (!max) return;
    // `pool: true` la muestra como reserva de puntos (se gastan de a varios), no como casillas
    const reset = valor(R.reset, c) || 'largo';
    c.extraRes.push({id, nombre:x.nombre, max, reset, solo:true, ...(R.pool ? {tipo:'pool'} : {})});
    x.recurso = id; x.coste = x.coste || usoTxt(max, reset);
  };
  c.entries.forEach(e => {
    const n = norm(e.nombre), de = norm(e.src || '');
    const R = REGLAS.find(r => r.n.test(n) && (!r.de || r.de.test(de)));
    if (!R) { out.push(e); return; }
    // Si la biblioteca le puso otro nombre al rasgo, se muestra con el oficial
    if (R.nombre) { c.extraRes = c.extraRes.filter(r => r.nombre !== e.nombre); e.nombre = R.nombre; }
    if (R.t) e.t = e.tAuto = valor(R.t, c);
    if (R.texto) { e.textoF = R.texto; e.texto = R.texto(c); e.raw = false; }
    if (R.coste) e.coste = valor(R.coste, c);
    if (R.recurso) e.recurso = R.recurso;
    if (R.dado) c.dadoReglas = R.dado(c);
    if (R.usos) { e.coste = R.coste ? e.coste : ''; conUsos(e, R, 'rg-' + slug(e.nombre)); }
    if (R.efecto) R.efecto(c);
    if (R.ataques) c.ataquesReglas.push(...R.ataques(c));
    if (R.conjuros) conjuros(R.conjuros, e.nombre);
    // Una regla puede pedir una elección o varias (lista)
    for (const el of [].concat(R.eleccion || [])) {
      // `si(c)`: la elección solo aparece cuando aplica (p. ej. el Arcano Místico de nivel 7 desde el nivel 13)
      if (el.si && !el.si(c)) continue;
      // Con `max` se eligen varias (fórmulas, maldiciones...); las opciones con `nivel` salen desde ese nivel,
      // y las que `requiere` otra opción de la misma elección, solo cuando esa ya está elegida
      const max = valor(el.max, c), guardado = c.pj.elecciones?.[el.id], ya = [].concat(guardado || []);
      // Qué hace cada opción: su `desc`, o el texto de la opción del rasgo ligada a ella (`elegida: [id, key]`)
      const descDe = o => {
        if (o.desc) return valor(o.desc, c);
        const x = (R.opciones || []).find(op => op.elegida?.[0] === el.id && op.elegida?.[1] === o.key);
        return x ? `${TIPOS[valor(x.t, c)]?.[0] || ''}. ${x.texto(c)}` : '';
      };
      c.elecciones.push({...el, max, multi: !!max, grupo: e.grupo, src: e.nombre, nivel: e.nivel,
        opciones: valor(el.opciones, c).filter(o => (!o.nivel || o.nivel <= c.lvl) && (!o.requiere || ya.includes(o.requiere) || ya.includes(o.key))).map(o => ({...o, desc: descDe(o)})),
        valor: max ? [].concat(guardado || []) : (guardado || '')});
    }
    e.revisada = true; e.noSplit = true;
    out.push(e);
    const xs = [];
    (R.opciones || []).forEach(o => {
      if (o.si && !o.si(c)) return;
      const t = valor(o.t, c);
      const x = {t, tAuto:t, nombre:o.nombre, texto:o.texto(c), textoF:o.texto, coste:valor(o.coste, c) || '', src:e.nombre, grupo:e.grupo, nivel:e.nivel, revisada:true, opcion:true, noSplit:true};
      if (o.usos) conUsos(x, o, 'rg-' + slug(o.nombre));
      if (o.conjuros) conjuros(o.conjuros, o.nombre);
      x.rollF = o.roll;
      // Las opciones ligadas a una elección (`elegida: [id, key]`) salen de la última elegida a la primera
      const [id, key] = o.elegida || [];
      const i = id ? [].concat(c.pj.elecciones?.[id] || []).indexOf(key) : -1;
      xs.push({x, orden: i >= 0 ? -i - 1 : 0});
    });
    xs.sort((a, b) => a.orden - b.orden).forEach(({x}) => out.push(x));
  });
  c.entries = out;
}

/* Rasgos "Conjuros de…" con su lista después de dos puntos (conjuros de subclase siempre preparados) */
export function listasDeConjuros(c){
  return c.entries.filter(e => /^conjuros/.test(norm(e.nombre)) && typeof e.texto === 'string' && e.texto.includes(':'))
    .flatMap(e => e.texto.split(':').slice(1).join(':').split(',').map(n => ({nombre: n.replace(/\.$/, '').trim(), src: e.src || e.nombre})));
}
/* Conjuros que dan los rasgos, con sus datos del catálogo: las listas "Conjuros de…" y los que declaran las reglas
   (`conjuros` en reglas-revisadas.ts: {nombre, nivel?, desde?, usos?, reset?, nota?, ab?}). Los que tienen usos suman su recurso. */
export function conjurosDeRasgos(c){
  const cat = new Map(todosConjuros().map(s => [norm(s.nombre), s]));
  const out = [];
  const conCd = (s, ab) => { if (!ab) return s; const m = c.m[ab]; return {...s, cd: 8 + c.pb + m, atk: c.pb + m, abNota: ab.toUpperCase()}; };
  // Sin clase lanzadora, los conjuros de especie y dotes usan INT, SAB o CAR a elección: se toma la más alta
  const abLibre = c.casterAb ? null : ['int', 'sab', 'car'].reduce((a, b) => c.m[b] > c.m[a] ? b : a);
  for (const x of listasDeConjuros(c)) {
    const s = cat.get(norm(x.nombre));
    if (s && !out.some(o => norm(o.nombre) === norm(s.nombre))) out.push({...s, extra: true, rasgo: x.src, nota: 'Siempre preparado'});
  }
  for (const x of c.conjurosReglas || []) {
    if (x.desde && c.lvl < x.desde) continue;
    if (out.some(o => norm(o.nombre) === norm(x.nombre))) continue;
    const s = cat.get(norm(x.nombre)) || {nombre: x.nombre, nivel: x.nivel || 0, desc: ''};
    const max = x.usos === 'pb' ? c.pb : +x.usos || 0, nv = +s.nivel || 0;
    // Con usos se lanza sin espacio; también con uno propio solo si el personaje tiene espacios de ese nivel
    const conEspacios = nv > 0 && (c.slots.some(e => e.nivel >= nv) || (c.pj.clase === 'brujo' && pacto(c.lvl).nivel >= nv));
    const nota = [x.nota || (!max && nv ? 'Siempre preparado' : ''), max && `Sin gastar espacio${conEspacios ? '; también puedes lanzarlo con tus espacios' : ''}`].filter(Boolean).join('. ');
    const recurso = max ? 'cr-' + slug(x.nombre) : '';
    out.push(conCd({...s, extra: true, rasgo: x.src, nota, coste: max ? usoTxt(max, x.reset) : '', recurso}, x.ab || abLibre));
    // El origen va en la nota del recurso, no en su nombre; `solo` evita que se ligue a otro rasgo por palabras sueltas
    if (max) c.extraRes.push({id: recurso, nombre: s.nombre, nota: `De ${x.src}. Vuelve con descanso ${x.reset === 'corto' ? 'corto' : 'largo'}`, max, reset: x.reset || 'largo', solo: true});
  }
  c.conjurosRasgo = out;
}

export function puedeLanzar(c){
  return !!c.C?.lanz || c.entries.some(e => ['especie','dote','sub','extra'].includes(e.grupo) && /\btruco|\bconjuro|\blanzas\b|\blanzar\b/.test(norm(e.texto)));
}
