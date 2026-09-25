/* Texto oficial (en inglés) de una clase, sus subclases y sus opciones (invocaciones, metamagia, maniobras), sacado de
   los datos de 5etools y quedándose con la versión más reciente de cada subclase. Lo usan el encargo para Gemini
   (para que no tenga que buscar) y la revisión de su respuesta (para comparar niveles y libros).
   Los archivos se descargan una vez y quedan en web/.cache/5etools. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const BASE = 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data/';
const CACHE = '.cache/5etools/';

export const CLASE_EN: Record<string, string> = {
  barbaro: 'barbarian', bardo: 'bard', brujo: 'warlock', clerigo: 'cleric', druida: 'druid', explorador: 'ranger',
  guerrero: 'fighter', hechicero: 'sorcerer', mago: 'wizard', monje: 'monk', paladin: 'paladin', picaro: 'rogue',
};
/* Opciones de clase que se eligen de una lista (optionalfeatures de 5etools) */
const OPCIONES: Record<string, { tipo: string; nombre: string }> = {
  brujo: { tipo: 'EI', nombre: 'Invocaciones sobrenaturales' },
  hechicero: { tipo: 'MM', nombre: 'Metamagia' },
  guerrero: { tipo: 'MV:B', nombre: 'Maniobras (Maestro de Batalla)' },
};

/* Libros oficiales con su año; los que no están (Plane Shift, Unearthed Arcana) no cuentan */
export const LIBROS: Record<string, [string, number]> = {
  AU: ['Arcana Unleashed', 2026], RHW: ['Ravenloft: The Horrors Within', 2026], FRHoF: ['Forgotten Realms: Heroes of Faerûn', 2025],
  EFA: ['Eberron: Forge of the Artificer', 2025], XPHB: ['Manual del Jugador', 2024], BGG: ['Bigby Presents: Glory of the Giants', 2023],
  DSotDQ: ['Dragonlance: Shadow of the Dragon Queen', 2022], VRGR: ["Van Richten's Guide to Ravenloft", 2021],
  FTD: ["Fizban's Treasury of Dragons", 2021], TCE: ["Tasha's Cauldron of Everything", 2020], EGW: ["Explorer's Guide to Wildemount", 2020],
  XGE: ["Xanathar's Guide to Everything", 2017], SCAG: ["Sword Coast Adventurer's Guide", 2015], DMG: ['Guía del Dungeon Master', 2014],
  PHB: ['Manual del Jugador', 2014],
};
export const libro = (src: string) => LIBROS[src] ? `${LIBROS[src][0]} (${LIBROS[src][1]})` : src;

