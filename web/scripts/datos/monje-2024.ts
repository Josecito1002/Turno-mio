/* Monje de la biblioteca puesto al día con su versión oficial más reciente (texto oficial de 5etools, redactado por
   Gemini y revisado con scripts/gemini/revisar.ts). Libros: Manual del Jugador (2024); Arcana Unleashed (2026).
   Lo aplica scripts/actualizar-clase.ts (opción "monje"). */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const MONJE_2024 = {
  rasgosAltos: [
    r(7, 'Evasión', 'pasiva', 'Cuando un efecto te permite hacer una salvación de Destreza para recibir la mitad del daño, en su lugar no recibes daño si tienes éxito, y solo la mitad si fallas. No funciona si estás incapacitado.'),
    r(9, 'Movimiento Acrobático', 'pasiva', 'Mientras no uses armadura ni escudo, puedes moverte a través de líquidos y superficies verticales durante tu turno sin caerte.'),
    r(10, 'Enfoque Elevado', 'pasiva', 'Tu Ráfaga de Golpes permite hacer tres ataques. Al usar Defensa Paciente con Puntos de Enfoque, ganas PG temporales (dos dados de Artes Marciales). Al usar Paso del Viento con Puntos de Enfoque, puedes llevar contigo a un aliado a 5 pies.'),
    r(10, 'Autorestauración', 'gratis', 'Al final de cada uno de tus turnos, puedes eliminar la condición de Hechizado, Asustado o Envenenado de ti mismo (sin requerir acción). Además, no comer ni beber ya no te causa Agotamiento.'),
    r(13, 'Desviar Energía', 'pasiva', 'Tu rasgo Desviar Ataques ahora funciona contra cualquier tipo de daño, no solo daño Contundente, Perforante o Cortante.'),
    r(14, 'Superviviente Disciplinado', 'pasiva', 'Obtienes competencia en todas las tiradas de salvación. Si fallas una tirada de salvación, puedes gastar 1 Punto de Enfoque para repetirla (debes usar el nuevo resultado).'),
    r(15, 'Enfoque Perfecto', 'pasiva', 'Al tirar Iniciativa, si no usas Metabolismo Asombroso y tienes 3 o menos Puntos de Enfoque, recuperas puntos hasta tener 4.'),
    r(18, 'Defensa Superior', 'gratis', 'Al inicio de tu turno, puedes gastar 3 Puntos de Enfoque para obtener resistencia a todo el daño (excepto daño de Fuerza) durante 1 minuto o hasta que quedes incapacitado.'),
    r(20, 'Cuerpo y Mente', 'pasiva', 'Tus puntuaciones de Destreza y Sabiduría aumentan en 4, hasta un máximo de 25.')
  ],
  subAltos: {
    sombra: [
      r(11, 'Paso de Sombra Mejorado', 'pasiva', 'Puedes gastar 1 Punto de Enfoque al usar Paso de Sombra para ignorar el requisito de estar en luz tenue u oscuridad. Además, puedes hacer un ataque sin armas inmediatamente después de teletransportarte como parte de la Acción Adicional.'),
      r(17, 'Manto de Sombras', 'accion', 'Como Acción Mágica en luz tenue u oscuridad, gastas 3 Puntos de Enfoque para cubrirte de sombras. Te vuelves Invisible, puedes atravesar criaturas como si fueran terreno difícil y usas Ráfaga de Golpes sin coste de Enfoque. Dura 1 minuto, hasta que quedes Incapacitado o hasta que termines tu turno en luz brillante.')
    ],
    manoabierta: [
      r(11, 'Paso Veloz', 'pasiva', 'Cuando tomas una Acción Adicional que no sea Paso del Viento, puedes usar Paso del Viento inmediatamente después.'),
      r(17, 'Palma Quiebra-almas', 'pasiva', 'Al impactar desarmado, puedes gastar 4 Puntos de Enfoque para imbuir vibraciones letales que duran días igual a tu nivel. Puedes usar tu acción (o renunciar a un ataque) para terminarlas: el objetivo hace salvación de CON, sufriendo 10d12 de daño de Fuerza si falla, o la mitad si salva.')
    ]
  },
  subclases: {
    'misericordia': {
      n: 'Guerrero de la Misericordia',
      rasgos: [
        r(3, 'Implementos de Misericordia', 'pasiva', 'Obtienes competencia en las habilidades de Perspicacia y Medicina, y con el Kit de herborista.'),
        r(3, 'Mano de Daño', 'pasiva', 'Una vez por turno, cuando golpeas con un ataque desarmado, puedes gastar 1 Punto de Enfoque para infligir daño Necrótico extra igual a un dado de Artes Marciales + SAB.'),
        r(3, 'Mano de Curación', 'accion', 'Como Acción Mágica, gastas 1 Punto de Enfoque para tocar y curar a una criatura un valor igual a un dado de Artes Marciales + SAB. Puedes sustituir uno de los golpes de tu Ráfaga de Golpes para usar esto sin gastar el punto de enfoque por la curación.'),
        r(6, 'Toque del Médico', 'pasiva', 'Tu Mano de Daño ahora aplica la condición de Envenenado hasta el fin de tu próximo turno. Tu Mano de Curación puede eliminar las condiciones de Ciego, Sordo, Paralizado, Envenenado o Aturdido.'),
        r(11, 'Ráfaga de Curación y Daño', 'pasiva', 'Puedes sustituir todos los golpes de Ráfaga de Golpes por Mano de Curación sin coste extra. Si haces daño, aplicas Mano de Daño gratis (1/turno).', { usos: 'max(1, SAB)', reset: 'largo' }),
        r(17, 'Mano de Misericordia Suprema', 'accion', 'Como Acción Mágica, gastas 5 Puntos de Enfoque para resucitar un cadáver (muerto hace menos de 24 horas). Recupera 4d10 + SAB Puntos de Golpe y revive sin condiciones negativas.', { usos: 1, reset: 'largo' })
      ]
    },
    'elementos': {
      n: 'Guerrero de los Elementos',
      rasgos: [
        r(3, 'Sintonía Elemental', 'gratis', 'Al inicio de tu turno, gastas 1 Punto de Enfoque para imbuirte de energía por 10 minutos. Tus golpes sin armas alcanzan 10 pies más y, al acertar, pueden hacer daño de Ácido, Frío, Fuego, Rayo o Trueno; si lo haces, el objetivo hace una salvación de FUE y, si falla, lo mueves hasta 10 pies hacia ti o lejos de ti. Termina antes si quedas Incapacitado. Además conoces el truco Elementalismo y lo lanzas con SAB.'),
        r(6, 'Explosión Elemental', 'accion', 'Como Acción Mágica, gastas 2 Puntos de Enfoque para detonar energía en una esfera de 20 pies de radio (hasta 120 pies de ti). Infliges 3 dados de Artes Marciales del daño elemental elegido (salvación DES para mitad de daño).'),
        r(11, 'Zancada de los Elementos', 'pasiva', 'Mientras tu Sintonía Elemental está activa, tienes velocidad de Vuelo y de Nado iguales a tu velocidad terrestre.'),
        r(17, 'Epítome Elemental', 'pasiva', 'En Sintonía Elemental ganas Resistencia a un daño elemental (cambiable al inicio de tu turno). Tu Paso del Viento aumenta tu velocidad en +20 pies y causa daño elemental pasivo (1 dado) al pasar junto a enemigos. Tus golpes sin armas hacen 1 dado de daño extra (1 vez por turno).')
      ]
    },
    'artes-misticas': {
      n: 'Guerrero de las Artes Místicas',
      rasgos: [
        r(3, 'Conjuros de las Artes Místicas', 'pasiva', 'Lanzas conjuros de la lista de Hechicero con SAB y puedes usar un foco arcano. Conoces dos trucos (se recomiendan Guardia de cuchillas y Tronar) y uno más en el nivel 10. Tienes espacios de conjuro según la tabla de la subclase y preparas conjuros de Hechicero de los niveles que tengas (al empezar, tres de nivel 1); al subir de nivel puedes cambiar un truco y un conjuro.'),
        r(6, 'Estilo de Lucha Místico', 'pasiva', 'Al tomar la acción de Atacar, puedes sustituir uno de tus golpes sin armas por el lanzamiento de un truco de Hechicero que requiera 1 Acción.'),
        r(6, 'Enfoque Místico', 'pasiva', 'Sin gastar acción, puedes gastar un espacio de conjuro para recuperar tantos Puntos de Enfoque como su nivel. Al terminar un descanso corto o usar Metabolismo Asombroso, puedes gastar Puntos de Enfoque para recuperar un espacio: nivel 1 por 2 puntos (monje 6), nivel 2 por 3 (monje 7), nivel 3 por 5 (monje 13) y nivel 4 por 6 (monje 19).'),
        r(11, 'Golpe Concentrado', 'pasiva', 'Cuando usas Golpe Aturdidor, pase o falle la salvación, el objetivo tiene Desventaja en las tiradas de salvación contra tus conjuros hasta el inicio de tu próximo turno.'),
        r(17, 'Estilo de Lucha Místico Mejorado', 'pasiva', 'Al usar Ráfaga de Golpes, puedes sustituir dos golpes desarmados por el lanzamiento de un conjuro de Hechicero de nivel 1 o 2 (que cueste 1 Acción), integrado en esa misma Acción Adicional.')
      ]
    }
  }
};
