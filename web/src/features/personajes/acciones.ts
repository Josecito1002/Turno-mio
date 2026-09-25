/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render, esAdmin, irArriba } from '@/app-shell/estado';
import { almacen, guardarLib } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { confirmar } from '@/shared/ui/confirmar';
import { norm, setPath } from '@/shared/utils/texto';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { getC, getLib, getSubs, getT, subNivel } from '@/features/biblioteca/domain/biblioteca';
import { kitTrasfondo } from '@/features/reglas/data/equipo-trasfondos';
import { kitClase } from '@/features/reglas/data/equipo-clases';
import type { OpcionesTirada, Resultado } from '@/features/dados/domain/dados';
import { nuevoPj, reparar, resumen, asegurarTiradas } from './domain/modelo';
import { compute, puedeLanzar } from './domain/calculo';
import { pendientesAlSubir } from './domain/pendientes';
import { snapshot } from './domain/importar-personaje';
import { manosDe, aDosManos, puedeIrEnLaOtra } from './domain/manos';
import { armadurasDe, bolsaDe, guardarBolsa, juntar, nuevaClave, pagar, pasoEquipoEnEditor } from './domain/inventario';
import { ARMAS, ARMADURAS } from '@/features/reglas/data/equipo';
import { MAX_SINTONIA, armaMagica, armaduraMagica, defDe, sintonizados } from './domain/magicos';

export type Tirar = (expr: string, label: string, o?: OpcionesTirada) => Promise<Resultado>;

export function savePj() {
  if (!S.pj) return;
  snapshot(S.pj);
  const sub = resumen(S.pj);
  almacen.guardarPj(S.pj, sub);
  const e = S.list.find(p => p.id === S.pj.id), info = { id: S.pj.id, name: S.pj.nombre || 'Sin nombre', sub };
  if (e) Object.assign(e, info); else S.list.push(info);
  almacen.ultimo(S.pj.id);
}

export function abrir(id: string, view: 'ficha' | 'editor' = 'ficha') {
  const p = almacen.pj(id); if (!p) return;
  S.pj = reparar(p); S.view = view; S.tab = 'turno'; S.sel = null;
  almacen.ultimo(id);
  render(); irArriba();
}

export function nuevo() { S.pj = nuevoPj(); savePj(); S.view = 'editor'; S.step = 'especie'; render(); irArriba(); }

export function setVal(path: string, v: any) {
  const pj = S.pj;
  setPath(pj, path, v);
  if (path === 'nivel') {
    pj.nivel = +v;
    // Por debajo del nivel de subclase no se puede tener una: se quita para elegirla al llegar
    if (pj.subclase && pj.nivel < subNivel(pj, pj.clase)) pj.subclase = '';
  }
  if (/^mejoras\.\d+\.modo$/.test(path)) { const L = path.split('.')[1]; pj.mejoras[L] = { modo: v }; }
  if (path === 'trasfondo.a' && pj.trasfondo.b === v) pj.trasfondo.b = '';
  if (/^pgTiradas\.\d+$/.test(path)) {
    asegurarTiradas(pj);
    const i = +path.split('.')[1], die = getC(pj, pj.clase)?.dado || 8;
    pj.pgTiradas[i] = v ? Math.min(die, Math.max(1, Math.round(v))) : null;
  }
  savePj(); render();
}

/* ---- Recursos ---- */
export function tocarPip(id: string, i: number, max: number) {
  const pj = S.pj, used = Math.min(pj.used[id] || 0, max), left = max - used;
  pj.used[id] = i < left ? used + 1 : Math.max(0, used - 1);
  savePj(); render();
}
export function moverPool(id: string, d: number) {
  const pj = S.pj, r = S.c.recursos.find((r: any) => r.id === id);
  const used = Math.min(pj.used[r.id] || 0, r.max);
  pj.used[r.id] = Math.min(r.max, Math.max(0, used - d));
  savePj(); render();
}
export function fijarPool(id: string, max: number, valor: string) {
  const v = Math.min(max, Math.max(0, parseInt(valor) || 0));
  S.pj.used[id] = max - v; savePj(); render();
}
export function descansar(tipo: 'corto' | 'largo') {
  const pj = S.pj, largo = tipo === 'largo';
  S.c.recursos.forEach((r: any) => {
    if (largo || r.reset === 'corto') pj.used[r.id] = 0;
    else if (r.reset === 'corto1') pj.used[r.id] = Math.max(0, (pj.used[r.id] || 0) - 1);
  });
  savePj(); render();
  avisar(largo ? 'Descanso largo: todo recuperado.' : 'Descanso corto aplicado.');
}

