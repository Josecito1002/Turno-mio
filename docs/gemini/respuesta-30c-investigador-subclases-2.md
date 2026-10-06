=== A ===
```typescript
export const INVESTIGATOR_SUBCLASES: Record<string, { n: string; rasgos: any[] }> = {
  "inquisitor": {
    n: "Inquisitor",
    rasgos: [
      {
        nombre: "Doctrinas de exorcista",
        t: "pasiva",
        texto: "Tu entrenamiento como inquisidor te otorga los siguientes beneficios:\n\n**Armadura consagrada (Consecrated Armor) (PROPUESTA).** Añades *Armadura consagrada* a tu grimorio gratis. Cuando lo lanzas, tu CA base pasa a ser 13 + tu modificador por Destreza.\n**Dogma.** Siempre que hagas una prueba de Inteligencia (Religión), puedes tratar una tirada del d20 de 9 o menos como si fuera un 10.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Amuletos",
        t: "adicional",
        texto: "Puedes usar los siguientes amuletos:\n\n**Bálsamo de alabastro.** Como acción adicional, puedes lanzar *Restablecimiento menor* sin espacio de conjuro ni componentes.\n**Cáliz consagrado.** Como acción adicional, puedes encantar un recipiente que toques, como una taza, para producir un frasco de *Agua bendita*. Produces uno de estos frascos cuando usas este amuleto. Durante la siguiente hora, puedes usar una acción adicional para producir otro frasco de *Agua bendita*, hasta que hayas creado un total de cinco frascos. Una vez creados, estos frascos y el *Agua bendita* desaparecen tras 1 hora.\n**Relicario de la duda.** Como acción adicional, puedes lanzar *Detectar pensamientos* sin espacio de conjuro ni componentes. Cuando lanzas el conjuro usando este amuleto, solo puedes detectar pensamientos asociados a emociones negativas, como culpa, aprensión, arrepentimiento o melancolía.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Golpe divino",
        t: "pasiva",
        texto: "Una vez en cada uno de tus turnos, cuando impactas a una criatura con una tirada de ataque usando un arma, puedes hacer que el objetivo reciba 1d8 de daño Necrótico o Radiante (tú eliges) adicional.",
        n: 6,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Piedad rutinaria",
        t: "pasiva",
        texto: "Puedes usar tus Reliquias Sagradas (Holy Relics) tres veces sin gastar un uso de tus Amuletos. Recuperas estos usos cuando terminas un descanso largo.",
        n: 10,
        usos: 3,
        reset: "largo"
      },
      {
        nombre: "Excomunión",
        t: "adicional",
        texto: "Como acción adicional, puedes grabar una marca de condena sobre una criatura que puedas ver a 60 pies o menos de ti. El objetivo debe tener éxito en una tirada de salvación de Sabiduría o quedará marcado durante 1 minuto. Mientras está marcado, el objetivo recibe 6d6 de daño Radiante al inicio de cada uno de sus turnos, no puede recuperar Puntos de Golpe y no puede tener ventaja en pruebas de d20. Un objetivo marcado puede repetir su tirada de salvación al final de cada uno de sus turnos, terminando el efecto sobre sí mismo si tiene éxito.\n\nUna vez que marcas a una criatura usando este rasgo, no puedes volver a usarlo hasta que termines un descanso largo. También puedes restaurar su uso gastando un uso de tu Encantamiento apresurado (Rushed Incantation) (sin requerir acción).",
        n: 14,
        usos: 1,
        reset: "largo"
      }
    ]
  },
  "kid-sleuth": {
    n: "Kid Sleuth",
    rasgos: [
      {
        nombre: "Compañero animal",
        t: "pasiva",
        texto: "Obtienes el compañero constante de un joven detective: un compañero animal parlante. Añades *Encontrar familiar* a tu grimorio gratis. Puedes usar Encantamiento apresurado (Rushed Incantation) para lanzar el conjuro sin gastar un uso del rasgo, y no necesitas leer de tu grimorio para lanzarlo. El conjuro mejora de las siguientes formas cuando lo lanzas:\n\n**Opciones ampliadas.** Puedes elegir una de las formas normales para tu familiar o una de las siguientes formas especiales: Cabra, Mastín o Comadreja.\n**Despertado.** El animal obtiene una Inteligencia de 10 y la capacidad de hablar un idioma que conozcas.\n**Habilidoso.** Tu familiar obtiene competencia en cualquier combinación de dos habilidades o herramientas a tu elección. Puedes cambiar esta selección cuando invocas a tu familiar.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Amuletos",
        t: "adicional",
        texto: "Puedes usar los siguientes amuletos:\n\n**Bolsa de trampas.** Como acción adicional, puedes producir mágicamente y realizar la acción de Utilizar para usar uno de los siguientes objetos: Rodamientos, Abrojos, Cadena, Trampa de caza, Esposas o Aceite (el cual solo puedes usar para rociar un espacio). Si el objeto requiere una tirada de salvación, usa tu CD de salvación de conjuros de Investigador. Durante el siguiente minuto, puedes usar una acción adicional para producir y usar otro de estos objetos, hasta que hayas creado un total de cinco. Una vez creados, estos objetos desaparecen tras 1 hora.\n**Bocadito delicioso (Dooby Snack).** Como acción adicional, produces un sabroso premio que dura 1 hora. Una criatura puede usar una acción adicional para comer este premio y ganar un número de Puntos de Golpe Temporales igual a tu modificador por Inteligencia (mínimo de 1). Hasta el inicio de su siguiente turno, la criatura tiene ventaja en la próxima prueba de d20 que realice.\n**Lupa.** Como acción adicional, puedes lanzar *Pista (Clue)* sin espacio de conjuro ni componentes. Además, cuando lanzas este conjuro usando este amuleto, puedes determinar cada tipo de criatura que deje huellas dactilares o pisadas.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "A separarse, equipo (PROPUESTA)",
        t: "pasiva",
        texto: "Cuando usas tu Explotar debilidad (Exploit Weakness), puedes moverte inmediatamente hasta la mitad de tu Velocidad sin provocar ataques de oportunidad. Alternativamente, puedes elegir a un aliado que puedas ver a 30 pies o menos de ti y que pueda verte o escucharte. El aliado puede usar una reacción para moverse hasta la mitad de su Velocidad sin provocar ataques de oportunidad.",
        n: 6,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Compañero astuto",
        t: "pasiva",
        texto: "Cuando tu familiar realiza la acción de Correr, Destrabarse o Esconderse, obtienes los beneficios de esa acción en tu siguiente turno. Debes estar Muy oscurecido, o detrás de Cobertura tres cuartos o total, y debes estar fuera de la línea de visión de cualquier enemigo para obtener los beneficios de la acción de Esconderse.",
        n: 10,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Chicos entrometidos (PROPUESTA)",
        t: "reaccion",
        texto: "Siempre que un enemigo a 30 pies o menos de ti haga una tirada de ataque contra uno de tus aliados, puedes usar una reacción para imponer desventaja en esa tirada.",
        n: 14,
        usos: 0,
        reset: "ninguno"
      }
    ]
  },
  "medium": {
    n: "Medium",
    rasgos: [
      {
        nombre: "Premonición",
        t: "pasiva",
        texto: "Siempre que termines un descanso largo, tira dos d20 y anota los números obtenidos. Puedes reemplazar cualquier prueba de d20 realizada por ti o por una criatura que puedas ver con una de estas tiradas de premonición. Debes elegir hacerlo antes de la tirada, y puedes reemplazar una tirada de esta manera solo una vez por turno.\n\nCada tirada de premonición puede usarse solo una vez. Cuando terminas un descanso largo, pierdes cualquier tirada de premonición no utilizada.",
        n: 3,
        usos: 0,
        reset: "largo"
      },
      {
        nombre: "Amuletos",
        t: "varios",
        texto: "Puedes usar los siguientes amuletos:\n\n**Campana mortuoria (Dead Ringer).** Puedes hacer sonar esta campana para lanzar *Hablar con los muertos* sin espacio de conjuro ni componentes. Cuando lanzas el conjuro usando este amuleto, puedes hacerle solo una pregunta al cadáver.\n**Gafas heptagonales.** Como acción adicional, puedes lanzar *Ver lo invisible* una vez sin espacio de conjuro ni componentes.\n**Espejo lúcido.** Como acción adicional, puedes desplazarte parcialmente al Plano Etéreo durante 1 minuto o hasta que lo despidas (sin requerir acción). Tienes una Velocidad de Vuelo de 10 pies y puedes moverte a través de espacios ocupados como si fueran Terreno Difícil. Si terminas tu turno en un espacio así, eres expulsado al último espacio desocupado en el que estuviste.",
        n: 3,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Muerte anunciada",
        t: "pasiva",
        texto: "Una vez por turno, cuando infliges daño con un arma, puedes reemplazar uno de los dados de daño con una tirada de premonición.",
        n: 6,
        usos: 0,
        reset: "ninguno"
      },
      {
        nombre: "Susurros del más allá",
        t: "accion",
        texto: "Como acción mágica, puedes recibir una pista del más allá. El DM te da una pista de una palabra pertinente a tu mejor curso de acción, una línea de investigación fructífera o alguna otra dirección útil.\n\nUna vez que usas este rasgo, no puedes volver a usarlo hasta que termines un descanso largo. También puedes restaurar su uso gastando un uso de tu Encantamiento apresurado (Rushed Incantation) (sin requerir acción).",
        n: 10,
        usos: 1,
        reset: "largo"
      },
      {
        nombre: "Tercer ojo",
        t: "adicional",
        texto: "Puedes usar una acción adicional para lanzar *Visión verdadera* sin espacio de conjuro ni componentes. Cuando lanzas el conjuro con este rasgo, tienes ventaja en el primer ataque que hagas en cada uno de tus turnos durante la duración del conjuro.\n\nUna vez que usas este rasgo, no puedes volver a hacerlo hasta que termines un descanso largo.",
        n: 14,
        usos: 1,
        reset: "largo"
      }
    ]
  },
};
```
