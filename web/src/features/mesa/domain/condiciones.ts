/** Lo que significa cada condición en la mesa, en pocas palabras, para que el jugador sepa qué le pasa. */
export const EFECTO_CONDICION: Record<string, string> = {
  Agarrado: 'Tu velocidad es 0 mientras te sujeten.',
  Apresado: 'Tu velocidad es 0; los ataques contra ti tienen ventaja y los tuyos desventaja.',
  Asustado: 'Desventaja en tiradas mientras veas la fuente del miedo, y no te acercas a ella.',
  Aturdido: 'No puedes actuar ni moverte; fallas salvaciones de Fuerza y Destreza y los ataques contra ti tienen ventaja.',
  Cegado: 'No ves: fallas lo que dependa de la vista; tus ataques tienen desventaja y los ataques contra ti, ventaja.',
  Derribado: 'Levantarte te cuesta la mitad de tu velocidad. En el suelo tus ataques tienen desventaja y los cuerpo a cuerpo contra ti tienen ventaja.',
  Ensordecido: 'No oyes: fallas lo que dependa del oído.',
  Envenenado: 'Desventaja en tiradas de ataque y pruebas de característica.',
  Hechizado: 'No puedes atacar a quien te hechizó, y esa criatura te influye con facilidad.',
  Incapacitado: 'No puedes hacer acciones, acciones adicionales ni reacciones.',
  Inconsciente: 'Caes al suelo, no actúas y no te enteras de nada; los ataques cuerpo a cuerpo contra ti aciertan con facilidad.',
  Invisible: 'No te ven sin ayuda: ventaja en tus ataques y desventaja en los ataques contra ti.',
  Paralizado: 'No puedes actuar ni moverte; los ataques contra ti tienen ventaja.',
  Petrificado: 'Eres de piedra: no actúas ni te mueves y resistes todo el daño.',
  Agotamiento: 'Cada nivel resta a tus tiradas D20 y a tu velocidad.',
  Concentrado: 'Mantienes un conjuro: si te hieren, haz una salvación de Constitución o lo pierdes.',
};
