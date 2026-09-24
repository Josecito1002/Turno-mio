/* Especies de la biblioteca puestas al día con su versión oficial más reciente (Lote 4).
   Fuentes: Ravenloft 2025 (RHW), Eberron: Forge of the Artificer 2025 (EFA), Monsters of the Multiverse (MPMM),
   Astral Adventurer's Guide (AAG), Strixhaven (SCC), Theros (MOT), Ravnica (GGR), Acquisitions Inc. (AI),
   Locathah Rising (LR), One Grung Above (OGA), Zendikar (PSZ) y Dragonlance (DSotDQ). Textos propios en español.
   Cada rasgo lleva `manual: true`: su tipo es el revisado y el clasificador automático no lo cambia.
   `habs` son habilidades fijas que da la especie; `habsElegir`, cuántas se eligen en el paso Habilidades.
   Lo aplica scripts/actualizar-clase.ts (opción "especies"). */

type R = { nombre: string; t: string; texto: string; manual: true; usos: number | string; reset: string; n?: number; sub?: string; habs?: string[] };
const r = (nombre: string, t: string, texto: string, extra: Partial<R> = {}): R => ({ nombre, t, texto, manual: true, usos: 0, reset: 'largo', ...extra });
const pb = { usos: 'pb', reset: 'largo' };
const ahi = 'Usa INT, SAB o CAR (la que elijas al crear el personaje)';
const linaje = r('Linaje Feérico', 'pasiva', 'Ventaja en las salvaciones para no quedar Hechizado o dejar de estarlo.');
const trance = (extra: string) => r('Trance', 'fuera', `No necesitas dormir y la magia no puede dormirte. Terminas un descanso largo en 4 horas de meditación consciente; al acabarla ${extra}.`);
const sentidos = r('Sentidos Agudos', 'pasiva', 'Competencia en Percepción (ya sumada).', { habs: ['Percepción'] });
const vision = (pies: number) => r('Visión en la Oscuridad', 'pasiva', `Ves en la oscuridad a ${pies} pies (en tonos de gris), y en penumbra como con luz brillante.`);

export type EspecieAct = { vel: number; vision: number; src: string; rasgos: R[]; habsElegir?: number; habsNota?: string; subs?: Record<string, { n: string }> };

