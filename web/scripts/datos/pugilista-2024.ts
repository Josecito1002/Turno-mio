/* El Pugilista de la biblioteca, puesto al día con The Pugilist Class 2024 (Benjamin Huffman, v1.0.0).
   Textos propios en español. Los clubes Arena Royale y Matones Sabuesos no tienen versión 2024:
   se conservan los de la biblioteca (Patreon de 2014) y se completa lo que les faltaba.
   Lo aplica scripts/actualizar-clase.ts a biblioteca-mi-turno.json y a la base. */

const r = (n: number, nombre: string, texto: string, t = 'pasiva', usos: number | string = 0, reset = 'largo') => ({ nombre, t, texto, n, usos, reset });

export const PUGILISTA_2024 = {
  n: 'Pugilista', lib: true, src: 'The Pugilist Class 2024 (Benjamin Huffman)', dado: 10, sv: ['fue', 'con'],
  habN: 2, habs: ['Acrobacias', 'Atletismo', 'Engaño', 'Intimidación', 'Percepción', 'Juego de Manos', 'Sigilo'],
  arm: 'Armaduras ligeras', armas: 'Armas sencillas e improvisadas', w: { simple: 1, martial: 0, light: 0, finesseLight: 0 },
  lanz: null, caster: null, slotsTabla: null,
  recursosTabla: [0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11, 12].map(moxie => ({ moxie })),
  asi: [4, 8, 12, 16, 19], estilo: 0, estilos: [], maestrias: 0, hasta: 0,
  rasgos: [
    r(1, 'Pugilismo', 'Sin armadura o con armadura ligera, sin escudo, y peleando sin armas o con armas de pugilista (sencillas cuerpo a cuerpo e improvisadas): haces un golpe sin armas con acción adicional y usas tu dado de Pugilismo (1d8, 1d10 en nivel 5, 1d12 en 11 y 2d6 en 17) en vez del daño normal. Las armas improvisadas tienen para ti la maestría Aturdir (Sap).'),
    r(1, 'Mentón de Hierro', 'Sin armadura o con armadura ligera y sin escudo, tu CA base es 12 + tu modificador de CON.'),
    r(2, 'Ensangrentado pero Invicto', 'Cuando recibes daño, con tu reacción recuperas todo tu Moxie; si estás Maltrecho, además ganas PG temporales iguales a 4 veces tu nivel de pugilista, que se pierden al terminar un descanso corto. Una vez por descanso corto o largo.', 'reaccion', 1, 'corto'),
    r(2, 'Determinación (Moxie)', 'Tienes puntos de Moxie según tu nivel y los recuperas todos al terminar un descanso corto o largo. Los gastas en Prepárate, Uno-Dos y Pegar y Moverse, y en otros rasgos de pugilista.'),
    r(2, 'Racha de Descaro', 'Cuando fallas una prueba de FUE, DES, CON o CAR, gastas 1 Moxie y sumas tu dado de Pugilismo. Si aun así fallas, recuperas el Moxie y no puedes volver a usarlo hasta un descanso corto o largo.', 'gratis'),
    r(3, 'Pegador', 'Cuando aciertas un golpe sin armas a una criatura, haces el daño y además la agarras o la empujas.', 'gratis'),
    r(4, 'Escarbar Profundo', 'Con acción adicional, durante 10 minutos tienes resistencia al daño contundente, cortante y perforante e ignoras el agotamiento por debajo de 6. Una vez por descanso largo, o recuperas su uso ganando un nivel de agotamiento.', 'adicional', 1, 'largo'),
    r(5, 'Ataque Extra', 'Cuando usas la acción Atacar, atacas dos veces.'),
    r(5, 'Gancho Devastador', 'Al atacar con un golpe sin armas o un arma de pugilista, gastas 1 Moxie: si aciertas, recuperas el Moxie y haces el daño máximo.', 'gratis'),
    r(6, 'Puños de Moxie', 'Tus golpes sin armas y tus ataques con armas improvisadas pueden hacer daño de fuerza en vez de su tipo normal.'),
    r(7, 'Derribado pero No Vencido', 'Cuando usas Ensangrentado pero Invicto estando Maltrecho, durante 1 minuto sumas CON más tus niveles de agotamiento al daño de tus golpes sin armas y armas de pugilista. Una vez por descanso largo.', 'gratis', 1, 'largo'),
    r(9, 'Escuela de los Golpes Duros', 'Una vez por turno, al acertar con un golpe sin armas o un arma de pugilista, haces 1d12 de daño extra, o en su lugar la pones en Peligro o la Provocas.', 'gratis'),
    r(10, 'Hercúleo', 'Tu FUE cuenta el doble para la capacidad de carga, tus golpes sin armas a objetos son críticos y tus saltos llegan al doble.'),
    r(10, 'Sacúdetelo', 'Al empezar tu turno te quitas uno de estos estados: Cegado, Hechizado, Ensordecido, un nivel de agotamiento, Asustado, Paralizado, Envenenado, Apresado o Aturdido. Una vez por descanso largo, o recuperas su uso ganando un nivel de agotamiento.', 'gratis', 1, 'largo'),
    r(13, 'Escarbar Más Hondo', 'Con acción adicional, durante 1 minuto tienes los beneficios de Escarbar Profundo y usas Escuela de los Golpes Duros dos veces por turno. Una vez por descanso largo (dos veces desde nivel 20).', 'adicional', 1, 'largo'),
    r(14, 'Inquebrantable', 'Ventaja en salvaciones de FUE, DES y CON. Cuando fallas una salvación, puedes gastar 1 Moxie para repetirla.'),
    r(15, 'Pugnaz', 'Al tirar iniciativa te quitas un nivel de agotamiento y recuperas Derribado pero No Vencido, Escarbar Profundo y Sacúdetelo. Una vez por descanso largo.', 'gratis', 1, 'largo'),
    r(18, 'Espíritu de Lucha', 'Cuando caes a 0 PG sin morir en el acto, quedas con 1 PG, ganas PG temporales iguales a la mitad de tus PG máximos, recuperas todo tu Moxie y tienes resistencia a todo el daño salvo fuerza durante 1 minuto. Una vez por descanso largo.', 'gratis', 1, 'largo'),
    r(20, 'Condición Física Óptima', 'Tu FUE y tu CON suben 2, hasta un máximo de 23. Al terminar un descanso largo pierdes todo el agotamiento, y al terminar uno corto recuperas PG iguales al doble de tu nivel de pugilista.'),
  ],
  subclases: {
    'perro-sabueso': { n: 'El Perro y el Sabueso', rasgos: [
      r(3, 'El Mejor Amigo del Luchador', 'Te acompaña un sabueso fiel (CA 12 + tu CON, 5 + 5 × tu nivel PG, velocidad 40 pies). Actúa en tu turno; si no le das órdenes, solo Esquiva. Con acción adicional le ordenas una acción, o cambias uno de tus ataques por su Mordisco. Si murió hace menos de 1 hora, lo revives tocándolo con acción mágica y 2 Moxie. Al terminar un descanso largo puedes vincularte con un perro nuevo.'),
      r(3, 'Chucho con Moxie', 'Tu sabueso comparte tu Moxie: con Prepárate gana los mismos PG temporales, con Uno-Dos puede hacer él uno o los dos golpes, y con Pegar y Moverse puede Correr, Destrabarse o Ayudar.'),
      r(6, 'Ataque Coordinado', 'Cuando atacas a una criatura que tiene a tu sabueso a 5 pies, él puede usar su reacción para darte ventaja; si aciertas, haces 3d4 extra. Su mordisco puede hacer daño de fuerza.', 'reaccion'),
      r(11, 'El Mejor Amigo del Sabueso', 'Cuando una criatura daña a tu sabueso con un ataque, con tu reacción te mueves hasta la mitad de tu velocidad y la atacas cuerpo a cuerpo.', 'reaccion'),
      r(17, 'Sin Correa', 'Cuando tu sabueso queda Maltrecho o recibe daño estando Maltrecho, con tu reacción lo sueltas: gana PG temporales iguales a 5 × tu nivel y, durante 1 minuto, +15 pies de velocidad y muerde sin que gastes acción adicional. Una vez por descanso largo, o gastando 3 Moxie.', 'reaccion', 1, 'largo'),
    ] },
    'mano-pavor': { n: 'Mano del Pavor', rasgos: [
      r(3, 'Magia Negra', 'Aprendes dos trucos de brujo y un conjuro de nivel 1 de brujo que siempre tienes preparado; lo lanzas una vez sin espacio por descanso largo. Usas CON para estos conjuros. Al subir de nivel puedes cambiar uno.'),
      r(3, 'Mano del Pavor', 'Al usar la acción Atacar, uno de tus miembros se vuelve monstruoso durante 1 minuto: con tu reacción devuelves un golpe sin armas a quien te acierte cuerpo a cuerpo, tiras dos veces el daño de tus golpes sin armas y te quedas con el mejor, y repites el primer golpe sin armas que falles cada turno. Una vez por descanso corto o largo.', 'gratis', 1, 'corto'),
      r(6, 'Trato con el Diablo', 'Eliges una opción, que puedes cambiar al terminar un descanso largo: Manto de Sombras (Invisibilidad sin espacio, una vez por descanso), Máscara de Mil Caras (Disfrazarse a voluntad) o Paso de Otro Mundo (Paso brumoso sin espacio, una vez por descanso).'),
      r(11, 'Crecimiento Grotesco', 'Al usar la Mano del Pavor, también te agrandas como con Agrandar/Reducir y tu alcance es de 10 pies. Una vez por descanso largo, o recuperas su uso ganando un nivel de agotamiento.', 'gratis', 1, 'largo'),
      r(17, 'Fuente de Vísceras', 'Con acción mágica y 6 Moxie intentas ejecutar a una criatura a tu alcance: salvación de DES o recibe 100 de daño perforante (50 si la pasa). Si muere, quienes elijas a 30 pies hacen una salvación de SAB o quedan Asustados 1 minuto. Una vez por descanso largo.', 'accion', 1, 'largo'),
    ] },
    'mala-leche': { n: 'Pura Mala Leche', rasgos: [
      r(3, 'Mala Actitud', 'Ganas competencia en Intimidación (si no la tenías) y sumas tu FUE (mínimo +1) a esas pruebas.'),
      r(3, 'Saludo Salado', 'Con acción adicional provocas a una criatura a 60 pies que te vea u oiga: salvación de SAB o recibe daño psíquico (tu dado de Pugilismo + CON) y tiene desventaja al atacar a otros que no seas tú hasta tu próximo turno.', 'adicional'),
      r(6, 'Trucos Sucios', 'Tres trucos, uno por turno, cada uno una vez por descanso corto o largo: Pisotón, Golpe Bajo y Arena al Bolsillo.'),
      r(11, 'Viejo Grosero', 'Con acción adicional provocas a tantas criaturas a 30 pies como tu nivel: cada una hace el mismo efecto que Saludo Salado. Una vez por descanso corto o largo, o gastando 3 Moxie.', 'adicional', 1, 'corto'),
      r(17, 'Trucos Más Sucios', 'Dos trucos sucios más, con las mismas reglas: Golpe de Conejo y Golpe a Traición.'),
    ] },
    'circulo-cuadrado': { n: 'El Círculo Cuadrado', rasgos: [
      r(3, 'Trabajo de Suelo', 'Llave de Compresión, Ineludible y Derribar y Soltar: tres formas de castigar a quien agarras o derribas.'),
      r(3, 'Masa Muscular', 'Eliges Acrobacias o Atletismo: ganas competencia, o pericia si ya la tenías.'),
      r(6, 'Escudo de Carne', 'Mientras agarras a una criatura tienes cobertura contra quienes no agarras. Cuando uno de ellos falla un ataque contra ti, con tu reacción y 1 Moxie lo obligas a repetirlo contra quien agarras.'),
      r(11, 'Peso Pesado', 'Al agarrar o empujar cuentas como un tamaño más grande, y mover a quien agarras no te cuesta movimiento extra si es de tu tamaño o menor.'),
      r(17, 'Remate Limpio', 'Cuando una criatura termina su turno agarrada por ti, con tu reacción la obligas a una salvación de CON contra tu CD de agarre o queda Incapacitada; si ya lo estaba por esto y está Maltrecha, cae a 0 PG (una vez por descanso largo).', 'reaccion'),
    ] },
    'dulce-ciencia': { n: 'La Dulce Ciencia', rasgos: [
      r(3, 'Boxeador a Puño Limpio', 'Tus golpes sin armas hacen crítico con 19 o 20.'),
      r(3, 'Contragolpe Cruzado', 'Cuando un ataque cuerpo a cuerpo te hace daño, con tu reacción y 1 Moxie lo reduces en 1d10 + FUE + tu nivel; si queda en 0, atacas a una criatura a tu alcance.', 'reaccion'),
      r(6, 'Creador de Combos', 'Cuando dañas con un golpe sin armas, en vez de agarrar o empujar con Pegador te das ventaja en tus ataques contra esa criatura hasta tu próximo turno.', 'gratis'),
      r(11, 'Rompecombos', 'Cuando tu Contragolpe Cruzado reduce el daño a 0, recuperas 1 Moxie.'),
      r(17, 'Nocaut', 'Mandíbula de Cristal: tus críticos dejan Inconsciente a quien falle una salvación de CON. Gancho Final: con tu reacción y 1 Moxie conviertes un acierto sin armas en crítico, una vez por descanso corto o largo.'),
    ] },
    'santo-callejero': { n: 'Santo Callejero', rasgos: [
      r(3, 'Canalizar Divinidad', 'Canalizas energía divina una vez por descanso corto o largo: Puños de Fe o Gracia de los Dioses.', 'pasiva', 1, 'corto'),
      r(3, 'Imposición de Manos', 'Tienes una reserva de curación de 3 × tu nivel de pugilista que se recupera con un descanso largo. Con acción adicional tocas a una criatura y le devuelves PG de la reserva, o gastas 5 para quitarle Envenenado.', 'adicional'),
      r(6, 'Maltrecho pero Resuelto', 'Cuando usas Ensangrentado pero Invicto, rellenas tu reserva de Imposición de Manos. Una vez por descanso largo.', 'gratis', 1, 'largo'),
      r(11, 'Aura de Resiliencia', 'Cuando usas Escarbar Profundo, durante 10 minutos tus aliados a 10 pies tienen resistencia al daño contundente, cortante y perforante. Una vez por descanso largo.', 'gratis', 1, 'largo'),
      r(17, 'Manos Consagradas', 'Una vez en cada uno de tus turnos, al acertar con un golpe sin armas o un arma de pugilista, gastas puntos de Imposición de Manos (hasta tu nivel) para hacer ese mismo daño radiante extra, el doble contra infernales y muertos vivientes.', 'gratis'),
    ] },
  },
};

/* Arena Royale (2014, Patreon) traía todo menos la competencia de nivel 3 */
export const ARENA_ROYALE_EXTRA = r(3, 'Competencia Adicional', 'Ganas competencia en Interpretación; si ya la tenías, en Intimidación o Persuasión (a tu elección).');
