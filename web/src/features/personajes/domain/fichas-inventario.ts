/* eslint-disable @typescript-eslint/no-explicit-any */
/* Las fichas de objeto del inventario, con el mismo formato que las del apéndice de una guía: armas, armaduras,
   objetos mágicos y el resto (el equipo de aventura conocido trae su texto y su dibujo; lo demás, el texto que le
   puso el jugador o el DM). */
import { ARMAS, ARMADURAS, MAESTRIAS } from '@/features/reglas/data/equipo';
import { EQUIPO_AVENTURA, OBJETOS_CON_FICHA } from '@/features/reglas/data/equipo-aventura';
import type { Ficha } from '@/features/homebrewery/domain/fichas';
import { norm } from '@/shared/utils/texto';
import { armadurasDe } from './inventario';

const mayus = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const ficha = (titulo: string, tipo: string, parrafos: string[], imagen = ''): Ficha => ({ titulo, tipo, parrafos, imagen, copias: 1 });
const dibujo = (img: string | undefined, origen: string) => img ? `${origen}/fichas/equipo/${img}.jpg` : '';

/** Dibujos de public/fichas/equipo para armas (clave de ARMAS) y objetos mágicos (clave de OBJETOS_MAGICOS). */
const IMG_ARMAS: Record<string, string> = { daga: 'daga', maza: 'maza', lanza: 'lanza', hacha_mano: 'hacha-mano', ballesta_ligera: 'ballesta-ligera', baston: 'baston' };
const IMG_MAGICOS: Record<string, string> = {
  'pocion-curacion': 'pocion-curacion', 'pocion-curacion-mayor': 'pocion-curacion-mayor',
  'pocion-curacion-superior': 'pocion-curacion-superior', 'pocion-curacion-suprema': 'pocion-curacion-suprema',
};

/** El equipo de aventura por su nombre en el inventario: «Antorcha (5)» o «10 antorchas» encuentran la antorcha. */
export function equipoDe(nombre: string) {
  const n = norm(nombre.replace(/\([^)]*\)/g, '')).replace(/^\d+\s+/, '').trim();
  return [...EQUIPO_AVENTURA, ...OBJETOS_CON_FICHA].find(e => e.al.some(a => n === a || n.startsWith(a + ' ') || n === a + 's' || n.startsWith(a + 's ')));
}

export function fichaArma(w: any, origen = ''): Ficha {
  const dist = w.dist || w.p?.includes('munición');
  const p: string[] = [`**Daño:** ${w.d} ${w.tipo}${w.v ? `, o ${w.v} a dos manos` : ''}.`];
  const props = (w.p || []).map((x: string) => x === 'arrojadiza' && w.r ? `arrojadiza (${w.r} pies)` : x);
  if (dist && w.r && !w.p?.includes('arrojadiza')) props.push(`alcance ${w.r} pies`);
  if (props.length) p.push(`**Propiedades:** ${props.join(', ')}.`);
  const m = w.ma && MAESTRIAS[w.ma];
  if (m) p.push(`***Maestría: ${m[0]}.*** ${m[1]}`);
  const k = Object.keys(ARMAS).find(x => ARMAS[x] === w);
  return ficha(w.n, `Arma ${w.cat || 'sencilla'}${dist ? ' a distancia' : ' cuerpo a cuerpo'}`, p, dibujo(k && IMG_ARMAS[k], origen));
}

export function fichaArmadura(k: string): Ficha {
  if (k === 'escudo') return ficha('Escudo', 'Escudo', ['Mientras lo empuñas, tu CA aumenta en 2.', 'Ponértelo o quitártelo te cuesta una acción, y ocupa una mano.']);
  const a = ARMADURAS[k];
  const ca = a.cat === 'ligera' ? `${a.base} + tu modificador de Destreza` : a.cat === 'media' ? `${a.base} + tu modificador de Destreza (máximo ${a.max ?? 2})` : `${a.base}`;
  const tiempo = a.cat === 'ligera' ? 'Ponértela: 1 minuto. Quitártela: 1 minuto.' : a.cat === 'media' ? 'Ponértela: 5 minutos. Quitártela: 1 minuto.' : 'Ponértela: 10 minutos. Quitártela: 5 minutos.';
  const p = [`**CA:** ${ca}.`];
  if (a.fue) p.push(`Si tu Fuerza es menor de ${a.fue}, tu velocidad baja 10 pies.`);
  if (a.sigilo) p.push('Tienes desventaja en las pruebas de Destreza (Sigilo).');
  p.push(tiempo);
  return ficha(a.n, `Armadura ${a.cat}`, p);
}

export function fichaMagico(d: any, sobre = '', clave = '', origen = ''): Ficha {
  const p = String(d.texto || '').split(/\n+/).filter(Boolean);
  if (d.cargas?.max) p.push(`**Cargas:** ${d.cargas.max}${d.cargas.reset ? `; se recuperan ${d.cargas.reset}` : ''}.${d.cargas.nota ? ` ${d.cargas.nota}` : ''}`);
  if (d.conjuros?.length) p.push(`**Conjuros:** ${d.conjuros.map((c: any) => `*${c.n}* (${c.coste})`).join(', ')}.`);
  const tipo = [mayus(d.tipo || 'objeto maravilloso'), d.rareza].filter(Boolean).join(', ') + (d.sint ? ' (requiere sintonización)' : '');
  return ficha(sobre ? `${d.n} (${sobre})` : d.n, tipo, p, dibujo(IMG_MAGICOS[clave], origen));
}

export function fichaObjeto(o: { n: string; q?: number; t?: string }, origen = ''): Ficha {
  const e = equipoDe(o.n);
  const cuantos = (+(o.q ?? 1) || 1) > 1 ? ` · ${o.q}` : '';
  // un paquete («Paquete de explorador (mochila, petate, …)») lleva su contenido en la ficha
  const dentro = !e && o.n.match(/^(.+?)\s*\((.+,.+)\)\s*$/);
  if (!o.t?.trim() && dentro) return ficha(dentro[1], `Equipo de aventura${cuantos}`, [`**Contiene:** ${dentro[2]}.`]);
  const texto = o.t?.trim() ? o.t.split(/\n+/).filter(Boolean) : e?.texto || [];
  return ficha(o.n, `${e ? e.tipo || 'Equipo de aventura' : 'Objeto'}${cuantos}`, texto, dibujo(e?.img, origen));
}

/** Todas las fichas de lo que lleva el personaje (`c` es el personaje calculado). */
export function fichasInventario(pj: any, c: any, origen = ''): Ficha[] {
  const out: Ficha[] = [];
  for (const a of c.armas || []) if (a.w) out.push(fichaArma(a.w, origen));
  for (const k of armadurasDe(pj)) out.push(fichaArmadura(k));
  for (const { m, d } of c.magicos || []) {
    const sobre = m.arma && ARMAS[m.arma] ? ARMAS[m.arma].n : m.armadura && ARMADURAS[m.armadura] ? ARMADURAS[m.armadura].n : '';
    out.push(fichaMagico(d, sobre, m.k || '', origen));
  }
  for (const o of pj.objetos || []) out.push(fichaObjeto(o, origen));
  return out;
}
