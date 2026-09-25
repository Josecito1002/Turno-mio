/* Subclases de prueba de Unearthed Arcana 2025: Subclasses Update (noviembre de 2025), con la etiqueta Playtest.
   No son oficiales: se agregan junto a las oficiales, sin reemplazar ninguna. Textos propios en español.
   Las usa `npm run db:actualizar-clase -- playtest`, que las suma a cada clase de la biblioteca. */
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const PLAYTEST_2025: Record<string, Record<string, { n: string; rasgos: ReturnType<typeof r>[] }>> = {
  barbaro: {
    'guardian-espiritual': {
      n: 'Senda del Guardián Espiritual',
      rasgos: [
        r(3, 'Protectores Espirituales', 'gratis', 'Con tu Furia activa, cuando aciertas a una criatura con un arma o un golpe sin armas, los espíritus la marcan con uno de estos efectos: Distraer (hasta el inicio de tu próximo turno tiene desventaja al atacar a cualquiera que no seas tú u otro bárbaro con este rasgo), Proteger (la próxima vez antes del final de su siguiente turno que acierte a alguien que no seas tú, ese alguien resiste el daño) o Golpear (recibe 1d6 de daño extra de ácido, frío, fuego, fuerza, rayo o trueno, a tu elección).'),
        r(6, 'Escudo Espiritual', 'reaccion', 'Con tu Furia activa, cuando otra criatura que ves a 30 pies recibe daño, con tu reacción reduces ese daño en tantos d6 como tu bonificador de daño de Furia.'),
        r(10, 'Consultar a los Espíritus', 'accion', 'Lanzas Augurio o Clarividencia sin gastar espacio ni componentes materiales, con SAB. La Clarividencia manda a uno de tus espíritus, invisible, en lugar de crear un sensor. Una vez por descanso corto o largo.', { usos: 1, reset: 'corto' }),
        r(14, 'Espíritus Vengativos', 'gratis', 'Cuando atacas con un arma cuerpo a cuerpo en la acción Atacar y sacas 18 a 20 en el d20, puedes hacer un ataque más con esa arma dentro de la misma acción. Una vez hasta el inicio de tu próximo turno.'),
      ],
    },
    'heraldo-tormenta': {
      n: 'Senda del Heraldo de la Tormenta',
      rasgos: [
        r(3, 'Aura de Tormenta', 'adicional', 'Al entrar en Furia eliges Desierto, Mar o Tundra y te rodea un aura de 10 pies mientras dure. Su efecto se activa al entrar en Furia y otra vez en cada turno con una acción adicional. Desierto: las criaturas del aura hacen una salvación de DES o reciben tantos d4 de fuego como tu bonificador de daño de Furia (puedes librar a una). Mar: una criatura del aura hace una salvación de DES o recibe tantos d6 de rayo como tu bonificador de Furia (la mitad si la pasa). Tundra: una criatura del aura hace una salvación de FUE o resta tantos d4 como tu bonificador de Furia a su siguiente tirada de daño. La CD es 8 + competencia + CON.'),
        r(6, 'Alma de Tormenta', 'pasiva', 'Según el entorno que elegiste la última vez que entraste en Furia. Desierto: resistencia al fuego y, como acción mágica, prendes fuego a un objeto inflamable que nadie lleve. Mar: resistencia al rayo, respiras bajo el agua y tienes velocidad de nado igual a tu velocidad. Tundra: resistencia al frío y, como acción mágica, congelas un cubo de agua de 5 pies durante 1 minuto (falla si hay una criatura dentro).'),
        r(10, 'Tormenta Protectora', 'pasiva', 'Las criaturas que elijas dentro de tu Aura de Tormenta tienen la misma resistencia que te da Alma de Tormenta.'),
        r(14, 'Tormenta Furiosa', 'pasiva', 'Tu aura golpea más fuerte. Desierto: una vez por turno, quien falle la salvación empieza a arder durante 1 minuto o hasta que acabe tu Furia y recibe 1d4 de fuego extra al inicio de cada turno suyo. Mar: pase o falle, el rayo salta a otra criatura que elijas a 30 pies de la primera, que hace la misma salvación. Tundra: una vez por turno, quien falle la salvación recibe 2d4 de frío y su velocidad se reduce a la mitad hasta el final de su siguiente turno.'),
      ],
    },
  },
  guerrero: {
    'caballero-playtest': {
      n: 'Caballero (Playtest)',
      rasgos: [
        r(3, 'Competencia Adicional', 'pasiva', 'Ganas competencia en Trato con Animales, Historia, Perspicacia, Interpretación o Persuasión, o aprendes un idioma, a tu elección.'),
        r(3, 'Nacido para la Silla', 'pasiva', 'Tienes ventaja en las salvaciones para no caerte de tu montura. Si te caes desde 10 pies o menos y no estás Incapacitado, caes de pie. Montar o desmontar te cuesta solo 5 pies de movimiento.'),
        r(3, 'Marca Inquebrantable', 'gratis', 'Al acertar con un arma cuerpo a cuerpo, marcas a la criatura hasta el final de tu próximo turno (sin límite de usos). Mientras esté a 5 pies de ti, tiene desventaja al atacar a cualquiera que no seas tú. Si acierta a otra criatura, tienes ventaja al atacarla hasta el final de tu próximo turno.'),
        r(7, 'Maniobra de Protección', 'reaccion', 'Si tú o una criatura que ves a 5 pies recibís un acierto, con tu reacción (empuñando un arma cuerpo a cuerpo o un escudo) tiras 1d8 y lo sumas a la CA del objetivo contra ese ataque; si aun así acierta, el objetivo resiste el daño. Usos: tu CON (mínimo 1) por descanso largo.'),
        r(10, 'Mantener la Línea', 'pasiva', 'Las criaturas provocan un ataque de oportunidad tuyo al moverse 5 pies o más dentro de tu alcance. Si lo aciertas, su velocidad pasa a 0 hasta el final del turno.'),
        r(15, 'Carga Feroz', 'pasiva', 'En la primera ronda de cada combate, tú y tu montura tenéis 10 pies más de velocidad y vuestro movimiento no provoca ataques de oportunidad. Cuando llegas a 5 pies de una criatura esa ronda, hace una salvación de FUE o la empujas 5 pies o la derribas (una salvación por turno).'),
        r(18, 'Defensor Vigilante', 'reaccion', 'En combate tienes una reacción especial en cada turno que no sea el tuyo, solo para hacer un ataque de oportunidad, y no en el mismo turno en que uses tu reacción normal.'),
      ],
    },
  },
  monje: {
    embriaguez: {
      n: 'Guerrero de la Embriaguez',
      rasgos: [
        r(3, 'Competencias Adicionales', 'pasiva', 'Ganas competencia en Interpretación (o, si ya la tenías, en otra habilidad de la lista del monje) y con los útiles de cervecero.'),
        r(3, 'Técnica del Borracho', 'pasiva', 'Cada vez que usas Ráfaga de Golpes, tu velocidad aumenta 10 pies hasta el final del turno y tu movimiento no provoca ataques de oportunidad.'),
        r(6, 'Vaivén Ebrio', 'reaccion', 'Levantarte del suelo te cuesta solo 5 pies de movimiento. Además, cuando una criatura falla un ataque cuerpo a cuerpo contra ti, puedes gastar 1 Punto de Enfoque y tu reacción para que ese ataque acierte a otra criatura que elijas a 5 pies de ti.'),
        r(6, 'Brebaje Místico', 'fuera', 'Al terminar un descanso corto o largo con útiles de cervecero, creas una bebida mágica que solo te sirve a ti; si no la bebes antes del siguiente descanso, desaparece. Beber una pinta lleva 1 minuto y su efecto dura 1 hora (8 horas si al crearla gastas 1 Punto de Enfoque). Dragón de Canela: como acción mágica, exhalas un cono de 30 pies; salvación de DES o cuatro tiradas de tu dado de Artes Marciales de fuego y Envenenado hasta el final de su siguiente turno (la mitad y sin veneno si la pasa). Espíritu Celestial: resistencia al daño psíquico y radiante. Chapuzón Refrescante: cada vez que recuperas PG, sumas una tirada de tu dado de Artes Marciales.'),
        r(11, 'Maestro Cervecero', 'pasiva', 'Tu Brebaje Místico gana dos bebidas. Relámpago Azul: cuando usas una reacción que no sea un ataque de oportunidad ni un conjuro, puedes dar un golpe sin armas como parte de ella. Suerte del Borracho: ganas Inspiración Heroica si no la tienes, y puedes volver a dártela al tirar iniciativa sin ella.'),
        r(17, 'Frenesí Ebrio', 'pasiva', 'Al usar Ráfaga de Golpes puedes dar hasta tres golpes sin armas más (seis en total), siempre que cada golpe vaya contra una criatura distinta este turno.'),
      ],
    },
  },
  paladin: {
    rompejuramentos: {
      n: 'Rompejuramentos',
      rasgos: [
        r(3, 'Conjurar Muertos Vivientes', 'adicional', 'Con una acción adicional y un uso de Canalizar Divinidad invocas tantos esqueletos o zombis (a tu elección) como la mitad de tu CAR, redondeando hacia arriba (mínimo 1), a 30 pies. Te obedecen 1 minuto y luego se deshacen en ceniza; actúan justo después de ti y, si no les das órdenes, Esquivan.'),
        r(3, 'Aspecto Temible', 'gratis', 'Justo después de lanzar Castigo divino, puedes gastar un uso de Canalizar Divinidad: las criaturas que elijas a 30 pies hacen una salvación de SAB o quedan Asustadas 1 minuto (repiten la salvación al final de cada turno suyo).'),
        r(3, 'Conjuros del Rompejuramentos', 'pasiva', 'Siempre tienes preparados los conjuros del juramento según tu nivel de paladín.'),
        r(7, 'Aura de Odio', 'pasiva', 'Cuando tú, o un infernal o muerto viviente aliado dentro de tu Aura de Protección, acertáis a una criatura con un ataque cuerpo a cuerpo, hace daño necrótico extra igual a tu CAR.'),
        r(15, 'Resistencia Sobrenatural', 'pasiva', 'Tienes resistencia al daño contundente, cortante y perforante.'),
        r(20, 'Señor del Terror', 'adicional', 'Con una acción adicional llenas tu Aura de Protección de penumbra durante 10 minutos: oscuridad mágica en la que tú y tus aliados veis; las criaturas Asustadas que empiezan su turno en ella reciben 4d10 de daño psíquico; y con una acción adicional haces un ataque de conjuro cuerpo a cuerpo contra alguien del aura que hace 3d10 + CAR de daño necrótico. Una vez por descanso largo, o gastando un espacio de nivel 5.', { usos: 1, reset: 'largo' }),
      ],
    },
  },
};

export const LIBRO_PLAYTEST = 'Unearthed Arcana 2025: Subclasses Update (noviembre de 2025)';
