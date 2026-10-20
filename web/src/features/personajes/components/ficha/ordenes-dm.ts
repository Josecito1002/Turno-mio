/* eslint-disable @typescript-eslint/no-explicit-any */
import { S } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import { responderSalvacionMesa, type OrdenDm } from '@/features/mesa/api';
import { norm } from '@/shared/utils/texto';
import { descansar, moverPool, setVal } from '../../acciones';
import { cdConcentracion, concentracionActual, quitarEfectosDe } from './concentracion';

/* Avisos en grande (pantalla completa) para lo que le pasa al personaje en combate: el daño que recibe (con las
   reacciones que podría usar), una salvación que debe tirar y lo que su DM le cuenta. Se muestran de a uno. */
export type Mesa = { dmId: string; campanaId: string; personajeId: string };
export type AvisoGrande =
  /** Daño o curación recibidos. Con `pendiente`, el daño todavía no se restó: el jugador puede reaccionar antes. */
  | { id: string; tipo: 'efecto'; o: OrdenDm; reacciones: { nombre: string; texto: string }[]; pendiente?: { mesa: Mesa | null; pid?: string } }
  | { id: string; tipo: 'salvacion'; o: OrdenDm; mesa: Mesa | null }
  | { id: string; tipo: 'aviso'; o: OrdenDm }
  /** Un ataque acertó y se puede seguir: lo que se suma o la acción que sigue (celeste) */
  | { id: string; tipo: 'seguimiento'; titulo: string; texto?: string; opciones: { nombre: string; texto: string; alIr?: () => void; etiqueta?: string }[] }
  /** Le hicieron daño mientras se concentraba: salvación de Constitución para mantenerla */
  | { id: string; tipo: 'concentracion'; dano: number; cd: number; mesa: Mesa | null };
let cola: AvisoGrande[] = [];
/** Mientras el jugador usa su reacción los avisos se apartan (siguen en la cola) y vuelven al terminar. */
let enPausa = false;
const VACIA: AvisoGrande[] = [];
/** La pantalla de combate dice cómo abrir el menú de Reacción y si todavía queda la reacción de esta ronda. */
let abrirReaccion: (() => void) | null = null, reaccionLibre = true;
const oyentes = new Set<() => void>();
const avisar_ = () => oyentes.forEach(f => f());
export const avisosGrandes = {
  lista: () => enPausa ? VACIA : cola,
  suscribir: (f: () => void) => { oyentes.add(f); return () => { oyentes.delete(f); }; },
  quitar: (id: string) => { cola = cola.filter(x => x.id !== id); avisar_(); },
  /** Si se puede ir a usar la reacción desde el aviso (en la pantalla de combate y sin haberla gastado). */
  puedeReaccionar: () => !!abrirReaccion && reaccionLibre,
  /** Si todavía queda la reacción de esta ronda (fuera de la pantalla de combate se supone que sí). */
  quedaReaccion: () => reaccionLibre,
  /** Aparta los avisos y abre el menú de Reacción; vuelven con `reanudar` al cerrarlo. */
  reaccionar: () => { if (!abrirReaccion) return; enPausa = true; avisar_(); abrirReaccion(); },
  reanudar: () => { if (enPausa) { enPausa = false; avisar_(); } },
};
/** La pantalla de combate se registra para poder abrir el menú de Reacción desde un aviso. */
export const fijarReaccion = (abrir: (() => void) | null, libre: boolean) => {
  if (abrir === abrirReaccion && libre === reaccionLibre) return;
  abrirReaccion = abrir; reaccionLibre = libre;
  // Copia nueva para que los avisos abiertos vuelvan a pintarse con el botón al día
  cola = [...cola]; avisar_();
};
/** Las condiciones que tiene ahora el personaje (las que puso el DM y sus efectos), para la salvación que falla sola. */
let misCondiciones: string[] = [];
export const condicionesMias = () => misCondiciones;
export const fijarCondicionesMias = (c: string[]) => { misCondiciones = c; };
/** Un aviso en grande con título y explicación (una vez por id). */
export const avisoGrande = (id: string, titulo: string, texto: string) => encolar({ id, tipo: 'aviso', o: { id, tipo: 'aviso', personajeId: null, ts: '', nota: titulo, bono: texto } });
/** Un ataque acertó: avisa con qué se puede seguir (una acción adicional, otro ataque, lo que se suma al daño). */
export const avisoSeguimiento = (titulo: string, opciones: { nombre: string; texto: string; alIr?: () => void; etiqueta?: string }[], texto?: string) =>
  { if (opciones.length) encolar({ id: `seg-${Date.now()}`, tipo: 'seguimiento', titulo, texto, opciones }); };
