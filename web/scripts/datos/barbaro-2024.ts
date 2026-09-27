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
    'senda-guardian-ancestral': { n: 'Senda del Guardián Ancestral', rasgos: [
      r(3, 'Protectores Ancestrales', 'gratis', 'Con la Furia activa, la primera criatura que aciertas en tu turno queda acosada por guerreros espectrales hasta el inicio de tu siguiente turno: tiene desventaja en los ataques que no sean contra ti, y quien reciba un ataque suyo que no seas tú tiene resistencia a ese daño. Termina antes si acaba tu Furia.'),
      r(6, 'Escudo Espiritual', 'reaccion', 'Con la Furia activa, cuando otra criatura que ves a 30 pies recibe daño, usas tu reacción para reducirlo en 2d6 (3d6 desde el nivel 10 y 4d6 desde el 14).'),
      r(10, 'Consultar a los Espíritus', 'fuera', 'Lanzas Augurio o Clarividencia sin espacio ni componentes materiales, con SAB; con Clarividencia, en lugar del sensor mandas a uno de tus espíritus invisible. Una vez por descanso corto o largo.', { usos: 1, reset: 'corto' }),
      r(14, 'Ancestros Vengativos', 'pasiva', 'Cuando Escudo Espiritual reduce el daño de un ataque, el atacante recibe tanto daño de fuerza como el que evitaste.'),
    ] },
    'senda-rabioso-batalla': { n: 'Senda del Rabioso de Batalla', rasgos: [
      r(3, 'Armadura de Rabioso', 'adicional', 'Con armadura con pinchos y la Furia activa, con una acción adicional atacas cuerpo a cuerpo con los pinchos a una criatura a 5 pies: 1d4 perforante con FUE. Además, cuando usas Atacar para agarrar a una criatura y lo logras, recibe 3 de daño perforante. En los Reinos Olvidados es una senda solo de enanos, salvo que el DM diga otra cosa.'),
      r(6, 'Abandono Temerario', 'pasiva', 'Cuando usas Ataque Temerario con la Furia activa, ganas PG temporales iguales a tu mod. de CON (mínimo 1), que se pierden al terminar la Furia.'),
      r(10, 'Carga del Rabioso', 'adicional', 'Con la Furia activa puedes usar la acción Correr como acción adicional.'),
      r(14, 'Represalia de Pinchos', 'pasiva', 'Con la Furia activa, sin estar Incapacitado y con armadura con pinchos, quien te acierte con un ataque cuerpo a cuerpo a 5 pies recibe 3 de daño perforante.'),
    ] },
    'senda-bestia': { n: 'Senda de la Bestia', rasgos: [
      r(3, 'Forma de la Bestia', 'gratis', 'Al entrar en Furia puedes transformarte y ganar un arma natural (arma sencilla cuerpo a cuerpo con FUE) hasta que acabe: Mordisco (1d8 perforante; una vez por turno, si tienes menos de la mitad de tus PG, al dañar recuperas tu bonificador de competencia en PG), Garras (1d6 cortante; al atacar con Atacar, un ataque de garra más) o Cola (1d8 perforante con alcance; con tu reacción sumas 1d8 a tu CA contra un ataque de alguien a 10 pies).'),
      r(6, 'Alma Bestial', 'fuera', 'Tus armas naturales cuentan como mágicas. Al terminar un descanso corto o largo eliges hasta el siguiente: nadar a tu velocidad y respirar bajo el agua; trepar a tu velocidad, incluso por techos; o, una vez por turno, alargar un salto tantos pies como saques en una prueba de Fuerza (Atletismo).'),
      r(10, 'Furia Contagiosa', 'gratis', 'Al acertar con tus armas naturales en Furia, el objetivo hace una salvación de SAB (CD 8 + CON + competencia) o, a tu elección, usa su reacción para atacar cuerpo a cuerpo a otra criatura que elijas, o recibe 2d12 de daño psíquico.'),
      r(14, 'Llamar a la Cacería', 'gratis', 'Al entrar en Furia eliges hasta tu mod. de CON (mínimo 1) criaturas dispuestas a 30 pies: ganas 5 PG temporales por cada una, y hasta que acabe la Furia, una vez en cada uno de sus turnos, al acertar y dañar pueden sumar 1d6 al daño.'),
    ] },
    'senda-gigante': { n: 'Senda del Gigante', rasgos: [
      r(3, 'Poder de Gigante', 'pasiva', 'Aprendes gigante (u otro idioma si ya lo sabías) y el truco Druidismo o Taumaturgia, a tu elección, con SAB.'),
      r(3, 'Estrago de Gigante', 'pasiva', 'Con la Furia activa, tu alcance aumenta 5 pies y, si eres menor que Grande, pasas a Grande con lo que lleves (si hay sitio). Además, al acertar un ataque a distancia con un arma arrojadiza usando FUE, sumas tu bonificador de daño de Furia.'),
      r(6, 'Hendedor Elemental', 'adicional', 'Al entrar en Furia imbuyes un arma que empuñas con ácido, frío, fuego, relámpago o trueno: su daño pasa a ese tipo, hace 1d6 extra de ese tipo (2d6 desde el nivel 14) y gana la propiedad Arrojadiza (20/60), volviendo a tu mano tras cada lanzamiento. Con una acción adicional cambias el tipo.'),
      r(10, 'Impulso Poderoso', 'adicional', 'Con la Furia activa, con una acción adicional mueves a una criatura mediana o menor a tu alcance hasta un espacio libre que veas a 30 pies (grande o menor desde el nivel 14). Si no quiere, hace una salvación de FUE (CD 8 + FUE + competencia). Si no cae sobre algo firme, cae y queda Derribada.'),
      r(14, 'Coloso Demiúrgico', 'pasiva', 'Al entrar en Furia tu alcance aumenta 10 pies en lugar de 5, puedes pasar a Grande o Enorme, Impulso Poderoso mueve criaturas grandes o menores, y Hendedor Elemental hace 2d6.'),
    ] },
    'senda-heraldo-tormenta': { n: 'Senda del Heraldo de la Tormenta', rasgos: [
      r(3, 'Aura de Tormenta', 'adicional', 'Con la Furia activa emanas un aura de 10 pies que se activa al entrar en Furia y, después, con una acción adicional en cada turno. Eliges desierto, mar o tundra (puedes cambiarlo al subir de nivel). Desierto: las demás criaturas del aura reciben 2 de fuego (3 en el nivel 5, 4 en el 10, 5 en el 15 y 6 en el 20). Mar: una criatura del aura hace una salvación de DES (CD 8 + CON + competencia) o recibe 1d6 de relámpago (2d6 en el 10, 3d6 en el 15, 4d6 en el 20), la mitad si la supera. Tundra: las criaturas que elijas del aura ganan 2 PG temporales (sube igual que el desierto).'),
      r(6, 'Alma de Tormenta', 'pasiva', 'Según tu entorno. Desierto: resistencia al fuego, el calor extremo no te afecta, y con una acción prendes fuego a un objeto inflamable que toques y nadie lleve. Mar: resistencia al relámpago, respiras bajo el agua y nadas 30 pies. Tundra: resistencia al frío, el frío extremo no te afecta, y con una acción conviertes en hielo un cubo de agua de 5 pies durante 1 minuto.'),
      r(10, 'Tormenta Protectora', 'pasiva', 'Las criaturas que elijas tienen la resistencia de tu Alma de Tormenta mientras estén en tu aura.'),
      r(14, 'Tormenta Furiosa', 'reaccion', 'Según tu entorno. Desierto: cuando una criatura del aura te acierta, con tu reacción hace una salvación de DES o recibe fuego igual a la mitad de tu nivel de bárbaro. Mar: cuando aciertas a una criatura del aura, con tu reacción hace una salvación de FUE o queda Derribada. Tundra: cada vez que se activa el aura, una criatura que ves en ella hace una salvación de FUE o su velocidad queda en 0 hasta el inicio de tu siguiente turno.'),
    ] },
    'senda-magia-salvaje': { n: 'Senda de la Magia Salvaje', rasgos: [
      r(3, 'Percepción Mágica', 'accion', 'Como acción, hasta el final de tu siguiente turno sabes dónde hay conjuros u objetos mágicos a 60 pies que no estén tras cobertura total, y de qué escuela es cada conjuro.'),
      r(3, 'Oleada Salvaje', 'gratis', 'Al entrar en Furia tiras 1d8 (CD 8 + CON + competencia): 1, zarcillos de sombra (salvación de CON o 1d12 necrótico a quien elijas a 30 pies) y ganas 1d12 PG temporales; 2, te teletransportas 30 pies, repetible con acción adicional; 3, un espíritu estalla junto a una criatura a 30 pies (salvación de DES o 1d6 de fuerza a 5 pies), repetible con acción adicional; 4, un arma tuya hace daño de fuerza y gana Ligera y Arrojadiza (20/60); 5, quien te acierte recibe 1d6 de fuerza; 6, luces que te dan +1 a la CA a ti y a tus aliados a 10 pies; 7, el suelo a 15 pies es terreno difícil para tus enemigos; 8, un rayo de luz: una criatura a 30 pies hace una salvación de CON o recibe 1d6 radiante y queda Cegada hasta tu siguiente turno, repetible con acción adicional. Todo dura hasta que acabe la Furia.'),
      r(6, 'Magia Reforzante', 'accion', 'Como acción tocas a una criatura (tú incluido) y eliges: durante 10 minutos suma 1d3 a sus tiradas de ataque y pruebas de característica, o recupera un espacio de conjuro de nivel 1d3 o menor (una vez por descanso largo cada criatura).'),
      r(10, 'Contragolpe Inestable', 'reaccion', 'Con la Furia activa, justo después de recibir daño o fallar una salvación, usas tu reacción para tirar en la tabla de Oleada Salvaje; el nuevo efecto reemplaza al actual.'),
      r(14, 'Oleada Controlada', 'pasiva', 'Cuando tiras en la tabla de Oleada Salvaje, tiras dos veces y eliges el efecto; si sale el mismo número, eliges cualquiera.'),
    ] },
  },
};
