/* eslint-disable */
// @ts-nocheck -- datos portados tal cual de index.html
import { modStr, fmtMod, sign, norm } from '@/shared/utils/texto';
import { ARMAS, MAESTRIAS } from './equipo';
import { opcionesCompetencia, ayudaCompetencia, aplicarElegidas } from '../domain/competencias';
import { CLASES, INVOCACIONES } from './clases';
import { REGLAS_GENERADAS } from './generadas';
import { todosConjuros } from '@/features/biblioteca/domain/biblioteca';
import { conjuroDeLaLista } from '../domain/restricciones';
import { ESTILOS } from './estilos';
import { SKILLS } from './caracteristicas';
import { esEvocacion } from '@/features/personajes/domain/lanzar';
const HABS_GUERRERO: string[] = CLASES.guerrero.habs;
const NOMBRE_AB = {fue:'Fuerza', des:'Destreza', con:'Constitución', int:'Inteligencia', sab:'Sabiduría', car:'Carisma'};

/* Pugilista 2024: dado de Pugilismo 1d8, 1d10 (5), 1d12 (11) y 2d6 (17) */
export const dadoPug = c => c.lvl >= 17 ? '2d6' : c.lvl >= 11 ? '1d12' : c.lvl >= 5 ? '1d10' : '1d8';
export const moxieMax = c => (c.C?.recursosTabla?.[c.lvl - 1] || {}).moxie || 0;
export const cdFue = c => 8 + c.pb + c.m.fue;
/* Bárbaro: bonificador de daño de Furia (2, 3 desde nivel 9, 4 desde 16) */
/* Bardo: dado de Inspiración Bárdica */
export const dadoInsp = c => c.lvl >= 15 ? '1d12' : c.lvl >= 10 ? '1d10' : c.lvl >= 5 ? '1d8' : '1d6';
export const danoFuria = c => c.lvl >= 16 ? 4 : c.lvl >= 9 ? 3 : 2;
const ASPECTO = {buho: 'Búho: visión en la oscuridad a 60 pies, o 60 más si ya tenías (ya sumado).', pantera: 'Pantera: velocidad de trepar igual a tu velocidad.', salmon: 'Salmón: velocidad de nadar igual a tu velocidad.'};
export const cdCon = c => 8 + c.pb + c.m.con;
const TRATO = {manto: 'Manto de Sombras', mascara: 'Máscara de Mil Caras', paso: 'Paso de Otro Mundo'};
export const golpeU = c => [`1d20${modStr(c.unarmed.atk)}`, c.unarmed.expr];

/* Cazador de Sangre (versión 2022): el dado de hemomancia sube con el nivel; la hemomancia usa la característica de conjuros de la clase */
const esOrden = (c, re) => re.test(norm(c.SD?.n || ""));
export const dadoHemo = c => c.lvl >= 17 ? '1d10' : c.lvl >= 11 ? '1d8' : c.lvl >= 5 ? '1d6' : '1d4';
export const mHemo = c => c.m[c.casterAb || 'int'];
export const modHemo = c => Math.max(1, mHemo(c));
export const cdHemo = c => 8 + c.pb + mHemo(c);
/* El Especialista en Maldiciones del Cazafantasmas suma un uso */
export const maldicionesUsos = c => (c.lvl >= 17 ? 4 : c.lvl >= 13 ? 3 : c.lvl >= 6 ? 2 : 1) + (esOrden(c, /cazafantasmas/) ? 1 : 0);
export const maldicionesConocidas = c => c.lvl >= 18 ? 5 : c.lvl >= 14 ? 4 : c.lvl >= 10 ? 3 : c.lvl >= 6 ? 2 : 1;
export const ritosConocidos = c => c.lvl >= 14 ? 3 : c.lvl >= 7 ? 2 : 1;
export const danoMarca = c => c.lvl >= 13 ? Math.max(2, 2 * mHemo(c)) : modHemo(c);
export const amplificar = c => `Amplificada (recibes ${dadoHemo(c)} de daño necrótico que no se puede reducir)`;
/* Licántropo: garras de 1d6 (1d8 desde 11) con FUE o DES; Poder Feral suma al daño y Golpes Depredadores Mejorados al ataque */
export const dadoGarras = c => c.lvl >= 11 ? '1d8' : '1d6';
export const poderFeral = c => c.lvl >= 18 ? 3 : c.lvl >= 11 ? 2 : 1;
export const bonoGarras = c => c.lvl >= 18 ? 3 : c.lvl >= 11 ? 2 : c.lvl >= 7 ? 1 : 0;
export const ataqueGarras = c => {
  const d = dadoGarras(c), m = Math.max(c.m.fue, c.m.des), dm = m + poderFeral(c);
  return {nombre:'Garras (forma híbrida)', atk: c.pb + m + bonoGarras(c), expr: `${d}${modStr(dm)}`, dmg: `${d}${fmtMod(dm)} contundente o cortante`,
    notas:['Solo en forma híbrida. Son golpes sin armas: puedes ponerles tu Rito Carmesí, y tras atacar con ellas haces otro con acción adicional. Ya suman Poder Feral']};
};
/* Mutante: mutágenos que fabricas por descanso y fórmulas que conoces */
export const mutagenosN = c => c.lvl >= 15 ? 3 : c.lvl >= 7 ? 2 : 1;
export const formulasN = c => c.lvl >= 18 ? 8 : c.lvl >= 15 ? 7 : c.lvl >= 11 ? 6 : c.lvl >= 7 ? 5 : 4;
/* Alma Profana: tabla de Magia del Pacto */
const CONJUROS_PACTO = [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11];
export const espaciosPacto = c => ({n: c.lvl >= 6 ? 2 : 1, nivel: c.lvl >= 19 ? 4 : c.lvl >= 13 ? 3 : c.lvl >= 7 ? 2 : 1, conjuros: CONJUROS_PACTO[c.lvl - 1], trucos: c.lvl >= 10 ? 3 : 2});
/* Las maldiciones que conoces (elección "maldiciones"); sin elegir todavía, salen todas */
const maldicion = (nombre, t, texto, key?) => ({nombre, t, coste:'1 Maldición de Sangre', texto, si: key ? conoce('maldiciones', key) : undefined, elegida: key ? ['maldiciones', key] : undefined});
/* Lo que el jugador eligió dentro de un rasgo (ver `eleccion` en calculo.ts) */
export const elegido = (c, id) => c.pj?.elecciones?.[id] || '';
export const elegidos = (c, id): string[] => [].concat(c.pj?.elecciones?.[id] || []);
function conoce(id, key) { return c => { const s = elegidos(c, id); return !s.length || s.includes(key); }; }
const MALDICIONES = [['ansioso', 'del Ansioso'], ['atadura', 'de la Atadura'], ['agonia', 'de la Agonía Hinchada'], ['exposicion', 'de la Exposición'],
  ['sin-ojos', 'de los Sin Ojos'], ['titere', 'del Títere Caído'], ['marcado', 'del Marcado'], ['mente-confusa', 'de la Mente Confusa']];
const RITOS = [['llama', 'Rito de la Llama', 'fuego'], ['escarcha', 'Rito de la Escarcha', 'frío'], ['tormenta', 'Rito de la Tormenta', 'relámpago'],
  ['muerte', 'Rito de la Muerte', 'necrótico', 14], ['oraculo', 'Rito del Oráculo', 'psíquico', 14], ['rugido', 'Rito del Rugido', 'trueno', 14]];
const ritosTexto = c => { const s = elegidos(c, 'ritos');
  return s.length ? `Tus ritos: ${RITOS.filter(r => s.includes(r[0])).map(([, n, tipo]) => `${n} (${tipo})`).join(', ')}.`
    : `Conoces ${ritosConocidos(c)} rito(s); elígelos en el paso Clase: Llama (fuego), Escarcha (frío) o Tormenta (relámpago)${c.lvl >= 14 ? ', y desde nivel 14 Muerte (necrótico), Oráculo (psíquico) o Rugido (trueno)' : ''}.`; };
const suben = c => c.lvl >= 18 ? 5 : c.lvl >= 11 ? 4 : 3;
/* Mutágenos del Mutante (2022): [clave, nombre, nivel, mejora(c), merma] */
const MUTAGENOS = [
  ['atrayente', 'Atrayente', 0, () => 'Ventaja en pruebas de CAR', 'desventaja en la iniciativa'],
  ['celeridad', 'Celeridad', 0, c => `Tu DES y su máximo suben ${suben(c)}`, 'desventaja en salvaciones de SAB'],
  ['conversador', 'Conversador', 0, () => 'Ventaja en pruebas de INT', 'desventaja en pruebas de SAB'],
  ['destreza', 'Destreza', 0, () => 'Ventaja en pruebas de DES', 'desventaja en pruebas de SAB'],
  ['brasas', 'Brasas', 0, () => 'Resistencia al daño de fuego', 'vulnerabilidad al frío'],
  ['gelido', 'Gélido', 0, () => 'Resistencia al daño de frío', 'vulnerabilidad al fuego'],
  ['impermeable', 'Impermeable', 0, () => 'Resistencia al daño perforante', 'vulnerabilidad al cortante'],
  ['blindado', 'Blindado', 0, () => 'Resistencia al daño cortante', 'vulnerabilidad al contundente'],
  ['irrompible', 'Irrompible', 0, () => 'Resistencia al daño contundente', 'vulnerabilidad al perforante'],
  ['movil', 'Móvil', 0, c => `Inmune a Agarrado y Apresado${c.lvl >= 11 ? ', y a Paralizado' : ''}`, 'desventaja en pruebas de FUE'],
  ['ojo-nocturno', 'Ojo Nocturno', 0, () => 'Visión en la oscuridad a 60 pies (o 60 más si ya tenías)', 'desventaja en ataques y en Percepción con la vista bajo luz solar directa'],
  ['perceptivo', 'Perceptivo', 0, () => 'Ventaja en pruebas de SAB', 'desventaja en pruebas de CAR'],
  ['potencia', 'Potencia', 0, c => `Tu FUE y su máximo suben ${suben(c)}`, 'desventaja en salvaciones de DES'],
  ['rapidez', 'Rapidez', 0, c => `+${c.lvl >= 15 ? 15 : 10} pies de velocidad`, 'desventaja en pruebas de INT'],
  ['sagacidad', 'Sagacidad', 0, c => `Tu INT y su máximo suben ${suben(c)}`, 'desventaja en salvaciones de CAR'],
  ['bermellon', 'Bermellón', 0, () => 'Un uso más de Maldición de Sangre', 'desventaja en las salvaciones contra la muerte'],
  ['reconstruccion', 'Reconstrucción', 7, c => `Durante 1 hora, al empezar tu turno con al menos 1 PG y menos de la mitad de tus PG máximos, recuperas ${c.pb} PG`, 'tu velocidad baja 10 pies mientras dura'],
  ['eter', 'Éter', 11, () => 'Velocidad de vuelo de 20 pies durante 1 hora', 'desventaja en pruebas de FUE y DES mientras dura'],
  ['crueldad', 'Crueldad', 11, () => 'Cuando usas Atacar, haces un ataque con arma más con acción adicional', 'desventaja en salvaciones de INT, SAB y CAR'],
  ['precision', 'Precisión', 11, () => 'Tus ataques con arma hacen crítico con 19 o 20', 'desventaja en salvaciones de FUE'],
];
/* Alma Profana: beneficio de Enfoque del Rito y conjuros de Arcano Revelado y Arcano Liberado según el patrón */
export const PATRONES = [
  {key:'archihada', n:'Archihada', t:'pasiva', revelado:'Desenfocar', liberado:'Ralentizar',
    foco: () => 'Quien dañas con un arma con rito brilla con luz tenue hasta el final de tu siguiente turno y no aprovecha cobertura ni invisibilidad.'},
  {key:'celestial', n:'Celestial', t:'adicional', coste:'1 Maldición de Sangre', revelado:'Restablecimiento menor', liberado:'Revivir',
    foco: c => `Una criatura que veas a 60 pies recupera ${dadoHemo(c)}${fmtMod(modHemo(c))} PG.`},
  {key:'insondable', n:'Insondable', t:'gratis', revelado:'Ráfaga de viento', liberado:'Relámpago',
    foco: () => 'Respiras bajo el agua. Una vez por turno, al dañar a una criatura con un arma con rito, le quitas 10 pies de velocidad hasta el inicio de tu siguiente turno.'},
  {key:'infernal', n:'Infernal', t:'gratis', revelado:'Rayo abrasador', liberado:'Bola de fuego',
    foco: () => 'Con el Rito de la Llama, si sacas 1 o 2 en el dado de daño del rito, puedes repetirlo y quedarte con el resultado que prefieras.'},
  {key:'genio', n:'Genio', t:'adicional', coste:'1 Maldición de Sangre', revelado:'Fuerza fantasmal', liberado:'Protección contra energía',
    foco: c => `Ganas velocidad de vuelo de 30 pies durante ${modHemo(c)} ronda(s).`},
  {key:'gran-antiguo', n:'Gran Antiguo', t:'pasiva', revelado:'Detectar pensamientos', liberado:'Acelerar',
    foco: () => 'Cuando haces un crítico a una criatura, ella y las que elijas a 10 pies quedan Asustadas de ti hasta el final de tu siguiente turno.'},
  {key:'hexblade', n:'Hexblade', t:'pasiva', revelado:'Golpe marcador', liberado:'Intermitencia', tRevelado:'adicional',
    foco: c => `Tras acertar una maldición de sangre a una criatura, tu siguiente golpe contra ella mientras dure la maldición hace ${c.pb} de daño extra.`},
  {key:'no-muerto', n:'No Muerto', t:'reaccion', revelado:'Ceguera/Sordera', liberado:'Hablar con los muertos',
    foco: () => 'Cuando recibes daño necrótico, lo reduces a la mitad. Con un rito activo tu aspecto refleja a tu patrón.'},
  {key:'inmortal', n:'Inmortal', t:'pasiva', revelado:'Silencio', liberado:'Imponer maldición',
    foco: c => `Cuando dejas a 0 PG a una criatura hostil que suponga cierta amenaza (a juicio del DM), recuperas ${dadoHemo(c)} PG.`},
];
export const patron = c => PATRONES.find(p => p.key === elegido(c, 'patron-alma-profana'));
const conjuroPatron = (c, campo, verbo) => { const p = patron(c);
  return p ? `${verbo} ${p[campo]}` : `${verbo} el conjuro de tu patrón (elígelo en el paso Clase): ${PATRONES.map(x => `${x.n}, ${x[campo]}`).join('; ')}`; };
/* Armero: modelo de la Armadura Arcana; sin elegir, se muestran los tres */
export const modeloArmero = c => elegido(c, 'modelo-armero');
const conModelo = k => c => !modeloArmero(c) || modeloArmero(c) === k;

/* Artífice (Eberron: Forge of the Artificer, 2025) */
export const modInt = c => Math.max(1, c.m.int);
const PREPARADOS_ART = [2, 3, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15];
export const trucosArt = c => c.lvl >= 14 ? 4 : c.lvl >= 10 ? 3 : 2;
export const preparadosArt = c => PREPARADOS_ART[c.lvl - 1];
export const planesArt = c => c.lvl >= 18 ? 8 : c.lvl >= 14 ? 7 : c.lvl >= 10 ? 6 : c.lvl >= 6 ? 5 : 4;
export const objetosArt = c => c.lvl >= 18 ? 6 : c.lvl >= 14 ? 5 : c.lvl >= 10 ? 4 : c.lvl >= 6 ? 3 : 2;
export const elixiresN = c => c.lvl >= 15 ? 5 : c.lvl >= 9 ? 4 : c.lvl >= 5 ? 3 : 2;
export const danoCanon = c => c.lvl >= 9 ? '3d8' : '2d8';
/* Conjuros de subclase, siempre preparados: [nivel de artífice, nombres como están en el catálogo] */
/* Rompejuramentos (Unearthed Arcana 2025): los que están en el catálogo */
/* Conjuros siempre preparados del Reanimador (Artífice, Ravenloft: The Horrors Within 2026) */
const CONJUROS_REANIMADOR: [number, string[]][] = [[3, ['Falsa vida', 'Piedad con los moribundos', 'Saeta de bruja']], [5, ['Sordera/Ceguera', 'Potenciar característica']],
  [9, ['Animar a los muertos', 'Relámpago']], [13, ['Marchitar', 'Guarda contra la Muerte']], [17, ['Caparazón antivida', 'Alzar a los muertos']]];