const encolar = (a: AvisoGrande) => { if (!cola.some(x => x.id === a.id)) { cola = [...cola, a]; avisar_(); } };

/** Lo que dispara una reacción al recibir daño o un ataque (Reprensión infernal, Esquiva asombrosa, Escudo…). */
const AL_RECIBIR = /(recib\w* (?:da[ñn]o|un ataque|un golpe)|te (?:da[ñn]a|golpea|impacta|alcanza|ataca)|(?:eres|seas|es) (?:golpead|alcanzad|da[ñn]ad|impactad)\w*|un ataque te|(?:te|le) (?:aciert|impact)\w*)/;
const TIPOS_DANO = ['acido', 'contundente', 'cortante', 'perforante', 'fuego', 'frio', 'fuerza', 'relampago', 'necrotico', 'radiante', 'veneno', 'psiquico', 'trueno'];
/** Si la reacción solo sirve con ciertos tipos de daño (Absorber elementos), el daño recibido tiene que ser de uno de ellos. */
function sirveConTipo(texto: string, tipoDano?: string) {
  const pide = TIPOS_DANO.filter(t => new RegExp(`\\b${t}`).test(texto));
  if (!pide.length || !tipoDano) return true;
  const recibido = norm(tipoDano);
  return pide.some(t => recibido.includes(t));
}
/** Las reacciones del personaje que se pueden usar al recibir daño (del tipo recibido, si la reacción pide uno). */
export function reaccionesAlDano(c: any, tipoDano?: string): { nombre: string; texto: string }[] {
  if (!c) return [];
  const txt = (x: any) => String(typeof x === 'function' ? '' : x || '');
  const vale = (t: string) => AL_RECIBIR.test(norm(t)) && sirveConTipo(norm(t), tipoDano);
  const rasgos = (c.entries || []).filter((e: any) => e.t === 'reaccion' && vale(txt(e.texto)));
  const conjuros = (c.conjuros || []).filter((s: any) => s.tiempo === 'reaccion' && vale(txt(s.desc)));
  const corta = (t: string) => t.replace(/\*\*|__/g, '').split(/(?<=\.)\s/)[0].slice(0, 160);
  return [...rasgos.map((e: any) => ({ nombre: e.nombre, texto: corta(txt(e.texto)) })), ...conjuros.map((s: any) => ({ nombre: s.nombre, texto: corta(txt(s.desc)) }))];
}

/** Lo que dispara una reacción al tener que hacer una salvación (o al fallarla). */
const AL_SALVAR = /salvaci[oó]n/;
/** Las reacciones que sirven ante una salvación que pide otro: las que hablan de salvaciones y, si trae daño, las del daño. */
export function reaccionesALaSalvacion(c: any, dano: number, tipoDano?: string): { nombre: string; texto: string }[] {
  if (!c) return [];
  const txt = (x: any) => String(typeof x === 'function' ? '' : x || '');
  const corta = (t: string) => t.replace(/\*\*|__/g, '').split(/(?<=\.)\s/)[0].slice(0, 160);
  const propias = [...(c.entries || []).filter((e: any) => e.t === 'reaccion' && AL_SALVAR.test(norm(txt(e.texto)))).map((e: any) => ({ nombre: e.nombre, texto: corta(txt(e.texto)) })),
    ...(c.conjuros || []).filter((s: any) => s.tiempo === 'reaccion' && AL_SALVAR.test(norm(txt(s.desc)))).map((s: any) => ({ nombre: s.nombre, texto: corta(txt(s.desc)) }))];
  const todas = [...propias, ...(dano > 0 ? reaccionesAlDano(c, tipoDano) : [])];
  return todas.filter((r, i) => todas.findIndex(x => x.nombre === r.nombre) === i);
}

