/* Crea (o actualiza) personajes de prueba en la cuenta de revisión, para revisar cambios en la app sin armarlos a mano.
   Uso: npx tsx --env-file-if-exists=.env.local scripts/personajes-prueba.ts [--correo 1@1.com] [--ver]
   Los ids empiezan por "prueba-": al volver a correrlo se sobrescriben. --ver muestra cómo quedan y no guarda nada. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from 'node:fs';
import { and, eq, like } from 'drizzle-orm';
import { crearDb } from '../src/shared/db/conectar';
import { usuarios } from '../src/features/cuentas/server/tablas';
import { personajes } from '../src/features/personajes/server/tablas';
import { setLib } from '../src/features/biblioteca/domain/biblioteca';
import { nuevoPj, resumen } from '../src/features/personajes/domain/modelo';
import { compute } from '../src/features/personajes/domain/calculo';

/* Personaje completo a partir de lo que importa en cada prueba */
function armar(id: string, nombre: string, datos: Record<string, any>) {
  const pj: any = nuevoPj();
  Object.assign(pj, { trasfondo: { ...pj.trasfondo, key: 'sabio', modo: '21', a: 'int', b: 'con' } }, datos, { id: 'prueba-' + id, nombre: 'Prueba: ' + nombre });
  pj.gen = { ...pj.gen, metodo: 'manual', manual: { fue: 10, des: 14, con: 14, int: 12, sab: 10, car: 16, ...(datos.stats || {}) } };
  delete pj.stats;
  return pj;
}
const mejoras = (...niveles: number[]) => Object.fromEntries(niveles.map(n => [n, { modo: 'una', a: 'car' }]));

/* Lo que hay que revisar ahora; se reemplaza en cada entrega */
const PRUEBAS = [
  armar('tiefling-abisal', 'tiefling abisal guerrero 5', {
    clase: 'guerrero', nivel: 5, subclase: 'lib:campeon', especie: { key: 'tiefling', sub: 'abisal', nombre: '', vel: 30, vision: 60 },
    trasfondo: { key: 'soldado', modo: '21', a: 'fue', b: 'con' }, stats: { fue: 16, int: 14, car: 10 }, mejoras: { 4: { modo: 'una', a: 'fue' } },
    habClase: ['Atletismo', 'Percepción'], estilo: 'defensa', maestrias: ['espada_larga', 'arco_largo', 'hacha_mano'],
    armas: [['espada_larga', 1], ['arco_largo', 1]], armadura: 'mallas', escudo: true,
  }),
  armar('marca-escritura', 'mago con Marca de Escritura 3', {
    clase: 'mago', nivel: 3, subclase: 'lib:evocacion', especie: { key: 'humano', sub: '', nombre: '', vel: 30, vision: 0 },
    stats: { int: 16, car: 10 }, habClase: ['Arcanos', 'Historia'], pericia: ['Arcanos'], dotesExtra: [{ key: 'lib:marca-escritura' }],
    armas: [['daga', 1]], conjuros: [],
  }),
  armar('brujo-infernal', 'brujo infernal 3 con Armadura de Sombras', {
    clase: 'brujo', nivel: 3, subclase: 'infernal', especie: { key: 'humano', sub: '', nombre: '', vel: 30, vision: 0 },
    habClase: ['Engaño', 'Intimidación'], elecciones: { invocaciones: ['armadura-sombras', 'explosion-agonizante', 'mascara-caras'] },
    armas: [['daga', 2]],
  }),
  armar('brujo-genio', 'brujo genio 11 con Arcano Místico', {
    clase: 'brujo', nivel: 11, subclase: 'lib:genio', especie: { key: 'humano', sub: '', nombre: '', vel: 30, vision: 0 }, mejoras: mejoras(4, 8),
    habClase: ['Arcanos', 'Engaño'], armas: [['espada_larga', 1]],
    elecciones: { 'genio-tipo': 'efreet', 'arcano-6': 'circulo de muerte',
      invocaciones: ['pacto-filo', 'filo-sediento', 'armadura-sombras', 'vision-diablo', 'explosion-agonizante', 'susurros-tumba', 'mascara-caras'] },
  }),
  armar('elfo-astral', 'elfo astral explorador 3 (elige su truco)', {
    clase: 'explorador', nivel: 3, subclase: 'lib:cazador', especie: { key: 'lib:elfo-astral', sub: '', nombre: '', vel: 30, vision: 60 },
    stats: { des: 16, sab: 14, car: 10 }, habClase: ['Percepción', 'Sigilo', 'Supervivencia'], pericia: ['Sigilo'], elecciones: { 'elfo-astral-trance': 'arma:espada_larga' }, estilo: 'arqueria', maestrias: ['arco_largo', 'espada_corta'],
    armas: [['arco_largo', 1], ['espada_corta', 2]], armadura: 'tachonado',
  }),
];

async function main() {
  const args = process.argv.slice(2);
  const iC = args.indexOf('--correo'), correo = iC >= 0 ? args[iC + 1] : '1@1.com', ver = args.includes('--ver');
  setLib(JSON.parse(readFileSync('../biblioteca-mi-turno.json', 'utf8')));
  for (const pj of PRUEBAS) {
    const c = compute(pj);
    const avisos = c.avisos.filter((a: any) => a.nivel === 'aviso').map((a: any) => a.t);
    console.log(`${pj.nombre} (${resumen(pj)})${avisos.length ? ` — avisos: ${avisos.join(', ')}` : ''}`);
  }
  if (ver) return;
  const { db, cerrar } = crearDb();
  try {
    const [u] = await db.select().from(usuarios).where(eq(usuarios.email, correo)).limit(1);
    if (!u) throw new Error(`No hay ninguna cuenta con el correo ${correo}`);
    // Se quitan las pruebas anteriores para que solo queden las de esta entrega
    await db.delete(personajes).where(and(eq(personajes.usuarioId, u.id), like(personajes.id, 'prueba-%')));
    for (const pj of PRUEBAS) await db.insert(personajes).values({ usuarioId: u.id, id: pj.id, nombre: pj.nombre, resumen: resumen(pj), datos: pj });
    console.log(`\n${PRUEBAS.length} personajes de prueba guardados en la cuenta ${correo}.`);
  } finally { await cerrar(); }
}
main().catch(e => { console.error(e); process.exit(1); });
