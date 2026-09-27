/* eslint-disable @typescript-eslint/no-explicit-any */
import { norm } from '@/shared/utils/texto';

/* Criaturas que acompañan al personaje (familiares y muertos vivientes), con sus estadísticas de la versión 2024
   (Manual del Jugador 2024, apéndice de criaturas, y Manual de Monstruos 2024). Los textos son propios.
   Cada acción con `atk` se tira como un ataque; `dmg` es la expresión de daño y `tipo` su tipo. */

export interface AccionCriatura { n: string; atk?: number; dmg?: string; tipo?: string; texto?: string }
export interface Criatura {
  n: string; tipo: string; ca: number; pg: string; pgMedia: number; vel: string;
  ab: { fue: number; des: number; con: number; int: number; sab: number; car: number };
  salv?: Record<string, number>; habs?: Record<string, number>; sentidos: string; inmune?: string; vulnerable?: string;
  rasgos?: [string, string][]; acciones: AccionCriatura[];
  /** De dónde sale: el conjuro que la crea */
  de: 'familiar' | 'muerto';
  /** Forma especial del Pacto de la Cadena */
  cadena?: boolean;
  /** Estadísticas escritas sin el libro a mano: falta compararlas */
  porConfirmar?: boolean;
}

const bestia = 'Bestia diminuta (o celestial, feérica o infernal, a tu elección)';