/** Si se está concentrando y sigue en pie, pide la salvación para mantener la concentración (a 0 PG se pierde sola). */
export function pedirConcentracion(dano: number, mesa: Mesa | null, id = 'conc-' + Date.now()) {
  if (!dano || !concentracionActual()) return;
  const r = S.c?.recursos?.find((x: any) => x.id === 'pg');
  if (r && r.max - Math.min(S.pj.used?.pg || 0, r.max) <= 0) return;
  encolar({ id, tipo: 'concentracion', dano, cd: cdConcentracion(dano), mesa });
}

/** Lo que otro jugador o el DM te hizo: daño (primero a los PG temporales), curación, y un efecto que queda a la vista hasta que lo quites.
 *  El daño en grande, si todavía tienes tu reacción, no se resta hasta que lo confirmes: antes puedes reaccionar (Escudo, Esquiva
 *  asombrosa…). Devuelve true si quedó así, esperando. */
export function aplicarEfecto(o: OrdenDm, grande = true, mesa: Mesa | null = null, pid?: string): boolean {
  const pj = S.pj; if (!pj) return false;
  const n = Math.max(0, Math.round(o.dano || 0));
  if (grande && n && !o.cura && reaccionLibre) {
    encolar({ id: o.id, tipo: 'efecto', o, reacciones: reaccionesAlDano(S.c, o.tipoDano), pendiente: { mesa, pid } });
    return true;
  }
  if (n && o.cura) moverPool('pg', n);
  else if (n) {
    const temp = Math.max(0, +pj.pgTemp || 0), t = Math.min(temp, n);
    if (t) setVal('pgTemp', temp - t);
    if (n - t) moverPool('pg', -(n - t));
  }
  if (o.condicion || o.bono) setVal('efectos', [...(pj.efectos || []).filter((x: any) => x.nombre !== (o.condicion || 'Efecto')),
    { nombre: o.condicion || 'Efecto', texto: o.bono || '', de: o.de || '', ...(o.rondas ? { rondas: o.rondas } : {}), ...(o.hasta ? { hasta: o.hasta } : {}), ...(o.conc ? { conc: o.conc } : {}) }]);
  if (grande) encolar({ id: o.id, tipo: 'efecto', o, reacciones: n && !o.cura ? reaccionesAlDano(S.c, o.tipoDano) : [] });
  else avisar(`${o.de || 'Alguien'}${o.nota ? ` (${o.nota})` : ''}: ${n ? (o.cura ? `te cura ${n} PG` : `te hace ${n} de daño`) : ''}${o.condicion ? `${n ? ', ' : ''}${o.condicion}` : ''}.`);
  if (n && !o.cura) pedirConcentracion(n, mesa, o.id + '-conc');
  return false;
}

/** Ataques que el jugador evitó con su reacción (Escudo): la salvación que venía con ese golpe ya no se tira. */
let evitados: { de: string; nota: string; ts: number }[] = [];
const esEvitado = (o: OrdenDm) => evitados.some(x => x.de === (o.de || '') && x.nota === (o.nota || '') && Date.now() - x.ts < 60000);
/** Le avisa al DM que la salvación no se tira porque el ataque falló gracias a la reacción. */
const avisarEvitada = (o: OrdenDm, mesa: Mesa | null) => { if (mesa) responderSalvacionMesa(mesa, { pedido: o.id, total: 0, supero: true, dano: 0, evito: true }).catch(() => {}); };
/** El jugador confirma el daño que esperaba su reacción: el que escribió (la mitad, nada…) o, si la reacción hizo fallar el
 *  ataque, nada y tampoco la salvación que traía ese golpe. */
