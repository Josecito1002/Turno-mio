/* Bestiario: las estadísticas de los monstruos del Manual de Monstruos 2025 (XMM en 5etools), solo los datos de juego
   (CA, PG, características, ataques, daños, CD...). Los nombres y textos en español los pone después un lote de
   Gemini (`npm run gemini:encargo-bestiario`); mientras tanto los nombres quedan en inglés y sin texto.
   Uso: npm run bestiario:base   →   src/features/reglas/data/generadas/bestiario.ts
   Si ya hay nombres o textos en español en ese archivo (de un lote aplicado), se conservan. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { json, sinEtiquetas } from './gemini/oficial';
import type { Monstruo, AccionMonstruo } from '../src/features/reglas/data/bestiario';

const DESTINO = 'src/features/reglas/data/generadas/bestiario.ts';

const TAM: Record<string, string> = { T: 'Diminuto', S: 'Pequeño', M: 'Mediano', L: 'Grande', H: 'Enorme', G: 'Gargantuesco' };
const TIPO: Record<string, string> = { aberration: 'Aberración', beast: 'Bestia', celestial: 'Celestial', construct: 'Constructo', dragon: 'Dragón',
  elemental: 'Elemental', fey: 'Feérico', fiend: 'Infernal', giant: 'Gigante', humanoid: 'Humanoide', monstrosity: 'Monstruosidad',
  ooze: 'Cieno', plant: 'Planta', undead: 'Muerto viviente' };
const DANO: Record<string, string> = { acid: 'ácido', bludgeoning: 'contundente', cold: 'frío', fire: 'fuego', force: 'fuerza', lightning: 'relámpago',
  necrotic: 'necrótico', piercing: 'perforante', poison: 'veneno', psychic: 'psíquico', radiant: 'radiante', slashing: 'cortante', thunder: 'trueno' };
const COND: Record<string, string> = { blinded: 'cegado', charmed: 'hechizado', deafened: 'ensordecido', exhaustion: 'agotamiento', frightened: 'asustado',
  grappled: 'agarrado', incapacitated: 'incapacitado', invisible: 'invisible', paralyzed: 'paralizado', petrified: 'petrificado', poisoned: 'envenenado',
  prone: 'derribado', restrained: 'apresado', stunned: 'aturdido', unconscious: 'inconsciente' };
const HAB: Record<string, string> = { acrobatics: 'Acrobacias', arcana: 'Arcanos', athletics: 'Atletismo', deception: 'Engaño', history: 'Historia',
  performance: 'Interpretación', intimidation: 'Intimidación', investigation: 'Investigación', 'sleight of hand': 'Juego de Manos', medicine: 'Medicina',
  nature: 'Naturaleza', perception: 'Percepción', insight: 'Perspicacia', persuasion: 'Persuasión', religion: 'Religión', stealth: 'Sigilo',
  survival: 'Supervivencia', 'animal handling': 'Trato con Animales' };
const AB: Record<string, string> = { str: 'fue', dex: 'des', con: 'con', int: 'int', wis: 'sab', cha: 'car' };
const SENT: Record<string, string> = { darkvision: 'Visión en la oscuridad', blindsight: 'Vista ciega', truesight: 'Visión verdadera', tremorsense: 'Sentido de la vibración' };
const VEL: Record<string, string> = { walk: '', fly: 'volar', swim: 'nadar', climb: 'trepar', burrow: 'excavar' };
const XP: Record<string, number> = { '0': 10, '1/8': 25, '1/4': 50, '1/2': 100, '1': 200, '2': 450, '3': 700, '4': 1100, '5': 1800, '6': 2300, '7': 2900, '8': 3900,
  '9': 5000, '10': 5900, '11': 7200, '12': 8400, '13': 10000, '14': 11500, '15': 13000, '16': 15000, '17': 18000, '18': 20000, '19': 22000, '20': 25000,
  '21': 33000, '22': 41000, '23': 50000, '24': 62000, '25': 75000, '26': 90000, '27': 105000, '28': 120000, '29': 135000, '30': 155000 };

const slug = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const valorCr = (cr: string) => cr.includes('/') ? 1 / +cr.split('/')[1] : +cr;
const pbDe = (cr: string) => Math.max(2, Math.floor((Math.max(1, valorCr(cr)) - 1) / 4) + 2);
const mod = (n: number) => Math.floor((n - 10) / 2);
const lista = (xs: any[] | undefined, dic: Record<string, string>): string | undefined => {
  if (!xs?.length) return undefined;
  return xs.map(x => typeof x === 'string' ? dic[x] || x : x.special ? sinEtiquetas(x.special)
    : [lista(x.immune || x.resist || x.vulnerable || x.conditionImmune, dic), x.note && sinEtiquetas(x.note)].filter(Boolean).join(' ')).join(', ');
};

/** Lo que se puede tirar de una acción: ataque, alcance, daños y salvación. El texto lo escribe Gemini. */
const nombre = (s: string) => sinEtiquetas(s.replace(/\{@recharge(?: (\d))?\}/g, (_, n) => n && n !== '6' ? `(Recarga ${n}–6)` : '(Recarga 6)'));
function accion(a: any): AccionMonstruo {
  const crudo = JSON.stringify(a.entries || []);
  const r: AccionMonstruo = { en: nombre(a.name), n: nombre(a.name) };
  const hit = crudo.match(/\{@hit (-?\d+)\}/); if (hit) r.atk = +hit[1];
  const alc = crudo.match(/reach (\d+) ft\./); if (alc) r.alcance = `${alc[1]} pies`;
  const ran = crudo.match(/range (\d+(?:\/\d+)?) ft\./); if (ran) r.alcance = (r.alcance ? r.alcance + ' o ' : '') + `${ran[1]} pies`;
  const danos = [...crudo.matchAll(/\{@damage ([^}]+)\}\)? (\w+) damage/g)].map(m => ({ d: m[1].replace(/\s+/g, ''), tipo: DANO[m[2].toLowerCase()] || m[2].toLowerCase() }));
  if (danos.length) r.dano = danos;
  const cd = crudo.match(/\{@dc (\d+)\}/), salv = crudo.match(/\{@actSave (\w+)\}/);
  if (cd) r.cd = +cd[1];
  if (salv) r.salv = AB[salv[1]] || salv[1];
  return r;
}