/** Cambia en qué tipo de acción aparece un rasgo. El administrador lo cambia para todos. */
export function moverRasgo(k: string, t: string) {
  const pj = S.pj, global = esAdmin(), LIB = getLib();
  const dest = global ? (LIB.tipos = LIB.tipos || {}) : (pj.tipos = pj.tipos || {});
  if (t) dest[k] = t; else { delete dest[k]; if (pj.tipos) delete pj.tipos[k]; }
  if (global) guardarLib(true);
  savePj(); render();
  avisar(t ? `Movido a ${TIPOS[t][0]}${global ? ' para todos los personajes' : ''}.` : 'Restaurado.');
}

/* ---- Niveles ---- */
export function abrirSubida() { if (S.pj.nivel < 20) { S.subida = { id: S.pj.id, fase: 'elegir' }; render(); } }
export function confirmarSubida() {
  const pj = S.pj, antes = compute(pj), L = pj.nivel + 1;
  const copia = structuredClone(pj); // para que Deshacer también quite lo que se elija en el diálogo
  pj.nivel = L; if (pj.pgModo === 'tiradas') pj.pgTiradas[L - 2] = null;
  const desp = compute(pj), vistos = new Set(antes.entries.map((e: any) => e.nombre + '|' + e.texto));
  const elegir = pendientesAlSubir(desp, getSubs(pj, pj.clase).some((s: any) => s.key !== 'cadena'));
  S.subida = {
    id: pj.id, fase: 'hecho', nivel: L, hpAntes: antes.hpMax, pbAntes: antes.pb, elegir, copia,
    nuevos: desp.entries.filter((e: any) => e.grupo !== 'reglas' && !vistos.has(e.nombre + '|' + e.texto)).map((e: any) => ({ nombre: e.nombre, grupo: e.grupo, src: e.src, texto: e.texto, t: e.t })),
  };
  // Se queda donde estabas (la pestaña de la hoja que tenías abierta); el diálogo muestra lo nuevo encima
  savePj(); render();
}
export function pgPromedio() {
  const pj = S.pj, i = pj.nivel - 2;
  if (pj.pgModo === 'maximo') asegurarTiradas(pj);
  if (pj.pgModo === 'tiradas') pj.pgTiradas[i] = null;
  savePj(); render();
}
export function deshacerSubida() {
  const pj = S.pj, copia = S.subida?.copia;
  if (copia) {
    // Vuelve exactamente a como estaba: nivel, subclase, elecciones, mejoras, conjuros...
    Object.keys(pj).forEach(k => delete pj[k]);
    Object.assign(pj, structuredClone(copia));
  } else if (pj.nivel > 1) pj.nivel--;
  else return;
  S.subida = null; savePj(); render(); avisar(`Volvió a nivel ${pj.nivel}.`, 'info');
}
export function cerrarSubida() { S.subida = null; render(); }
export async function bajarNivel() {
  const pj = S.pj;
  if (pj.nivel <= 1) return;
  if (!(await confirmar({ titulo: `¿Bajar a nivel ${pj.nivel - 1}?`, si: 'Bajar de nivel',
    texto: `${pj.nombre || 'Este personaje'} pierde la tirada de PG de este nivel. Lo que elegiste en niveles altos se guarda por si vuelve a subir.` }))) return;
  pj.pgTiradas[pj.nivel - 2] = null; pj.nivel--; S.subida = null; savePj(); render(); avisar(`Ahora es nivel ${pj.nivel}.`, 'info');
}
export function tirarPg(tirar: Tirar, i: number) {
  const pj = S.pj;
  asegurarTiradas(pj);
  tirar(`1d${S.c.die}`, `PG del nivel ${i + 2}`, { neutral: true, noRepeat: true }).then(r => { pj.pgTiradas[i] = r.total; savePj(); render(); });
}
/* ---- Equipo de la clase: uno de sus kits (A, o B en el Guerrero) o su oro, una sola vez por clase ---- */
export function tomarEquipoClase(op: number | 'oro') {
  const pj = S.pj, C = getC(pj, pj.clase), kit = kitClase(pj.clase);
  if (!kit || pj.inicial) return;
  const letra = op === 'oro' ? String.fromCharCode(65 + kit.variantes.length) : String.fromCharCode(65 + op);
  if (op === 'oro') {
    const a = kit.alternativa;
    const oro = typeof a === 'number' ? a : Array.from({ length: a.n }, () => 1 + Math.floor(Math.random() * a.caras)).reduce((s, x) => s + x, 0) * a.por;
    pj.oro = (+pj.oro || 0) + oro;
    avisar(`${oro} po agregadas${typeof a === 'number' ? '' : ` (tiraste ${a.dados})`}.`);
    pj.kits = { ...(pj.kits || {}), clase: { oro } };
  } else {
    const v = kit.variantes[op];
    pj.kits = { ...(pj.kits || {}), clase: agregarAporte(pj, aporteClase(C, v)) };
    avisar(`Kit ${letra} de ${C?.n || 'tu clase'} agregado.`);
  }
  pj.inicial = letra;
  savePj(); render();
}