export const ESPECIES_2025: Record<string, EspecieAct> = {
  dhampiro: { vel: 35, vision: 60, src: 'Ravenloft (2025)', rasgos: [
    vision(60),
    r('Trepar como Araña', 'pasiva', 'Velocidad de trepar igual a tu velocidad. Desde nivel 3 puedes moverte por paredes y techos con las manos libres.'),
    r('Rastro de No Muerte', 'pasiva', 'Resistencia al daño necrótico.'),
    r('Mordisco Vampírico', 'gratis', 'Cuando das un golpe sin armas y haces daño, puedes morder: tu mordisco hace 1d4 + tu modificador de Constitución de daño perforante. Contra una criatura que no sea constructo ni muerto viviente, puedes potenciarte: Drenar (recuperas esos PG) o Fortalecer (sumas ese daño a tu próxima prueba o ataque en el siguiente minuto).', pb),
  ] },
  renacido: { vel: 30, vision: 0, src: 'Ravenloft (2025)', habsElegir: 1, habsNota: 'Conocimiento de Vida Pasada', rasgos: [
    r('Escapaste de la Muerte', 'pasiva', 'Ventaja en las salvaciones contra la muerte.'),
    r('Eterno', 'fuera', 'No ganas agotamiento por deshidratación, hambre ni asfixia. No duermes y la magia no puede dormirte; terminas un descanso largo en 4 horas inmóvil y consciente.'),
    r('Conocimiento de Vida Pasada', 'gratis', 'Competencia en una habilidad a tu elección (márcala en Habilidades). Cuando fallas una prueba de característica, sumas 1d6 a la tirada.', pb),
    r('Resistencia Extraña', 'pasiva', 'Resistencia a un tipo de daño a tu elección: frío, necrótico o veneno.'),
  ] },
  cambion: { vel: 30, vision: 0, src: 'Sin versión oficial (texto de tu biblioteca)', rasgos: [
    r('Instinto Cambiante', 'pasiva', 'Competencia en dos habilidades entre Engaño, Perspicacia, Intimidación o Persuasión (márcalas en Habilidades).'),
    r('Cambiar de Forma', 'accion', 'Alteras tu apariencia para parecerte a otra criatura Mediana o Pequeña de forma similar a la tuya.'),
  ], habsElegir: 2, habsNota: 'Instinto Cambiante' },
  fata: { vel: 30, vision: 0, src: 'Monsters of the Multiverse', rasgos: [
    r('Tipo de Criatura', 'pasiva', 'Eres un Feérico, no un Humanoide.'),
    r('Vuelo', 'pasiva', 'Velocidad de vuelo igual a tu velocidad, si no llevas armadura media ni pesada.'),
    r('Magia Feérica', 'accion', `Conoces el truco Druidismo. Desde nivel 3 lanzas Fuego feérico y desde nivel 5 Agrandar/Reducir, una vez cada uno por descanso largo sin espacio (o con tus espacios). ${ahi}.`),
  ] },
  firbolg: { vel: 30, vision: 0, src: 'Monsters of the Multiverse', rasgos: [
    r('Magia Firbolg', 'accion', `Lanzas Detectar magia y Disfrazarse (puedes parecer hasta 3 pies más alto o bajo), una vez cada uno por descanso largo sin espacio (o con tus espacios). ${ahi}.`),
    r('Paso Oculto', 'adicional', 'Te vuelves invisible hasta el inicio de tu próximo turno o hasta que ataques, hagas una tirada de daño u obligues a alguien a una salvación.', pb),
    r('Constitución Poderosa', 'pasiva', 'Cuentas como un tamaño más grande para la capacidad de carga y el peso que puedes empujar, arrastrar o levantar.'),
    r('Habla de Bestia y Hoja', 'pasiva', 'Las bestias y las plantas entienden lo que les dices (tú no las entiendes a ellas) y tienes ventaja en las pruebas de CAR para influirlas.'),
  ] },
  'genasi-agua': { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60),
    r('Resistencia al Ácido', 'pasiva', 'Resistencia al daño de ácido.'),
    r('Anfibio', 'pasiva', 'Respiras aire y agua, y tienes velocidad de nadar igual a tu velocidad.'),
    r('Llamada de la Ola', 'accion', `Conoces el truco Salpicadura de ácido. Desde nivel 3 lanzas Crear o destruir agua y desde nivel 5 Caminar sobre el agua, una vez cada uno por descanso largo sin espacio (o con tus espacios). ${ahi}.`),
  ] },
  'genasi-fuego': { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60),
    r('Resistencia al Fuego', 'pasiva', 'Resistencia al daño de fuego.'),
    r('Alcanzar la Llama', 'accion', `Conoces el truco Producir llama. Desde nivel 3 lanzas Manos ardientes y desde nivel 5 Hoja de fuego, una vez cada uno por descanso largo sin espacio (o con tus espacios). ${ahi}.`),
  ] },
  'genasi-tierra': { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60),
    r('Caminar sobre la Tierra', 'pasiva', 'El terreno difícil no te cuesta movimiento extra si te mueves a pie por el suelo.'),
    r('Fundirse con la Piedra', 'adicional', `Conoces el truco Custodia de la hoja y puedes lanzarlo con acción adicional (usos igual a tu competencia por descanso largo). Desde nivel 5 lanzas Pasar sin rastro una vez por descanso largo sin espacio. ${ahi}.`, pb),
  ] },
  'genasi-aire': { vel: 35, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60),
    r('Aliento Infinito', 'pasiva', 'Puedes contener la respiración indefinidamente mientras no estés Incapacitado.'),
    r('Resistencia al Relámpago', 'pasiva', 'Resistencia al daño de relámpago.'),
    r('Fundirse con el Viento', 'accion', `Conoces el truco Agarre electrizante. Desde nivel 3 lanzas Caída de pluma y desde nivel 5 Levitar, una vez cada uno por descanso largo sin espacio (o con tus espacios). ${ahi}.`),
  ] },
  githyanki: { vel: 30, vision: 0, src: 'Monsters of the Multiverse', rasgos: [
    r('Conocimiento Astral', 'fuera', 'Al terminar un descanso largo ganas competencia en una habilidad y en un arma o herramienta a tu elección, hasta tu siguiente descanso largo.'),
    r('Psiónica Githyanki', 'accion', `Conoces el truco Mano de mago (la mano es invisible). Desde nivel 3 lanzas Saltar y desde nivel 5 Paso brumoso (acción adicional), una vez cada uno por descanso largo sin espacio (o con tus espacios). ${ahi}.`),
    r('Resiliencia Psíquica', 'pasiva', 'Resistencia al daño psíquico.'),
  ] },
  githzerai: { vel: 30, vision: 0, src: 'Monsters of the Multiverse', rasgos: [
    r('Psiónica Githzerai', 'accion', `Conoces el truco Mano de mago (la mano es invisible). Desde nivel 3 lanzas Escudo (reacción) y desde nivel 5 Detectar pensamientos, una vez cada uno por descanso largo sin espacio (o con tus espacios). ${ahi}.`),
    r('Disciplina Mental', 'pasiva', 'Ventaja en las salvaciones para no quedar Hechizado o Asustado, o dejar de estarlo.'),
    r('Resiliencia Psíquica', 'pasiva', 'Resistencia al daño psíquico.'),
  ] },
  goblin: { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60), linaje,
    r('Furia de los Pequeños', 'gratis', 'Una vez por turno, cuando dañas con un ataque o conjuro a una criatura más grande que tú, le haces daño extra igual a tu competencia.', pb),
    r('Escape Ágil', 'adicional', 'Destrabarte o Esconderte en cada uno de tus turnos.'),
  ] },
  hobgoblin: { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60), linaje,
    r('Don Feérico', 'adicional', 'Usas la acción Ayudar. Desde nivel 3 eliges además: Hospitalidad (tú y quien ayudas ganáis 1d6 + competencia PG temporales), Paso (los dos tenéis +10 pies de velocidad hasta tu próximo turno) o Rencor (el primer objetivo que acierte quien ayudas tiene desventaja en su siguiente ataque).', pb),
    r('Fortuna de los Muchos', 'gratis', 'Si fallas un ataque, una prueba o una salvación, sumas +1 por cada aliado que veas a 30 pies (máximo +3).', pb),
  ] },
  kenku: { vel: 30, vision: 0, src: 'Monsters of the Multiverse', habsElegir: 2, habsNota: 'Memoria Kenku', rasgos: [
    r('Duplicación Experta', 'pasiva', 'Ventaja en las pruebas para copiar exactamente un escrito o una obra artesanal.'),
    r('Memoria Kenku', 'gratis', 'Competencia en dos habilidades a tu elección (márcalas en Habilidades). Antes de tirar una prueba con una habilidad en la que eres competente, puedes darte ventaja.', pb),
    r('Mimetismo', 'pasiva', 'Imitas con precisión sonidos y voces que hayas oído; notar que es una imitación pide una prueba de Perspicacia contra CD 8 + competencia + CAR.'),
  ] },
  kobold: { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60),
    r('Grito Dracónico', 'adicional', 'Gritas a los enemigos a 10 pies: hasta el inicio de tu próximo turno, tú y tus aliados tenéis ventaja en los ataques contra los que te oyeron.', pb),
    r('Legado Kobold', 'pasiva', `Eliges un legado: Astucia (competencia en Arcanos, Investigación, Medicina, Juego de Manos o Supervivencia), Desafío (ventaja contra quedar Asustado) o Hechicería Dracónica (un truco de hechicero; ${ahi.toLowerCase()}).`),
  ] },
  'hombre-lagarto': { vel: 30, vision: 0, src: 'Monsters of the Multiverse', habsElegir: 2, habsNota: 'Intuición Natural', rasgos: [
    r('Nadador', 'pasiva', 'Velocidad de nadar igual a tu velocidad. Aguantas la respiración hasta 15 minutos.'),
    r('Mordisco', 'pasiva', 'Tus fauces son un arma natural: tus golpes sin armas con ellas hacen 1d6 + FUE de daño cortante.'),
    r('Fauces Hambrientas', 'adicional', 'Haces un ataque especial con tu Mordisco; si aciertas, además de su daño ganas PG temporales iguales a tu competencia.', pb),
    r('Armadura Natural', 'pasiva', 'Sin armadura, tu CA base es 13 + tu modificador de Destreza; puedes usar escudo.'),
    r('Intuición Natural', 'pasiva', 'Competencia en dos de estas habilidades (márcalas en Habilidades): Trato con Animales, Medicina, Naturaleza, Percepción, Sigilo o Supervivencia.'),
  ] },
  minotauro: { vel: 30, vision: 0, src: 'Monsters of the Multiverse', rasgos: [
    r('Cuernos', 'pasiva', 'Tus cuernos son un arma natural: tus golpes sin armas con ellos hacen 1d6 + FUE de daño perforante.'),
    r('Embestida', 'adicional', 'Justo después de usar Correr en tu turno y moverte al menos 20 pies, haces un ataque cuerpo a cuerpo con tus cuernos.'),
    r('Cuernos Martilleantes', 'adicional', 'Justo después de acertar a una criatura cuerpo a cuerpo con la acción Atacar, intentas empujarla 10 pies (a 5 pies y como mucho un tamaño más grande): salvación de FUE contra CD 8 + competencia + FUE.'),
    r('Memoria del Laberinto', 'pasiva', 'Siempre sabes dónde está el norte y tienes ventaja en Supervivencia para orientarte o rastrear.'),
  ] },
  satiro: { vel: 35, vision: 0, src: 'Monsters of the Multiverse', rasgos: [
    r('Tipo de Criatura', 'pasiva', 'Eres un Feérico, no un Humanoide.'),
    r('Topetazo', 'pasiva', 'Tu cabeza y tus cuernos son un arma natural: tus golpes sin armas con ellos hacen 1d6 + FUE de daño contundente.'),
    r('Resistencia Mágica', 'pasiva', 'Ventaja en las salvaciones contra conjuros.'),
    r('Saltos Alegres', 'pasiva', 'Cuando saltas, sumas 1d8 pies a la distancia (cuesta movimiento como siempre).'),
    r('Juerguista', 'pasiva', 'Competencia en Interpretación y Persuasión (ya sumadas) y en un instrumento musical.', { habs: ['Interpretación', 'Persuasión'] }),
  ] },
  'cambiante-shifter': { vel: 30, vision: 60, src: 'Eberron: Forge of the Artificer (2025)', habsElegir: 1, habsNota: 'Instintos Bestiales',
    subs: { 'piel-piedra': { n: 'Piel de Bestia' }, 'garras-largas': { n: 'Colmillo Largo' }, 'cazador-veloz': { n: 'Zancada Veloz' }, 'cazador-salvaje': { n: 'Caza Salvaje' } },
    rasgos: [
      vision(60),
      r('Instintos Bestiales', 'pasiva', 'Competencia en una de estas habilidades (márcala en Habilidades): Acrobacias, Atletismo, Intimidación o Supervivencia.'),
      r('Cambiar', 'adicional', 'Tomas un aspecto bestial durante 1 minuto (vuelves antes con acción adicional) y ganas PG temporales iguales al doble de tu competencia, más el beneficio de tu variante.', pb),
      r('Piel de Bestia', 'pasiva', 'Al cambiar ganas 1d6 PG temporales más y, mientras dura, +1 a la CA.', { sub: 'piel-piedra' }),
      r('Colmillo Largo', 'adicional', 'Al cambiar, y con acción adicional en tus otros turnos mientras dura, das un mordisco (golpe sin armas) que hace 1d6 + FUE de daño perforante.', { sub: 'garras-largas' }),
      r('Zancada Veloz', 'reaccion', 'Mientras dura el cambio tienes +10 pies de velocidad, y cuando una criatura termina su turno a 5 pies de ti te mueves hasta 10 pies sin provocar ataques de oportunidad.', { sub: 'cazador-veloz' }),
      r('Caza Salvaje', 'pasiva', 'Mientras dura el cambio tienes ventaja en las pruebas de SAB y nadie a 30 pies puede tener ventaja al atacarte, salvo que estés Incapacitado.', { sub: 'cazador-salvaje' }),
    ] },
  tabaxi: { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60),
    r('Garras de Gato', 'pasiva', 'Velocidad de trepar igual a tu velocidad. Tus garras son un arma natural: tus golpes sin armas con ellas hacen 1d6 + FUE de daño cortante.'),
    r('Talento Felino', 'pasiva', 'Competencia en Percepción y Sigilo (ya sumadas).', { habs: ['Percepción', 'Sigilo'] }),
    r('Agilidad Felina', 'gratis', 'Al moverte en tu turno durante un combate, duplicas tu velocidad hasta el final del turno. No puedes repetirlo hasta un turno en que te muevas 0 pies.'),
  ] },
  tortle: { vel: 30, vision: 0, src: 'Monsters of the Multiverse', habsElegir: 1, habsNota: 'Intuición Natural', rasgos: [
    r('Garras', 'pasiva', 'Tus garras son un arma natural: tus golpes sin armas con ellas hacen 1d6 + FUE de daño cortante.'),
    r('Aguantar la Respiración', 'pasiva', 'Aguantas la respiración hasta 1 hora.'),
    r('Armadura Natural', 'pasiva', 'Tu caparazón te da una CA base de 17 (la DES no suma). No puedes llevar armadura, pero sí escudo.'),
    r('Intuición Natural', 'pasiva', 'Competencia en una de estas habilidades (márcala en Habilidades): Trato con Animales, Medicina, Naturaleza, Percepción, Sigilo o Supervivencia.'),
    r('Defensa del Caparazón', 'accion', 'Te metes en el caparazón: +4 a la CA y ventaja en salvaciones de FUE y CON, pero quedas Derribado, con velocidad 0, desventaja en salvaciones de DES y sin reacciones. Solo puedes salir, con acción adicional.'),
  ] },
  triton: { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60),
    r('Anfibio', 'pasiva', 'Respiras aire y agua, y tienes velocidad de nadar igual a tu velocidad.'),
    r('Controlar el Aire y el Agua', 'accion', `Lanzas Nube de niebla; desde nivel 3 también Ráfaga de viento y desde nivel 5 Caminar sobre el agua, una vez cada uno por descanso largo sin espacio (o con tus espacios). ${ahi}.`),
    r('Emisario del Mar', 'pasiva', 'Comunicas ideas sencillas a bestias, elementales y monstruosidades con velocidad de nadar.'),
    r('Guardián de las Profundidades', 'pasiva', 'Resistencia al daño de frío.'),
  ] },
  'yuan-ti': { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60),
    r('Resistencia Mágica', 'pasiva', 'Ventaja en las salvaciones contra conjuros.'),
    r('Resiliencia al Veneno', 'pasiva', 'Ventaja en las salvaciones para no quedar Envenenado o dejar de estarlo, y resistencia al daño de veneno.'),
    r('Magia Serpentina', 'accion', `Conoces el truco Rociada venenosa y lanzas Hablar con los animales sin límite, solo con serpientes. Desde nivel 3 lanzas Sugestión una vez por descanso largo sin espacio (o con tus espacios). ${ahi}.`),
  ] },
  bugbear: { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60), linaje,
    r('Extremidades Largas', 'pasiva', 'En tu turno, tus ataques cuerpo a cuerpo tienen 5 pies más de alcance.'),
    r('Constitución Poderosa', 'pasiva', 'Cuentas como un tamaño más grande para la capacidad de carga y el peso que puedes empujar, arrastrar o levantar.'),
    r('Sigiloso', 'pasiva', 'Competencia en Sigilo (ya sumada). Puedes moverte y quedarte, sin apretarte, en un espacio para una criatura Pequeña.', { habs: ['Sigilo'] }),
    r('Ataque Sorpresa', 'gratis', 'Si aciertas con una tirada de ataque a una criatura que aún no ha actuado en este combate, recibe 2d6 de daño extra.'),
  ] },
  centauro: { vel: 40, vision: 0, src: 'Monsters of the Multiverse', habsElegir: 1, habsNota: 'Afinidad Natural', rasgos: [
    r('Tipo de Criatura', 'pasiva', 'Eres un Feérico, no un Humanoide.'),
    r('Cascos', 'pasiva', 'Tus cascos son un arma natural: tus golpes sin armas con ellos hacen 1d6 + FUE de daño contundente.'),
    r('Carga', 'adicional', 'Si te mueves al menos 30 pies en línea recta hacia un objetivo y lo aciertas con un ataque cuerpo a cuerpo con arma ese turno, lo atacas además con tus cascos.'),
    r('Complexión Equina', 'pasiva', 'Cuentas como un tamaño más grande para la carga, pero escalar con manos y pies te cuesta 4 pies extra por cada pie.'),
    r('Afinidad Natural', 'pasiva', 'Competencia en una de estas habilidades (márcala en Habilidades): Trato con Animales, Medicina, Naturaleza o Supervivencia.'),
  ] },
  owlin: { vel: 30, vision: 120, src: 'Strixhaven', rasgos: [
    vision(120),
    r('Vuelo', 'pasiva', 'Velocidad de vuelo igual a tu velocidad, si no llevas armadura media ni pesada.'),
    r('Plumas Silenciosas', 'pasiva', 'Competencia en Sigilo (ya sumada).', { habs: ['Sigilo'] }),
  ] },
  leonin: { vel: 35, vision: 60, src: 'Theros', habsElegir: 1, habsNota: 'Instintos de Cazador', rasgos: [
    vision(60),
    r('Garras', 'pasiva', 'Tus garras son un arma natural: tus golpes sin armas con ellas hacen 1d4 + FUE de daño cortante.'),
    r('Instintos de Cazador', 'pasiva', 'Competencia en una de estas habilidades (márcala en Habilidades): Atletismo, Intimidación, Percepción o Supervivencia.'),
    r('Rugido Intimidante', 'adicional', 'Las criaturas que elijas a 10 pies que te oigan hacen una salvación de SAB (CD 8 + competencia + CON) o quedan Asustadas de ti hasta el final de tu próximo turno.', { usos: 1, reset: 'corto' }),
  ] },
  harengon: { vel: 30, vision: 0, src: 'Monsters of the Multiverse', rasgos: [
    r('Gatillo de Liebre', 'pasiva', 'Sumas tu competencia a la iniciativa (ya sumada).'),
    r('Sentidos Leporinos', 'pasiva', 'Competencia en Percepción (ya sumada).', { habs: ['Percepción'] }),
    r('Pies con Suerte', 'reaccion', 'Cuando fallas una salvación de DES, sumas 1d4 a la tirada. No funciona si estás Derribado o tu velocidad es 0.'),
    r('Salto de Conejo', 'adicional', 'Saltas 5 × tu competencia en pies sin provocar ataques de oportunidad, si tu velocidad es mayor que 0.', pb),
  ] },
  kalashtar: { vel: 30, vision: 0, src: 'Eberron: Forge of the Artificer (2025)', rasgos: [
    r('Mente Dual', 'pasiva', 'Ventaja en las salvaciones de SAB y CAR.'),
    r('Disciplina Mental', 'pasiva', 'Resistencia al daño psíquico.'),
    r('Vínculo Mental', 'accion', 'Tienes telepatía con un alcance de 10 pies por nivel. Mientras hablas así con una criatura, con acción mágica le das la capacidad de responderte telepáticamente durante 1 hora.'),
    r('Separado de los Sueños', 'fuera', 'No pueden elegirte como objetivo del conjuro Sueño. Al terminar un descanso largo ganas competencia en una habilidad a tu elección hasta el siguiente.'),
  ] },
  verdan: { vel: 30, vision: 0, src: 'Acquisitions Incorporated', rasgos: [
    r('Crecimiento Repentino', 'pasiva', 'Eres Pequeño en nivel 1 y pasas a Mediano en nivel 5.'),
    r('Curación de Sangre Negra', 'fuera', 'Al gastar dados de golpe en un descanso corto, repites los 1 y 2 (y te quedas con la nueva tirada).'),
    r('Telepatía Limitada', 'pasiva', 'Hablas telepáticamente con cualquier criatura que veas a 30 pies y entienda algún idioma; solo ideas sencillas.'),
    r('Persuasivo', 'pasiva', 'Competencia en Persuasión (ya sumada).', { habs: ['Persuasión'] }),
    r('Perspicacia Telepática', 'pasiva', 'Ventaja en las salvaciones de SAB y CAR.'),
  ] },
  loxodon: { vel: 30, vision: 0, src: 'Ravnica', rasgos: [
    r('Constitución Poderosa', 'pasiva', 'Cuentas como un tamaño más grande para la capacidad de carga y el peso que puedes empujar, arrastrar o levantar.'),
    r('Serenidad Loxodon', 'pasiva', 'Ventaja en las salvaciones contra quedar Hechizado o Asustado.'),
    r('Armadura Natural', 'pasiva', 'Sin armadura, tu CA es 12 + tu modificador de Constitución; puedes usar escudo.'),
    r('Trompa', 'pasiva', 'Tu trompa agarra cosas (alcance 5 pies, levanta 5 × tu FUE en libras) y te sirve de tubo para respirar. Con ella levantas, sueltas, empujas o tiras de objetos y criaturas, abres puertas, agarras o das golpes sin armas; no empuña armas ni escudos.'),
    r('Olfato Agudo', 'pasiva', 'Ventaja en Percepción, Supervivencia e Investigación que dependan del olfato.'),
  ] },
  'hibrido-simic': { vel: 30, vision: 60, src: 'Ravnica', rasgos: [
    vision(60),
    r('Mejora Animal', 'pasiva', 'Eliges una mejora en nivel 1: Planeo de Manta, Trepador Ágil o Adaptación Submarina. Elígela en el paso Especie.'),
    r('Mejora Animal Avanzada', 'pasiva', 'En nivel 5 eliges otra mejora: una de nivel 1 que no tengas, Apéndices Prensiles, Caparazón o Escupir Ácido. Elígela en el paso Especie.', { n: 5 }),
  ] },
  'sangre-bruja': { vel: 30, vision: 60, src: 'Ravenloft (2025)', rasgos: [
    vision(60),
    r('Símbolo Inquietante', 'adicional', 'Creas un talismán con un mechón o una uña. Mientras exista (hasta tu siguiente descanso largo), a 10 millas puedes enviar con acción mágica un mensaje telepático de 25 palabras a quien lo lleve, o ver y oír a través de él durante 1 minuto (al terminar, se destruye).', { usos: 1, reset: 'largo' }),
    r('Magia de Maleficio', 'accion', `Siempre tienes preparados Disfrazarse y Maleficio; lanzas cada uno una vez por descanso largo sin espacio (o con tus espacios). ${ahi}.`),
  ] },
  eladrin: { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60), linaje, sentidos,
    r('Paso Feérico', 'adicional', 'Te teletransportas hasta 30 pies a un espacio que veas. Desde nivel 3 añade el efecto de tu estación (salvación contra CD 8 + competencia + INT, SAB o CAR): Otoño (hasta dos criaturas a 10 pies quedan Hechizadas 1 minuto), Invierno (una criatura a 5 pies antes de irte queda Asustada hasta tu próximo turno), Primavera (teletransportas a una criatura voluntaria a 5 pies en vez de a ti) o Verano (quienes elijas a 5 pies al llegar reciben fuego igual a tu competencia).', pb),
    trance('puedes cambiar de estación y ganar competencia en dos armas o herramientas hasta tu siguiente descanso largo'),
  ] },
  'elfo-marino': { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60), linaje, sentidos,
    r('Hijo del Mar', 'pasiva', 'Respiras aire y agua, tienes velocidad de nadar igual a tu velocidad y resistencia al daño de frío.'),
    r('Amigo del Mar', 'pasiva', 'Comunicas ideas sencillas a cualquier bestia con velocidad de nadar.'),
    trance('ganas competencia en dos armas o herramientas hasta tu siguiente descanso largo'),
  ] },
  'shadar-kai': { vel: 30, vision: 60, src: 'Monsters of the Multiverse', rasgos: [
    vision(60), linaje, sentidos,
    r('Bendición de la Reina Cuervo', 'adicional', 'Te teletransportas hasta 30 pies a un espacio que veas. Desde nivel 3, además, tienes resistencia a todo el daño hasta el inicio de tu próximo turno.', pb),
    r('Resistencia Necrótica', 'pasiva', 'Resistencia al daño necrótico.'),
    trance('ganas competencia en dos armas o herramientas hasta tu siguiente descanso largo'),
  ] },
  'elfo-astral': { vel: 30, vision: 60, src: 'Astral Adventurer\'s Guide', rasgos: [
    vision(60), linaje, sentidos,
    r('Fuego Astral', 'accion', `Conoces un truco a tu elección: Luces danzantes, Luz o Llama sagrada. ${ahi}.`),
    r('Paso de Luz Estelar', 'adicional', 'Te teletransportas hasta 30 pies a un espacio que veas.', pb),
    r('Trance Astral', 'fuera', 'No necesitas dormir y la magia no puede dormirte. Terminas un descanso largo en 4 horas de meditación; al acabarla ganas competencia en una habilidad y en un arma o herramienta a tu elección hasta el siguiente.'),
  ] },
  plasmoide: { vel: 30, vision: 60, src: 'Astral Adventurer\'s Guide', rasgos: [
    vision(60),
    r('Tipo de Criatura', 'pasiva', 'Eres un Cieno, no un Humanoide.'),
    r('Amorfo', 'pasiva', 'Pasas por huecos de 1 pulgada si no llevas nada encima, y tienes ventaja en las pruebas para iniciar un agarre o escapar de uno.'),
    r('Aguantar la Respiración', 'pasiva', 'Aguantas la respiración hasta 1 hora.'),
    r('Resiliencia Natural', 'pasiva', 'Resistencia al daño de ácido y veneno, y ventaja en las salvaciones contra quedar Envenenado.'),
    r('Moldearte', 'accion', 'Te das forma humanoide (y puedes llevar ropa y armadura) o vuelves a ser una masa. Con acción adicional sacas o recoges un seudópodo de 10 pies con el que manipulas objetos o abres puertas y contenedores; no empuña armas.'),
  ] },
  giff: { vel: 30, vision: 0, src: 'Astral Adventurer\'s Guide', rasgos: [
    r('Nadador', 'pasiva', 'Velocidad de nadar igual a tu velocidad.'),
    r('Chispa Astral', 'gratis', 'Una vez por turno, al acertar con un arma sencilla o marcial, haces daño de fuerza extra igual a tu competencia.', pb),
    r('Maestría con Armas de Fuego', 'pasiva', 'Competencia con todas las armas de fuego; ignoras su propiedad de recarga y atacar a larga distancia con ellas no te da desventaja.'),
    r('Complexión de Hipopótamo', 'pasiva', 'Ventaja en las pruebas y salvaciones de FUE, y cuentas como un tamaño más grande para la carga y el peso que puedes mover.'),
  ] },
  'thri-kreen': { vel: 30, vision: 60, src: 'Astral Adventurer\'s Guide', rasgos: [
    vision(60),
    r('Tipo de Criatura', 'pasiva', 'Eres una Monstruosidad, no un Humanoide.'),
    r('Caparazón Camaleónico', 'pasiva', 'Sin armadura, tu CA base es 13 + tu modificador de Destreza. Con una acción cambias su color al del entorno y tienes ventaja en Sigilo para esconderte allí.'),
    r('Brazos Secundarios', 'pasiva', 'Tus dos brazos pequeños manipulan objetos, abren puertas o recogen algo diminuto, y empuñan armas ligeras.'),
    r('Sin Sueño', 'fuera', 'No duermes: estás consciente durante el descanso largo, aunque debes evitar esforzarte.'),
    r('Telepatía Thri-kreen', 'pasiva', 'No hablas otros idiomas sin magia; transmites tus pensamientos a criaturas voluntarias a 120 pies que entiendan algún idioma.'),
  ] },
  autognomo: { vel: 30, vision: 0, src: 'Astral Adventurer\'s Guide', rasgos: [
    r('Tipo de Criatura', 'pasiva', 'Eres un Constructo, no un Humanoide.'),
    r('Carcasa Blindada', 'pasiva', 'Sin armadura, tu CA base es 13 + tu modificador de Destreza.'),
    r('Hecho para Triunfar', 'gratis', 'Sumas 1d4 a una tirada de ataque, prueba o salvación, después de ver el d20 y antes de saber el resultado.', pb),
    r('Máquina Sanadora', 'pasiva', 'Si te lanzan Reparar, gastas un dado de golpe y recuperas esa tirada + CON. Te afectan Curar heridas, Palabra curativa, sus versiones en masa y Perdonar a los moribundos.'),
    r('Naturaleza Mecánica', 'pasiva', 'Resistencia al daño de veneno, inmunidad a las enfermedades y ventaja contra quedar Paralizado o Envenenado. No comes, bebes ni respiras.'),
    r('Descanso de Centinela', 'fuera', 'Tu descanso largo son 6 horas inmóvil y consciente, en vez de dormir.'),
    r('Diseño Especializado', 'pasiva', 'Competencia con dos herramientas a tu elección.'),
  ] },
  vedalken: { vel: 30, vision: 0, src: 'Ravnica', habsElegir: 1, habsNota: 'Precisión Incansable', rasgos: [
    r('Desapasionamiento Vedalken', 'pasiva', 'Ventaja en las salvaciones de INT, SAB y CAR.'),
    r('Precisión Incansable', 'pasiva', 'Competencia en una de estas habilidades (márcala en Habilidades): Arcanos, Historia, Investigación, Medicina, Interpretación o Juego de Manos, y en una herramienta. Al hacer una prueba con ellas sumas 1d4.'),
    r('Parcialmente Anfibio', 'pasiva', 'Respiras bajo el agua hasta 1 hora; luego no puedes hasta terminar un descanso largo.'),
  ] },
  locathah: { vel: 30, vision: 0, src: 'Locathah Rising', rasgos: [
    r('Nadador', 'pasiva', 'Velocidad de nadar de 30 pies.'),
    r('Armadura Natural', 'pasiva', 'Sin armadura, tu CA es 12 + tu modificador de Destreza; puedes usar escudo.'),
    r('Observador y Atlético', 'pasiva', 'Competencia en Atletismo y Percepción (ya sumadas).', { habs: ['Atletismo', 'Percepción'] }),
    r('Voluntad de Leviatán', 'pasiva', 'Ventaja en las salvaciones contra quedar Hechizado, Asustado, Paralizado, Envenenado, Aturdido o dormido.'),
    r('Anfibio Limitado', 'fuera', 'Respiras aire y agua, pero necesitas sumergirte al menos una vez cada 4 horas o empiezas a asfixiarte.'),
  ] },
  grung: { vel: 25, vision: 0, src: 'One Grung Above', rasgos: [
    r('Trepador', 'pasiva', 'Velocidad de trepar de 25 pies.'),
    r('Alerta Arbórea', 'pasiva', 'Competencia en Percepción (ya sumada).', { habs: ['Percepción'] }),
    r('Anfibio', 'pasiva', 'Respiras aire y agua.'),
    r('Inmunidad al Veneno', 'pasiva', 'Inmune al daño de veneno y a quedar Envenenado.'),
    r('Piel Venenosa', 'gratis', 'Quien te agarre o toque tu piel hace una salvación de CON (CD 12) o queda Envenenado 1 minuto. Puedes untar el veneno en un arma perforante al atacar: si aciertas, salvación de CON (CD 12) o recibe 2d4 de veneno.'),
    r('Salto sin Carrerilla', 'pasiva', 'Saltas hasta 25 pies de largo y 15 de alto, con o sin carrerilla.'),
    r('Dependencia del Agua', 'fuera', 'Si no te sumerges al menos 1 hora al día, ganas un nivel de agotamiento al final del día, que solo quitas con magia o sumergiéndote 1 hora.'),
  ] },
  forjado: { vel: 30, vision: 0, src: 'Eberron: Forge of the Artificer (2025)', rasgos: [
    r('Resiliencia de Constructo', 'pasiva', 'Resistencia al daño de veneno y ventaja en las salvaciones para no quedar Envenenado o dejar de estarlo.'),
    r('Protección Integrada', 'pasiva', 'Tienes +1 a la CA (ya sumado), y nadie puede quitarte la armadura que llevas puesta mientras vivas.'),
    r('Descanso de Centinela', 'fuera', 'No duermes y la magia no puede dormirte. Terminas un descanso largo en 6 horas inmóvil y consciente.'),
    r('Diseño Especializado', 'pasiva', 'Competencia en una habilidad (márcala en Habilidades) y en una herramienta, a tu elección.'),
    r('Incansable', 'pasiva', 'No ganas agotamiento por deshidratación, hambre ni asfixia.'),
  ], habsElegir: 1, habsNota: 'Diseño Especializado' },
  kor: { vel: 30, vision: 0, src: 'Zendikar', rasgos: [
    r('Valiente', 'pasiva', 'Ventaja en las salvaciones contra quedar Asustado.'),
    r('Escalador', 'pasiva', 'Velocidad de trepar de 30 pies si no vas cargado ni llevas armadura pesada.'),
    r('Escalada Kor', 'pasiva', 'Competencia en Atletismo y Acrobacias (ya sumadas).', { habs: ['Atletismo', 'Acrobacias'] }),
    r('Suertudo', 'gratis', 'Cuando sacas 1 en el d20 de un ataque, una prueba o una salvación, repites la tirada y te quedas con la nueva.'),
  ] },
  hadozee: { vel: 30, vision: 0, src: 'Astral Adventurer\'s Guide', rasgos: [
    r('Trepador', 'pasiva', 'Velocidad de trepar igual a tu velocidad.'),
    r('Pies Diestros', 'adicional', 'Usas los pies para manipular un objeto, abrir o cerrar una puerta o un contenedor, o recoger o dejar algo diminuto.'),
    r('Planeo', 'reaccion', 'Cuando caes desde al menos 10 pies, extiendes tus membranas: planeas en horizontal tantos pies como tu velocidad y no recibes daño por la caída.'),
    r('Esquiva Hadozee', 'reaccion', 'Cuando recibes daño, tiras 1d6, le sumas tu competencia y reduces el daño en ese total.', pb),
  ] },
  kender: { vel: 30, vision: 0, src: 'Dragonlance', habsElegir: 1, habsNota: 'Curiosidad Kender', rasgos: [
    r('Intrépido', 'pasiva', 'Ventaja en las salvaciones para no quedar Asustado o dejar de estarlo. Una vez por descanso largo, si fallas una, puedes elegir pasarla.', { usos: 1, reset: 'largo' }),
    r('Curiosidad Kender', 'pasiva', 'Competencia en una de estas habilidades (márcala en Habilidades): Perspicacia, Investigación, Juego de Manos, Sigilo o Supervivencia.'),
    r('Pulla', 'adicional', 'Provocas a una criatura a 60 pies que te oiga y entienda: salvación de SAB (CD 8 + competencia + INT, SAB o CAR) o tiene desventaja al atacar a otros que no seas tú hasta el inicio de tu próximo turno.', pb),
  ] },
};