async function json(ruta: string) {
  const local = CACHE + ruta.replace(/\//g, '_');
  if (existsSync(local)) return JSON.parse(readFileSync(local, 'utf8'));
  const res = await fetch(BASE + ruta);
  if (!res.ok) throw new Error(`No se pudo descargar ${ruta}: ${res.status}`);
  const texto = await res.text();
  mkdirSync(CACHE, { recursive: true });
  writeFileSync(local, texto);
  return JSON.parse(texto);
}

/* {@spell Misty Step|XPHB} → Misty Step; {@variantrule Bloodied|XPHB|Ensangrentado} → el texto a mostrar */
const sinEtiquetas = (s: string) => {
  let prev = '';
  while (prev !== s) { prev = s; s = s.replace(/\{@(\w+) ([^{}]*)\}/g, (_, tag, x) => { const p = x.split('|'); return tag === 'filter' ? p[0] : p[2] || p[0]; }); }
  return s;
};

export type Rasgo = { n: number; nombre: string; texto: string };
export type SubOficial = { nombre: string; corto: string; fuente: string; libro: string; anio: number; rasgos: Rasgo[] };
export type Oficial = { clase: Rasgo[]; subclases: SubOficial[]; opciones?: { titulo: string; items: { nombre: string; requisito: string; texto: string }[] } };

export async function oficial(clase: string): Promise<Oficial> {
  const en = CLASE_EN[clase];
  if (!en) throw new Error('Clase sin datos oficiales: ' + clase);
  const d = await json(`class/class-${en}.json`);
  const cf = d.classFeature || [], sf = d.subclassFeature || [];

  // Texto plano, resolviendo las referencias a otros rasgos
  const plano = (e: any): string => {
    if (typeof e === 'string') return sinEtiquetas(e);
    if (Array.isArray(e)) return e.map(plano).filter(Boolean).join(' ');
    if (!e || typeof e !== 'object') return '';
    if (e.type === 'refSubclassFeature') { const f = buscarSub(e.subclassFeature); return f ? `[${f.name}] ${plano(f.entries)}` : ''; }
    if (e.type === 'refClassFeature') { const f = buscarClase(e.classFeature); return f ? `[${f.name}] ${plano(f.entries)}` : ''; }
    if (e.type === 'table') return [e.caption, (e.colLabels || []).map(plano).join(' | '), ...(e.rows || []).map((r: any) => (Array.isArray(r) ? r : r.row || []).map(plano).join(' | '))].filter(Boolean).join(' / ');
    return [e.name ? `[${sinEtiquetas(e.name)}]` : '', plano(e.entries || e.items || e.entry || [])].filter(Boolean).join(' ');
  };
  const buscarClase = (ref: string) => {
    const [name, , csrc, lvl, src] = ref.split('|');
    return cf.find((f: any) => f.name === name && (f.classSource || 'PHB') === (csrc || 'PHB') && f.level === +lvl && f.source === (src || csrc || 'PHB'));
  };
  const buscarSub = (ref: string) => {
    const [name, , csrc, corto, ssrc, lvl, src] = ref.split('|');
    return sf.find((f: any) => f.name === name && (f.classSource || 'PHB') === (csrc || 'PHB') && f.subclassShortName === corto
      && (f.subclassSource || 'PHB') === (ssrc || 'PHB') && f.level === +lvl && f.source === (src || ssrc || 'PHB'));
  };

  // Rasgos de la clase 2024
  const C = d.class.find((c: any) => c.source === 'XPHB') || d.class[0];
  const claseRasgos: Rasgo[] = (C.classFeatures || []).map((x: any) => {
    const f = buscarClase(typeof x === 'string' ? x : x.classFeature);
    return f && { n: f.level, nombre: f.name, texto: plano(f.entries) };
  }).filter(Boolean);

  // La versión más reciente de cada subclase (las adaptadas a la clase 2024 primero)
  const porNombre = new Map<string, any>();
  for (const s of d.subclass || []) {
    if (!LIBROS[s.source]) continue;
    const clave = s.shortName.replace(/\s*\(.*\)$/, '');
    const cur = porNombre.get(clave);
    const puntos = (x: any) => (x.classSource === 'XPHB' ? 10000 : 0) + LIBROS[x.source][1];
    if (!cur || puntos(s) > puntos(cur)) porNombre.set(clave, s);
  }
  const subclases: SubOficial[] = [...porNombre.values()].map(s => ({
    nombre: s.name, corto: s.shortName, fuente: s.source, libro: libro(s.source), anio: LIBROS[s.source][1],
    rasgos: (s.subclassFeatures || []).map((ref: string) => { const f = buscarSub(ref); return f && { n: f.level, nombre: f.name, texto: plano(f.entries) }; }).filter(Boolean),
  })).sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Opciones que se eligen de una lista, solo en su versión 2024 o posterior
  let opciones: Oficial['opciones'];
  if (OPCIONES[clase]) {
    const o = await json('optionalfeatures.json');
    const req = (x: any) => (x.prerequisite || []).map((p: any) => [
      p.level && `nivel ${p.level.level ?? p.level}`, p.pact && `Pacto ${p.pact}`,
      p.optionalfeature && `requiere ${p.optionalfeature.map((r: string) => r.split('|')[0]).join(' o ')}`,
      p.otherSummary?.entry, p.spell && `conjuro ${p.spell.map((r: any) => typeof r === 'string' ? sinEtiquetas(`{@spell ${r}}`) : sinEtiquetas(r.entry || r.choose || '')).join(', ')}`,
    ].filter(Boolean).join(', ')).join('; ');
    opciones = { titulo: OPCIONES[clase].nombre, items: o.optionalfeature
      .filter((x: any) => x.featureType.includes(OPCIONES[clase].tipo) && LIBROS[x.source] && LIBROS[x.source][1] >= 2024)
      .map((x: any) => ({ nombre: x.name, requisito: req(x), texto: plano(x.entries) }))
      .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre)) };
  }
  return { clase: claseRasgos, subclases, opciones };
}
