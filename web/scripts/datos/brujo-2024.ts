/* Brujo de la biblioteca (rasgos de nivel alto, rasgos de nivel alto de los patrones del manual y subclases) puesto al
   día con su versión oficial más reciente: Manual del Jugador 2024; El No Muerto de Ravenloft: The Horrors Within (2026);
   El Vestigio de Arcana Unleashed (2026); El Filo Maldito (Xanathar), El Genio y El Insondable (Tasha) y El Inmortal
   (Sword Coast), que no tienen versión 2024: sus rasgos de nivel 1 pasan al 3, como indica el Manual 2024 para las
   subclases antiguas. Textos propios en español; lo que necesita números o selectores está en reglas-revisadas.ts.
   Lo aplica scripts/actualizar-clase.ts (opción "brujo"). */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const BRUJO_2024 = {
  rasgosAltos: [
    r(9, 'Contactar al Patrón', 'fuera', 'Siempre tienes preparado Contactar con otro plano. Una vez por descanso largo lo lanzas sin gastar espacio para hablar con tu patrón, y superas su salvación automáticamente.', { usos: 1, reset: 'largo' }),
    r(11, 'Arcano Místico', 'pasiva', 'Tu patrón te da un conjuro de brujo de nivel 6 que lanzas una vez por descanso largo sin gastar espacio. Ganas otro de nivel 7 en el nivel 13, de nivel 8 en el 15 y de nivel 9 en el 17. Al subir de nivel puedes cambiar uno por otro del mismo nivel.'),
    r(20, 'Maestro Sobrenatural', 'pasiva', 'Cuando usas Astucia Mágica, recuperas todos tus espacios de Magia de Pacto.'),
  ],
  // Niveles 6, 10 y 14 de los patrones que ya están en las reglas (su nivel 3 está en subclases.ts)
  subAltos: {
    archihada: [
      r(6, 'Huida Brumosa', 'reaccion', 'Cuando recibes daño, lanzas Paso brumoso como reacción. Tus Pasos Feéricos ganan dos efectos más: Paso Evanescente (quedas Invisible hasta el inicio de tu próximo turno, o hasta que ataques, hagas daño o lances un conjuro) y Paso Temible (quien esté a 5 pies de donde sales o de donde llegas hace una salvación de SAB o recibe 2d10 de daño psíquico).'),
      r(10, 'Defensas Cautivadoras', 'reaccion', 'Eres inmune a quedar Hechizado. Justo después de que una criatura que ves te acierte, reduces el daño a la mitad y le obligas a una salvación de SAB; si falla, recibe tanto daño psíquico como el que tú recibiste. Una vez por descanso largo, o gastando un espacio de pacto para recuperarla.', { usos: 1, reset: 'largo' }),
      r(14, 'Magia Hechicera', 'gratis', 'Justo después de lanzar un conjuro de encantamiento o ilusión con una acción y un espacio, lanzas Paso brumoso como parte de esa acción y sin gastar espacio.'),
    ],
    infernal: [
      r(6, 'Suerte del Oscuro', 'gratis', 'Al hacer una prueba de característica o una salvación, sumas 1d10 después de ver la tirada y antes de su efecto. Una vez por tirada.'),
      r(10, 'Resistencia Infernal', 'fuera', 'Al terminar un descanso corto o largo eliges un tipo de daño que no sea de fuerza: tienes resistencia a él hasta que elijas otro.'),
      r(14, 'Arrojar al Infierno', 'gratis', 'Una vez por turno, al acertar con una tirada de ataque, el objetivo hace una salvación de CAR contra tu CD de conjuros. Si falla, desaparece por los Planos Inferiores: recibe 8d10 de daño psíquico (si no es infernal) y queda Incapacitado hasta el final de tu próximo turno, cuando vuelve. Una vez por descanso largo, o gastando un espacio de pacto para recuperarlo.', { usos: 1, reset: 'largo' }),
    ],
    celestial: [
      r(6, 'Alma Radiante', 'pasiva', 'Tienes resistencia al daño radiante. Una vez por turno, cuando un conjuro tuyo hace daño radiante o de fuego, sumas tu CAR al daño contra uno de sus objetivos.'),
      r(10, 'Resiliencia Celestial', 'fuera', 'Al usar Astucia Mágica o al terminar un descanso corto o largo ganas PG temporales, y hasta cinco criaturas que veas ganan la mitad.'),
      r(14, 'Venganza Abrasadora', 'gratis', 'Cuando tú o un aliado a 60 pies vais a hacer una salvación contra la muerte, esa criatura recupera la mitad de sus PG máximos y puede dejar de estar Derribada; las criaturas que elijas a 30 pies de ella reciben daño radiante y quedan Cegadas hasta el final del turno. Una vez por descanso largo.', { usos: 1, reset: 'largo' }),
    ],
    primigenio: [
      r(6, 'Combatiente Clarividente', 'gratis', 'Al formar el vínculo de Mente Despierta, la criatura hace una salvación de SAB contra tu CD de conjuros. Si falla, mientras dure el vínculo tiene desventaja al atacarte y tú ventaja al atacarla. Una vez por descanso corto o largo, o gastando un espacio de pacto para recuperarlo.', { usos: 1, reset: 'corto' }),
      r(10, 'Maleficio Sobrenatural', 'pasiva', 'Siempre tienes Maleficio preparado. Cuando lo lanzas y eliges una característica, el objetivo también tiene desventaja en las salvaciones de esa característica mientras dure.'),
      r(10, 'Escudo Mental', 'pasiva', 'Nadie puede leer tus pensamientos si no lo permites. Tienes resistencia al daño psíquico, y quien te hace daño psíquico recibe el mismo daño que tú.'),
      r(14, 'Crear Siervo', 'pasiva', 'Al lanzar Invocar aberración puedes hacer que no requiera concentración (dura 1 minuto). La aberración aparece con PG temporales, y la primera vez en cada turno que acierta a una criatura afectada por tu Maleficio le hace también su daño extra.'),
    ],
  },
  subclases: {
    'no-muerto': { n: 'El No Muerto', rasgos: [
      r(3, 'Conjuros del No Muerto', 'pasiva', 'Siempre tienes preparados los conjuros de tu patrón, que se amplían en los niveles 5, 7 y 9.'),
      r(3, 'Forma del Terror', 'adicional', 'Te transformas durante 1 minuto en un avatar del poder de tu patrón: ganas PG temporales, eres inmune a quedar Asustado (y dejas de estarlo) y, una vez por turno al acertar con una tirada de ataque, el objetivo hace una salvación de SAB o queda Asustado hasta el final de tu próximo turno. Acaba antes si quedas Incapacitado o si la terminas.'),
      r(6, 'Toque Sepulcral', 'pasiva', 'Tu daño necrótico de ataques, conjuros y rasgos de brujo ignora la resistencia al necrótico, y una vez por turno puedes cambiar a necrótico el daño de un conjuro. En Forma del Terror, al hacer daño necrótico con una tirada de ataque tiras un dado de daño más (una vez por turno). No sufres cansancio por hambre, sed ni asfixia, no necesitas dormir y la magia no puede dormirte.'),
      r(10, 'Cáscara Necrótica', 'pasiva', 'Resistencia al daño necrótico, e inmunidad mientras estás en Forma del Terror. Si caes a 0 PG sin morir, puedes estallar en energía necrótica (sale aparte).'),
      r(14, 'Terror Superior', 'pasiva', 'En Forma del Terror tienes resistencia al daño contundente, cortante y perforante; vuelas a tu velocidad, flotas y atraviesas criaturas y objetos como terreno difícil (1d10 de fuerza si acabas el turno dentro de uno); y lanzas tus conjuros de brujo de conjuración y nigromancia sin componentes, salvo los materiales con coste o que se consumen.'),
    ] },
    vestigio: { n: 'El Vestigio', rasgos: [
      r(3, 'Compañero Vestigio', 'pasiva', 'Se manifiesta el vestigio de un dios moribundo que te acompaña y obedece. Eliges si es celestial, infernal o no muerto; puedes cambiar su forma y su tipo al terminar un descanso largo.'),
      r(3, 'Conjuros del Vestigio', 'pasiva', 'Eliges un dominio de clérigo (Vida, Luz, Engaño o Guerra): sus conjuros de dominio son conjuros de brujo para ti y los tienes siempre preparados según tu nivel de brujo.'),
      r(6, 'Poder del Vestigio', 'pasiva', 'Tu vestigio recupera su Poder Divino al terminar un descanso corto o largo o cuando usas Astucia Mágica. A 30 pies de él tienes resistencia a los mismos tipos de daño que él.'),
      r(10, 'Recuperación del Vestigio', 'reaccion', 'Cuando tu vestigio va a caer a 0 PG, gastas un espacio de pacto para que vuelva a sus PG máximos y se teletransporte a 30 pies. Una vez por descanso largo.', { usos: 1, reset: 'largo' }),
      r(14, 'Apariencia de Vida', 'accion', 'Con una acción mágica, estando tu vestigio a 90 pies, lo transformas durante 1 hora en el espíritu de Invocar celestial, Invocar infernal o Invocar muerto viviente según su tipo (a nivel de conjuro igual a la mitad de tu nivel de brujo). Conserva su personalidad, su Poder Divino y sus PG, y gana PG temporales iguales a los del espíritu. Una vez por descanso largo.', { usos: 1, reset: 'largo' }),
    ] },
    'filo-maldito': { n: 'El Filo Maldito', rasgos: [
      r(3, 'Lista Ampliada del Filo Maldito', 'pasiva', 'Estos conjuros se suman a tu lista de brujo (no quedan preparados solos): Escudo y Castigo iracundo; Desenfocar y Castigo marcador; Parpadeo y Arma elemental; Asesino fantasmal y Castigo abrumador; Castigo desterrador y Cono de frío.'),
      r(3, 'Guerrero Maleficio', 'pasiva', 'Competencia con armaduras medias, escudos y armas marciales. Al terminar un descanso largo tocas un arma con la que seas competente y sin la propiedad Dos manos: hasta tu siguiente descanso largo atacas con ella usando CAR. Si tienes el Pacto del Filo, vale para cualquier arma de pacto que conjures.'),
      r(3, 'Maldición del Filo Maldito', 'adicional', 'Maldices durante 1 minuto a una criatura que veas a 30 pies: sumas tu bonificador de competencia al daño contra ella, le haces crítico con 19 o 20, y si muere recuperas PG. Acaba si ella muere, si mueres o si quedas Incapacitado. Una vez por descanso corto o largo.', { usos: 1, reset: 'corto' }),
      r(6, 'Espectro Maldito', 'gratis', 'Cuando matas a un humanoide, puedes alzar su espíritu como un espectro a tus órdenes hasta tu siguiente descanso largo, con PG temporales y un bonificador de ataque extra igual a tu CAR. Una vez por descanso largo.', { usos: 1, reset: 'largo' }),
      r(10, 'Armadura de Maleficios', 'reaccion', 'Cuando te acierta la criatura con tu Maldición del Filo Maldito, tiras 1d6: con 4 o más el ataque falla.'),
      r(14, 'Maestro de Maleficios', 'gratis', 'Cuando muere la criatura con tu Maldición del Filo Maldito, puedes pasar la maldición a otra criatura que veas a 30 pies (entonces no recuperas PG por la muerte de la primera).'),
    ] },
    genio: { n: 'El Genio', rasgos: [
      r(3, 'Lista Ampliada del Genio', 'pasiva', 'Estos conjuros se suman a tu lista de brujo (no quedan preparados solos): Detectar el bien y el mal (1), Fuerza fantasmal (2), Crear comida y agua (3), Asesino fantasmal (4), Creación (5) y Deseo (9), más los de tu tipo de genio.'),
      r(3, 'Recipiente del Genio', 'pasiva', 'Tu patrón te da un objeto Diminuto (una lámpara, una urna, un anillo...) que te sirve de foco de conjuros. Su CA es tu CD de conjuros y es inmune al daño de veneno y psíquico. Si lo pierdes, con un ritual de 1 hora en un descanso tu patrón te da otro.'),
      r(3, 'Respiro Embotellado', 'accion', 'Tocando tu recipiente, desapareces dentro de él: un espacio cómodo de 20 pies de radio desde el que oyes lo que pasa fuera. Sales con acción adicional, si mueres o si se destruye el recipiente. Una vez por descanso largo.', { usos: 1, reset: 'largo' }),
      r(3, 'Ira del Genio', 'gratis', 'Una vez en cada uno de tus turnos, al acertar con una tirada de ataque, haces daño extra igual a tu bonificador de competencia, del tipo de tu genio.'),
      r(6, 'Don Elemental', 'pasiva', 'Tienes resistencia al tipo de daño de tu genio. Además puedes darte vuelo (sale aparte).'),
      r(10, 'Recipiente Santuario', 'pasiva', 'Al entrar en tu recipiente puedes llevar hasta cinco criaturas voluntarias a 30 pies (las sacas con acción adicional). Quien pase 10 minutos dentro obtiene los beneficios de un descanso corto y suma tu bonificador de competencia a los PG que recupere con Dados de Golpe allí.'),
      r(14, 'Deseo Limitado', 'accion', 'Pides a tu patrón el efecto de un conjuro de nivel 6 o menor, de cualquier lista, que se lance con una acción, sin cumplir sus requisitos ni gastar componentes costosos. Después no puedes volver a usarlo hasta completar 1d4 descansos largos.', { usos: 1, reset: 'largo' }),
    ] },
    insondable: { n: 'El Insondable', rasgos: [
      r(3, 'Lista Ampliada del Insondable', 'pasiva', 'Estos conjuros se suman a tu lista de brujo (no quedan preparados solos): Crear o destruir agua y Onda atronadora; Ráfaga de viento y Silencio; Relámpago y Tormenta de aguanieve; Controlar agua e Invocar elemental (solo de agua); Mano de Bigby (con forma de tentáculo) y Cono de frío.'),
      r(3, 'Don del Mar', 'pasiva', 'Tienes velocidad de nadar de 40 pies y respiras bajo el agua.'),
      r(3, 'Tentáculo de las Profundidades', 'adicional', 'Creas un tentáculo espectral de 10 pies en un punto que veas a 60 pies, que dura 1 minuto, y haces con él un ataque de conjuro cuerpo a cuerpo contra una criatura a 10 pies (en Ataques). Con acción adicional lo mueves 30 pies y repites el ataque.'),
      r(6, 'Espiral Guardiana', 'reaccion', 'Cuando tú o una criatura que ves a 10 pies de tu tentáculo recibe daño, reduces ese daño.'),
      r(6, 'Alma Oceánica', 'pasiva', 'Tienes resistencia al daño de frío. Estando sumergido, te entiendes con cualquier criatura que también lo esté.'),
      r(10, 'Tentáculos Aferradores', 'accion', 'Aprendes Tentáculos negros de Evard, que no cuenta en tu límite; una vez por descanso largo lo lanzas sin gastar espacio. Al lanzarlo ganas PG temporales iguales a tu nivel de brujo, y el daño no rompe tu concentración en él.', { usos: 1, reset: 'largo' }),
      r(14, 'Zambullida Insondable', 'accion', 'Te teletransportas con hasta cinco criaturas voluntarias a 30 pies hasta 1 milla, a una masa de agua que hayas visto (como mínimo un estanque) o a 30 pies de ella. Una vez por descanso corto o largo.', { usos: 1, reset: 'corto' }),
    ] },
    inmortal: { n: 'El Inmortal', rasgos: [
      r(3, 'Lista Ampliada del Inmortal', 'pasiva', 'Estos conjuros se suman a tu lista de brujo (no quedan preparados solos): Falsa vida y Rayo nauseabundo; Sordera/Ceguera y Silencio; Fingir muerte y Hablar con los Muertos; Aura de vida y Guarda contra la Muerte; Contagio y Conocimiento legendario.'),
      r(3, 'Entre los Muertos', 'pasiva', 'Aprendes el truco Estabilizar, que cuenta como de brujo. Tienes ventaja en las salvaciones contra enfermedades. Si un muerto viviente te elige como objetivo de un ataque o conjuro dañino, hace una salvación de SAB contra tu CD de conjuros o tiene que elegir otro objetivo; tras la salvación (o si lo atacas) queda inmune 24 horas.'),
      r(6, 'Desafiar a la Muerte', 'gratis', 'Cuando superas una salvación contra la muerte o estabilizas a alguien con Estabilizar, recuperas PG. Una vez por descanso largo.', { usos: 1, reset: 'largo' }),
      r(10, 'Naturaleza Imperecedera', 'pasiva', 'Puedes contener la respiración indefinidamente y no necesitas comer, beber ni dormir (aunque sí descansar). Envejeces un año por cada diez y eres inmune al envejecimiento mágico.'),
      r(14, 'Vida Indestructible', 'adicional', 'Recuperas PG, y si juntas una parte de tu cuerpo cortada, se vuelve a unir. Una vez por descanso corto o largo.', { usos: 1, reset: 'corto' }),
    ] },
  },
};