function conjuros(sc: any[] | undefined) {
  if (!sc?.length) return undefined;
  return sc.map(s => {
    const grupos: string[] = [];
    if (s.will) grupos.push('A voluntad: ' + s.will.map(sinEtiquetas).join(', '));
    for (const [k, v] of Object.entries<any>(s.daily || {})) grupos.push(`${k.replace('e', '')}/día${k.endsWith('e') ? ' cada uno' : ''}: ` + v.map(sinEtiquetas).join(', '));
    const cd = JSON.stringify(s.headerEntries || []).match(/\{@dc (\d+)\}/), atk = JSON.stringify(s.headerEntries || []).match(/\{@hit (\d+)\}/);
    return { en: sinEtiquetas(s.name), n: sinEtiquetas(s.name), como: s.displayAs || 'action', ab: AB[s.ability] || s.ability, cd: cd ? +cd[1] : undefined, atk: atk ? +atk[1] : undefined, lista: grupos };
  });
}

function monstruo(x: any): [string, Monstruo] {
  const cr = typeof x.cr === 'string' ? x.cr : x.cr?.cr || '0', pb = pbDe(cr);
  const ab = { fue: x.str, des: x.dex, con: x.con, int: x.int, sab: x.wis, car: x.cha };
  const ca = typeof x.ac[0] === 'number' ? x.ac[0] : x.ac[0].ac;
  const salv = x.save && Object.fromEntries(Object.entries<string>(x.save).map(([k, v]) => [AB[k], parseInt(v)]));
  const habs = x.skill && Object.fromEntries(Object.entries<string>(x.skill).filter(([k]) => HAB[k]).map(([k, v]) => [HAB[k], parseInt(v)]));
  const vel = Object.entries<any>(x.speed).filter(([k]) => VEL[k] !== undefined)
    .map(([k, v]) => `${VEL[k] ? VEL[k] + ' ' : ''}${typeof v === 'number' ? v : v.number} pies${v?.condition ? ' ' + sinEtiquetas(v.condition).replace('(hover)', '(levitar)') : ''}`).join(', ') + (x.speed.canHover ? ' (levitar)' : '');
  const sentidos = [...(x.senses || []).map((s: string) => { const m = sinEtiquetas(s).match(/^(\w+) (\d+) ft\.(.*)$/); return m ? `${SENT[m[1].toLowerCase()] || m[1]} ${m[2]} pies${m[3]}` : sinEtiquetas(s); }), `Percepción pasiva ${x.passive}`].join('; ');
  const tipo0 = typeof x.type === 'string' ? x.type : x.type.type;
  const tipo = typeof tipo0 === 'string' ? TIPO[tipo0] || tipo0 : (tipo0.choose || []).map((t: string) => TIPO[t] || t).join(' o ');
  const t = (k: string) => (x[k] || []).map(accion);
  const m: Monstruo = {
    n: x.name, en: x.name, tam: x.size.map((s: string) => TAM[s] || s).join(' o '), tipo,
    ca, pg: x.hp.average ?? 1, pgF: x.hp.formula || '', vel, ab,
    ...(salv ? { salv } : {}), ...(habs && Object.keys(habs).length ? { habs } : {}),
    sentidos, ...(x.languages ? { idiomas: x.languages.map(sinEtiquetas).join(', ') } : {}),
    cr, xp: XP[cr] ?? 0, pb, ini: mod(x.dex) + (x.initiative?.proficiency ? x.initiative.proficiency * pb : 0),
    ...(lista(x.immune, DANO) ? { inmune: lista(x.immune, DANO) } : {}), ...(lista(x.resist, DANO) ? { resist: lista(x.resist, DANO) } : {}),
    ...(lista(x.vulnerable, DANO) ? { vuln: lista(x.vulnerable, DANO) } : {}), ...(lista(x.conditionImmune, COND) ? { condInmune: lista(x.conditionImmune, COND) } : {}),
    ...(x.trait ? { rasgos: t('trait') } : {}), acciones: t('action'),
    ...(x.bonus ? { adicionales: t('bonus') } : {}), ...(x.reaction ? { reacciones: t('reaction') } : {}), ...(x.legendary ? { legendarias: t('legendary') } : {}),
    ...(conjuros(x.spellcasting) ? { conjuros: conjuros(x.spellcasting) } : {}),
    ...(x.environment ? { entornos: x.environment } : {}), ...(x.group ? { grupo: x.group[0] } : {}),
  };
  return [slug(x.name), m];
}

