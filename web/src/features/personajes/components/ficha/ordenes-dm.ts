/* eslint-disable @typescript-eslint/no-explicit-any */
import { S } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import type { OrdenDm } from '@/features/mesa/api';
import { norm } from '@/shared/utils/texto';
import { descansar, moverPool, setVal } from '../../acciones';

/* Avisos en grande (pantalla completa) para lo que le pasa al personaje en combate: el daño que recibe (con las
   reacciones que podría usar), una salvación que debe tirar y lo que su DM le cuenta. Se muestran de a uno. */
export type Mesa = { dmId: string; campanaId: string; personajeId: string };
export type AvisoGrande =
  | { id: string; tipo: 'efecto'; o: OrdenDm; reacciones: { nombre: string; texto: string }[] }
  | { id: string; tipo: 'salvacion'; o: OrdenDm; mesa: Mesa | null }
  | { id: string; tipo: 'aviso'; o: OrdenDm };
let cola: AvisoGrande[] = [];
const oyentes = new Set<() => void>();
const avisar_ = () => oyentes.forEach(f => f());
export const avisosGrandes = {
  lista: () => cola,
  suscribir: (f: () => void) => { oyentes.add(f); return () => { oyentes.delete(f); }; },
  quitar: (id: string) => { cola = cola.filter(x => x.id !== id); avisar_(); },
};
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

/** Lo que otro jugador o el DM te hizo: daño (primero a los PG temporales), curación, y un efecto que queda a la vista hasta que lo quites. */
export function aplicarEfecto(o: OrdenDm, grande = true) {
  const pj = S.pj; if (!pj) return;
  const n = Math.max(0, Math.round(o.dano || 0));
  if (n && o.cura) moverPool('pg', n);
  else if (n) {
    const temp = Math.max(0, +pj.pgTemp || 0), t = Math.min(temp, n);
    if (t) setVal('pgTemp', temp - t);
    if (n - t) moverPool('pg', -(n - t));
  }
  if (o.condicion || o.bono) setVal('efectos', [...(pj.efectos || []).filter((x: any) => x.nombre !== (o.condicion || 'Efecto')),
    { nombre: o.condicion || 'Efecto', texto: o.bono || '', de: o.de || '', ...(o.rondas ? { rondas: o.rondas } : {}), ...(o.hasta ? { hasta: o.hasta } : {}) }]);
  if (grande) encolar({ id: o.id, tipo: 'efecto', o, reacciones: n && !o.cura ? reaccionesAlDano(S.c, o.tipoDano) : [] });
  else avisar(`${o.de || 'Alguien'}${o.nota ? ` (${o.nota})` : ''}: ${n ? (o.cura ? `te cura ${n} PG` : `te hace ${n} de daño`) : ''}${o.condicion ? `${n ? ', ' : ''}${o.condicion}` : ''}.`);
}

/** Aplica a esta hoja los descansos y la inspiración que mandó el DM. Se recuerda cuáles ya se aplicaron (por personaje);
 *  la primera vez solo cuentan las de los últimos 10 minutos, para no repetir lo de otras sesiones. */
export function aplicarOrdenes(ordenes: OrdenDm[] | undefined, pid: string, mesa: Mesa | null = null) {
  if (!ordenes?.length) return;
  const clave = 'mt-ordenes-' + pid;
  let vistos: string[] | null = null;
  try { const t = localStorage.getItem(clave); vistos = t ? JSON.parse(t) : null; } catch { /* sin almacenamiento: se aplican las recientes */ }
  const nuevas = ordenes.filter(o => (!o.personajeId || o.personajeId === pid) && (vistos ? !vistos.includes(o.id) : Date.now() - Date.parse(o.ts) < 600000));
  if (vistos && !nuevas.length) return;
  try { localStorage.setItem(clave, JSON.stringify([...(vistos || []), ...ordenes.map(o => o.id)].slice(-80))); } catch { /* idem */ }
  for (const o of nuevas) {
    if (o.tipo === 'inspiracion') { setVal('inspiracion', true); avisar('Tu DM te dio inspiración.'); }
    else if (o.tipo === 'efecto') aplicarEfecto(o);
    // La salvación la resuelve el jugador en el aviso grande: ahí se aplica lo que corresponda
    else if (o.tipo === 'salvacion') encolar({ id: o.id, tipo: 'salvacion', o, mesa });
    else if (o.tipo === 'aviso') encolar({ id: o.id, tipo: 'aviso', o });
    else descansar(o.tipo);
  }
}
