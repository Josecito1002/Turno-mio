/* Audita la biblioteca: lista los rasgos sin regla revisada cuyo tipo (acción, adicional, reacción...) es dudoso.
   Uso: npx tsx scripts/auditar-reglas.ts [ruta.json] [--salida ../docs/revision-reglas.md]
   Si el archivo de salida ya existe, conserva las casillas marcadas y sus notas. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { norm } from '../src/shared/utils/texto';
import { clasificar } from '../src/features/reglas/domain/clasificar';
import { REGLAS } from '../src/features/reglas/data/reglas-revisadas';
import { CLASES } from '../src/features/reglas/data/clases';
import { SUBCLASES } from '../src/features/reglas/data/subclases';
import { BESTIAS_COLADAS } from '../src/features/reglas/data/especies';

type Rasgo = { nombre: string; texto?: string; t?: string; n?: number; sub?: string };
type Item = { id: string; origen: string; nombre: string; nivel: number; tipo: string; motivos: string[] };
type Lote = { titulo: string; items: Item[]; claros: number; revisados: number; idsRevisados: string[]; nota?: string };

/* Palabras que indican que el rasgo se activa (y por lo tanto no debería ser pasiva) */
const ACTIVA = /\bpuedes\b|\bgasta|\busa(?:s|r)?\b|\btira(?:s|r)?\b|\bataca|\bataque|teletransport|\blanza(?:s|r)?\b|\bactiva|\binvoca|te transformas|\bconjura|\bobliga|\bempuja/;
/* Menciones explícitas a un tipo de acción */
const MENCIONA = /\baccion|\breaccion|\badicional\b|bonus action|\baction\b|\breaction\b/;

