=== A ===
export const INVESTIGATOR_SUBCLASES: Record<string, { n: string; rasgos: any[] }> = {
  "occultist": {
    n: "Occultist",
    rasgos: [
      {
        nombre: "Magia de pacto",
        t: "pasiva",
        texto: "Aumentas tus habilidades investigativas con magia compleja.\n\n**Trucos.** Conoces dos trucos de Brujo a tu elección (*Descarga arcana* e *Ilusión menor* son recomendados). Siempre que ganas un nivel de Investigador, puedes reemplazar uno de tus trucos de este rasgo con otro truco de Brujo a tu elección. Cuando alcanzas el nivel 10 de Investigador, aprendes otro truco de Brujo a tu elección.\n\n**Espacios de conjuro.** Tienes espacios de conjuro para lanzar tus conjuros de Brujo de nivel 1 a 4. Todos tus espacios son del mismo nivel (ver tabla). Recuperas todos los espacios de conjuro de Magia de Pacto gastados cuando terminas un descanso corto o largo.\n\n**Conjuros preparados de nivel 1+.** Preparas la lista de conjuros de nivel 1+ disponibles para lanzar con este rasgo. Para empezar, elige dos conjuros de Brujo de nivel 1 (*Hechizar persona* y *Maleficio* son recomendados). El número de conjuros en tu lista aumenta a medida que ganas niveles de Investigador (ver tabla). Los conjuros elegidos deben ser de un nivel no superior al nivel de tus espacios.\n\n**Cambiar tus conjuros preparados.** Siempre que ganas un nivel de Investigador, puedes reemplazar un conjuro en tu lista con otro conjuro de Brujo de un nivel elegible.\n\n**Atributo para el lanzamiento de conjuros.** La Inteligencia es el atributo para el lanzamiento de tus conjuros de Brujo.\n\n**Foco para el lanzamiento de conjuros.** Puedes usar un Foco arcano como Foco para el lanzamiento de tus conjuros de Brujo.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Amuletos",
        t: "accion",
        texto: "Puedes usar los siguientes amuletos:\n\n**Colgante de hierro frío.** Puedes lanzar *Detectar bien y mal* sin espacio de conjuro ni componentes.\n**Vial de niebla muerta.** Puedes lanzar *Nube de niebla* sin espacio de conjuro ni componentes.\n**Lente grabada.** Puedes lanzar *Identificar* sin espacio de conjuro ni componentes.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Ruina arcana",
        t: "adicional",
        texto: "Puedes lanzar uno de tus trucos de Brujo como acción adicional. Puedes usar este rasgo un número de veces igual a tu modificador por Inteligencia (mínimo de una vez). Recuperas todos los usos gastados cuando terminas un descanso largo.",
        n: 6,
        usos: 0,
        reset: "largo"
      },
      {
        nombre: "Ojos de otro mundo",
        t: "pasiva",
        texto: "La percepción mágica te otorga los siguientes beneficios:\n\n**Ver lo invisible.** Ves a las criaturas y objetos que tienen la condición Invisible. También puedes ver dentro del Plano Etéreo. Las criaturas y objetos allí parecen fantasmales.\n**Sentir lanzadores de conjuros.** Puedes sentir si una criatura que puedes ver tiene la capacidad de lanzar conjuros.\n**Discernir orígenes de otro mundo.** Puedes determinar si una criatura que puedes ver es una Aberración, Celestial, Elemental, Feérico o Infernó. También puedes determinar el plano de origen de la criatura, si es nativa de un plano de existencia diferente al que te encuentras.",
        n: 10,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Maleficio",
        t: "adicional",
        texto: "Cuando usas tu Explotar debilidad (Exploit Weakness), puedes lanzar *Lanzar maldición (Bestow Curse)* sobre el objetivo como acción adicional sin espacio de conjuro ni componentes.\n\nUna vez que una criatura falla una tirada de salvación contra este conjuro, no puedes volver a usar este rasgo hasta que termines un descanso corto o largo. También puedes restaurar su uso gastando un uso de tu Encantamiento apresurado (Rushed Incantation) (sin requerir acción).",
        n: 14,
        usos: 1,
        reset: "corto"
      }
    ]
  },
  "spy": {
    n: "Spy",
    rasgos: [
      {
        nombre: "Bravuconería",
        t: "pasiva",
        texto: "Tu confianza contagiosa te otorga un bonificador a tus pruebas de Carisma (Engaño y Persuasión) igual a tu modificador por Inteligencia (mínimo de +1).",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Amuletos",
        t: "adicional",
        texto: "Puedes usar los siguientes amuletos:\n\n**Polvo de cristal.** Como acción adicional, puedes lanzar esta bolsa a un punto que puedas ver a 10 pies o menos de ti, llenando una Esfera de 5 pies de radio centrada en ese punto con polvo brillante hasta el inicio de tu próximo turno. Una criatura que entra en la Esfera por primera vez en un turno o termina su turno allí obtiene la condición Invisible. Esta condición termina anticipadamente si la criatura sale de la Esfera, hace una tirada de ataque, inflige daño o lanza un conjuro.\n**Gafas de montura de cuerno.** Como acción adicional, puedes lanzar *Disfrazarse* sin espacio de conjuro ni componentes.\n**Copa de martini.** Como acción adicional, puedes lanzar *Hechizar persona* sin espacio de conjuro ni componentes.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Capa y espada",
        t: "pasiva",
        texto: "Cuando infliges daño durante la primera ronda de combate, puedes infligir daño de Fuerza adicional al objetivo si el objetivo no ha actuado en su turno todavía o si tienes ventaja en la tirada de ataque contra él. El daño de Fuerza es igual a tu nivel de Investigador.",
        n: 6,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Doble de cuerpo",
        t: "accion",
        texto: "Como acción mágica, puedes asumir la identidad de un Humanoide o de un cadáver de un Humanoide que toques y que haya estado muerto durante no más de 24 horas. Una ilusión hace que tu apariencia coincida perfectamente con el objetivo, incluyendo ropa, armadura, armas y otras pertenencias. Si el objetivo es un cadáver, te asemejas al Humanoide tal como era en vida. Además, el cadáver, su sangre, ropa y otra evidencia física de su muerte, se vuelven mágicamente invisibles durante 8 horas.\n\nPara discernir que estás disfrazado, una criatura debe realizar la acción de Estudiar para inspeccionar tu apariencia y tener éxito en una prueba de Inteligencia (Investigación) contra tu CD de salvación de conjuros.\n\nUna vez que usas este rasgo, no puedes volver a usarlo hasta que termines un descanso corto o largo. También puedes restaurar su uso gastando un uso de tu Encantamiento apresurado (Rushed Incantation) (sin requerir acción).",
        n: 10,
        usos: 1,
        reset: "corto"
      },
      {
        nombre: "Locuaz",
        t: "accion",
        texto: "Puedes lanzar *Locuacidad (Glibness)* sin el componente material. También puedes lanzarlo una vez sin espacio de conjuro, y recuperas la capacidad de lanzarlo de esta manera cuando terminas un descanso largo. Durante la duración del conjuro, puedes realizar la acción de Influenciar como acción adicional.",
        n: 14,
        usos: 1,
        reset: "largo"
      }
    ]
  },
  "time-operative": {
    n: "Time Operative",
    rasgos: [
      {
        nombre: "Tiempo prestado",
        t: "pasiva",
        texto: "Una vez en cada uno de tus turnos, puedes realizar una acción adicional. Esta acción solo puede usarse para realizar la acción de Atacar (un solo ataque), Correr, Destrabarse, Esconderse o Utilizar.\n\nPuedes usar este rasgo dos veces, y recuperas todos los usos gastados cuando terminas un descanso largo.",
        n: 3,
        usos: 2,
        reset: "largo"
      },
      {
        nombre: "Amuletos",
        t: "varios",
        texto: "Puedes usar los siguientes amuletos:\n\n**Tableta en blanco.** Como acción mágica, tocas a una criatura y terminas una condición en ella: Cegado, Ensordecido, Paralizado o Envenenado. No puedes eliminar una condición que una criatura haya tenido durante más de 1 minuto.\n**Emblema de azogue.** Como acción adicional, puedes lanzar *Zancada prodigiosa* sin espacio de conjuro ni componentes.\n**Esfera ingrávida.** Puedes lanzar *Caída de pluma* sin espacio de conjuro ni componentes.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Rebobinar",
        t: "adicional",
        texto: "Cuando haces una prueba de d20 y fallas, puedes usar una acción adicional para rebobinar el tiempo al momento anterior al intento. Vuelve a tirar la prueba de d20 y debes usar la nueva tirada.\n\nPuedes usar este rasgo un número de veces igual a tu modificador por Inteligencia (mínimo de una vez). Recuperas todos los usos gastados cuando terminas un descanso largo.",
        n: 6,
        usos: 0,
        reset: "largo"
      },
      {
        nombre: "Eco del ayer",
        t: "accion",
        texto: "Puedes usar la acción mágica para proyectar tus sentidos hasta 24 horas atrás en el tiempo en tu ubicación actual. Puedes ver y escuchar esta ubicación como si estuvieras allí, pero el pasado parece onírico y sombrío. Mientras percibes el pasado, puedes mirar en cualquier dirección, pero no puedes moverte ni hablar. Este vistazo al pasado dura 10 minutos, pero termina anticipadamente si lo despides (sin requerir acción).",
        n: 10,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Robar tiempo",
        t: "pasiva",
        texto: "Cuando terminas un descanso corto o reduces a un enemigo a 0 Puntos de Golpe, recuperas un uso de tu Tiempo prestado.",
        n: 14,
        usos: 0,
        reset: "ninguno"
      }
    ]
  }
};
=== B ===
[
  {
    "donde": "occultist",
    "rasgo": "Magia de pacto",
    "tipo": "conjuros",
    "usos": "",
    "reset": "corto",
    "por_nivel": {
      "3": { "trucos": 2, "preparados": 3, "espacios": 1, "nivel_espacios": 1 },
      "4": { "trucos": 2, "preparados": 4, "espacios": 1, "nivel_espacios": 1 },
      "5": { "trucos": 2, "preparados": 4, "espacios": 2, "nivel_espacios": 1 },
      "6": { "trucos": 2, "preparados": 4, "espacios": 2, "nivel_espacios": 1 },
      "7": { "trucos": 2, "preparados": 5, "espacios": 2, "nivel_espacios": 2 },
      "8": { "trucos": 2, "preparados": 6, "espacios": 2, "nivel_espacios": 2 },
      "9": { "trucos": 2, "preparados": 6, "espacios": 2, "nivel_espacios": 2 },
      "10": { "trucos": 3, "preparados": 7, "espacios": 2, "nivel_espacios": 2 },
      "11": { "trucos": 3, "preparados": 7, "espacios": 2, "nivel_espacios": 2 },
      "12": { "trucos": 3, "preparados": 8, "espacios": 2, "nivel_espacios": 2 },
      "13": { "trucos": 3, "preparados": 9, "espacios": 2, "nivel_espacios": 3 },
      "14": { "trucos": 3, "preparados": 10, "espacios": 2, "nivel_espacios": 3 },
      "15": { "trucos": 3, "preparados": 10, "espacios": 2, "nivel_espacios": 3 },
      "16": { "trucos": 3, "preparados": 11, "espacios": 2, "nivel_espacios": 3 },
      "17": { "trucos": 3, "preparados": 11, "espacios": 2, "nivel_espacios": 3 },
      "18": { "trucos": 3, "preparados": 11, "espacios": 2, "nivel_espacios": 3 },
      "19": { "trucos": 3, "preparados": 12, "espacios": 2, "nivel_espacios": 4 },
      "20": { "trucos": 3, "preparados": 13, "espacios": 2, "nivel_espacios": 4 }
    },
    "detalle": "Progresión de conjuros de Magia de pacto (Ocultista)."
  },
  {
    "donde": "occultist",
    "rasgo": "Ruina arcana",
    "tipo": "usos",
    "usos": "max(1, mod_int)",
    "reset": "largo",
    "detalle": "Lanzar truco de Brujo como acción adicional."
  },
  {
    "donde": "time-operative",
    "rasgo": "Rebobinar",
    "tipo": "usos",
    "usos": "max(1, mod_int)",
    "reset": "largo",
    "detalle": "Rebobinar el tiempo tras fallar una prueba de d20."
  }
]
=== C ===
{
  "occultist": "Investigator (Mage Hand Press, 2024)",
  "spy": "Investigator (Mage Hand Press, 2024)",
  "time-operative": "Investigator (Mage Hand Press, 2024)"
}
=== D ===
{
  "occultist": "Un maestro de los secretos oscuros que combate a las amenazas mágicas valiéndose de conjuros, magia de pacto y artes ocultas.",
  "spy": "Un agente experto en la infiltración, el disfraz y el asesinato silencioso, indispensable para extraer secretos de forma sutil pero letal.",
  "time-operative": "Un agente enviado del futuro con una misión críptica y acceso a magia cronomántica para alterar el curso de la historia a su favor."
}
=== E ===
Dudas o [NO CONFIRMADO]:
1. **Time Operative (Rebobinar):** La mecánica especifica usar una *Bonus Action* (Acción adicional) tras fallar una prueba de d20 para repetirla. Esto es atípico (generalmente sería una reacción o se haría sin acción/gratis), pero fue traducido textualmente.