export const CRIATURAS: Record<string, Criatura> = {
  murcielago: { n: 'Murciélago', tipo: bestia, ca: 12, pg: '1d4-1', pgMedia: 1, vel: '5 pies, volar 30 pies',
    ab: { fue: 2, des: 15, con: 8, int: 2, sab: 12, car: 4 }, sentidos: 'Vista ciega 60 pies; Percepción pasiva 11', de: 'familiar',
    acciones: [{ n: 'Mordisco', atk: 4, dmg: '1', tipo: 'perforante' }] },
  gato: { n: 'Gato', tipo: bestia, ca: 12, pg: '1d4', pgMedia: 2, vel: '40 pies, trepar 40 pies',
    ab: { fue: 3, des: 15, con: 10, int: 3, sab: 12, car: 7 }, habs: { Percepción: 3, Sigilo: 4 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 13', de: 'familiar',
    rasgos: [['Saltarín', 'Salta su distancia completa sin necesidad de carrerilla.']],
    acciones: [{ n: 'Arañazo', atk: 4, dmg: '1', tipo: 'cortante' }] },
  rana: { n: 'Rana', tipo: bestia, ca: 11, pg: '1d4-1', pgMedia: 1, vel: '20 pies, nadar 20 pies',
    ab: { fue: 1, des: 13, con: 8, int: 1, sab: 8, car: 3 }, habs: { Percepción: 1, Sigilo: 3 }, sentidos: 'Visión en la oscuridad 30 pies; Percepción pasiva 11', de: 'familiar',
    rasgos: [['Anfibia', 'Respira aire y agua.'], ['Salto sin carrerilla', 'Salta hasta 10 pies de largo y 5 de alto, con o sin carrerilla.']],
    acciones: [{ n: 'Mordisco', atk: 3, dmg: '1', tipo: 'perforante' }] },
  halcon: { n: 'Halcón', tipo: bestia, ca: 13, pg: '1d4-1', pgMedia: 1, vel: '10 pies, volar 60 pies',
    ab: { fue: 5, des: 16, con: 8, int: 2, sab: 14, car: 6 }, habs: { Percepción: 6 }, sentidos: 'Percepción pasiva 16', de: 'familiar',
    acciones: [{ n: 'Garras', atk: 5, dmg: '1', tipo: 'cortante' }] },
  lagarto: { n: 'Lagarto', tipo: bestia, ca: 10, pg: '1d4', pgMedia: 2, vel: '20 pies, trepar 20 pies',
    ab: { fue: 2, des: 11, con: 10, int: 1, sab: 8, car: 3 }, sentidos: 'Visión en la oscuridad 30 pies; Percepción pasiva 9', de: 'familiar',
    rasgos: [['Trepar como araña', 'Trepa por superficies difíciles, incluso bocabajo por el techo, sin pruebas.']],
    acciones: [{ n: 'Mordisco', atk: 2, dmg: '1', tipo: 'perforante' }] },
  pulpo: { n: 'Pulpo', tipo: bestia, ca: 12, pg: '1d4-1', pgMedia: 1, vel: '5 pies, nadar 30 pies',
    ab: { fue: 4, des: 15, con: 11, int: 3, sab: 10, car: 4 }, habs: { Percepción: 2, Sigilo: 6 }, sentidos: 'Visión en la oscuridad 30 pies; Percepción pasiva 12', de: 'familiar',
    rasgos: [['Respirar bajo el agua', 'Solo respira bajo el agua.'], ['Compresión', 'Pasa por un hueco de 1 pulgada sin gastar movimiento extra.']],
    acciones: [{ n: 'Tentáculos', atk: 4, dmg: '1', tipo: 'contundente' },
      { n: 'Nube de tinta (1 vez por descanso)', texto: 'Bajo el agua, con una reacción al recibir daño, suelta tinta en 5 pies alrededor (oscuridad total un minuto) y nada hasta su velocidad.' }] },
  buho: { n: 'Búho', tipo: bestia, ca: 11, pg: '1d4-1', pgMedia: 1, vel: '5 pies, volar 60 pies',
    ab: { fue: 3, des: 13, con: 8, int: 2, sab: 12, car: 7 }, habs: { Percepción: 5, Sigilo: 5 }, sentidos: 'Visión en la oscuridad 120 pies; Percepción pasiva 15', de: 'familiar',
    rasgos: [['Vuelo rasante', 'Al salir volando del alcance de un enemigo no provoca ataques de oportunidad.']],
    acciones: [{ n: 'Garras', atk: 3, dmg: '1', tipo: 'cortante' }] },
  rata: { n: 'Rata', tipo: bestia, ca: 10, pg: '1d4-1', pgMedia: 1, vel: '20 pies, trepar 20 pies',
    ab: { fue: 2, des: 11, con: 9, int: 2, sab: 10, car: 4 }, habs: { Percepción: 2 }, sentidos: 'Visión en la oscuridad 30 pies; Percepción pasiva 12', de: 'familiar',
    acciones: [{ n: 'Mordisco', atk: 2, dmg: '1', tipo: 'perforante' }] },
  cuervo: { n: 'Cuervo', tipo: bestia, ca: 12, pg: '1d4', pgMedia: 2, vel: '10 pies, volar 50 pies',
    ab: { fue: 2, des: 14, con: 10, int: 5, sab: 13, car: 6 }, habs: { Percepción: 3 }, sentidos: 'Percepción pasiva 13', de: 'familiar',
    rasgos: [['Imitación', 'Imita sonidos y voces que haya oído; quien lo escucha lo descubre con una prueba de Perspicacia (CD 10).']],
    acciones: [{ n: 'Pico', atk: 4, dmg: '1', tipo: 'perforante' }] },
  arana: { n: 'Araña', tipo: bestia, ca: 12, pg: '1d4-1', pgMedia: 1, vel: '20 pies, trepar 20 pies',
    ab: { fue: 2, des: 14, con: 8, int: 1, sab: 10, car: 2 }, habs: { Sigilo: 4 }, sentidos: 'Visión en la oscuridad 30 pies; Percepción pasiva 10', de: 'familiar',
    rasgos: [['Trepar como araña', 'Trepa por superficies difíciles, incluso bocabajo por el techo, sin pruebas.'], ['Andar por telarañas', 'Ignora las restricciones de movimiento de las telarañas y sabe dónde está quien las toca.']],
    acciones: [{ n: 'Mordisco', atk: 4, dmg: '1+1d4', tipo: 'perforante y veneno' }] },
  comadreja: { n: 'Comadreja', tipo: bestia, ca: 13, pg: '1d4-1', pgMedia: 1, vel: '30 pies, trepar 30 pies',
    ab: { fue: 3, des: 16, con: 8, int: 2, sab: 12, car: 3 }, habs: { Acrobacias: 5, Percepción: 3, Sigilo: 5 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 13', de: 'familiar',
    acciones: [{ n: 'Mordisco', atk: 5, dmg: '1', tipo: 'perforante' }] },

  /* Formas especiales del Pacto de la Cadena (Manual del Jugador 2024). Por confirmar contra el libro. */
  diablillo: { n: 'Diablillo', tipo: 'Infernal diminuto', ca: 13, pg: '6d4+6', pgMedia: 21, vel: '20 pies, volar 40 pies', cadena: true, porConfirmar: true,
    ab: { fue: 6, des: 17, con: 13, int: 11, sab: 12, car: 14 }, habs: { Engaño: 4, Perspicacia: 3, Sigilo: 5 }, sentidos: 'Visión en la oscuridad 120 pies; Percepción pasiva 11', de: 'familiar',
    inmune: 'Fuego, veneno; Envenenado', rasgos: [['Resistencia mágica', 'Ventaja en las salvaciones contra conjuros y efectos mágicos.'], ['Cambiar de forma', 'Con una acción se convierte en rata, cuervo o araña, o vuelve a su forma.'], ['Invisibilidad', 'Con una acción se vuelve invisible hasta que ataca o pierde la concentración.']],
    acciones: [{ n: 'Aguijón', atk: 5, dmg: '1d6+3+2d6', tipo: 'perforante y veneno' }] },
  pseudodragon: { n: 'Pseudodragón', tipo: 'Dragón diminuto', ca: 14, pg: '3d4+3', pgMedia: 10, vel: '15 pies, volar 60 pies', cadena: true, porConfirmar: true,
    ab: { fue: 6, des: 15, con: 13, int: 10, sab: 12, car: 10 }, habs: { Percepción: 5, Sigilo: 4 }, sentidos: 'Vista ciega 10 pies, visión en la oscuridad 60 pies; Percepción pasiva 15', de: 'familiar',
    rasgos: [['Resistencia mágica', 'Ventaja en las salvaciones contra conjuros y efectos mágicos.']],
    acciones: [{ n: 'Mordisco (dos por turno)', atk: 4, dmg: '1d4+2', tipo: 'perforante' },
      { n: 'Aguijón', texto: 'Una criatura a 5 pies hace una salvación de CON (CD 12) o queda Envenenada una hora; si falla por 5 o más, queda inconsciente mientras dure.' }] },
  quasit: { n: 'Quasit', tipo: 'Infernal diminuto (demonio)', ca: 13, pg: '10d4', pgMedia: 25, vel: '40 pies', cadena: true, porConfirmar: true,
    ab: { fue: 5, des: 17, con: 10, int: 7, sab: 10, car: 10 }, habs: { Sigilo: 5 }, sentidos: 'Visión en la oscuridad 120 pies; Percepción pasiva 10', de: 'familiar',
    inmune: 'Veneno; Envenenado', rasgos: [['Resistencia mágica', 'Ventaja en las salvaciones contra conjuros y efectos mágicos.'], ['Cambiar de forma', 'Con una acción se convierte en murciélago, ciempiés o sapo, o vuelve a su forma.'], ['Invisibilidad', 'Con una acción se vuelve invisible hasta que ataca o pierde la concentración.']],
    acciones: [{ n: 'Desgarrar', atk: 5, dmg: '1d4+3', tipo: 'cortante (y el objetivo queda Envenenado hasta el inicio del siguiente turno del quasit)' }] },
  duendecillo: { n: 'Duendecillo', tipo: 'Feérico diminuto', ca: 15, pg: '4d4', pgMedia: 10, vel: '10 pies, volar 40 pies', cadena: true, porConfirmar: true,
    ab: { fue: 3, des: 18, con: 10, int: 14, sab: 13, car: 11 }, habs: { Percepción: 3, Sigilo: 8 }, sentidos: 'Percepción pasiva 13', de: 'familiar',
    acciones: [{ n: 'Espada aguja', atk: 6, dmg: '1d4+4', tipo: 'perforante' },
      { n: 'Visión del corazón', texto: 'Toca a una criatura y sabe su estado emocional; si falla una salvación de CAR, también su alineamiento.' },
      { n: 'Invisibilidad', texto: 'Se vuelve invisible hasta que ataca o pierde la concentración.' }] },
  'serpiente-venenosa': { n: 'Serpiente venenosa', tipo: 'Bestia diminuta', ca: 12, pg: '2d4', pgMedia: 5, vel: '30 pies, nadar 30 pies', cadena: true, porConfirmar: true,
    ab: { fue: 2, des: 15, con: 11, int: 1, sab: 10, car: 3 }, sentidos: 'Vista ciega 10 pies; Percepción pasiva 10', de: 'familiar',
    acciones: [{ n: 'Mordisco', atk: 4, dmg: '1d4+2+1d6', tipo: 'perforante y veneno' }] },
  'esfinge-maravillas': { n: 'Esfinge de las maravillas', tipo: 'Celestial diminuto', ca: 13, pg: '7d4+7', pgMedia: 24, vel: '20 pies, volar 40 pies', cadena: true, porConfirmar: true,
    ab: { fue: 6, des: 17, con: 13, int: 15, sab: 12, car: 11 }, habs: { Arcanos: 4, Religión: 4, Sigilo: 5 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 11', de: 'familiar',
    rasgos: [['Resistencia mágica', 'Ventaja en las salvaciones contra conjuros y efectos mágicos.']],
    acciones: [{ n: 'Garras', atk: 5, dmg: '1d4+3+2d6', tipo: 'cortante y radiante' }] },
  'renacuajo-slaad': { n: 'Renacuajo de slaad', tipo: 'Aberración diminuta', ca: 12, pg: '3d4', pgMedia: 7, vel: '30 pies, excavar 10 pies', cadena: true, porConfirmar: true,
    ab: { fue: 7, des: 15, con: 10, int: 3, sab: 5, car: 3 }, habs: { Sigilo: 4 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 7', de: 'familiar',
    rasgos: [['Resistencia mágica', 'Ventaja en las salvaciones contra conjuros y efectos mágicos.']],
    acciones: [{ n: 'Mordisco', atk: 4, dmg: '1d6+2', tipo: 'perforante' }] },
  'esqueleto-cadena': { n: 'Esqueleto (familiar)', tipo: 'Muerto viviente mediano', ca: 13, pg: '2d8+4', pgMedia: 13, vel: '30 pies', cadena: true,
    ab: { fue: 10, des: 16, con: 15, int: 6, sab: 8, car: 5 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 9', de: 'familiar',
    vulnerable: 'Contundente', inmune: 'Veneno; Agotamiento, Envenenado',
    acciones: [{ n: 'Espada corta', atk: 5, dmg: '1d6+3', tipo: 'perforante' }, { n: 'Arco corto (80/320 pies)', atk: 5, dmg: '1d6+3', tipo: 'perforante' }] },

  esqueleto: { n: 'Esqueleto', tipo: 'Muerto viviente mediano', ca: 13, pg: '2d8+4', pgMedia: 13, vel: '30 pies',
    ab: { fue: 10, des: 16, con: 15, int: 6, sab: 8, car: 5 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 9', de: 'muerto',
    vulnerable: 'Contundente', inmune: 'Veneno; Agotamiento, Envenenado',
    acciones: [{ n: 'Espada corta', atk: 5, dmg: '1d6+3', tipo: 'perforante' }, { n: 'Arco corto (80/320 pies)', atk: 5, dmg: '1d6+3', tipo: 'perforante' }] },
  zombi: { n: 'Zombi', tipo: 'Muerto viviente mediano', ca: 8, pg: '2d8+6', pgMedia: 15, vel: '20 pies',
    ab: { fue: 13, des: 6, con: 16, int: 3, sab: 6, car: 5 }, salv: { sab: 0 }, sentidos: 'Visión en la oscuridad 60 pies; Percepción pasiva 8', de: 'muerto',
    inmune: 'Veneno; Agotamiento, Envenenado',
    rasgos: [['Aguante de muerto viviente', 'Si el daño lo deja a 0 PG, hace una salvación de CON (CD 5 + el daño recibido) salvo que el daño sea radiante o de un crítico; si la pasa, queda con 1 PG.']],
    acciones: [{ n: 'Golpe', atk: 3, dmg: '1d8+1', tipo: 'contundente' }] },
};

/** Qué criaturas puede tener el personaje según sus conjuros */
export const CRIATURAS_DE_CONJURO: Record<string, 'familiar' | 'muerto'> = { 'encontrar familiar': 'familiar', 'animar a los muertos': 'muerto' };

/* Compañeros que da una clase o subclase (siempre están, no se lanzan): su hoja depende del personaje.
   Sus PG gastados se guardan en pj.used[id] y vuelven con un descanso largo. */
const mas = (n: number) => (n ? (n > 0 ? `+${n}` : `${n}`) : '');
const quien = (c: any, re: RegExp) => c.entries.some((e: any) => re.test(norm(e.nombre || '')));
export function companerosDe(c: any): any[] {
  const out: any[] = [], pb = c.pb, m = c.m;
  // El Perro y el Sabueso (Pugilista): el sabueso
  if (quien(c, /^el mejor amigo del luchador/)) {
    const cd = 8 + pb + m.con;
    out.push({ id: 'cmp-sabueso', n: 'Sabueso', tipo: 'Bestia mediana (tu compañero)', ca: 12 + m.con, pgMax: 5 + 5 * c.lvl, vel: '40 pies',
      sentidos: 'Visión en la oscuridad 60 pies', suma: `Suma tu competencia (${mas(pb)}) a sus pruebas y salvaciones`,
      rasgos: [['Órdenes', 'Actúa en tu turno. Con una acción adicional le ordenas una acción; también puedes cambiar uno de tus ataques de la acción Atacar por su Mordisco. Si no le das órdenes, solo Esquiva; si estás Incapacitado, actúa solo.']],
      acciones: [{ n: 'Mordisco', atk: pb + m.con, dmg: `2d4${mas(2 + m.con)}`, tipo: 'perforante',
        texto: `A una criatura Grande o menor: salvación de FUE (CD ${cd}) o la agarra, la derriba o la empuja 5 pies.` }] });
  }
  // Herrero de Batalla (Artífice): el Defensor de Acero
  if (quien(c, /^defensor de acero/)) {
    out.push({ id: 'cmp-defensor', n: 'Defensor de Acero', porConfirmar: true, tipo: 'Constructo mediano (tu compañero)', ca: 12 + m.int, pgMax: 5 + 5 * c.lvl, vel: '40 pies',
      ab: { fue: 14, des: 12, con: 14, int: 4, sab: 10, car: 6 }, sentidos: 'Visión en la oscuridad 60 pies', inmune: 'Veneno; Hechizado, Agotamiento, Envenenado',
      suma: `Suma tu competencia (${mas(pb)}) a sus pruebas y salvaciones`,
      rasgos: [['Órdenes', 'Actúa en tu turno. Con una acción adicional le ordenas una acción; si no, solo Esquiva. Si estás Incapacitado, actúa solo.'],
        ['Desviar ataque (reacción)', `Cuando una criatura a 5 pies de él ataca a otro, lo hace con desventaja.${c.lvl >= 15 ? ` El atacante recibe 1d4${mas(m.int)} de fuerza.` : ''}`],
        ['Reparar (3 al día)', `Él o un constructo u objeto a 5 pies recupera 2d8${mas(m.int)} PG.`]],
      acciones: [{ n: 'Desgarro potenciado', atk: pb + m.int, dmg: `1d8${mas(2 + m.int)}`, tipo: 'fuerza' }] });
  }
  // Maestro de Bestias (Explorador 2024): el compañero primigenio elegido
  const forma = [].concat(c.pj?.elecciones?.['tipo-bestia'] || [])[0];
  if (forma && quien(c, /^companero primigenio/)) {
    const cielo = forma === 'bestia-cielo', mar = forma === 'bestia-mar', atk = c.atkSpell ?? pb + m.sab;
    const golpes = c.lvl >= 11 ? 'Con Furia Bestial hace dos Golpes de Bestia cuando se lo ordenas.' : '';
    out.push({ id: 'cmp-bestia', n: cielo ? 'Bestia del Cielo' : mar ? 'Bestia del Mar' : 'Bestia de la Tierra', porConfirmar: true,
      tipo: `Bestia ${cielo ? 'pequeña' : 'mediana'} (tu compañero primigenio)`, ca: 13 + m.sab, pgMax: (cielo ? 4 : 5) + (cielo ? 4 : 5) * c.lvl,
      vel: cielo ? '10 pies, volar 60 pies' : mar ? '5 pies, nadar 60 pies' : '40 pies, trepar 40 pies',
      ab: cielo ? { fue: 6, des: 16, con: 13, int: 8, sab: 14, car: 11 } : { fue: 14, des: 14, con: 15, int: 8, sab: 14, car: 11 },
      sentidos: 'Visión en la oscuridad 60 pies', suma: `Vínculo primigenio: suma tu competencia (${mas(pb)}) a sus pruebas y salvaciones`,
      rasgos: [['Órdenes', `Actúa en tu turno. Con una acción adicional le ordenas una acción; también puedes cambiar uno de tus ataques de la acción Atacar por su Golpe de Bestia. Si no le das órdenes, Esquiva. ${golpes}`.trim()],
        cielo ? ['Vuelo rasante', 'No provoca ataques de oportunidad al salir volando del alcance de un enemigo.']
          : mar ? ['Anfibia', 'Respira aire y agua.'] : ['Carga', `Si se mueve 20 pies en línea recta hacia el objetivo y acierta, hace 1d6 de daño extra y el objetivo hace una salvación de FUE (CD ${c.dcSpell ?? 8 + pb + m.sab}) o queda Derribado.`]],
      acciones: [{ n: 'Golpe de Bestia', atk, dmg: cielo ? `1d4${mas(3 + m.sab)}` : mar ? `1d6${mas(2 + m.sab)}` : `1d8${mas(2 + m.sab)}`,
        tipo: cielo ? 'cortante' : mar ? 'contundente o perforante' : 'contundente, cortante o perforante',
        texto: mar ? `Al acertar, el objetivo queda Agarrado (escapar CD ${c.dcSpell ?? 8 + pb + m.sab}).` : '' }] });
  }
  // Guardián Dracónico (Explorador, Fizban's Treasury of Dragons): el draco, con la esencia que se elige al invocarlo
  if (quien(c, /^companero draconico/)) {
    const atk = 3 + pb, extra = c.lvl >= 15 ? '2d6' : c.lvl >= 7 ? '1d6' : '';
    out.push({ id: 'cmp-draco', n: 'Draco', tipo: `Dragón ${c.lvl >= 15 ? 'grande' : c.lvl >= 7 ? 'mediano' : 'pequeño'} (tu compañero)`,
      ca: 14 + pb, pgMax: 5 + 5 * c.lvl, vel: c.lvl >= 7 ? '40 pies, volar 40 pies' : '40 pies',
      ab: { fue: 16, des: 12, con: 15, int: 8, sab: 14, car: 8 }, salv: { des: 1 + pb, sab: 2 + pb },
      sentidos: 'Visión en la oscuridad 60 pies', inmune: 'El daño de su esencia (ácido, frío, fuego, relámpago o veneno)',
      rasgos: [['Órdenes', 'Actúa justo después de ti. Con una acción adicional le ordenas una acción; si no, solo Esquiva. Si estás Incapacitado, actúa solo.'],
        ['Golpes imbuidos (reacción)', 'Cuando una criatura que ve a 30 pies acierta con un ataque con arma, ese ataque hace 1d6 extra del daño de su esencia.']],
      acciones: [{ n: 'Mordisco', atk, dmg: `1d6${mas(pb)}`, tipo: 'perforante', texto: extra ? `Hace ${extra} extra del daño de su esencia.` : '' }] });
  }
  // Colegio de la Creación (Bardo, Tasha's Cauldron of Everything): el objeto danzante
  if (quien(c, /^objeto danzante/)) {
    out.push({ id: 'cmp-danzante', n: 'Objeto Danzante', tipo: 'Constructo grande o menor (tu compañero)', ca: 16, pgMax: 10 + 5 * c.lvl, vel: '30 pies, volar 30 pies (flota)',
      ab: { fue: 18, des: 14, con: 16, int: 4, sab: 10, car: 6 }, sentidos: 'Visión en la oscuridad 60 pies', inmune: 'Psíquico, veneno; Hechizado, Agotamiento, Envenenado, Asustado',
      rasgos: [['Órdenes', 'Actúa justo después de ti. Con una acción adicional (también al dar Inspiración Bárdica) le ordenas una acción; si no, solo Esquiva. Si estás Incapacitado, actúa solo.'],
        ['Forma inmutable', 'Ningún conjuro ni efecto puede cambiar su forma.'],
        ['Baile irresistible', 'Cuando una criatura empieza su turno a 10 pies de él, puede subirle o bajarle 10 pies la velocidad (tú eliges) hasta el final de ese turno.']],
      acciones: [{ n: 'Golpe de fuerza', atk: c.atkSpell ?? pb + m.car, dmg: `1d10${mas(pb)}`, tipo: 'fuerza' }] });
  }
  // Reanimador (Artífice, Ravenloft: The Horrors Within): el compañero reanimado
  if (quien(c, /^companero reanimado/)) {
    const cd = c.dcSpell ?? 8 + pb + m.int, estallido = c.lvl >= 9 ? '4d4' : '2d4';
    out.push({ id: 'cmp-reanimado', n: 'Compañero Reanimado', tipo: 'Muerto viviente mediano (tu compañero)', ca: 10 + m.int, pgMax: 5 + 5 * c.lvl, vel: '30 pies',
      ab: { fue: 11, des: 10, con: 16, int: 4, sab: 10, car: 6 }, sentidos: 'Vista ciega 60 pies', inmune: 'Relámpago; Hechizado, Agotamiento, Envenenado. Resistencia al necrótico y al veneno',
      suma: 'Sus modificaciones (Modificaciones Extrañas) se eligen al crearlo',
      rasgos: [['Órdenes', 'Actúa en tu turno. Con una acción adicional le ordenas una acción; si no, solo Esquiva. Si estás Incapacitado, actúa solo.'],
        ['Estallido mortal', `Al morir explota: cada criatura a 10 pies hace una salvación de DES (CD ${cd}) o recibe ${estallido} de necrótico, la mitad si la pasa.`],
        ['Absorber relámpagos', 'Cuando recibe daño de relámpago, recupera esos PG en lugar de perderlos.']],
      acciones: [{ n: 'Zarpazo terrible', atk: c.atkSpell ?? pb + m.int, dmg: `1d4${mas(m.int)}`, tipo: 'necrótico',
        texto: `El objetivo no puede hacer ataques de oportunidad hasta el inicio de su siguiente turno. Con Ferocidad el dado es 1d6.${c.lvl >= 9 ? ' Su daño necrótico ignora la resistencia.' : ''}` }] });
  }
  return out;
}