/* Selectores (elecciones con `eleccion` en las reglas) hechos y por hacer, según la versión más reciente de cada clase */
const SELECTORES: { id: string; donde: string; que: string; detalle: string; hecho?: boolean }[] = [
  { id: 'maldiciones', donde: 'Hechos', que: 'Cazador de Sangre: maldiciones conocidas', detalle: '1 a 5 según nivel; solo salen las conocidas.', hecho: true },
  { id: 'ritos', donde: 'Hechos', que: 'Cazador de Sangre: ritos carmesí', detalle: '1 a 3 según nivel; los esotéricos desde nivel 14.', hecho: true },
  { id: 'patron-alma-profana', donde: 'Hechos', que: 'Orden del Alma Profana: patrón', detalle: 'decide su Enfoque del Rito y sus conjuros de Arcano.', hecho: true },
  { id: 'formulas-mutante', donde: 'Hechos', que: 'Orden del Mutante: fórmulas', detalle: '4 a 8 según nivel; cada mutágeno conocido sale como acción adicional.', hecho: true },
  { id: 'modelo-armero', donde: 'Hechos', que: 'Armero: modelo de armadura', detalle: 'deja solo su arma y sus opciones; el Infiltrador suma velocidad.', hecho: true },
  { id: 'aspecto-salvaje', donde: 'Hechos', que: 'Corazón Salvaje: Aspecto de lo Salvaje', detalle: 'Búho (visión en la oscuridad en el cálculo), Pantera o Salmón. La Furia y el Poder de lo Salvaje, que se eligen al entrar en furia, van como opciones.', hecho: true },
  { id: 'legado-kobold', donde: 'Hechos', que: 'Kobold: Legado Kobold', detalle: 'Astucia, Desafío o Hechicería Dracónica (paso Especie).', hecho: true },
  { id: 'simic', donde: 'Hechos', que: 'Híbrido Simic: mejoras animales', detalle: 'una en nivel 1 y otra en nivel 5 (paso Especie); Caparazón y Apéndices en el cálculo, Escupir Ácido como acción.', hecho: true },
  { id: 'descubrimientos-magicos', donde: 'Hechos', que: 'Bardo: Secretos Mágicos y Descubrimientos Mágicos', detalle: 'el paso Conjuros ofrece también las listas de clérigo, druida y mago.', hecho: true },
  { id: 'invocaciones', donde: 'Clases de las reglas (no están en ningún lote)', que: 'Brujo: invocaciones sobrenaturales', detalle: '1 a 10 según nivel; en 2024 los pactos (Cadena, Filo, Tomo) son invocaciones, así que reemplaza la casilla "Pacto de la Cadena".' },
  { id: 'arcano-mistico', donde: 'Clases de las reglas (no están en ningún lote)', que: 'Brujo: Arcano místico', detalle: 'un conjuro de nivel 6, 7, 8 y 9 en los niveles 11, 13, 15 y 17.' },
  { id: 'orden-divina', donde: 'Clases de las reglas (no están en ningún lote)', que: 'Clérigo: Orden Divina', detalle: 'Protector (armadura pesada y armas marciales) o Taumaturgo (un truco más y SAB a Arcanos o Religión); cambia competencias y trucos.' },
  { id: 'orden-primordial', donde: 'Clases de las reglas (no están en ningún lote)', que: 'Druida: Orden Primordial', detalle: 'Mago (un truco más y SAB a Arcanos o Naturaleza) o Guardián (armadura media y armas marciales).' },
  { id: 'formas-salvajes', donde: 'Clases de las reglas (no están en ningún lote)', que: 'Druida: formas de Forma Salvaje', detalle: '4, 6 y 8 bestias conocidas en los niveles 2, 4 y 8.' },
  { id: 'metamagia', donde: 'Clases de las reglas (no están en ningún lote)', que: 'Hechicero: Metamagia', detalle: '2, 4 y 6 opciones en los niveles 2, 10 y 17; cada una saldría con su coste en puntos.' },
  { id: 'afinidad-draconica', donde: 'Clases de las reglas (no están en ningún lote)', que: 'Hechicería Dracónica: Afinidad Elemental', detalle: 'tipo de daño (ácido, frío, fuego, relámpago o veneno): resistencia y CAR al daño de ese tipo.' },
  { id: 'dominio-conjuros', donde: 'Clases de las reglas (no están en ningún lote)', que: 'Mago: Dominio de Conjuros y Conjuros Distintivos', detalle: 'conjuros de nivel 1 y 2 a voluntad (nivel 18) y dos de nivel 3 (nivel 20).' },
  { id: 'planos-artifice', donde: 'Clases de las reglas (no están en ningún lote)', que: 'Artífice y Arcanista: planos de Replicar Objeto Mágico', detalle: '4 a 8 planos según nivel, de las tablas de 2025.' },
  { id: 'truco-luna', donde: 'Lote 6: Bardo', que: 'Colegio de la Luna: truco de druida', detalle: 'un truco de druida que no cuenta en el límite.' },
  { id: 'golpes-benditos', donde: 'Lote 8: Clérigo', que: 'Golpes Benditos (nivel 7)', detalle: 'Golpe Divino o Lanzamiento Potente.' },
  { id: 'bendiciones-saber', donde: 'Lote 8: Clérigo', que: 'Dominio del Conocimiento: Bendiciones del Saber', detalle: 'dos habilidades con pericia (Arcanos, Historia, Naturaleza o Religión) y una herramienta.' },
  { id: 'furia-elemental', donde: 'Lote 9: Druida', que: 'Furia Elemental (nivel 7)', detalle: 'Golpe Primigenio o Lanzamiento Potente.' },
  { id: 'tipo-tierra', donde: 'Lote 9: Druida', que: 'Círculo de la Tierra: tipo de tierra', detalle: 'Árida, Polar, Templada o Tropical; decide los conjuros siempre preparados.' },
  { id: 'presa-cazador', donde: 'Lote 10: Explorador', que: 'Cazador: Presa del Cazador y Tácticas Defensivas', detalle: 'Asesino de Colosos o Rompehordas (nivel 3) y su defensa (nivel 7); se cambian en un descanso.' },
  { id: 'bestia-primigenia', donde: 'Lote 10: Explorador', que: 'Maestro de Bestias: bestia primigenia', detalle: 'de tierra, de mar o del cielo; cambia sus estadísticas y su ataque.' },
  { id: 'estilo-campeon', donde: 'Lote 11: Guerrero', que: 'Campeón: Estilo de Combate Adicional', detalle: 'un segundo estilo; en 2024 es en el nivel 7 (la biblioteca dice 10).' },
  { id: 'maniobras', donde: 'Lote 11: Guerrero', que: 'Maestro de Batalla: maniobras y Estudiante de la Guerra', detalle: 'maniobras conocidas según nivel, cada una como opción con su dado de superioridad; más una herramienta y una habilidad.' },
  { id: 'lealtad-tres', donde: 'Lote 16: Pícaro', que: 'Vástago de los Tres: Lealtad Temible', detalle: 'Bane, Bhaal o Myrkul: su resistencia y su truco.' },
];