/* ---- Quitar un kit ya tomado: se deshace exactamente lo que agregó ---- */
export async function quitarEquipoClase() {
  const pj = S.pj, kit = kitClase(pj.clase);
  if (!pj.inicial) return;
  // Personajes que tomaron el kit antes de que se anotara lo agregado: se reconstruye desde el kit
  let ap: Aporte | null = pj.kits?.clase || null;
  if (!ap && kit) {
    const v = kit.variantes[String(pj.inicial).charCodeAt(0) - 65];
    ap = v ? aporteClase(getC(pj, pj.clase), v) : { oro: typeof kit.alternativa === 'number' ? kit.alternativa : 0 };
  }
  if (!(await confirmar({ titulo: '¿Quitar el equipo de la clase?', si: 'Quitar equipo', peligro: true,
    texto: 'Se quitan sus armas, armadura, objetos y oro, y puedes elegir otra opción. Lo que cambiaste después se respeta.' }))) return;
  if (ap) quitarAporte(pj, ap);
  pj.inicial = false; if (pj.kits) delete pj.kits.clase;
  savePj(); render(); avisar('Equipo de la clase quitado.');
}
export async function quitarEquipoTrasfondo() {
  const pj = S.pj, T = getT(pj, pj.trasfondo?.key), kit = kitTrasfondo(pj.trasfondo?.key, T), op = pj.trasfondo?.equipo;
  if (!op) return;
  const ap: Aporte | null = pj.kits?.trasfondo || (kit ? (op === 'A' ? aporteTrasfondo(T, kit) : { oro: kit.alternativa || 0 }) : null);
  if (!(await confirmar({ titulo: '¿Quitar el equipo del trasfondo?', si: 'Quitar equipo', peligro: true,
    texto: 'Se quitan sus armas, objetos y oro, y puedes elegir otra opción. Lo que cambiaste después se respeta.' }))) return;
  if (ap) quitarAporte(pj, ap);
  pj.trasfondo.equipo = ''; if (pj.kits) delete pj.kits.trasfondo;
  savePj(); render(); avisar('Equipo del trasfondo quitado.');
}