/** Lo que ya tradujo un lote aplicado: nombres y textos, por clave */
function anteriores(): Record<string, any> {
  if (!existsSync(DESTINO)) return {};
  const s = readFileSync(DESTINO, 'utf8'), i = s.indexOf('= {');
  try { return JSON.parse(s.slice(i + 2, s.lastIndexOf('}') + 1)); } catch { return {}; }
}
function conservar(nuevo: Monstruo, viejo: any) {
  if (!viejo) return nuevo;
  const textos = (a: AccionMonstruo[] | undefined, b: any[] | undefined) => a?.map(x => { const o = b?.find(y => y.en === x.en); return o ? { ...x, n: o.n, ...(o.t ? { t: o.t } : {}) } : x; });
  return { ...nuevo, n: viejo.n || nuevo.n, ...(viejo.texto ? { texto: viejo.texto } : {}),
    rasgos: textos(nuevo.rasgos, viejo.rasgos), acciones: textos(nuevo.acciones, viejo.acciones)!, adicionales: textos(nuevo.adicionales, viejo.adicionales),
    reacciones: textos(nuevo.reacciones, viejo.reacciones), legendarias: textos(nuevo.legendarias, viejo.legendarias),
    conjuros: nuevo.conjuros?.map(x => { const o = viejo.conjuros?.find((y: any) => y.en === x.en); return o ? { ...x, n: o.n } : x; }) };
}

(async () => {
  const d = await json('bestiary/bestiary-xmm.json');
  const viejos = anteriores();
  const todos = Object.fromEntries(d.monster.filter((x: any) => !x._copy).map(monstruo).map(([k, m]: [string, Monstruo]) => [k, JSON.parse(JSON.stringify(conservar(m, viejos[k])))])
    .sort((a: any, b: any) => a[0].localeCompare(b[0])));
  writeFileSync(DESTINO, `/* Generado por scripts/bestiario-base.ts con las estadísticas del Manual de Monstruos 2025. No editar a mano:
   los nombres y textos en español vienen de los lotes de Gemini (se conservan al regenerar). */
import type { Monstruo } from '../bestiario';

export const BESTIARIO_GENERADO: Record<string, Monstruo> = ${JSON.stringify(todos, null, 0).replace(/\},"/g, '},\n"')};
`);
  console.log(`${DESTINO}: ${Object.keys(todos).length} monstruos`);
})();