/* Lo que tiene D&D Beyond y falta en la app (lista del 24/09/2026). Se agrega en el lote de su clase, en su versión
   oficial más reciente. `no`: por qué no se agrega (reemplazado en 2024 o sin versión vigente); cuenta como resuelto. */
const POR_AGREGAR: { lote: string; que: string; libro: string; no?: string }[] = [
  ...[['Senda de la Bestia', "Tasha's Cauldron of Everything"], ['Senda de la Magia Salvaje', "Tasha's Cauldron of Everything"], ['Senda del Guardián Ancestral', "Xanathar's Guide to Everything"],
    ['Senda del Heraldo de la Tormenta', "Xanathar's Guide to Everything"], ['Senda del Gigante', "Bigby Presents: Glory of the Giants"], ['Senda del Rabioso de Batalla', "Sword Coast Adventurer's Guide"]]
    .map(([que, libro]) => ({ lote: 'Lote 5: Bárbaro', que, libro })),
  { lote: 'Lote 5: Bárbaro', que: 'Senda del Guerrero Totémico', libro: 'Manual del Jugador 2014', no: 'la reemplaza la Senda del Corazón Salvaje (2024), que ya está.' },
  ...[['Colegio de la Creación', "Tasha's Cauldron of Everything"], ['Colegio de la Elocuencia', "Tasha's Cauldron of Everything"], ['Colegio de las Espadas', "Xanathar's Guide to Everything"], ['Colegio de los Susurros', "Xanathar's Guide to Everything"]]
    .map(([que, libro]) => ({ lote: 'Lote 6: Bardo', que, libro })),
  ...[['El Filo Maldito (Hexblade)', "Xanathar's Guide to Everything"], ['El Genio', "Tasha's Cauldron of Everything"], ['El Insondable', "Tasha's Cauldron of Everything"], ['El Inmortal', "Sword Coast Adventurer's Guide"]]
    .map(([que, libro]) => ({ lote: 'Lote 7: Brujo', que, libro })),
  ...[['Dominio de la Tempestad', 'Manual del Jugador 2014'], ['Dominio de la Naturaleza', 'Manual del Jugador 2014'], ['Dominio de la Forja', "Xanathar's Guide to Everything"], ['Dominio del Orden', "Tasha's Cauldron of Everything"],
    ['Dominio de la Paz', "Tasha's Cauldron of Everything"], ['Dominio del Crepúsculo', "Tasha's Cauldron of Everything"], ['Dominio Arcano', "Sword Coast Adventurer's Guide"], ['Dominio de la Muerte', 'Guía del Dungeon Master 2014']]
    .map(([que, libro]) => ({ lote: 'Lote 8: Clérigo', que, libro })),
  ...[['Círculo de los Sueños', "Xanathar's Guide to Everything"], ['Círculo del Pastor', "Xanathar's Guide to Everything"], ['Círculo de las Esporas', "Tasha's Cauldron of Everything"], ['Círculo del Fuego Salvaje', "Tasha's Cauldron of Everything"]]
    .map(([que, libro]) => ({ lote: 'Lote 9: Druida', que, libro })),
  ...[['Trotamundos del Horizonte', "Xanathar's Guide to Everything"], ['Cazador de Monstruos', "Xanathar's Guide to Everything"], ['Guardián del Enjambre', "Tasha's Cauldron of Everything"], ['Guardián Dracónico', "Fizban's Treasury of Dragons"]]
    .map(([que, libro]) => ({ lote: 'Lote 10: Explorador', que, libro })),
  ...[['Arquero Arcano', "Xanathar's Guide to Everything"], ['Caballero (Cavalier)', "Xanathar's Guide to Everything"], ['Samurái', "Xanathar's Guide to Everything"], ['Caballero Rúnico', "Tasha's Cauldron of Everything"], ['Caballero del Eco', "Explorer's Guide to Wildemount"]]
    .map(([que, libro]) => ({ lote: 'Lote 11: Guerrero', que, libro })),
  ...[['Alma Divina', "Xanathar's Guide to Everything"], ['Hechicería de la Tormenta', "Xanathar's Guide to Everything"], ['Hechicería Lunar', 'Dragonlance: Shadow of the Dragon Queen']]
    .map(([que, libro]) => ({ lote: 'Lote 12: Hechicero', que, libro })),
  ...[['Magia de Guerra', "Xanathar's Guide to Everything"], ['Orden de los Escribas', "Tasha's Cauldron of Everything"], ['Cronurgia', "Explorer's Guide to Wildemount"], ['Graviturgia', "Explorer's Guide to Wildemount"]]
    .map(([que, libro]) => ({ lote: 'Lote 13: Mago', que, libro })),
  ...[['Camino del Maestro Borracho', "Xanathar's Guide to Everything"], ['Camino del Kensei', "Xanathar's Guide to Everything"], ['Camino del Alma Solar', "Xanathar's Guide to Everything"], ['Camino del Yo Astral', "Tasha's Cauldron of Everything"],
    ['Camino del Dragón Ascendente', "Fizban's Treasury of Dragons"], ['Camino de la Larga Muerte', "Sword Coast Adventurer's Guide"]]
    .map(([que, libro]) => ({ lote: 'Lote 14: Monje', que, libro })),
  ...[['Juramento de Conquista', "Xanathar's Guide to Everything"], ['Juramento de Redención', "Xanathar's Guide to Everything"], ['Juramento de los Vigilantes', "Tasha's Cauldron of Everything"], ['Juramento de la Corona', "Sword Coast Adventurer's Guide"], ['Rompejuramentos', 'Guía del Dungeon Master 2014']]
    .map(([que, libro]) => ({ lote: 'Lote 15: Paladín', que, libro })),
  ...[['Mente Maestra', "Xanathar's Guide to Everything"], ['Espadachín', "Xanathar's Guide to Everything"], ['Explorador (Scout)', "Xanathar's Guide to Everything"]]
    .map(([que, libro]) => ({ lote: 'Lote 16: Pícaro', que, libro })),
  ...[['Aarakocra', 'Monsters of the Multiverse'], ['Gnomo de las Profundidades', 'Monsters of the Multiverse'], ['Duergar', 'Monsters of the Multiverse'],
    ['Dracónido de gema (amatista, cristal, esmeralda, zafiro, topacio): agregar a los linajes del Dracónido', "Fizban's Treasury of Dragons"]]
    .map(([que, libro]) => ({ lote: 'Especies', que, libro })),
  { lote: 'Especies', que: 'Semielfo y Semiorco', libro: 'Manual del Jugador 2014', no: 'el Manual 2024 los quitó (se juega con los padres de cada especie); solo quedan como contenido antiguo.' },
  { lote: 'Especies', que: 'Aasimar: variantes Protector, Azote y Caído', libro: "Volo's Guide to Monsters", no: 'el Aasimar 2024 ya no tiene variantes: sus poderes se eligen al usar Revelación Celestial.' },
  { lote: 'Especies', que: 'Tiefling: variantes de Mordenkainen', libro: "Mordenkainen's Tome of Foes", no: 'el Tiefling 2024 usa los legados Abisal, Ctónico e Infernal, que ya están.' },
  ...[['Héroe del Pueblo', 'Manual del Jugador 2014'], ['Huérfano', 'Manual del Jugador 2014'], ['Forastero', 'Manual del Jugador 2014'], ['Artesano Gremial', 'Manual del Jugador 2014']]
    .map(([que, libro]) => ({ lote: 'Trasfondos', que, libro, no: 'el Manual 2024 los reemplazó por sus 16 trasfondos (Artesano, Guía, Vagabundo...).' })),
  { lote: 'Trasfondos', que: 'Viajero Lejano', libro: "Sword Coast Adventurer's Guide", no: 'ya está como «Forastero Errante».' },
];