/* Lo que agrega un kit: armas, armadura, escudo, un bloque de inventario y oro. Se guarda en pj.kits para poder quitarlo */
type Aporte = { armas?: [string, number][]; armadura?: string; armaduraAntes?: string; escudo?: boolean; escudoAntes?: boolean; bloque?: string; oro: number };
const aporteClase = (C: any, v: any): Aporte => ({ armas: v.armas || [], armadura: v.armadura, escudo: !!v.escudo, bloque: `De la clase (${C?.n || 'clase'}):\n${v.objetos.map((o: string) => `- ${o}`).join('\n')}`, oro: v.oro || 0 });
const aporteTrasfondo = (T: any, kit: any): Aporte => ({ armas: kit.armas || [], bloque: `Del trasfondo (${T?.n || 'trasfondo'}):\n${kit.objetos.map((o: string) => `- ${o}`).join('\n')}`, oro: kit.oro || 0 });
export function agregarAporte(pj: any, ap: Aporte): Aporte {
  (ap.armas || []).forEach(([k, q]) => { const ex = pj.armas.find((a: any) => a[0] === k); if (ex) ex[1] += q; else pj.armas.push([k, q]); });
  if (ap.armadura) { ap.armaduraAntes = pj.armadura || 'ninguna'; pj.armadura = ap.armadura; }
  if (ap.escudo) { ap.escudoAntes = !!pj.escudo; pj.escudo = true; }
  if (ap.bloque) pj.inventario = [pj.inventario, ap.bloque].filter(Boolean).join('\n\n');
  pj.oro = (+pj.oro || 0) + ap.oro;
  return ap;
}
export function quitarAporte(pj: any, ap: Aporte) {
  (ap.armas || []).forEach(([k, q]) => { const i = pj.armas.findIndex((a: any) => a[0] === k); if (i < 0) return; pj.armas[i][1] -= q; if (pj.armas[i][1] <= 0) pj.armas.splice(i, 1); });
  // La armadura y el escudo solo se devuelven si siguen siendo los del kit (si los cambiaste después, se respetan)
  if (ap.armadura && pj.armadura === ap.armadura) pj.armadura = ap.armaduraAntes || 'ninguna';
  if (ap.escudo && !ap.escudoAntes) pj.escudo = false;
  if (ap.bloque && pj.inventario) pj.inventario = String(pj.inventario).replace(ap.bloque, '').replace(/\n{3,}/g, '\n\n').trim();
  pj.oro = Math.max(0, (+pj.oro || 0) - ap.oro);
}

/* ---- Equipo del trasfondo: kit (A) o 50 po (B), una sola vez por trasfondo ---- */
export function tomarEquipoTrasfondo(op: 'A' | 'B') {
  const pj = S.pj, T = getT(pj, pj.trasfondo?.key), kit = kitTrasfondo(pj.trasfondo?.key, T);
  if (!kit || pj.trasfondo.equipo) return;
  const ap = op === 'A' ? aporteTrasfondo(T, kit) : { oro: kit.alternativa || 0 };
  pj.kits = { ...(pj.kits || {}), trasfondo: agregarAporte(pj, ap) };
  pj.trasfondo.equipo = op;
  savePj(); render();
  avisar(op === 'A' ? `Kit de ${T?.n || 'trasfondo'} agregado: armas, inventario y ${kit.oro} po.` : `${kit.alternativa} po agregadas.`);
}

export function irAPaso(paso: string) {
  S.subida = null;
  // Pasada la creación, el equipo está en la pestaña Equipo de la hoja
  if (paso === 'equipo' && S.pj && !pasoEquipoEnEditor(S.pj, compute(S.pj), kitClase, kitTrasfondo)) { S.view = 'ficha'; S.tab = 'equipo'; }
  else { S.view = 'editor'; S.step = paso; }
  render(); irArriba();
}

/* ---- Conjuros y rasgos ---- */
export async function confirmarNoLanzador() {
  if (puedeLanzar(S.c)) return true;
  return confirmar({ titulo: '¿Agregar el conjuro de todas formas?', si: 'Agregar',
    texto: `${S.pj.nombre || 'Tu personaje'} no lanza conjuros por su clase ni por su especie. Agrégalo solo si se lo dio una dote, un objeto o tu DM.` });
}
export function leerRasgo(p: string) {
  const v = (id: string) => (document.getElementById(p + id) as HTMLInputElement | null)?.value || '';
  const n = v('N').trim(); if (!n) { avisar('Ponle nombre al rasgo.', 'aviso'); return null; }
  const u = v('U');
  return { nombre: n, t: v('T'), manual: true, n: +v('Nv') || 1, usos: u === 'pb' ? 'pb' : +u, reset: v('R'), texto: v('X') };
}

/* ---- Archivo ---- */
export function bajarArchivo(nombre: string, texto: string) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([texto], { type: 'application/json' }));
  a.download = nombre; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
/** Borra el personaje abierto o, con `id`, uno de la lista de inicio. */
export async function borrarPj(id: string = S.pj?.id) {
  const nombre = id === S.pj?.id ? S.pj.nombre : S.list.find(p => p.id === id)?.name;
  if (!(await confirmar({ titulo: `¿Borrar a ${nombre || 'este personaje'}?`, si: 'Borrar personaje', peligro: true,
    texto: 'Se quita de tu cuenta y no se puede deshacer. Si quieres conservar una copia, abre su hoja y usa antes «Descargar respaldo».' }))) return;
  almacen.borrarPj(id); S.list = S.list.filter(p => p.id !== id); almacen.ultimo(null);
  if (S.pj?.id === id) S.pj = null;
  S.view = 'home'; render(); avisar('Personaje borrado.');
}

