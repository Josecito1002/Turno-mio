/* Carga una biblioteca exportada (biblioteca-mi-turno.json) en la base.
   Uso: npm run db:sembrar -- [ruta.json] [--reemplazar]
   Sin --reemplazar solo agrega lo que falta; con --reemplazar deja la base igual al archivo. */
import { readFileSync } from 'node:fs';
import { crearDb } from '../src/shared/db/conectar';
import { aportarBiblioteca, leerBiblioteca, reemplazarBiblioteca } from '../src/features/biblioteca/server/repositorio';

async function main() {
  const args = process.argv.slice(2);
  const ruta = args.find(a => !a.startsWith('--')) || '../biblioteca-mi-turno.json';
  const d = JSON.parse(readFileSync(ruta, 'utf8'));
  if (d.tipo !== 'miturno-biblioteca') throw new Error(`${ruta} no es una biblioteca de Mi Turno`);
  const { tipo, v, adminPin, ...lib } = d; void tipo; void v; void adminPin;
  const { db, cerrar } = crearDb();
  if (args.includes('--reemplazar')) { await reemplazarBiblioteca(db, lib); console.log('Biblioteca reemplazada.'); }
  else console.log(`Filas nuevas: ${await aportarBiblioteca(db, lib)}`);
  const b = await leerBiblioteca(db);
  console.log(Object.entries(b).map(([k, x]) => `${k}: ${x.length}`).join(', '));
  await cerrar();
}
main().catch(e => { console.error(e); process.exit(1); });
