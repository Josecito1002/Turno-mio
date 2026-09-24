/* Bárbaro de la biblioteca (rasgos de nivel alto y subclases) puesto al día con el Manual del Jugador 2024.
   Textos propios en español. Los rasgos llevan `manual: true` (tipo revisado); lo que necesita números o
   selector está en reglas-revisadas.ts. Lo aplica scripts/actualizar-clase.ts (opción "barbaro"). */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const BARBARO_2024 = {
  rasgosAltos: [
    r(7, 'Instinto Salvaje', 'pasiva', 'Ventaja en las tiradas de iniciativa.'),
    r(7, 'Salto Instintivo', 'gratis', 'Como parte de la acción adicional con que entras en Furia, te mueves hasta la mitad de tu velocidad.'),
    r(9, 'Golpe Brutal', 'gratis', 'Si usas Ataque Temerario, renuncias a la ventaja en un ataque de FUE (sin desventaja); si aciertas, haces daño extra y aplicas un efecto de Golpe Brutal.'),
    r(11, 'Furia Implacable', 'gratis', 'Si caes a 0 PG en Furia sin morir, haces una salvación de CON (CD 10, +5 por cada uso; vuelve a 10 tras un descanso corto o largo): si la pasas, tus PG pasan a ser el doble de tu nivel de bárbaro.'),
    r(13, 'Golpe Brutal Mejorado', 'pasiva', 'Nuevos efectos de Golpe Brutal: Golpe Tambaleante y Golpe Demoledor.'),
    r(15, 'Furia Persistente', 'gratis', 'Al tirar iniciativa recuperas todos tus usos de Furia (una vez por descanso largo). Tu Furia dura 10 minutos sin tener que mantenerla, y solo acaba antes si quedas Inconsciente o te pones armadura pesada.', { usos: 1, reset: 'largo' }),
    r(17, 'Golpe Brutal Superior', 'pasiva', 'El daño extra de Golpe Brutal sube a 2d10 y aplicas dos efectos distintos.'),
    r(18, 'Poder Indómito', 'pasiva', 'Si el total de una prueba o salvación de FUE es menor que tu puntuación de FUE, usas la puntuación.'),
    r(20, 'Campeón Primordial', 'pasiva', 'Tu FUE y tu CON suben 4, hasta un máximo de 25.'),
  ],
  subclases: {
    'senda-berserker': { n: 'Senda del Berserker', rasgos: [
      r(3, 'Frenesí', 'gratis', 'Si usas Ataque Temerario con la Furia activa, el primer objetivo que aciertes en tu turno con un ataque de FUE recibe tantos d6 extra como tu bonificador de daño de Furia.'),
      r(6, 'Furia Sin Sentido', 'pasiva', 'Con la Furia activa eres inmune a quedar Hechizado o Asustado; al entrar en Furia se te quitan esos estados.'),
      r(10, 'Represalia', 'reaccion', 'Cuando una criatura a 5 pies te hace daño, la atacas cuerpo a cuerpo con un arma o un golpe sin armas.'),
      r(14, 'Presencia Intimidante', 'adicional', 'Las criaturas que elijas en 30 pies hacen una salvación de SAB o quedan Asustadas 1 minuto (repiten al final de cada turno). Una vez por descanso largo, o gastando un uso de Furia.', { usos: 1, reset: 'largo' }),
    ] },
    'senda-corazon-salvaje': { n: 'Senda del Corazón Salvaje', rasgos: [
      r(3, 'Hablante Animal', 'fuera', 'Lanzas Sentido de la bestia y Hablar con los animales, solo como rituales, con SAB.'),
      r(3, 'Furia de lo Salvaje', 'pasiva', 'Cada vez que entras en Furia eliges un animal: Oso, Águila o Lobo.'),
      r(6, 'Aspecto de lo Salvaje', 'pasiva', 'Eliges un aspecto, que puedes cambiar al terminar un descanso largo: Búho, Pantera o Salmón.'),
      r(10, 'Hablante de la Naturaleza', 'fuera', 'Lanzas Comunión con la naturaleza, solo como ritual, con SAB.'),
      r(14, 'Poder de lo Salvaje', 'pasiva', 'Cada vez que entras en Furia eliges un poder: Halcón, León o Carnero.'),
    ] },
    'senda-arbol-mundo': { n: 'Senda del Árbol del Mundo', rasgos: [
      r(3, 'Vitalidad del Árbol', 'pasiva', 'Al entrar en Furia ganas PG temporales iguales a tu nivel de bárbaro. Al empezar cada turno en Furia, das PG temporales a otra criatura a 10 pies.'),
      r(6, 'Ramas del Árbol', 'reaccion', 'Cuando una criatura que ves empieza su turno a 30 pies y tu Furia está activa, la obligas a una salvación de FUE o la teletransportas junto a ti.'),
      r(10, 'Raíces Arietes', 'pasiva', 'En tu turno, las armas cuerpo a cuerpo Pesadas o Versátiles te dan 10 pies más de alcance, y al acertar con ellas puedes aplicar Empujar o Derribar además de otra maestría.'),
      r(14, 'Viaje por el Árbol', 'adicional', 'Al entrar en Furia, y con acción adicional mientras dura, te teletransportas hasta 60 pies. Una vez por Furia puede ser de 150 pies y llevarte hasta seis criaturas voluntarias a 10 pies.'),
    ] },
    'senda-fanatico': { n: 'Senda del Fanático', rasgos: [
      r(3, 'Furia Divina', 'gratis', 'En cada uno de tus turnos en Furia, la primera criatura que aciertas con un arma o un golpe sin armas recibe daño extra radiante o necrótico.'),
      r(3, 'Guerrero de los Dioses', 'adicional', 'Tienes una reserva de d12 que gastas para curarte; se recupera con un descanso largo.'),
      r(6, 'Foco Fanático', 'gratis', 'Una vez por Furia, si fallas una salvación, la repites sumando tu bonificador de daño de Furia.'),
      r(10, 'Presencia Fanática', 'adicional', 'Hasta diez criaturas que elijas a 60 pies tienen ventaja en ataques y salvaciones hasta el inicio de tu próximo turno. Una vez por descanso largo, o gastando un uso de Furia.', { usos: 1, reset: 'largo' }),
      r(14, 'Furia de los Dioses', 'gratis', 'Al entrar en Furia tomas forma de guerrero divino durante 1 minuto: vuelo, resistencias y salvar a otros de caer a 0 PG. Una vez por descanso largo.', { usos: 1, reset: 'largo' }),
    ] },
  },
};