export const claveRasgo = (nombre: string) => norm(nombre);

/** Qué empuña en cada mano: `a` la principal, `b` la otra ('escudo' para el escudo, '' libre).
    Un arma a dos manos en la principal suelta lo que hubiera en la otra. */
export function setMano(lado: 'a' | 'b', v: string) {
  const pj = S.pj, m = manosDe(pj);
  pj.armaduras = armadurasDe(pj); // el escudo que se suelta sigue en el inventario
  if (lado === 'a') {
    m.a = v;
    if (v && aDosManos(v)) { m.b = ''; pj.escudo = false; }
    else if (m.b && !puedeIrEnLaOtra(pj, m.b, v)) m.b = '';
  } else {
    pj.escudo = v === 'escudo';
    m.b = v === 'escudo' ? '' : v;
  }
  pj.manos = m; savePj(); render();
}

/* ---- Inventario: armas, armaduras y objetos, y monedas ---- */
export function agregarArma(k: string, def?: any) {
  const pj = S.pj;
  if (def) { k = nuevaClave(); pj.armasPropias = { ...(pj.armasPropias || {}), [k]: def }; }
  const ex = pj.armas.find((a: any) => a[0] === k); if (ex) ex[1]++; else pj.armas.push([k, 1]);
  savePj(); render(); avisar(`${def?.n || ARMAS[k]?.n || 'Arma'} agregada.`);
}
export function quitarArma(k: string) {
  const pj = S.pj; pj.armas = pj.armas.filter((a: any) => a[0] !== k);
  if (pj.armasPropias?.[k]) delete pj.armasPropias[k];
  savePj(); render();
}
export function agregarArmadura(k: string, def?: any) {
  const pj = S.pj;
  if (def) { k = nuevaClave(); pj.armadurasPropias = { ...(pj.armadurasPropias || {}), [k]: def }; }
  const tiene = armadurasDe(pj);
  if (tiene.includes(k)) return avisar(k === 'escudo' ? 'Ya tienes un escudo.' : 'Ya tienes esa armadura.', 'info');
  pj.armaduras = [...tiene, k];
  savePj(); render(); avisar(`${k === 'escudo' ? 'Escudo' : def?.n || ARMADURAS[k]?.n || 'Armadura'} agregado.`);
}
export function quitarArmadura(k: string) {
  const pj = S.pj;
  pj.armaduras = armadurasDe(pj).filter(x => x !== k);
  if (pj.armadura === k) pj.armadura = 'ninguna';
  if (k === 'escudo') pj.escudo = false;
  if (pj.armadurasPropias?.[k]) delete pj.armadurasPropias[k];
  if (pj.cantArm) delete pj.cantArm[k];
  savePj(); render();
}
/** Cuántas de cada armadura o escudo (pj.cantArm; 1 si no dice). En 0 se quita, con su objeto mágico si lo es. */
export function cambiarCantidadArmadura(k: string, d: number) {
  const pj = S.pj, n = (+pj.cantArm?.[k] || 1) + d;
  if (n <= 0) {
    if (pj.cantArm) delete pj.cantArm[k];
    const m = (pj.magicos || []).find((x: any) => x.armadura === k); if (m) return quitarMagico(m.id);
    return quitarArmadura(k);
  }
  pj.cantArm = { ...(pj.cantArm || {}), [k]: n };
  savePj(); render();
}
/** Cuántos de un objeto mágico (pociones, pergaminos...). En 0 se quita. */
export function cambiarCantidadMagico(id: string, d: number) {
  const pj = S.pj, m = (pj.magicos || []).find((x: any) => x.id === id); if (!m) return;
  const n = (+m.q || 1) + d; if (n <= 0) return quitarMagico(id);
  m.q = n; savePj(); render();
}
/** Cambia la armadura puesta por otra que tenga; la anterior queda guardada. */
export function ponerArmadura(k: string) {
  const pj = S.pj;
  pj.armaduras = armadurasDe(pj); pj.armadura = k || 'ninguna';
  savePj(); render();
}
export function agregarObjeto(nombre: string, q: number) {
  const pj = S.pj, n = nombre.trim(); if (!n) return;
  const ex = (pj.objetos || []).find((o: any) => o.n.toLowerCase() === n.toLowerCase());
  if (ex) ex.q += q; else pj.objetos = [...(pj.objetos || []), { n, q }];
  savePj(); render();
}
export function cambiarObjeto(i: number, d: number) {
  const pj = S.pj, o = pj.objetos?.[i]; if (!o) return;
  o.q += d; if (o.q <= 0) pj.objetos.splice(i, 1);
  savePj(); render();
}
/** Añade un objeto mágico del catálogo (`k`) o personalizado (`def`). Si es un arma o armadura mágica, `base` es la
    que lo lleva: se crea su arma o armadura con el bono en el inventario. */
