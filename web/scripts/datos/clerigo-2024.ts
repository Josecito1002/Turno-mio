/* Clérigo de la biblioteca (rasgos de nivel alto y dominios) puesto al día con su versión oficial más reciente:
   Manual del Jugador 2024 (Vida, Luz, Engaño, Guerra); Dominio del Conocimiento de Forgotten Realms: Heroes of Faerûn
   (2025); Dominio de la Tumba de Ravenloft: The Horrors Within (2026); Dominio Arcano de Arcana Unleashed (2026).
   Los dominios sin versión 2024 (Tempestad, Naturaleza, Forja, Orden, Paz, Crepúsculo, Muerte) pasan sus rasgos de
   nivel 1 y 2 al 3, y pierden el de nivel 8 (Golpe Divino o Lanzamiento Potente), que en 2024 es Golpes Benditos.
   Borrador de Gemini revisado. Textos propios; las listas de conjuros y los números están en reglas-revisadas.ts.
   Lo aplica scripts/actualizar-clase.ts (opción "clerigo"). */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });
const conjuros = (dominio: string) => r(3, `Conjuros del ${dominio}`, 'pasiva', 'Siempre tienes preparados los conjuros de tu dominio, que se amplían en los niveles 5, 7 y 9.');

export const CLERIGO_2024 = {
  rasgosAltos: [
    r(7, 'Golpes Benditos', 'pasiva', 'Tu dios bendice tus golpes o tus trucos: eliges Golpe Divino o Lanzamiento Potente.'),
    r(10, 'Intervención Divina', 'accion', 'Como acción mágica, lanzas cualquier conjuro de clérigo de nivel 5 o menor que no sea de reacción, sin gastar espacio ni componentes materiales.', { usos: 1, reset: 'largo' }),
    r(14, 'Golpes Benditos Mejorados', 'pasiva', 'Tu opción de Golpes Benditos se hace más fuerte.'),
    r(20, 'Intervención Divina Mayor', 'pasiva', 'Con Intervención Divina puedes lanzar Deseo. Si lo haces, no puedes volver a usar Intervención Divina hasta terminar 2d4 descansos largos.'),
  ],
  subAltos: {},
  subclases: {
    'dominio-vida': { n: 'Dominio de la Vida', rasgos: [
      conjuros('Dominio de la Vida'),
      r(3, 'Discípulo de la Vida', 'pasiva', 'Cuando un conjuro que lanzas con un espacio devuelve PG, sanas además 2 + el nivel del espacio, en el turno en que lo lanzas.'),
      r(3, 'Preservar Vida', 'accion', 'Como acción mágica y con un uso de Canalizar Divinidad, repartes PG entre criaturas Ensangrentadas a 30 pies (tú incluido), sin subir a nadie por encima de la mitad de sus PG máximos.'),
      r(6, 'Sanador Bendito', 'gratis', 'Cuando un conjuro que lanzas con un espacio cura a otra criatura, tú recuperas 2 + el nivel del espacio.'),
      r(17, 'Curación Suprema', 'pasiva', 'Cuando curas con un conjuro o con Canalizar Divinidad, no tiras los dados: cada uno da su valor máximo.'),
    ] },
    'dominio-luz': { n: 'Dominio de la Luz', rasgos: [
      conjuros('Dominio de la Luz'),
      r(3, 'Resplandor del Alba', 'accion', 'Como acción mágica y con un uso de Canalizar Divinidad, deshaces la oscuridad mágica a 30 pies y quienes elijas en esa zona hacen una salvación de CON o reciben daño radiante (mitad si la pasan).'),
      r(3, 'Destello Protector', 'reaccion', 'Cuando una criatura que ves a 30 pies hace una tirada de ataque, la haces con desventaja con un destello de luz.'),
      r(6, 'Destello Protector Mejorado', 'pasiva', 'Recuperas los usos de Destello Protector también con un descanso corto, y al usarlo el objetivo del ataque gana PG temporales.'),
      r(17, 'Corona de Luz', 'accion', 'Como acción mágica, durante 1 minuto irradias luz brillante a 60 pies; los enemigos en ella tienen desventaja en las salvaciones contra Resplandor del Alba y contra tus conjuros de fuego o radiantes.'),
    ] },
    'dominio-engano': { n: 'Dominio del Engaño', rasgos: [
      conjuros('Dominio del Engaño'),
      r(3, 'Bendición del Embaucador', 'accion', 'Como acción mágica, das a una criatura voluntaria que tocas (o a ti) ventaja en Sigilo hasta tu próximo descanso largo o hasta que la uses de nuevo.'),
      r(3, 'Invocar Duplicidad', 'adicional', 'Con un uso de Canalizar Divinidad, creas durante 1 minuto una ilusión perfecta de ti a 30 pies, que puedes mover 30 pies como acción adicional. Lanzas conjuros como si estuvieras en su lugar y, si tú y ella estáis a 5 pies de una criatura, tienes ventaja al atacarla.'),
      r(6, 'Transposición del Embaucador', 'adicional', 'Cuando creas o mueves tu ilusión con la acción adicional, puedes intercambiar tu lugar con ella.'),
      r(17, 'Duplicidad Mejorada', 'pasiva', 'Tus aliados también tienen ventaja al atacar a criaturas a 5 pies de tu ilusión. Cuando la ilusión acaba, tú o una criatura a 5 pies de ella recuperáis tantos PG como tu nivel de clérigo.'),
    ] },
    'dominio-guerra': { n: 'Dominio de la Guerra', rasgos: [
      conjuros('Dominio de la Guerra'),
      r(3, 'Golpe Guiado', 'gratis', 'Cuando tú o una criatura a 30 pies falla una tirada de ataque, gastas un uso de Canalizar Divinidad para sumarle +10. Si el ataque es de otra criatura, te cuesta la reacción.'),
      r(3, 'Sacerdote de la Guerra', 'adicional', 'Como acción adicional, haces un ataque con arma o un golpe sin armas.'),
      r(6, 'Bendición del Dios de la Guerra', 'accion', 'Con un uso de Canalizar Divinidad lanzas Escudo de fe o Arma espiritual sin espacio; así lanzados no requieren concentración y duran 1 minuto.'),
      r(17, 'Avatar de la Batalla', 'pasiva', 'Tienes resistencia al daño contundente, cortante y perforante.'),
    ] },
    'dominio-conocimiento': { n: 'Dominio del Conocimiento', rasgos: [
      conjuros('Dominio del Conocimiento'),
      r(3, 'Bendiciones del Saber', 'pasiva', 'Ganas competencia con unas herramientas de artesano y con dos habilidades entre Arcanos, Historia, Naturaleza y Religión, en las que además tienes pericia.'),
      r(3, 'Magia de la Mente', 'accion', 'Como acción mágica y con un uso de Canalizar Divinidad, lanzas un conjuro de adivinación de tu dominio que tengas preparado, sin gastar espacio ni componentes materiales.'),
      r(6, 'Mente Desatada', 'pasiva', 'Tienes telepatía a 60 pies y puedes hablar a la vez con tantas criaturas como tu SAB. Ganas competencia en salvaciones de INT (o, si ya la tenías, en otra que te falte).'),
      r(17, 'Presciencia Divina', 'adicional', 'Durante 1 hora tienes ventaja en las pruebas de d20. Recuperas el uso con un descanso largo o gastando un espacio de nivel 6 o más.', { usos: 1, reset: 'largo' }),
    ] },
    'dominio-tumba': { n: 'Dominio de la Tumba', rasgos: [
      conjuros('Dominio de la Tumba'),
      r(3, 'Círculo de la Mortalidad', 'pasiva', 'Una vez por turno, al dañar con un conjuro o una tirada de ataque a una criatura que no tiene todos sus PG, le haces daño necrótico extra. Lanzas Perdonar a los moribundos como acción adicional, y al curar a alguien con 0 PG usas el máximo de cada dado.'),
      r(3, 'Sendero a la Tumba', 'adicional', 'Con un uso de Canalizar Divinidad, maldices hasta el inicio de tu próximo turno a una criatura que ves a 30 pies: tiene desventaja en ataques y salvaciones. Cuando tú o un aliado la acertáis, podéis acabar la maldición para sumar tu nivel de clérigo como daño necrótico o radiante.'),
      r(6, 'Centinela en la Puerta de la Muerte', 'reaccion', 'Cuando un ataque acierta a ti o a una criatura Ensangrentada que ves a 60 pies, reduces su daño a la mitad; si era crítico, se anulan sus efectos de crítico.'),
      r(17, 'Segador Divino', 'pasiva', 'Con un uso de Canalizar Divinidad, un conjuro de nigromancia de nivel 5 o menor de un solo objetivo, o uno de tu dominio, afecta a un segundo objetivo. Además, cuando muere un enemigo a 60 pies, tú o una criatura que ves recuperáis el doble de tu nivel de clérigo en PG (una vez por descanso, o gastando un espacio de nivel 6 o más).', { usos: 1, reset: 'corto' }),
    ] },
    'dominio-arcano': { n: 'Dominio Arcano', rasgos: [
      conjuros('Dominio Arcano'),
      r(3, 'Estudiante de lo Arcano', 'pasiva', 'Ganas competencia en Arcanos (o en otra habilidad de las que ofrece el clérigo) y aprendes dos trucos de mago, que puedes cambiar al subir de nivel.'),
      r(3, 'Modificar la Magia', 'gratis', 'Al lanzar un conjuro, gastas un uso de Canalizar Divinidad para cambiarlo (las opciones salen aparte).'),
      r(6, 'Recuperación Disipadora', 'gratis', 'Justo después de curar o quitar un estado con un conjuro de espacio, lanzas Disipar magia sin espacio. Se recupera con un descanso corto o largo, o gastando un uso de Canalizar Divinidad.', { usos: 1, reset: 'corto' }),
      r(17, 'Maestría Mágica', 'pasiva', 'Aprendes un conjuro de mago de cada nivel 6, 7, 8 y 9, siempre preparados; al subir de nivel puedes cambiar uno por otro del mismo nivel.'),
    ] },
    'dominio-tempestad': { n: 'Dominio de la Tempestad', rasgos: [
      conjuros('Dominio de la Tempestad'),
      r(3, 'Competencias de la Tormenta', 'pasiva', 'Ganas competencia con armas marciales y armaduras pesadas.'),
      r(3, 'Ira de la Tormenta', 'reaccion', 'Cuando una criatura a 5 pies que ves te acierta, hace una salvación de DES o recibe daño de trueno o relámpago (mitad si la pasa).'),
      r(3, 'Ira Destructora', 'gratis', 'Al tirar daño de trueno o relámpago, gastas un uso de Canalizar Divinidad para que cada dado dé su máximo.'),
      r(6, 'Golpe del Trueno', 'pasiva', 'Cuando haces daño de relámpago a una criatura Grande o más pequeña, puedes empujarla hasta 10 pies.'),
      r(17, 'Nacido de la Tormenta', 'pasiva', 'Al aire libre tienes velocidad de vuelo igual a tu velocidad.'),
    ] },
    'dominio-naturaleza': { n: 'Dominio de la Naturaleza', rasgos: [
      conjuros('Dominio de la Naturaleza'),
      r(3, 'Acólito de la Naturaleza', 'pasiva', 'Aprendes un truco de druida y ganas competencia en Trato con Animales, Naturaleza o Supervivencia.'),
      r(3, 'Competencia Adicional', 'pasiva', 'Ganas competencia con armaduras pesadas.'),
      r(3, 'Hechizar Animales y Plantas', 'accion', 'Con un uso de Canalizar Divinidad, las bestias y plantas que te ven a 30 pies hacen una salvación de SAB o quedan Hechizadas por ti 1 minuto, o hasta que reciban daño.'),
      r(6, 'Amortiguar los Elementos', 'reaccion', 'Cuando tú o una criatura a 30 pies recibís daño de ácido, frío, fuego, relámpago o trueno, le das resistencia a ese daño.'),
      r(17, 'Señor de la Naturaleza', 'adicional', 'Das órdenes a las criaturas que tienes Hechizadas con Hechizar Animales y Plantas.'),
    ] },
    'dominio-forja': { n: 'Dominio de la Forja', rasgos: [
      conjuros('Dominio de la Forja'),
      r(3, 'Competencias de la Forja', 'pasiva', 'Ganas competencia con armaduras pesadas y con herramientas de herrero.'),
      r(3, 'Bendición de la Forja', 'fuera', 'Al final de un descanso largo, tocas un arma o armadura no mágica: hasta tu próximo descanso largo es mágica y da +1 al ataque y al daño, o +1 a la CA.', { usos: 1, reset: 'largo' }),
      r(3, 'Bendición del Artesano', 'fuera', 'Con un uso de Canalizar Divinidad y un ritual de 1 hora, creas un objeto no mágico con algo de metal, de hasta 100 po, fundiendo metal de su mismo valor.'),
      r(6, 'Alma de la Forja', 'pasiva', 'Tienes resistencia al fuego y, con armadura pesada, +1 a la CA.'),
      r(17, 'Santo de la Forja y el Fuego', 'pasiva', 'Eres inmune al fuego y, con armadura pesada, tienes resistencia al daño contundente, cortante y perforante de ataques no mágicos.'),
    ] },
    'dominio-orden': { n: 'Dominio del Orden', rasgos: [
      conjuros('Dominio del Orden'),
      r(3, 'Competencias del Orden', 'pasiva', 'Ganas competencia con armaduras pesadas y en Intimidación o Persuasión.'),
      r(3, 'Voz de Autoridad', 'gratis', 'Cuando lanzas con un espacio un conjuro que tiene como objetivo a un aliado, ese aliado puede usar su reacción para hacer un ataque con arma.'),
      r(3, 'Exigencia del Orden', 'accion', 'Con un uso de Canalizar Divinidad, las criaturas que elijas a 30 pies hacen una salvación de SAB o quedan Hechizadas hasta el final de tu próximo turno o hasta recibir daño; puedes hacer que suelten lo que llevan.'),
      r(6, 'Encarnación de la Ley', 'gratis', 'Lanzas un conjuro de encantamiento de espacio y de 1 acción como acción adicional.'),
      r(17, 'Cólera del Orden', 'gratis', 'Una vez por turno, al dañar a una criatura con Golpe Divino la maldices hasta tu próximo turno: el siguiente aliado que la acierte le hace 2d8 de daño psíquico extra.'),
    ] },
    'dominio-paz': { n: 'Dominio de la Paz', rasgos: [
      conjuros('Dominio de la Paz'),
      r(3, 'Instrumento de la Paz', 'pasiva', 'Ganas competencia en Perspicacia, Interpretación o Persuasión.'),
      r(3, 'Vínculo Alentador', 'accion', 'Unes durante 10 minutos a tantas criaturas voluntarias a 30 pies como tu competencia (puedes incluirte). Una vez por turno, un vinculado que esté a 30 pies de otro suma 1d4 a una tirada de ataque, prueba o salvación.'),
      r(3, 'Bálsamo de Paz', 'accion', 'Con un uso de Canalizar Divinidad, te mueves tu velocidad sin provocar ataques de oportunidad y curas una vez a cada criatura que elijas a 5 pies durante el recorrido.'),
      r(6, 'Vínculo Protector', 'reaccion', 'Cuando un vinculado va a recibir daño, otro vinculado a 30 pies puede usar su reacción para teletransportarse junto a él y recibir el daño en su lugar.'),
      r(17, 'Vínculo Expansivo', 'pasiva', 'Tus vínculos llegan a 60 pies, y quien recibe el daño con Vínculo Protector tiene resistencia a él.'),
    ] },
    'dominio-crepusculo': { n: 'Dominio del Crepúsculo', rasgos: [
      conjuros('Dominio del Crepúsculo'),
      r(3, 'Competencias del Crepúsculo', 'pasiva', 'Ganas competencia con armas marciales y armaduras pesadas.'),
      r(3, 'Ojos de la Noche', 'accion', 'Ves en la oscuridad a 300 pies. Como acción, compartes esa visión durante 1 hora con tantas criaturas voluntarias a 10 pies como tu SAB; una vez por descanso largo, o gastando un espacio.', { usos: 1, reset: 'largo' }),
      r(3, 'Bendición del Vigilante', 'accion', 'Tocas a una criatura (puedes ser tú): tiene ventaja en su siguiente tirada de iniciativa. Solo una criatura a la vez.'),
      r(3, 'Santuario Crepuscular', 'accion', 'Con un uso de Canalizar Divinidad, emanas durante 1 minuto una esfera de penumbra de 30 pies. Al final del turno de cada criatura que elijas dentro, le das PG temporales o le quitas Hechizado o Asustado.'),
      r(6, 'Pasos de la Noche', 'adicional', 'En luz tenue u oscuridad, ganas durante 1 minuto velocidad de vuelo igual a tu velocidad.'),
      r(17, 'Mortaja Crepuscular', 'pasiva', 'Tú y tus aliados tenéis media cobertura dentro de tu Santuario Crepuscular.'),
    ] },
    'dominio-muerte': { n: 'Dominio de la Muerte', rasgos: [
      conjuros('Dominio de la Muerte'),
      r(3, 'Competencia Adicional', 'pasiva', 'Ganas competencia con armas marciales.'),
      r(3, 'Segador', 'pasiva', 'Aprendes un truco de nigromancia de cualquier lista. Tus trucos de nigromancia de un solo objetivo pueden afectar a dos criaturas que estén a 5 pies entre sí.'),
      r(3, 'Toque de la Muerte', 'gratis', 'Al acertar con un ataque cuerpo a cuerpo, gastas un uso de Canalizar Divinidad para hacer daño necrótico extra.'),
      r(6, 'Destrucción Ineludible', 'pasiva', 'El daño necrótico de tus conjuros de clérigo y de Canalizar Divinidad ignora la resistencia al necrótico.'),
      r(17, 'Segador Mejorado', 'pasiva', 'Tus conjuros de nigromancia de nivel 1 a 5 de un solo objetivo pueden afectar a dos criaturas a 5 pies entre sí (pones el componente material de cada una si se consume).'),
    ] },
  },
};
