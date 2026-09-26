/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Biblioteca } from './biblioteca';

/* Convierte la biblioteca en memoria (LIB) en filas de la base y viceversa.
   Lo que no tiene columna propia va a `extra`, así el viaje de ida y vuelta no pierde nada. */

type Fila = Record<string, any>;
const v = (x: unknown) => (x === undefined ? null : x);
const resto = (o: any, conocidas: string[]) => {
  const e: Fila = {};
  for (const k of Object.keys(o || {})) if (!conocidas.includes(k) && o[k] !== undefined) e[k] = o[k];
  return Object.keys(e).length ? e : null;
};
const RASGO = ['nombre', 't', 'texto', 'n', 'usos', 'reset', 'sub'];
const CLASE = ['n', 'lib', 'src', 'dado', 'sv', 'habN', 'habs', 'arm', 'armas', 'w', 'lanz', 'caster', 'slotsTabla', 'recursosTabla', 'asi', 'estilo', 'estilos', 'maestrias', 'hasta', 'rasgos', 'subclases', 'rasgosAltos', 'subAltos'];
const ESPECIE = ['n', 'lib', 'src', 'r', 'vel', 'vision', 'subL', 'subs', 'rasgos'];
const TRASFONDO = ['n', 'lib', 'ab', 'habs', 'herr', 'dote'];
const DOTE = ['n', 't', 'texto', 'cat', 'nivelMin'];
const CONJURO = ['nombre', 'nivel', 'tiempo', 'alcance', 'dur', 'conc', 'ritual', 'salv', 'ataque', 'dados', 'desc', 'clases'];
export const TIPOS_EXTRA = ['desc', 'img', 'imgOrig', 'imgCrop', 'tipos'] as const;
/** Imágenes: se guardan de a una (guardarExtras), no con toda la biblioteca, que si no pesaría demasiado para el servidor. */
export const TIPOS_MEDIA: readonly string[] = ['img', 'imgOrig', 'imgCrop'];

export type FilasBiblioteca = {
  clases: Fila[]; subclases: Fila[]; especies: Fila[]; subespecies: Fila[]; rasgos: Fila[];
  dotes: Fila[]; trasfondos: Fila[]; conjuros: Fila[]; conjuroClases: Fila[]; libExtra: Fila[];
};

