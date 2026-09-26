import { norm } from '@/shared/utils/texto';

export type AbKey = 'fue' | 'des' | 'con' | 'int' | 'sab' | 'car';

/** [clave, inglés, abreviatura, nombre] */
export const AB: [AbKey, string, string, string][] = [
  ['fue', 'strength', 'FUE', 'Fuerza'], ['des', 'dexterity', 'DES', 'Destreza'], ['con', 'constitution', 'CON', 'Constitución'],
  ['int', 'intelligence', 'INT', 'Inteligencia'], ['sab', 'wisdom', 'SAB', 'Sabiduría'], ['car', 'charisma', 'CAR', 'Carisma'],
];
export const ALL_AB = AB.map(a => a[0]);
export const abInfo = (k: string) => AB.find(a => a[0] === k)!;

export function abKey(k: unknown): AbKey | null {
  const n = norm(k);
  const map: Record<string, AbKey> = {
    fue: 'fue', fuerza: 'fue', strength: 'fue', str: 'fue', des: 'des', destreza: 'des', dexterity: 'des', dex: 'des',
    con: 'con', constitucion: 'con', constitution: 'con', int: 'int', inteligencia: 'int', intelligence: 'int',
    sab: 'sab', sabiduria: 'sab', wisdom: 'sab', wis: 'sab', car: 'car', carisma: 'car', charisma: 'car', cha: 'car',
  };
  return map[n] || null;
}

export const SKILLS: [string, AbKey][] = [
  ['Acrobacias', 'des'], ['Arcanos', 'int'], ['Atletismo', 'fue'], ['Engaño', 'car'], ['Historia', 'int'], ['Interpretación', 'car'],
  ['Intimidación', 'car'], ['Investigación', 'int'], ['Juego de Manos', 'des'], ['Medicina', 'sab'], ['Naturaleza', 'int'], ['Percepción', 'sab'],
  ['Perspicacia', 'sab'], ['Persuasión', 'car'], ['Religión', 'int'], ['Sigilo', 'des'], ['Supervivencia', 'sab'], ['Trato con Animales', 'sab'],
];

export const ALINEAMIENTOS: Record<string, string> = {
  lg: 'Legal bueno', ng: 'Neutral bueno', cg: 'Caótico bueno', ln: 'Legal neutral', n: 'Neutral', tn: 'Neutral', nn: 'Neutral',
  cn: 'Caótico neutral', le: 'Legal malvado', ne: 'Neutral malvado', ce: 'Caótico malvado', lb: 'Legal bueno', nb: 'Neutral bueno', cb: 'Caótico bueno',
  lm: 'Legal malvado', nm: 'Neutral malvado', cm: 'Caótico malvado',
};
export const ALIN_OPC = ['Legal bueno', 'Neutral bueno', 'Caótico bueno', 'Legal neutral', 'Neutral', 'Caótico neutral', 'Legal malvado', 'Neutral malvado', 'Caótico malvado'];

export const ESTANDAR = [15, 14, 13, 12, 10, 8];
export const COMPRA: Record<number, number> = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };

/** Tipos de acción: [nombre, descripción] */
export const TIPOS: Record<string, [string, string]> = {
  accion: ['Acción', 'Una por turno.'], adicional: ['Acción adicional', 'Una por turno, solo con algo que la use.'],
  reaccion: ['Reacción', 'Una por ronda, también en el turno de otros.'], gratis: ['Sin gastar acción', 'Al golpear, al atacar o en momentos concretos.'],
  pasiva: ['Siempre activo', ''], fuera: ['Fuera de combate', 'Lo que haces entre combates: conjuros de 1 minuto o más, rituales y lo que se hace al descansar.'],
};
export const ORDEN_TIPOS = ['accion', 'adicional', 'reaccion', 'gratis', 'fuera', 'pasiva'];