export function agregarMagico(k: string, def?: any, base?: string) {
  const pj = S.pj, id = nuevaClave().slice(2), m: any = { id, ...(def ? { def } : { k }), sint: false };
  const d = defDe(m); if (!d) return;
  if (d.base === 'arma' && base) {
    const w = armaMagica(base, d); if (!w) return;
    m.arma = nuevaClave(); pj.armasPropias = { ...(pj.armasPropias || {}), [m.arma]: w }; pj.armas.push([m.arma, 1]);
  } else if (d.base === 'armadura' && base) {
    const a = armaduraMagica(base, d); if (!a) return;
    m.armadura = nuevaClave(); pj.armadurasPropias = { ...(pj.armadurasPropias || {}), [m.armadura]: a };
    pj.armaduras = [...armadurasDe(pj), m.armadura];
  } else if (d.base === 'escudo') {
    m.escudo = true; if (!armadurasDe(pj).includes('escudo')) pj.armaduras = [...armadurasDe(pj), 'escudo'];
  }
  pj.magicos = [...(pj.magicos || []), m];
  savePj(); render(); avisar(`${d.n} agregado${d.sint ? '. Sintonízalo para que funcione' : ''}.`);
}
export function quitarMagico(id: string) {
  const pj = S.pj, m = (pj.magicos || []).find((x: any) => x.id === id); if (!m) return;
  if (m.arma) { pj.armas = pj.armas.filter((a: any) => a[0] !== m.arma); delete pj.armasPropias?.[m.arma]; }
  if (m.armadura) {
    pj.armaduras = armadurasDe(pj).filter((k: string) => k !== m.armadura); delete pj.armadurasPropias?.[m.armadura];
    if (pj.armadura === m.armadura) pj.armadura = 'ninguna';
  }
  pj.magicos = pj.magicos.filter((x: any) => x.id !== id);
  savePj(); render();
}
/** Sintoniza o deja de sintonizar; no deja pasar del límite de 3. */
export function sintonizar(id: string) {
  const pj = S.pj, m = (pj.magicos || []).find((x: any) => x.id === id); if (!m) return;
  if (!m.sint && sintonizados(pj) >= MAX_SINTONIA) return avisar(`Ya tienes ${MAX_SINTONIA} objetos sintonizados, el máximo. Deja de sintonizar uno primero.`, 'info');
  m.sint = !m.sint;
  savePj(); render();
}
/** Suma o gasta monedas; al gastar, cambia monedas mayores o junta menores si hace falta. */
export function moverMonedas(den: string, n: number, gastar: boolean) {
  const pj = S.pj, b = bolsaDe(pj); n = Math.floor(n); if (!(n > 0)) return;
  if (!gastar) { b[den] += n; guardarBolsa(pj, b); savePj(); render(); return; }
  const r = pagar(b, den, n);
  if (!r) return avisar('No te alcanza el dinero.', 'aviso');
  guardarBolsa(pj, r); savePj(); render();
}
/** Cambia cobre por plata y plata por oro cuando alcanza para una entera. */
export function juntarMonedas() {
  const pj = S.pj; guardarBolsa(pj, juntar(bolsaDe(pj))); savePj(); render();
}
export function cambiarCantidadArma(i: number, d: number) {
  const pj = S.pj, a = pj.armas[i]; if (!a) return;
  a[1] += d;
  if (a[1] <= 0) {
    // Si es el arma de un objeto mágico, se va con él
    const m = (pj.magicos || []).find((x: any) => x.arma === a[0]); if (m) return quitarMagico(m.id);
    pj.armas.splice(i, 1); if (pj.armasPropias?.[a[0]]) delete pj.armasPropias[a[0]];
  }
  savePj(); render();
}