export function confirmarDano(a: Extract<AvisoGrande, { tipo: 'efecto' }>, dano: number, evito = false) {
  const mesa = a.pendiente?.mesa || null;
  if (a.pendiente?.pid) marcarVisto(a.pendiente.pid, a.o.id);
  if (evito) {
    evitados = [...evitados.filter(x => Date.now() - x.ts < 60000), { de: a.o.de || '', nota: a.o.nota || '', ts: Date.now() }];
    for (const x of cola) if (x.tipo === 'salvacion' && esEvitado(x.o) && !x.o.librarse) { avisarEvitada(x.o, x.mesa); cola = cola.filter(y => y !== x); }
    avisar(`Evitaste ${a.o.nota || 'el ataque'}${a.o.de ? ` de ${a.o.de}` : ''}.`);
  } else aplicarEfecto({ ...a.o, dano }, false, mesa);
  avisosGrandes.quitar(a.id);
}

const claveVistos = (pid: string) => 'mt-ordenes-' + pid;
const leerVistos = (pid: string): string[] | null => {
  try { const t = localStorage.getItem(claveVistos(pid)); return t ? JSON.parse(t) : null; } catch { return null; }
};
const guardarVistos = (pid: string, ids: string[]) => { try { localStorage.setItem(claveVistos(pid), JSON.stringify(ids.slice(-80))); } catch { /* sin almacenamiento */ } };
/** El daño que esperaba la reacción ya se aplicó: no se vuelve a pedir al recargar. */
const marcarVisto = (pid: string, id: string) => { const v = leerVistos(pid) || []; if (!v.includes(id)) guardarVistos(pid, [...v, id]); };

/** Aplica a esta hoja los descansos y la inspiración que mandó el DM. Se recuerda cuáles ya se aplicaron (por personaje);
 *  la primera vez solo cuentan las de los últimos 10 minutos, para no repetir lo de otras sesiones. */
export function aplicarOrdenes(ordenes: OrdenDm[] | undefined, pid: string, mesa: Mesa | null = null) {
  if (!ordenes?.length) return;
  // Sin almacenamiento se aplican las recientes
  const vistos = leerVistos(pid);
  const nuevas = ordenes.filter(o => (!o.personajeId || o.personajeId === pid) && (vistos ? !vistos.includes(o.id) : Date.now() - Date.parse(o.ts) < 600000));
  if (vistos && !nuevas.length) return;
  // El daño que espera tu reacción no se marca como visto hasta confirmarlo: si recargas, vuelve a salir
  const esperando = new Set<string>();
  for (const o of nuevas) {
    if (o.tipo === 'inspiracion') { setVal('inspiracion', true); avisar('Tu DM te dio inspiración.'); }
    else if (o.tipo === 'efecto') { if (cola.some(x => x.id === o.id) || aplicarEfecto(o, true, mesa, pid)) esperando.add(o.id); }
    // Alguien dejó de concentrarse: se acaba lo que te había dejado ese conjuro
    else if (o.tipo === 'finConc') { const fuera = o.conc ? quitarEfectosDe(o.conc) : []; if (fuera.length) avisar(`${o.de || 'Alguien'} dejó de concentrarse en ${o.nota || 'su conjuro'}: se acabó ${fuera.join(', ')}.`); }
    // La salvación la resuelve el jugador en el aviso grande: ahí se aplica lo que corresponda
    // Si la reacción ya hizo fallar el ataque que la traía, no se tira
    else if (o.tipo === 'salvacion') { if (esEvitado(o) && !o.librarse) avisarEvitada(o, mesa); else encolar({ id: o.id, tipo: 'salvacion', o, mesa }); }
    else if (o.tipo === 'aviso') encolar({ id: o.id, tipo: 'aviso', o });
    else descansar(o.tipo);
  }
  guardarVistos(pid, [...(vistos || []), ...ordenes.map(o => o.id).filter(id => !esperando.has(id))]);
}