export function libAFilas(lib: Biblioteca): FilasBiblioteca {
  const f: FilasBiblioteca = { clases: [], subclases: [], especies: [], subespecies: [], rasgos: [], dotes: [], trasfondos: [], conjuros: [], conjuroClases: [], libExtra: [] };
  const rasgo = (base: Fila, r: any, i: number) => ({
    ...base, orden: i, nombre: String(r.nombre ?? 'Rasgo'), tipo: r.t || 'pasiva', texto: typeof r.texto === 'string' ? r.texto : '',
    nivel: r.n == null || r.n === '' ? null : +r.n, usos: v(r.usos), descanso: v(r.reset), subespecie: base.subespecie ?? null, extra: resto(r, RASGO),
  });

  for (const [id, c] of Object.entries<any>(lib.clases || {})) {
    f.clases.push({
      id, nombre: v(c.n), esLib: !!c.lib, fuente: v(c.src), dadoGolpe: v(c.dado), salvaciones: v(c.sv), numHabilidades: v(c.habN),
      habilidades: v(c.habs), armaduras: v(c.arm), armas: v(c.armas), competenciaArmas: v(c.w), atributoConjuros: v(c.lanz),
      tipoLanzador: v(c.caster), tablaEspacios: v(c.slotsTabla), tablaRecursos: v(c.recursosTabla), nivelesAsi: v(c.asi),
      nivelEstilo: v(c.estilo), estilos: v(c.estilos), maestrias: v(c.maestrias), hastaNivel: v(c.hasta), extra: resto(c, CLASE),
    });
    (c.rasgos || []).forEach((r: any, i: number) => f.rasgos.push(rasgo({ origen: 'clase', claseId: id }, r, i)));
    (c.rasgosAltos || []).forEach((r: any, i: number) => f.rasgos.push(rasgo({ origen: 'clase_alto', claseId: id }, r, i)));
    for (const [sk, s] of Object.entries<any>(c.subclases || {})) {
      f.subclases.push({ claseId: id, clave: sk, nombre: String(s.n ?? sk), extra: resto(s, ['n', 'rasgos']) });
      (s.rasgos || []).forEach((r: any, i: number) => f.rasgos.push(rasgo({ origen: 'subclase', claseId: id, subclase: sk }, r, i)));
    }
    for (const [sk, lista] of Object.entries<any>(c.subAltos || {})) {
      (lista || []).forEach((r: any, i: number) => f.rasgos.push(rasgo({ origen: 'subclase_alto', claseId: id, subclase: sk }, r, i)));
    }
  }

  for (const [id, e] of Object.entries<any>(lib.especies || {})) {
    f.especies.push({
      id, nombre: String(e.n ?? id), esLib: !!e.lib, fuente: v(e.src), resumen: v(e.r), velocidad: +e.vel || 30,
      vision: +e.vision || 0, etiquetaSub: v(e.subL), extra: resto(e, ESPECIE),
    });
    for (const [sk, s] of Object.entries<any>(e.subs || {})) f.subespecies.push({ especieId: id, clave: sk, nombre: String(s.n ?? sk), extra: resto(s, ['n']) });
    (e.rasgos || []).forEach((r: any, i: number) => f.rasgos.push(rasgo({ origen: 'especie', especieId: id, subespecie: v(r.sub) }, r, i)));
  }

  for (const [id, t] of Object.entries<any>(lib.dotes || {})) {
    f.dotes.push({ id, nombre: String(t.n ?? id), tipo: t.t || 'pasiva', texto: typeof t.texto === 'string' ? t.texto : '', categoria: t.cat || '', nivelMin: +t.nivelMin || 1, extra: resto(t, DOTE) });
  }
  for (const [id, t] of Object.entries<any>(lib.trasfondos || {})) {
    f.trasfondos.push({ id, nombre: String(t.n ?? id), esLib: !!t.lib, atributos: t.ab || [], habilidades: t.habs || [], herramientas: t.herr || '', doteId: t.dote || null, extra: resto(t, TRASFONDO) });
  }
  for (const [id, s] of Object.entries<any>(lib.conjuros || {})) {
    f.conjuros.push({
      id, nombre: String(s.nombre ?? id), nivel: +s.nivel || 0, tiempo: s.tiempo || 'accion', alcance: s.alcance || '', duracion: s.dur || '',
      concentracion: !!s.conc, ritual: !!s.ritual, salvacion: s.salv || '', ataque: !!s.ataque, dados: s.dados || '', descripcion: s.desc || '', extra: resto(s, CONJURO),
    });
    for (const cl of new Set<string>(s.clases || [])) f.conjuroClases.push({ conjuroId: id, claseId: cl });
  }
  for (const tipo of TIPOS_EXTRA) {
    for (const [clave, valor] of Object.entries((lib as any)[tipo] || {})) if (valor != null) f.libExtra.push({ tipo, clave, valor });
  }
  return f;
}

/** Forma que devuelven el repositorio y la query `biblioteca` de GraphQL. */
export type BibliotecaAnidada = {
  clases: (Fila & { subclases: Fila[]; rasgos: Fila[] })[];
  especies: (Fila & { subespecies: Fila[]; rasgos: Fila[] })[];
  trasfondos: Fila[]; dotes: Fila[];
  conjuros: (Fila & { clases: string[] })[];
  libExtra: Fila[];
};

/** Algunos conjuros importados traen la descripción dos veces (en pies y en metros) unida por ".,": se deja la primera. */
export function sinDuplicado(desc: string) {
  if (typeof desc !== 'string') return desc;
  const inicio = desc.slice(0, 30);
  for (let i = desc.indexOf('.,'); i >= 0; i = desc.indexOf('.,', i + 1)) if (desc.slice(i + 2, i + 32) === inicio) return desc.slice(0, i + 1);
  return desc;
}

