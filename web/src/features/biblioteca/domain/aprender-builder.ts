/* eslint-disable */
// @ts-nocheck -- lógica portada de index.html
import { norm, slug, stripTags } from '@/shared/utils/texto';
import { SKILLS, abKey } from '@/features/reglas/data/caracteristicas';
import { CLASES } from '@/features/reglas/data/clases';
import { ESPECIES } from '@/features/reglas/data/especies';
import { TRASFONDOS } from '@/features/reglas/data/trasfondos';
import { ESTILOS } from '@/features/reglas/data/estilos';
import { SUBCLASES } from '@/features/reglas/data/subclases';
import { CATALOGO } from '@/features/reglas/data/conjuros';
import { doteKey } from '@/features/reglas/data/dotes';
import { clasificar, rasgoDe, minNivel } from '@/features/reglas/domain/clasificar';
import { getLib } from './biblioteca';

export const CLASS_KEY = s => { const n = norm(s); return Object.keys(CLASES).find(k => k === n || (CLASES[k].al || []).includes(n) || norm(CLASES[k].n) === n) || ''; };

export function libKey(o){ return 'lib:' + slug(o?.id || o?.nombre || o?.name); }
export function weaponsDe(comp){
  const t = norm([...(comp.weapons || []), ...(comp.armas || [])].join(' '));
  if (!t) return {simple:1, martial:1};
  return {simple: /simple|sencill/.test(t) ? 1 : 0, martial: /martial|marcial/.test(t) ? 1 : 0, light: /ligera|light/.test(t) && !/sutil|finesse/.test(t) ? 1 : 0, finesseLight: /sutil|finesse/.test(t) ? 1 : 0};
}
export function libClaseDeBuilder(cls){
  const comp = cls.competencias || {}, tabla = cls.tabla_progreso || [];
  const tiene = re => tabla.filter(r => (r.rasgos || []).some(n => re.test(norm(n)))).map(r => +r.nivel);
  const slotsTabla = tabla.map(r => r.espacios_conjuro || []);
  const hayEsp = slotsTabla.some(a => a.some(n => n > 0));
  const habs = (comp.habilidades_elegibles?.lista_es || []).map(h => (SKILLS.find(s => norm(s[0]) === norm(h)) || [h])[0]);
  const asi = tiene(/mejora de caracteristica/);
  return {n: cls.nombre || cls.name, lib:true, src:'D&D Builder', dado: parseInt(String(cls.dado_puntos_golpe || '').split('d')[1]) || 8,
    sv: (comp.salvaciones || []).map(abKey).filter(Boolean), habN: +comp.habilidades_elegibles?.cantidad || 2, habs: habs.length ? habs : 'todas',
    arm: (comp.armaduras || []).join(', ') || 'Ninguna', armas: (comp.armas || []).join(', ') || '—', w: weaponsDe(comp),
    lanz: abKey(cls.caracteristica_lanzamiento || '') || null, caster: hayEsp ? 'tabla' : null, slotsTabla: hayEsp ? slotsTabla : null,
    recursosTabla: tabla.map(r => { const o = {}; Object.entries(r.recursos_especificos || {}).forEach(([k, v]) => { if (typeof v === 'number') o[k] = v; }); return o; }),
    asi: asi.length ? asi : null, estilo: tiene(/estilo de combate/)[0] || 0, estilos: Object.keys(ESTILOS), maestrias: tiene(/maestria con armas/).length ? 2 : 0,
    hasta:0, rasgos: (cls.rasgos_clase_detalles || []).map(r => rasgoDe(r, +r.nivel || 1)), subclases:{}};
}
export function libEspecieDeBuilder(race){
  const subs = {}, rasgos = (race.rasgos || []).map(r => ({...rasgoDe(r, minNivel(r.descripcion) || 0)}));
  (race.subespecies || []).forEach(s => { const k = slug(s.id || s.nombre || s.name); subs[k] = {n: s.nombre || s.name}; (s.rasgos || []).forEach(r => rasgos.push({...rasgoDe(r, minNivel(r.descripcion) || 0), sub:k})); });
  rasgos.forEach(r => { if (r.n <= 1) delete r.n; });
  return {n: race.nombre || race.name, lib:true, src:'D&D Builder', r:'De tu biblioteca', vel: +race.velocidad || 30, vision: race.vision_oscura ? 60 : 0, subL:'Subespecie', subs: Object.keys(subs).length ? subs : null, rasgos};
}
export function especieBuiltin(race){
  const rk = norm(race?.id || race?.nombre);
  return Object.keys(ESPECIES).find(k => k !== 'custom' && (k === rk || (ESPECIES[k].al || []).includes(rk) || norm(ESPECIES[k].n) === norm(race?.nombre))) || '';
}
export function trasfondoBuiltin(bg){
  const bk = norm(bg?.id || bg?.nombre);
  const tk = Object.keys(TRASFONDOS).find(k => !TRASFONDOS[k].custom && (k === bk || (TRASFONDOS[k].al || []).includes(bk) || norm(TRASFONDOS[k].n) === bk));
  const habs = bg?.competencia_habilidades || [];
  return tk && habs.length === 2 && habs.every(h => TRASFONDOS[tk].habs.map(norm).includes(norm(h))) ? tk : '';
}
/* Guarda en la biblioteca lo que trae el JSON y devuelve la lista de lo nuevo */
export function aprenderBuilder(d){
  const LIB = getLib();
  const nuevo = [];
  const cls = (d.classes && d.classes[0]) || d.class;
  if (cls && (cls.id || cls.nombre)) {
    const bk = CLASS_KEY(cls.id) || CLASS_KEY(cls.nombre), key = bk || libKey(cls);
    if (!bk && !LIB.clases[key]?.dado) nuevo.push(`clase ${cls.nombre || cls.name}`);
    if (!bk) LIB.clases[key] = {...libClaseDeBuilder(cls), subclases: LIB.clases[key]?.subclases || {}};
    LIB.clases[key] = LIB.clases[key] || {subclases:{}};
    if (bk) {
      const altos = (cls.rasgos_clase_detalles || []).filter(r => (+r.nivel || 1) > CLASES[bk].hasta).map(r => rasgoDe(r, +r.nivel || 1));
      if (altos.length) LIB.clases[key].rasgosAltos = altos;
    }
    (cls.subclases || []).forEach(s => {
      const sn = norm(s.nombre || s.name);
      const bsub = bk ? SUBCLASES.find(b => b.clase === bk && b.match.test(sn)) : null;
      if (bsub) {
        const alt = (s.rasgos || []).filter(r => (+r.nivel || 3) > bsub.hasta).map(r => rasgoDe(r, +r.nivel || 3));
        if (alt.length) { LIB.clases[key].subAltos = LIB.clases[key].subAltos || {}; LIB.clases[key].subAltos[bsub.key] = alt; }
        return;
      }
      const sk = slug(s.id || s.nombre || s.name);
      if (!LIB.clases[key].subclases[sk]) nuevo.push(`subclase ${s.nombre || s.name}`);
      LIB.clases[key].subclases[sk] = {n: s.nombre || s.name, rasgos: (s.rasgos || []).map(r => rasgoDe(r, +r.nivel || 3))};
    });
  }
  if (d.race && !especieBuiltin(d.race)) { const k = libKey(d.race); if (!LIB.especies[k]) nuevo.push(`especie ${d.race.nombre || d.race.name}`); LIB.especies[k] = libEspecieDeBuilder(d.race); }
  const bg = d.background;
  if (bg && (bg.nombre || bg.name) && !trasfondoBuiltin(bg)) {
    const k = libKey(bg); if (!LIB.trasfondos[k]) nuevo.push(`trasfondo ${bg.nombre || bg.name}`);
    const abs = (bg.bonos_caracteristica || []).map(abKey).filter(Boolean);
    LIB.trasfondos[k] = {n: bg.nombre || bg.name, lib:true, ab: [abs[0] || 'fue', abs[1] || 'des', abs[2] || 'con'], habs: (bg.competencia_habilidades || []).slice(0, 2), herr: bg.tool_proficiency_final || bg.competencia_herramienta || '', dote: doteKey(bg.dote_origen_id) || (bg.dote_origen_id ? 'lib:' + slug(bg.dote_origen_id) : '')};
  }
  LIB.conjuros = LIB.conjuros || {};
  (d.spells || []).forEach(s => {
    const n = s.nombre || s.name; if (!n || CATALOGO.some(x => norm(x.nombre) === norm(n))) return;
    const k = slug(n); if (!LIB.conjuros[k]) nuevo.push(`conjuro ${n}`);
    LIB.conjuros[k] = {...spellDeBuilder(s), clases: (s.clases || []).map(x => CLASS_KEY(x) || 'lib:' + slug(x))};
  });
  (d.feats || []).forEach(f => {
    if (/estilo|combate|fighting/.test(norm(f.categoria || f.category))) return;
    if (doteKey(f.nombre || f.name)) return;
    const k = libKey(f); if (!LIB.dotes[k]) nuevo.push(`dote ${f.nombre || f.name}`);
    LIB.dotes[k] = {n: f.nombre || f.name, t: clasificar(f.descripcion || f.description), texto: stripTags(f.descripcion || f.description), cat: f.categoria || '', nivelMin: +f.requisito_nivel || 1};
  });
  return nuevo;
}

