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

const RAIZ_CONDICION: [RegExp, string][] = [
  [/agarrad/, 'Agarrado'], [/apresad/, 'Apresado'], [/asustad/, 'Asustado'], [/aturdid/, 'Aturdido'], [/cegad/, 'Cegado'],
  [/derribad/, 'Derribado'], [/ensordecid/, 'Ensordecido'], [/envenenad/, 'Envenenado'], [/hechizad/, 'Hechizado'],
  [/incapacitad/, 'Incapacitado'], [/inconsciente/, 'Inconsciente'], [/paralizad/, 'Paralizado'], [/petrificad/, 'Petrificado'],
];

/** Lo que pide la salvación de una acción de enemigo (de su CD y su texto): qué condición deja si falla y si la mitad
    del daño entra aunque la supere. "…superar una salvación de Constitución CD 11 o queda Paralizado" → Paralizado. */
export function efectoSalvacion(a: { cd?: number; salv?: string; t?: string }): { cd: number; salv: string; condicion?: string; mitad: boolean } | null {
  if (a.cd == null || !a.salv) return null;
  const t = (a.t || '').toLowerCase();
  // La condición que sigue a "queda", "o queda", "queda… y": la primera que se nombre después de la salvación
  const tras = t.slice(Math.max(0, t.search(/salvaci[oó]n/)));
  const condicion = RAIZ_CONDICION.map(([re, n]) => [tras.search(new RegExp(`qued\\w*\\s+(?:\\w+\\s+)?${re.source}`)), n] as const)
    .filter(([i]) => i >= 0).sort((x, y) => x[0] - y[0])[0]?.[1];
  return { cd: a.cd, salv: a.salv, ...(condicion ? { condicion } : {}), mitad: /mitad|half/.test(t) };
}

/** Si quien queda afectado repite la salvación al final de cada uno de sus turnos (y se libra si la supera). */
export function repiteSalvacion(texto: string): boolean {
  const t = String(texto || '').toLowerCase();
  return /(?:repit|repet)\w*[^.]{0,40}salvaci[oó]n[^.]{0,60}final de (?:cada|su|sus)/.test(t)
    || /final de (?:cada uno de )?(?:sus|su|cada) turnos?[^.]{0,60}(?:repit|repet)\w*[^.]{0,30}salvaci[oó]n/.test(t)
    || /salvaci[oó]n[^.]{0,40}al final de cada uno de sus turnos/.test(t);
}

/** Condiciones que dejan a la criatura sin acciones, acciones adicionales ni reacciones. */
export const INCAPACITANTES = ['Paralizado', 'Petrificado', 'Inconsciente', 'Aturdido', 'Incapacitado'];
const POR_QUE: Record<string, string> = {
  Paralizado: 'No puede moverse, hablar ni hacer acciones, acciones adicionales ni reacciones. Falla sola las salvaciones de Fuerza y Destreza. Quien lo ataca tiene ventaja, y un golpe que acierta a 5 pies o menos es crítico.',
  Petrificado: 'Es de piedra: no puede moverse, hablar ni hacer acciones, acciones adicionales ni reacciones. Falla sola las salvaciones de Fuerza y Destreza, resiste todo el daño y quien lo ataca tiene ventaja.',
  Inconsciente: 'Está en el suelo sin enterarse de nada: no puede moverse, hablar ni hacer acciones, acciones adicionales ni reacciones. Falla sola las salvaciones de Fuerza y Destreza. Quien lo ataca tiene ventaja, y un golpe que acierta a 5 pies o menos es crítico.',
  Aturdido: 'No puede hacer acciones, acciones adicionales ni reacciones. Falla sola las salvaciones de Fuerza y Destreza, y quien lo ataca tiene ventaja.',
  Incapacitado: 'No puede hacer acciones, acciones adicionales ni reacciones, ni hablar.',
};
/** La condición que le quita el turno (la más fuerte que tenga) y por qué; null si puede actuar. */
export function incapacidad(cond: string[] = []): { cond: string; porque: string } | null {
  const c = INCAPACITANTES.find(n => cond.includes(n));
  return c ? { cond: c, porque: POR_QUE[c] } : null;
}
/** Lo que gana quien ataca a alguien con estas condiciones: ventaja (y por qué) y si el golpe a 5 pies es crítico. */
export function contraObjetivo(cond: string[] = []): { ventaja: string | null; critCerca: string | null } {
  return {
    ventaja: ['Paralizado', 'Inconsciente', 'Aturdido', 'Petrificado', 'Apresado', 'Cegado'].find(n => cond.includes(n)) || null,
    critCerca: ['Paralizado', 'Inconsciente'].find(n => cond.includes(n)) || null,
  };
}
/** Falla sola la salvación de Fuerza o Destreza (paralizado, aturdido, inconsciente o petrificado): la condición que lo causa. */
export function fallaSola(cond: string[] = [], salv: string): string | null {
  return /^(fue|des)/i.test(salv) ? ['Paralizado', 'Aturdido', 'Inconsciente', 'Petrificado'].find(n => cond.includes(n)) || null : null;
}