const reglaDe =(nombre: string, src: string) => REGLAS.some((r: any) => r.n.test(norm(nombre)) && (!r.de || r.de.test(norm(src))));

function auditar(rasgos: Rasgo[], origen: (r: Rasgo) => string, lote: Lote, tipoDe: (r: Rasgo) => string = r => clasificar(r.texto || '')) {
  for (const r of rasgos) {
    const src = origen(r);
    // Revisado: tiene regla, o la biblioteca ya trae su tipo revisado (`manual`)
    if (reglaDe(r.nombre, src) || (r as any).manual) { lote.revisados++; lote.idsRevisados.push(`${norm(src)}|${norm(r.nombre)}`); continue; }
    const t = norm(r.texto || ''), tipo = tipoDe(r), motivos: string[] = [];
    if (tipo === 'pasiva' && ACTIVA.test(t)) motivos.push('queda pasiva pero parece activarse');
    if (!MENCIONA.test(t)) motivos.push('no menciona tipo de acción');
    if (!motivos.length) { lote.claros++; continue; }
    lote.items.push({ id: `${norm(src)}|${norm(r.nombre)}`, origen: src, nombre: r.nombre, nivel: +(r.n || 0), tipo, motivos });
  }
}

function main() {
  const args = process.argv.slice(2);
  const iSal = args.indexOf('--salida');
  const salida = iSal >= 0 ? args[iSal + 1] : '../docs/revision-reglas.md';
  const ruta = args.find((a, i) => !a.startsWith('--') && i !== iSal + 1) || '../biblioteca-mi-turno.json';
  const lib = JSON.parse(readFileSync(ruta, 'utf8'));
  const lotes: Lote[] = [];
  const nuevo = (titulo: string, nota?: string) => { const l: Lote = { titulo, items: [], claros: 0, revisados: 0, idsRevisados: [], nota }; lotes.push(l); return l; };

  /* Clase de biblioteca: sus rasgos y los de sus subclases (en la hoja, el origen es el nombre de la clase o subclase) */
  const claseLib = (l: Lote, key: string, subs?: (sk: string) => boolean) => {
    const C = lib.clases[key]; if (!C) return;
    auditar(C.rasgos || [], () => C.n, l);
    Object.entries<any>(C.subclases || {}).filter(([sk]) => !subs || subs(sk)).forEach(([, S]) => auditar(S.rasgos || [], () => S.n, l));
  };
  claseLib(nuevo('Lote 1: Cazador de Sangre (clase y sus 4 órdenes)', 'Fuente: Blood Hunter de Matt Mercer, versión 2022 (v1.1.4, la actual de D&D Beyond: dndbeyond.com/classes/blood-hunter). Donde la biblioteca trae otro rasgo en ese nivel, la regla lo renombra con el oficial (se indica con →).'), 'lib:cazador-sangre');
  claseLib(nuevo('Lote 2: Arcanista (clase y sus 5 subclases)', 'Fuente: Artífice de Eberron: Forge of the Artificer (2025), vía los datos de 5etools (fuente EFA). Las subclases valen también para el Artífice de las reglas (clases.ts).'), 'lib:arcanista');
  claseLib(nuevo('Lote 3: Pugilista (clase y sus 8 clubes)', 'Fuente: The Pugilist Class 2024 (Benjamin Huffman, v1.0.0), aplicada a la biblioteca con scripts/actualizar-clase.ts. Arena Royale y Matones Sabuesos solo existen en la versión de 2014 (Patreon) y se revisaron con ella. Santo Callejero es nuevo de 2024.'), 'lib:pugilista');

  const l4 = nuevo('Lote 4: especies');
  l4.titulo = 'Lote 4: especies (actualizadas a su versión más reciente)';
  const especies = Object.entries<any>(lib.especies).filter(([k]) => !BESTIAS_COLADAS.includes(k));
  l4.nota = `${especies.length} especies (sin las ${BESTIAS_COLADAS.length} bestias que se colaron al importar), puestas al día en la biblioteca con scripts/datos/especies-2025.ts: Ravenloft 2025, Eberron 2025, Monsters of the Multiverse y los libros de origen de las demás. Cambion no tiene versión oficial jugable y se dejó con el texto de la biblioteca. Se quitaron rasgos que la versión nueva ya no trae (p. ej. Naturaleza Imperecedera del Dhampiro, Bolsillos de Kender) y se agregaron los que faltaban (resistencias, Linaje Feérico, Constitución Poderosa, habilidades...).`;
  especies.forEach(([, E]) => auditar(E.rasgos || [], r => (r.sub && E.subs?.[r.sub]?.n) || E.n, l4));

  /* Clases del manual: subclases de la biblioteca y rasgos de nivel alto que trae la biblioteca */
  let n = 5;
  for (const k of Object.keys(CLASES)) {
    const C = lib.clases[k]; if (!C) continue;
    const l = nuevo(`Lote ${n}: ${CLASES[k].n} (subclases y rasgos de nivel alto de la biblioteca)`);
    auditar(C.rasgosAltos || [], () => CLASES[k].n, l);
    Object.entries<any>(C.subclases || {}).forEach(([, S]) => auditar(S.rasgos || [], () => S.n, l));
    Object.entries<any>(C.subAltos || {}).forEach(([sk, rs]) => auditar(rs, () => SUBCLASES.find((s: any) => s.key === sk)?.n || sk, l));
    if (l.items.length + l.claros + l.revisados) n++; else lotes.pop();
  }

  /* Dotes: su tipo se guarda al importar, no se recalcula */
  const dotes = (cat: string) => Object.values<any>(lib.dotes).filter(d => norm(d.cat || '') === cat).map(d => ({ ...d, nombre: d.n, n: d.nivelMin }));
  const tipoGuardado = (r: Rasgo) => r.t || 'pasiva';
  auditar(dotes('general'), () => 'Dote general', nuevo(`Lote ${n++}: dotes generales`), tipoGuardado);
  nuevo(`Lote ${n++}: dotes de estilo de combate`, 'La biblioteca no trae ninguna: el importador las descarta y los estilos salen de las reglas (estilos.ts), que ya tienen su tipo fijo.');
  auditar(dotes('epica'), () => 'Dote épica', nuevo(`Lote ${n++}: dotes épicas`), tipoGuardado);

  /* Conserva lo ya marcado si el archivo existe */
  const previas = new Map<string, string>();
  if (existsSync(salida)) for (const linea of readFileSync(salida, 'utf8').split('\n')) {
    const m = linea.match(/^- \[x\].*<!-- (.+?) -->/); if (m) previas.set(m[1], linea);
  }

  const total = lotes.reduce((s, l) => s + l.items.length, 0);
  const md = [
    '# Revisión de reglas de la biblioteca',
    '',
    'Rasgos de la biblioteca sin regla revisada en `web/src/features/reglas/data/reglas-revisadas.ts` cuyo tipo es dudoso:',
    'el clasificador los deja como pasiva aunque su texto sugiere que se activan, o su texto no menciona ningún tipo de acción.',
    '',
    `Generado con \`npx tsx scripts/auditar-reglas.ts\` (desde \`web/\`). Pendientes al generar: ${total}.`,
    'Al marcar una casilla, agrega al final una nota corta con la fuente si hubo que investigar.',
    '',
  ];
  /* Selectores: elecciones que se hacen al crear o subir de nivel y cambian la hoja */
  md.push('## Selectores', '', 'Elecciones que se hacen al crear el personaje o al subir de nivel y cambian la hoja; se eligen en el paso Clase o en el diálogo de subida.',
    'Las que se deciden al usar el rasgo (a quién, qué efecto) no llevan selector: salen como opciones en tu turno.', '');
  let grupo = '';
  for (const s of SELECTORES) {
    if (s.donde !== grupo) { if (grupo) md.push(''); grupo = s.donde; md.push(`### ${grupo}`, ''); }
    const id = `selector|${s.id}`;
    md.push(previas.get(id) ?? `- [${s.hecho ? 'x' : ' '}] **${s.que}**: ${s.detalle} <!-- ${id} -->`);
    previas.delete(id);
  }
  md.push('');
  /* Lo que falta de D&D Beyond: se agrega en el lote de su clase, en su versión oficial más reciente */
  md.push('## Por agregar (faltan respecto a D&D Beyond)', '', 'Se agregan en el lote de su clase, con su versión oficial más reciente. Las marcadas con «no se agrega» ya las reemplazó el contenido de 2024.', '');
  grupo = '';
  for (const a of POR_AGREGAR) {
    if (a.lote !== grupo) { if (grupo) md.push(''); grupo = a.lote; md.push(`### ${grupo}`, ''); }
    const id = `agregar|${norm(a.que)}`;
    md.push(previas.get(id) ?? `- [${a.no ? 'x' : ' '}] **${a.que}** (${a.libro})${a.no ? `: no se agrega, ${a.no}` : ''} <!-- ${id} -->`);
    previas.delete(id);
  }
  md.push('');
  for (const l of lotes) {
    md.push(`## ${l.titulo}`, '');
    if (l.nota) md.push(l.nota, '');
    md.push(`Dudosos: ${l.items.length}. Con tipo claro: ${l.claros}. Ya revisados: ${l.revisados}.`, '');
    let origen = '';
    for (const it of l.items) {
      if (it.origen !== origen) { if (origen) md.push(''); origen = it.origen; md.push(`### ${origen}`, ''); }
      md.push(previas.get(it.id) ?? `- [ ] **${it.nombre}**${it.nivel > 1 ? ` (nivel ${it.nivel})` : ''}: hoy \`${it.tipo}\`, ${it.motivos.join('; ')} <!-- ${it.id} -->`);
      previas.delete(it.id);
    }
    /* Lo ya revisado y marcado sigue en su lote */
    const hechos = l.idsRevisados.filter(id => previas.has(id));
    if (hechos.length) { md.push('', '### Revisados', ''); hechos.forEach(id => { md.push(previas.get(id)!); previas.delete(id); }); }
    md.push('');
  }
  if (previas.size) md.push('## Revisados en pasadas anteriores', '', ...previas.values(), '');
  mkdirSync(dirname(salida), { recursive: true });
  writeFileSync(salida, md.join('\n'));
  console.log(lotes.map(l => `${l.titulo}: ${l.items.length}`).join('\n'));
  console.log(`Total: ${total} -> ${salida}`);
}

main();