const CONJUROS_ROMPE = [[3, ['Reprensión infernal', 'Saeta de bruja']], [5, ['Corona de la locura', 'Oscuridad']], [9, ['Miedo', 'Invocar muerto viviente']], [13, ['Marchitar', 'Asesino fantasmal']], [17, ['Contagio', 'Golpe de viento de acero']]];
const conjurosSub = (nombre, tabla) => ({nombre, t:'pasiva',
  texto: c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`});
/* Armas especiales de la Armadura Arcana: usan INT, y Armero Mejorado suma +1 desde nivel 9 */
const armaModelo = (c, nombre, dado, tipo, nota) => {
  const b = c.lvl >= 9 ? 1 : 0, m = c.m.int + b;
  return {nombre, atk: c.pb + c.m.int + b, expr: `${dado}${modStr(m)}`, dmg: `${dado}${fmtMod(m)} ${tipo}`, notas:[nota]};
};

/* Híbrido Simic: mejoras animales de Ravnica */
const SIMIC = [['manta', 'Planeo de Manta'], ['trepador', 'Trepador Ágil'], ['submarino', 'Adaptación Submarina'], ['apendices', 'Apéndices Prensiles'], ['caparazon', 'Caparazón'], ['acido', 'Escupir Ácido']];
const simicTexto = (c, k) => ({
  manta: 'Planeo de Manta: al caer sin estar Incapacitado, restas hasta 100 pies a la caída para el daño y avanzas 2 pies en horizontal por cada pie que bajas.',
  trepador: 'Trepador Ágil: velocidad de trepar igual a tu velocidad.',
  submarino: 'Adaptación Submarina: respiras aire y agua, y tienes velocidad de nadar igual a tu velocidad.',
  apendices: 'Apéndices Prensiles: dos garras o tentáculos con los que agarras (acción) y golpeas sin armas (en Ataques); no empuñan armas.',
  caparazon: 'Caparazón: +1 a la CA si no llevas armadura pesada (ya sumado).',
  acido: 'Escupir Ácido: sale aparte como acción.',
})[k] || '';

/* Conjuros de dominio de clérigo (Manual del Jugador 2024); los usan el clérigo y los Conjuros del Vestigio del brujo */
const DOMINIOS_CLERIGO = {
  vida: [[3, ['Ayuda', 'Bendecir', 'Curar heridas', 'Restablecimiento menor']], [5, ['Palabra curativa en masa', 'Revivir']], [7, ['Aura de vida', 'Guarda contra la Muerte']], [9, ['Restablecimiento mayor', 'Curar heridas en masa']]],
  luz: [[3, ['Manos ardientes', 'Fuego feérico', 'Rayo abrasador', 'Ver invisibilidad']], [5, ['Luz del día', 'Bola de fuego']], [7, ['Ojo arcano', 'Muro de fuego']], [9, ['Golpe Flamígero', 'Escudriñar']]],
  engano: [[3, ['Hechizar persona', 'Disfrazarse', 'Invisibilidad', 'Pasar sin rastro']], [5, ['Patrón hipnótico', 'Indetectable']], [7, ['Confusión', 'Puerta dimensional']], [9, ['Dominar persona', 'Alterar los recuerdos']]],
  guerra: [[3, ['Rayo guía', 'Arma mágica', 'Escudo de fe', 'Arma espiritual']], [5, ['Manto del cruzado', 'Espíritus guardianes']], [7, ['Escudo de fuego', 'Libertad de movimiento']], [9, ['Inmovilizar monstruo', 'Golpe de Viento Acerado']]],
};

/* Brujo: Invocaciones Sobrenaturales del Manual del Jugador 2024 (las antiguas de Xanathar y Tasha no se reimprimieron).
   `req`: otra invocación que hay que tener. Las que se pueden repetir llevan una segunda opción que pide la primera. */
const INVOC: {key: string, conjuro?: string, n: string, nivel: number, req?: string, t: string, texto: (c: any) => string, usos?: number}[] = [
  {key:'armadura-sombras', conjuro:'Armadura de mago', n:'Armadura de Sombras', nivel:1, t:'accion', texto: c => `Lanzas Armadura de mago sobre ti sin gastar espacio. Sin armadura, tu CA es 13 + DES = ${13 + c.m.des} (ya sumado).`},
  {key:'mente-sobrenatural', n:'Mente Sobrenatural', nivel:1, t:'pasiva', texto: () => 'Tienes ventaja en las salvaciones de CON para mantener la concentración.'},
  {key:'pacto-filo', n:'Pacto del Filo', nivel:1, t:'adicional', texto: c => `Conjuras en tu mano un arma de pacto cuerpo a cuerpo, sencilla o marcial, o te vinculas a un arma mágica que toques. Eres competente con ella, atacas y haces daño con CAR (${sign(c.m.car)}) en vez de FUE o DES (ya en Ataques), su daño puede ser necrótico, psíquico o radiante, y te sirve de foco de conjuros.`},
  {key:'pacto-cadena', conjuro:'Encontrar familiar', n:'Pacto de la Cadena', nivel:1, t:'accion', texto: () => 'Lanzas Encontrar familiar como acción mágica sin gastar espacio, con formas especiales (sale en tus rasgos).'},
  {key:'pacto-tomo', n:'Pacto del Tomo', nivel:1, t:'pasiva', texto: () => 'Tu Libro de las Sombras te da tres trucos y dos conjuros rituales de nivel 1 de cualquier lista, siempre preparados (agrégalos en Conjuros marcando que no cuentan en el límite), y te sirve de foco de conjuros. Si lo pierdes, un rito de 1 hora te da otro.'},
  {key:'explosion-agonizante', n:'Explosión Agonizante', nivel:2, t:'pasiva', texto: c => `Eliges un truco de brujo que haga daño (como Explosión sobrenatural): sumas tu CAR (${sign(c.m.car)}) a su daño. Pide conocer un truco de brujo que haga daño.`},
  {key:'explosion-agonizante-2', n:'Explosión Agonizante (otro truco)', nivel:2, req:'explosion-agonizante', t:'pasiva', texto: c => `Sumas tu CAR (${sign(c.m.car)}) al daño de un segundo truco de brujo que haga daño.`},
  {key:'vision-diablo', n:'Visión del Diablo', nivel:2, t:'pasiva', texto: () => 'Ves con normalidad en luz tenue y en oscuridad, mágica o no, a 120 pies (ya en tus sentidos).'},
  {key:'lanza-sobrenatural', n:'Lanza Sobrenatural', nivel:2, t:'pasiva', texto: c => `Un truco de brujo que haga daño y tenga alcance de 10 pies o más gana ${30 * c.lvl} pies de alcance. Pide conocer un truco de brujo que haga daño.`},
  {key:'lanza-sobrenatural-2', n:'Lanza Sobrenatural (otro truco)', nivel:2, req:'lanza-sobrenatural', t:'pasiva', texto: c => `Un segundo truco de brujo que haga daño gana ${30 * c.lvl} pies de alcance.`},
  {key:'vigor-infernal', conjuro:'Falsa vida', n:'Vigor Infernal', nivel:2, t:'accion', texto: () => 'Lanzas Falsa vida sobre ti sin gastar espacio y, en vez de tirar, ganas el máximo de PG temporales.'},
  {key:'lecciones-primeros', n:'Lecciones de los Primeros', nivel:2, t:'pasiva', texto: () => 'Ganas una dote de origen que no tengas (agrégala en el paso Características).'},
  {key:'lecciones-primeros-2', n:'Lecciones de los Primeros (otra dote)', nivel:2, req:'lecciones-primeros', t:'pasiva', texto: () => 'Ganas otra dote de origen que no tengas (agrégala en el paso Características).'},
  {key:'mascara-caras', conjuro:'Disfrazarse', n:'Máscara de Mil Caras', nivel:2, t:'accion', texto: () => 'Lanzas Disfrazarse sin gastar espacio.'},
  {key:'visiones-brumosas', conjuro:'Imagen silenciosa', n:'Visiones Brumosas', nivel:2, t:'accion', texto: () => 'Lanzas Imagen silenciosa sin gastar espacio.'},
  {key:'salto-otro-mundo', conjuro:'Salto', n:'Salto de Otro Mundo', nivel:2, t:'adicional', texto: () => 'Lanzas Salto sobre ti sin gastar espacio.'},
  {key:'explosion-repulsora', n:'Explosión Repulsora', nivel:2, t:'gratis', texto: () => 'Eliges un truco de brujo que haga daño con tirada de ataque: al acertar a una criatura Grande o menor, la empujas hasta 10 pies en línea recta. Pide conocer un truco de brujo que haga daño.'},
  {key:'explosion-repulsora-2', n:'Explosión Repulsora (otro truco)', nivel:2, req:'explosion-repulsora', t:'gratis', texto: () => 'Lo mismo con un segundo truco de brujo que haga daño con tirada de ataque.'},
  {key:'paso-ascendente', conjuro:'Levitar', n:'Paso Ascendente', nivel:5, t:'accion', texto: () => 'Lanzas Levitar sobre ti sin gastar espacio.'},
  {key:'castigo-sobrenatural', n:'Castigo Sobrenatural', nivel:5, req:'pacto-filo', t:'gratis', texto: () => 'Una vez por turno, al acertar con tu arma de pacto, gastas un espacio de Magia de Pacto: 1d8 de daño de fuerza extra, más 1d8 por nivel del espacio, y puedes dejar Derribado al objetivo si es Enorme o menor.'},
  {key:'mirada-dos-mentes', n:'Mirada de Dos Mentes', nivel:5, t:'adicional', texto: () => 'Tocas a una criatura voluntaria y percibes por sus sentidos hasta el final de tu próximo turno (lo alargas con acción adicional). Mientras, si está a 60 pies, puedes lanzar conjuros como si estuvieras en su espacio.'},
  {key:'don-profundidades', conjuro:'Respirar bajo el agua', n:'Don de las Profundidades', nivel:5, t:'accion', usos:1, texto: () => 'Respiras bajo el agua y tienes velocidad de nadar igual a tu velocidad. Una vez por descanso largo lanzas Respirar bajo el agua sin gastar espacio.'},
  {key:'maestro-cadena', n:'Inversión del Maestro de la Cadena', nivel:5, req:'pacto-cadena', t:'adicional', texto: c => `Tu familiar gana vuelo o nado de 40 pies; con acción adicional le ordenas que ataque; su daño puede ser necrótico o radiante y sus salvaciones usan tu CD (${c.dcSpell}). Cuando recibe daño, con tu reacción le das resistencia a ese daño.`},
  {key:'mil-formas', conjuro:'Alterar el propio aspecto', n:'Maestro de las Mil Formas', nivel:5, t:'accion', texto: () => 'Lanzas Alterar el propio aspecto sin gastar espacio.'},
  {key:'uno-sombras', n:'Uno con las Sombras', nivel:5, t:'accion', texto: () => 'En luz tenue u oscuridad, con una acción mágica te vuelves Invisible hasta que te mueves o usas una acción, acción adicional o reacción.'},
  {key:'filo-sediento', n:'Filo Sediento', nivel:5, req:'pacto-filo', t:'pasiva', texto: () => 'Ganas Ataque Extra con tu arma de pacto: al usar la acción Atacar, atacas dos veces con ella.'},
  {key:'susurros-tumba', conjuro:'Hablar con los Muertos', n:'Susurros de la Tumba', nivel:7, t:'accion', texto: () => 'Lanzas Hablar con los muertos sin gastar espacio.'},
  {key:'bebedor-vida', n:'Bebedor de Vida', nivel:9, req:'pacto-filo', t:'gratis', texto: c => `Una vez por turno, al acertar con tu arma de pacto, haces 1d6 de daño necrótico, psíquico o radiante extra, y puedes gastar un Dado de Golpe para recuperar su resultado${fmtMod(c.m.con)} PG (mínimo 1).`},
  {key:'don-protectores', n:'Don de los Protectores', nivel:9, req:'pacto-tomo', t:'gratis', usos:1, texto: () => 'Quien haya escrito su nombre en tu Libro de las Sombras y caiga a 0 PG sin morir en el acto queda en 1 PG. Una vez por descanso largo.'},
  {key:'visiones-reinos', conjuro:'Ojo arcano', n:'Visiones de Reinos Lejanos', nivel:9, t:'accion', texto: () => 'Lanzas Ojo arcano sin gastar espacio.'},
  {key:'filo-devorador', n:'Filo Devorador', nivel:12, req:'filo-sediento', t:'pasiva', texto: () => 'Filo Sediento te da dos ataques extra con tu arma de pacto en vez de uno: atacas tres veces con ella.'},
  {key:'vista-bruja', n:'Vista Bruja', nivel:15, t:'pasiva', texto: () => 'Tienes visión verdadera a 30 pies.'},
];
/* Las invocaciones elegidas que valen a este nivel y cuyo requisito también está elegido */
export const invocaciones = c => { const s = elegidos(c, 'invocaciones');
  return s.filter(k => { const i = INVOC.find(x => x.key === k); return i && i.nivel <= c.lvl && (!i.req || s.includes(i.req)); }); };
/* Arcano Místico: [nivel del conjuro, nivel de brujo en que se gana] */
const ARCANO = [[6, 11], [7, 13], [8, 15], [9, 17]];
const conjurosBrujo = nv => todosConjuros().filter(s => +s.nivel === nv && conjuroDeLaLista(s, 'brujo')).sort((a, b) => a.nombre.localeCompare(b.nombre));
const arcanoDe = (c, nv) => conjurosBrujo(nv).find(s => norm(s.nombre) === elegido(c, `arcano-${nv}`));
/* Primera frase de una descripción, para los selectores */
const resumen = d => { const f = String(d || '').replace(/\s+/g, ' ').trim().split(/(?<=\.)\s/)[0]; return f.length > 180 ? f.slice(0, 177) + '…' : f; };
/* El Vestigio: tipo del compañero y dominio de sus conjuros */
const VESTIGIO = {
  celestial: {n:'Celestial', dano:'radiante', poder:'Toque Sanador', texto: c => `Toca a una criatura: recupera 2d8${fmtMod(c.m.car)} PG y deja de estar Cegada, Ensordecida o Envenenada.`},
  infernal: {n:'Infernal', dano:'de fuego', poder:'Intercambio Infernal', texto: () => 'Intercambia su posición con una criatura voluntaria que vea a 60 pies, teletransportándose.'},
  'no-muerto': {n:'No muerto', dano:'necrótico', poder:'Invocación Maldita', texto: () => 'Maldice durante 1 minuto a una criatura a 30 pies: tiene desventaja en las tiradas de ataque contra ti y contra el vestigio.'},
};
const DOMINIOS_VESTIGIO = {vida:'Vida', luz:'Luz', engano:'Engaño', guerra:'Guerra'};
/* El Genio: tipo de genio, su daño y sus conjuros ampliados */
const GENIOS = {
  dao: {n:'Dao', dano:'contundente', conj:'Santuario (1), Crecimiento espinoso (2), Fundirse con la Piedra (3), Moldear la piedra (4) y Muro de piedra (5)'},
  djinn: {n:'Djinn', dano:'de trueno', conj:'Onda atronadora (1), Ráfaga de viento (2), Muro de viento (3), Invisibilidad mejorada (4) y Apariencia (5)'},
  efreet: {n:'Efreet', dano:'de fuego', conj:'Manos ardientes (1), Rayo abrasador (2), Bola de fuego (3), Escudo de fuego (4) y Golpe Flamígero (5)'},
  marid: {n:'Marid', dano:'de frío', conj:'Nube de oscurecimiento (1), Desenfocar (2), Tormenta de aguanieve (3), Controlar agua (4) y Cono de frío (5)'},
};
const genio = c => GENIOS[elegido(c, 'genio-tipo')];
const danoGenio = c => genio(c) ? `daño ${genio(c).dano}` : 'daño del tipo de tu genio';
const dadoTentaculo = c => c.lvl >= 10 ? '2d8' : '1d8';

/* Druida: tipos de tierra del Círculo de la Tierra (conjuros por nivel de druida y resistencia de Protección de la Naturaleza) */
const TIERRAS = {
  arida: {n:'Tierra árida', res:'al fuego', conj:[[3, ['Contorno borroso', 'Manos ardientes', 'Descarga de fuego']], [5, ['Bola de fuego']], [7, ['Marchitar']], [9, ['Muro de piedra']]]},
  polar: {n:'Tierra polar', res:'al frío', conj:[[3, ['Niebla', 'Inmovilizar persona', 'Rayo de escarcha']], [5, ['Tormenta de aguanieve']], [7, ['Tormenta de hielo']], [9, ['Cono de frío']]]},
  templada: {n:'Tierra templada', res:'al relámpago', conj:[[3, ['Paso brumoso', 'Agarre electrizante', 'Dormir']], [5, ['Relámpago']], [7, ['Libertad de movimiento']], [9, ['Paso arbóreo']]]},
  tropical: {n:'Tierra tropical', res:'al veneno', conj:[[3, ['Salpicadura ácida', 'Rayo nauseabundo', 'Telaraña']], [5, ['Nube apestosa']], [7, ['Polimorfar']], [9, ['Plaga de insectos']]]},
};
const dadoAyudaTierra = c => c.lvl >= 14 ? '4d6' : c.lvl >= 10 ? '3d6' : '2d6';
const dadoEstrella = c => c.lvl >= 10 ? '2d8' : '1d8';
const dadoHalo = c => c.lvl >= 14 ? '1d10' : c.lvl >= 10 ? '1d8' : c.lvl >= 6 ? '1d6' : '1d4';
/* Explorador: la Marca del cazador hace 1d10 con Cazador de Enemigos (nivel 20) */
const dadoMarca = c => c.lvl >= 20 ? '1d10' : '1d6';

/* Guerrero: dados del Maestro de Batalla, del Guerrero Psiónico y del Arquero Arcano, y la CD de las maniobras (FUE o DES) */
const dadoSup = c => c.lvl >= 18 ? 'd12' : c.lvl >= 10 ? 'd10' : 'd8';
const cdManiobra = c => 8 + c.pb + Math.max(c.m.fue, c.m.des);
const dadoPsi = c => c.lvl >= 17 ? 'd12' : c.lvl >= 11 ? 'd10' : c.lvl >= 5 ? 'd8' : 'd6';
const dadoArcano = c => c.lvl >= 18 ? 'd12' : c.lvl >= 15 ? 'd10' : c.lvl >= 10 ? 'd8' : 'd6';
/* Maniobras 2024: [clave, nombre, tipo, texto] */
const MANIOBRAS: [string, string, string, (c: any) => string][] = [
  ['emboscada', 'Emboscada', 'gratis', c => `Al hacer una prueba de Sigilo o tirar iniciativa, sumas 1${dadoSup(c)} (si no estás Incapacitado).`],
  ['cbo-posiciones', 'Cambio de Posiciones', 'gratis', c => `En tu turno, gastando 5 pies de movimiento, intercambias tu lugar con una criatura voluntaria a 5 pies sin provocar ataques de oportunidad; tú o ella sumáis 1${dadoSup(c)} a la CA hasta el inicio de tu próximo turno.`],
  ['golpe-comandante', 'Golpe del Comandante', 'gratis', c => `Al usar la acción Atacar, cambias uno de tus ataques para que un aliado que te vea u oiga ataque con su reacción, sumando 1${dadoSup(c)} al daño.`],
  ['presencia-imp', 'Presencia Imponente', 'gratis', c => `Sumas 1${dadoSup(c)} a una prueba de Intimidación, Interpretación o Persuasión.`],
  ['ataque-desarmar', 'Ataque para Desarmar', 'gratis', c => `Al acertar, sumas 1${dadoSup(c)} al daño y el objetivo hace una salvación de FUE (CD ${cdManiobra(c)}) o suelta un objeto que elijas.`],
  ['ataque-distraccion', 'Ataque de Distracción', 'gratis', c => `Al acertar, sumas 1${dadoSup(c)} al daño y el próximo ataque de otro contra el objetivo tiene ventaja (antes de tu próximo turno).`],
  ['juego-piernas', 'Juego de Piernas Evasivo', 'adicional', c => `Te Destrabas y sumas 1${dadoSup(c)} a tu CA hasta el inicio de tu próximo turno.`],
  ['finta', 'Ataque de Finta', 'adicional', c => `Eliges una criatura a 5 pies: tienes ventaja en tu próximo ataque contra ella este turno, y si aciertas sumas 1${dadoSup(c)} al daño.`],
  ['ataque-provocar', 'Ataque para Provocar', 'gratis', c => `Al acertar, sumas 1${dadoSup(c)} al daño y el objetivo hace una salvación de SAB (CD ${cdManiobra(c)}) o tiene desventaja al atacar a otros que no seas tú hasta el final de tu próximo turno.`],
  ['ataque-arremetida', 'Ataque de Arremetida', 'adicional', c => `Corres; si te mueves al menos 5 pies en línea recta justo antes de acertar un ataque cuerpo a cuerpo este turno, sumas 1${dadoSup(c)} a su daño.`],
  ['ataque-maniobra', 'Ataque de Maniobra', 'gratis', c => `Al acertar, sumas 1${dadoSup(c)} al daño y un aliado que te vea u oiga puede moverse con su reacción la mitad de su velocidad sin provocar ataques de oportunidad del objetivo.`],
  ['ataque-amenaza', 'Ataque Amenazante', 'gratis', c => `Al acertar, sumas 1${dadoSup(c)} al daño y el objetivo hace una salvación de SAB (CD ${cdManiobra(c)}) o queda Asustado hasta el final de tu próximo turno.`],
  ['parada', 'Parada', 'reaccion', c => `Cuando un ataque cuerpo a cuerpo te daña, reduces el daño en 1${dadoSup(c)} ${Math.max(c.m.fue, c.m.des) >= 0 ? '+' : '-'} ${Math.abs(Math.max(c.m.fue, c.m.des))} (FUE o DES).`],
  ['ataque-precision', 'Ataque de Precisión', 'gratis', c => `Al fallar un ataque, sumas 1${dadoSup(c)} a la tirada, y puede que acierte.`],
  ['ataque-empuje', 'Ataque de Empuje', 'gratis', c => `Al acertar, sumas 1${dadoSup(c)} al daño y, si es Grande o menor, el objetivo hace una salvación de FUE (CD ${cdManiobra(c)}) o lo empujas hasta 15 pies.`],
  ['reagrupar', 'Reagrupar', 'adicional', c => `Un aliado a 30 pies que te vea u oiga gana 1${dadoSup(c)} + ${Math.floor(c.lvl / 2)} PG temporales.`],
  ['respuesta', 'Respuesta', 'reaccion', c => `Cuando una criatura te falla un ataque cuerpo a cuerpo, le haces un ataque cuerpo a cuerpo y, si aciertas, sumas 1${dadoSup(c)} al daño.`],
  ['ataque-barrido', 'Ataque de Barrido', 'gratis', c => `Al acertar cuerpo a cuerpo, otra criatura a 5 pies del objetivo y a tu alcance recibe 1${dadoSup(c)} de daño del mismo tipo si tu tirada también la habría acertado.`],
  ['eval-tactica', 'Evaluación Táctica', 'gratis', c => `Sumas 1${dadoSup(c)} a una prueba de Historia, Investigación o Perspicacia.`],
  ['ataque-derribo', 'Ataque de Derribo', 'gratis', c => `Al acertar, sumas 1${dadoSup(c)} al daño y, si es Grande o menor, el objetivo hace una salvación de FUE (CD ${cdManiobra(c)}) o queda Derribado.`],
];

/* Los dos Disparos Arcanos que no tiran ataque: [clave, nombre, tipo de daño extra, nota para Ataques] */
const DISPARO_SIN_ATAQUE: [string, string, string, string][] = [
  ['perforante', 'Disparo Perforante', 'perforante', 'Línea de 30 pies por 1 de ancho desde ti, atravesando cobertura: salvación de DES de cada criatura en ella'],
  ['buscador', 'Disparo Buscador', 'fuerza', 'Contra una criatura que viste en el último minuto y está en tu alcance largo, ignorando cobertura media y de tres cuartos: salvación de DES. Si falla, sabes dónde está'],
];
/* Disparos Arcanos (Arcana Unleashed 2026): [clave, nombre, tipo, texto] */
const cdArcano = c => 8 + c.pb + c.m.int;
const DISPAROS_ARCANOS: [string, string, string, (c: any) => string][] = [
  ['desterrador', 'Disparo Desterrador', 'gratis', c => `El objetivo recibe 1${dadoArcano(c)} de daño psíquico extra y hace una salvación de CAR (CD ${cdArcano(c)}); si falla, queda apartado en un semiplano: Incapacitado y con velocidad 0, y vuelve a su sitio (o al más cercano libre) al terminar su siguiente turno.`],
  ['hechizante', 'Disparo Hechizante', 'gratis', c => `El objetivo recibe 2${dadoArcano(c)} de daño psíquico extra y hace una salvación de SAB (CD ${cdArcano(c)}); si falla, queda Hechizado hasta el inicio de tu próximo turno, por ti o por un aliado a 30 pies de él (tú eliges). Se rompe si ese encantador lo ataca, lo daña o le fuerza una salvación.`],
  ['explosivo', 'Disparo Explosivo', 'gratis', c => `Tras dañar al objetivo, él y cada criatura en una emanación de 10 pies a su alrededor reciben 2${dadoArcano(c)} de daño de fuerza.`],
  ['debilitador', 'Disparo Debilitador', 'gratis', c => `El objetivo recibe 2${dadoArcano(c)} de daño necrótico extra y hace una salvación de CON (CD ${cdArcano(c)}); si falla, queda Envenenado hasta el final de su siguiente turno, y cada vez que acierte un ataque resta 1${dadoArcano(c)} a su daño.`],
  ['atrapador', 'Disparo Atrapador', 'gratis', c => `El objetivo recibe 1${dadoArcano(c)} de daño cortante extra y hace una salvación de FUE (CD ${cdArcano(c)}); si falla, unas zarzas lo dejan Apresado 1 minuto o hasta que vuelvas a usar este disparo. Él u otro a su alcance puede usar una acción para una prueba de FUE (Atletismo) contra esa CD y liberarlo.`],
  ['perforante', 'Disparo Perforante', 'gratis', c => `No tiras ataque: el proyectil recorre una línea de 30 pies por 1 de ancho desde ti, atravesando cobertura. Cada criatura en ella hace una salvación de DES (CD ${cdArcano(c)}); si falla, recibe el daño del arma más 2${dadoArcano(c)} de daño perforante, y si la supera, la mitad.`],
  ['buscador', 'Disparo Buscador', 'gratis', c => `No tiras ataque: eliges una criatura que hayas visto en el último minuto y el proyectil la persigue, doblando esquinas e ignorando cobertura media y de tres cuartos. Si está dentro del alcance largo, hace una salvación de DES (CD ${cdArcano(c)}); si falla, recibe el daño del arma más 2${dadoArcano(c)} de daño de fuerza y sabes dónde está, y si la supera, solo la mitad del daño.`],
  ['sombra', 'Disparo de Sombra', 'gratis', c => `El objetivo recibe 1${dadoArcano(c)} de daño psíquico extra y hace una salvación de SAB (CD ${cdArcano(c)}); si falla, queda Cegado hasta el final de su siguiente turno.`],
];
/* Runas del Caballero Rúnico (Tasha 2020): [clave, nombre, tipo, nivel, texto]; se invocan una vez por descanso (dos desde el nivel 15) */
const cdRuna = c => 8 + c.pb + c.m.con;
const dadoGigante = c => c.lvl >= 18 ? '1d10' : c.lvl >= 10 ? '1d8' : '1d6';
const RUNAS: [string, string, string, number, (c: any) => string][] = [
  ['nube', 'Runa de Nube', 'reaccion', 3, () => 'Pasiva: ventaja en Juego de Manos y Engaño. Al invocarla: cuando aciertan un ataque a ti o a alguien que veas a 30 pies, desvías ese ataque (con la misma tirada) a otra criatura a 30 pies de ti que no sea el atacante.'],
  ['fuego', 'Runa de Fuego', 'gratis', 3, c => `Pasiva: duplicas tu bonificador de competencia en pruebas con herramientas en las que seas competente. Al invocarla: al acertar con un arma, el objetivo recibe 2d6 de fuego extra y hace una salvación de FUE (CD ${cdRuna(c)}) o queda Apresado por grilletes de fuego 1 minuto, recibiendo 2d6 de fuego al inicio de cada turno suyo; repite la salvación al final de cada turno.`],
  ['escarcha', 'Runa de Escarcha', 'adicional', 3, () => 'Pasiva: ventaja en Trato con Animales e Intimidación. Al invocarla: durante 10 minutos sumas +2 a pruebas y salvaciones de FUE y CON.'],
  ['piedra', 'Runa de Piedra', 'reaccion', 3, c => `Pasiva: ventaja en Perspicacia y visión en la oscuridad a 120 pies. Al invocarla: cuando una criatura que veas termina su turno a 30 pies, hace una salvación de SAB (CD ${cdRuna(c)}) o queda Hechizada por ti 1 minuto, con velocidad 0 e Incapacitada; repite la salvación al final de cada turno suyo.`],
  ['colina', 'Runa de Colina', 'adicional', 7, () => 'Pasiva: ventaja en salvaciones contra quedar Envenenado y resistencia al daño de veneno. Al invocarla: durante 1 minuto tienes resistencia al daño contundente, perforante y cortante.'],
  ['tormenta', 'Runa de Tormenta', 'adicional', 7, () => 'Pasiva: ventaja en Arcanos y no te pueden sorprender mientras no estés Incapacitado. Al invocarla: durante 1 minuto, cuando tú u otra criatura que veas a 60 pies hace un ataque, una salvación o una prueba, puedes usar tu reacción para darle ventaja o desventaja.'],
];

/* Subclases que lanzan conjuros con un tercio de los niveles (Caballero Arcano, Embaucador Arcano, Guerrero de las Artes
   Místicas; Manual del Jugador 2024 y Arcana Unleashed 2026): espacios, preparados, trucos y característica */
const ESPACIOS_TERCIO = [[], [], [2], [3], [3], [3], [4, 2], [4, 2], [4, 2], [4, 3], [4, 3], [4, 3], [4, 3, 2], [4, 3, 2], [4, 3, 2], [4, 3, 3], [4, 3, 3], [4, 3, 3], [4, 3, 3, 1], [4, 3, 3, 1]];
const PREPARADOS_TERCIO = [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13];
export const espaciosTercio = lvl => ESPACIOS_TERCIO[lvl - 1] || [];
const NOMBRE_LISTA = {mago: 'Mago', hechicero: 'Hechicero'};
export const lanzadorTercio = (ab, lista, trucos) => ({
  efecto: c => {
    if (!c.casterAb) { c.casterAb = ab; c.mSpell = c.m[ab]; c.dcSpell = 8 + c.pb + c.mSpell; c.atkSpell = c.pb + c.mSpell; }
    espaciosTercio(c.lvl).forEach((n, i) => { if (!c.slots.some(e => e.nivel === i + 1)) c.slots.push({nivel: i + 1, n}); });
    c.listaSub = lista;
    c.trucosReglas = trucos(c); c.prepReglas = PREPARADOS_TERCIO[c.lvl - 1];
  },
  texto: c => `Lanzas conjuros de la lista de ${NOMBRE_LISTA[lista]} con ${NOMBRE_AB[ab]} (CD ${c.dcSpell}, ${sign(c.atkSpell)} al ataque). Conoces ${trucos(c)} trucos y preparas ${PREPARADOS_TERCIO[c.lvl - 1]} conjuros de nivel 1 o más; tus espacios: ${espaciosTercio(c.lvl).map((n, i) => `${n} de nivel ${i + 1}`).join(', ')}. Los eliges en el paso Conjuros y cambias uno al subir de nivel.`,
});

/* ---------- Investigator (Mage Hand Press, 2024; lote 30): tablas de la clase, de la parte B de la respuesta de Gemini ---------- */
const INV_RITUAL = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
const INV_APRESURADO = [0, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10];
const INV_AMULETOS = [0, 0, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
/* Magia de pacto del Occultist, desde el nivel 3: [trucos, conjuros preparados, espacios, nivel de los espacios] */
const INV_PACTO = [null, null, [2, 3, 1, 1], [2, 4, 1, 1], [2, 4, 2, 1], [2, 4, 2, 1], [2, 5, 2, 2], [2, 6, 2, 2], [2, 6, 2, 2], [3, 7, 2, 2], [3, 7, 2, 2], [3, 8, 2, 2],
  [3, 9, 2, 3], [3, 10, 2, 3], [3, 10, 2, 3], [3, 11, 2, 3], [3, 11, 2, 3], [3, 11, 2, 3], [3, 12, 2, 4], [3, 13, 2, 4]];
const invTabla = (t, c) => t[Math.min(20, Math.max(1, c.lvl)) - 1];
/* Golpe de Gracia: dados sobre una criatura Maltrecha, y los del Golpe de Gracia Mejorado sobre una que no lo está */
export const invGolpe = c => c.lvl >= 17 ? 3 : c.lvl >= 11 ? 2 : 1;
export const invGolpeMejorado = c => c.lvl >= 17 ? 2 : 1;
const invMod = c => Math.max(1, c.m.int);
const invCD = c => 8 + c.pb + c.m.int;
/* Lo que se gasta de Amuletos: un conjuro sin espacio ni componentes, o una opción propia */
const amuleto = (nombre, nota = '', tiempo = '') => ({nombre, ab:'int', recurso:'rg-amuletos', coste:'1 Amuleto', nota:`Amuleto: sin espacio ni componentes${nota ? '. ' + nota : ''}`, ...(tiempo ? {tiempo} : {})});
const opAmuleto = (nombre, t, texto) => ({nombre, t, recurso:'rg-amuletos', coste:'1 Amuleto', texto});
const reliquia = nombre => ({nombre, ab:'int', recurso:'rg-reliquias-arcanas', coste:'1 Reliquia', nota:'Reliquia Arcana: sin espacio ni componentes'});
/* Enigma Arcano: un conjuro por nivel de conjuro (7, 8 y 9), lanzado una vez por descanso largo sin espacio */
const ENIGMA = {7: ['Espejismo arcano', 'Desplazamiento entre planos', 'Invertir la gravedad', 'Recluir', 'Teletransporte'],
  8: ['Campo antimagia', 'Labia', 'Laberinto', 'Mente en blanco'], 9: ['Proyección astral', 'Portal', 'Asesino fantasmal']};
const enigma = nv => ({de:/^investigador$/, n:/^enigma arcano$/, nivel: nv * 2 - 1, t:'pasiva',
  eleccion: {id:`enigma-${nv}`, titulo:`Enigma Arcano: conjuro de nivel ${nv}`, opciones: ENIGMA[nv].map(s => ({key: norm(s), nombre: s}))},
  conjuros: c => { const k = elegido(c, `enigma-${nv}`), s = ENIGMA[nv].find(x => norm(x) === k); return s ? [{nombre: s, ab:'int', usos:1, reset:'largo', nota:'Enigma Arcano'}] : []; },
  texto: c => { const k = elegido(c, `enigma-${nv}`), s = ENIGMA[nv].find(x => norm(x) === k);
    return `Lanzas un conjuro de nivel ${nv} a tu elección sin gastar espacio, una vez por descanso largo: ${ENIGMA[nv].join(', ')}.${s ? ` Elegido: ${s}.` : ' Elígelo en el paso Clase.'}`; }});
/* Tesis del Archivist: conjuros que se añaden gratis al grimorio (y cuentan como rituales), por nivel de Investigador */
const TESIS = {
  corpus: ['Corpus', [[3, ['Alterar el propio aspecto', 'Salto']], [5, ['Forma gaseosa']], [7, ['Fabricar']], [9, ['Pasamuros']]]],
  mentis: ['Mentis', [[3, ['Hechizar persona', 'Zona de la verdad']], [5, ['Imagen mayor']], [7, ['Terreno alucinatorio']], [9, ['Ensueño']]]],
  mortis: ['Mortis', [[3, ['Falsa vida', 'Dulce descanso']], [5, ['Hablar con los Muertos']], [7, ['Guarda contra la Muerte']], [9, ['Caparazón antivida']]]],
  oculus: ['Oculus', [[3, ['Identificar', 'Detectar pensamientos']], [5, ['Recado']], [7, ['Localizar criatura']], [9, ['Escudriñar']]]],
};

export const REGLAS: any[] = [
  /* ---------- Pugilista (The Pugilist Class 2024, Benjamin Huffman) ----------
     La biblioteca ya trae la versión 2024 (scripts/datos/pugilista-2024.ts). Arena Royale y Matones Sabuesos
     solo existen en la versión de 2014 (Patreon) y se revisan con ella. */
  {de:/^pugilista$/, n:/^pugilismo/, t:'pasiva', dado: dadoPug,
    texto: c => `Sin armadura o con armadura ligera, sin escudo, y peleando sin armas o con armas de pugilista (sencillas cuerpo a cuerpo e improvisadas), tus golpes sin armas hacen ${dadoPug(c)} en vez de su daño normal (ya en Ataques). Sube a 1d10 en nivel 5, 1d12 en 11 y 2d6 en 17. Las armas improvisadas tienen para ti la maestría Aturdir.`,
    opciones: [
      {nombre:'Golpe sin armas extra (Pugilismo)', t:'adicional', roll: golpeU,
        texto: c => `Haces un golpe sin armas: ${c.unarmed.dmg}.`},
    ]},
  {de:/^pugilista$/, n:/^menton de hierro/, t:'pasiva',
    efecto: c => { if ((!c.armor || c.armor.cat === 'ligera') && !c.shield) c.ac = Math.max(c.ac, 12 + c.m.con); },
    texto: c => `Sin armadura o con armadura ligera y sin escudo, tu CA base es 12 + CON (${12 + c.m.con}); ya se usa si es mayor.`},
  {de:/^pugilista$/, n:/^ensangrentado pero invicto/, t:'reaccion', usos:1, reset:'corto',
    texto: c => `Cuando recibes daño, recuperas todo tu Moxie. Si estás Maltrecho, además ganas ${4 * c.lvl} PG temporales, que se pierden al terminar un descanso corto.`},
  {de:/^pugilista$/, n:/^determinacion/, t:'pasiva',
    texto: c => `Tienes ${moxieMax(c)} puntos de Moxie y los recuperas todos al terminar un descanso corto o largo. Sus tres usos básicos salen como acciones adicionales.`,
    opciones: [
      {nombre:'Prepárate', t:'adicional', coste:'1 Moxie', texto: c => `Ganas ${dadoPug(c)} + ${c.lvl + c.m.con} PG temporales, que se pierden a los 10 minutos.`},
      {nombre:'Uno-Dos', t:'adicional', coste:'1 Moxie', roll: golpeU, texto: c => `Haces dos golpes sin armas (${c.unarmed.dmg} cada uno).`},
      {nombre:'Pegar y Moverse', t:'adicional', coste:'1 Moxie', roll: golpeU, texto: c => `Haces un golpe sin armas (${c.unarmed.dmg}) y además Corres o te Destrabas.`},
    ]},
  {de:/^pugilista$/, n:/^racha de descaro/, t:'gratis', coste:'1 Moxie',
    texto: c => `Cuando fallas una prueba de FUE, DES, CON o CAR, sumas ${dadoPug(c)}. Si aun así fallas, recuperas el Moxie y no puedes volver a usarlo hasta un descanso corto o largo.`},
  {de:/^pugilista$/, n:/^pegador/, t:'gratis',
    texto: c => `Cuando aciertas un golpe sin armas, haces el daño y además agarras o empujas a la criatura (CD ${c.grappleDC}).`},
  {de:/^pugilista$/, n:/^escarbar profundo/, t:'adicional', usos:1, reset:'largo',
    texto: () => 'Durante 10 minutos tienes resistencia al daño contundente, cortante y perforante e ignoras el agotamiento por debajo de 6. Recuperas su uso al terminar un descanso largo, o al ganar un nivel de agotamiento.'},
  {de:/^pugilista$/, n:/^ataque extra/, t:'pasiva', texto: () => 'Cuando usas la acción Atacar, atacas dos veces.'},
  {de:/^pugilista$/, n:/^gancho devastador/, t:'gratis', coste:'1 Moxie',
    texto: () => 'Al atacar con un golpe sin armas o un arma de pugilista, lanzas el golpe sin reservas: si aciertas, recuperas el Moxie y haces el daño máximo.'},
  {de:/^pugilista$/, n:/^punos de/, t:'pasiva',
    texto: () => 'Tus golpes sin armas y tus ataques con armas improvisadas pueden hacer daño de fuerza en vez de su tipo normal.'},
  {de:/^pugilista$/, n:/^derribado pero no vencido/, t:'gratis', usos:1, reset:'largo',
    texto: c => `Cuando usas Ensangrentado pero Invicto estando Maltrecho, durante 1 minuto sumas ${sign(c.m.con)} más tus niveles de agotamiento al daño de tus golpes sin armas y armas de pugilista.`},
  {de:/^pugilista$/, n:/^escuela de los golpes duros/, t:'gratis',
    texto: () => 'Una vez por turno, al acertar con un golpe sin armas o un arma de pugilista, haces 1d12 de daño extra del mismo tipo. En vez de ese daño puedes Ponerla en Peligro (el próximo ataque que la acierte hace el daño máximo) o Provocarla (desventaja al atacar a otros que no seas tú hasta el final de tu siguiente turno).'},
  {de:/^pugilista$/, n:/^herculeo/, t:'pasiva',
    texto: () => 'Tu FUE cuenta el doble para la capacidad de carga, tus golpes sin armas contra objetos son críticos y tus saltos llegan al doble.'},
  {de:/^pugilista$/, n:/^sacudetelo/, t:'gratis', usos:1, reset:'largo',
    texto: () => 'Al empezar tu turno te quitas uno de estos estados: Cegado, Hechizado, Ensordecido, un nivel de agotamiento, Asustado, Paralizado, Envenenado, Apresado o Aturdido. Recuperas su uso al terminar un descanso largo, o al ganar un nivel de agotamiento.'},
  {de:/^pugilista$/, n:/^escarbar mas hondo/, t:'adicional', usos: c => c.lvl >= 20 ? 2 : 1, reset:'largo',
    texto: () => 'Durante 1 minuto tienes los beneficios de Escarbar Profundo y usas Escuela de los Golpes Duros dos veces por turno.'},
  {de:/^pugilista$/, n:/^inquebrantable/, t:'pasiva',
    texto: () => 'Ventaja en salvaciones de FUE, DES y CON. Cuando fallas una salvación, puedes gastar 1 Moxie para repetirla y quedarte con la nueva tirada.'},
  {de:/^pugilista$/, n:/^pugnaz/, t:'gratis', usos:1, reset:'largo',
    texto: () => 'Al tirar iniciativa te quitas un nivel de agotamiento y recuperas los usos de Derribado pero No Vencido, Escarbar Profundo y Sacúdetelo.'},
  {de:/^pugilista$/, n:/^espiritu de lucha/, t:'gratis', usos:1, reset:'largo',
    texto: c => `Cuando caes a 0 PG sin morir en el acto, quedas con 1 PG, ganas ${Math.floor(c.hpMax / 2)} PG temporales, recuperas todo tu Moxie y durante 1 minuto tienes resistencia a todo el daño salvo el de fuerza.`},
  {de:/^pugilista$/, n:/^condicion fisica optima/, t:'pasiva',
    texto: c => `Tu FUE y tu CON suben 2, hasta un máximo de 23 (súmalo en Características como ajuste). Al terminar un descanso largo pierdes todo el agotamiento, y al terminar uno corto recuperas ${2 * c.lvl} PG.`},

  /* El Perro y el Sabueso */
  {de:/perro y el sabueso/, n:/^el mejor amigo del luchador/, t:'pasiva',
    texto: () => `Te acompaña un sabueso; su hoja, con sus PG y su Mordisco, está en Familiares y criaturas. Actúa en tu turno; si no le das órdenes, solo Esquiva. Si estás Incapacitado, actúa solo. Al terminar un descanso largo puedes vincularte con un perro nuevo.`,
    opciones: [
      {nombre:'Ordenar al sabueso', t:'adicional', texto: () => 'Tu sabueso hace una acción, como su Mordisco (en su hoja, en Familiares y criaturas). También puedes cambiar uno de tus ataques de la acción Atacar por su Mordisco.'},
      {nombre:'Revivir al sabueso', t:'accion', coste:'2 Moxie', texto: () => 'Si murió hace menos de 1 hora, lo tocas y vuelve con todos sus PG al cabo de 1 minuto.'},
    ]},
  {de:/perro y el sabueso/, n:/^chucho con/, t:'pasiva',
    texto: () => 'Tu sabueso comparte tu Moxie: con Prepárate gana los mismos PG temporales, con Uno-Dos puede dar él uno o los dos golpes, y con Pegar y Moverse puede Correr, Destrabarse o Ayudar.'},
  {de:/perro y el sabueso/, n:/^ataque coordinado/, t:'reaccion',
    texto: () => 'Reacción de tu sabueso: cuando atacas a una criatura que él tiene a 5 pies, te da ventaja, y si aciertas haces 3d4 de daño extra. Su mordisco puede hacer daño de fuerza.'},
  {de:/perro y el sabueso/, n:/^el mejor amigo del sabueso/, t:'reaccion',
    texto: () => 'Cuando una criatura daña a tu sabueso con un ataque, te mueves hasta la mitad de tu velocidad y la atacas cuerpo a cuerpo con un golpe sin armas o un arma de pugilista.'},
  {de:/perro y el sabueso/, n:/^sin correa/, t:'reaccion', usos:1, reset:'largo', coste:'1 por descanso largo, o 3 Moxie',
    texto: c => `Cuando tu sabueso queda Maltrecho o recibe daño estando Maltrecho, lo sueltas: gana ${5 * c.lvl} PG temporales y durante 1 minuto tiene +15 pies de velocidad y muerde sin que gastes tu acción adicional.`},

  /* Mano del Pavor */
  {de:/mano del pavor/, n:/^magia negra/, t:'pasiva',
    texto: c => `Aprendes dos trucos de brujo y un conjuro de nivel 1 de brujo que siempre tienes preparado; lo lanzas una vez sin espacio por descanso largo. Usas CON (CD ${cdCon(c)}, ${sign(c.pb + c.m.con)} al ataque). Agrégalos en el paso Conjuros. Al subir de nivel puedes cambiar uno.`},
  {de:/mano del pavor/, n:/^mano del pavor/, t:'gratis', usos:1, reset:'corto',
    texto: () => 'Al usar la acción Atacar, uno de tus miembros se vuelve monstruoso durante 1 minuto: tiras dos veces el daño de tus golpes sin armas y te quedas con el mejor, y repites el primer golpe sin armas que falles cada turno.',
    opciones: [
      {nombre:'Golpe de Venganza (Mano del Pavor)', t:'reaccion', texto: () => 'Con la Mano del Pavor activa, cuando te aciertan cuerpo a cuerpo, haces un golpe sin armas a quien te atacó si está a tu alcance.'},
    ]},
  {de:/mano del pavor/, n:/^trato con el diablo/, t:'pasiva',
    eleccion: {id:'trato-diablo', titulo:'Trato con el Diablo', opciones: [{key:'manto', nombre:'Manto de Sombras', desc:'Acción, 1 por descanso corto: lanzas Invisibilidad sin gastar espacio.'}, {key:'mascara', nombre:'Máscara de Mil Caras', desc:'Acción, sin límite: lanzas Disfrazarse sin gastar espacio.'}, {key:'paso', nombre:'Paso de Otro Mundo', desc:'Acción adicional, 1 por descanso corto: lanzas Paso brumoso sin gastar espacio.'}]},
    texto: c => TRATO[elegido(c, 'trato-diablo')] ? `Elegiste ${TRATO[elegido(c, 'trato-diablo')]}; puedes cambiarlo al terminar un descanso largo.` : 'Elige una opción en el paso Clase (se cambia al terminar un descanso largo): Manto de Sombras, Máscara de Mil Caras o Paso de Otro Mundo.',
    opciones: [
      {nombre:'Manto de Sombras', t:'accion', usos:1, reset:'corto', si: c => elegido(c, 'trato-diablo') === 'manto', texto: () => 'Lanzas Invisibilidad sin gastar espacio.'},
      {nombre:'Máscara de Mil Caras', t:'accion', si: c => elegido(c, 'trato-diablo') === 'mascara', texto: () => 'Lanzas Disfrazarse sin gastar espacio, cuando quieras.'},
      {nombre:'Paso de Otro Mundo', t:'adicional', usos:1, reset:'corto', si: c => elegido(c, 'trato-diablo') === 'paso', texto: () => 'Lanzas Paso brumoso sin gastar espacio.'},
    ]},
  {de:/mano del pavor/, n:/^crecimiento grotesco/, t:'gratis', usos:1, reset:'largo',
    texto: () => 'Al usar la Mano del Pavor también te agrandas (como Agrandar de Agrandar/Reducir) y tu alcance es de 10 pies. Recuperas su uso con un descanso largo, o al ganar un nivel de agotamiento.'},
  {de:/mano del pavor/, n:/^fuente de visceras/, t:'accion', usos:1, reset:'largo', coste: () => '6 Moxie, 1 por descanso largo',
    texto: c => `Intentas ejecutar a una criatura a tu alcance: salvación de DES (CD ${cdFue(c)}); si falla, recibe 100 de daño perforante, y si la pasa, 50. Si muere, quienes elijas a 30 pies hacen una salvación de SAB (CD ${cdFue(c)}) o quedan Asustados 1 minuto (repiten al final de cada turno).`},

  /* Pura Mala Leche */
  {de:/mala leche/, n:/^mala actitud/, t:'pasiva',
    efecto: c => { const k = 'intimidacion'; if (!c.skillProf[k]) { c.skill[k] += c.pb; c.skillProf[k] = true; } c.skill[k] += Math.max(1, c.m.fue); },
    texto: c => `Competencia en Intimidación y ${sign(Math.max(1, c.m.fue))} más a esas pruebas (ya sumado).`},
  {de:/mala leche/, n:/^saludo salado/, t:'adicional',
    texto: c => `Provocas a una criatura a 60 pies que te vea u oiga: salvación de SAB (CD ${cdCon(c)}); si falla, recibe ${dadoPug(c)}${fmtMod(c.m.con)} de daño psíquico y tiene desventaja al atacar a otros que no seas tú hasta el inicio de tu próximo turno.`},
  {de:/mala leche/, n:/^trucos sucios/, t:'pasiva',
    texto: c => `Un truco por turno, cada uno una vez por descanso corto o largo (CD ${cdCon(c)}).`,
    opciones: [
      {nombre:'Pisotón', t:'gratis', usos:1, reset:'corto', texto: c => `Al dañar con un golpe sin armas o un arma de pugilista: salvación de DES (CD ${cdCon(c)}) o su velocidad es 0 durante 1 minuto (repite al final de cada turno suyo).`},
      {nombre:'Golpe Bajo', t:'gratis', usos:1, reset:'corto', texto: c => `Al dañar con un golpe sin armas o un arma de pugilista: salvación de FUE (CD ${cdCon(c)}) o los ataques contra ella tienen ventaja hasta el final de tu próximo turno.`},
      {nombre:'Arena al Bolsillo', t:'adicional', usos:1, reset:'corto', texto: c => `Una criatura a 10 pies: salvación de CON (CD ${cdCon(c)}) o queda Cegada hasta el final de su próximo turno.`},
    ]},
  {de:/mala leche/, n:/^viejo grosero/, t:'adicional', usos:1, reset:'corto', coste:'1 por descanso corto, o 3 Moxie',
    texto: c => `Eliges hasta ${c.lvl} criaturas a 30 pies que te vean u oigan: cada una hace una salvación de SAB (CD ${cdCon(c)}) o recibe ${dadoPug(c)}${fmtMod(c.m.con)} de daño psíquico y tiene desventaja al atacar a otros que no seas tú hasta el inicio de tu próximo turno.`},
  {de:/mala leche/, n:/^trucos mas sucios/, t:'pasiva',
    texto: () => 'Dos trucos sucios más, con las mismas reglas.',
    opciones: [
      {nombre:'Golpe de Conejo', t:'gratis', usos:1, reset:'corto', texto: () => 'Al acertar con un golpe sin armas o un arma de pugilista, le das en la cabeza: hasta el final de tu próximo turno pierde la resistencia al daño psíquico y tiene desventaja en las salvaciones.'},
      {nombre:'Golpe a Traición', t:'gratis', usos:1, reset:'corto', texto: () => 'Al acertar con un golpe sin armas o un arma de pugilista, lo conviertes en crítico y tiras los dados de daño tres veces en vez de dos.'},
    ]},

  /* El Círculo Cuadrado */
  {de:/circulo cuadrado/, n:/^trabajo de suelo/, t:'pasiva',
    texto: () => 'Tres formas de castigar a quien agarras; salen aparte.',
    opciones: [
      {nombre:'Llave de Compresión', t:'gratis', texto: c => `Al empezar tu turno, cada criatura que tienes agarrada recibe ${dadoPug(c)}${fmtMod(c.m.fue)} de daño contundente.`},
      {nombre:'Ineludible', t:'gratis', coste:'1 Moxie', texto: () => 'Cuando una criatura hace una salvación o prueba contra tu CD de agarre o empuje, le das desventaja.'},
      {nombre:'Derribar y Soltar', t:'gratis', texto: () => 'Cuando aciertas un golpe sin armas y no usas una maestría, puedes agarrar y empujar a la vez.'},
    ]},
  {de:/circulo cuadrado/, n:/^masa muscular/, t:'pasiva',
    eleccion: {id:'masa-muscular', titulo:'Masa Muscular', opciones: [{key:'acrobacias', nombre:'Acrobacias', desc:'Competencia en Acrobacias, o pericia si ya la tenías.'}, {key:'atletismo', nombre:'Atletismo', desc:'Competencia en Atletismo, o pericia si ya la tenías.'}]},
    efecto: c => { const k = elegido(c, 'masa-muscular'); if (!k) return; if (c.skillProf[k]) { if (!c.skillPer[k]) { c.skill[k] += c.pb; c.skillPer[k] = true; } } else { c.skill[k] += c.pb; c.skillProf[k] = true; } },
    texto: c => elegido(c, 'masa-muscular') ? `${elegido(c, 'masa-muscular') === 'acrobacias' ? 'Acrobacias' : 'Atletismo'}: competencia, o pericia si ya la tenías (ya sumado).` : 'Elige Acrobacias o Atletismo en el paso Clase: ganas competencia, o pericia si ya la tenías.'},
  {de:/circulo cuadrado/, n:/^escudo de carne/, t:'pasiva',
    texto: () => 'Mientras agarras a una criatura, tienes cobertura contra los ataques de quienes no agarras.',
    opciones: [
      {nombre:'Escudo de Carne', t:'reaccion', coste:'1 Moxie', texto: () => 'Cuando alguien que no agarras falla un ataque contra ti, lo obligas a repetirlo contra una criatura que tienes agarrada.'},
    ]},
  {de:/circulo cuadrado/, n:/^peso pesado/, t:'pasiva',
    texto: () => 'Al agarrar o empujar cuentas como un tamaño más grande, y mover a quien agarras no te cuesta movimiento extra si es de tu tamaño o menor.'},
  {de:/circulo cuadrado/, n:/^remate limpio/, t:'reaccion',
    texto: c => `Cuando una criatura termina su turno agarrada por ti, hace una salvación de CON (CD ${c.grappleDC}) o queda Incapacitada hasta el final de su próximo turno. Si ya estaba Incapacitada por esto y está Maltrecha, cae a 0 PG; eso solo una vez por descanso largo.`},

  /* La Dulce Ciencia */
  {de:/dulce ciencia/, n:/^boxeador a puno limpio/, t:'pasiva', texto: () => 'Tus golpes sin armas hacen crítico con 19 o 20.'},
  {de:/dulce ciencia/, n:/^contragolpe cruzado/, t:'reaccion', coste:'1 Moxie',
    texto: c => `Cuando un ataque cuerpo a cuerpo te hace daño, lo reduces en 1d10 + ${c.m.fue + c.lvl}. Si queda en 0, en la misma reacción haces un golpe sin armas o un ataque con un arma de pugilista a una criatura a tu alcance.`},
  {de:/dulce ciencia/, n:/^creador de combos/, t:'gratis',
    texto: () => 'Cuando dañas con un golpe sin armas, en vez de agarrar o empujar con Pegador te das ventaja en tus ataques contra esa criatura hasta el inicio de tu próximo turno.'},
  {de:/dulce ciencia/, n:/^rompecombos/, t:'pasiva', texto: () => 'Cuando tu Contragolpe Cruzado reduce el daño a 0, recuperas 1 Moxie.'},
  {de:/dulce ciencia/, n:/^nocaut/, t:'pasiva',
    texto: () => 'Dos golpes finales; salen aparte.',
    opciones: [
      {nombre:'Mandíbula de Cristal', t:'gratis', texto: c => `Cuando haces un crítico, la criatura hace una salvación de CON (CD ${cdFue(c)}) o queda Inconsciente 1 minuto o hasta que reciba daño.`},
      {nombre:'Gancho Final', t:'reaccion', coste:'1 Moxie', usos:1, reset:'corto', texto: () => 'Cuando aciertas un golpe sin armas, lo conviertes en crítico.'},
    ]},

  /* Santo Callejero (nuevo en 2024) */
  {de:/santo callejero/, n:/^canalizar divinidad/, t:'pasiva', usos:1, reset:'corto',
    texto: () => 'Canalizas energía divina una vez por descanso corto o largo, con uno de estos efectos.',
    opciones: [
      {nombre:'Puños de Fe', t:'adicional', coste:'1 Canalizar Divinidad', texto: () => 'Durante 1 minuto tus golpes sin armas hacen 1d4 de daño radiante extra, o 2d4 contra infernales y muertos vivientes.'},
      {nombre:'Gracia de los Dioses', t:'adicional', coste:'1 Canalizar Divinidad', texto: () => 'Durante 1 minuto tienes resistencia al daño necrótico y sumas 1d4 a tus salvaciones.'},
    ]},
  {de:/santo callejero/, n:/^imposicion de manos/, t:'adicional', usos: c => 3 * c.lvl, pool: true, reset:'largo', coste: c => `de tu reserva de ${3 * c.lvl}`,
    texto: () => 'Tocas a una criatura (puede ser tú) y le devuelves PG de tu reserva, o gastas 5 para quitarle Envenenado.'},
  {de:/santo callejero/, n:/^maltrecho pero resuelto/, t:'gratis', usos:1, reset:'largo',
    texto: () => 'Cuando usas Ensangrentado pero Invicto, rellenas toda tu reserva de Imposición de Manos.'},
  {de:/santo callejero/, n:/^aura de resiliencia/, t:'gratis', usos:1, reset:'largo',
    texto: () => 'Cuando usas Escarbar Profundo, durante 10 minutos tus aliados a 10 pies tienen resistencia al daño contundente, cortante y perforante (no funciona si estás Incapacitado).'},
  {de:/santo callejero/, n:/^manos consagradas/, t:'gratis',
    texto: c => `Una vez en cada uno de tus turnos, al acertar con un golpe sin armas o un arma de pugilista, gastas hasta ${c.lvl} puntos de Imposición de Manos y haces ese daño radiante extra, el doble contra infernales y muertos vivientes.`},

  /* Arena Royale (Patreon de 2014; no hay versión 2024) */
  {de:/arena royale/, n:/^competencia adicional/, t:'pasiva',
    efecto: c => { const k = 'interpretacion'; if (!c.skillProf[k]) { c.skill[k] += c.pb; c.skillProf[k] = true; } },
    texto: () => 'Competencia en Interpretación (ya sumada); si ya la tenías, en Intimidación o Persuasión (márcala en Habilidades).'},
  {de:/arena royale/, n:/^persona libre/, t:'adicional', usos: c => Math.max(3, 3 + c.m.car), pool: true, reset:'largo', coste: c => `reserva de ${Math.max(3, 3 + c.m.car)} puntos de persona`,
    texto: c => `Adoptas o dejas tu personaje de ring (con nombre y un distintivo, como una máscara); quien no te vea hacerlo no sabe que sois la misma persona. Con él puesto, gastas puntos de persona en vez de Moxie, o 1 punto antes de una prueba de CAR para sumarle ${sign(c.m.fue)}.`},
  {de:/arena royale/, n:/^trabajar el publico/, t:'accion', usos:1, reset:'corto',
    texto: c => `Con tu personaje puesto, las criaturas que elijas a 30 pies y te vean hacen una salvación de SAB (CD ${cdFue(c)}) o quedan Hechizadas (adoración) o Asustadas (miedo) 1 minuto; repiten cada vez que tú o un aliado las daña.`},
  {de:/arena royale/, n:/^volador aereo/, t:'pasiva', efecto: c => { c.speed += 10; },
    texto: () => '+10 pies de velocidad (ya sumado) y tus saltos llegan al doble.',
    opciones: [{nombre:'Correr (Volador Aéreo)', t:'adicional', texto: () => 'Usas la acción Correr.'}]},
  {de:/arena royale/, n:/^movimiento personal/, t:'gratis', usos:1, reset:'largo',
    texto: () => 'Con tu personaje puesto, cambias uno de tus ataques por tu movimiento estrella: saltas hasta tu velocidad y atacas con ventaja; si aciertas es crítico y queda Aturdida hasta el final de tu próximo turno. Si fallas, recuperas el uso al cabo de 1 minuto.'},

  /* Matones Sabuesos (Patreon de 2014; no hay versión 2024) */
  {de:/matones sabuesos/, n:/^siempre alerta/, t:'pasiva',
    texto: () => 'Ventaja en las tiradas de iniciativa. En la primera ronda de combate tienes ventaja en los ataques contra las criaturas que aún no han actuado.'},
  {de:/matones sabuesos/, n:/^trabajo de detective/, t:'pasiva',
    eleccion: {id:'detective', titulo:'Trabajo de Detective', max: 2, opciones: [{key:'perspicacia', nombre:'Perspicacia', desc:'Competencia en Perspicacia.'}, {key:'investigacion', nombre:'Investigación', desc:'Competencia en Investigación.'}, {key:'percepcion', nombre:'Percepción', desc:'Competencia en Percepción.'}]},
    efecto: c => elegidos(c, 'detective').forEach(k => { if (!c.skillProf[k]) { c.skill[k] += c.pb; c.skillProf[k] = true; } }),
    texto: () => 'Competencia en dos de estas habilidades (elígelas en el paso Clase; ya sumadas): Perspicacia, Investigación o Percepción.',
    opciones: [{nombre:'Olfato de detective', t:'gratis', coste:'1 Moxie', texto: () => 'Ventaja en una prueba de Investigación, Perspicacia o Percepción.'}]},
  {de:/matones sabuesos/, n:/^pelea como un sabueso/, t:'adicional', coste:'2 Moxie',
    texto: c => `Te fijas en un enemigo que veas a 30 pies: durante 1 minuto tienes ventaja en tus ataques con arma contra él y sumas ${c.pb} a tu CA contra sus ataques.`},
  {de:/matones sabuesos/, n:/^corazon de la ciudad/, t:'fuera',
    texto: () => 'Al terminar un descanso largo en un asentamiento, lo haces tuyo. Allí no te sorprenden, sumas tu competencia a la iniciativa, ves en la oscuridad a 120 pies, tienes doble competencia en Perspicacia, Investigación y Percepción, no te pierdes y fuera de combate viajas al doble de rápido.'},
  {de:/matones sabuesos/, n:/^ojos bien abiertos/, t:'adicional', coste:'1 Moxie',
    texto: () => 'Durante 1 minuto tienes ventaja en salvaciones contra quedar Cegado o Ensordecido y visión verdadera a 30 pies.'},

  /* ---------- Cazador de Sangre (Matt Mercer, versión 2022 de D&D Beyond) ----------
     Donde la biblioteca trae un rasgo que no es el de 2022 en ese nivel, la regla lo renombra con el oficial. */
  {de:/cazador de sangre/, n:/^perdicion del cazador/, t:'pasiva',
    texto: c => `Ventaja en Supervivencia (SAB) para rastrear feéricos, infernales y muertos vivientes, y en pruebas de INT para recordar datos sobre ellos. La CD de tus rasgos de hemomancia es ${cdHemo(c)}.`},
  {de:/cazador de sangre/, n:/^maldicion de sangre/, t:'pasiva', usos: maldicionesUsos, reset:'corto',
    eleccion: {id:'maldiciones', titulo:'Maldiciones que conoces', max: maldicionesConocidas, opciones: MALDICIONES.map(([key, n]) => ({key, nombre:`Maldición ${n}`}))},
    texto: c => `Conoces ${maldicionesConocidas(c)} maldición(es) de la lista (más las que te dé tu orden); al subir de nivel puedes cambiar una. Al invocarla puedes amplificarla: recibes ${dadoHemo(c)} de daño necrótico que no se puede reducir y ganas su efecto extra. Las criaturas sin sangre son inmunes salvo que la amplifiques.`,
    opciones: [
      maldicion('Maldición del Ansioso', 'adicional', c => `Una criatura a 30 pies: hasta el final de tu siguiente turno, las pruebas de Intimidación contra ella tienen ventaja. ${amplificar(c)}: su próxima salvación de SAB antes de que acabe tiene desventaja.`, 'ansioso'),
      maldicion('Maldición de la Atadura', 'adicional', c => `Una criatura Grande o menor que veas a 30 pies hace una salvación de FUE (CD ${cdHemo(c)}). Si falla, su velocidad es 0 y no puede usar reacciones hasta el final de tu siguiente turno. ${amplificar(c)}: dura 1 minuto, sirve con cualquier tamaño y repite la salvación al final de cada turno suyo.`, 'atadura'),
      maldicion('Maldición de la Agonía Hinchada', 'adicional', c => `Una criatura que veas a 30 pies, hasta el final de tu siguiente turno: desventaja en pruebas de FUE y DES, y recibe 1d8 de daño necrótico si hace más de un ataque en su turno. ${amplificar(c)}: dura 1 minuto, con salvación de CON (CD ${cdHemo(c)}) al final de cada turno suyo para terminarla.`, 'agonia'),
      maldicion('Maldición de la Exposición', 'reaccion', c => `Cuando una criatura que ves a 30 pies recibe daño de un ataque o conjuro, pierde la resistencia a esos tipos de daño hasta el final de su siguiente turno, también contra ese daño. ${amplificar(c)}: pierde la inmunidad a esos tipos, pero tiene resistencia a ellos.`, 'exposicion'),
      maldicion('Maldición de los Sin Ojos', 'reaccion', c => `Cuando una criatura que ves a 30 pies ataca, tiras ${dadoHemo(c)} y lo restas de su tirada; lo decides después de que tire y antes de saber si acierta. Los inmunes a Cegado son inmunes. ${amplificar(c)}: se aplica a todos sus ataques de ese turno, con una tirada por ataque.`, 'sin-ojos'),
      maldicion('Maldición del Títere Caído', 'reaccion', c => `Cuando una criatura que ves a 30 pies cae a 0 PG, hace de inmediato un ataque con arma contra el objetivo que elijas a su alcance. ${amplificar(c)}: antes se mueve hasta la mitad de su velocidad y suma ${sign(modHemo(c))} al ataque.`, 'titere'),
      maldicion('Maldición del Marcado', 'adicional', c => `Marcas a una criatura que veas a 30 pies: hasta el final de tu turno, cuando la golpeas con un arma con Rito Carmesí, tiras un ${dadoHemo(c)} más de daño del rito. ${amplificar(c)}: tu próxima tirada de ataque contra ella este turno tiene ventaja.`, 'marcado'),
      maldicion('Maldición de la Mente Confusa', 'adicional', c => `Una criatura que veas a 30 pies y que esté concentrada tiene desventaja en su próxima salvación de CON para mantener la concentración antes del final de tu siguiente turno. ${amplificar(c)}: desventaja en todas esas salvaciones hasta el final de tu siguiente turno.`, 'mente-confusa'),
    ]},
  {de:/cazador de sangre/, n:/^estilo de combate/, t:'pasiva',
    texto: () => 'Eliges tu estilo en el paso Clase y su efecto aparece aparte. En la versión 2022 las opciones son Arquería, Duelo, Combate con Arma a Dos Manos y Combate con Dos Armas.'},
  {de:/cazador de sangre/, n:/^rito carmesi/, t:'adicional', coste: c => `recibes ${dadoHemo(c)} necrótico`,
    eleccion: {id:'ritos', titulo:'Ritos que conoces', max: ritosConocidos, opciones: RITOS.map(([key, n, tipo, nivel]) => ({key, nombre:n, nota:`(${tipo})`, nivel, desc: c => `Con el rito activo, tu arma hace ${dadoHemo(c)} de daño ${tipo} extra.${nivel ? ' Rito esotérico: solo desde nivel 14.' : ''}`}))},
    texto: c => `Activas un rito que conoces en un arma que empuñas hasta tu próximo descanso corto o largo. Sus ataques son mágicos y hacen ${esOrden(c, /cazafantasmas/) && c.lvl >= 11 ? `2 × ${dadoHemo(c)}` : dadoHemo(c)} extra del tipo del rito. Un arma solo tiene un rito a la vez. El daño que recibes al activarlo no se puede reducir. ${ritosTexto(c)}`},
  {de:/cazador de sangre/, n:/^ataque extra/, t:'pasiva',
    texto: () => 'Cuando usas la acción Atacar, atacas dos veces.'},
  {de:/cazador de sangre/, n:/^marca de castigo/, t:'gratis', usos:1, reset:'corto',
    texto: c => `Cuando dañas a una criatura con un arma con Rito Carmesí, puedes marcarla. Sabes en qué dirección está mientras siga en tu plano. Cada vez que te hace daño a ti o a alguien que veas a 5 pies de ti, recibe ${danoMarca(c)} de daño psíquico. Dura hasta que la quites o marques a otra; Disipar magia la trata como conjuro de nivel ${Math.min(9, Math.floor(c.lvl / 2))}.`},
  {de:/cazador de sangre/, n:/^psicometria sombria/, t:'fuera',
    texto: () => 'Ventaja en Historia (INT) para recordar el pasado siniestro o trágico de un objeto que tocas o del lugar donde estás. Con una tirada muy alta, el DM puede darte visiones breves.'},
  {de:/cazador de sangre/, n:/^aumento oscuro/, t:'pasiva',
    efecto: c => { c.speed += 5; ['fue', 'des', 'con'].forEach(k => c.saves[k] += modHemo(c)); },
    texto: c => `+5 pies de velocidad y ${sign(modHemo(c))} a las salvaciones de FUE, DES y CON (ya sumados).`},
  {de:/cazador de sangre/, n:/^marca de atadura/, t:'pasiva',
    texto: c => `Tu Marca de Castigo hace ${danoMarca(c)} de daño psíquico (ya sumado). La criatura marcada no puede Correr, y si intenta teletransportarse o salir de su plano recibe 4d6 de daño psíquico y hace una salvación de SAB (CD ${cdHemo(c)}); si falla, el intento fracasa.`},
  {de:/cazador de sangre/, n:/^alma endurecida/, t:'pasiva',
    texto: () => 'Ventaja en salvaciones para no quedar Hechizado ni Asustado.'},
  {de:/cazador de sangre/, n:/^maestria sanguinea/, t:'gratis',
    texto: () => 'Una vez por turno, cuando un rasgo de Cazador de Sangre te hace tirar el dado de hemomancia, puedes repetirlo y quedarte con el resultado que prefieras. Al hacer un crítico con un arma con Rito Carmesí activo, recuperas un uso de Maldición de Sangre.'},

  /* Orden del Cazafantasmas */
  {de:/cazafantasmas/, n:/^rito del alba/, t:'pasiva',
    texto: c => `Aprendes el Rito del Alba (daño radiante). Mientras está activo, tu arma da luz brillante a 20 pies, tienes resistencia al daño necrótico, y al golpear a un muerto viviente tiras un ${dadoHemo(c)} más de daño del rito.`},
  {de:/cazafantasmas/, n:/^maldicion del espectro/, nombre:'Especialista en Maldiciones', t:'pasiva',
    texto: () => 'Tienes un uso más de Maldición de Sangre (ya sumado) y tus maldiciones afectan también a criaturas sin sangre.'},
  {de:/cazafantasmas/, n:/^paso etereo/, t:'gratis', usos: c => c.lvl >= 15 ? 2 : 1, reset:'corto',
    texto: c => `Al empezar tu turno, si no estás Incapacitado, entras en el velo entre planos durante ${modHemo(c)} ronda(s): atraviesas criaturas y objetos como terreno difícil, y ves y afectas lo que está en el Plano Etéreo. Si acabas tu turno dentro de un objeto recibes 1d10 de daño de fuerza; si sigues dentro al terminar, sales al espacio libre más cercano y recibes 2 de daño de fuerza por cada pie recorrido.`},
  {de:/cazafantasmas/, n:/^venganza de sangre/, nombre:'Marca de Ruptura', t:'pasiva',
    texto: c => `Cuando golpeas con un arma con Rito Carmesí, tiras un ${dadoHemo(c)} más de daño del rito (ya contado en Rito Carmesí). Una criatura con tu Marca de Castigo y Movimiento Incorpóreo no puede atravesar criaturas ni objetos.`},
  {de:/cazafantasmas/, n:/^alma sangrienta/, nombre:'Maldición del Exorcista', t:'adicional', coste:'1 Maldición de Sangre',
    texto: c => `Maldición extra que no cuenta entre las que conoces. Una criatura que veas a 30 pies deja de estar Hechizada, Asustada o poseída. ${amplificar(c)}: quien causó ese efecto recibe 3d6 de daño psíquico y hace una salvación de SAB (CD ${cdHemo(c)}) o queda Aturdida hasta el final de tu siguiente turno.`},
  {de:/cazafantasmas/, n:/^rito critico/, nombre:'Renacer del Rito', t:'gratis',
    texto: () => 'Si tienes algún Rito Carmesí activo y caes a 0 PG sin morir en el acto, puedes terminar todos tus ritos y quedarte con 1 PG.'},

  /* Orden del Licántropo */
  {de:/licantropo/, n:/^biologia alterada/, nombre:'Sentidos Agudizados', t:'pasiva',
    texto: () => 'Ventaja en Percepción (SAB) cuando usas el oído o el olfato.'},
  {de:/licantropo/, n:/^transformacion hibrida/, t:'adicional', usos: c => c.lvl >= 18 ? 0 : c.lvl >= 11 ? 2 : 1, reset:'corto', coste: c => c.lvl >= 18 ? 'sin límite' : '',
    ataques: c => [ataqueGarras(c)],
    texto: c => `Tomas tu forma híbrida ${c.lvl >= 18 ? 'hasta que vuelvas a la normal' : 'hasta 1 hora'}; volver es acción adicional, y vuelves solo si caes inconsciente o mueres. Puedes hablar, usar equipo y llevar armadura. Transformado: ventaja en pruebas y salvaciones de FUE y ${sign(poderFeral(c))} al daño cuerpo a cuerpo (Poder Feral); resistencia al daño contundente, cortante y perforante de ataques no mágicos sin plata, y +1 a la CA sin armadura pesada (Piel Resistente); tus golpes sin armas son garras (Ataques). Sed de sangre: si empiezas tu turno por debajo de la mitad de tus PG, salvación de SAB CD 8${c.lvl >= 15 ? ' con ventaja' : ''} o vas hacia la criatura más cercana y la atacas; fallas sola si estás concentrado.`,
    opciones: [
      {nombre:'Zarpazo extra (forma híbrida)', t:'adicional', roll: c => { const a = ataqueGarras(c); return [`1d20${modStr(a.atk)}`, a.expr]; },
        texto: c => `Transformado, si usaste Atacar con un golpe sin armas, haces otro con tus garras: ${ataqueGarras(c).dmg}.`},
    ]},
  {de:/licantropo/, n:/^zancada acechante/, nombre:'Destreza del Acechador', t:'pasiva', efecto: c => { c.speed += 10; },
    texto: c => `+10 pies de velocidad (ya sumado), +10 pies de salto largo y +3 de salto alto. En forma híbrida, ${sign(bonoGarras(c))} al ataque con garras (ya sumado), y con un rito activo tus garras cuentan como mágicas.`},
  {de:/licantropo/, n:/^regeneracion licantropica/, nombre:'Transformación Avanzada', t:'pasiva',
    texto: c => `Usas Transformación Híbrida dos veces por descanso (ya sumado). Regeneración: al empezar tu turno con al menos 1 PG y menos de la mitad de tus PG máximos, recuperas ${Math.max(1, 1 + c.m.con)} PG, antes de la salvación de sed de sangre.`},
  {de:/licantropo/, n:/^marca del depredador/, nombre:'Marca del Voraz', t:'pasiva',
    texto: () => 'En forma híbrida tienes ventaja en la salvación de sed de sangre y en los ataques contra la criatura con tu Marca de Castigo.'},
  {de:/licantropo/, n:/^licantropia maestra/, nombre:'Maestría de la Transformación', t:'pasiva',
    texto: () => 'Transformación Híbrida sin límite de usos, y tu forma dura hasta que vuelvas a la normal, caigas inconsciente o mueras. Aprendes la Maldición del Aullido.',
    opciones: [
      maldicion('Maldición del Aullido', 'accion', c => `Maldición extra que no cuenta entre las que conoces. Cada criatura a 30 pies que te oiga (menos las que elijas) hace una salvación de SAB (CD ${cdHemo(c)}); si falla, queda Asustada de ti hasta el final de tu siguiente turno, y si falla por 5 o más también Aturdida mientras dure. Quien la pasa es inmune 24 horas. ${amplificar(c)}: alcance de 60 pies.`),
    ]},

  /* Orden del Mutante */
  {de:/mutante/, n:/^formulas alquimicas/, nombre:'Fórmulas', t:'pasiva',
    eleccion: {id:'formulas-mutante', titulo:'Fórmulas que conoces', max: formulasN, opciones: MUTAGENOS.map(([key, n, nivel]) => ({key, nombre:n, nivel: nivel || undefined}))},
    texto: c => elegidos(c, 'formulas-mutante').length
      ? `Conoces ${formulasN(c)} fórmulas; al aprender una nueva puedes cambiar otra. Cada mutágeno que conoces sale aparte, con su mejora y su merma.`
      : `Conoces ${formulasN(c)} fórmulas de mutágeno: elígelas en el paso Clase. Cada una da una mejora y una merma; desde nivel 7 está Reconstrucción, y desde 11 Éter, Crueldad y Precisión.`,
    opciones: MUTAGENOS.map(([key, n, , mejora, merma]) => ({nombre:`Mutágeno: ${n}`, t:'adicional', coste:'1 mutágeno preparado',
      si: c => elegidos(c, 'formulas-mutante').includes(key), elegida: ['formulas-mutante', key], texto: c => `${mejora(c)}; a cambio, ${merma}. Dura hasta tu siguiente descanso corto o largo.`}))},
  {de:/mutante/, n:/^fabricacion de mutagenos/, nombre:'Alquimia de Mutágenos', t:'fuera', usos: mutagenosN, reset:'corto',
    texto: c => `Al terminar un descanso corto o largo preparas ${mutagenosN(c)} mutágeno(s) de fórmulas que conoces. Solo te sirven a ti, y los que no uses se echan a perder en tu siguiente descanso. Sus efectos duran hasta tu siguiente descanso corto o largo.`,
    opciones: [
      {nombre:'Tomar un mutágeno', t:'adicional', si: c => !elegidos(c, 'formulas-mutante').length, texto: () => 'Consumes un mutágeno que preparaste: ganas su mejora y su merma hasta tu siguiente descanso.'},
      {nombre:'Purgar mutágenos', t:'accion', texto: () => 'Te concentras y eliminas todos tus mutágenos activos, con sus mejoras y mermas.'},
    ]},
  {de:/mutante/, n:/^metabolismo acelerado/, nombre:'Metabolismo Extraño', t:'adicional', usos:1, reset:'largo',
    texto: () => 'Eres inmune al daño de veneno y a quedar Envenenado. Con acción adicional ignoras durante 1 minuto la merma de un mutágeno activo.'},
  {de:/mutante/, n:/^mutacion profunda/, nombre:'Marca del Axioma', t:'pasiva',
    texto: c => `Al marcar a una criatura se acaban sus ilusiones e invisibilidad, y no puede beneficiarse de ellas mientras esté marcada. Si está en otra forma (Polimorfar, Forma Salvaje, cambiaformas...), hace una salvación de SAB (CD ${cdHemo(c)}) o vuelve a la suya y queda Aturdida hasta el final de tu siguiente turno; lo mismo si intenta cambiar de forma estando marcada.`},
  {de:/mutante/, n:/^sangre reconstituida/, nombre:'Maldición de la Corrosión', t:'adicional', coste:'1 Maldición de Sangre',
    texto: c => `Maldición extra que no cuenta entre las que conoces. Una criatura a 30 pies queda Envenenada; al final de cada turno suyo hace una salvación de CON (CD ${cdHemo(c)}) para terminarla. ${amplificar(c)}: recibe 4d6 de daño necrótico al maldecirla y cada vez que falla la salvación.`},
  {de:/mutante/, n:/^mutacion quimica total/, nombre:'Mutación Exaltada', t:'adicional', usos: modHemo, reset:'largo',
    texto: () => 'Terminas un mutágeno activo, con su mejora y su merma, y en su lugar haces efecto uno de cualquier fórmula que conozcas.'},

  /* Orden del Alma Profana */
  {de:/alma profana/, n:/^pacto del ocultismo/, nombre:'Patrón de Otro Mundo', t:'pasiva',
    eleccion: {id:'patron-alma-profana', titulo:'Patrón', opciones: PATRONES.map(p => ({key:p.key, nombre:p.n, desc: c => `Enfoque del Rito: ${p.foco(c)} Nivel 7: ${p.revelado}. Nivel 15: ${p.liberado}.`}))},
    texto: c => { const p = patron(c);
      return p ? `Pactaste con el patrón ${p.n}. Enfoque del Rito: con un rito activo tu arma es tu foco de conjuros y ganas el beneficio de tu patrón (sale aparte).`
        : `Elige tu patrón en el paso Clase: Archihada, Celestial, Insondable, Infernal, Genio, Gran Antiguo, Hexblade, No Muerto o Inmortal. Enfoque del Rito: con un rito activo tu arma es tu foco de conjuros y ganas un beneficio según el patrón. ${PATRONES.map(x => `${x.n}: ${x.foco(c)}`).join(' ')}`; },
    opciones: PATRONES.map(p => ({nombre:`Enfoque del Rito (${p.n})`, t:p.t, coste:p.coste, si: c => patron(c)?.key === p.key, texto: p.foco}))},
  {de:/alma profana/, n:/^magia del pacto/, t:'pasiva',
    efecto: c => { const p = espaciosPacto(c); c.slots.push({nivel:p.nivel, n:p.n, reset:'corto', nombre:`Espacios de pacto (nivel ${p.nivel})`}); },
    texto: c => { const p = espaciosPacto(c); return `Lanzas conjuros de brujo con tu característica de hemomancia (CD ${cdHemo(c)}, ${sign(c.pb + mHemo(c))} al ataque). Conoces ${p.trucos} trucos y ${p.conjuros} conjuros de brujo de nivel ${p.nivel} o menos. Tienes ${p.n} espacio(s) de nivel ${p.nivel} (todos del mismo nivel) que se recuperan con descanso corto o largo.`; }},
  {de:/alma profana/, n:/^magia del rito imbuido/, nombre:'Frenesí Místico', t:'adicional',
    texto: () => 'Cuando usas tu acción para lanzar un truco, haces de inmediato un ataque con arma.',
    opciones: [
      {nombre:'Arcano Revelado', t: c => patron(c)?.tRevelado || 'accion', usos:1, reset:'largo',
        texto: c => `${conjuroPatron(c, 'revelado', 'Lanzas con un espacio de pacto')}.`},
    ]},
  {de:/alma profana/, n:/^marca arcanica/, nombre:'Marca de la Cicatriz Debilitante', t:'pasiva',
    texto: () => 'La criatura con tu Marca de Castigo tiene desventaja en las salvaciones contra tus conjuros de brujo.'},
  {de:/alma profana/, n:/^revelacion del patron/, nombre:'Arcano Liberado', t:'accion', usos:1, reset:'largo',
    texto: c => `${conjuroPatron(c, 'liberado', 'Lanzas sin gastar espacio')}.`},
  {de:/alma profana/, n:/^vinculo de sangre magico/, nombre:'Maldición del Devoraalmas', t:'reaccion', coste:'1 Maldición de Sangre',
    texto: c => `Maldición extra que no cuenta entre las que conoces. Cuando una criatura que no sea constructo ni muerto viviente cae a 0 PG a 30 pies de ti, hasta el final de tu siguiente turno atacas con ventaja y tienes resistencia a todo el daño. ${amplificar(c)}: además recuperas un espacio de pacto; no puedes volver a amplificarla hasta un descanso largo.`},

  /* ---------- Arcanista (Artífice de Eberron: Forge of the Artificer, 2025) ----------
     La clase de la biblioteca (clave lib:arcanista) se llamó "Arcanista (Artífice)" y ahora "Artífice"; las subclases valen también para el Artífice de las reglas. */
  {de:/arcanista|artifice/, n:/^lanzamiento de conjuros/, t:'pasiva',
    efecto: c => { c.trucosReglas = trucosArt(c); c.prepReglas = preparadosArt(c); },
    texto: c => `Lanzas conjuros de artífice con INT (CD ${8 + c.pb + c.m.int}, ${sign(c.pb + c.m.int)} al ataque) usando como foco herramientas de ladrón, de manitas o de artesano con las que seas competente: necesitas una en la mano. Conoces ${trucosArt(c)} trucos y preparas ${preparadosArt(c)} conjuros; al terminar un descanso largo puedes cambiar un truco y los conjuros preparados.`},
  {de:/arcanista|artifice/, n:/^magia de manitas/, t:'accion', usos: modInt, reset:'largo',
    texto: () => 'Conoces el truco Reparar. Con acción mágica y herramientas de manitas en la mano, creas a 5 pies un objeto de aventura sencillo (cuerda, antorcha, palanca, abrojos, red, aceite, bolsa, pala, cadenas...). Dura hasta tu siguiente descanso largo.'},
  {de:/arcanista|artifice/, n:/^replicar objeto magico/, t:'fuera',
    texto: c => `Conoces ${planesArt(c)} planos de objetos mágicos${c.lvl >= 9 && /armero/.test(norm(c.SD?.n || '')) ? ' (+1 de armadura por Armero Mejorado)' : ''}; al subir de nivel puedes cambiar uno. Al terminar un descanso largo, con herramientas de manitas, creas uno o dos objetos de planos distintos, hasta tener ${objetosArt(c)} a la vez (si te pasas, el más viejo desaparece). Puedes sintonizarte al crearlos. Varitas y armas creadas así te sirven de foco. Si mueres, desaparecen en 1d4 días.`},
  {de:/arcanista|artifice/, n:/^manitas de objetos magicos/, t:'pasiva',
    texto: () => 'Tres formas de manejar los objetos que creaste con Replicar Objeto Mágico; salen aparte.',
    opciones: [
      {nombre:'Cargar objeto mágico', t:'adicional', coste:'1 espacio de conjuro',
        texto: () => 'Tocas a 5 pies un objeto con cargas que creaste y gastas un espacio: recupera tantas cargas como el nivel del espacio.'},
      {nombre:'Drenar objeto mágico', t:'adicional', usos:1, reset:'largo',
        texto: () => 'Tocas a 5 pies un objeto que creaste, desaparece, y ganas un espacio de nivel 1 (común) o 2 (poco común o raro) que se pierde al terminar un descanso largo.'},
      {nombre:'Transmutar objeto mágico', t:'accion', usos:1, reset:'largo',
        texto: () => 'Con acción mágica tocas a 5 pies un objeto que creaste y lo conviertes en otro de un plano que conozcas.'},
    ]},
  {de:/arcanista|artifice/, n:/^destello de genio/, t:'reaccion', usos: modInt, reset:'largo',
    texto: c => `Cuando tú o una criatura que veas a 30 pies falla una prueba de característica o una salvación, sumas ${sign(modInt(c))} a la tirada.${c.lvl >= 20 ? ' Al terminar un descanso corto recuperas todos los usos si estás sintonizado con algún objeto mágico.' : c.lvl >= 14 ? ' Al terminar un descanso corto recuperas un uso.' : ''}`},
  {de:/arcanista|artifice/, n:/^adepto a objetos magicos/, t:'pasiva',
    texto: () => 'Puedes sintonizarte con hasta cuatro objetos mágicos a la vez.'},
  {de:/arcanista|artifice/, n:/^objeto almacenador de conjuros/, t:'fuera',
    texto: c => `Al terminar un descanso largo tocas un arma sencilla o marcial, o un foco, y guardas en él un conjuro de artífice de nivel 1 a 3 que se lance con una acción y no gaste componentes materiales (no hace falta tenerlo preparado). Aguanta ${Math.max(2, 2 * c.m.int)} usos, o hasta que guardes otro.`,
    opciones: [
      {nombre:'Usar el objeto almacenador', t:'accion',
        texto: c => `Quien lo sostiene usa una acción mágica y produce el conjuro con tu característica de conjuros (CD ${8 + c.pb + c.m.int}); si pide concentración, se concentra quien lo usa. Una vez por turno de esa criatura.`},
    ]},
  {de:/arcanista|artifice/, n:/^artificio avanzado/, t:'pasiva',
    texto: () => 'Puedes sintonizarte con hasta cinco objetos mágicos a la vez. Al terminar un descanso corto recuperas un uso de Destello de Genio.'},
  {de:/arcanista|artifice/, n:/^maestro de objetos magicos/, t:'pasiva',
    texto: () => 'Puedes sintonizarte con hasta seis objetos mágicos a la vez.'},
  {de:/arcanista|artifice/, n:/^alma del artificio/, t:'gratis',
    texto: () => 'Engañar a la muerte: si caes a 0 PG sin morir en el acto, puedes desintegrar objetos mágicos poco comunes o raros que creaste con Replicar Objeto Mágico; tus PG pasan a 20 por cada objeto. Guía mágica: al terminar un descanso corto recuperas todos los usos de Destello de Genio si estás sintonizado con algún objeto mágico.'},

  /* Alquimista */
  {de:/^alquimista$/, n:/^herramientas del oficio/, t:'pasiva',
    texto: () => 'Competencia con suministros de alquimista y útiles de herborista (si ya la tenías, eliges otras herramientas de artesano). Tardas la mitad en preparar pociones.',
    opciones: [conjurosSub('Conjuros de Alquimista', [[3, ['Palabra curativa', 'Rayo nauseabundo']], [5, ['Esfera flamígera', 'Flecha Ácida de Melf']], [9, ['Forma Gaseosa', 'Palabra curativa en masa']], [13, ['Guarda contra la Muerte', 'Esfera Vitriólica']], [17, ['Nube aniquiladora', 'Alzar a los muertos']]])]},
  {de:/^alquimista$/, n:/^elixir experimental/, t:'fuera', usos: elixiresN, reset:'largo',
    texto: c => { const x = c.lvl >= 15 ? 2 : c.lvl >= 9 ? 1 : 0; return `Al terminar un descanso largo, con suministros de alquimista, haces ${elixiresN(c)} elixires y tiras 1d6 para cada uno: 1 Curación (${2 + x}d8${fmtMod(c.m.int)} PG), 2 Presteza (+${10 + 5 * x} pies de velocidad 1 hora), 3 Resiliencia (+1 a la CA ${['10 minutos', '1 hora', '8 horas'][x]}), 4 Audacia (+1d4 a ataques y salvaciones ${['1 minuto', '10 minutos', '1 hora'][x]}), 5 Vuelo (volar ${10 + 10 * x} pies 10 minutos), 6 eliges uno. Los que sobren desaparecen en tu siguiente descanso largo.`; },
    opciones: [
      {nombre:'Beber un elixir', t:'adicional', texto: () => 'Cualquiera puede beber un elixir o dárselo a otra criatura a 5 pies.'},
      {nombre:'Crear un elixir', t:'accion', coste:'1 espacio de conjuro', texto: () => 'Con acción mágica y suministros de alquimista, haces un elixir más y eliges su efecto en vez de tirarlo.'},
    ]},
  {de:/^alquimista$/, n:/^sabio alquimico/, t:'pasiva',
    texto: c => `Cuando lanzas un conjuro usando suministros de alquimista como foco, sumas ${sign(modInt(c))} a una tirada de curación o de daño de ácido, fuego o veneno de ese conjuro.`},
  {de:/^alquimista$/, n:/^reactivos restauradores/, t:'accion', usos: modInt, reset:'largo',
    texto: () => 'Lanzas Restablecimiento menor sin gastar espacio ni tenerlo preparado, con suministros de alquimista como foco.'},
  {de:/^alquimista$/, n:/^maestria quimica/, t:'pasiva',
    texto: () => 'Resistencia al daño de ácido y veneno, e inmunidad a quedar Envenenado.',
    opciones: [
      {nombre:'Erupción alquímica', t:'gratis', texto: () => 'Una vez en cada uno de tus turnos, cuando un conjuro de artífice hace daño de ácido, fuego o veneno a un objetivo, le haces además 2d8 de daño de fuerza.'},
      {nombre:'Caldero conjurado', t:'accion', usos:1, reset:'largo', texto: () => 'Lanzas Caldero burbujeante de Tasha sin gastar espacio, sin tenerlo preparado y sin componentes materiales, con suministros de alquimista como foco.'},
    ]},

  /* Armero */
  {de:/^armero$/, n:/^herramientas del oficio/, t:'pasiva',
    texto: () => 'Entrenamiento con armaduras pesadas y competencia con herramientas de herrero (si ya la tenías, otras de artesano). Tardas la mitad en fabricar armaduras.',
    opciones: [conjurosSub('Conjuros de Armero', [[3, ['Proyectil mágico', 'Onda atronadora']], [5, ['Imagen múltiple', 'Hacer añicos']], [9, ['Patrón hipnótico', 'Relámpago']], [13, ['Escudo de fuego', 'Invisibilidad mejorada']], [17, ['Pasamuros', 'Muro de fuerza']]])]},
  {de:/^armero$/, n:/^armadura arcana/, t:'pasiva',
    eleccion: {id:'modelo-armero', titulo:'Modelo de armadura', opciones: [
      {key:'acorazado', nombre:'Acorazado', desc: c => `Arma: demoledor de fuerza (${c.lvl >= 15 ? '2d6' : '1d10'} de fuerza, cuerpo a cuerpo con alcance; empuja o acerca 10 pies). Estatura gigante: con acción adicional creces y ganas alcance.`},
      {key:'guardian', nombre:'Guardián', desc: c => `Arma: pulso atronador (${c.lvl >= 15 ? '1d10' : '1d8'} de trueno; el objetivo tiene desventaja contra otros que no seas tú). Campo defensivo: PG temporales con acción adicional estando Maltrecho.`},
      {key:'infiltrador', nombre:'Infiltrador', desc: c => `Arma: lanzador de relámpagos (${c.lvl >= 15 ? '2d6' : '1d6'} de relámpago a 90/300 pies, +1d6 una vez por turno). +5 pies de velocidad y ventaja en Sigilo.`},
    ]},
    efecto: c => { if (modeloArmero(c) === 'infiltrador') c.speed += 5; },
    ataques: c => [
      conModelo('acorazado')(c) && armaModelo(c, 'Demoledor de fuerza (Acorazado)', c.lvl >= 15 ? '2d6' : '1d10', 'fuerza', 'Cuerpo a cuerpo con alcance. A una criatura al menos un tamaño menor la empujas o acercas 10 pies'),
      conModelo('guardian')(c) && armaModelo(c, 'Pulso atronador (Guardián)', c.lvl >= 15 ? '1d10' : '1d8', 'trueno', 'Cuerpo a cuerpo. El objetivo tiene desventaja en ataques contra otros que no seas tú hasta tu próximo turno'),
      conModelo('infiltrador')(c) && armaModelo(c, 'Lanzador de relámpagos (Infiltrador)', c.lvl >= 15 ? '2d6' : '1d6', 'relámpago', 'A distancia, 90/300 pies. Una vez por turno, al acertar, +1d6 de relámpago'),
    ].filter(Boolean),
    texto: c => `Con acción mágica y herramientas de herrero conviertes la armadura que llevas en Armadura Arcana: sin requisito de FUE, te la pones o quitas con la acción Usar, no te la pueden quitar y te sirve de foco. ${({acorazado: 'Modelo Acorazado: tu arma especial es el demoledor de fuerza (en Ataques, con INT).', guardian: 'Modelo Guardián: tu arma especial es el pulso atronador (en Ataques, con INT).', infiltrador: 'Modelo Infiltrador: tu arma especial es el lanzador de relámpagos (en Ataques, con INT); además tienes +5 pies de velocidad (ya sumado) y ventaja en Sigilo.'})[modeloArmero(c)] || 'Elige el modelo en el paso Clase: Acorazado, Guardián o Infiltrador. Cada uno da un arma especial que usa INT; mientras no elijas, en Ataques salen las tres. El Infiltrador además da +5 pies de velocidad y ventaja en Sigilo.'} Puedes cambiar de modelo al terminar un descanso corto o largo.`,
    opciones: [
      {nombre:'Estatura gigante (Acorazado)', t:'adicional', usos: modInt, reset:'largo', si: conModelo('acorazado'),
        texto: c => c.lvl >= 15 ? 'Durante 1 minuto tu alcance aumenta 10 pies, pasas a Grande o Enorme (a tu elección) y tienes ventaja en pruebas y salvaciones de FUE.' : 'Durante 1 minuto tu alcance aumenta 5 pies y, si eres más pequeño, pasas a Grande.'},
      {nombre:'Campo defensivo (Guardián)', t:'adicional', si: conModelo('guardian'),
        texto: c => `Estando Maltrecho (a la mitad de tus PG o menos), ganas ${c.lvl} PG temporales; los pierdes si te quitas la armadura.`},
    ]},
  {de:/^armero$/, n:/^ataque extra/, t:'pasiva', texto: () => 'Cuando usas la acción Atacar, atacas dos veces.'},
  {de:/^armero$/, n:/^armero mejorado/, t:'pasiva',
    texto: () => 'Aprendes un plano más de Replicar Objeto Mágico, que debe ser de armadura, y puedes crear un objeto más de armadura. Las armas especiales de tu modelo tienen +1 al ataque y al daño (ya sumado).'},
  {de:/^armero$/, n:/^armadura perfeccionada/, t:'pasiva',
    texto: () => 'Tus modelos mejoran: los dados de sus armas suben (ya en Ataques) y Estatura gigante crece. El Infiltrador además hace brillar a quien daña con el lanzador: da luz tenue a 5 pies y tiene desventaja al atacarte hasta tu próximo turno.',
    opciones: [
      {nombre:'Atracción magnética (Guardián)', t:'reaccion', usos: modInt, reset:'largo', si: conModelo('guardian'),
        texto: c => `Cuando una criatura Enorme o menor que veas termina su turno a 30 pies, hace una salvación de FUE (CD ${8 + c.pb + c.m.int}); si falla, la atraes hasta 25 pies hacia ti, y si acaba a 5 pies puedes atacarla cuerpo a cuerpo como parte de la reacción.`},
      {nombre:'Vuelo potenciado (Infiltrador)', t:'adicional', usos: modInt, reset:'largo', si: conModelo('infiltrador'),
        texto: c => `Hasta el final del turno tienes velocidad de vuelo igual al doble de tu velocidad (${2 * c.speed} pies).`},
    ]},

  /* Artillero */
  {de:/^artillero$/, n:/^herramientas del oficio/, t:'pasiva',
    efecto: c => { c.wProf = {...c.wProf, martialDist: 1}; c.rehacerArmas = true; },
    texto: () => 'Competencia con armas marciales a distancia (ya sumada en Ataques) y con herramientas de tallista (si ya la tenías, otras de artesano). Tardas la mitad en fabricar varitas.',
    opciones: [conjurosSub('Conjuros de Artillero', [[3, ['Escudo', 'Onda atronadora']], [5, ['Rayo abrasador', 'Hacer añicos']], [9, ['Bola de fuego', 'Muro de viento']], [13, ['Tormenta de hielo', 'Muro de fuego']], [17, ['Cono de frío', 'Muro de fuerza']]])]},
  {de:/^artillero$/, n:/^canon sobrenatural/, t:'accion', usos:1, reset:'largo', coste: () => '1 gratis por descanso largo, o 1 espacio',
    ataques: c => [{nombre:'Balista de fuerza (cañón)', atk: c.pb + c.m.int, expr: danoCanon(c), dmg: `${danoCanon(c)} fuerza`, notas:['Ataque de conjuro a distancia, 120 pies, desde el cañón. Si acierta, empuja 5 pies']}],
    texto: c => `Con acción mágica y herramientas de herrero o de tallista creas a 5 pies un cañón Pequeño o Diminuto (CA 18, ${5 * c.lvl} PG) que dura 1 hora o hasta que llegue a 0 PG. Solo tienes ${c.lvl >= 15 ? 'dos' : 'uno'} a la vez. Lo quitas con acción mágica.`,
    opciones: [
      {nombre:'Disparar el cañón', t:'adicional',
        texto: c => `Estando a 60 pies, lo activas. Lanzallamas: cono de 15 pies, salvación de DES (CD ${8 + c.pb + c.m.int}), ${danoCanon(c)} de fuego o la mitad. Balista de fuerza: ataque a 120 pies (en Ataques). Protector: tú y quien elijas a 10 pies del cañón ganáis ${c.lvl >= 9 ? '2d8' : '1d8'}${fmtMod(modInt(c))} PG temporales.${c.lvl >= 15 ? ' Con dos cañones, los activas con la misma acción adicional.' : ''}`},
    ]},
  {de:/^artillero$/, n:/^arma de fuego arcana/, t:'pasiva',
    texto: () => 'Al terminar un descanso largo tallas sellos en una vara, bastón, varita o arma marcial a distancia, que queda como tu arma de fuego arcana y te sirve de foco. Al lanzar un conjuro de artífice a través de ella, tiras 1d8 y lo sumas a una tirada de daño del conjuro.'},
  {de:/^artillero$/, n:/^canon explosivo/, t:'pasiva',
    texto: () => 'Los daños del cañón y los PG temporales del Protector suben 1d8 (ya sumado).',
    opciones: [
      {nombre:'Detonar el cañón', t:'reaccion',
        texto: c => `Cuando tu cañón recibe daño y estás a 60 pies, lo destruyes: cada criatura a 20 pies hace una salvación de DES (CD ${8 + c.pb + c.m.int}) y recibe 3d10 de daño de fuerza, o la mitad si la pasa.`},
    ]},
  {de:/^artillero$/, n:/^posicion fortificada/, t:'pasiva',
    texto: () => 'Puedes tener dos cañones y crearlos con la misma acción mágica (si gastas espacio por el primero, gastas otro por el segundo). Tú y tus aliados tenéis cobertura a 10 pies de un cañón.'},

  /* Herrero de Batalla */
  {de:/herrero de batalla/, n:/^herramientas del oficio/, t:'pasiva',
    efecto: c => { c.wProf = {...c.wProf, martial: 1, light: 0, finesseLight: 0}; c.rehacerArmas = true; },
    texto: () => 'Competencia con herramientas de herrero (si ya la tenías, otras de artesano); tardas la mitad en fabricar armas. Preparado para la batalla: competencia con armas marciales (ya sumada en Ataques), puedes usarlas como foco, y con un arma mágica atacas y dañas con INT en vez de FUE o DES.',
    opciones: [conjurosSub('Conjuros de Herrero de Batalla', [[3, ['Heroísmo', 'Escudo']], [5, ['Castigo brillante', 'Vínculo protector']], [9, ['Aura de vitalidad', 'Conjurar descarga de proyectiles']], [13, ['Aura de pureza', 'Escudo de fuego']], [17, ['Castigo desterrador', 'Curar heridas en masa']]])]},
  {de:/herrero de batalla/, n:/^defensor de acero/, t:'pasiva',
    texto: () => `Te acompaña un Defensor de Acero; su hoja, con sus PG y su Desgarro, está en Familiares y criaturas. Actúa en tu turno; si no le das órdenes, solo Esquiva. Si estás Incapacitado actúa solo. Si murió hace menos de 1 hora, lo revives tocándolo con acción mágica y 1 espacio. Al terminar un descanso largo puedes crear uno nuevo con herramientas de herrero.`,
    opciones: [
      {nombre:'Ordenar al Defensor', t:'adicional',
        texto: c => `Tu defensor hace una acción: Desgarro potenciado (${sign(c.pb + c.m.int)} al ataque, 1d8${fmtMod(2 + c.m.int)} de fuerza; en su hoja), Reparar (3 veces al día: él o un constructo u objeto a 5 pies recupera 2d8${fmtMod(c.m.int)} PG) u otra acción.`},
      {nombre:'Desviar ataque (Defensor)', t:'reaccion',
        texto: c => `Reacción de tu defensor: cuando una criatura a 5 pies de él ataca a otro, lo hace con desventaja.${c.lvl >= 15 ? ` El atacante recibe 1d4${fmtMod(c.m.int)} de daño de fuerza.` : ''}`},
    ]},
  {de:/herrero de batalla/, n:/^ataque extra/, t:'pasiva',
    texto: () => 'Cuando usas la acción Atacar, atacas dos veces. Puedes cambiar uno de esos ataques por ordenar a tu Defensor de Acero que haga su Desgarro potenciado.'},
  {de:/herrero de batalla/, n:/^sacudida arcana/, t:'gratis', usos: modInt, reset:'largo',
    texto: c => `Una vez por turno, cuando tú aciertas con un arma mágica o tu defensor acierta: el objetivo recibe ${c.lvl >= 15 ? '4d6' : '2d6'} de daño de fuerza extra, o una criatura u objeto que veas a 30 pies del objetivo recupera ${c.lvl >= 15 ? '4d6' : '2d6'} PG.`},
  {de:/herrero de batalla/, n:/^defensor mejorado/, t:'pasiva',
    texto: c => `Sacudida Arcana sube a 4d6 (ya sumado). Cuando tu defensor usa Desviar ataque, el atacante recibe 1d4${fmtMod(c.m.int)} de daño de fuerza.`},

  /* Cartógrafo */
  {de:/cartografo/, n:/^herramientas del oficio/, t:'pasiva',
    texto: () => 'Competencia con útiles de caligrafía y herramientas de cartógrafo (si ya tenías alguna, otras de artesano). Tardas la mitad en escribir pergaminos de conjuro.',
    opciones: [conjurosSub('Conjuros de Cartógrafo', [[3, ['Fuego feérico', 'Saeta guía', 'Palabra curativa']], [5, ['Localizar objeto', 'Clavo mental']], [9, ['Llamar al relámpago', 'Clarividencia']], [13, ['Destierro', 'Localizar criatura']], [17, ['Escudriñar', 'Círculo de teletransportación']]])]},
  {de:/cartografo/, n:/^atlas de aventurero/, t:'fuera',
    texto: c => `Al terminar un descanso largo, con herramientas de cartógrafo, das mapas mágicos a entre 2 y ${Math.max(2, 1 + c.m.int)} criaturas (tú puedes ser una). Quien lleva uno suma 1d4 a la iniciativa, sabe dónde están los demás portadores en su plano y puede elegirlos como objetivo de conjuros y efectos sin verlos ni importar la cobertura, si están a su alcance. Duran hasta que mueras o hagas otros.`,
    opciones: [
      {nombre:'Cartografía iluminada', t:'accion', usos: modInt, reset:'largo',
        texto: () => 'Lanzas Fuego feérico sin gastar espacio.'},
      {nombre:'Salto de portal', t:'gratis', coste:'la mitad de tu velocidad',
        texto: () => 'En tu turno, gastando la mitad de tu velocidad, te teletransportas a un espacio que veas a 10 pies, o a 5 pies de un portador de tus mapas que esté a 30 pies. No funciona si tu velocidad es 0.'},
    ]},
  {de:/cartografo/, n:/^precision guiada/, t:'gratis',
    texto: c => `Una vez por turno, al lanzar un conjuro de tu lista de Cartógrafo o al acertar un ataque a una criatura afectada por tu Fuego feérico, sumas ${sign(c.m.int)} a una tirada de daño. Recibir daño no te hace perder la concentración en Fuego feérico.`},
  {de:/cartografo/, n:/^movimiento ingenioso/, t:'reaccion',
    texto: () => 'Cuando usas Destello de Genio, en la misma reacción tú o una criatura voluntaria que veas a 30 pies os teletransportáis hasta 30 pies a un espacio que veas.'},
  {de:/cartografo/, n:/^atlas superior/, t:'pasiva',
    texto: () => 'Tu Atlas de Aventurero mejora; sus dos beneficios salen aparte.',
    opciones: [
      {nombre:'Refugio seguro', t:'gratis',
        texto: c => `Cuando un portador de tus mapas cae a 0 PG sin morir en el acto, puede destruir su mapa: queda con ${2 * c.lvl} PG y se teletransporta a 5 pies de ti o de otro portador.`},
      {nombre:'Camino infalible', t:'fuera', usos:1, reset:'largo',
        texto: () => 'Si tienes uno de tus mapas, lanzas Encontrar el camino sin gastar espacio, sin tenerlo preparado y sin componentes.'},
    ]},

  /* ---------- Bárbaro (Lote 5, Manual del Jugador 2024) ----------
     Los tipos están en la biblioteca (scripts/datos/barbaro-2024.ts); aquí van números, opciones y selectores. */
  {de:/^barbaro$/, n:/^golpe brutal$/, t:'gratis',
    texto: c => `Si usas Ataque Temerario, renuncias a la ventaja en un ataque de FUE (que no tenga desventaja). Si aciertas, haces ${c.lvl >= 17 ? '2d10' : '1d10'} de daño extra del mismo tipo y aplicas ${c.lvl >= 17 ? 'dos efectos distintos' : 'un efecto'} de Golpe Brutal.`,
    opciones: [
      {nombre:'Golpe Contundente', t:'gratis', texto: () => 'Empujas al objetivo 15 pies, y puedes moverte hacia él hasta la mitad de tu velocidad sin provocar ataques de oportunidad.'},
      {nombre:'Golpe Desjarretante', t:'gratis', texto: () => 'Su velocidad baja 15 pies hasta el inicio de tu próximo turno.'},
      {nombre:'Golpe Tambaleante', t:'gratis', si: c => c.lvl >= 13, texto: () => 'Tiene desventaja en su próxima salvación y no puede hacer ataques de oportunidad hasta el inicio de tu próximo turno.'},
      {nombre:'Golpe Demoledor', t:'gratis', si: c => c.lvl >= 13, texto: () => 'Antes de tu próximo turno, el siguiente ataque de otra criatura contra él tiene +5.'},
    ]},
  {de:/^barbaro$/, n:/^furia implacable/, t:'gratis',
    texto: c => `Si caes a 0 PG con la Furia activa sin morir en el acto, haces una salvación de CON (CD 10, +5 por cada uso después del primero; vuelve a 10 tras un descanso corto o largo). Si la pasas, tus PG pasan a ${2 * c.lvl}.`},
  {de:/^barbaro$/, n:/^campeon primordial/, t:'pasiva',
    texto: () => 'Tu FUE y tu CON suben 4, hasta un máximo de 25 (súmalo en Características como ajuste).'},

  /* Senda del Berserker */
  {de:/berserker/, n:/^frenesi/, t:'gratis',
    texto: c => `Si usas Ataque Temerario con la Furia activa, el primer objetivo que aciertes en tu turno con un ataque de FUE recibe ${danoFuria(c)}d6 de daño extra del mismo tipo.`},
  {de:/berserker/, n:/^presencia intimidante/, t:'adicional', usos:1, reset:'largo', coste:'1 por descanso largo, o 1 uso de Furia',
    texto: c => `Las criaturas que elijas en 30 pies hacen una salvación de SAB (CD ${cdFue(c)}) o quedan Asustadas 1 minuto; repiten la salvación al final de cada turno suyo.`},

  /* Senda del Corazón Salvaje */
  {de:/corazon salvaje/, n:/^furia de lo salvaje/, t:'pasiva',
    texto: () => 'Cada vez que entras en Furia eliges uno de estos animales; salen aparte.',
    opciones: [
      {nombre:'Furia del Oso', t:'gratis', texto: () => 'Mientras dura la Furia, resistencia a todo el daño salvo de fuerza, necrótico, psíquico y radiante.'},
      {nombre:'Furia del Águila', t:'gratis', texto: () => 'Al entrar en Furia te Destrabas y Corres en la misma acción adicional; mientras dura, puedes hacer las dos cosas con una acción adicional.'},
      {nombre:'Furia del Lobo', t:'gratis', texto: () => 'Mientras dura la Furia, tus aliados tienen ventaja en los ataques contra cualquier enemigo que tengas a 5 pies.'},
    ]},
  {de:/corazon salvaje/, n:/^aspecto de lo salvaje/, t:'pasiva',
    eleccion: {id:'aspecto-salvaje', titulo:'Aspecto de lo Salvaje', opciones: [{key:'buho', nombre:'Búho', desc: ASPECTO.buho}, {key:'pantera', nombre:'Pantera', desc: ASPECTO.pantera}, {key:'salmon', nombre:'Salmón', desc: ASPECTO.salmon}]},
    efecto: c => { if (elegido(c, 'aspecto-salvaje') === 'buho') c.vision = (c.vision || 0) + 60; },
    texto: c => ASPECTO[elegido(c, 'aspecto-salvaje')] ? `${ASPECTO[elegido(c, 'aspecto-salvaje')]} Puedes cambiarlo al terminar un descanso largo.` : 'Elige tu aspecto en el paso Clase (se cambia al terminar un descanso largo): Búho (visión en la oscuridad), Pantera (trepar) o Salmón (nadar).'},
  {de:/corazon salvaje/, n:/^poder de lo salvaje/, t:'pasiva',
    texto: () => 'Cada vez que entras en Furia eliges uno de estos poderes; salen aparte.',
    opciones: [
      {nombre:'Poder del Halcón', t:'gratis', texto: () => 'Mientras dura la Furia, si no llevas armadura, tienes velocidad de vuelo igual a tu velocidad.'},
      {nombre:'Poder del León', t:'gratis', texto: () => 'Mientras dura la Furia, tus enemigos a 5 pies tienen desventaja al atacar a otros que no seas tú (o a otro bárbaro con este poder).'},
      {nombre:'Poder del Carnero', t:'gratis', texto: () => 'Mientras dura la Furia, cuando aciertas a una criatura Grande o menor cuerpo a cuerpo, puedes dejarla Derribada.'},
    ]},

  /* Senda del Árbol del Mundo */
  {de:/arbol del mundo/, n:/^vitalidad del arbol/, t:'pasiva',
    texto: c => `Al entrar en Furia ganas ${c.lvl} PG temporales. Al empezar cada uno de tus turnos en Furia, eliges otra criatura a 10 pies: gana ${danoFuria(c)}d6 PG temporales, que desaparecen si la Furia termina.`},
  {de:/arbol del mundo/, n:/^ramas del arbol/, t:'reaccion',
    texto: c => `Con tu Furia activa, cuando una criatura que ves empieza su turno a 30 pies, hace una salvación de FUE (CD ${cdFue(c)}) o la teletransportas a un espacio libre que veas a 5 pies de ti (o el más cercano). Luego puedes dejar su velocidad en 0 hasta el final de su turno.`},

  /* Senda del Fanático */
  {de:/fanatico/, n:/^furia divina/, t:'gratis',
    texto: c => `En cada uno de tus turnos con la Furia activa, la primera criatura que aciertas con un arma o un golpe sin armas recibe 1d6 + ${Math.floor(c.lvl / 2)} de daño extra, radiante o necrótico (lo eliges cada vez).`},
  {de:/fanatico/, n:/^guerrero de los dioses/, t:'adicional', usos: c => c.lvl >= 17 ? 7 : c.lvl >= 12 ? 6 : c.lvl >= 6 ? 5 : 4, reset:'largo', coste: c => `reserva de ${c.lvl >= 17 ? 7 : c.lvl >= 12 ? 6 : c.lvl >= 6 ? 5 : 4}d12`,
    texto: () => 'Gastas dados de tu reserva, los tiras y recuperas esa cantidad de PG. Cada casilla es un d12.'},
  {de:/fanatico/, n:/^foco fanatico/, t:'gratis',
    texto: c => `Una vez por Furia, si fallas una salvación, la repites sumando ${sign(danoFuria(c))} y te quedas con la nueva tirada.`},
  {de:/fanatico/, n:/^presencia fanatica/, t:'adicional', usos:1, reset:'largo', coste:'1 por descanso largo, o 1 uso de Furia',
    texto: () => 'Hasta diez criaturas que elijas a 60 pies tienen ventaja en ataques y salvaciones hasta el inicio de tu próximo turno.'},
  {de:/fanatico/, n:/^furia de los dioses/, t:'gratis', usos:1, reset:'largo',
    texto: c => `Al entrar en Furia tomas forma de guerrero divino durante 1 minuto o hasta caer a 0 PG: vuelas (y puedes flotar), tienes resistencia al daño necrótico, psíquico y radiante, y cuando una criatura a 30 pies va a caer a 0 PG, con tu reacción y un uso de Furia sus PG pasan a ${c.lvl}.`},

  /* ---------- Bardo (Lote 6: Manual del Jugador 2024, Luna de Heroes of Faerûn, Espíritus de Ravenloft 2025) ---------- */
  {de:/^bardo$/, n:/^secretos magicos/, t:'pasiva', efecto: c => { c.listasExtra = ['clerigo', 'druida', 'mago']; },
    texto: () => 'Cuando tu número de conjuros preparados sube, puedes elegir los nuevos de las listas de bardo, clérigo, druida y mago (el paso Conjuros ya las muestra); cuentan como conjuros de bardo.'},
  {de:/^bardo$/, n:/^palabras de creacion/, t:'pasiva',
    texto: () => 'Siempre tienes preparados Palabra de poder: sanar y Palabra de poder: matar, y al lanzarlos puedes afectar a una segunda criatura a 10 pies de la primera.',
    opciones: [conjurosSub('Conjuros de Palabras de Creación', [[20, ['Palabra de poder: sanar', 'Palabra de poder: matar']]])]},

  /* Colegio del Conocimiento */
  {de:/colegio del conocimiento/, n:/^palabras cortantes/, t:'reaccion', coste:'1 Inspiración Bárdica',
    texto: c => `Cuando una criatura que ves a 60 pies hace una tirada de daño o acierta una prueba o un ataque, tiras ${dadoInsp(c)} y lo restas de su tirada.`},
  {de:/colegio del conocimiento/, n:/^descubrimientos magicos/, t:'pasiva', efecto: c => { c.listasExtra = [...new Set([...(c.listasExtra || []), 'clerigo', 'druida', 'mago'])]; },
    texto: () => 'Aprendes dos conjuros de las listas de clérigo, druida o mago (trucos o de un nivel que puedas lanzar); siempre los tienes preparados y puedes cambiar uno al subir de nivel. Agrégalos en Conjuros marcando que no cuentan en el límite.'},
  {de:/colegio del conocimiento/, n:/^habilidad inigualable/, t:'gratis', coste:'1 Inspiración Bárdica',
    texto: c => `Cuando fallas una prueba de característica o un ataque, sumas ${dadoInsp(c)} al d20; si aun así fallas, no se gasta.`},

  /* Colegio del Valor */
  {de:/colegio del valor/, n:/^competencias de combate/, t:'pasiva', efecto: c => { c.wProf = {...c.wProf, martial: 1}; c.rehacerArmas = true; },
    texto: () => 'Competencia con armas marciales (ya en Ataques) y entrenamiento con armaduras medias y escudos. Puedes usar un arma sencilla o marcial como foco de tus conjuros de bardo.'},
  {de:/colegio del valor/, n:/^inspiracion de combate/, t:'pasiva',
    texto: () => 'Quien tiene un dado de tu Inspiración Bárdica puede usarlo de estas dos formas; salen aparte.',
    opciones: [
      {nombre:'Defensa (Inspiración de Combate)', t:'reaccion', texto: c => `Reacción del aliado con tu dado: cuando le aciertan un ataque, tira ${dadoInsp(c)} y lo suma a su CA contra ese ataque.`},
      {nombre:'Ofensa (Inspiración de Combate)', t:'gratis', texto: c => `Justo después de acertar un ataque, el aliado con tu dado tira ${dadoInsp(c)} y lo suma al daño.`},
    ]},

  /* Colegio del Glamour */
  {de:/colegio del glamour/, n:/^manto de inspiracion/, t:'adicional', coste:'1 Inspiración Bárdica',
    texto: c => `Tiras ${dadoInsp(c)}: hasta ${Math.max(1, c.m.car)} criatura(s) que elijas a 60 pies ganan el doble del resultado en PG temporales, y cada una puede usar su reacción para moverse hasta su velocidad sin provocar ataques de oportunidad.`},
  {de:/colegio del glamour/, n:/^magia seductora/, t:'pasiva',
    texto: () => 'Siempre tienes preparados Hechizar persona e Imagen múltiple.',
    opciones: [
      conjurosSub('Conjuros de Glamour', [[3, ['Hechizar persona', 'Imagen múltiple']], [6, ['Orden imperiosa']]]),
      {nombre:'Hechizo seductor', t:'gratis', usos:1, reset:'largo', coste: () => '1 por descanso largo, o 1 Inspiración Bárdica',
        texto: c => `Justo después de lanzar un conjuro de encantamiento o ilusión con un espacio, una criatura que veas a 60 pies hace una salvación de SAB (CD ${c.dcSpell}) o queda Hechizada o Asustada (tú eliges) 1 minuto; repite al final de cada turno suyo.`},
    ]},
  {de:/colegio del glamour/, n:/^majestad inquebrantable/, t:'adicional', usos:1, reset:'corto',
    texto: c => `Durante 1 minuto o hasta quedar Incapacitado, la primera vez en cada turno que un ataque te acierta, el atacante hace una salvación de CAR (CD ${c.dcSpell}) o falla el ataque.`},

  /* Colegio de la Danza */
  {de:/colegio de la danza/, n:/^juego de pies deslumbrante/, t:'pasiva',
    efecto: c => { if (!c.armor && !c.shield) c.ac = Math.max(c.ac, 10 + c.m.des + c.m.car); },
    ataques: c => [{nombre:'Golpe sin armas (Danza)', atk: c.pb + c.m.des, expr: `${dadoInsp(c)}${modStr(c.m.des)}`, dmg: `${dadoInsp(c)}${fmtMod(c.m.des)} contundente`,
      notas:['Sin armadura ni escudo. No gasta el dado de Inspiración. Al gastar una Inspiración Bárdica en una acción, acción adicional o reacción, haces además un golpe sin armas']}],
    texto: c => `Sin armadura ni escudo: tu CA base es 10 + DES + CAR (${10 + c.m.des + c.m.car}, ya se usa si es mayor); tus golpes sin armas usan DES y hacen ${dadoInsp(c)} + DES (en Ataques); y cuando gastas una Inspiración Bárdica en una acción, acción adicional o reacción, haces además un golpe sin armas. Ventaja en Interpretación al bailar.`},
  {de:/colegio de la danza/, n:/^movimiento inspirador/, t:'reaccion', coste:'1 Inspiración Bárdica',
    texto: () => 'Cuando un enemigo que ves termina su turno a 5 pies, te mueves hasta la mitad de tu velocidad y un aliado a 30 pies puede hacer lo mismo con su reacción; nada de esto provoca ataques de oportunidad.'},
  {de:/colegio de la danza/, n:/^juego de pies en tandem/, t:'gratis', coste:'1 Inspiración Bárdica',
    texto: c => `Al tirar iniciativa, si no estás Incapacitado, tiras ${dadoInsp(c)}: tú y los aliados a 30 pies que te vean u oigan sumáis el resultado a la iniciativa.`},

  /* Colegio de la Luna */
  {de:/colegio de la luna/, n:/^inspiracion de la luna/, t:'pasiva',
    texto: () => 'La luna mejora tu Inspiración Bárdica; sus dos efectos salen aparte.',
    opciones: [
      {nombre:'Eclipse Inspirador', t:'adicional', texto: () => 'Al dar un dado de Inspiración Bárdica con tu acción adicional, te vuelves invisible y te teletransportas hasta 30 pies. La invisibilidad dura hasta el inicio de tu próximo turno o hasta que ataques, hagas daño o lances un conjuro.'},
      {nombre:'Vitalidad Lunar', t:'gratis', coste:'1 Inspiración Bárdica', texto: c => `Una vez por turno, al curar con un conjuro, sumas ${dadoInsp(c)} a los PG y la criatura tiene +10 pies de velocidad hasta el final de su siguiente turno.`},
    ]},
  {de:/colegio de la luna/, n:/^bendicion de la luz de luna/, t:'pasiva', usos:1, reset:'largo',
    texto: () => 'Siempre tienes preparado Rayo de luna. Una vez por descanso largo, al lanzarlo brillas con luz tenue a 5 pies y, cada vez que alguien falla la salvación contra él, otra criatura que elijas a 60 pies recupera 2d4 PG.',
    opciones: [conjurosSub('Conjuros de la Luna', [[6, ['Rayo de luna']]])]},

  /* Colegio de los Espíritus */
  {de:/colegio de los espiritus/, n:/^espiritus del mas alla/, t:'pasiva',
    texto: c => `Al dar un dado de Inspiración Bárdica con acción adicional, tiras ese dado y canalizas el espíritu de la tabla: 1 Amado (cura ${dadoInsp(c)}${fmtMod(c.m.car)}), 2 Tirador (${dadoInsp(c)}${fmtMod(c.m.car)} de fuerza), 3 Vengador, 4 Renegado, 5 Adivino, 6 Viajero, 7 Embaucador, 8 Sombra, 9 Heraldo, 10 Hechicero, 11 Coloso, 12 Destino. Queda canalizado hasta que lo liberes o hasta un descanso.`,
    opciones: [
      {nombre:'Canalización Controlada', t:'adicional', coste:'1 Inspiración Bárdica', texto: c => `Canalizas el espíritu que elijas, con número hasta el máximo de tu dado (${dadoInsp(c)}).`},
      {nombre:'Liberar un espíritu', t:'accion', texto: c => `Liberas un espíritu canalizado sobre una criatura que veas a 30 pies; si pide salvación, la CD es ${c.dcSpell}.`},
    ]},
  {de:/colegio de los espiritus/, n:/^canalizacion potenciada/, t:'pasiva', usos:1, reset:'largo',
    texto: () => 'Una vez por turno, al lanzar con un espacio un conjuro de bardo que daña o cura, sumas 1d6. Siempre tienes preparado Espíritus guardianes y lo lanzas una vez por descanso largo sin espacio; una vez por descanso corto o largo, al lanzarlo tú y tus aliados en su área tenéis cobertura.',
    opciones: [conjurosSub('Conjuros de los Espíritus', [[6, ['Espíritus guardianes']]])]},

  /* ---------- Brujo (Lote 7: Manual del Jugador 2024, No Muerto de Ravenloft: The Horrors Within 2026, Vestigio de Arcana Unleashed 2026) ----------
     Rasgos y textos en la biblioteca (scripts/datos/brujo-2024.ts); aquí los selectores, los números y lo que va al cálculo. */
  {de:/^brujo$/, n:/^invocaciones sobrenaturales/, t:'pasiva',
    eleccion: {id:'invocaciones', titulo:'Invocaciones Sobrenaturales', max: c => INVOCACIONES[c.lvl - 1],
      opciones: INVOC.map(i => ({key: i.key, nombre: i.n, nivel: i.nivel, requiere: i.req,
        ...(i.key === 'pacto-cadena' ? {desc: 'Acción. Lanzas Encontrar familiar como acción mágica sin gastar espacio, con formas especiales (diablillo, pseudodragón, quasit, esqueleto...).'} : {})}))},
    efecto: c => {
      const s = invocaciones(c);
      if (s.includes('armadura-sombras') && !c.armor) c.ac = Math.max(c.ac, 13 + c.m.des + (c.shield ? 2 : 0));
      if (s.includes('vision-diablo')) c.vision = Math.max(c.vision || 0, 120);
      if (s.includes('pacto-filo')) { const antes = c.usaCar; c.pactoFilo = true; c.usaCar = w => !w.dist || !!antes?.(w); c.rehacerArmas = true; }
      if (s.includes('filo-sediento')) c.extraAttack = true;
    },
    // Las que lanzan un conjuro lo ponen en tus conjuros: a voluntad, salvo Respirar bajo el agua (1 por descanso largo)
    conjuros: c => invocaciones(c).map(k => INVOC.find(i => i.key === k)).filter(i => i.conjuro).map(i => i.key === 'don-profundidades'
      ? {nombre: i.conjuro, usos: 1, reset: 'largo'}
      : {nombre: i.conjuro, nota: `${i.n}: a voluntad, sin gastar espacio`}),
    texto: c => { const n = INVOCACIONES[c.lvl - 1], ya = invocaciones(c).length;
      return `Conoces ${n} invocaci${n > 1 ? 'ones' : 'ón'}${ya < n ? ` (te falta${n - ya > 1 ? 'n' : ''} ${n - ya}: elígelas en el paso Clase)` : ''}; cada una sale aparte. Al subir de nivel puedes cambiar una por otra.`; },
    opciones: INVOC.filter(i => i.key !== 'pacto-cadena').map(i => ({nombre: i.n, t: i.t, texto: i.texto, usos: i.usos, reset:'largo',
      si: c => invocaciones(c).includes(i.key), elegida: ['invocaciones', i.key]}))},
  {de:/^brujo$/, n:/^arcano mistico/, t:'pasiva',
    eleccion: ARCANO.map(([nv, lv]) => ({id:`arcano-${nv}`, titulo:`Arcano Místico de nivel ${nv}`, si: c => c.lvl >= lv,
      opciones: () => conjurosBrujo(nv).map(s => ({key: norm(s.nombre), nombre: s.nombre, desc: resumen(s.desc)}))})),
    texto: c => { const ya = ARCANO.filter(([, lv]) => c.lvl >= lv), prox = ARCANO.find(([, lv]) => c.lvl < lv);
      const falta = ya.some(([nv]) => !arcanoDe(c, nv));
      return `Tu patrón te da un conjuro de brujo de nivel ${ya.map(([nv]) => nv).join(', ')} que lanzas una vez por descanso largo sin gastar espacio; están en tus conjuros.${falta ? ' Elígelos en el paso Clase.' : ''}${prox ? ` En el nivel ${prox[1]} ganas otro de nivel ${prox[0]}.` : ''} Al subir de nivel puedes cambiar uno por otro del mismo nivel.`; },
    conjuros: c => ARCANO.filter(([nv, lv]) => c.lvl >= lv && arcanoDe(c, nv)).map(([nv]) => ({nombre: arcanoDe(c, nv).nombre, usos: 1, reset: 'largo'}))},

  /* Patrones del manual: niveles 6, 10 y 14 */
  {de:/patron archihada/, n:/^huida brumosa/,
    texto: c => `Cuando recibes daño, lanzas Paso brumoso como reacción. Tus Pasos Feéricos ganan dos efectos más: Paso Evanescente (quedas Invisible hasta el inicio de tu próximo turno, o hasta que ataques, hagas daño o lances un conjuro) y Paso Temible (quien esté a 5 pies de donde sales o de donde llegas hace una salvación de SAB, CD ${c.dcSpell}, o recibe 2d10 de daño psíquico).`},
  {de:/patron infernal/, n:/^arrojar al infierno/,
    texto: c => `Una vez por turno, al acertar con una tirada de ataque, el objetivo hace una salvación de CAR (CD ${c.dcSpell}). Si falla, desaparece por los Planos Inferiores: recibe 8d10 de daño psíquico (si no es infernal) y queda Incapacitado hasta el final de tu próximo turno, cuando vuelve. Una vez por descanso largo, o gastando un espacio de pacto para recuperarlo.`},
  {de:/patron celestial/, n:/^alma radiante/,
    texto: c => `Tienes resistencia al daño radiante. Una vez por turno, cuando un conjuro tuyo hace daño radiante o de fuego, sumas ${sign(c.m.car)} (CAR) al daño contra uno de sus objetivos.`},
  {de:/patron celestial/, n:/^resiliencia celestial/,
    texto: c => `Al usar Astucia Mágica o al terminar un descanso corto o largo ganas ${Math.max(0, c.lvl + c.m.car)} PG temporales, y hasta cinco criaturas que veas ganan ${Math.max(0, Math.floor(c.lvl / 2) + c.m.car)}.`},
  {de:/patron celestial/, n:/^venganza abrasadora/,
    texto: c => `Cuando tú o un aliado a 60 pies vais a hacer una salvación contra la muerte, esa criatura recupera la mitad de sus PG máximos y puede dejar de estar Derribada; las criaturas que elijas a 30 pies de ella reciben 2d8${fmtMod(c.m.car)} de daño radiante y quedan Cegadas hasta el final del turno. Una vez por descanso largo.`},
  {de:/patron gran antiguo/, n:/^combatiente clarividente/,
    texto: c => `Al formar el vínculo de Mente Despierta, la criatura hace una salvación de SAB (CD ${c.dcSpell}). Si falla, mientras dure el vínculo tiene desventaja al atacarte y tú ventaja al atacarla. Una vez por descanso corto o largo, o gastando un espacio de pacto para recuperarlo.`},
  {de:/patron gran antiguo/, n:/^crear siervo/,
    texto: c => `Al lanzar Invocar aberración puedes hacer que no requiera concentración (dura 1 minuto). La aberración aparece con ${c.lvl} PG temporales, y la primera vez en cada turno que acierta a una criatura afectada por tu Maleficio le hace también su daño extra.`},

  /* El No Muerto (Ravenloft: The Horrors Within, 2026) */
  {de:/el no muerto/, n:/^conjuros del no muerto/, t:'pasiva', texto: conjurosSub('', [[3, ['Perdición', 'Sordera/Ceguera', 'Fuerza fantasmal', 'Rayo nauseabundo']], [5, ['Hablar con los Muertos', 'Invocar muerto viviente']], [7, ['Invisibilidad mejorada', 'Asesino fantasmal']], [9, ['Caparazón antivida', 'Nube aniquiladora']]]).texto},
  {de:/el no muerto/, n:/^forma del terror/, t:'adicional', usos: c => Math.max(1, c.m.car), reset:'largo',
    texto: c => `Te transformas durante 1 minuto: ganas 1d10 + ${c.lvl} PG temporales, eres inmune a quedar Asustado (y dejas de estarlo) y, una vez por turno al acertar con una tirada de ataque, el objetivo hace una salvación de SAB (CD ${c.dcSpell}) o queda Asustado hasta el final de tu próximo turno. Acaba antes si quedas Incapacitado o si la terminas.`},
  {de:/el no muerto/, n:/^cascara necrotica/, t:'pasiva',
    texto: () => 'Tienes resistencia al daño necrótico, e inmunidad mientras estás en Forma del Terror. Si caes a 0 PG sin morir, puedes estallar (sale aparte).',
    opciones: [{nombre:'Estallido Necrótico', t:'gratis', usos:1, reset:'corto',
      texto: c => `Cuando caes a 0 PG sin morir en el acto, tus PG pasan a ${2 * c.lvl} y cada criatura que elijas a 30 pies hace una salvación de CON (CD ${c.dcSpell}) o recibe 2d10${fmtMod(c.m.car)} de daño necrótico. Ganas 1 nivel de Cansancio.`}]},

  /* El Vestigio (Arcana Unleashed, 2026) */
  {de:/el vestigio/, n:/^compa.ero vestigio/, t:'pasiva',
    eleccion: {id:'vestigio-tipo', titulo:'Tipo del vestigio', opciones: Object.entries(VESTIGIO).map(([key, v]) => ({key, nombre: v.n,
      desc: c => `Resistencia al daño ${v.dano}; su daño es ${v.dano}. Poder Divino, ${v.poder}: ${v.texto(c)}`}))},
    ataques: c => { const v = VESTIGIO[elegido(c, 'vestigio-tipo')], m = 3 + c.m.car;
      return [{nombre:'Ataque del vestigio', atk: c.atkSpell, expr: `1d6${modStr(m)}`, dmg: `1d6${fmtMod(m)} ${v ? v.dano.replace(/^de /, '') : 'según su tipo'}`,
        notas:['Lo hace tu vestigio cuando se lo ordenas con acción adicional: cuerpo a cuerpo a 5 pies o a distancia a 60 pies']}]; },
    texto: c => { const v = VESTIGIO[elegido(c, 'vestigio-tipo')];
      return `Te acompaña el vestigio de un dios moribundo: CA ${13 + c.m.car}, ${4 + 4 * c.lvl} PG, velocidad de 5 pies y vuelo de 30 pies (flota). Con acción adicional le ordenas atacar (en Ataques). ${v ? `Es ${v.n.toLowerCase()}: resistencia al daño ${v.dano}.` : 'Elige su tipo en el paso Clase (celestial, infernal o no muerto).'} Puedes cambiar su forma y su tipo al terminar un descanso largo.`; },
    opciones: [{nombre:'Poder Divino', t:'adicional', usos:1, reset: c => c.lvl >= 6 ? 'corto' : 'largo',
      texto: c => { const v = VESTIGIO[elegido(c, 'vestigio-tipo')];
        return v ? `${v.poder}: ${v.texto(c)}` : `Según el tipo de tu vestigio: ${Object.values(VESTIGIO).map(x => `${x.poder} (${x.n.toLowerCase()}): ${x.texto(c)}`).join(' ')}`; }}]},
  {de:/el vestigio/, n:/^conjuros del vestigio/, t:'pasiva',
    eleccion: {id:'vestigio-dominio', titulo:'Dominio del vestigio', opciones: Object.entries(DOMINIOS_VESTIGIO).map(([key, n]) => ({key, nombre: n,
      desc: `Conjuros del Dominio de${key === 'luz' || key === 'guerra' ? ' la' : 'l'} ${n}: ${DOMINIOS_CLERIGO[key].flatMap(([, s]) => s).join(', ')}.`}))},
    texto: c => { const d = elegido(c, 'vestigio-dominio');
      return d ? conjurosSub('', DOMINIOS_CLERIGO[d]).texto(c) : 'Elige un dominio de clérigo en el paso Clase (Vida, Luz, Engaño o Guerra); sus conjuros de dominio son conjuros de brujo para ti y los tienes siempre preparados según tu nivel.'; }},
  {de:/el vestigio/, n:/^apariencia de vida/,
    texto: c => `Con una acción mágica, estando tu vestigio a 90 pies, lo transformas durante 1 hora en el espíritu de Invocar celestial, Invocar infernal o Invocar muerto viviente según su tipo, a nivel ${Math.min(9, Math.floor(c.lvl / 2))}. Conserva su personalidad, su Poder Divino y sus PG, y gana PG temporales iguales a los del espíritu. Una vez por descanso largo.`},

  /* El Filo Maldito (Xanathar) */
  {de:/el filo maldito/, n:/^guerrero maleficio/, t:'pasiva',
    efecto: c => { const antes = c.usaCar; c.usaCar = w => !w.p.includes('dos manos') || !!antes?.(w); c.rehacerArmas = true; },
    texto: c => `Competencia con armaduras medias, escudos y armas marciales. Al terminar un descanso largo tocas un arma con la que seas competente y sin la propiedad Dos manos: hasta tu siguiente descanso largo atacas y haces daño con ella usando CAR (${sign(c.m.car)}); en Ataques se marcan las que pueden serlo. Si tienes el Pacto del Filo, vale para cualquier arma de pacto que conjures.`},
  {de:/el filo maldito/, n:/^maldicion del filo maldito/,
    texto: c => `Maldices durante 1 minuto a una criatura que veas a 30 pies: sumas ${sign(c.pb)} al daño contra ella, le haces crítico con 19 o 20, y si muere recuperas ${Math.max(1, c.lvl + c.m.car)} PG. Acaba si ella muere, si mueres o si quedas Incapacitado.`},
  {de:/el filo maldito/, n:/^espectro maldito/,
    texto: c => `Cuando matas a un humanoide, puedes alzar su espíritu como un espectro a tus órdenes hasta tu siguiente descanso largo, con ${Math.floor(c.lvl / 2)} PG temporales y ${sign(Math.max(0, c.m.car))} a sus tiradas de ataque. Una vez por descanso largo.`},

  /* El Genio (Tasha) */
  {de:/el genio/, n:/^lista ampliada del genio/, t:'pasiva',
    eleccion: {id:'genio-tipo', titulo:'Tipo de genio', opciones: Object.entries(GENIOS).map(([key, g]) => ({key, nombre: g.n, desc: `Daño ${g.dano}. Conjuros: ${g.conj}.`}))},
    texto: c => { const g = genio(c);
      return `Estos conjuros se suman a tu lista de brujo (no quedan preparados solos): Detectar el bien y el mal (1), Fuerza fantasmal (2), Crear comida y agua (3), Asesino fantasmal (4), Creación (5) y Deseo (9)${g ? `, más los de tu genio ${g.n}: ${g.conj}.` : '. Elige tu tipo de genio en el paso Clase (Dao, Djinn, Efreet o Marid): suma sus conjuros y decide el daño de tus rasgos.'}`; }},
  {de:/el genio/, n:/^respiro embotellado/,
    texto: c => `Tocando tu recipiente, desapareces dentro de él: un espacio cómodo de 20 pies de radio desde el que oyes lo que pasa fuera. Puedes quedarte hasta ${2 * c.pb} horas; sales antes con acción adicional, y también si mueres o se destruye el recipiente. Una vez por descanso largo.`},
  {de:/el genio/, n:/^ira del genio/,
    texto: c => `Una vez en cada uno de tus turnos, al acertar con una tirada de ataque, haces ${c.pb} de ${danoGenio(c)} extra.`},
  {de:/el genio/, n:/^don elemental/, t:'pasiva',
    texto: c => `Tienes resistencia al ${danoGenio(c)}. Además puedes darte vuelo (sale aparte).`,
    opciones: [{nombre:'Vuelo Elemental', t:'adicional', usos: c => c.pb, reset:'largo', texto: () => 'Ganas velocidad de vuelo de 30 pies y puedes flotar durante 10 minutos.'}]},
  {de:/el genio/, n:/^recipiente santuario/,
    texto: c => `Al entrar en tu recipiente puedes llevar hasta cinco criaturas voluntarias a 30 pies (las sacas con acción adicional). Quien pase 10 minutos dentro obtiene los beneficios de un descanso corto y suma ${sign(c.pb)} a los PG que recupere con Dados de Golpe allí.`},

  /* El Insondable (Tasha) */
  {de:/el insondable/, n:/^tentaculo de las profundidades/, t:'adicional', usos: c => c.pb, reset:'largo',
    ataques: c => [{nombre:'Tentáculo de las Profundidades', atk: c.atkSpell, expr: dadoTentaculo(c), dmg: `${dadoTentaculo(c)} frío`,
      notas:['Ataque de conjuro cuerpo a cuerpo contra una criatura a 10 pies del tentáculo. Si aciertas, su velocidad baja 10 pies hasta el inicio de tu próximo turno']}],
    texto: c => `Creas un tentáculo espectral de 10 pies en un punto que veas a 60 pies, que dura 1 minuto, y haces con él un ataque de conjuro cuerpo a cuerpo contra una criatura a 10 pies de él: ${dadoTentaculo(c)} de daño de frío y su velocidad baja 10 pies (en Ataques). Con acción adicional lo mueves 30 pies y repites el ataque.`},
  {de:/el insondable/, n:/^espiral guardiana/,
    texto: c => `Cuando tú o una criatura que ves a 10 pies de tu tentáculo recibe daño, reduces ese daño en ${dadoTentaculo(c)}.`},
  {de:/el insondable/, n:/^tentaculos aferradores/, conjuros: [{nombre:'Tentáculos negros de Evard', usos:1, reset:'largo'}],
    texto: c => `Aprendes Tentáculos negros de Evard, que no cuenta en tu límite; una vez por descanso largo lo lanzas sin gastar espacio. Al lanzarlo ganas ${c.lvl} PG temporales, y el daño no rompe tu concentración en él.`},

  /* El Inmortal (Sword Coast) */
  {de:/el inmortal/, n:/^entre los muertos/, conjuros: [{nombre:'Perdonar a los moribundos', nota:'Cuenta como truco de brujo'}]},
  {de:/el inmortal/, n:/^desafiar a la muerte/,
    texto: c => `Cuando superas una salvación contra la muerte o estabilizas a alguien con Estabilizar, recuperas 1d8${fmtMod(c.m.con)} PG (mínimo 1). Una vez por descanso largo.`},
  {de:/el inmortal/, n:/^vida indestructible/,
    texto: c => `Recuperas 1d8 + ${c.lvl} PG, y si juntas una parte de tu cuerpo cortada, se vuelve a unir. Una vez por descanso corto o largo.`},

  /* ---------- Clérigo (Lote 8) ----------
     Rasgos y textos en la biblioteca (scripts/datos/clerigo-2024.ts); aquí las listas de conjuros, los números y los selectores. */
  {de:/^clerigo$/, n:/^golpes benditos$/, t:'pasiva',
    eleccion: {id:'golpes-benditos', titulo:'Golpes Benditos', opciones: [
      {key:'golpe-divino', nombre:'Golpe Divino', desc:'Una vez por turno, al acertar con un arma, haces 1d8 de daño radiante o necrótico extra (2d8 desde el nivel 14).'},
      {key:'lanzamiento-potente', nombre:'Lanzamiento Potente', desc:'Sumas tu SAB al daño de tus trucos de clérigo; desde el nivel 14 también das PG temporales al dañar con uno.'}]},
    texto: c => ({
      'golpe-divino': `Golpe Divino: una vez por turno, al acertar con un arma, ${c.lvl >= 14 ? '2d8' : '1d8'} de daño radiante o necrótico extra (tú eliges).`,
      'lanzamiento-potente': `Lanzamiento Potente: sumas ${sign(c.m.sab)} (SAB) al daño de tus trucos de clérigo.`,
    })[elegido(c, 'golpes-benditos')] || 'Elige Golpe Divino o Lanzamiento Potente en el paso Clase.'},
  {de:/^clerigo$/, n:/^golpes benditos mejorados/, t:'pasiva',
    texto: c => elegido(c, 'golpes-benditos') === 'lanzamiento-potente'
      ? `Al dañar con un truco, tú o una criatura a 60 pies ganáis ${Math.max(0, 2 * c.m.sab)} PG temporales (el doble de tu SAB).`
      : 'Golpe Divino hace 2d8 de daño extra (ya en Golpes Benditos).'},

  {de:/dominio de la vida/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', DOMINIOS_CLERIGO.vida).texto},
  {de:/dominio de la vida/, n:/^preservar vida/, t:'accion', coste:'1 Canalizar Divinidad',
    texto: c => `Como acción mágica, repartes ${5 * c.lvl} PG entre criaturas Ensangrentadas a 30 pies (tú incluido), sin subir a nadie por encima de la mitad de sus PG máximos.`},

  {de:/dominio de la luz/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', DOMINIOS_CLERIGO.luz).texto},
  {de:/dominio de la luz/, n:/^resplandor del alba/, t:'accion', coste:'1 Canalizar Divinidad',
    texto: c => `Deshaces la oscuridad mágica a 30 pies; quienes elijas en esa zona hacen una salvación de CON (CD ${c.dcSpell}) o reciben 2d10 + ${c.lvl} de daño radiante (mitad si la pasan).`},
  {de:/dominio de la luz/, n:/^destello protector$/, t:'reaccion', usos: c => Math.max(1, c.m.sab), reset: c => c.lvl >= 6 ? 'corto' : 'largo',
    texto: () => 'Cuando una criatura que ves a 30 pies hace una tirada de ataque, la hace con desventaja.'},
  {de:/dominio de la luz/, n:/^destello protector mejorado/, t:'pasiva',
    texto: c => `Destello Protector se recupera también con un descanso corto, y al usarlo el objetivo del ataque gana 2d6${fmtMod(c.m.sab)} PG temporales.`},
  {de:/dominio de la luz/, n:/^corona de luz/, t:'accion', usos: c => Math.max(1, c.m.sab), reset:'largo',
    texto: () => 'Durante 1 minuto irradias luz brillante a 60 pies (y tenue 30 más); los enemigos en la luz brillante tienen desventaja en las salvaciones contra Resplandor del Alba y contra tus conjuros de fuego o radiantes.'},

  {de:/dominio del engano/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', DOMINIOS_CLERIGO.engano).texto},
  {de:/dominio del engano/, n:/^invocar duplicidad/, t:'adicional', coste:'1 Canalizar Divinidad'},
  {de:/dominio del engano/, n:/^duplicidad mejorada/, t:'pasiva',
    texto: c => `Tus aliados también tienen ventaja al atacar a criaturas a 5 pies de tu ilusión. Cuando la ilusión acaba, tú o una criatura a 5 pies de ella recuperáis ${c.lvl} PG.`},

  {de:/dominio de la guerra/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', DOMINIOS_CLERIGO.guerra).texto},
  {de:/dominio de la guerra/, n:/^golpe guiado/, t:'gratis', coste:'1 Canalizar Divinidad'},
  {de:/dominio de la guerra/, n:/^sacerdote de la guerra/, t:'adicional', usos: c => Math.max(1, c.m.sab), reset:'corto'},
  {de:/dominio de la guerra/, n:/^bendicion del dios de la guerra/, t:'accion', coste:'1 Canalizar Divinidad'},

  {de:/dominio del conocimiento/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', [[3, ['Orden imperiosa', 'Comprender idiomas', 'Detectar magia', 'Detectar pensamientos', 'Identificar', 'Clavo mental']], [5, ['Disipar magia', 'Indetectable', 'Don de lenguas']], [7, ['Ojo arcano', 'Destierro', 'Confusión']], [9, ['Conocer las leyendas', 'Escudriñar', 'Estática Sináptica']]]).texto},
  {de:/dominio del conocimiento/, n:/^bendiciones del saber/, t:'pasiva',
    eleccion: [
      {id:'saber-herr', titulo:'Herramientas de artesano (Bendiciones del Saber)', opciones: opcionesCompetencia(['artesano']), ayuda: ayudaCompetencia(['artesano'])},
      {id:'saber-habs', titulo:'Habilidades con pericia (Bendiciones del Saber)', max: 2, opciones: ['Arcanos', 'Historia', 'Naturaleza', 'Religión'].map(h => ({key: norm(h), nombre: h})), ayuda: 'Eliges dos de estas habilidades y ganas competencia y pericia en ellas (sumas el doble del bonificador).'},
    ],
    efecto: c => {
      aplicarElegidas(c, 'saber-herr', 'Bendiciones del Saber');
      for (const k of elegidos(c, 'saber-habs')) {
        if (!c.skillProf[k]) { c.skill[k] += c.pb; c.skillProf[k] = true; }
        if (!c.skillPer[k]) { c.skill[k] += c.pb; c.skillPer[k] = true; }
      }
    },
    texto: c => elegidos(c, 'saber-habs').length === 2 && elegido(c, 'saber-herr')
      ? 'Competencia con tus herramientas y pericia en tus dos habilidades (ya sumado).'
      : 'Elige en el paso Clase unas herramientas de artesano y dos habilidades (Arcanos, Historia, Naturaleza o Religión) con pericia.'},
  {de:/dominio del conocimiento/, n:/^magia de la mente/, t:'accion', coste:'1 Canalizar Divinidad'},
  {de:/dominio del conocimiento/, n:/^mente desatada/, t:'pasiva',
    texto: c => `Telepatía a 60 pies con hasta ${Math.max(1, c.m.sab)} criatura(s) a la vez. Competencia en salvaciones de INT (o en otra que te falte, si ya la tenías).`},

  {de:/dominio de la tumba/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', [[3, ['Detectar el bien y el mal', 'Falsa vida', 'Dulce descanso', 'Rayo debilitador', 'Perdonar a los moribundos']], [5, ['Revivir', 'Toque vampírico']], [7, ['Marchitar', 'Guarda contra la Muerte']], [9, ['Disipar el bien y el mal', 'Alzar a los muertos']]]).texto},
  {de:/dominio de la tumba/, n:/^circulo de la mortalidad/, t:'pasiva',
    texto: c => `Una vez por turno, al dañar con un conjuro o una tirada de ataque a una criatura a la que le faltan PG, ${c.lvl >= 11 ? '1d6' : '1d4'} de daño necrótico extra. Lanzas Perdonar a los moribundos como acción adicional, y al curar a alguien con 0 PG usas el máximo de cada dado.`},
  {de:/dominio de la tumba/, n:/^sendero a la tumba/, t:'adicional', coste:'1 Canalizar Divinidad',
    texto: c => `Maldices hasta el inicio de tu próximo turno a una criatura que ves a 30 pies: desventaja en ataques y salvaciones. Cuando tú o un aliado la acertáis, podéis acabar la maldición para hacer ${c.lvl} de daño necrótico o radiante extra.`},
  {de:/dominio de la tumba/, n:/^centinela en la puerta/, t:'reaccion', usos: c => Math.max(1, c.m.sab), reset:'largo'},
  {de:/dominio de la tumba/, n:/^segador divino/, t:'pasiva',
    texto: c => `Con 1 Canalizar Divinidad, un conjuro de nigromancia de nivel 5 o menor de un objetivo, o uno de tu dominio, afecta a un segundo objetivo. Guardián de Almas: cuando muere un enemigo a 60 pies, tú o una criatura que ves recuperáis ${2 * c.lvl} PG; una vez por descanso corto o largo, o gastando un espacio de nivel 6+.`},

  {de:/dominio arcano/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', [[3, ['Detectar magia', 'Proyectil mágico', 'Arma mágica', 'Aura mágica de Nystul']], [5, ['Contrahechizo', 'Disipar magia']], [7, ['Ojo arcano', 'Cofre oculto de Leomund']], [9, ['Mano de Bigby', 'Círculo de teletransportación']]]).texto},
  {de:/dominio arcano/, n:/^modificar la magia/, t:'pasiva', texto: () => 'Al lanzar un conjuro, gastas 1 Canalizar Divinidad para cambiarlo de una de estas formas.',
    opciones: [
      {nombre:'Conjuro Fortificante', t:'gratis', coste:'1 Canalizar Divinidad', texto: c => `Un objetivo del conjuro gana 2d8 + ${c.lvl} PG temporales.`},
      {nombre:'Conjuro Tenaz', t:'gratis', coste:'1 Canalizar Divinidad', texto: () => 'Si una criatura que ves pasa la salvación del conjuro, tira 1d6 y réstalo a su primera salvación contra el efecto del conjuro.'},
    ]},

  {de:/dominio de la tempestad/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', [[3, ['Niebla', 'Onda atronadora', 'Ráfaga de viento', 'Hacer añicos']], [5, ['Llamar al relámpago', 'Tormenta de aguanieve']], [7, ['Controlar agua', 'Tormenta de hielo']], [9, ['Ola destructora', 'Plaga de insectos']]]).texto},
  {de:/dominio de la tempestad/, n:/^ira de la tormenta/, t:'reaccion', usos: c => Math.max(1, c.m.sab), reset:'largo',
    texto: c => `Cuando una criatura a 5 pies que ves te acierta, hace una salvación de DES (CD ${c.dcSpell}) o recibe 2d8 de daño de trueno o relámpago (mitad si la pasa).`},
  {de:/dominio de la tempestad/, n:/^ira destructora/, t:'gratis', coste:'1 Canalizar Divinidad'},

  {de:/dominio de la naturaleza/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', [[3, ['Amistad con los animales', 'Hablar con los Animales', 'Piel robliza', 'Crecimiento espinoso']], [5, ['Crecimiento vegetal', 'Muro de viento']], [7, ['Dominar bestia', 'Enredadera']], [9, ['Plaga de insectos', 'Caminar entre árboles']]]).texto},
  {de:/dominio de la naturaleza/, n:/^hechizar animales/, t:'accion', coste:'1 Canalizar Divinidad',
    texto: c => `Las bestias y plantas que te ven a 30 pies hacen una salvación de SAB (CD ${c.dcSpell}) o quedan Hechizadas por ti 1 minuto, o hasta que reciban daño.`},

  {de:/dominio de la forja/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', [[3, ['Identificar', 'Castigo abrasador', 'Calentar metal', 'Arma mágica']], [5, ['Arma elemental', 'Protección contra energía']], [7, ['Fabricar', 'Muro de fuego']], [9, ['Animar objetos', 'Creación']]]).texto},
  {de:/dominio de la forja/, n:/^alma de la forja/, t:'pasiva',
    efecto: c => { if (c.armor?.cat === 'pesada') c.ac += 1; },
    texto: () => 'Tienes resistencia al fuego y, con armadura pesada, +1 a la CA (ya sumado).'},
  {de:/dominio de la forja/, n:/^bendicion del artesano/, t:'fuera', coste:'1 Canalizar Divinidad'},

  {de:/dominio del orden/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', [[3, ['Orden imperiosa', 'Heroísmo', 'Inmovilizar persona', 'Zona de la verdad']], [5, ['Palabra curativa en masa', 'Ralentizar']], [7, ['Compulsión', 'Localizar criatura']], [9, ['Comunión', 'Dominar persona']]]).texto},
  {de:/dominio del orden/, n:/^exigencia del orden/, t:'accion', coste:'1 Canalizar Divinidad',
    texto: c => `Las criaturas que elijas a 30 pies hacen una salvación de SAB (CD ${c.dcSpell}) o quedan Hechizadas hasta el final de tu próximo turno o hasta recibir daño; puedes hacer que suelten lo que llevan.`},
  {de:/dominio del orden/, n:/^encarnacion de la ley/, t:'gratis', usos: c => Math.max(1, c.m.sab), reset:'largo'},

  {de:/dominio de la paz/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', [[3, ['Heroísmo', 'Santuario', 'Ayuda', 'Vínculo protector']], [5, ['Señal de esperanza', 'Recado']], [7, ['Aura de pureza', 'Esfera elástica de Otiluke']], [9, ['Restablecimiento mayor', 'Vínculo telepático de Rary']]]).texto},
  {de:/dominio de la paz/, n:/^vinculo alentador/, t:'accion', usos: c => c.pb, reset:'largo',
    texto: c => `Unes 10 minutos a hasta ${c.pb} criaturas voluntarias a 30 pies (puedes incluirte). Una vez por turno, un vinculado a 30 pies de otro suma 1d4 a una tirada de ataque, prueba o salvación.`},
  {de:/dominio de la paz/, n:/^balsamo de paz/, t:'accion', coste:'1 Canalizar Divinidad',
    texto: c => `Te mueves tu velocidad sin provocar ataques de oportunidad y curas 2d6${fmtMod(c.m.sab)} PG una vez a cada criatura que elijas a 5 pies durante el recorrido.`},

  {de:/dominio del crepusculo/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', [[3, ['Fuego feérico', 'Dormir', 'Rayo de luna', 'Ver invisibilidad']], [5, ['Aura de vitalidad', 'Pequeña choza de Leomund']], [7, ['Aura de vida', 'Invisibilidad mejorada']], [9, ['Círculo de poder', 'Engañar']]]).texto},
  {de:/dominio del crepusculo/, n:/^ojos de la noche/, t:'accion', usos:1, reset:'largo', efecto: c => { c.vision = Math.max(c.vision || 0, 300); },
    texto: c => `Ves en la oscuridad a 300 pies (ya en tus sentidos). Como acción, compartes esa visión 1 hora con hasta ${Math.max(1, c.m.sab)} criatura(s) voluntaria(s) a 10 pies; una vez por descanso largo, o gastando un espacio.`},
  {de:/dominio del crepusculo/, n:/^santuario crepuscular/, t:'accion', coste:'1 Canalizar Divinidad',
    texto: c => `Durante 1 minuto emanas una esfera de penumbra de 30 pies. Al final del turno de cada criatura que elijas dentro, le das 1d6 + ${c.lvl} PG temporales o le quitas Hechizado o Asustado.`},
  {de:/dominio del crepusculo/, n:/^pasos de la noche/, t:'adicional', usos: c => c.pb, reset:'largo'},

  {de:/dominio de la muerte/, n:/^conjuros del dominio/, t:'pasiva', texto: conjurosSub('', [[3, ['Falsa vida', 'Rayo nauseabundo', 'Sordera/Ceguera', 'Rayo debilitador']], [5, ['Animar a los muertos', 'Toque vampírico']], [7, ['Marchitar', 'Guarda contra la Muerte']], [9, ['Caparazón antivida', 'Nube aniquiladora']]]).texto},
  {de:/dominio de la muerte/, n:/^toque de la muerte/, t:'gratis', coste:'1 Canalizar Divinidad',
    texto: c => `Al acertar con un ataque cuerpo a cuerpo, haces ${5 + 2 * c.lvl} de daño necrótico extra.`},

  /* ---------- Druida (Lote 9: Manual del Jugador 2024; Sueños y Pastor de Xanathar, Esporas y Fuego Salvaje de Tasha) ----------
     Lo demás (textos, usos, conjuros de círculo) está en generadas/druida.ts */
  /* Círculo de la Tierra: la regla repite la elección de lo generado, porque esta tiene prioridad */
  {de:/^circulo de la tierra$/, n:/^conjuros del circulo de la tierra$/, t:'pasiva',
    texto: c => TIERRAS[elegido(c, 'tipo-tierra')] ? conjurosSub('', TIERRAS[elegido(c, 'tipo-tierra')].conj).texto(c) : 'Elige tu tipo de tierra (puedes cambiarlo al terminar cada descanso largo).',
    eleccion: {id:'tipo-tierra', titulo:'Tipo de tierra', opciones: Object.entries(TIERRAS).map(([key, x]) => ({key, nombre: x.n,
      desc: `${x.conj.map(([n, s]) => `${s.join(', ')} (${n})`).join('; ')}. Resistencia ${x.res}.`}))}},
  {de:/^circulo de la tierra$/, n:/^ayuda de la tierra/, t:'accion', coste:'1 Forma Salvaje',
    texto: c => `En una esfera de 10 pies a 60 pies, las criaturas que elijas hacen una salvación de CON (CD ${c.dcSpell}): ${dadoAyudaTierra(c)} de daño necrótico, o la mitad si la pasan. Una criatura de la zona recupera ${dadoAyudaTierra(c)} PG.`},
  {de:/^circulo de la tierra$/, n:/^proteccion de la naturaleza/, t:'pasiva',
    texto: c => `Eres inmune a la condición de Envenenado y tienes resistencia al daño ${TIERRAS[elegido(c, 'tipo-tierra')]?.res || 'que da tu tipo de tierra (fuego, frío, relámpago o veneno)'}.`},
  /* Círculo de la Luna */
  {de:/^circulo de la luna$/, n:/^formas del circulo$/, t:'pasiva',
    texto: c => `En Forma Salvaje puedes adoptar bestias de VD ${Math.max(1, Math.floor(c.lvl / 3))} o menos, tu CA es ${13 + c.m.sab} si la de la bestia es menor, y ganas ${3 * c.lvl} PG temporales.`},
  /* Círculo del Mar */
  {de:/^circulo del mar$/, n:/^ira del mar/, t:'adicional', coste:'1 Forma Salvaje',
    texto: c => `Durante 10 minutos te rodea una emanación de espuma de ${c.lvl >= 6 ? 10 : 5} pies. Al crearla, y con una acción adicional en tus turnos siguientes, eliges a una criatura dentro: salvación de CON (CD ${c.dcSpell}) o recibe ${Math.max(1, c.m.sab)}d6 de daño de frío y, si es Grande o menor, la empujas hasta 15 pies.`},
  /* Círculo de las Estrellas: el Mapa declara sus conjuros porque su nombre no empieza por "Conjuros" */
  {de:/^circulo de las estrellas$/, n:/^mapa estelar/, t:'pasiva', usos: c => Math.max(1, c.m.sab), reset:'largo',
    conjuros: [{nombre:'Guía'}, {nombre:'Rayo guía'}],
    texto: () => 'Tu carta estelar es un foco de conjuros. Mientras la tienes, Guía y Rayo guía están siempre preparados (ya en tus conjuros), y lanzas Rayo guía sin gastar espacio con los usos de este rasgo. Si la pierdes, la rehaces con un ritual de 1 hora.'},
  {de:/^circulo de las estrellas$/, n:/^forma estelar/, t:'adicional', coste:'1 Forma Salvaje',
    ataques: c => [{nombre:'Arquero (Forma Estelar)', atk: c.atkSpell, expr: `${dadoEstrella(c)}${modStr(c.m.sab)}`, dmg: `${dadoEstrella(c)}${fmtMod(c.m.sab)} radiante`,
      notas:['Ataque de conjuro a distancia a 60 pies, al activar la forma y con acción adicional en los turnos siguientes']}],
    texto: c => `Durante 10 minutos brillas (luz brillante a 10 pies) y eliges constelación. Arquero: ataque de conjuro a distancia a 60 pies con acción adicional, ${dadoEstrella(c)}${fmtMod(c.m.sab)} radiante (en Ataques). Cáliz: al curar con un espacio de conjuro, tú u otra criatura a 30 pies recuperáis ${dadoEstrella(c)}${fmtMod(c.m.sab)} PG. Dragón: en pruebas de INT o SAB y salvaciones de concentración, un 9 o menos en el d20 cuenta como 10${c.lvl >= 10 ? '; además vuelas a 20 pies y puedes flotar' : ''}.`},
  /* Círculo de los Sueños */
  {de:/^circulo de los suenos$/, n:/^balsamo de la corte estival/, t:'adicional', usos: c => c.lvl, reset:'largo', pool: true,
    texto: c => `Tienes ${c.lvl} d6. Con una acción adicional gastas hasta ${Math.max(1, Math.floor(c.lvl / 2))} para curar a una criatura que veas a 120 pies: recupera lo que saquen y gana 1 PG temporal por dado.`},
  /* Círculo del Pastor */
  {de:/^circulo del pastor$/, n:/^totem espiritual/, t:'adicional', usos:1, reset:'corto',
    texto: c => `Invocas un espíritu a 60 pies con un aura de 30 pies durante 1 minuto. Oso: tú y tus aliados en el aura ganáis ${5 + c.lvl} PG temporales y ventaja en pruebas y salvaciones de FUE. Halcón: con tu reacción das ventaja al ataque de una criatura en el aura, y tenéis ventaja en Percepción. Unicornio: ventaja para detectar criaturas en el aura, y al curar con un espacio de conjuro, cada criatura que elijas en el aura recupera ${c.lvl} PG más.`},
  /* Círculo de las Esporas */
  {de:/^circulo de las esporas$/, n:/^halo de esporas/, t:'reaccion',
    texto: c => `Cuando una criatura que ves se mueve a 10 pies de ti o empieza su turno allí, hace una salvación de CON (CD ${c.dcSpell}) o recibe ${dadoHalo(c)} de daño necrótico.`},
  {de:/^circulo de las esporas$/, n:/^entidad simbiotica/, t:'accion', coste:'1 Forma Salvaje',
    texto: c => `Ganas ${4 * c.lvl} PG temporales durante 10 minutos. Mientras los tengas, el daño de tu Halo de Esporas pasa a ${dadoHalo(c).replace(/^1/, '2')} y tus ataques cuerpo a cuerpo hacen 1d6 necrótico extra.`},

  /* ---------- Explorador (Lote 10: Manual del Jugador 2024; Guardián Hueco de Ravenloft 2026, Caminante del Invierno de Heroes of Faerûn 2025) ----------
     Lo demás (textos, usos, selectores, conjuros de subclase) está en generadas/explorador.ts */
  {de:/^explorador$/, n:/^marca del cazador$/, t:'adicional', coste:'1 uso de Enemigo Predilecto o 1 espacio', recurso:'enemigo',
    texto: c => `Siempre preparada (concentración, 1 hora): +${dadoMarca(c)} de fuerza al golpear a la criatura marcada, y ventaja en Percepción o Supervivencia para encontrarla.`},
  {de:/^explorador$/, n:/^incansable$/, t:'accion', usos: c => Math.max(1, c.m.sab), reset:'largo',
    texto: c => `Con una acción mágica ganas 1d8${fmtMod(Math.max(1, c.m.sab))} PG temporales. Además, al terminar un descanso corto tu agotamiento, si tienes, baja 1 nivel.`},
  {de:/^explorador$/, n:/^cazador de enemigos$/, t:'pasiva',
    texto: () => 'El dado de daño extra de tu Marca del cazador es 1d10 en vez de 1d6 (ya en el rasgo Marca del Cazador).'},
  {de:/^caminante de las hadas$/, n:/^golpes pavorosos$/, t:'gratis',
    texto: c => `Una vez por turno por criatura, al acertar con un arma haces ${c.lvl >= 11 ? '1d6' : '1d4'} de daño psíquico extra.`},
  {de:/^acechador de las sombras$/, n:/^emboscador temible$/, t:'gratis', usos: c => Math.max(1, c.m.sab), reset:'largo',
    texto: c => `Sumas tu SAB (${sign(c.m.sab)}) a la iniciativa, y en tu primer turno de cada combate tu velocidad sube 10 pies. Una vez por turno, al acertar con un arma, puedes gastar un uso para hacer ${c.lvl >= 11 ? '2d8' : '2d6'} de daño psíquico extra.`},
  {de:/^acechador de las sombras$/, n:/^vista umbria$/, t:'pasiva',
    efecto: c => { c.vision = (c.vision || 0) + 60; },
    texto: () => 'Visión en la oscuridad a 60 pies, o 60 más si ya tenías (ya sumado). Totalmente en la oscuridad, eres Invisible para quien dependa de la visión en la oscuridad para verte.'},
  {de:/^guardian hueco$/, n:/^poder hambriento$/, t:'pasiva',
    texto: c => `Sumas ${sign(Math.max(1, c.m.sab))} a tus salvaciones de CON. Transformado con Ira de lo Salvaje y estando Maltrecho, la primera vez que aciertas un ataque en cada turno recuperas 1d10${fmtMod(c.m.sab)} PG.`},
  {de:/^caminante del invierno$/, n:/^explorador gelido$/, t:'gratis',
    texto: c => `Tienes resistencia al frío, y el daño de tus ataques con arma, conjuros y rasgos de explorador ignora la resistencia al frío. Una vez por turno por criatura, al acertar con un arma haces ${c.lvl >= 11 ? '1d6' : '1d4'} de daño de frío extra.`},
  {de:/^caminante del invierno$/, n:/^escarcha del cazador$/, t:'pasiva',
    texto: c => `Al lanzar Marca del cazador ganas 1d10 + ${c.lvl} PG temporales, y mientras dure la criatura marcada no puede Destrabarse.`},

  /* ---------- Guerrero (Lote 11: Manual del Jugador 2024; Abanderado de Heroes of Faerûn 2025, Arquero Arcano de Arcana Unleashed 2026) ----------
     Lo demás (textos y usos simples) está en generadas/guerrero.ts */
  {de:/^guerrero$/, n:/^indomable$/, t:'gratis', usos: c => c.lvl >= 17 ? 3 : c.lvl >= 13 ? 2 : 1, reset:'largo',
    texto: c => `Si fallas una salvación, la repites sumando +${c.lvl} (tu nivel de guerrero) y te quedas con la nueva tirada.`},
  /* Maestro de Batalla: dados de superioridad y maniobras conocidas (3, 5 en nivel 7, 7 en 10 y 9 en 15) */
  {de:/^maestro de batalla$/, n:/^superioridad en combate$/, t:'pasiva', usos: c => c.lvl >= 15 ? 6 : c.lvl >= 7 ? 5 : 4, reset:'corto',
    texto: c => `Tus dados de superioridad son ${dadoSup(c)}; se gastan al usar una maniobra (solo una por ataque) y vuelven con un descanso corto o largo. La CD de tus maniobras es ${cdManiobra(c)} (FUE o DES). Elige tus maniobras en el paso Clase.`,
    eleccion: {id:'maniobra', titulo:'Maniobras', max: c => c.lvl >= 15 ? 9 : c.lvl >= 10 ? 7 : c.lvl >= 7 ? 5 : 3,
      opciones: MANIOBRAS.map(([key, nombre]) => ({key, nombre}))},
    opciones: MANIOBRAS.map(([key, nombre, t, texto]) => ({nombre, t, coste:'1 dado de superioridad', elegida:['maniobra', key],
      si: c => [].concat(c.pj?.elecciones?.maniobra || []).includes(key), texto}))},
  {de:/^maestro de batalla$/, n:/^implacable$/, t:'pasiva',
    texto: () => 'Una vez por turno, al usar una maniobra, puedes tirar 1d8 y usar ese resultado en vez de gastar un dado de superioridad.'},
  /* Campeón */
  {de:/^campeon$/, n:/^superviviente$/, t:'pasiva',
    texto: c => `Tienes ventaja en las salvaciones de muerte, y un 18 o 19 cuenta como 20. Al empezar tu turno Maltrecho y con al menos 1 PG, recuperas ${Math.max(0, 5 + c.m.con)} PG (5 + CON).`},
  {de:/^campeon$/, n:/^estilo de combate adicional$/, t:'pasiva',
    texto: () => 'Ganas un segundo estilo de combate, distinto del que ya tienes. Elígelo en el paso Clase; su efecto ya se suma.',
    eleccion: {id:'estilo-campeon', titulo:'Estilo de combate adicional',
      opciones: c => (c.C?.estilos || []).filter(k => k !== c.estilo && ESTILOS[k]).map(k => ({key:k, nombre:ESTILOS[k][0], desc:ESTILOS[k][2]}))}},
  /* Arquero Arcano */
  {de:/^arquero arcano$/, n:/^disparo arcano$/, t:'pasiva', usos: c => Math.max(1, c.m.int), reset:'corto',
    // Perforante y Buscador no siguen a un ataque: salen en Ataques, con cada arma con munición que llevas
    ataques: c => DISPARO_SIN_ATAQUE.filter(([k]) => [].concat(c.pj?.elecciones?.['disparo-arcano'] || []).includes(k)).flatMap(([, nombre, tipo, nota]) =>
      (c.armas || []).filter(a => (a.w?.p || []).includes('munición')).map(a => ({nombre: `${nombre} (${a.w.n})`, cd: cdArcano(c), salv: 'DES',
        expr: `${a.expr}+2${dadoArcano(c)}`, dmg: `${a.dmg.replace(/ \S+$/, '')} + 2${dadoArcano(c)} ${tipo}`, gastaNombre: 'disparo arcano',
        notas: [nota, 'Si la supera, la mitad del daño. Gasta 1 uso de Disparo Arcano al tirar el daño']}))),
    texto: c => `Una vez por turno, al acertar y dañar con un ataque a distancia con un arma con munición, aplicas uno de tus Disparos Arcanos (gasta un uso). Tu dado de Disparo Arcano es 1${dadoArcano(c)} y la CD es ${cdArcano(c)} (INT). Elige tus disparos en el paso Clase.`,
    eleccion: {id:'disparo-arcano', titulo:'Disparos Arcanos', max: c => c.lvl >= 18 ? 6 : c.lvl >= 15 ? 5 : c.lvl >= 10 ? 4 : c.lvl >= 7 ? 3 : 2,
      opciones: DISPAROS_ARCANOS.map(([key, nombre]) => ({key, nombre}))},
    opciones: DISPAROS_ARCANOS.map(([key, nombre, t, texto]) => ({nombre, t, coste:'1 uso de Disparo Arcano', elegida:['disparo-arcano', key],
      si: c => [].concat(c.pj?.elecciones?.['disparo-arcano'] || []).includes(key), texto}))},
  /* Abanderado (antes Caballero del Dragón Púrpura) */
  {de:/^abanderado$/, n:/^recuperacion grupal$/, t:'gratis', usos:1, reset:'corto',
    texto: c => `Al usar Segundo Aliento para curarte, hasta ${Math.max(1, c.m.car)} aliado(s) a ${c.lvl >= 18 ? 60 : 30} pies recuperan 1d4 + ${c.lvl} PG cada uno.`},
  /* Samurái (Xanathar 2017) */
  {de:/^samurai$/, n:/^espiritu de lucha$/, t:'adicional', usos:3, reset:'largo',
    texto: c => `Tienes ventaja en tus ataques con arma hasta el final del turno y ganas ${c.lvl >= 15 ? 15 : c.lvl >= 10 ? 10 : 5} PG temporales.`},
  /* Caballero Rúnico (Tasha 2020): runas conocidas (2, 3 en nivel 7, 4 en 10 y 5 en 15) y Poder de Gigante */
  {de:/^caballero runico$/, n:/^tallador de runas$/, t:'pasiva',
    texto: c => `Al terminar un descanso largo inscribes cada runa que conoces en un objeto distinto que lleves (arma, armadura, escudo, joya...). Cada runa da su efecto pasivo y se puede invocar ${c.lvl >= 15 ? 'dos veces' : 'una vez'} por descanso corto o largo. La CD de tus runas es ${cdRuna(c)} (CON). Elige tus runas en el paso Clase.`,
    eleccion: {id:'runas', titulo:'Runas', max: c => c.lvl >= 15 ? 5 : c.lvl >= 10 ? 4 : c.lvl >= 7 ? 3 : 2,
      opciones: RUNAS.map(([key, nombre, , nivel]) => ({key, nombre, nivel}))},
    opciones: RUNAS.map(([key, nombre, t, , texto]) => ({nombre, t, usos: c => c.lvl >= 15 ? 2 : 1, reset:'corto', elegida:['runas', key],
      si: c => [].concat(c.pj?.elecciones?.runas || []).includes(key), texto}))},
  {de:/^caballero runico$/, n:/^poder de gigante$/, t:'adicional', usos:'pb', reset:'largo',
    texto: c => `Durante 1 minuto creces a Grande${c.lvl >= 18 ? ' (o Enorme, con 5 pies más de alcance)' : ''} si hay espacio, tienes ventaja en pruebas y salvaciones de FUE, y una vez por turno un ataque con arma o golpe sin armas que acierte hace ${dadoGigante(c)} de daño extra.`},
  /* Guerrero Psiónico: dados de energía psiónica (recuperas 1 con descanso corto y todos con uno largo) */
  {de:/^guerrero psionico$/, n:/^poder psionico$/, t:'pasiva', usos: c => c.lvl >= 17 ? 12 : c.lvl >= 13 ? 10 : c.lvl >= 9 ? 8 : c.lvl >= 5 ? 6 : 4, reset:'corto1', coste:'1 vuelve con descanso corto, todos con uno largo',
    texto: c => `Tus dados de energía psiónica son ${dadoPsi(c)}. Recuperas uno al terminar un descanso corto y todos al terminar uno largo.`},
  {de:/^guerrero psionico$/, n:/^campo protector$/, t:'reaccion', coste:'1 dado psiónico',
    texto: c => `Cuando tú u otra criatura que veas a 30 pies recibe daño, reduces ese daño en 1${dadoPsi(c)}${fmtMod(c.m.int)} (mínimo 1).`},
  {de:/^guerrero psionico$/, n:/^golpe psionico$/, t:'gratis', coste:'1 dado psiónico',
    texto: c => `Una vez por turno, justo después de acertar y dañar con un arma a un objetivo a 30 pies, le haces 1${dadoPsi(c)}${fmtMod(c.m.int)} de daño de fuerza extra.`},

  /* ---------- Especies (Lote 4) ----------
     Sus tipos, usos y textos están en la biblioteca (scripts/datos/especies-2025.ts, rasgos con `manual`).
     Aquí solo lo que necesita cálculo o selector. */
  {de:/^forjado/, n:/^proteccion integrada/, t:'pasiva', efecto: c => { c.ac += 1; },
    texto: () => 'Tienes +1 a la CA (ya sumado), y nadie puede quitarte la armadura que llevas puesta mientras vivas.'},
  {de:/^harengon$/, n:/^gatillo de liebre/, t:'pasiva', efecto: c => { c.init += c.pb; c.initPartes.push([c.pb, 'Gatillo de Liebre']); },
    texto: c => `Sumas tu competencia (${sign(c.pb)}) a la iniciativa (ya sumado).`},
  {de:/^kobold$/, n:/^legado kobold/, t:'pasiva',
    eleccion: {id:'legado-kobold', titulo:'Legado kobold', opciones: [{key:'astucia', nombre:'Astucia', desc:'Competencia en Arcanos, Investigación, Medicina, Juego de Manos o Supervivencia.'}, {key:'desafio', nombre:'Desafío', desc:'Ventaja en las salvaciones para no quedar Asustado o dejar de estarlo.'}, {key:'hechiceria', nombre:'Hechicería Dracónica', desc:'Un truco de hechicero; usa INT, SAB o CAR.'}]},
    texto: c => ({
      astucia: 'Astucia: competencia en Arcanos, Investigación, Medicina, Juego de Manos o Supervivencia (márcala en Habilidades).',
      desafio: 'Desafío: ventaja en las salvaciones para no quedar Asustado o dejar de estarlo.',
      hechiceria: 'Hechicería Dracónica: conoces un truco de hechicero (agrégalo en Conjuros); usa INT, SAB o CAR.',
    })[elegido(c, 'legado-kobold')] || 'Elige tu legado en el paso Especie: Astucia (una habilidad), Desafío (ventaja contra el miedo) o Hechicería Dracónica (un truco de hechicero).'},
  {de:/hibrido simic/, n:/^mejora animal$/, t:'pasiva',
    eleccion: {id:'simic-1', titulo:'Mejora animal (nivel 1)', opciones: SIMIC.slice(0, 3).map(([key, nombre]) => ({key, nombre, desc: c => simicTexto(c, key)}))},
    texto: c => simicTexto(c, elegido(c, 'simic-1')) || 'Elige tu mejora en el paso Especie: Planeo de Manta, Trepador Ágil o Adaptación Submarina.'},
  {de:/hibrido simic/, n:/^mejora animal avanzada/, t:'pasiva',
    eleccion: {id:'simic-5', titulo:'Mejora animal (nivel 5)', opciones: SIMIC.map(([key, nombre]) => ({key, nombre, desc: c => simicTexto(c, key)}))},
    efecto: c => { if (elegido(c, 'simic-5') === 'caparazon' && c.armor?.cat !== 'pesada') c.ac += 1; },
    ataques: c => elegido(c, 'simic-5') === 'apendices' ? [{nombre:'Apéndice prensil', atk: c.pb + c.m.fue, expr: `1d6${modStr(c.m.fue)}`, dmg: `1d6${fmtMod(c.m.fue)} contundente`,
      notas:['Golpe sin armas. Si aciertas, puedes intentar agarrar con acción adicional']}] : [],
    texto: c => simicTexto(c, elegido(c, 'simic-5')) || 'Elige tu segunda mejora en el paso Especie: una de nivel 1 que no tengas, Apéndices Prensiles, Caparazón o Escupir Ácido.',
    opciones: [
      {nombre:'Escupir ácido', t:'accion', usos: c => Math.max(1, c.m.con), reset:'largo', si: c => elegido(c, 'simic-5') === 'acido',
        texto: c => `Una criatura u objeto que veas a 30 pies hace una salvación de DES (CD ${8 + c.pb + c.m.con}) o recibe ${c.lvl >= 17 ? 4 : c.lvl >= 11 ? 3 : 2}d10 de daño de ácido.`},
    ]},

  /* Competencias a elegir de las especies: el texto y el tipo siguen siendo los de la biblioteca; aquí solo el selector y su efecto */
  {de:/^autognomo/, n:/^diseno especializado/,
    eleccion: {id:'autognomo-herramientas', titulo:'Herramientas (Diseño Especializado)', max: 2, opciones: opcionesCompetencia(['herramienta']), ayuda: ayudaCompetencia(['herramienta'], {max: 2})},
    efecto: c => aplicarElegidas(c, 'autognomo-herramientas', 'Diseño Especializado')},
  {de:/^forjado/, n:/^diseno especializado/,
    eleccion: {id:'forjado-herramienta', titulo:'Herramienta (Diseño Especializado)', opciones: opcionesCompetencia(['herramienta']), ayuda: ayudaCompetencia(['herramienta'])},
    efecto: c => aplicarElegidas(c, 'forjado-herramienta', 'Diseño Especializado')},
  {de:/^vedalken/, n:/^precision incansable/,
    eleccion: {id:'vedalken-herramienta', titulo:'Herramienta (Precisión Incansable)', opciones: opcionesCompetencia(['herramienta']), ayuda: ayudaCompetencia(['herramienta'])},
    efecto: c => aplicarElegidas(c, 'vedalken-herramienta', 'Precisión Incansable')},
  {de:/^satiro/, n:/^juerguista/,
    eleccion: {id:'satiro-instrumento', titulo:'Instrumento musical (Juerguista)', opciones: [{key:'herr:instrumento', nombre:'Instrumento musical', desc:'Anota cuál en tu inventario (laúd, flauta, tambor...).'}]},
    efecto: c => aplicarElegidas(c, 'satiro-instrumento', 'Juerguista')},
  /* Temporales: se eligen al terminar cada descanso largo */
  {de:/^githyanki/, n:/^conocimiento astral/,
    eleccion: {id:'githyanki-astral', titulo:'Arma o herramienta de hoy (Conocimiento Astral)', opciones: opcionesCompetencia(['arma', 'herramienta']), ayuda: ayudaCompetencia(['arma', 'herramienta'], {temporal: true})},
    efecto: c => aplicarElegidas(c, 'githyanki-astral', 'Conocimiento Astral')},
  {de:/^(eladrin|elfo marino|shadar-kai)/, n:/^trance$/,
    eleccion: {id:'elfo-trance', titulo:'Armas o herramientas de hoy (Trance)', max: 2, opciones: opcionesCompetencia(['arma', 'herramienta']), ayuda: ayudaCompetencia(['arma', 'herramienta'], {max: 2, temporal: true})},
    efecto: c => aplicarElegidas(c, 'elfo-trance', 'Trance')},
  {de:/^elfo astral/, n:/^trance astral/,
    eleccion: {id:'elfo-astral-trance', titulo:'Arma o herramienta de hoy (Trance Astral)', opciones: opcionesCompetencia(['arma', 'herramienta']), ayuda: ayudaCompetencia(['arma', 'herramienta'], {temporal: true})},
    efecto: c => aplicarElegidas(c, 'elfo-astral-trance', 'Trance Astral')},

  /* Maestro de Batalla (2024): Estudiante de la Guerra. Las maniobras quedan para el lote del Guerrero */
  {de:/maestro de batalla/, n:/^estudiante de la guerra/, t:'pasiva',
    eleccion: [
      {id:'estudiante-guerra-herr', titulo:'Herramientas de artesano (Estudiante de la Guerra)', opciones: opcionesCompetencia(['artesano']), ayuda: ayudaCompetencia(['artesano'])},
      {id:'estudiante-guerra-hab', titulo:'Habilidad (Estudiante de la Guerra)', opciones: HABS_GUERRERO.map(h => ({key: norm(h), nombre: h})), ayuda: 'Eliges una habilidad y ganas competencia en ella.'},
    ],
    efecto: c => {
      aplicarElegidas(c, 'estudiante-guerra-herr', 'Estudiante de la Guerra');
      const k = elegido(c, 'estudiante-guerra-hab'); if (k && !c.skillProf[k]) { c.skill[k] += c.pb; c.skillProf[k] = true; }
    },
    texto: c => {
      const h = HABS_GUERRERO.find(x => norm(x) === elegido(c, 'estudiante-guerra-hab'));
      return `Competencia con un tipo de herramientas de artesano${h ? ` y en ${h} (ya sumada)` : ' y con una habilidad de la lista del guerrero'}, a tu elección (elígelas en la subclase).`;
    }},

  /* ---------- Conjuros que dan las especies y las dotes ----------
     Solo declaran los conjuros (salen en la hoja sin contar en el límite); el texto y el tipo siguen siendo los de cada rasgo.
     `desde`: nivel de personaje en que se gana. Sin clase lanzadora usan la más alta de INT, SAB o CAR. */
  {n:/^portador de luz$/, conjuros: [{nombre:'Luz', ab:'car'}]},
  {n:/^linaje elfico$/, conjuros: c => ({
    drow: [{nombre:'Luces danzantes'}, {nombre:'Fuego feérico', desde:3, usos:1}, {nombre:'Oscuridad', desde:5, usos:1}],
    alto: [{nombre:'Prestidigitación'}, {nombre:'Detectar magia', desde:3, usos:1}, {nombre:'Paso brumoso', desde:5, usos:1}],
    silvano: [{nombre:'Druidismo'}, {nombre:'Zancada prodigiosa', desde:3, usos:1}, {nombre:'Pasar sin rastro', desde:5, usos:1}],
  })[c.esub] || []},
  {n:/^linaje gnomo$/, conjuros: c => ({
    bosque: [{nombre:'Ilusión menor'}, {nombre:'Hablar con los Animales', usos:'pb'}],
    roca: [{nombre:'Remendar'}, {nombre:'Prestidigitación'}],
  })[c.esub] || []},
  {n:/^legado infernal$/, conjuros: c => ({
    abisal: [{nombre:'Rociada venenosa'}, {nombre:'Rayo nauseabundo', desde:3, usos:1}, {nombre:'Inmovilizar persona', desde:5, usos:1}],
    ctonico: [{nombre:'Toque helado'}, {nombre:'Falsa vida', desde:3, usos:1}, {nombre:'Rayo debilitador', desde:5, usos:1}],
    infernal: [{nombre:'Rayo de fuego'}, {nombre:'Reprensión infernal', desde:3, usos:1}, {nombre:'Oscuridad', desde:5, usos:1}],
  })[c.esub] || []},
  {n:/^presencia de otro mundo$/, conjuros: [{nombre:'Taumaturgia'}]},
  {de:/^fata$/, n:/^magia feerica$/, conjuros: [{nombre:'Druidismo'}, {nombre:'Fuego feérico', desde:3, usos:1}, {nombre:'Agrandar/Reducir', desde:5, usos:1}]},
  {n:/^magia firbolg$/, conjuros: [{nombre:'Detectar magia', usos:1}, {nombre:'Disfrazarse', usos:1}]},
  {n:/^llamada de la ola$/, conjuros: [{nombre:'Salpicadura ácida'}, {nombre:'Crear o destruir agua', nivel:1, desde:3, usos:1}, {nombre:'Caminar sobre el agua', desde:5, usos:1}]},
  {n:/^alcanzar la llama$/, conjuros: [{nombre:'Producir llama'}, {nombre:'Manos ardientes', desde:3, usos:1}, {nombre:'Hoja de fuego', desde:5, usos:1}]},
  {n:/^fundirse con la piedra$/, conjuros: c => [{nombre:'Custodia de la hoja', nivel:0, nota:`Puedes lanzarlo con acción adicional ${c.pb} veces por descanso largo`}, {nombre:'Pasar sin rastro', desde:5, usos:1}]},
  {n:/^fundirse con el viento$/, conjuros: [{nombre:'Agarre electrizante'}, {nombre:'Caída de pluma', desde:3, usos:1}, {nombre:'Levitar', desde:5, usos:1}]},
  {n:/^psionica githyanki$/, conjuros: [{nombre:'Mano de mago', nota:'La mano es invisible'}, {nombre:'Salto', desde:3, usos:1}, {nombre:'Paso brumoso', desde:5, usos:1}]},
  {n:/^psionica githzerai$/, conjuros: [{nombre:'Mano de mago', nota:'La mano es invisible'}, {nombre:'Escudo', desde:3, usos:1}, {nombre:'Detectar pensamientos', desde:5, usos:1}]},
  {n:/^controlar el aire y el agua$/, conjuros: [{nombre:'Niebla', usos:1}, {nombre:'Ráfaga de viento', desde:3, usos:1}, {nombre:'Caminar sobre el agua', desde:5, usos:1}]},
  {n:/^magia serpentina$/, conjuros: [{nombre:'Rociada venenosa'}, {nombre:'Hablar con los Animales', nota:'Sin límite, solo con serpientes'}, {nombre:'Sugestión', desde:3, usos:1}]},
  {n:/^magia de maleficio$/, conjuros: [{nombre:'Disfrazarse', usos:1}, {nombre:'Maleficio', usos:1}]},
  {n:/^fuego astral$/,
    eleccion: {id:'elfo-astral-truco', titulo:'Truco (Fuego Astral)', opciones: ['Luces danzantes', 'Luz', 'Llama sagrada'].map(n => ({key: norm(n), nombre: n}))},
    conjuros: c => { const k = elegido(c, 'elfo-astral-truco'); return k ? [{nombre: ['Luces danzantes', 'Luz', 'Llama sagrada'].find(n => norm(n) === k)}] : []; }},
  /* Dotes: Toque Feérico y Toque de las Sombras, y las Marcas de Dragón (el conjuro que eliges se agrega a mano) */
  {n:/^toque feerico$/, conjuros: [{nombre:'Paso brumoso', usos:1, nota:'El conjuro de nivel 1 que eliges agrégalo en Conjuros'}]},
  {n:/^toque de las sombras$/, conjuros: [{nombre:'Invisibilidad', usos:1, nota:'El conjuro de nivel 1 que eliges agrégalo en Conjuros'}]},
  {n:/^marca de deteccion$/, conjuros: [{nombre:'Detectar magia', usos:1}, {nombre:'Detectar veneno y enfermedad', nivel:1, usos:1}, {nombre:'Ver invisibilidad', desde:3, usos:1}]},
  {n:/^marca de hallazgo$/, conjuros: [{nombre:'Marca del cazador', usos:1}, {nombre:'Localizar objeto', desde:3, usos:1}]},
  {n:/^marca de manejo$/, conjuros: [{nombre:'Amistad con los animales', nivel:1, usos:1}, {nombre:'Hablar con los Animales', usos:1}]},
  {n:/^marca de curacion$/, conjuros: c => [{nombre:'Curar heridas', usos: c.dotes.some(d => /marca-curacion-mayor/.test(d.key || '')) ? 'pb' : 1}, {nombre:'Restablecimiento menor', desde:3, usos:1}]},
  {n:/^marca de hospitalidad$/, conjuros: [{nombre:'Purificar comida y bebida', usos:1}, {nombre:'Sirviente invisible', usos:1}, {nombre:'Calmar emociones', desde:3, usos:1}]},
  {n:/^marca de creacion$/, conjuros: [{nombre:'Remendar'}, {nombre:'Arma mágica', usos:1}]},
  {n:/^marca de pasaje$/, conjuros: [{nombre:'Paso brumoso', usos:1}]},
  {n:/^marca de escritura$/, conjuros: [{nombre:'Mensaje'}, {nombre:'Comprender idiomas', usos:1}, {nombre:'Boca mágica', desde:3, usos:1}]},
  {n:/^marca del centinela$/, conjuros: [{nombre:'Escudo', usos:1}]},
  {n:/^marca de las sombras$/, conjuros: [{nombre:'Ilusión menor'}, {nombre:'Invisibilidad', usos:1}]},
  {n:/^marca de la tormenta$/, conjuros: [{nombre:'Trueno', nivel:0}, {nombre:'Ráfaga de viento', desde:3, usos:1}]},
  {n:/^marca de proteccion$/, conjuros: [{nombre:'Alarma', usos:1}, {nombre:'Armadura de mago', usos:1}, {nombre:'Cerradura arcana', desde:3, usos:1}]},

  /* ---------- Dotes con elección (Manual del Jugador 2024) ----------
     Las dotes no tienen `de`: su origen es "Dote de nivel N", así que se reconocen solo por el nombre */
  {n:/^maestro de armas$/, t:'pasiva',
    eleccion: {id:'maestro-armas', titulo:'Maestría (Maestro de Armas)', opciones: Object.entries(ARMAS).filter(([, w]) => w.ma).map(([k, w]) => ({key:k, nombre:w.n, desc:`${MAESTRIAS[w.ma][0]}: ${MAESTRIAS[w.ma][1]}`}))},
    efecto: c => { const k = elegido(c, 'maestro-armas'); if (k) { c.maestriasExtra = new Set([...(c.maestriasExtra || []), k]); c.rehacerArmas = true; } },
    texto: c => { const k = elegido(c, 'maestro-armas');
      return `+1 a FUE o DES${c.subeDote?.['maestro de armas'] ? ` (${NOMBRE_AB[c.subeDote['maestro de armas']]}, ya sumado)` : ' (elígelo en la mejora de nivel)'}. Usas la propiedad de maestría de un tipo de arma sencilla o marcial con la que seas competente${k ? `: ${ARMAS[k].n} (${MAESTRIAS[ARMAS[k].ma][0]}, ya en Ataques)` : ' (elígela en el paso Características)'}. Puedes cambiarla al terminar un descanso largo.`; }},
  /* Resiliente: la característica es la misma que sube +1 (se elige en la mejora de nivel, c.subeDote) */
  {n:/^resiliente$/, t:'pasiva',
    efecto: c => { const k = c.subeDote?.resiliente; if (k && !c.saveProf.includes(k)) { c.saveProf = [...c.saveProf, k]; c.saves[k] += c.pb; c.compFuentes.push({que:`Salvaciones de ${NOMBRE_AB[k]}`, src:'Resiliente'}); } },
    texto: c => { const k = c.subeDote?.resiliente;
      return k ? `+1 a ${NOMBRE_AB[k]} y competencia en sus salvaciones (ya sumados).` : '+1 a una característica en cuya salvación no seas competente, y ganas esa competencia. Elígela en la mejora de nivel, en el paso Características.'; }},

  /* ---------- Mago (lote 13): lo que el motor calcula; el resto sale de generadas/mago.ts ---------- */
  {de:/^abjurador$/, n:/^capa arcana$/, t:'pasiva', usos: c => 2 * c.lvl + c.m.int, pool: true, reset:'largo',
    texto: c => `La primera vez que lances un conjuro de Abjuración con un espacio después de un descanso largo, creas a tu alrededor una capa con ${2 * c.lvl + c.m.int} PG (el doble de tu nivel + INT), que dura hasta tu siguiente descanso largo. El daño que recibes lo absorbe la capa primero (aplica antes tus resistencias); lo que sobre te llega a ti. Cada conjuro de Abjuración que lances con un espacio le devuelve 2 PG por nivel del espacio, y con una acción adicional puedes gastar un espacio para lo mismo. Aunque llegue a 0, no desaparece.`},
  {de:/^cantor de la hoja$/, n:/^canto de la hoja$/, t:'adicional', usos: c => Math.max(1, c.m.int), reset:'largo',
    texto: c => `Con una acción adicional, sin armadura ni escudo, entras en el Canto de la Hoja durante 1 minuto (termina antes si quedas Incapacitado, te pones armadura o escudo, o atacas con un arma a dos manos). Mientras dura: +${Math.max(1, c.m.int)} a la CA (tu INT, mínimo +1; no está sumado a la CA de la hoja), +10 pies de velocidad y Ventaja en Acrobacias; puedes atacar y hacer daño con INT en vez de FUE o DES con armas con las que seas competente; y sumas tu INT a las salvaciones de CON para mantener la Concentración. Recuperas un uso con Recuperación Arcana.`},
  {de:/^cantor de la hoja$/, n:/^formacion en guerra y canto$/, t:'pasiva',
    eleccion: {id:'cantor-hab', titulo:'Habilidad (Formación en Guerra y Canto)', opciones: ['Acrobacias', 'Atletismo', 'Interpretación', 'Persuasión'].map(h => ({key: norm(h), nombre: h})), ayuda: 'Eliges una habilidad y ganas competencia en ella.'},
    efecto: c => { const k = elegido(c, 'cantor-hab'); if (k && !c.skillProf[k]) { c.skill[k] += c.pb; c.skillProf[k] = true; } },
    texto: c => { const h = ['Acrobacias', 'Atletismo', 'Interpretación', 'Persuasión'].find(x => norm(x) === elegido(c, 'cantor-hab'));
      return `Competencia con las armas marciales cuerpo a cuerpo que no sean pesadas ni a dos manos, y puedes usar como foco de tus conjuros de mago un arma cuerpo a cuerpo con la que seas competente. Además, competencia en ${h ? `${h} (ya sumada)` : 'Acrobacias, Atletismo, Interpretación o Persuasión (elígela en la subclase)'}.`; }},
  {de:/^encantador$/, n:/^conversador encantador$/, t:'pasiva',
    eleccion: {id:'encantamiento-habilidades', titulo:'Habilidad (Conversador Encantador)', opciones: ['Engaño', 'Intimidación', 'Persuasión'].map(h => ({key: norm(h), nombre: h})), ayuda: 'Eliges una habilidad: ganas competencia en ella y a sus pruebas sumas también tu INT (mínimo +1).'},
    efecto: c => { const k = elegido(c, 'encantamiento-habilidades'); if (!k || !(k in c.skill)) return;
      if (!c.skillProf[k]) { c.skill[k] += c.pb; c.skillProf[k] = true; }
      c.skill[k] += Math.max(1, c.m.int); },
    texto: c => { const h = ['Engaño', 'Intimidación', 'Persuasión'].find(x => norm(x) === elegido(c, 'encantamiento-habilidades'));
      return h ? `Competencia en ${h}, y sumas tu INT (${sign(Math.max(1, c.m.int))}) a sus pruebas (ya sumado).` : 'Competencia en Engaño, Intimidación o Persuasión, a tu elección (elígela en la subclase), y sumas tu INT (mínimo +1) a las pruebas de esa habilidad.'; }},
  {de:/^evocador$/, n:/^evocacion potenciada$/, t:'pasiva',
    efecto: c => { (c.bonosConjuro = c.bonosConjuro || []).push({nombre:'Evocación Potenciada', valor: c.m.int, si: esEvocacion}); },
    texto: c => `Al lanzar un conjuro de mago de Evocación, sumas tu INT (${sign(c.m.int)}) a una de sus tiradas de daño (al lanzarlo desde la hoja se suma solo).`},
  {de:/^nigromante$/, n:/^siervos muertos vivientes$/, t:'pasiva', usos:1, reset:'largo',
    conjuros: [{nombre:'Animar a los muertos', nota:'Siempre preparado; una vez por descanso largo sin gastar espacio'}],
    texto: c => `Siempre tienes preparado Animar a los muertos y puedes lanzarlo una vez sin gastar espacio (se recupera con un descanso largo). Siempre que lo lanzas, puedes contarlo como de un nivel más. Con tu libro de conjuros en la mano, los muertos vivientes que creas o invocas con conjuros de Necromancia ganan ${c.m.int + Math.floor(c.lvl / 2)} PG máximos y actuales (INT + la mitad de tu nivel), y cuando uno a 60 pies acierta un ataque hace ${Math.max(1, c.m.int)} de daño necrótico extra.`},
  {de:/^nigromante$/, n:/^amo de la muerte$/, t:'adicional', usos:1, reset:'largo',
    texto: c => `Con tu libro de conjuros en la mano: con una acción adicional, los muertos vivientes que creaste o invocaste con Necromancia a 60 pies ganan ${c.lvl} PG temporales (tu nivel de mago); una vez por descanso largo. Además, cuando un muerto viviente que ves cae a 0 PG, puedes hacerlo estallar: tiras 1d6 por cada dos dados de golpe que le queden (mínimo 1d6), y cada criatura a 10 pies hace una salvación de DES (CD ${c.dcSpell}): si falla, recibe ese daño necrótico y no puede usar reacciones hasta su siguiente turno; si la pasa, la mitad. Si el muerto viviente no es tuyo, te cuesta tu reacción y un espacio de nivel 5 o más.`},
  {de:/^magia de guerra$/, n:/^manto desviador$/, t:'pasiva',
    texto: c => `Al usar Desvío Arcano, hasta tres criaturas que elijas y veas a 60 pies reciben ${Math.floor(c.lvl / 2)} de daño de fuerza (la mitad de tu nivel de mago).`},
  {de:/^magia de guerra$/, n:/^ingenio tactico$/, t:'pasiva', efecto: c => { c.init += c.m.int; c.initPartes.push([c.m.int, 'Ingenio Táctico']); },
    texto: c => `Sumas tu INT (${sign(c.m.int)}) a la iniciativa (ya sumado).`},
  {de:/^magia de cronurgia$/, n:/^conciencia temporal$/, t:'pasiva', efecto: c => { c.init += c.m.int; c.initPartes.push([c.m.int, 'Conciencia Temporal']); },
    texto: c => `Sumas tu INT (${sign(c.m.int)}) a la iniciativa (ya sumado).`},

  /* ---------- Subclases oficiales que faltaban (revisión de completitud): Bárbaro y Bardo de Xanathar, Tasha,
     Sword Coast y Bigby; Reanimador de Ravenloft: The Horrors Within (2026); Rompejuramentos de la Guía del DM 2014 ---------- */
  {de:/^senda del guardian ancestral$/, n:/^escudo espiritual$/, t:'reaccion',
    texto: c => `Con la Furia activa, cuando otra criatura que ves a 30 pies recibe daño, reduces ese daño en ${c.lvl >= 14 ? '4d6' : c.lvl >= 10 ? '3d6' : '2d6'}.${c.lvl >= 14 ? ' Si era un ataque, el atacante recibe tanto daño de fuerza como el que evitaste.' : ''}`},
  {de:/^senda del rabioso de batalla$/, n:/^armadura de rabioso$/, t:'adicional',
    ataques: c => [{nombre:'Pinchos de la armadura', atk: c.pb + c.m.fue, expr: `1d4${modStr(c.m.fue)}`, dmg: `1d4${fmtMod(c.m.fue)} perforante`,
      notas:['Con armadura con pinchos y la Furia activa: acción adicional, a 5 pies. Al agarrar a alguien con la acción Atacar, recibe 3 perforante']}],
    texto: () => 'Con armadura con pinchos y la Furia activa, con una acción adicional atacas con los pinchos (en Ataques). Cuando agarras a una criatura con la acción Atacar, recibe 3 de daño perforante.'},
  {de:/^senda de la bestia$/, n:/^forma de la bestia$/, t:'gratis',
    ataques: c => [
      {nombre:'Mordisco (Forma de la Bestia)', atk: c.pb + c.m.fue, expr: `1d8${modStr(c.m.fue)}`, dmg: `1d8${fmtMod(c.m.fue)} perforante`, notas:[`En Furia. Una vez por turno, con menos de la mitad de tus PG, al dañar recuperas ${c.pb} PG`]},
      {nombre:'Garras (Forma de la Bestia)', atk: c.pb + c.m.fue, expr: `1d6${modStr(c.m.fue)}`, dmg: `1d6${fmtMod(c.m.fue)} cortante`, notas:['En Furia. Con la acción Atacar, una vez por turno haces un ataque de garra más']},
      {nombre:'Cola (Forma de la Bestia)', atk: c.pb + c.m.fue, expr: `1d8${modStr(c.m.fue)}`, dmg: `1d8${fmtMod(c.m.fue)} perforante`, notas:['En Furia. Alcance 10 pies. Con tu reacción sumas 1d8 a tu CA contra un ataque de alguien a 10 pies']}],
    texto: () => 'Al entrar en Furia eliges Mordisco, Garras o Cola: un arma natural que dura hasta que acabe la Furia (sus ataques salen en Ataques).'},
  {de:/^senda de la bestia$/, n:/^furia contagiosa$/, t:'gratis', usos: c => c.pb, reset:'largo',
    texto: c => `Una vez por turno, al acertar con tus armas naturales en Furia, el objetivo hace una salvación de SAB (CD ${cdCon(c)}) o, a tu elección, usa su reacción para atacar a otra criatura que elijas, o recibe 2d12 de daño psíquico.`},
  {de:/^senda de la bestia$/, n:/^llamar a la caceria$/, t:'gratis', usos: c => c.pb, reset:'largo',
    texto: c => `Al entrar en Furia eliges hasta ${Math.max(1, c.m.con)} criatura(s) dispuestas a 30 pies: ganas 5 PG temporales por cada una, y hasta que acabe la Furia, una vez en cada uno de sus turnos, al acertar y dañar suman 1d6 al daño.`},
  {de:/^senda del heraldo de la tormenta$/, n:/^aura de tormenta$/, t:'adicional',
    texto: c => `Con la Furia activa, un aura de 10 pies se activa al entrar en Furia y después con una acción adicional en cada turno. Desierto: las demás criaturas del aura reciben ${Math.floor(c.lvl / 5) + 1} de fuego. Mar: una criatura del aura hace una salvación de DES (CD ${cdCon(c)}) o recibe ${c.lvl >= 20 ? '4d6' : c.lvl >= 15 ? '3d6' : c.lvl >= 10 ? '2d6' : '1d6'} de relámpago (la mitad si la pasa). Tundra: las criaturas que elijas del aura ganan ${Math.floor(c.lvl / 5) + 2} PG temporales.`},
  {de:/^senda de la magia salvaje$/, n:/^percepcion magica$/, t:'accion', usos: c => c.pb, reset:'largo',
    texto: () => 'Hasta el final de tu siguiente turno sabes dónde hay conjuros u objetos mágicos a 60 pies que no estén tras cobertura total, y de qué escuela es cada conjuro.'},
  {de:/^senda de la magia salvaje$/, n:/^oleada salvaje$/, t:'gratis',
    texto: c => `Al entrar en Furia tiras 1d8 en la tabla de Oleada Salvaje; las salvaciones son CD ${cdCon(c)}. El efecto dura hasta que acabe la Furia.`},
  {de:/^senda de la magia salvaje$/, n:/^magia reforzante$/, t:'accion', usos: c => c.pb, reset:'largo',
    texto: () => 'Tocas a una criatura (tú incluido) y eliges: durante 10 minutos suma 1d3 a sus ataques y pruebas de característica, o recupera un espacio de conjuro de nivel 1d3 o menor (cada criatura, una vez por descanso largo).'},

  {de:/^colegio de la creacion$/, n:/^chispa de potencial$/, t:'pasiva',
    texto: c => `Al dar un dado de Inspiración Bárdica (${dadoInsp(c)}) creas una chispa junto a esa criatura. Prueba: tira el dado dos veces y se queda con uno. Ataque: el objetivo y quienes elijas a 5 pies de él hacen una salvación de CON (CD ${c.dcSpell}) o reciben de trueno lo que salió en el dado. Salvación: gana PG temporales iguales al dado ${fmtMod(Math.max(1, c.m.car))}.`},
  {de:/^colegio de la creacion$/, n:/^obra de la creacion$/, t:'accion', usos:1, reset:'largo', coste: () => '1 por descanso largo, o un espacio de nivel 2+',
    texto: c => `Creas a 10 pies un objeto no mágico ${c.lvl >= 14 ? 'Enorme' : c.lvl >= 6 ? 'Grande' : 'Mediano'} o menor${c.lvl >= 14 ? '' : ` que valga como máximo ${20 * c.lvl} po`}; dura ${c.pb} horas.${c.lvl >= 14 ? ` Puedes crear hasta ${Math.max(2, c.m.car)} a la vez (solo uno del tamaño máximo; los demás, pequeños o diminutos).` : ' Solo puede haber uno a la vez.'}`},
  {de:/^colegio de la creacion$/, n:/^objeto danzante$/, t:'accion', usos:1, reset:'largo', coste: () => '1 por descanso largo, o un espacio de nivel 3+',
    texto: () => 'Animas un objeto no mágico grande o menor a 30 pies que nadie lleve; te obedece durante 1 hora o hasta caer a 0 PG. Su hoja está en Familiares y criaturas.'},
  {de:/^colegio de la elocuencia$/, n:/^palabras inquietantes$/, t:'adicional', coste:'1 Inspiración Bárdica',
    texto: c => `Una criatura que ves a 60 pies resta ${dadoInsp(c)} a la siguiente salvación que haga antes del inicio de tu próximo turno.`},
  {de:/^colegio de la elocuencia$/, n:/^habla universal$/, t:'accion', usos:1, reset:'largo', coste: () => '1 por descanso largo, o un espacio de conjuro',
    texto: c => `Hasta ${Math.max(1, c.m.car)} criatura(s) a 60 pies te entienden durante 1 hora, hables el idioma que hables.`},
  {de:/^colegio de la elocuencia$/, n:/^inspiracion contagiosa$/, t:'reaccion', usos: c => Math.max(1, c.m.car), reset:'largo',
    texto: () => 'Cuando una criatura a 60 pies suma tu dado de Inspiración Bárdica y acierta, das un dado de Inspiración Bárdica a otra criatura (no a ti) que te oiga a 60 pies, sin gastar tus usos.'},
  {de:/^colegio de las espadas$/, n:/^estilo de combate$/, t:'pasiva',
    texto: () => 'Eliges Duelo o Combate con Dos Armas en el paso Clase; su efecto ya se suma.',
    eleccion: {id:'estilo-espadas', titulo:'Estilo de combate (Colegio de las Espadas)',
      opciones: () => ['duelo', 'dosarmas'].map(k => ({key:k, nombre:ESTILOS[k][0], desc:ESTILOS[k][2]}))}},
  {de:/^colegio de las espadas$/, n:/^floritura con la espada$/, t:'gratis', coste: c => c.lvl >= 14 ? '1 Inspiración Bárdica, o tira 1d6' : '1 Inspiración Bárdica',
    texto: c => `Al usar la acción Atacar, tu velocidad sube 10 pies hasta el final del turno. Una vez por turno, al acertar con un arma, tiras ${dadoInsp(c)}${c.lvl >= 14 ? ' (o 1d6 sin gastarla, por Floritura Maestra)' : ''}: el arma hace ese daño extra y eliges un efecto.`,
    opciones: [
      {nombre:'Floritura Defensiva', t:'gratis', texto: () => 'Además sumas el resultado a tu CA hasta el inicio de tu siguiente turno.'},
      {nombre:'Floritura Cortante', t:'gratis', texto: () => 'El daño extra también lo recibe otra criatura que elijas a 5 pies de ti.'},
      {nombre:'Floritura Móvil', t:'gratis', texto: () => 'Empujas al objetivo 5 pies más tantos como el resultado, y con tu reacción te mueves hasta tu velocidad a un espacio a 5 pies de él.'},
    ]},
  {de:/^colegio de los susurros$/, n:/^hojas psiquicas$/, t:'gratis', coste:'1 Inspiración Bárdica',
    texto: c => `Una vez por ronda en tu turno, al acertar un ataque con arma, haces ${c.lvl >= 15 ? '8d6' : c.lvl >= 10 ? '5d6' : c.lvl >= 5 ? '3d6' : '2d6'} de daño psíquico extra.`},
  {de:/^colegio de los susurros$/, n:/^palabras de terror$/, t:'accion', usos:1, reset:'corto',
    texto: c => `Tras hablar a solas al menos 1 minuto con un humanoide, hace una salvación de SAB (CD ${c.dcSpell}) o queda Asustado de ti o de quien elijas durante 1 hora, o hasta que lo ataquen o dañen a él o a sus aliados delante suyo. Si la pasa, no nota nada.`},
  {de:/^colegio de los susurros$/, n:/^saber de las sombras$/, t:'accion', usos:1, reset:'largo',
    texto: c => `Susurras a una criatura a 30 pies que comparta tu idioma y te oiga: salvación de SAB (CD ${c.dcSpell}) o queda Hechizada por ti 8 horas, convencida de que conoces su peor secreto. Te obedece y te hace favores, pero no arriesga la vida; se acaba si tú o tus aliados la atacáis o dañáis.`},

  {de:/^reanimador$/, n:/^conjuros de reanimador$/, t:'pasiva',
    texto: c => `Siempre preparados, sin contar en tu límite: ${CONJUROS_REANIMADOR.filter(([n]) => c.lvl >= n).flatMap(([, x]) => x).join(', ')}.`},
  {de:/^reanimador$/, n:/^oficio de reanimador$/, t:'pasiva',
    texto: () => 'Competencia con suministros de alquimista (si ya la tenías, otras herramientas de artesano).',
    opciones: [
      {nombre:'Descarga vital', t:'accion', usos: modInt, reset:'largo',
        texto: c => `Al lanzar Piedad con los moribundos, el objetivo recupera ${c.lvl} PG y las criaturas que elijas a 10 pies de él hacen una salvación de DES (CD ${c.dcSpell}) o reciben ${c.lvl >= 17 ? '4d4' : c.lvl >= 11 ? '3d4' : '2d4'} de relámpago (la mitad si la pasan).`},
    ]},
  {de:/^reanimador$/, n:/^companero reanimado$/, t:'accion', usos:1, reset:'largo', coste: () => '1 por descanso largo, o un espacio de conjuro',
    texto: () => 'Con una acción mágica y tus herramientas creas un compañero muerto viviente a 5 pies, que dura hasta tu siguiente descanso largo. Su hoja está en Familiares y criaturas.'},
  {de:/^reanimador$/, n:/^modificaciones extranas$/, t:'pasiva',
    texto: c => `Al crear a tu compañero eliges ${c.lvl >= 15 ? 'tres modificaciones' : c.lvl >= 9 ? 'dos modificaciones' : 'una modificación'}: Conducto Arcano (lanzas conjuros desde su espacio y, una vez por turno, sumas ${sign(c.m.int)} al daño de un conjuro de evocación o nigromancia) o Ferocidad (su Zarpazo hace 1d6)${c.lvl >= 9 ? `, o Hinchado, Enjuto o Viscoso (Modificaciones Macabras)` : ''}.`},
  {de:/^reanimador$/, n:/^reanimacion perfeccionada$/, t:'pasiva',
    texto: () => 'Tu compañero gana tres modificaciones. Los otros dos beneficios salen aparte.',
    opciones: [
      {nombre:'Resurrección facilitada', t:'accion', usos:1, reset:'largo', texto: () => 'Lanzas Alzar a los muertos sin espacio ni componentes materiales, con tus herramientas como foco.'},
      {nombre:'Transferir vida', t:'reaccion', texto: () => 'Cuando tú o tu compañero recibís daño, ganas tantos PG como los que le queden; él cae a 0 PG y estalla.'},
    ]},

  {de:/^rompejuramentos$/, n:/^controlar muertos vivientes$/, t:'accion', coste:'1 Canalizar',
    texto: c => `Un muerto viviente que veas a 30 pies hace una salvación de SAB (CD ${c.dcSpell}) o te obedece durante 24 horas, o hasta que vuelvas a usar esta opción. No afecta a los de valor de desafío ${c.lvl} o más.`},
  {de:/^rompejuramentos$/, n:/^aspecto temible$/, t:'accion', coste:'1 Canalizar',
    texto: c => `Las criaturas que elijas a 30 pies que te vean hacen una salvación de SAB (CD ${c.dcSpell}) o quedan Asustadas de ti 1 minuto; si alguna termina su turno a más de 30 pies de ti, repite la salvación.`},
  {de:/^rompejuramentos$/, n:/^aura de odio$/, t:'pasiva',
    texto: c => `Tú y los infernales y muertos vivientes a ${c.lvl >= 18 ? 30 : 10} pies de ti sumáis ${sign(Math.max(1, c.m.car))} al daño con armas cuerpo a cuerpo. Nadie recibe este beneficio de más de un paladín a la vez.`},
  {de:/^rompejuramentos$/, n:/^senor del pavor$/, t:'accion', usos:1, reset:'largo',
    ataques: c => [{nombre:'Sombras (Señor del Pavor)', atk: c.atkSpell, expr: `3d10${modStr(c.m.car)}`, dmg: `3d10${fmtMod(c.m.car)} necrótico`,
      notas:['Con el aura activa: acción adicional, ataque de conjuro cuerpo a cuerpo contra una criatura del aura']}],
    texto: () => 'Durante 1 minuto te rodea un aura de penumbra de 30 pies: la luz brillante pasa a tenue, los enemigos Asustados de ti que empiezan su turno en ella reciben 4d10 psíquico, y quienes dependen de la vista atacan con desventaja a ti y a quienes elijas dentro. Con una acción adicional las sombras atacan (en Ataques).'},

  /* ---------- Playtest: Unearthed Arcana 2025 Subclasses Update (scripts/datos/playtest-2025.ts) ---------- */
  {de:/^senda del guardian espiritual$/, n:/^escudo espiritual$/, t:'reaccion',
    texto: c => `Con tu Furia activa, cuando otra criatura que ves a 30 pies recibe daño, con tu reacción lo reduces en ${danoFuria(c)}d6 (tantos d6 como tu bonificador de daño de Furia).`},
  {de:/^senda del heraldo de la tormenta \(playtest\)$/, n:/^aura de tormenta$/, t:'adicional',
    texto: c => `Al entrar en Furia eliges Desierto, Mar o Tundra y te rodea un aura de 10 pies mientras dure; su efecto se activa al entrar en Furia y otra vez en cada turno con una acción adicional (CD ${cdCon(c)}). Desierto: las criaturas del aura hacen una salvación de DES o reciben ${danoFuria(c)}d4 de fuego (puedes librar a una). Mar: una criatura del aura hace una salvación de DES o recibe ${danoFuria(c)}d6 de rayo (la mitad si la pasa). Tundra: una criatura del aura hace una salvación de FUE o resta ${danoFuria(c)}d4 a su siguiente tirada de daño.`},
  {de:/^caballero \(playtest\)$/, n:/^maniobra de proteccion$/, t:'reaccion', usos: c => Math.max(1, c.m.con), reset:'largo',
    texto: () => 'Si tú o una criatura que ves a 5 pies recibís un acierto, con tu reacción (empuñando un arma cuerpo a cuerpo o un escudo) sumas 1d8 a la CA del objetivo contra ese ataque; si aun así acierta, el objetivo resiste el daño.'},
  {de:/^caballero \(playtest\)$/, n:/^carga feroz$/, t:'pasiva',
    texto: c => `En la primera ronda de cada combate, tú y tu montura tenéis 10 pies más de velocidad y vuestro movimiento no provoca ataques de oportunidad. Cuando llegas a 5 pies de una criatura esa ronda, hace una salvación de FUE (CD ${cdFue(c)}) o la empujas 5 pies o la derribas (una salvación por turno).`},
  {de:/^guerrero de la embriaguez$/, n:/^vaiven ebrio$/, t:'reaccion', coste:'1 Focus',
    texto: () => 'Levantarte del suelo te cuesta solo 5 pies de movimiento. Además, cuando una criatura falla un ataque cuerpo a cuerpo contra ti, con tu reacción y 1 Punto de Enfoque haces que acierte a otra criatura que elijas a 5 pies de ti.'},
  {de:/^guerrero de la embriaguez$/, n:/^brebaje mistico$/, t:'fuera',
    texto: c => `Al terminar un descanso corto o largo con útiles de cervecero, creas una bebida mágica que solo te sirve a ti; desaparece en el siguiente descanso si no la bebes. Beber una pinta lleva 1 minuto y su efecto dura 1 hora (8 horas si al crearla gastas 1 Punto de Enfoque). Dragón de Canela: como acción mágica exhalas un cono de 30 pies; salvación de DES (CD ${c.dcFocus}) o 4d${c.md} de fuego y Envenenado hasta el final de su siguiente turno (la mitad y sin veneno si la pasa). Espíritu Celestial: resistencia al daño psíquico y radiante. Chapuzón Refrescante: cada vez que recuperas PG, sumas 1d${c.md}.${c.lvl >= 11 ? ' Con Maestro Cervecero también puedes crear Relámpago Azul o Suerte del Borracho.' : ''}`},
  {de:/^rompejuramentos \(playtest\)$/, n:/^conjurar muertos vivientes$/, t:'adicional', coste:'1 Canalizar',
    texto: c => `Con una acción adicional y un uso de Canalizar Divinidad invocas ${Math.max(1, Math.ceil(c.m.car / 2))} esqueleto(s) o zombi(s), a tu elección, a 30 pies. Te obedecen 1 minuto y luego se deshacen en ceniza; actúan justo después de ti y, si no les das órdenes, Esquivan.`},
  {de:/^rompejuramentos \(playtest\)$/, n:/^aspecto temible$/, t:'gratis', coste:'1 Canalizar',
    texto: c => `Justo después de lanzar Castigo divino, puedes gastar un uso de Canalizar Divinidad: las criaturas que elijas a 30 pies hacen una salvación de SAB (CD ${c.dcSpell}) o quedan Asustadas 1 minuto (repiten la salvación al final de cada turno suyo).`},
  {de:/^rompejuramentos \(playtest\)$/, n:/^conjuros del rompejuramentos$/, t:'pasiva',
    texto: c => `Siempre preparados, sin contar en tu límite: ${CONJUROS_ROMPE.filter(([n]) => c.lvl >= n).flatMap(([, x]) => x).join(', ')}.`},
  {de:/^rompejuramentos \(playtest\)$/, n:/^aura de odio$/, t:'pasiva',
    texto: c => `Cuando tú, o un infernal o muerto viviente aliado dentro de tu Aura de Protección, acertáis a una criatura con un ataque cuerpo a cuerpo, hace ${Math.max(0, c.m.car)} de daño necrótico extra (tu CAR).`},
  {de:/^rompejuramentos \(playtest\)$/, n:/^senor del terror$/, t:'adicional', usos:1, reset:'largo',
    ataques: c => [{nombre:'Golpe Sombrío (Señor del Terror)', atk: c.atkSpell, expr: `3d10${modStr(c.m.car)}`, dmg: `3d10${fmtMod(c.m.car)} necrótico`,
      notas:['Con Señor del Terror activo: acción adicional, contra una criatura dentro de tu Aura de Protección']}],
    texto: () => 'Con una acción adicional llenas tu Aura de Protección de penumbra durante 10 minutos: oscuridad mágica en la que tú y tus aliados veis; las criaturas Asustadas que empiezan su turno en ella reciben 4d10 de daño psíquico; y con una acción adicional haces el Golpe Sombrío (sale en Ataques). Una vez por descanso largo, o gastando un espacio de nivel 5.'},

  /* ---------- Pícaro (lote 16): dados y hojas del Cuchillo Mental, Lealtad Temible y números de Batidor y Espadachín ---------- */
  {de:/^cuchillo mental$/, n:/^poder psionico$/, t:'pasiva', usos: c => c.lvl >= 17 ? 12 : c.lvl >= 13 ? 10 : c.lvl >= 9 ? 8 : c.lvl >= 5 ? 6 : 4, reset:'corto1', coste:'1 vuelve con descanso corto, todos con uno largo',
    texto: c => `Tus dados de energía psiónica son ${dadoPsi(c)}; recuperas uno al terminar un descanso corto y todos con uno largo. Si fallas una prueba con una habilidad o herramienta en la que eres competente, sumas 1${dadoPsi(c)} y solo lo gastas si así la superas. Con una acción mágica enlazas por telepatía a hasta ${c.pb} criaturas durante 1${dadoPsi(c)} horas (a 1 milla); la primera vez tras cada descanso largo no gastas el dado.`},
  {de:/^cuchillo mental$/, n:/^hojas psiquicas$/, t:'pasiva',
    ataques: c => { const m = Math.max(c.m.fue, c.m.des), atk = m + c.pb;
      return [{nombre:'Hoja psíquica', atk, expr:`1d6${modStr(m)}`, dmg:`1d6${fmtMod(m)} psíquico`, notas:['Con Atacar o un ataque de oportunidad, en tu mano libre', 'Sutil, Arrojadiza (60/120), maestría Molestar']},
        {nombre:'Segunda hoja psíquica', atk, expr:`1d4${modStr(m)}`, dmg:`1d4${fmtMod(m)} psíquico`, notas:['Acción adicional, después de atacar con una hoja y con la otra mano libre']}]; },
    texto: () => 'Cuando usas Atacar o haces un ataque de oportunidad, puedes atacar con una hoja psíquica en tu mano libre (sale en Ataques). Después, con una acción adicional, puedes atacar con una segunda hoja de 1d4 si tienes la otra mano libre. Las hojas desaparecen al acertar o fallar.'},
  {de:/^vastago de los tres$/, n:/^lealtad temible$/, t:'pasiva',
    eleccion: {id:'lealtad-tres', titulo:'Lealtad Temible', opciones: [
      {key:'bane', nombre:'Bane', desc:'Resistencia al daño psíquico y el truco Ilusión menor.'},
      {key:'bhaal', nombre:'Bhaal', desc:'Resistencia al daño de veneno y el truco Guardia de cuchillas.'},
      {key:'myrkul', nombre:'Myrkul', desc:'Resistencia al daño necrótico y el truco Toque helado.'}]},
    conjuros: c => { const t = {bane:'Ilusión menor', bhaal:'Guardia de cuchillas', myrkul:'Toque helado'}[elegido(c, 'lealtad-tres')]; return t ? [{nombre: t, ab:'int', nota:'Lealtad Temible'}] : []; },
    texto: c => { const d = {bane:['Bane', 'psíquico', 'Ilusión menor'], bhaal:['Bhaal', 'de veneno', 'Guardia de cuchillas'], myrkul:['Myrkul', 'necrótico', 'Toque helado']}[elegido(c, 'lealtad-tres')];
      return d ? `Sirves a ${d[0]}: tienes resistencia al daño ${d[1]} y lanzas el truco ${d[2]} con INT. Puedes cambiar de dios al terminar un descanso largo.` : 'Elige a uno de los Tres Muertos en el paso Clase: Bane (psíquico e Ilusión menor), Bhaal (veneno y Guardia de cuchillas) o Myrkul (necrótico y Toque helado).'; }},
  {de:/^batidor$/, n:/^superviviente$/, t:'pasiva',
    efecto: c => ['naturaleza', 'supervivencia'].forEach(k => { if (!c.skillProf[k]) { c.skill[k] += c.pb; c.skillProf[k] = true; } if (!c.skillPer[k]) { c.skill[k] += c.pb; c.skillPer[k] = true; } })},
  {de:/^batidor$/, n:/^movilidad superior$/, t:'pasiva', efecto: c => { c.speed += 10; }},
  {de:/^ladron$/, n:/^usar objeto magico$/, t:'pasiva', efecto: c => { c.maxSintonia = 4; }},
  {de:/^espadachin$/, n:/^audacia temeraria$/, t:'pasiva', efecto: c => { c.init += c.m.car; c.initPartes.push([c.m.car, 'Audacia Temeraria']); }},

  /* ---------- Paladín (lote 15): rasgos que gastan Canalizar Divinidad, Golpes Radiantes y Esplendor del Genio ---------- */
  {de:/^paladin$/, n:/^abjurar enemigos$/, t:'accion', coste:'1 Canalizar'},
  // El d8 radiante se suma a las filas de las armas cuerpo a cuerpo (weaponRow)
  {de:/^paladin$/, n:/^golpes radiantes$/, t:'pasiva', efecto: c => { c.golpesRadiantes = true; c.rehacerArmas = true; }},
  {de:/^juramento de los genios nobles$/, n:/^castigo elemental$/, t:'gratis', coste:'1 Canalizar'},
  {de:/^juramento de los genios nobles$/, n:/^esplendor del genio$/, t:'pasiva',
    eleccion: {id:'esplendor-genio', titulo:'Esplendor del Genio', opciones: [['acrobacias', 'Acrobacias'], ['intimidacion', 'Intimidación'], ['interpretacion', 'Interpretación'], ['persuasion', 'Persuasión']]
      .map(([key, nombre]) => ({key, nombre, desc:`Competencia en ${nombre}.`}))},
    efecto: c => {
      if (!c.armor) c.ac = Math.max(c.ac, 10 + c.m.des + c.m.car + (c.shield ? 2 : 0));
      const k = elegido(c, 'esplendor-genio'); if (k && !c.skillProf[k]) { c.skill[k] += c.pb; c.skillProf[k] = true; }
    }},
  ...[['conquista', ['presencia conquistadora', 'golpe guiado']], ['redencion', ['emisario de paz', 'reprender a los violentos']],
    ['la corona', ['desafio del campeon', 'cambiar las tornas']], ['los vigilantes', ['voluntad del vigilante', 'abjurar lo extraplanar']]]
    .flatMap(([j, rs]) => rs.map(n => ({de: new RegExp(`^juramento de ${j}$`), n: new RegExp(`^${n}$`), coste:'1 Canalizar'}))),

  /* ---------- Lanzadores de un tercio: Caballero Arcano, Embaucador Arcano (Manual del Jugador 2024) y Guerrero de las Artes Místicas (Arcana Unleashed 2026) ---------- */
  {de:/^caballero arcano$/, n:/^lanzamiento de conjuros$/, t:'pasiva', ...lanzadorTercio('int', 'mago', c => c.lvl >= 10 ? 3 : 2)},
  {de:/^embaucador arcano$/, n:/^lanzamiento de conjuros$/, t:'pasiva', ...lanzadorTercio('int', 'mago', c => c.lvl >= 10 ? 4 : 3)},
  {de:/^guerrero de las artes misticas$/, n:/^conjuros de las artes misticas$/, t:'pasiva', ...lanzadorTercio('sab', 'hechicero', c => c.lvl >= 10 ? 3 : 2)},

  /* ---------- Monje (lote 14): Guerrero de los Elementos ---------- */
  {de:/^guerrero de los elementos$/, n:/^sintonia elemental$/, t:'gratis', coste:'1 Focus',
    ataques: c => [{nombre:'Golpe elemental (Sintonía Elemental)', atk: c.unarmed.atk, expr: c.unarmed.expr,
      dmg: c.unarmed.dmg.replace(/contundente$/, 'de ácido, frío, fuego, rayo o trueno'),
      notas:[`Con la Sintonía activa: alcance de 15 pies; eliges el tipo al acertar y el objetivo hace una salvación de FUE (CD ${c.dcFocus}) o lo mueves hasta 10 pies`,
        ...(c.lvl >= 17 ? [`Una vez por turno: +1d${c.md} del mismo tipo (Epítome Elemental)`] : [])]}],
    texto: c => `Al inicio de tu turno puedes gastar 1 Punto de Enfoque para cargarte de energía elemental durante 10 minutos (acaba antes si quedas Incapacitado). Mientras dura, tus golpes sin armas alcanzan 10 pies más y, al acertar, pueden hacer daño de ácido, frío, fuego, rayo o trueno; si lo haces, el objetivo hace una salvación de FUE (CD ${c.dcFocus}) o lo mueves hasta 10 pies hacia ti o lejos de ti. El golpe elemental sale en Ataques. Además conoces el truco Elementalismo y lo lanzas con SAB.`},

  /* ---------- Investigator (Mage Hand Press, 2024; lote 30) ---------- */
  {de:/^investigador$/, n:/^ritualista$/, t:'pasiva',
    texto: c => `Tus conjuros viven en un grimorio (100 páginas, 3 libras) y solo los lanzas como ritual, leyendo de él, si tienen la etiqueta de Ritual. Empiezas con cuatro conjuros de nivel 1 de Investigator y, al subir de nivel, sumas dos más de nivel ${invTabla(INV_RITUAL, c)} o menos. Copiar un conjuro nuevo cuesta 2 horas y 50 po por nivel; copiar uno tuyo a otro libro, 1 hora y 10 po por nivel. Tu aptitud mágica es Inteligencia (CD ${invCD(c)}, ${sign(c.pb + c.m.int)} al ataque).`},
  {de:/^investigador$/, n:/^pericia$/, t:'pasiva',
    texto: c => `Pericia (doble de tu bonificador de competencia) en ${c.lvl >= 9 ? 4 : 2} habilidades en las que ya seas competente; las eliges en el paso Habilidades.`},
  {de:/^investigador$/, n:/^golpe de gracia$/, t:'gratis',
    texto: c => `Una vez por turno, al dañar con un arma a una criatura Maltrecha, le haces ${invGolpe(c)}d8 de daño extra del mismo tipo que el del arma.`},
  {de:/^investigador$/, n:/^golpe de gracia mejorado$/, t:'gratis',
    texto: c => `Cuando haces la acción de Atacar en tu turno, puedes usar Golpe de Gracia sobre una criatura que no esté Maltrecha, pero solo con ${invGolpeMejorado(c)}d8 de daño extra. Sobre una Maltrecha haces ${invGolpe(c)}d8.`},
  {de:/^investigador$/, n:/^conjuro apresurado$/, t:'adicional', usos: c => invTabla(INV_APRESURADO, c), reset:'corto1', coste:'1 vuelve con descanso corto, todos con uno largo',
    texto: c => `Lanzas como acción adicional un conjuro de tu grimorio cuyo tiempo de lanzamiento sea una acción o una acción adicional, sin componentes materiales salvo los que cuesten 100 po o más. Tienes ${invTabla(INV_APRESURADO, c)} usos: recuperas uno con un descanso corto y todos con uno largo. Varios rasgos de subclase se recuperan gastando uno de estos usos.`},
  {de:/^investigador$/, n:/^amuletos$/, t:'pasiva', usos: c => invTabla(INV_AMULETOS, c) + (esOrden(c, /anticuario/) ? 1 : 0), reset:'corto1', coste:'1 vuelve con descanso corto, todos con uno largo',
    texto: c => `Tu subclase te da amuletos sobrenaturales y cada uno que activas gasta 1 uso de este rasgo. Tienes ${invTabla(INV_AMULETOS, c) + (esOrden(c, /anticuario/) ? 1 : 0)} usos: recuperas uno con un descanso corto y todos con uno largo. Las opciones están en el rasgo Amuletos de tu subclase.`},
  {de:/^investigador$/, n:/^amuletos sagrados$/, t:'pasiva',
    texto: c => `Llevas símbolos sagrados y objetos bendecidos aunque no seas devoto. Gastando 1 uso de Amuletos${esOrden(c, /inquisitor/) && c.lvl >= 10 ? ' (o uno de los 3 usos gratis de Piedad Rutinaria)' : ''} activas uno, todos como acción adicional.`,
    opciones: [
      opAmuleto('Amuleto de Protección', 'adicional', c => `Una criatura a 60 pies gana +${invMod(c)} a la CA y a las salvaciones hasta el inicio de tu próximo turno.`),
      opAmuleto('Anj Restaurador', 'adicional', c => `Una criatura a 60 pies recupera ${c.lvl + c.m.int} PG (tu nivel + INT).`),
      opAmuleto('Runa de Destierro', 'adicional', c => `Una criatura que veas a 60 pies hace una salvación de CAR (CD ${invCD(c)}); si falla, queda desterrada al Plano Etéreo, Incapacitada y con velocidad 0, hasta el inicio de tu próximo turno.`),
    ]},
  enigma(7), enigma(8), enigma(9),

  /* Anticuario */
  {de:/^anticuario$/, n:/^acumulador de artefactos$/, t:'pasiva', texto: () => 'Tienes 1 uso más de Amuletos (ya sumado a tu total).'},
  {de:/^anticuario$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: c => `Amuletos del Anticuario (1 uso cada uno): Punta de Flecha Odiosa (Rayo debilitador o Rayo abrasador), Prisma Deformado (Contorno borroso o Escudo) y Vendas de Dientes de Navaja (Curar heridas o Infligir heridas, sumando tu nivel, ${c.lvl}, a la curación o al daño). Salen en Conjuros, sin espacio ni componentes.`,
    conjuros: () => [amuleto('Rayo debilitador', 'Punta de Flecha Odiosa'), amuleto('Rayo abrasador', 'Punta de Flecha Odiosa'),
      amuleto('Contorno borroso', 'Prisma Deformado'), amuleto('Escudo', 'Prisma Deformado'),
      amuleto('Curar heridas', 'Vendas de Dientes de Navaja: sumas tu nivel de Investigador a la curación'), amuleto('Infligir heridas', 'Vendas de Dientes de Navaja: sumas tu nivel de Investigador al daño')]},
  {de:/^anticuario$/, n:/^reliquias arcanas$/, t:'pasiva', usos:1, reset:'corto',
    texto: () => 'Una reliquia a la vez, hasta el próximo descanso corto o largo: Dinamo Antediluviana (Bola de fuego o Relámpago), Máscara Mortuoria de Liche (Contrahechizo o Disipar magia) o Espiral Mortal (Animar a los muertos o Revivir; al lanzar Animar con ella, los muertos vivientes anteriores de la reliquia se deshacen). Sin espacio ni componentes.',
    conjuros: () => ['Bola de fuego', 'Relámpago', 'Contrahechizo', 'Disipar magia', 'Animar a los muertos', 'Revivir'].map(reliquia)},
  {de:/^anticuario$/, n:/^coleccion de objetos magicos$/, t:'pasiva',
    texto: () => 'Al terminar un descanso largo produces un objeto mágico de la lista (los anteriores se desvanecen) y, si requiere sintonización, te sintonizas al producirlo. Elige cuál con el botón Producir objeto.',
    eleccion: {id:'coleccion-objetos', titulo:'Objeto mágico que produces', opciones: [
      {key:'alfombra', nombre:'Alfombra voladora', desc:'Una alfombra que vuela con su carga; su velocidad depende del tamaño.'},
      {key:'capa', nombre:'Capa del murciélago', desc:'Ventaja en Sigilo y vuelo en luz tenue u oscuridad.'},
      {key:'lengua', nombre:'Lengua de fuego', desc:'Un arma que arde y suma daño de fuego al impactar.'},
      {key:'guantes', nombre:'Guanteletes de fuerza de ogro', desc:'Tu Fuerza sube a 19 mientras los llevas.'},
      {key:'fortaleza', nombre:'Fortaleza instantánea', desc:'Un cubo que se despliega como una torre fortificada.'},
      {key:'regeneracion', nombre:'Anillo de regeneración', desc:'Recuperas Puntos de Golpe con el tiempo y regeneras miembros.'},
      {key:'telequinesia', nombre:'Anillo de telequinesia', desc:'Lanzas Telequinesia a voluntad.'},
      {key:'hoja', nombre:'Hoja solar', desc:'Una espada de luz radiante.'},
      {key:'maravillas', nombre:'Varita de las maravillas', desc:'Una varita de efectos mágicos aleatorios.'}]}},
  {de:/^anticuario$/, n:/^tarro de almas$/, t:'pasiva', usos:5, reset:'largo', pool:true,
    texto: c => `Un tarro de almas siempre sintonizado contigo, con 5 cargas; cada amanecer recupera 1d4 + 1. Gastas cargas así: 1 para ganar ${c.lvl} PG temporales (acción adicional); 1 para recuperar un uso de Amuletos (acción adicional); 2 para quedar con 1 PG al caer a 0 sin morir en el acto (una vez por turno, sin acción); 3 para un ataque de conjuro cuerpo a cuerpo con la acción mágica que hace 8d8 necrótico y te cura lo mismo (si falla, no se gastan).`,
    opciones: [
      {nombre:'Tarro de Almas: PG temporales', t:'adicional', recurso:'rg-tarro-de-almas', coste:'1 carga', texto: c => `Ganas ${c.lvl} PG temporales.`},
      {nombre:'Tarro de Almas: Recarga de Amuleto', t:'adicional', recurso:'rg-tarro-de-almas', coste:'1 carga', texto: () => 'Recuperas un uso gastado de Amuletos.'},
      {nombre:'Tarro de Almas: Fortaleza de Muerto Viviente', t:'gratis', recurso:'rg-tarro-de-almas', coste:'2 cargas', texto: () => 'Al caer a 0 PG sin morir en el acto, te quedas con 1 PG. Una vez por turno.'},
      {nombre:'Tarro de Almas: Toque Drenante', t:'accion', recurso:'rg-tarro-de-almas', coste:'3 cargas', texto: c => `Ataque de conjuro cuerpo a cuerpo (${sign(c.pb + c.m.int)}): si aciertas, 8d8 necrótico y recuperas esos PG. Si falla, no se gastan las cargas.`}]},

  /* Archivista */
  {de:/^archivista$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: () => 'Amuletos del Archivista (1 uso cada uno): Lentes de Aura (Detectar magia), Escritura Mnemotécnica (Memorizar) y Piedra de Lenguas (Entender idiomas). Salen en Conjuros, sin espacio ni componentes.',
    conjuros: () => [amuleto('Detectar magia', 'Lentes de Aura'), amuleto('Memorizar', 'Escritura Mnemotécnica'), amuleto('Entender idiomas', 'Piedra de Lenguas')]},
  {de:/^archivista$/, n:/^tesis$/, t:'pasiva',
    eleccion: {id:'tesis-archivista', titulo:'Tesis', opciones: Object.entries(TESIS).map(([key, [n, lista]]) => ({key, nombre: n,
      desc: `Conjuros gratis en tu grimorio, como rituales: ${lista.map(([nv, ss]) => `(nivel ${nv}) ${ss.join(', ')}`).join('; ')}.`}))},
    conjuros: c => { const t = TESIS[elegido(c, 'tesis-archivista')]; return t ? t[1].flatMap(([nv, ss]) => ss.map(nombre => ({nombre, ab:'int', desde: nv, nota:`Tesis ${t[0]}: en tu grimorio, solo como ritual`}))) : []; },
    texto: c => { const t = TESIS[elegido(c, 'tesis-archivista')];
      return t ? `Tesis ${t[0]}: sumas gratis a tu grimorio, como rituales, ${t[1].filter(([nv]) => nv <= c.lvl).flatMap(([, ss]) => ss).join(', ')}. Puedes cambiar de tesis al subir de nivel.`
        : 'Elige tu tesis en el paso Clase: Corpus, Mentis, Mortis u Oculus. Sus conjuros se suman gratis a tu grimorio como rituales y puedes cambiarla al subir de nivel.'; }},
  {de:/^archivista$/, n:/^conjuro erudito$/, t:'gratis', usos:1, reset:'corto',
    texto: () => 'Al lanzar un conjuro que obligue a salvar, das desventaja a un objetivo en esa salvación. Se recupera con descanso corto o largo, o gastando un uso de Conjuro Apresurado (sin acción).'},
  {de:/^archivista$/, n:/^memoria eidetica$/, t:'pasiva', usos: () => 0,
    texto: () => 'Recuerdo de Ritual: si ves u oyes lanzar un conjuro de Investigator, puedes copiarlo después a tu grimorio. Duplicación de Conjuro: al ver u oír un conjuro de nivel 5 o menos, lo fijas 1 minuto y puedes lanzarlo gastando un uso de Conjuro Apresurado, sin espacio (una vez por descanso largo).',
    opciones: [{nombre:'Duplicación de Conjuro', t:'adicional', usos:1, reset:'largo', texto: () => 'Tras ver u oír un conjuro de nivel 5 o menos, lo lanzas en el siguiente minuto gastando un uso de Conjuro Apresurado, sin espacio de conjuro.'}]},

  /* Teórico de la Conspiración */
  {de:/^teorico de la conspiracion$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: c => `Amuletos del Teórico (1 uso cada uno): Amuleto Masónico, Moneda de Tres Caras y Metal Insondable (CD ${invCD(c)}).`,
    opciones: [
      opAmuleto('Amuleto Masónico', 'adicional', () => 'Lo pegas a un arma que empuñes y eliges un número del 10 al 19: durante 1 minuto, los ataques con esa arma son críticos al sacar ese número o un 20.'),
      opAmuleto('Moneda de Tres Caras', 'gratis', () => 'Te das ventaja en una prueba de d20 antes de tirarla.'),
      opAmuleto('Metal Insondable', 'adicional', c => `Lo muestras a una criatura a 5 pies: al inicio de cada uno de sus turnos durante 1 minuto sufre 2d6 radiante y hace una salvación de CON (CD ${invCD(c)}); si la supera, el efecto termina.`)]},
  {de:/^teorico de la conspiracion$/, n:/^atar cabos$/, t:'pasiva', usos: () => 0,
    eleccion: {id:'atar-cabos', titulo:'Atar Cabos', opciones: SKILLS.map(([n]) => ({key: norm(n), nombre: n, desc: 'Competencia, si no la tenías, y pericia.'}))},
    efecto: c => { const k = elegido(c, 'atar-cabos'); if (!k || !(k in c.skill)) return;
      if (!c.skillProf[k]) { c.skill[k] += c.pb; c.skillProf[k] = true; }
      if (!c.skillPer[k]) { c.skill[k] += c.pb; c.skillPer[k] = true; } },
    texto: c => { const k = elegido(c, 'atar-cabos'), s = SKILLS.find(([n]) => norm(n) === k);
      return s ? `${s[0]}: competencia (si no la tenías) y pericia (ya sumado). Al terminar un descanso corto o largo puedes cambiar de habilidad.`
        : 'Al terminar un descanso corto o largo eliges una habilidad: ganas competencia (si no la tenías) y pericia hasta que elijas otra. Elígela en el paso Clase.'; }},
  {de:/^teorico de la conspiracion$/, n:/^fuera de la red$/, t:'pasiva',
    texto: () => 'Plan de Escape: al recibir daño, usas tu reacción para quedar Invisible hasta el inicio de tu próximo turno. Indetectabilidad: lanzas Indetectable sobre ti sin gastar espacio.',
    opciones: [{nombre:'Plan de Escape', t:'reaccion', texto: () => 'Al recibir daño, quedas Invisible hasta el inicio de tu próximo turno.'}],
    conjuros: () => [{nombre:'Indetectable', ab:'int', nota:'Solo sobre ti, sin espacio (Fuera de la Red)'}]},

  /* Especialista en Contención */
  {de:/^especialista en contencion$/, n:/^historia de tapadera$/, t:'gratis', usos:1, reset:'corto'},
  {de:/^especialista en contencion$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: () => 'Amuletos del Especialista (1 uso cada uno): Anticampana (Silencio), Bolsa Negra y Brújula de Cinabrio (Localizar objeto). Los conjuros salen en Conjuros, sin espacio ni componentes.',
    conjuros: () => [amuleto('Silencio', 'Anticampana', 'adicional'), amuleto('Localizar objeto', 'Brújula de Cinabrio', 'adicional')],
    opciones: [opAmuleto('Bolsa Negra', 'adicional', () => 'Durante 1 minuto, con la acción de Utilizar guardas o sacas un objeto de espacios extradimensionales protegidos por un Campo antimagia (hasta 12 objetos de 50 libras como máximo cada uno). Siempre sacas el que querías.')]},
  {de:/^especialista en contencion$/, n:/^aqui no hay nada que ver$/, t:'accion', usos:1, reset:'largo',
    texto: () => 'Con un destello cegador reescribes los recuerdos de hasta 3 criaturas dentro del alcance: lanzas Alterar los recuerdos como acción, sin espacio ni componentes, con el mismo recuerdo falso para todas. Una vez por descanso largo.',
    conjuros: () => [{nombre:'Alterar los recuerdos', ab:'int', tiempo:'accion', recurso:'rg-aqui-no-hay-nada-que-ver', coste:'1 uso', nota:'Aquí no Hay Nada que Ver: sin espacio ni componentes, hasta 3 criaturas con el mismo recuerdo falso; gasta el uso del rasgo'}]},
  {de:/^especialista en contencion$/, n:/^dimension de contencion$/, t:'accion', usos:1, reset:'largo'},

  /* Detective */
  {de:/^detective$/, n:/^corazonada asombrosa$/, t:'gratis', usos: c => invMod(c), reset:'largo',
    texto: c => `Al hacer una prueba de Inteligencia o de Sabiduría (Perspicacia), sumas +${c.lvl} (tu nivel de Investigador). Usos: ${invMod(c)} (tu modificador de INT, mínimo 1).`},
  {de:/^detective$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: () => 'Amuletos del Detective (1 uso cada uno): Periapto de Piedra de Niebla (Paso brumoso), Medallón de Cristal (Invisibilidad sobre ti, como acción adicional) y Llave de Esqueleto (Abrir, como acción adicional y en silencio). Salen en Conjuros, sin espacio ni componentes.',
    conjuros: () => [amuleto('Paso brumoso', 'Periapto de Piedra de Niebla'), amuleto('Invisibilidad', 'Medallón de Cristal: solo sobre ti', 'adicional'), amuleto('Abrir', 'Llave de Esqueleto: el lanzamiento es silencioso', 'adicional')]},
  {de:/^detective$/, n:/^intuicion predictiva$/, t:'adicional', usos: c => c.lvl >= 14 ? 0 : 1, reset:'corto',
    texto: c => `Examinas a una criatura a 30 pies: hasta el inicio de tu próximo turno sumas 1d6 a tus ataques contra ella y ella resta 1d6 a los suyos contra ti.${c.lvl >= 14 ? ' Con Poder de Deducción puedes usarla sobre un mismo objetivo cuantas veces quieras.' : ' Una vez por objetivo hasta un descanso corto o largo.'}`},

  /* Exterminador */
  {de:/^exterminador$/, n:/^escudo plateado$/, t:'pasiva',
    efecto: c => { if (c.armor?.cat === 'media') { const v = c.armor.base + Math.min(c.armor.max ?? 2, c.m.int) + (c.shield ? 2 : 0) + (c.tieneEstilo?.('defensa') ? 1 : 0); if (v > c.ac) c.ac = v; } },
    texto: c => `Entrenamiento con armaduras medias y escudos. Con armadura media sumas tu INT en vez de tu DES a la CA (con el mismo máximo de +${c.armor?.max ?? 2}); ya se usa si es mayor.`},
  {de:/^exterminador$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: () => 'Amuletos del Exterminador (1 uso cada uno, acción adicional): Piedra de Afilar Consagrada (Arma mágica), Escama de Dragón Dorada y Collar de Dientes de Mímico.',
    conjuros: () => [amuleto('Arma mágica', 'Piedra de Afilar Consagrada', 'adicional')],
    opciones: [
      opAmuleto('Escama de Dragón Dorada', 'adicional', () => 'Eliges ácido, frío, fuego, fuerza, relámpago, veneno o trueno: tienes resistencia a ese daño durante 1 minuto.'),
      opAmuleto('Collar de Dientes de Mímico', 'adicional', () => 'Tras impactar con un arma, haces 2d8 de daño de ácido extra a esa criatura.')]},
  {de:/^exterminador$/, n:/^cazador de monstruos$/, t:'adicional', usos: c => invMod(c), reset:'corto',
    texto: c => `Haces un ataque con arma o un Ataque Desarmado como acción adicional. Usos: ${invMod(c)} (tu modificador de INT, mínimo 1); los recuperas con descanso corto o largo.`},

  /* Infernum (el texto de Gemini llega cortado: solo el rasgo de nivel 3) */
  {de:/^infernum$/, n:/^familiar infernal$/, t:'pasiva',
    texto: () => 'Sumas gratis Encontrar familiar a tu grimorio y lo lanzas con Conjuro Apresurado sin gastar el uso ni leer del libro. Solo puedes elegir como familiar un Diablillo, un Quasit o un Pseudodragón (que habla Común y es un Infernal).',
    conjuros: () => [{nombre:'Encontrar familiar', ab:'int', nota:'Gratis en tu grimorio; con Conjuro Apresurado no gasta uso. Solo Diablillo, Quasit o Pseudodragón (Infernal que habla Común)'}]},

  /* Inquisitor */
  {de:/^inquisitor$/, n:/^doctrinas de exorcista$/, t:'pasiva',
    texto: () => 'Armadura Consagrada: la sumas gratis a tu grimorio; al lanzarla, la base de tu Clase de Armadura pasa a ser 13 + DES. Dogma: en una prueba de Inteligencia (Religión), un 9 o menos en el d20 cuenta como 10.',
    conjuros: () => [{nombre:'Armadura Consagrada', ab:'int', nota:'Gratis en tu grimorio (Doctrinas de Exorcista)'}]},
  {de:/^inquisitor$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: () => 'Amuletos del Inquisitor (1 uso cada uno, acción adicional): Bálsamo de Alabastro (Restablecimiento menor), Cáliz Consagrado y Relicario de la Duda (Detectar pensamientos, solo emociones negativas).',
    conjuros: () => [amuleto('Restablecimiento menor', 'Bálsamo de Alabastro', 'adicional'), amuleto('Detectar pensamientos', 'Relicario de la Duda: solo emociones negativas', 'adicional')],
    opciones: [opAmuleto('Cáliz Consagrado', 'adicional', () => 'Encantas un recipiente que toques y produces un frasco de Agua bendita. Durante 1 hora puedes producir otro con una acción adicional, hasta 5 en total; desaparecen a la hora.')]},
  {de:/^inquisitor$/, n:/^golpe divino$/, t:'gratis',
    texto: () => 'Una vez en cada uno de tus turnos, al impactar con un arma, el objetivo sufre 1d8 de daño necrótico o radiante extra (tú eliges).'},
  {de:/^inquisitor$/, n:/^piedad rutinaria$/, t:'pasiva', usos:3, reset:'largo',
    texto: () => 'Usas tus Amuletos Sagrados 3 veces por descanso largo sin gastar usos de Amuletos.'},
  {de:/^inquisitor$/, n:/^excomunion$/, t:'adicional', usos:1, reset:'largo',
    texto: c => `Marcas con condena a una criatura que veas a 60 pies: salvación de SAB (CD ${invCD(c)}); si falla, durante 1 minuto sufre 6d6 radiante al inicio de sus turnos, no recupera PG y no puede tener ventaja en pruebas de d20. Repite la salvación al final de cada uno de sus turnos. Se recupera con descanso largo o gastando un uso de Conjuro Apresurado (sin acción).`},

  /* Kid Sleuth */
  {de:/^kid sleuth$/, n:/^companero animal$/, t:'pasiva',
    texto: () => 'Tienes un compañero animal parlante: sumas gratis Encontrar familiar a tu grimorio y lo lanzas con Conjuro Apresurado sin gastar el uso ni leer del libro. Además de las formas normales, puede ser Cabra, Mastín o Comadreja; tiene INT 10, habla un idioma que conozcas y es competente en dos habilidades o herramientas que eliges al invocarlo.',
    conjuros: () => [{nombre:'Encontrar familiar', ab:'int', nota:'Gratis en tu grimorio; con Conjuro Apresurado no gasta uso. Formas extra: Cabra, Mastín o Comadreja; sabe hablar, INT 10 y dos competencias a tu elección'}]},
  {de:/^kid sleuth$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: c => `Amuletos del Kid Sleuth (1 uso cada uno, acción adicional): Bolsa de Trampas, Bocadito Delicioso (${invMod(c)} PG temporales y ventaja en el siguiente d20) y Lupa (Pista).`,
    conjuros: () => [amuleto('Pista', 'Lupa: ves además el tipo de criatura de cada huella', 'adicional')],
    opciones: [
      opAmuleto('Bolsa de Trampas', 'adicional', c => `Produces y usas uno de estos objetos: rodamientos, abrojos, cadena, trampa de caza, esposas o aceite (solo para rociar un espacio); salvaciones con tu CD ${invCD(c)}. Durante 1 minuto puedes producir otros con acción adicional, hasta 5 en total; desaparecen a la hora.`),
      opAmuleto('Bocadito Delicioso', 'adicional', c => `Produces un premio que dura 1 hora. Quien lo come con una acción adicional gana ${invMod(c)} PG temporales y ventaja en su siguiente prueba de d20 hasta el inicio de su siguiente turno.`)]},

  /* Medium */
  {de:/^medium$/, n:/^premonicion$/, t:'gratis', usos:2, reset:'largo',
    texto: () => 'Al terminar un descanso largo tiras dos d20 y anotas los resultados. Una vez por turno, antes de una prueba de d20 tuya o de una criatura que veas, puedes cambiarla por una de esas tiradas. Cada una se usa una sola vez y las que sobren se pierden al descansar.'},
  {de:/^medium$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: () => 'Amuletos del Medium (1 uso cada uno): Campana Mortuoria (Hablar con los Muertos, con una sola pregunta), Gafas Heptagonales (Ver invisibilidad) y Espejo Lúcido.',
    conjuros: () => [amuleto('Hablar con los Muertos', 'Campana Mortuoria: solo una pregunta al cadáver'), amuleto('Ver invisibilidad', 'Gafas Heptagonales', 'adicional')],
    opciones: [opAmuleto('Espejo Lúcido', 'adicional', () => 'Te desplazas en parte al Plano Etéreo durante 1 minuto o hasta que lo termines (sin acción): velocidad de vuelo 10 pies y atraviesas espacios ocupados como terreno difícil. Si acabas tu turno dentro de uno, te expulsan al último espacio libre donde estuviste.')]},
  {de:/^medium$/, n:/^susurros del mas alla$/, t:'accion', usos:1, reset:'largo'},
  {de:/^medium$/, n:/^tercer ojo$/, t:'adicional', usos:1, reset:'largo',
    texto: () => 'Lanzas Visión veraz como acción adicional, sin espacio ni componentes; mientras dura, tienes ventaja en el primer ataque de cada uno de tus turnos. Una vez por descanso largo.',
    conjuros: () => [{nombre:'Visión veraz', ab:'int', tiempo:'adicional', recurso:'rg-tercer-ojo', coste:'1 uso', nota:'Tercer Ojo: sin espacio ni componentes; ventaja en tu primer ataque de cada turno mientras dure; gasta el uso del rasgo'}]},

  /* Occultist */
  {de:/^occultist$/, n:/^magia de pacto$/, t:'pasiva',
    efecto: c => { const p = INV_PACTO[c.lvl - 1]; if (!p) return; c.slots.push({nivel: p[3], n: p[2], reset:'corto', nombre:`Espacios de pacto (nivel ${p[3]})`}); c.listasExtra = [...new Set([...(c.listasExtra || []), 'brujo'])]; c.trucosReglas = p[0]; c.prepReglas = p[1]; },
    texto: c => { const p = INV_PACTO[c.lvl - 1] || [2, 0, 0, 0];
      return `Lanzas conjuros de Brujo con Inteligencia (CD ${invCD(c)}, ${sign(c.pb + c.m.int)} al ataque) y puedes usar un foco arcano. Conoces ${p[0]} trucos y preparas ${p[1]} conjuros de nivel 1 o más, de nivel ${p[3]} o menos; los cambias al subir de nivel. Tienes ${p[2]} espacio(s) de nivel ${p[3]} que se recuperan con descanso corto o largo.`; }},
  {de:/^occultist$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: () => 'Amuletos del Occultist (1 uso cada uno): Colgante de Hierro Frío (Detectar el bien y el mal), Vial de Niebla Muerta (Niebla) y Lente Grabada (Identificar). Salen en Conjuros, sin espacio ni componentes.',
    conjuros: () => [amuleto('Detectar el bien y el mal', 'Colgante de Hierro Frío'), amuleto('Niebla', 'Vial de Niebla Muerta'), amuleto('Identificar', 'Lente Grabada')]},
  {de:/^occultist$/, n:/^ruina arcana$/, t:'adicional', usos: c => invMod(c), reset:'largo',
    texto: c => `Lanzas uno de tus trucos de Brujo como acción adicional. Usos: ${invMod(c)} (tu modificador de INT, mínimo 1), hasta un descanso largo.`},
  {de:/^occultist$/, n:/^maleficio$/, t:'adicional', usos:1, reset:'corto',
    texto: () => 'Al usar Explotar Debilidad, lanzas Imponer maldición sobre el objetivo como acción adicional, sin espacio ni componentes. Cuando una criatura falla la salvación contra este conjuro, no puedes volver a usarlo hasta un descanso corto o largo (o gastando un uso de Conjuro Apresurado, sin acción).',
    conjuros: () => [{nombre:'Imponer maldición', ab:'int', tiempo:'adicional', recurso:'rg-maleficio', coste:'1 uso', nota:'Maleficio: tras tu Explotar Debilidad, sin espacio ni componentes; si el objetivo falla la salvación no puedes repetirlo hasta un descanso corto o largo (o gastando un uso de Conjuro Apresurado)'}]},

  /* Spy */
  {de:/^spy$/, n:/^bravuconeria$/, t:'pasiva',
    efecto: c => { c.skill.engano += invMod(c); c.skill.persuasion += invMod(c); },
    texto: c => `Sumas +${invMod(c)} (tu INT, mínimo +1) a tus pruebas de Carisma (Engaño y Persuasión); ya sumado.`},
  {de:/^spy$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: () => 'Amuletos del Spy (1 uso cada uno, acción adicional): Polvo de Cristal, Gafas de Montura de Cuerno (Disfrazarse) y Copa de Martini (Hechizar persona).',
    conjuros: () => [amuleto('Disfrazarse', 'Gafas de Montura de Cuerno', 'adicional'), amuleto('Hechizar persona', 'Copa de Martini', 'adicional')],
    opciones: [opAmuleto('Polvo de Cristal', 'adicional', () => 'Lanzas la bolsa a un punto a 10 pies: una Esfera de 5 pies de polvo brillante dura hasta el inicio de tu próximo turno. Quien entre por primera vez en un turno o acabe su turno dentro queda Invisible hasta salir, atacar, dañar o lanzar un conjuro.')]},
  {de:/^spy$/, n:/^capa y espada$/, t:'gratis',
    texto: c => `Al dañar en la primera ronda de combate, si el objetivo aún no ha actuado o tienes ventaja contra él, haces +${c.lvl} de daño de fuerza (tu nivel de Investigador).`},
  {de:/^spy$/, n:/^doble de cuerpo$/, t:'accion', usos:1, reset:'corto',
    texto: c => `Con la acción mágica adoptas la apariencia de un Humanoide, o de un cadáver humanoide muerto hace 24 horas o menos, que toques (ropa, armadura y armas incluidas); si era un cadáver, él y las pruebas de su muerte quedan invisibles 8 horas. Para descubrirte, hay que usar la acción de Estudiar y superar una prueba de Inteligencia (Investigación) contra CD ${invCD(c)}. Se recupera con descanso corto o largo, o gastando un uso de Conjuro Apresurado (sin acción).`},
  {de:/^spy$/, n:/^locuaz$/, t:'accion', usos: () => 0,
    texto: () => 'Lanzas Labia sin el componente material y, una vez por descanso largo, también sin gastar espacio. Mientras dura, la acción de Influir te cuesta solo una acción adicional.',
    conjuros: () => [{nombre:'Labia', ab:'int', usos:1, reset:'largo', nota:'Locuaz: sin componente material; una vez sin espacio. Mientras dura, Influir como acción adicional'}]},

  /* Time Operative */
  {de:/^time operative$/, n:/^tiempo prestado$/, t:'adicional', usos:2, reset:'largo',
    texto: () => 'Una vez en cada uno de tus turnos haces una acción adicional, solo para Atacar (un ataque), Correr, Destrabarte, Esconderte o Utilizar. Tienes 2 usos hasta un descanso largo; Robar Tiempo te devuelve uno al terminar un descanso corto o al dejar a un enemigo a 0 PG.'},
  {de:/^time operative$/, n:/^amuletos$/, t:'pasiva', recurso:'rg-amuletos',
    texto: () => 'Amuletos del Time Operative (1 uso cada uno): Tableta en Blanco, Emblema de Azogue (Zancada prodigiosa, acción adicional) y Esfera Ingrávida (Caída de pluma).',
    conjuros: () => [amuleto('Zancada prodigiosa', 'Emblema de Azogue', 'adicional'), amuleto('Caída de pluma', 'Esfera Ingrávida')],
    opciones: [opAmuleto('Tableta en Blanco', 'accion', () => 'Con la acción mágica, tocas a una criatura y terminas en ella una condición: Cegado, Ensordecido, Paralizado o Envenenado. No sirve con una que lleve más de 1 minuto.')]},
  {de:/^time operative$/, n:/^rebobinar$/, t:'adicional', usos: c => invMod(c), reset:'largo',
    texto: c => `Tras fallar una prueba de d20, usas una acción adicional para rebobinar el tiempo: repites la prueba y te quedas con la nueva tirada. Usos: ${invMod(c)} (tu modificador de INT, mínimo 1), hasta un descanso largo.`},

  /* Lo generado desde las respuestas de Gemini (scripts/gemini/revisar.ts); las de arriba tienen prioridad */
  ...REGLAS_GENERADAS,
];

/* Conjuros que dan los rasgos cuyo texto los nombra pero no los enlazaba (siempre preparados, gratis o como ritual).
   Se suman aunque el rasgo tenga su propia regla, salvo que esa regla ya traiga `conjuros`; así salen en el Turno,
   en la categoría de su tiempo de lanzamiento. Los usos gratis siguen contándose en el rasgo. */
export const CONJUROS_RASGOS: any[] = [
  {de:/^pacto de la cadena$/, n:/^pacto de la cadena$/, conjuros:[{nombre:'Encontrar familiar', nota:'Siempre preparado; como acción mágica y sin espacio, con las formas especiales del pacto (Pacto de la Cadena)'}]},
  {de:/^senda del corazon salvaje$/, n:/^hablante animal$/, conjuros:[
    {nombre:'Sentidos de la bestia', ab:'sab', nota:'Solo como ritual (Hablante Animal)'},
    {nombre:'Hablar con los animales', ab:'sab', nota:'Solo como ritual (Hablante Animal)'}]},
  {de:/^senda del corazon salvaje$/, n:/^hablante de la naturaleza$/, conjuros:[
    {nombre:'Comunión con la naturaleza', ab:'sab', nota:'Solo como ritual (Hablante de la Naturaleza)'}]},
  {de:/^senda del guardian espiritual$/, n:/^consultar a los espiritus$/, conjuros:[
    {nombre:'Augurio', ab:'sab', nota:'Sin espacio ni componentes materiales; comparte el uso de Consultar a los Espíritus'},
    {nombre:'Clarividencia', ab:'sab', nota:'Sin espacio ni componentes materiales; comparte el uso de Consultar a los Espíritus'}]},
  {de:/^colegio de los espiritus$/, n:/^canalizador$/, conjuros:[{nombre:'Guía', nota:'Truco del Canalizador, con alcance de 60 pies'}]},
  {de:/^brujo$/, n:/^contactar al patron$/, conjuros:[
    {nombre:'Contactar con otro plano', nota:'Siempre preparado. Una vez por descanso largo, sin espacio y superando la salvación (Contactar al Patrón)'}]},
  {de:/^patron gran antiguo$/, n:/^maleficio sobrenatural$/, conjuros:[{nombre:'Maleficio'}]},
  {de:/^druida$/, n:/^druidico$/, conjuros:[{nombre:'Hablar con los animales'}]},
  {de:/^druida$/, n:/^companero salvaje$/, conjuros:[
    {nombre:'Encontrar familiar', nota:'Con un espacio o un uso de Forma Salvaje, sin componentes materiales (Compañero Salvaje)'}]},
  {de:/^circulo de los suenos$/, n:/^caminante de los suenos$/, conjuros:[
    {nombre:'Ensueño', nota:'Sin espacio al terminar un descanso corto; comparte el uso de Caminante de los Sueños'},
    {nombre:'Escudriñar', nota:'Sin espacio al terminar un descanso corto; comparte el uso de Caminante de los Sueños'},
    {nombre:'Círculo de teletransportación', nota:'Sin espacio al terminar un descanso corto; comparte el uso de Caminante de los Sueños'}]},
  {de:/^circulo del pastor$/, n:/^invocacion fiel$/, conjuros:[
    {nombre:'Conjurar animales', nota:'Como si fuera de nivel 9, al caer a 0 PG o quedar Incapacitado (Invocación Fiel)'}]},
  {de:/^abanderado$/, n:/^enviado caballeresco$/, conjuros:[{nombre:'Comprender idiomas', ab:'car', nota:'Solo como ritual (Enviado Caballeresco)'}]},
  {de:/^guerrero psionico$/, n:/^maestro de la telequinesis$/, conjuros:[
    {nombre:'Telequinesis', ab:'int', nota:'Sin componentes; gratis una vez por descanso largo (Maestro de la Telequinesis) o gastando un dado psiónico'}]},
  {de:/^hechiceria de las sombras$/, n:/^bestias de mal aguero$/, conjuros:[
    {nombre:'Invocar bestia', tiempo:'adicional', coste:'3 puntos de hechicería', nota:'Sin espacio ni componentes materiales (Bestias de Mal Agüero)'}]},
  {de:/^abjurador$/, n:/^rompeconjuros$/, conjuros:[
    {nombre:'Contrahechizo', nota:'Siempre preparado; sumas tu competencia a la tirada y si falla no gastas el espacio'},
    {nombre:'Disipar magia', tiempo:'adicional', nota:'Siempre preparado; como acción adicional, sumas tu competencia a la tirada y si falla no gastas el espacio'}]},
  {de:/^adivino$/, n:/^el tercer ojo$/, conjuros:[{nombre:'Ver invisibilidad', nota:'Gratis una vez si eliges esa opción del Tercer Ojo'}]},
  {de:/^ilusionista$/, n:/^ilusiones mejoradas$/, conjuros:[{nombre:'Ilusión menor', tiempo:'adicional', nota:'Con sonido e imagen a la vez; como acción adicional (Ilusiones Mejoradas)'}]},
  {de:/^ilusionista$/, n:/^criaturas fantasmales$/, conjuros:[
    {nombre:'Invocar bestia', nota:'Siempre preparado; gratis como ilusión con la mitad de PG (Criaturas Fantasmales)'},
    {nombre:'Invocar feérico', nota:'Siempre preparado; gratis como ilusión con la mitad de PG (Criaturas Fantasmales)'}]},
  {de:/^transmutador$/, n:/^alteracion maravillosa$/, conjuros:[{nombre:'Alterar el propio aspecto', nota:'Siempre preparado; gratis una vez por descanso largo (Alteración Maravillosa)'}]},
  {de:/^transmutador$/, n:/^cambiaformas$/, conjuros:[{nombre:'Polimorfar', nota:'Siempre preparado; gratis sobre ti una vez por descanso largo (Cambiaformas)'}]},
  {de:/^nigromante$/, n:/^libro de necromancia$/, conjuros:[{nombre:'Encontrar familiar', nota:'El familiar puede ser un esqueleto o zombi (Libro de Necromancia)'}]},
  {de:/^guerrero de la sombra$/, n:/^oscuridad/, conjuros:[{nombre:'Oscuridad', ab:'sab', coste:'1 Focus', nota:'Sin componentes; ves dentro y puedes moverla (Artes de la Sombra)'}]},
  {de:/^guerrero de la sombra$/, n:/^figuras sombrias$/, conjuros:[{nombre:'Ilusión menor', ab:'sab'}]},
  {de:/^guerrero de los elementos$/, n:/^sintonia elemental$/, conjuros:[{nombre:'Elementalismo', ab:'sab'}]},
  {de:/^juramento de los genios nobles$/, n:/^conjuros del genio$/, conjuros:[
    {nombre:'Orbe cromático'}, {nombre:'Elementalismo'}, {nombre:'Castigo atronador'},
    {nombre:'Imagen múltiple', desde:5}, {nombre:'Fuerza fantasmal', desde:5},
    {nombre:'Volar', desde:9}, {nombre:'Forma gaseosa', desde:9},
    {nombre:'Conjurar elementales menores', desde:13}, {nombre:'Invocar elemental', desde:13},
    {nombre:'Castigo desterrador', desde:17}, {nombre:'Contactar con otro plano', desde:17}]},
];
