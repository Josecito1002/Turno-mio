/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Competencias del personaje: parten de la clase (armaduras y armas) y del trasfondo (herramienta),
 * y se suman las que dan los rasgos de especie, subclase y dotes. Las reglas revisadas pueden
 * darlas con `efecto` (c.compArm, c.wProf, c.armasExtra); el resto se lee de los textos.
 */
import { norm, cap } from '@/shared/utils/texto';
import { AB } from '../data/caracteristicas';
import { ARMAS } from '../data/equipo';
import { HERRAMIENTAS } from '../data/herramientas';
import { competenciaArmadura } from './restricciones';

export type Fuente = { que: string; src: string };

/** Estado inicial, antes de las reglas: lo de la clase y el trasfondo. */
export function competenciasBase(c: any, herrTrasfondo: string) {
  c.compArm = { ...competenciaArmadura(c.C) };
  c.wProf = { ...(c.C?.w || { simple: 1, martial: 1 }) };
  c.armasExtra = new Set<string>();
  c.herramientas = herrTrasfondo ? [{ que: cap(herrTrasfondo), src: 'Trasfondo' }] : [];
  c.compFuentes = [] as Fuente[];
  // Lo que da la clase, para anotar de dónde sale cada competencia nueva aunque una regla ya la haya activado
  c.compBase = { arm: { ...c.compArm }, w: { ...c.wProf } };
}

const DA = /(?:competencia|entrenamiento) con\b|competencia marcial/;
/* Frases que hablan de competencia pero no la dan ya: elecciones, temporales, requisitos, o el bonificador */
const NO_DA = /requisito|a tu eleccion|hasta tu siguiente descanso|hasta el siguiente|igual a tu|bonificador de competencia|\bsin competencia|si ya (la )?tienes/;
const HERRAMIENTA = /herramienta|utiles|utensilios|suministros|\bkit\b|instrumento|baraja/;
const SALVACION = /competencia en (?:las )?(?:tiradas de )?salvacion(?:es)? de (fuerza|destreza|constitucion|inteligencia|sabiduria|carisma)/;

/** Lee los rasgos del personaje y suma las competencias que dan. Devuelve si cambió algo de armas. */
export function leerCompetencias(c: any) {
  const w0 = JSON.stringify(c.wProf), extra0 = c.armasExtra.size;
  const nueva = (que: string, src: string) => { if (!c.compFuentes.some((f: Fuente) => f.que === que)) c.compFuentes.push({ que, src }); };
  const conArm = (k: 'ligera' | 'media' | 'pesada' | 'escudo', que: string, src: string) => { c.compArm[k] = true; if (!c.compBase.arm[k]) nueva(que, src); };
  const B = c.compBase.w, marcialBase = !!B.martial && !B.light && !B.finesseLight;
  for (const e of c.entries) {
    if (e.grupo === 'reglas' || !e.texto) continue;
    // Frases por punto o punto y coma (no por dos puntos: "Requisito: competencia con..." es una sola)
    for (const frase of String(e.texto).split(/(?<=[.;])\s+/)) {
      const f = norm(frase).replace(/\([^)]*\)/g, ' ');
      if (NO_DA.test(f)) continue;
      const sv = f.match(SALVACION);
      if (sv) {
        const ab = AB.find(([, , , nm]) => norm(nm) === sv[1]);
        if (ab && !c.saveProf.includes(ab[0])) { c.saveProf = [...c.saveProf, ab[0]]; c.saves[ab[0]] += c.pb; nueva(`Salvaciones de ${ab[3]}`, e.nombre); }
      }
      const i = f.search(DA); if (i < 0) continue;
      const resto = f.slice(i);
      if (/armadura/.test(resto)) {
        if (/ligera/.test(resto)) conArm('ligera', 'Armaduras ligeras', e.nombre);
        if (/media/.test(resto)) conArm('media', 'Armaduras medias', e.nombre);
        if (/pesada/.test(resto)) conArm('pesada', 'Armaduras pesadas', e.nombre);
      }
      if (/escudo/.test(resto)) conArm('escudo', 'Escudos', e.nombre);
      if (/armas? (?:a distancia )?marcial|competencia marcial/.test(resto)) {
        if (/marciales a distancia|a distancia marcial/.test(resto)) { c.wProf = { ...c.wProf, martialDist: 1 }; if (!marcialBase && !B.martialDist) nueva('Armas marciales a distancia', e.nombre); }
        else { c.wProf = { ...c.wProf, martial: 1, light: 0, finesseLight: 0 }; if (!marcialBase) nueva('Armas marciales', e.nombre); }
      }
      if (/armas sencillas/.test(resto)) { c.wProf = { ...c.wProf, simple: 1 }; if (!B.simple) nueva('Armas sencillas', e.nombre); }
      for (const [k, a] of Object.entries<any>(ARMAS)) {
        if ([a.n, ...(a.al || [])].some((n: string) => new RegExp(`\\b${norm(n)}\\b`).test(resto)) && !c.armasExtra.has(k)) { c.armasExtra.add(k); nueva(a.n, e.nombre); }
      }
      if (HERRAMIENTA.test(resto)) {
        resto.replace(DA, '').split(/,|\by\b|\be\b/).map(s => s.replace(/[.;]+$/, '').trim()).filter(s => HERRAMIENTA.test(s))
          .forEach(s => { const que = cap(s.replace(/^(?:las?|los?|un|una|con)\s+/, '')); if (!c.herramientas.some((h: Fuente) => norm(h.que) === norm(que))) c.herramientas.push({ que, src: e.nombre }); });
      }
    }
  }
  return JSON.stringify(c.wProf) !== w0 || c.armasExtra.size !== extra0;
}

