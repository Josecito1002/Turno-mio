/* Pícaro de la biblioteca puesto al día con su versión oficial más reciente (texto oficial de 5etools, redactado por
   Gemini y revisado con scripts/gemini/revisar.ts). Libros: Manual del Jugador (2024); Ravenloft: The Horrors Within (2026); Forgotten Realms: Heroes of Faerûn (2025); Xanathar's Guide to Everything (2017).
   Lo aplica scripts/actualizar-clase.ts (opción "picaro"). */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const PICARO_2024 = {
  rasgosAltos: [
    r(6, 'Pericia', 'pasiva', 'Eliges dos habilidades más en las que seas competente y ganas pericia en ellas (en Habilidades).'),
    r(7, 'Evasión', 'pasiva', 'Si un efecto te pide una salvación de DES para recibir solo la mitad del daño, no recibes nada si la superas y la mitad si la fallas. No funciona si estás Incapacitado.'),
    r(7, 'Talento Fiable', 'pasiva', 'En las pruebas de característica con una habilidad o herramienta en la que seas competente, un 9 o menos en el d20 cuenta como un 10.'),
    r(11, 'Golpe Astuto Mejorado', 'pasiva', 'Al hacer daño de Ataque Furtivo puedes usar hasta dos efectos de Golpe Astuto, pagando el coste en dados de cada uno.'),
    r(14, 'Golpes Taimados', 'pasiva', 'Nuevas opciones de Golpe Astuto: Atontar (2d6; salvación de CON o en su siguiente turno solo puede moverse, o usar su acción, o su acción adicional), Oscurecer (3d6; salvación de DES o queda Cegado hasta el final de su siguiente turno) y Noquear (6d6; salvación de CON o queda Inconsciente 1 minuto o hasta recibir daño, repitiendo la salvación al final de cada turno suyo).'),
    r(15, 'Mente Escurridiza', 'pasiva', 'Ganas competencia en las salvaciones de SAB y CAR.'),
    r(18, 'Escurridizo', 'pasiva', 'Ninguna tirada de ataque contra ti puede tener ventaja, salvo que estés Incapacitado.'),
    r(20, 'Golpe de Suerte', 'gratis', 'Si fallas una prueba de d20, puedes convertir la tirada en un 20. Una vez por descanso corto o largo.', { usos: 1, reset: 'corto' })
  ],
  subAltos: {},
  subclases: {
    'embaucador': {
      n: 'Embaucador Arcano',
      rasgos: [
        r(3, 'Lanzamiento de Conjuros', 'pasiva', 'Lanzas conjuros de mago con INT y puedes usar un foco arcano. Conoces Mano de mago y otros dos trucos de mago (uno más en el nivel 10), y preparas conjuros de mago de nivel 1 o más según tu tabla de espacios.'),
        r(3, 'Mano de Mago Prestidigitadora', 'adicional', 'Puedes lanzar Mano de mago como acción adicional y hacer invisible la mano. La controlas con una acción adicional y a través de ella puedes hacer pruebas de Destreza (Juego de Manos).'),
        r(9, 'Emboscada Mágica', 'pasiva', 'Si estás Invisible cuando lanzas un conjuro sobre una criatura, tiene desventaja en las salvaciones contra ese conjuro en ese mismo turno.'),
        r(13, 'Embaucador Versátil', 'pasiva', 'Cuando usas la opción Tropiezo de Golpe Astuto contra una criatura, también puedes aplicarla a otra criatura a 5 pies de tu mano espectral.'),
        r(17, 'Ladrón de Conjuros', 'reaccion', 'Justo después de que una criatura lance un conjuro que te tenga como objetivo o te incluya en su área, usas tu reacción: hace una salvación de INT contra tu CD de conjuros. Si falla, el conjuro no te afecta y, si es de nivel 1 o más y de un nivel que puedes lanzar, se lo robas: lo tienes preparado 8 horas y ella no puede lanzarlo mientras tanto. Una vez por descanso largo.', { usos: 1, reset: 'largo' })
      ]
    },
    'asesino': {
      n: 'Asesino',
      rasgos: [
        r(3, 'Asesinar', 'pasiva', 'Tienes ventaja en la iniciativa. En la primera ronda de cada combate tienes ventaja en los ataques contra quien todavía no haya actuado, y si tu Ataque Furtivo acierta esa ronda, el objetivo recibe daño extra igual a tu nivel de pícaro, del tipo del arma.'),
        r(3, 'Herramientas de Asesino', 'pasiva', 'Ganas un útil de disfraz y un útil de envenenador, y competencia con ambos.'),
        r(9, 'Experto en Infiltración', 'pasiva', 'Tras estudiar al menos 1 hora a alguien, imitas sin fallos su forma de hablar, su letra o ambas. Además, usar Puntería Firme ya no deja tu velocidad en 0.'),
        r(13, 'Envenenar Armas', 'pasiva', 'Cuando usas la opción Veneno de Golpe Astuto, el objetivo que falla la salvación también recibe 2d6 de daño de veneno, que ignora la resistencia al veneno.'),
        r(17, 'Golpe Mortal', 'pasiva', 'Cuando aciertas con tu Ataque Furtivo en la primera ronda de un combate, el objetivo hace una salvación de CON (CD 8 + DES + competencia) o el daño de ese ataque se duplica contra él.')
      ]
    },
    'fantasma': {
      n: 'Fantasma',
      rasgos: [
        r(3, 'Lamentos de la Tumba', 'gratis', 'Justo después de hacer daño de Ataque Furtivo en tu turno, eliges otra criatura que veas a 30 pies de la primera: tiras la mitad de tus dados de Ataque Furtivo (redondeando hacia arriba) y recibe ese daño necrótico.', { usos: 'max(1, DES)', reset: 'largo' }),
        r(3, 'Susurros de los Muertos', 'fuera', 'Al terminar un descanso corto o largo, eliges una habilidad o herramienta en la que no seas competente y ganas competencia en ella, hasta que vuelvas a usar este rasgo para elegir otra.'),
        r(9, 'Recuerdos de los Difuntos', 'reaccion', 'Tienes dos baratijas de alma (máximo 2; 3 desde el nivel 13 y 4 desde el 17) y vuelves a tener al menos dos al terminar un descanso largo. Con al menos una tienes ventaja en las salvaciones contra la muerte y de CON. Puedes romper una al hacer daño de Ataque Furtivo para usar Lamentos de la Tumba gratis, o con una acción mágica para lanzar Augurio (con CON) o hacerle una pregunta a su espíritu. Cuando muere una criatura que ves a 30 pies, con tu reacción ganas otra.'),
        r(9, 'Voz de la Muerte', 'fuera', 'Lanzas Hablar con los muertos sin espacio ni componentes, con DES, una vez por descanso corto o largo. Puedes elegir como objetivo una de tus baratijas de alma en lugar de un cadáver.', { usos: 1, reset: 'corto' }),
        r(13, 'Caminar Fantasma', 'adicional', 'Como acción adicional tomas forma espectral durante 10 minutos: vuelas 10 pies y puedes flotar, los ataques contra ti tienen desventaja, y atraviesas criaturas y objetos como terreno difícil (1d10 de daño de fuerza si terminas tu turno dentro de uno). Una vez por descanso largo, o rompiendo una baratija de alma.', { usos: 1, reset: 'largo' }),
        r(17, 'Amigo de la Muerte', 'pasiva', 'Lamentos de la Tumba puede hacer su daño necrótico a la primera criatura y a la segunda. Además, al tirar iniciativa ganas una baratija de alma si no te queda ninguna.')
      ]
    },
    'vastago-tres': {
      n: 'Vástago de los Tres',
      rasgos: [
        r(3, 'Sed de Sangre', 'reaccion', 'Cuando un enemigo que ves a 30 pies recibe daño y queda Malherido sin morir, usas tu reacción para teletransportarte a un espacio libre a 5 pies de él y hacerle un ataque cuerpo a cuerpo.', { usos: 'max(1, INT)', reset: 'largo' }),
        r(3, 'Lealtad Temible', 'pasiva', 'Eliges a uno de los Tres Muertos y ganas su resistencia y su truco (con INT): Bane, daño psíquico e Ilusión menor; Bhaal, veneno y Guardia de cuchillas; Myrkul, necrótico y Toque helado. Puedes cambiar la elección al terminar un descanso largo.'),
        r(9, 'Infundir Miedo', 'pasiva', 'Nueva opción de Golpe Astuto: Aterrorizar (1d6; salvación de SAB o queda Asustado 1 minuto, y mientras tanto tienes ventaja en los ataques contra él; repite la salvación al final de cada turno suyo).'),
        r(13, 'Aura de Malevolencia', 'pasiva', 'Cuando te teletransportas con Sed de Sangre, las criaturas que elijas a 10 pies del lugar que dejas o del de llegada reciben daño igual a tu mod. de INT, del tipo de tu Lealtad Temible, que ignora la resistencia.'),
        r(17, 'Encarnación del Terror', 'pasiva', 'Recuperas un uso de Sed de Sangre al terminar un descanso corto. Además, al tirar el daño de tu Ataque Furtivo puedes contar cualquier 1 o 2 del dado como un 3.')
      ]
    },
    'cuchillo-mental': {
      n: 'Cuchillo Mental',
      rasgos: [
        r(3, 'Poder Psiónico', 'pasiva', 'Tienes dados de energía psiónica (recuperas uno con descanso corto y todos con uno largo). Si fallas una prueba con una habilidad o herramienta en la que eres competente, tiras un dado y lo sumas; solo lo gastas si así la superas. Con una acción mágica, además, enlazas por telepatía a hasta tantas criaturas como tu bonificador de competencia durante tantas horas como saques en un dado (a 1 milla); la primera vez tras cada descanso largo no gastas el dado.'),
        r(3, 'Hojas Psíquicas', 'pasiva', 'Cuando usas Atacar o haces un ataque de oportunidad, puedes atacar con una hoja psíquica en tu mano libre: arma cuerpo a cuerpo sencilla con Sutil y Arrojadiza (60/120), 1d6 de daño psíquico y maestría Molestar. Después, con una acción adicional, puedes atacar con una segunda hoja de 1d4 si tienes la otra mano libre.'),
        r(9, 'Hojas del Alma', 'pasiva', 'Si fallas un ataque con una hoja psíquica, tiras un dado de energía y lo sumas; solo se gasta si así aciertas. Además, con una acción adicional gastas un dado, lanzas una hoja a un espacio que veas a 10 × el resultado en pies y te teletransportas allí.'),
        r(13, 'Velo Psíquico', 'accion', 'Como acción mágica quedas Invisible 1 hora o hasta que lo termines; se acaba si haces daño o fuerzas una salvación. Una vez por descanso largo, o gastando un dado de energía.', { usos: 1, reset: 'largo' }),
        r(17, 'Desgarrar la Mente', 'gratis', 'Cuando haces daño de Ataque Furtivo con tus hojas psíquicas, el objetivo hace una salvación de SAB (CD 8 + DES + competencia) o queda Aturdido 1 minuto, repitiéndola al final de cada turno suyo. Una vez por descanso largo, o gastando tres dados de energía.', { usos: 1, reset: 'largo' })
      ]
    },
    'ladron': {
      n: 'Ladrón',
      rasgos: [
        r(3, 'Manos Rápidas', 'adicional', 'Con una acción adicional puedes hacer una prueba de Destreza (Juego de Manos) para abrir una cerradura, desactivar una trampa o robar un bolsillo, usar la acción Utilizar, o usar un objeto mágico que pida la acción mágica.'),
        r(3, 'Trabajo en Segundo Piso', 'pasiva', 'Tienes velocidad de trepar igual a tu velocidad y calculas la distancia de tus saltos con DES en lugar de FUE.'),
        r(9, 'Sigilo Supremo', 'pasiva', 'Nueva opción de Golpe Astuto: Ataque Sigiloso (1d6). Si estás Invisible por la acción Esconderse, este ataque no te quita esa condición si terminas el turno tras cobertura de tres cuartos o total.'),
        r(13, 'Usar Objeto Mágico', 'pasiva', 'Puedes estar sintonizado con hasta cuatro objetos mágicos. Al gastar cargas de un objeto tiras 1d6: con un 6 no las gastas. Puedes usar cualquier pergamino de conjuro con INT; si es de nivel 2 o más, antes superas una prueba de Inteligencia (Arcanos) CD 10 + el nivel, o el pergamino se deshace.'),
        r(17, 'Reflejos de Ladrón', 'pasiva', 'En la primera ronda de cada combate tienes dos turnos: uno con tu iniciativa y otro con tu iniciativa menos 10.')
      ]
    },
    'inquisitivo': {
      n: 'Inquisitivo',
      rasgos: [
        r(3, 'Oído para el Engaño', 'pasiva', 'En las pruebas de Sabiduría (Perspicacia) para saber si alguien miente, un 7 o menos en el d20 cuenta como un 8.'),
        r(3, 'Ojo para el Detalle', 'adicional', 'Con una acción adicional haces una prueba de Sabiduría (Percepción) para encontrar una criatura u objeto escondido, o de Inteligencia (Investigación) para descubrir o descifrar pistas.'),
        r(3, 'Lucha Perspicaz', 'adicional', 'Con una acción adicional enfrentas tu Sabiduría (Perspicacia) al Carisma (Engaño) de una criatura que ves y no está Incapacitada. Si ganas, durante 1 minuto (o hasta que lo logres con otra) puedes usar Ataque Furtivo contra ella sin tener ventaja, siempre que no tengas desventaja.'),
        r(9, 'Mirada Firme', 'pasiva', 'Tienes ventaja en las pruebas de Sabiduría (Percepción) e Inteligencia (Investigación) si ese turno no te mueves más de la mitad de tu velocidad.'),
        r(13, 'Ojo Infalible', 'accion', 'Como acción percibes si hay ilusiones, cambiaformas fuera de su forma original u otra magia hecha para engañar los sentidos a 30 pies, siempre que no estés Cegado ni Ensordecido. Sabes que algo intenta engañarte, pero no qué esconde.', { usos: 'max(1, SAB)', reset: 'largo' }),
        r(17, 'Ojo para las Debilidades', 'pasiva', 'Mientras Lucha Perspicaz te sirva contra una criatura, tu Ataque Furtivo contra ella hace 3d6 de daño más.')
      ]
    },
    'mente-maestra': {
      n: 'Mente Maestra',
      rasgos: [
        r(3, 'Maestro de la Intriga', 'pasiva', 'Ganas competencia con el útil de disfraz, el de falsificación y un juego a tu elección, y aprendes dos idiomas. Tras oír hablar a una criatura al menos 1 minuto, imitas su acento y su forma de hablar como un nativo, si conoces el idioma.'),
        r(3, 'Maestro de la Táctica', 'adicional', 'Puedes usar la acción Ayudar como acción adicional. Cuando ayudas a un aliado a atacar, el objetivo puede estar a 30 pies de ti en lugar de a 5, si te ve o te oye.'),
        r(9, 'Manipulador Perspicaz', 'fuera', 'Si observas o tratas a una criatura al menos 1 minuto fuera de combate, el DM te dice si es igual, superior o inferior a ti en dos de estas cosas a tu elección: INT, SAB, CAR o niveles de clase. Quizá también descubras algo de su historia o de su personalidad.'),
        r(13, 'Desvío', 'reaccion', 'Cuando te atacan mientras una criatura a 5 pies te da cobertura contra ese ataque, puedes usar tu reacción para que el ataque vaya contra ella en lugar de contra ti.'),
        r(17, 'Alma del Engaño', 'pasiva', 'Nadie puede leerte la mente con telepatía ni otros medios salvo que lo permitas, y puedes mostrar pensamientos falsos enfrentando tu Carisma (Engaño) a su Sabiduría (Perspicacia). La magia que detecta mentiras dice que dices la verdad si así lo quieres, y la magia no puede obligarte a decirla.')
      ]
    },
    'batidor': {
      n: 'Batidor',
      rasgos: [
        r(3, 'Hostigador', 'reaccion', 'Cuando un enemigo termina su turno a 5 pies de ti, puedes usar tu reacción para moverte hasta la mitad de tu velocidad sin provocar ataques de oportunidad.'),
        r(3, 'Superviviente', 'pasiva', 'Ganas competencia en Naturaleza y Supervivencia si no la tenías, y pericia en ambas.'),
        r(9, 'Movilidad Superior', 'pasiva', 'Tu velocidad aumenta 10 pies, y también la de trepar o nadar si tienes.'),
        r(13, 'Maestro de Emboscadas', 'pasiva', 'Tienes ventaja en la iniciativa. Además, la primera criatura que aciertas en la primera ronda de un combate queda expuesta: los ataques contra ella tienen ventaja hasta el inicio de tu siguiente turno.'),
        r(17, 'Golpe Repentino', 'adicional', 'Si usas la acción Atacar en tu turno, puedes hacer un ataque más como acción adicional. Ese ataque puede llevar Ataque Furtivo aunque ya lo hayas usado este turno, pero nunca dos veces contra el mismo objetivo en un turno.')
      ]
    },
    'espadachin': {
      n: 'Espadachín',
      rasgos: [
        r(3, 'Juego de Pies', 'pasiva', 'En tu turno, si haces un ataque cuerpo a cuerpo contra una criatura, esa criatura no puede hacerte ataques de oportunidad durante el resto de tu turno.'),
        r(3, 'Audacia Temeraria', 'pasiva', 'Sumas tu mod. de CAR a la iniciativa. Además, puedes usar Ataque Furtivo sin ventaja contra una criatura a 5 pies si no hay nadie más a 5 pies de ti y no tienes desventaja.'),
        r(9, 'Encanto Arrollador', 'accion', 'Como acción enfrentas tu Carisma (Persuasión) a la Sabiduría (Perspicacia) de una criatura que te oye y comparte tu idioma. Si ganas y es hostil, durante 1 minuto tiene desventaja en los ataques contra cualquiera que no seas tú y solo puede hacerte ataques de oportunidad a ti; termina si un aliado tuyo la ataca o le lanza un conjuro, o si os separáis más de 60 pies. Si no es hostil, queda Hechizada por ti 1 minuto como una conocida amistosa, hasta que le hagáis daño.'),
        r(13, 'Maniobra Elegante', 'adicional', 'Con una acción adicional ganas ventaja en tu siguiente prueba de Destreza (Acrobacias) o Fuerza (Atletismo) de este turno.'),
        r(17, 'Maestro Duelista', 'gratis', 'Si fallas una tirada de ataque, puedes repetirla con ventaja. Una vez por descanso corto o largo.', { usos: 1, reset: 'corto' })
      ]
    }
  }
};
