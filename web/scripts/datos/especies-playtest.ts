/* Especies de prueba de Unearthed Arcana 2026 (Underdark Options 2, lote 26 de Gemini): Deep Imaskari, Drider, Illithidkin,
   Kuo-toa y Myconid. Material Playtest, no oficial todavía. Nombres sin traducción oficial en inglés.
   Las usa `npm run db:actualizar-clase -- especies-playtest`, que las suma a la biblioteca sin quitar ninguna. */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const ESPECIES_PLAYTEST: Record<string, any> = {
 "lib:deep-imaskari": {
  "n": "Deep Imaskari",
  "lib": true,
  "src": "Unearthed Arcana Underdark Options 2 (2026)",
  "r": "De tu biblioteca",
  "vel": 30,
  "vision": 0,
  "subL": "Subespecie",
  "subs": null,
  "rasgos": [
   {
    "nombre": "Tipo de criatura y tamaño",
    "t": "pasiva",
    "texto": "Tipo de criatura: Humanoide. Tamaño: Mediano o Pequeño (de 4 a 6 pies de alto, o de 2 a 4). Velocidad: 30 pies.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Photoresistant",
    "t": "pasiva",
    "texto": "Tienes resistencia al daño radiante.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Resourceful",
    "t": "pasiva",
    "texto": "Ganas Inspiración Heroica siempre que terminas un descanso largo.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Unluminescent",
    "t": "accion",
    "texto": "Como acción, puedes hacer que los cristales de tu cuerpo emitan luz brillante en un radio de 5 pies. El efecto dura hasta que uses una acción para detenerlo, mueras o tengas la condición Inconsciente.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Aura of Unlight",
    "t": "adicional",
    "texto": "Al nivel 3, puedes usar una acción adicional para crear un aura que emite luz brillante en una Emanación de 10 pies durante 1 minuto o hasta que la termines (sin requerir acción). Al crearla, eliges una de las siguientes opciones y no puedes volver a usar este rasgo hasta terminar un descanso largo: Abjuring Unlight: Tus aliados y tú en el aura ganan un bonificador a la CA igual a la mitad de tu Bonificador por Competencia (redondeando hacia abajo). Brilliant Unlight: Los enemigos que empiecen su turno en la Emanación deben superar una tirada de salvación de Constitución (CD 8 + tu modificador de Carisma + tu Bonificador por Competencia) o sufrirán la condición Cegado hasta el final de tu siguiente turno. Corrupting Unlight: Puedes cambiar el daño de tus ataques o conjuros a daño radiante; además, puedes gastar uno de tus Dados de Golpe no usados y sumarlo como daño radiante adicional.",
    "manual": true,
    "usos": 1,
    "reset": "largo",
    "n": 3
   }
  ]
 },
 "lib:drider": {
  "n": "Drider",
  "lib": true,
  "src": "Unearthed Arcana Underdark Options 2 (2026)",
  "r": "De tu biblioteca",
  "vel": 30,
  "vision": 120,
  "subL": "Subespecie",
  "subs": null,
  "rasgos": [
   {
    "nombre": "Tipo de criatura y tamaño",
    "t": "pasiva",
    "texto": "Tipo de criatura: Monstruosidad. Tamaño: Mediano (de 6 a 8 pies de alto). Velocidad: 30 pies.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Arachnid Build",
    "t": "pasiva",
    "texto": "Cuentas como una categoría de tamaño superior para determinar tu capacidad de carga.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Darkvision",
    "t": "pasiva",
    "texto": "Tienes visión en la oscuridad con un alcance de 120 pies.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Spells of the Spider Queen",
    "t": "pasiva",
    "texto": "Conoces el truco Luces danzantes. Al nivel 3 siempre tienes preparado el conjuro Fuego feérico, y al nivel 5 el conjuro Telaraña. Puedes lanzar cada uno de estos conjuros una vez sin gastar espacio de conjuro (recuperas este uso al terminar un descanso largo), o usando los espacios de conjuro correspondientes. Tu aptitud mágica para estos conjuros es Inteligencia, Sabiduría o Carisma (lo eliges al seleccionar esta especie).",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Spider Climb",
    "t": "pasiva",
    "texto": "Tienes una velocidad de escalada igual a tu velocidad. A partir del nivel 3, puedes moverte hacia arriba, hacia abajo y a través de superficies verticales y a lo largo de techos dejando tus manos libres.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Web Walker",
    "t": "pasiva",
    "texto": "Ignoras las restricciones de movimiento causadas por telarañas. Además, conoces la ubicación exacta de cualquier otra criatura que esté en contacto con la misma telaraña que tú.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   }
  ]
 },
 "lib:illithidkin": {
  "n": "Illithidkin",
  "lib": true,
  "src": "Unearthed Arcana Underdark Options 2 (2026)",
  "r": "De tu biblioteca",
  "vel": 30,
  "vision": 120,
  "subL": "Subespecie",
  "subs": null,
  "rasgos": [
   {
    "nombre": "Tipo de criatura y tamaño",
    "t": "pasiva",
    "texto": "Tipo de criatura: Humanoide. Tamaño: Mediano o Pequeño (de 5 a 6 pies de alto, o de 2 a 4). Velocidad: 30 pies.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Darkvision",
    "t": "pasiva",
    "texto": "Tienes visión en la oscuridad con un alcance de 120 pies.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Psionic Aptitude",
    "t": "pasiva",
    "texto": "Conoces el truco Mano de Mago y puedes hacer que la mano espectral sea Invisible. Al nivel 3 tienes preparado el conjuro Orden imperiosa, y al nivel 5 el conjuro Levitar. Puedes lanzar cada uno una vez sin gastar espacio de conjuro (recuperas el uso tras un descanso largo) o gastando los espacios de conjuro adecuados. Eliges Inteligencia, Sabiduría o Carisma como tu aptitud mágica para ellos.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Sharpened Mind",
    "t": "pasiva",
    "texto": "Tienes resistencia al daño psíquico. También tienes ventaja en las tiradas de salvación que hagas para evitar o terminar la condición Hechizado en ti.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Telepathy",
    "t": "pasiva",
    "texto": "Tienes telepatía con un alcance de 30 pies.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   }
  ]
 },
 "lib:kuo-toa": {
  "n": "Kuo-toa",
  "lib": true,
  "src": "Unearthed Arcana Underdark Options 2 (2026)",
  "r": "De tu biblioteca",
  "vel": 30,
  "vision": 0,
  "subL": "Subespecie",
  "subs": null,
  "rasgos": [
   {
    "nombre": "Tipo de criatura y tamaño",
    "t": "pasiva",
    "texto": "Tipo de criatura: Humanoide. Tamaño: Mediano (de 5 a 6 pies de alto). Velocidad: 30 pies.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Amphibious",
    "t": "pasiva",
    "texto": "Puedes respirar tanto aire como agua. Además, tienes una velocidad de nado igual a tu velocidad.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Slippery",
    "t": "pasiva",
    "texto": "Tienes ventaja en las tiradas de salvación para evitar o terminar las condiciones Agarrado y Apresado.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Deific Manifestation",
    "t": "pasiva",
    "texto": "Siempre tienes preparado el conjuro Encontrar familiar y puedes lanzarlo sin componentes materiales. Puedes lanzarlo una vez sin gastar espacio de conjuro, recuperando este uso al finalizar un descanso largo. La criatura es de tipo Celestial y puedes elegir su forma entre las opciones normales o dos especiales: Homúnculo o Myconid Sprout (PROPUESTA: Brote micónido). Además, eliges una segunda forma de las opciones disponibles y tu familiar adquiere una acción, reacción o rasgo de esa segunda forma.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   }
  ]
 },
 "lib:myconid": {
  "n": "Myconid",
  "lib": true,
  "src": "Unearthed Arcana Underdark Options 2 (2026)",
  "r": "De tu biblioteca",
  "vel": 30,
  "vision": 120,
  "subL": "Subespecie",
  "subs": null,
  "rasgos": [
   {
    "nombre": "Tipo de criatura y tamaño",
    "t": "pasiva",
    "texto": "Tipo de criatura: Planta. Tamaño: Mediano o Pequeño (de 4 a 7 pies de alto, o de 2 a 4). Velocidad: 30 pies.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Darkvision",
    "t": "pasiva",
    "texto": "Tienes visión en la oscuridad con un alcance de 120 pies.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Telepathy",
    "t": "pasiva",
    "texto": "Tienes telepatía con un alcance de 30 pies.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   },
   {
    "nombre": "Rapport Spores",
    "t": "accion",
    "texto": "Como acción, expulsas esporas en una Emanación de 30 pies originada en ti. Las criaturas en el área con una Inteligencia de 2 o más que no sean Constructos, Elementales o Muertos Vivientes, ganan telepatía con un alcance de 30 pies durante 1 hora. Una vez que uses este rasgo, no puedes volver a hacerlo hasta que termines un descanso largo.",
    "manual": true,
    "usos": 1,
    "reset": "largo"
   },
   {
    "nombre": "Skill Meld",
    "t": "fuera",
    "texto": "Al terminar un descanso largo, puedes realizar un ritual de fusión para compartir conocimientos con hasta seis aliados en un radio de 30 pies (incluyéndote). Eliges una competencia en una habilidad que posea al menos uno de los participantes. Todas las criaturas elegidas obtienen competencia en esa habilidad hasta que terminen su próximo descanso largo.",
    "manual": true,
    "usos": 0,
    "reset": "largo"
   }
  ]
 }
};
