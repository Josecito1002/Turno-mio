/* eslint-disable @typescript-eslint/no-explicit-any */
import { norm } from '@/shared/utils/texto';
import { ESTANDAR } from '@/features/reglas/data/caracteristicas';

type Ab = 'fue' | 'des' | 'con' | 'int' | 'sab' | 'car';
export type Sugerencia = { orden: Ab[]; nota: string };

/** A qué característica dar prioridad según la clase, de la más importante a la menos (criterio propio, no del libro). */
const BASE: Record<string, Sugerencia> = {
  artifice: { orden: ['int', 'con', 'des', 'sab', 'fue', 'car'], nota: 'Inteligencia mueve tus conjuros e inventos; Constitución para aguantar y concentrarte; Destreza ayuda a tu CA.' },
  barbaro: { orden: ['fue', 'con', 'des', 'sab', 'car', 'int'], nota: 'Fuerza para golpear y Constitución para aguantar; Destreza ayuda a tu CA sin armadura.' },
  bardo: { orden: ['car', 'des', 'con', 'sab', 'int', 'fue'], nota: 'Carisma es tu característica de conjuros; Destreza para la CA y la iniciativa; Constitución para concentrarte.' },
  brujo: { orden: ['car', 'con', 'des', 'sab', 'int', 'fue'], nota: 'Carisma es tu característica de conjuros; Constitución para aguantar y concentrarte; Destreza para la CA.' },
  clerigo: { orden: ['sab', 'con', 'fue', 'des', 'car', 'int'], nota: 'Sabiduría es tu característica de conjuros; Constitución para aguantar; Fuerza o Destreza según cómo pelees.' },
  druida: { orden: ['sab', 'con', 'des', 'int', 'car', 'fue'], nota: 'Sabiduría es tu característica de conjuros; Constitución y Destreza para sobrevivir en primera línea o en forma salvaje.' },
  explorador: { orden: ['des', 'sab', 'con', 'fue', 'int', 'car'], nota: 'Destreza para atacar a distancia y esquivar; Sabiduría para tus conjuros y la percepción.' },
  guerrero: { orden: ['fue', 'con', 'des', 'sab', 'car', 'int'], nota: 'Fuerza para pelear cuerpo a cuerpo con armadura pesada; si prefieres el arco o armas sutiles, pon Destreza primero.' },
  hechicero: { orden: ['car', 'con', 'des', 'sab', 'int', 'fue'], nota: 'Carisma es tu característica de conjuros; Constitución para tus PG y concentrarte; Destreza para la CA.' },
  mago: { orden: ['int', 'con', 'des', 'sab', 'car', 'fue'], nota: 'Inteligencia es tu característica de conjuros; Constitución y Destreza te mantienen en pie.' },
  monje: { orden: ['des', 'sab', 'con', 'fue', 'int', 'car'], nota: 'Destreza para atacar y la CA; Sabiduría para la CA y las técnicas de Enfoque; Constitución para aguantar.' },
  paladin: { orden: ['fue', 'car', 'con', 'sab', 'des', 'int'], nota: 'Fuerza para golpear; Carisma para auras y Castigos; Constitución para aguantar en primera línea.' },
  picaro: { orden: ['des', 'con', 'sab', 'int', 'car', 'fue'], nota: 'Destreza para atacar, esconderte y esquivar; Constitución para aguantar; Sabiduría para las salvaciones que más duelen.' },
};

/** Ajustes por subclase (se buscan por el nombre): solo donde el consejo de la clase cambia de verdad. */
const AJUSTES: { clase: string; nombre: RegExp; orden: Ab[]; nota: string }[] = [
  { clase: 'guerrero', nombre: /caballero sobrenatural|eldritch/, orden: ['fue', 'int', 'con', 'des', 'sab', 'car'], nota: 'Tus conjuros usan Inteligencia: reparte entre Fuerza para pelear e Inteligencia para magia; puedes cambiar Fuerza por Destreza si usas arco.' },
  { clase: 'guerrero', nombre: /guerrero psiquico|psi warrior/, orden: ['fue', 'int', 'con', 'des', 'sab', 'car'], nota: 'Tus poderes psiónicos dependen de Inteligencia; Fuerza o Destreza para tus ataques.' },
  { clase: 'picaro', nombre: /embaucador arcano|arcane trickster/, orden: ['des', 'int', 'con', 'sab', 'car', 'fue'], nota: 'Tus conjuros usan Inteligencia: Destreza sigue primero, e Inteligencia segunda.' },
  { clase: 'picaro', nombre: /mente maestra|mastermind/, orden: ['des', 'int', 'car', 'con', 'sab', 'fue'], nota: 'Ayudas y engañas a distancia: Inteligencia y Carisma suben en importancia.' },
  { clase: 'clerigo', nombre: /guerra|vida|forja/, orden: ['sab', 'con', 'fue', 'des', 'car', 'int'], nota: 'Con armadura pesada y armas marciales, Fuerza pesa más que Destreza.' },
  { clase: 'clerigo', nombre: /luz|conocimiento|engano|tempestad|trucos/, orden: ['sab', 'con', 'des', 'fue', 'car', 'int'], nota: 'Sin armadura pesada: Destreza ayuda más a tu CA que Fuerza.' },
  { clase: 'bardo', nombre: /valor|esgrima|swords/, orden: ['car', 'des', 'con', 'fue', 'sab', 'int'], nota: 'Peleas en primera línea: Constitución y, si usas armas, Destreza o Fuerza suben.' },
  { clase: 'explorador', nombre: /cazador de monstruos|monster slayer/, orden: ['des', 'sab', 'con', 'fue', 'int', 'car'], nota: 'Igual que el estándar: Destreza y Sabiduría primero.' },
];

/** El consejo de una clase y, si se da, de una de sus subclases (por su nombre); `esSub` dice si hubo ajuste propio. */
export function sugerenciaDe(clase: string, subclase?: string): (Sugerencia & { esSub: boolean }) | null {
  const base = BASE[clase];
  if (!base) return null;
  const n = norm(subclase || '');
  const aj = n ? AJUSTES.find(a => a.clase === clase && a.nombre.test(n)) : undefined;
  return aj ? { orden: aj.orden, nota: aj.nota, esSub: true } : { ...base, esSub: false };
}

/** Reparte en `g` los valores que ya tienes según la prioridad: el mayor a la característica más importante.
    Con compra de puntos usa el arreglo estándar (que cuesta justo los 27 puntos). Devuelve false si no se puede (a mano o sin valores). */
export function aplicarOrden(g: any, orden: Ab[]): boolean {
  if (g.metodo === 'compra') { orden.forEach((k, i) => { g.compra[k] = ESTANDAR[i]; }); return true; }
  if (g.metodo !== 'tirar' && g.metodo !== 'estandar') return false;
  if ((g.valores || []).length < 6) return false;
  const indices = g.valores.map((_: number, i: number) => i).sort((a: number, b: number) => g.valores[b] - g.valores[a] || a - b);
  g.asig = {};
  orden.forEach((k, i) => { g.asig[k] = indices[i]; });
  return true;
}