export function tipoPaquete(d){
  const x = Array.isArray(d) ? d.find(o => o && typeof o === 'object') : d;
  if (!x || typeof x !== 'object') return '';
  if (x.dado_puntos_golpe || x.tabla_progreso) return 'clases';
  if (x.tiempo_de_lanzamiento || x.escuela) return 'conjuros';
  if (x.cr != null || x.hp != null || x.ac != null || x.hp_formula) return '';
  if (x.subespecies || 'tiene_subespecies' in x || x.idiomas) return 'especies';
  if (x.bonos_caracteristica || x.competencia_habilidades) return 'trasfondos';
  if (x.categoria && x.descripcion) return 'dotes';
  return '';
}
export function aprenderPaquete(d, archivo){
  const tipo = tipoPaquete(d); if (!tipo) return null;
  const arr = (Array.isArray(d) ? d : [d]).filter(o => o && typeof o === 'object'), nuevo = [];
  const hint = +((String(archivo || '').match(/level_(\d)/) || [])[1] ?? NaN);
  if (tipo === 'clases') arr.forEach(cls => nuevo.push(...aprenderBuilder({classes:[cls]})));
  if (tipo === 'especies') arr.forEach(r => nuevo.push(...aprenderBuilder({race:r})));
  if (tipo === 'trasfondos') arr.forEach(b => nuevo.push(...aprenderBuilder({background:b})));
  if (tipo === 'dotes') nuevo.push(...aprenderBuilder({feats:arr}));
  if (tipo === 'conjuros') nuevo.push(...aprenderBuilder({spells: arr.map(s => (s.nivel == null && s.level == null && !isNaN(hint)) ? {...s, nivel:hint} : s)}));
  return nuevo;
}

export function spellDeBuilder(s){
  return {nombre: s.nombre || s.name, nivel: +(s.nivel ?? s.level ?? 0), tiempo: spellTipo(s), alcance: s.alcance || '', dur: s.duracion || '',
    conc: !!s.concentracion, ritual: !!s.ritual, salv: s.tirada_de_salvacion || '', ataque: !!s.requiere_ataque,
    dados: (String(s.descripcion || '').match(/\b\d+d\d+\b/) || [''])[0], desc: stripTags(s.descripcion || s.description)};
}
export function spellTipo(s){
  const t = norm(s.tiempo_de_lanzamiento || s.casting_time || s.tiempo);
  if (/adicional|bonus/.test(t)) return 'adicional';
  if (/reaccion|reaction/.test(t)) return 'reaccion';
  if (/accion|action/.test(t)) return 'accion';
  return 'fuera';
}