export function filasALib(data: BibliotecaAnidada): Biblioteca {
  const LIB: any = { clases: {}, especies: {}, trasfondos: {}, dotes: {}, conjuros: {} };
  const rasgo = (r: Fila) => {
    const o: Fila = { nombre: r.nombre, t: r.tipo, texto: r.texto };
    if (r.nivel != null) o.n = r.nivel;
    if (r.usos != null) o.usos = r.usos;
    if (r.descanso != null) o.reset = r.descanso;
    if (r.subespecie != null) o.sub = r.subespecie;
    return { ...o, ...(r.extra || {}) };
  };

  for (const c of data.clases) {
    const o: Fila = {};
    if (c.dadoGolpe != null) {
      Object.assign(o, {
        n: c.nombre, lib: c.esLib, src: c.fuente, dado: c.dadoGolpe, sv: c.salvaciones, habN: c.numHabilidades, habs: c.habilidades,
        arm: c.armaduras, armas: c.armas, w: c.competenciaArmas, lanz: c.atributoConjuros, caster: c.tipoLanzador,
        slotsTabla: c.tablaEspacios, recursosTabla: c.tablaRecursos, asi: c.nivelesAsi, estilo: c.nivelEstilo, estilos: c.estilos,
        maestrias: c.maestrias, hasta: c.hastaNivel,
      });
    }
    Object.assign(o, c.extra || {});
    const de = (origen: string) => c.rasgos.filter(r => r.origen === origen).sort((a, b) => a.orden - b.orden);
    if (de('clase').length) o.rasgos = de('clase').map(rasgo);
    o.subclases = {};
    for (const s of c.subclases) {
      o.subclases[s.clave] = { n: s.nombre, ...(s.extra || {}), rasgos: de('subclase').filter(r => r.subclase === s.clave).map(rasgo) };
    }
    if (de('clase_alto').length) o.rasgosAltos = de('clase_alto').map(rasgo);
    for (const r of de('subclase_alto')) {
      o.subAltos = o.subAltos || {};
      (o.subAltos[r.subclase] = o.subAltos[r.subclase] || []).push(rasgo(r));
    }
    LIB.clases[c.id] = o;
  }

  for (const e of data.especies) {
    LIB.especies[e.id] = {
      n: e.nombre, lib: e.esLib, src: e.fuente, r: e.resumen, vel: e.velocidad, vision: e.vision, subL: e.etiquetaSub,
      subs: e.subespecies.length ? Object.fromEntries(e.subespecies.map(s => [s.clave, { n: s.nombre, ...(s.extra || {}) }])) : null,
      rasgos: [...e.rasgos].sort((a, b) => a.orden - b.orden).map(rasgo),
      ...(e.extra || {}),
    };
  }
  for (const t of data.trasfondos) {
    LIB.trasfondos[t.id] = { n: t.nombre, lib: t.esLib, ab: t.atributos, habs: t.habilidades, herr: t.herramientas, dote: t.doteId || '', ...(t.extra || {}) };
  }
  for (const t of data.dotes) {
    LIB.dotes[t.id] = { n: t.nombre, t: t.tipo, texto: t.texto, cat: t.categoria, nivelMin: t.nivelMin, ...(t.extra || {}) };
  }
  for (const s of data.conjuros) {
    LIB.conjuros[s.id] = {
      nombre: s.nombre, nivel: s.nivel, tiempo: s.tiempo, alcance: s.alcance, dur: s.duracion, conc: s.concentracion, ritual: s.ritual,
      salv: s.salvacion, ataque: s.ataque, dados: s.dados, desc: sinDuplicado(s.descripcion), clases: s.clases, ...(s.extra || {}),
    };
  }
  for (const x of data.libExtra || []) (LIB[x.tipo] = LIB[x.tipo] || {})[x.clave] = x.valor;
  return LIB;
}