/* ---------- Competencias que el jugador elige (dotes, especies, subclases) ---------- */
type TipoOpcion = 'arma' | 'artesano' | 'herramienta';
/** Opciones para una elección de competencia: armas ('arma:clave'), herramientas de artesano o cualquier herramienta ('herr:clave'). */
export function opcionesCompetencia(tipos: TipoOpcion[]) {
  const out: { key: string; nombre: string; desc: string }[] = [];
  if (tipos.includes('arma')) Object.entries<any>(ARMAS).forEach(([k, w]) => out.push({ key: 'arma:' + k, nombre: w.n, desc: `Arma ${w.cat === 'sencilla' ? 'sencilla' : 'marcial'}${w.dist ? ' a distancia' : ''}: ${w.d} ${w.tipo}.` }));
  const herr = tipos.includes('herramienta') ? HERRAMIENTAS : tipos.includes('artesano') ? HERRAMIENTAS.filter(h => h[2] === 'artesano') : [];
  herr.forEach(([k, n, t]) => out.push({ key: 'herr:' + k, nombre: n, desc: t === 'artesano' ? 'Herramientas de artesano.' : t === 'instrumento' ? 'Instrumento musical.' : t === 'juego' ? 'Juego.' : 'Herramienta.' }));
  return out;
}
/** Suma a las competencias lo elegido en pj.elecciones[id] (efecto de una regla revisada). */
export function aplicarElegidas(c: any, id: string, src: string) {
  const elegidas: string[] = [].concat(c.pj?.elecciones?.[id] || []);
  for (const e of elegidas) {
    const [tipo, k] = e.split(':');
    if (tipo === 'arma' && ARMAS[k] && !c.armasExtra.has(k)) {
      c.armasExtra.add(k); c.rehacerArmas = true;
      if (!c.compFuentes.some((f: Fuente) => f.que === ARMAS[k].n)) c.compFuentes.push({ que: ARMAS[k].n, src });
    }
    const h = tipo === 'herr' && HERRAMIENTAS.find(x => x[0] === k);
    if (h && !c.herramientas.some((x: Fuente) => norm(x.que) === norm(h[1]))) c.herramientas.push({ que: h[1], src });
  }
}

/** Textos para la hoja. */
export function textoArmaduras(c: any) {
  const a = c.compArm, tipos = [a.ligera && 'ligeras', a.media && 'medias', a.pesada && 'pesadas'].filter(Boolean) as string[];
  if (!tipos.length && !a.escudo) return 'Ninguna';
  if (tipos.length === 3) return `Todas las armaduras${a.escudo ? ' y escudos' : ''}`;
  if (!tipos.length) return 'Escudos';
  return `Armaduras ${lista([...tipos, ...(a.escudo ? ['escudos'] : [])])}`;
}
export function textoArmas(c: any) {
  const P = c.wProf, partes: string[] = [];
  if (P.simple) partes.push('sencillas');
  if (P.martial) partes.push(P.light ? 'marciales ligeras' : P.finesseLight ? 'marciales sutiles o ligeras' : 'marciales');
  else if (P.martialDist) partes.push('marciales a distancia');
  const extra = [...c.armasExtra].map((k: string) => ARMAS[k]?.n).filter(Boolean);
  return cap([partes.length ? `Armas ${lista(partes)}` : '', ...extra].filter(Boolean).join(', ')) || 'Ninguna';
}
const lista = (xs: string[]) => xs.length > 1 ? `${xs.slice(0, -1).join(', ')} y ${xs[xs.length - 1]}` : xs[0];

/** Competencia con un arma según lo que tiene el personaje (clase + rasgos). */
export function competenteArma(c: any, k: string) {
  const w = ARMAS[k]; if (!w) return false;
  if (c.armasExtra?.has(k)) return true;
  const P = c.wProf;
  if (w.cat === 'sencilla') return !!P.simple;
  return (!!P.martial && (!P.light || w.p.includes('ligera')) && (!P.finesseLight || w.p.includes('ligera') || w.p.includes('sutil'))) || (!!P.martialDist && !!w.dist);
}
